// Budynki: stawianie, budowa przez robotników, produkcja jednostek, anulowanie.
//
// Budynek: x, y — lewy górny kafelek, size — bok w kafelkach.
// Stany: 'site' (plac budowy, robotnik w drodze) → 'building' (w budowie) → 'done'.
(function () {
  const CFG = Gra.CONFIG;
  const TILE = CFG.TILE;
  const T = Gra.TILES;
  const MAX_RETRIES = 3;
  let nextId = 1;

  const RES_ICONS = { wood: '🪵', stone: '🪨', gold: '🪙' };

  const raceOf = (game, owner) => (owner === 0 ? game.playerRace : game.aiRace);
  const resourcesOf = (game, owner) => (owner === 0 ? game.resources : game.aiResources);

  // ---------- Geometria ----------

  function center(b) { return { x: b.x + b.size / 2, y: b.y + b.size / 2 }; } // w kafelkach
  function contains(b, tx, ty) { return tx >= b.x && ty >= b.y && tx < b.x + b.size && ty < b.y + b.size; }
  function buildingAt(game, tx, ty) { return game.buildings.find((b) => contains(b, tx, ty)) || null; }

  // Czy jednostka stoi tuż przy budynku
  function isNear(u, b) {
    const c = center(b);
    return Math.max(Math.abs(u.x / TILE - c.x), Math.abs(u.y / TILE - c.y)) <= b.size / 2 + 0.9;
  }

  // Wolne kafelki dookoła budynku
  function ringTiles(map, b) {
    const out = [];
    for (let y = b.y - 1; y <= b.y + b.size; y++) {
      for (let x = b.x - 1; x <= b.x + b.size; x++) {
        if (!contains(b, x, y) && map.isWalkable(x, y)) out.push({ x, y });
      }
    }
    return out;
  }

  function closestTile(tiles, x, y) {
    let best = null, bestD = Infinity;
    for (const t of tiles) {
      const d = Math.hypot(t.x - x, t.y - y);
      if (d < bestD) { bestD = d; best = t; }
    }
    return best;
  }

  function approach(game, u, b) {
    const t = closestTile(ringTiles(game.map, b), u.tileX, u.tileY);
    if (t) u.moveTo(game.map, t.x, t.y);
    return !!t;
  }

  // ---------- Koszty ----------

  function costText(cost) {
    return Object.entries(cost).filter(([, v]) => v > 0).map(([k, v]) => `${RES_ICONS[k]}${v}`).join(' ') || 'za darmo';
  }

  // Brakujące surowce jako tekst, albo null gdy stać
  function missing(game, owner, cost) {
    const r = resourcesOf(game, owner);
    const lack = Object.entries(cost).filter(([k, v]) => r[k] < v).map(([k, v]) => `${RES_ICONS[k]}${Math.ceil(v - r[k])}`);
    return lack.length ? lack.join(' ') : null;
  }

  function pay(game, owner, cost, sign = -1, mult = 1) {
    const r = resourcesOf(game, owner);
    for (const [k, v] of Object.entries(cost)) r[k] += sign * Math.floor(v * mult);
  }

  // ---------- Populacja ----------

  function populationCap(game, owner) {
    return game.buildings.filter((b) => b.owner === owner && b.state === 'done').reduce((s, b) => s + b.def.pop, 0);
  }

  function populationUsed(game, owner) {
    return game.units.filter((u) => u.owner === owner).reduce((s, u) => s + u.def.pop, 0);
  }

  function populationQueued(game, owner) {
    const units = CFG.RACES[raceOf(game, owner)].units;
    return game.buildings.filter((b) => b.owner === owner)
      .reduce((s, b) => s + b.queue.reduce((q, item) => q + units[item.type].pop, 0), 0);
  }

  // ---------- Stawianie ----------

  function maxHpOf(game, owner, def) {
    const mult = Gra.combat.hasTech(game, owner, 'buildingHp') ? CFG.COMBAT.buildingHp : 1;
    return Math.round(def.hp * mult);
  }

  function create(game, owner, key, x, y, state) {
    const def = CFG.RACES[raceOf(game, owner)].buildings[key];
    const maxHp = maxHpOf(game, owner, def);
    const b = {
      id: nextId++, owner, key, def, name: def.name, icon: def.icon,
      x, y, size: def.size, state,
      progress: state === 'done' ? 1 : 0,
      maxHp,
      hp: state === 'done' ? maxHp : 1,
      queue: [], rally: null, research: null,
      cd: 0, burn: null, hitT: 0,
      dropOff: !!def.dropOff,
      sight: def.sight || 5,
    };
    for (let dy = 0; dy < b.size; dy++)
      for (let dx = 0; dx < b.size; dx++) game.map.set(x + dx, y + dy, T.BUILDING);
    game.buildings.push(b);
    clearFootprint(game, b);
    return b;
  }

  // Jednostki stojące na nowym budynku przesuwamy obok, a idącym wyznaczamy trasę od nowa
  // (wygładzona ścieżka może przecinać budynek między punktami pośrednimi)
  function clearFootprint(game, b) {
    for (const u of game.units) {
      if (contains(b, u.tileX, u.tileY)) {
        const free = game.map.nearestWalkable(u.tileX, u.tileY);
        if (free) { u.x = (free.x + 0.5) * TILE; u.y = (free.y + 0.5) * TILE; }
      }
      if (u.path.length) {
        const last = u.path[u.path.length - 1];
        u.moveTo(game.map, last.x, last.y);
      }
    }
  }

  // Lewy górny kafelek budynku o boku size, którego środek wypada w punkcie świata (wx, wy)
  function topLeftAt(size, wx, wy) {
    return { x: Math.round(wx / TILE - size / 2), y: Math.round(wy / TILE - size / 2) };
  }

  function canPlace(game, owner, key, x, y) {
    const { map, fog } = game;
    const size = CFG.RACES[raceOf(game, owner)].buildings[key].size;
    for (let dy = 0; dy < size; dy++) {
      for (let dx = 0; dx < size; dx++) {
        const tx = x + dx, ty = y + dy;
        if (!map.inBounds(tx, ty) || map.get(tx, ty) !== T.GRASS) return false;
        if (owner === 0 && !fog.isExplored(tx, ty)) return false;
        if (game.units.some((u) => u.owner !== owner && u.tileX === tx && u.tileY === ty)) return false;
      }
    }
    return true;
  }

  // Rozkaz budowy: płaci, stawia plac budowy i wysyła najbliższego z robotników.
  // Zwraca { building } albo { error }.
  function order(game, workers, key, x, y) {
    const owner = workers[0].owner;
    const def = CFG.RACES[raceOf(game, owner)].buildings[key];
    if (!canPlace(game, owner, key, x, y)) return { error: 'Nie można tu budować' };
    const lack = missing(game, owner, def.cost);
    if (lack) return { error: `Brakuje: ${lack}` };
    pay(game, owner, def.cost);
    const b = create(game, owner, key, x, y, 'site');
    const c = center(b);
    // Najpierw robotnicy, którzy nic nie budują — żeby nie porzucić wcześniej zleconej budowy
    const free = workers.filter((u) => !u.task || u.task.kind !== 'build');
    const builder = (free.length ? free : workers).reduce((best, u) =>
      Math.hypot(u.x / TILE - c.x, u.y / TILE - c.y) < Math.hypot(best.x / TILE - c.x, best.y / TILE - c.y) ? u : best);
    assignBuilder(game, builder, b);
    return { building: b };
  }

  function assignBuilder(game, u, b) {
    u.task = { kind: 'build', building: b, retries: 0, working: false };
    approach(game, u, b);
  }

  // Robotnicy pomagają przy niedokończonym budynku
  function commandBuild(game, units, b) {
    const workers = units.filter((u) => u.def.worker && u.owner === b.owner);
    if (b.state === 'done') return [];
    for (const u of workers) assignBuilder(game, u, b);
    return workers;
  }

  function remove(game, b) {
    for (let dy = 0; dy < b.size; dy++)
      for (let dx = 0; dx < b.size; dx++) game.map.set(b.x + dx, b.y + dy, T.GRASS);
    game.buildings.splice(game.buildings.indexOf(b), 1);
    if (game.selectedBuilding === b) game.selectedBuilding = null;
  }

  // Anulowanie budowy: plac bez rozpoczętej budowy — pełny zwrot, rozpoczęta — 75%
  function cancelConstruction(game, b) {
    if (b.state === 'done') return;
    pay(game, b.owner, b.def.cost, +1, b.state === 'site' ? 1 : CFG.CANCEL_REFUND_STARTED);
    remove(game, b);
  }

  // ---------- Produkcja ----------

  // Zwraca null przy sukcesie albo komunikat błędu
  function enqueue(game, b, type) {
    if (b.state !== 'done' || !(b.def.produces || []).includes(type)) return 'Ten budynek tego nie produkuje';
    if (b.queue.length >= CFG.QUEUE_MAX) return `Kolejka pełna (maks. ${CFG.QUEUE_MAX})`;
    const unit = CFG.RACES[raceOf(game, b.owner)].units[type];
    const lack = missing(game, b.owner, unit.cost);
    if (lack) return `Brakuje: ${lack}`;
    const pop = populationUsed(game, b.owner) + populationQueued(game, b.owner) + unit.pop;
    if (pop > populationCap(game, b.owner)) return 'Za mało populacji — zbuduj farmę';
    pay(game, b.owner, unit.cost);
    b.queue.push({ type, t: 0 });
    return null;
  }

  function cancelQueued(game, b, index) {
    const item = b.queue[index];
    if (!item) return;
    pay(game, b.owner, CFG.RACES[raceOf(game, b.owner)].units[item.type].cost, +1);
    b.queue.splice(index, 1);
  }

  // ---------- Technologie ----------

  const techsOf = (game, owner) => CFG.RACES[raceOf(game, owner)].techs;

  // null — można badać, albo powód, dla którego nie
  function researchBlocker(game, b, key) {
    const tech = techsOf(game, b.owner)[key];
    if (b.key !== 'base' || b.state !== 'done') return 'Technologie bada się w bazie';
    if (Gra.combat.hasTech(game, b.owner, tech.effect)) return 'Już zbadane';
    if (b.research) return 'Baza już coś bada';
    const wait = tech.unlockMin * 60 - game.time;
    if (wait > 0) return `Dostępne od ${tech.unlockMin}:00 gry`;
    return null;
  }

  function startResearch(game, b, key) {
    const block = researchBlocker(game, b, key);
    if (block) return block;
    const tech = techsOf(game, b.owner)[key];
    const lack = missing(game, b.owner, tech.cost);
    if (lack) return `Brakuje: ${lack}`;
    pay(game, b.owner, tech.cost);
    b.research = { key, t: 0 };
    return null;
  }

  function cancelResearch(game, b) {
    if (!b.research) return;
    pay(game, b.owner, techsOf(game, b.owner)[b.research.key].cost, +1);
    b.research = null;
  }

  function applyTech(game, owner, tech) {
    game.techs[owner].add(tech.effect);
    if (tech.effect === 'buildingHp') {
      for (const b of game.buildings) {
        if (b.owner !== owner) continue;
        const max = maxHpOf(game, owner, b.def);
        b.hp = Math.round(b.hp * max / b.maxHp);
        b.maxHp = max;
      }
    }
  }

  function spawn(game, b, type) {
    const race = raceOf(game, b.owner);
    const c = center(b);
    const target = b.rally || { x: c.x, y: b.y + b.size };
    const tile = closestTile(ringTiles(game.map, b), target.x, target.y) ||
                 game.map.nearestWalkable(Math.floor(c.x), b.y + b.size);
    if (!tile) return null;
    const u = new Gra.Unit(race, type, b.owner, tile.x, tile.y);
    game.units.push(u);
    if (b.rally) {
      if (game.map.resourceAt(b.rally.x, b.rally.y) && u.def.worker) {
        Gra.economy.commandGather(game, [u], b.rally.x, b.rally.y);
      } else {
        u.moveTo(game.map, b.rally.x, b.rally.y);
      }
    }
    return u;
  }

  function setRally(b, tx, ty) {
    if (b.def.produces) b.rally = { x: tx, y: ty };
  }

  // ---------- Aktualizacja ----------

  function updateBuilders(game) {
    for (const u of game.units) {
      const t = u.task;
      if (!t || t.kind !== 'build') continue;
      const b = t.building;
      if (!game.buildings.includes(b) || b.state === 'done') { u.task = null; continue; }
      if (isNear(u, b)) {
        u.path = [];
        t.working = true;
        if (b.state === 'site') b.state = 'building';
        const c = center(b);
        u.facing = Math.atan2(c.y * TILE - u.y, c.x * TILE - u.x);
      } else {
        t.working = false;
        if (!u.moving) {
          if (++t.retries > MAX_RETRIES) { u.task = null; continue; }
          approach(game, u, b);
        }
      }
    }
  }

  function update(game, dt) {
    updateBuilders(game);
    for (const b of game.buildings.slice()) {
      if (b.state === 'building') {
        const n = game.units.filter((u) => u.task && u.task.kind === 'build' && u.task.building === b && u.task.working).length;
        if (!n) continue;
        const rate = 1 + CFG.EXTRA_BUILDER_RATE * (n - 1);
        const before = b.progress;
        b.progress = Math.min(1, b.progress + dt * rate / Math.max(1, b.def.time));
        b.hp = Math.min(b.maxHp, b.hp + (b.progress - before) * b.maxHp); // budowa dodaje HP, obrażenia zostają
        if (b.progress >= 1) {
          b.state = 'done';
          b.hp = Math.min(b.maxHp, b.hp);
          for (const u of game.units) if (u.task && u.task.building === b) u.task = null;
          if (b.owner === 0) game.toast(`✅ Gotowe: ${b.name}`);
        }
      }
      if (b.state === 'done' && b.research) {
        const tech = techsOf(game, b.owner)[b.research.key];
        b.research.t += dt;
        if (b.research.t >= tech.time) {
          b.research = null;
          applyTech(game, b.owner, tech);
          if (b.owner === 0) game.toast(`📜 Zbadano: ${tech.name} — ${tech.desc.replace(/^Tier \d+ \([^)]*\): /, '')}`);
        }
      }
      if (b.state === 'done' && b.queue.length) {
        const item = b.queue[0];
        const unit = CFG.RACES[raceOf(game, b.owner)].units[item.type];
        item.t += dt;
        if (item.t >= unit.time) {
          if (spawn(game, b, item.type)) b.queue.shift();
          else item.t = unit.time; // brak miejsca — spróbuj w następnej klatce
        }
      }
    }
  }

  Gra.buildings = {
    center, contains, buildingAt, isNear, approach, ringTiles,
    costText, missing, populationCap, populationUsed, populationQueued,
    create, canPlace, topLeftAt, order, commandBuild, cancelConstruction, destroy: remove,
    enqueue, cancelQueued, setRally, update,
    researchBlocker, startResearch, cancelResearch,
  };
})();
