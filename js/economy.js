// Ekonomia: robotnicy zbierają drewno / kamień / złoto i odnoszą je do bazy.
//
// Cykl zadania robotnika (u.task.phase):
//   toResource → gathering → returning → toResource → ...
// Gdy kafelek się wyczerpie, robotnik sam szuka najbliższego kafelka tego samego surowca.
(function () {
  const CFG = Gra.CONFIG;
  const TILE = CFG.TILE;
  const T = Gra.TILES;
  const DIRS8 = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  const GATHER_REACH = 1.6 * TILE;  // max odległość od środka kafelka surowca
  const SEARCH_RADIUS = 12;
  const MAX_RETRIES = 3;

  const RES_NAMES = { wood: 'drewno', stone: 'kamień', gold: 'złoto' };

  // Czy (x, y) jest stanowiskiem przy surowcu: przejezdny i (gdy region >= 0) osiągalny z tego obszaru
  function isStand(map, x, y, region) {
    return map.isWalkable(x, y) && (region < 0 || map.regionAt(x, y) === region);
  }

  function hasWalkableNeighbor(map, x, y, region) {
    return DIRS8.some(([dx, dy]) => isStand(map, x + dx, y + dy, region));
  }

  // region — obszar robotnika (map.regionAt); kafelek w niedostępnej kieszeni się nie liczy
  function isHarvestable(map, x, y, res, region = -1) {
    return map.resourceAt(x, y) === res && map.amount[map.idx(x, y)] > 0 && hasWalkableNeighbor(map, x, y, region);
  }

  const regionOf = (game, u) => game.map.regionAt(u.tileX, u.tileY);

  // Do n kafelków surowca res najbliżej (x, y), do których da się podejść z obszaru region
  function findResourceTiles(map, x, y, res, n, region = -1) {
    const out = [];
    const seen = new Uint8Array(map.tiles.length);
    const queue = [[x, y]];
    seen[map.idx(x, y)] = 1;
    for (let qi = 0; qi < queue.length && out.length < n; qi++) {
      const [cx, cy] = queue[qi];
      if (isHarvestable(map, cx, cy, res, region)) out.push({ x: cx, y: cy });
      for (const [dx, dy] of DIRS8) {
        const nx = cx + dx, ny = cy + dy;
        if (!map.inBounds(nx, ny) || seen[map.idx(nx, ny)]) continue;
        if (Math.max(Math.abs(nx - x), Math.abs(ny - y)) > SEARCH_RADIUS) continue;
        seen[map.idx(nx, ny)] = 1;
        queue.push([nx, ny]);
      }
    }
    return out;
  }

  function nearTile(u, x, y) {
    return Math.hypot(u.x - (x + 0.5) * TILE, u.y - (y + 0.5) * TILE) <= GATHER_REACH;
  }

  // Podejdź do kafelka surowca: wolny sąsiad najbliżej robotnika, omijając pola zajęte przez innych
  function approachResource(game, u) {
    const { map } = game;
    const t = u.task;
    const region = regionOf(game, u);
    let best = null, bestScore = Infinity;
    for (const [dx, dy] of DIRS8) {
      const nx = t.x + dx, ny = t.y + dy;
      if (!isStand(map, nx, ny, region)) continue;
      const taken = game.units.filter((o) => o !== u && o.task && o.task.slot &&
                                             o.task.slot.x === nx && o.task.slot.y === ny).length;
      const score = Math.hypot(u.tileX - nx, u.tileY - ny) + taken * 3;
      if (score < bestScore) { bestScore = score; best = { x: nx, y: ny }; }
    }
    if (!best) return false;
    t.slot = best;
    u.moveTo(map, best.x, best.y);
    return true;
  }

  function nearestDropOff(game, u) {
    let best = null, bestD = Infinity;
    for (const b of game.buildings) {
      if (b.owner !== u.owner || !b.dropOff || b.state !== 'done') continue;
      const c = Gra.buildings.center(b);
      const d = Math.hypot(u.x / TILE - c.x, u.y / TILE - c.y);
      if (d < bestD) { bestD = d; best = b; }
    }
    return best;
  }

  function startReturn(game, u) {
    const b = nearestDropOff(game, u);
    if (!b) { u.task = null; return; }
    u.task.phase = 'returning';
    u.task.dropOff = b;
    u.task.retries = 0;
    u.task.slot = null;
    Gra.buildings.approach(game, u, b);
  }

  function goToResource(game, u) {
    u.task.phase = 'toResource';
    u.task.retries = 0;
    if (!approachResource(game, u)) retarget(game, u);
  }

  // Kafelek się skończył albo jest nieosiągalny — szukaj najbliższego innego
  function retarget(game, u) {
    const t = u.task;
    // Najbliższy kafelek inny niż obecny (obecny jest wyczerpany albo nie da się do niego dojść)
    const next = findResourceTiles(game.map, t.x, t.y, t.res, 2, regionOf(game, u)).find((c) => c.x !== t.x || c.y !== t.y);
    if (next) {
      t.x = next.x;
      t.y = next.y;
      goToResource(game, u);
    } else if (u.carry) {
      t.x = null; // odnieś to, co ma, i skończ
      startReturn(game, u);
    } else {
      u.task = null;
    }
  }

  function deplete(game, x, y) {
    const { map } = game;
    map.set(x, y, T.GRASS);
    map.amount[map.idx(x, y)] = 0;
    Gra.render.paintGrass(game, x, y);
  }

  function resourcesOf(game, owner) {
    return owner === 0 ? game.resources : game.aiResources;
  }

  function gatherRate(game, u, res) {
    const raceMult = (u.def.gather && u.def.gather[res]) || 1;
    const aiMult = u.owner === 0 ? 1 : game.difficulty.economy;
    return CFG.GATHER.rate * raceMult * aiMult;
  }

  // ---------- Rozkazy ----------

  // Wysyła robotników do surowca na kafelku (tx, ty). Zwraca robotników, którzy dostali zadanie.
  function commandGather(game, units, tx, ty) {
    const { map } = game;
    const res = map.resourceAt(tx, ty);
    const workers = units.filter((u) => u.def.worker);
    if (!res || !workers.length) return [];
    // Rozkładamy robotników na kilka sąsiednich kafelków, max 2 na kafelek
    const tiles = findResourceTiles(map, tx, ty, res, Math.ceil(workers.length / 2), regionOf(game, workers[0]));
    if (!tiles.length) return [];
    workers.forEach((u, i) => {
      const tile = tiles[i % tiles.length];
      if (u.carry && u.carry.type !== res) u.carry = null; // inny surowiec — ładunek przepada
      u.task = { kind: 'gather', res, x: tile.x, y: tile.y, phase: 'toResource', retries: 0, slot: null };
      if (u.carry && u.carry.amount >= CFG.GATHER.carry) startReturn(game, u);
      else goToResource(game, u);
    });
    return workers;
  }

  // Robotnicy z ładunkiem odnoszą go do wskazanego budynku. Zwraca tych, którzy dostali zadanie.
  function commandReturn(game, units, building) {
    const carriers = units.filter((u) => u.def.worker && u.carry);
    for (const u of carriers) {
      const prev = u.task && u.task.kind === 'gather' ? u.task : null;
      u.task = { kind: 'gather', res: u.carry.type, x: prev ? prev.x : null, y: prev ? prev.y : null,
                 phase: 'returning', dropOff: building, retries: 0, slot: null };
      Gra.buildings.approach(game, u, building);
    }
    return carriers;
  }

  // ---------- Aktualizacja ----------

  function updateWorker(game, u, dt) {
    const { map } = game;
    const t = u.task;
    const cap = CFG.GATHER.carry;

    if (t.phase === 'toResource') {
      if (!isHarvestable(map, t.x, t.y, t.res, regionOf(game, u))) { retarget(game, u); return; }
      // Na miejscu: stoi przy kafelku albo idzie już tylko do ostatniego punktu obok niego
      if (nearTile(u, t.x, t.y) && u.path.length <= 1) {
        u.path = [];
        t.phase = 'gathering';
        return;
      }
      if (!u.moving) {
        if (++t.retries > MAX_RETRIES) { retarget(game, u); return; }
        approachResource(game, u);
      }
      return;
    }

    if (t.phase === 'gathering') {
      const i = map.idx(t.x, t.y);
      if (map.resourceAt(t.x, t.y) !== t.res || map.amount[i] <= 0) {
        if (u.carry && u.carry.amount > 0) startReturn(game, u); else retarget(game, u);
        return;
      }
      if (!nearTile(u, t.x, t.y)) { goToResource(game, u); return; } // ktoś go odepchnął
      u.facing = Math.atan2((t.y + 0.5) * TILE - u.y, (t.x + 0.5) * TILE - u.x);
      if (!u.carry) u.carry = { type: t.res, amount: 0 };
      const take = Math.min(gatherRate(game, u, t.res) * dt, cap - u.carry.amount, map.amount[i]);
      u.carry.amount += take;
      map.amount[i] -= take;
      if (map.amount[i] <= 1e-4) deplete(game, t.x, t.y);
      if (u.carry.amount >= cap - 1e-4) {
        u.carry.amount = cap;
        startReturn(game, u);
      }
      return;
    }

    if (t.phase === 'returning') {
      if (!t.dropOff || !game.buildings.includes(t.dropOff)) t.dropOff = nearestDropOff(game, u);
      if (!t.dropOff) { u.task = null; return; }
      if (Gra.buildings.isNear(u, t.dropOff)) {
        if (u.carry) {
          const bonus = (t.dropOff.def.depositBonus && t.dropOff.def.depositBonus[u.carry.type]) || 1;
          resourcesOf(game, u.owner)[u.carry.type] += u.carry.amount * bonus;
        }
        u.carry = null;
        u.path = [];
        if (t.x === null) { u.task = null; return; }
        if (isHarvestable(map, t.x, t.y, t.res, regionOf(game, u))) goToResource(game, u); else retarget(game, u);
        return;
      }
      if (!u.moving) {
        if (++t.retries > MAX_RETRIES) { u.task = null; return; }
        Gra.buildings.approach(game, u, t.dropOff);
      }
    }
  }

  function update(game, dt) {
    for (const u of game.units) {
      if (u.task && u.task.kind === 'gather') updateWorker(game, u, dt);
    }
  }

  function describe(u) {
    const parts = [];
    if (u.task && u.task.kind === 'gather') {
      const name = RES_NAMES[u.task.res];
      parts.push({ toResource: `idzie po ${name}`, gathering: `zbiera ${name}`, returning: 'odnosi do bazy' }[u.task.phase]);
    } else if (u.task && u.task.kind === 'build') {
      parts.push(`${u.task.working ? 'buduje' : 'idzie budować'}: ${u.task.building.name}`);
    }
    if (u.carry) parts.push(`niesie ${Math.floor(u.carry.amount)}/${CFG.GATHER.carry} ${RES_NAMES[u.carry.type]}`);
    return parts.join(' · ');
  }

  Gra.economy = { commandGather, commandReturn, update, describe, RES_NAMES };
})();
