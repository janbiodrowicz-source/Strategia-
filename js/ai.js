// AI przeciwnika. Gra tymi samymi zasadami co gracz — korzysta z tych samych funkcji
// (zbieranie, budowa, kolejki, walka) i płaci z game.aiResources. Poziom trudności zmienia
// tempo zbierania (economy w js/economy.js), rozmiar i częstotliwość fal oraz rozmach planu.
//
// Co sekundę AI:
//   1. wysyła bezczynnych robotników do surowców wg proporcji rasy,
//   2. stawia kolejny budynek z planu (farma, gdy brakuje populacji → koszary → wieże),
//   3. dokupuje robotników i wojsko, bada technologie,
//   4. broni bazy i po okresie ochronnym wysyła fale ataku.
(function () {
  const CFG = Gra.CONFIG;
  const TILE = CFG.TILE;
  const B = () => Gra.buildings;
  const OWNER = 1;
  const TICK = 1;            // s między decyzjami
  const DEFENSE_RADIUS = 15; // kafelki od bazy AI, w których wróg wywołuje obronę
  const QUEUE_DEPTH = 2;     // ile jednostek AI trzyma w kolejce budynku

  // Plan rasy: podział robotników, kolejność koszar, proporcje armii
  const PLAN = {
    forest: {
      worker: 'gatherer',
      ratio: { wood: 0.55, stone: 0.15, gold: 0.3 },
      military: ['nest', 'pool', 'nest'],
      mix: { archer: 4, warden: 2, dryad: 1, scout: 1 },
    },
    iron: {
      worker: 'miner',
      ratio: { wood: 0.4, stone: 0.35, gold: 0.25 },
      military: ['workshop', 'forge', 'workshop'],
      mix: { crossbow: 4, hammer: 3, firepriest: 2 },
    },
  };

  const DIRS4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  function create(game) {
    return {
      timer: 0,
      rng: Gra.rng(game.seed + 99),
      nextWaveAt: game.round.protectionMin * 60,
      waveTarget: null,
      waveNo: 0,
      failedSpots: {}, // klucz budynku → czas, do którego nie próbujemy (brak miejsca)
      rebalanceAt: 0,
    };
  }

  // ---------- Pomocnicze ----------

  function randInt(ai, lo, hi) { return lo + Math.floor(ai.rng() * (hi - lo + 1)); }

  function mine(game) {
    return {
      units: game.units.filter((u) => u.owner === OWNER),
      buildings: game.buildings.filter((b) => b.owner === OWNER),
    };
  }

  function canAfford(res, cost, reserve) {
    return ['wood', 'stone', 'gold'].every((k) => res[k] - (cost[k] || 0) >= ((reserve && reserve[k]) || 0));
  }

  // Najbliższy kafelek surowca, do którego da się podejść (BFS bez limitu odległości)
  function nearestResource(map, sx, sy, res) {
    const seen = new Uint8Array(map.tiles.length);
    const queue = [[sx, sy]];
    seen[map.idx(sx, sy)] = 1;
    for (let qi = 0; qi < queue.length; qi++) {
      const [x, y] = queue[qi];
      if (map.resourceAt(x, y) === res && map.amount[map.idx(x, y)] > 0 &&
          DIRS4.some(([dx, dy]) => map.isWalkable(x + dx, y + dy))) return { x, y };
      for (const [dx, dy] of DIRS4) {
        const nx = x + dx, ny = y + dy;
        if (!map.inBounds(nx, ny) || seen[map.idx(nx, ny)]) continue;
        seen[map.idx(nx, ny)] = 1;
        queue.push([nx, ny]);
      }
    }
    return null;
  }

  // Punkt kilka kafelków od bazy w stronę środka mapy — tu zbiera się wojsko i stoją wieże
  function frontPoint(game, base, dist) {
    const c = B().center(base);
    const mx = game.map.w / 2, my = game.map.h / 2;
    const len = Math.hypot(mx - c.x, my - c.y) || 1;
    return { x: Math.round(c.x + (mx - c.x) / len * dist), y: Math.round(c.y + (my - c.y) / len * dist) };
  }

  // Miejsce na budynek: wolne kafelki + wolny pas 1 kafelka dookoła (żeby nie zatykać przejść)
  function findSpot(game, key, near) {
    const { map } = game;
    const size = CFG.RACES[game.aiRace].buildings[key].size;
    let best = null, bestD = Infinity;
    for (let y = near.y - 14; y <= near.y + 14; y++) {
      for (let x = near.x - 14; x <= near.x + 14; x++) {
        const d = Math.hypot(x + size / 2 - near.x, y + size / 2 - near.y);
        if (d >= bestD || d < 2.5) continue;
        if (!B().canPlace(game, OWNER, key, x, y)) continue;
        let clear = true;
        for (let yy = y - 1; yy <= y + size && clear; yy++) {
          for (let xx = x - 1; xx <= x + size && clear; xx++) {
            const inside = xx >= x && yy >= y && xx < x + size && yy < y + size;
            if (!inside && !map.isWalkable(xx, yy)) clear = false;
          }
        }
        if (clear) { best = { x, y }; bestD = d; }
      }
    }
    return best;
  }

  // ---------- Ekonomia ----------

  function assignWorkers(game, plan, base, workers) {
    const counts = { wood: 0, stone: 0, gold: 0 };
    for (const u of workers) if (u.task && u.task.kind === 'gather') counts[u.task.res]++;
    const c = B().center(base);
    for (const u of workers) {
      if (u.task || u.moving) continue;
      // Surowiec z największym niedoborem względem proporcji rasy
      const total = workers.length;
      const order = Object.keys(plan.ratio).sort((a, b) =>
        (counts[a] - plan.ratio[a] * total) - (counts[b] - plan.ratio[b] * total));
      for (const res of order) {
        const tile = nearestResource(game.map, Math.floor(c.x), Math.floor(c.y), res);
        if (tile && Gra.economy.commandGather(game, [u], tile.x, tile.y).length) { counts[res]++; break; }
      }
    }
  }

  // Gdy jednego surowca jest w nadmiarze, a drugiego brakuje — przenosimy robotnika (co 8 s)
  function rebalance(game, ai, plan, base, workers) {
    if (game.time < ai.rebalanceAt) return;
    const stock = game.aiResources;
    const keys = Object.keys(plan.ratio);
    const rich = keys.reduce((a, k) => (stock[k] / plan.ratio[k] > stock[a] / plan.ratio[a] ? k : a));
    const poor = keys.reduce((a, k) => (stock[k] / plan.ratio[k] < stock[a] / plan.ratio[a] ? k : a));
    if (rich === poor || stock[rich] < 300 || stock[poor] > 150) return;
    const u = workers.find((w) => w.task && w.task.kind === 'gather' && w.task.res === rich && !w.carry);
    if (!u) return;
    const c = B().center(base);
    const tile = nearestResource(game.map, Math.floor(c.x), Math.floor(c.y), poor);
    if (tile) Gra.economy.commandGather(game, [u], tile.x, tile.y);
    ai.rebalanceAt = game.time + 8;
  }

  // ---------- Budowa ----------

  function nextBuilding(game, plan, d, buildings) {
    const cap = B().populationCap(game, OWNER);
    const used = B().populationUsed(game, OWNER) + B().populationQueued(game, OWNER);
    if (cap - used <= 2 && cap < 80) return 'farm';
    const military = buildings.filter((b) => plan.military.includes(b.key)).length;
    if (military < d.military) return plan.military[military % plan.military.length];
    if (buildings.filter((b) => b.key === 'tower').length < d.towers) return 'tower';
    if (cap - used <= 5 && cap < 80) return 'farm';
    return null;
  }

  // Niedokończony budynek bez budowniczego (np. robotnik zginął albo utknął) — dosyłamy najbliższego
  function finishSites(game, buildings, workers) {
    for (const b of buildings) {
      if (b.state === 'done') continue;
      if (workers.some((u) => u.task && u.task.kind === 'build' && u.task.building === b)) continue;
      const c = B().center(b);
      const free = workers.filter((u) => !(u.task && u.task.kind === 'build'));
      if (!free.length) return;
      const u = free.reduce((a, o) => (Math.hypot(o.tileX - c.x, o.tileY - c.y) < Math.hypot(a.tileX - c.x, a.tileY - c.y) ? o : a));
      B().commandBuild(game, [u], b);
    }
  }

  function build(game, ai, key, base, workers) {
    if (!workers.length || (ai.failedSpots[key] || 0) > game.time) return false;
    const near = key === 'tower' ? frontPoint(game, base, 5) : B().center(base);
    const spot = findSpot(game, key, { x: Math.round(near.x), y: Math.round(near.y) });
    if (!spot) { ai.failedSpots[key] = game.time + 30; return false; }
    return !B().order(game, workers, key, spot.x, spot.y).error;
  }

  // ---------- Produkcja ----------

  function trainWorkers(game, plan, d, base, workers) {
    if (!base || base.state !== 'done' || base.queue.length >= QUEUE_DEPTH) return;
    const queued = base.queue.filter((q) => q.type === plan.worker).length;
    if (workers.length + queued < d.workers) B().enqueue(game, base, plan.worker);
  }

  function trainArmy(game, plan, units, buildings, reserve) {
    const res = game.aiResources;
    const unitDefs = CFG.RACES[game.aiRace].units;
    const count = {};
    for (const u of units) count[u.type] = (count[u.type] || 0) + 1;
    for (const b of buildings) for (const q of b.queue) count[q.type] = (count[q.type] || 0) + 1;
    const available = [...new Set(buildings.filter((b) => b.state === 'done' && plan.military.includes(b.key))
      .flatMap((b) => b.def.produces || []).filter((t) => plan.mix[t]))];
    for (const b of buildings) {
      if (b.state !== 'done' || !plan.military.includes(b.key) || b.queue.length >= QUEUE_DEPTH) continue;
      // Typ najbardziej „niedoreprezentowany” względem proporcji armii
      // Tylko najbardziej potrzebny typ — jeśli go nie stać, AI na niego oszczędza
      // (inaczej kupowałoby w kółko najtańszą jednostkę)
      const options = (b.def.produces || []).filter((t) => plan.mix[t]);
      options.sort((a, c) => (count[a] || 0) / plan.mix[a] - (count[c] || 0) / plan.mix[c]);
      const type = options[0];
      if (!type || !canAfford(res, unitDefs[type].cost, reserve)) continue;
      // Budynek z jednym typem (np. Sadzawka → Dryady) nie może zalać armii ponad proporcję.
      // Liczymy tylko typy, które AI faktycznie może teraz produkować.
      const total = available.reduce((s, t) => s + (count[t] || 0), 0);
      const share = plan.mix[type] / available.reduce((s, t) => s + plan.mix[t], 0);
      if (total >= 4 && (count[type] || 0) / total > share + 0.1) continue;
      if (!B().enqueue(game, b, type)) count[type] = (count[type] || 0) + 1;
    }
  }

  function research(game, base) {
    if (!base || base.research) return;
    for (const key of Object.keys(CFG.RACES[game.aiRace].techs)) {
      if (!B().startResearch(game, base, key)) return;
    }
  }

  // ---------- Wojsko ----------

  function nearestPlayerBuilding(game, x, y) {
    let best = null, bestD = Infinity;
    for (const b of game.buildings) {
      if (b.owner === OWNER) continue;
      const c = B().center(b);
      const d = Math.hypot(c.x - x, c.y - y);
      if (d < bestD) { bestD = d; best = b; }
    }
    return best;
  }

  function sendToAttack(game, units) {
    for (const u of units) {
      const target = nearestPlayerBuilding(game, u.tileX, u.tileY);
      if (!target) return;
      const c = B().center(target);
      Gra.combat.commandAttackMove(game, [u], Math.floor(c.x), Math.floor(c.y));
    }
  }

  function waves(game, ai, d, army, base) {
    if (!Gra.combat.combatAllowed(game) || game.time < ai.nextWaveAt) return;
    if (!ai.waveTarget) ai.waveTarget = randInt(ai, d.wave[0], d.wave[1]);
    const free = army.filter((u) => !u.waveId);
    // Spóźniona fala (AI nie nazbierało pełnej) rusza po 90 s z tym, co ma — byle nie mniej niż minimum
    const late = game.time > ai.nextWaveAt + 90 && free.length >= d.wave[0];
    if (free.length < ai.waveTarget && !late) return;
    const c = base ? B().center(base) : { x: 0, y: 0 };
    free.sort((a, b) => Math.hypot(a.tileX - c.x, a.tileY - c.y) - Math.hypot(b.tileX - c.x, b.tileY - c.y));
    const wave = free.slice(0, ai.waveTarget);
    ai.waveNo++;
    for (const u of wave) u.waveId = ai.waveNo;
    sendToAttack(game, wave);
    game.toast(`🌊 Nadciąga fala wroga nr ${ai.waveNo}: ${wave.length} jednostek!`);
    ai.nextWaveAt = game.time + d.waveEveryMin * 60;
    ai.waveTarget = null;
  }

  // Jednostki z fali, które skończyły rozkaz, idą na kolejny budynek gracza
  function pressWaves(game, army) {
    sendToAttack(game, army.filter((u) => u.waveId && !u.task && !u.moving));
  }

  function defend(game, army, base) {
    if (!base || !Gra.combat.combatAllowed(game)) return;
    const c = B().center(base);
    let intruder = null, bestD = DEFENSE_RADIUS;
    for (const u of game.units) {
      if (u.owner === OWNER) continue;
      const d = Math.hypot(u.x / TILE - c.x, u.y / TILE - c.y);
      if (d < bestD) { bestD = d; intruder = u; }
    }
    if (!intruder) return;
    const idle = army.filter((u) => !u.waveId && (!u.task || u.task.kind === 'attackMove' && !u.task.target));
    if (idle.length) Gra.combat.commandAttackMove(game, idle, intruder.tileX, intruder.tileY);
  }

  function setRallies(game, buildings, base) {
    if (!base) return;
    const p = frontPoint(game, base, 4);
    for (const b of buildings) if (b.def.produces && !b.rally && b.key !== 'base') B().setRally(b, p.x, p.y);
  }

  // ---------- Pętla ----------

  function tick(game, ai) {
    const plan = PLAN[game.aiRace];
    const d = game.difficulty;
    const { units, buildings } = mine(game);
    if (!buildings.length) return;
    const base = buildings.find((b) => b.key === 'base') || null;
    const anchor = base || buildings[0];
    const workers = units.filter((u) => u.def.worker);
    const army = units.filter((u) => !u.def.worker);

    finishSites(game, buildings, workers);
    assignWorkers(game, plan, anchor, workers);
    rebalance(game, ai, plan, anchor, workers);

    // Jedna budowa naraz; na brakujący budynek odkładamy surowce (rezerwa blokuje wojsko)
    let reserve = null;
    if (!buildings.some((b) => b.state !== 'done')) {
      const key = nextBuilding(game, plan, d, buildings);
      if (key) {
        const cost = CFG.RACES[game.aiRace].buildings[key].cost;
        if (canAfford(game.aiResources, cost)) build(game, ai, key, anchor, workers);
        else reserve = cost;
      }
    }

    trainWorkers(game, plan, d, base, workers);
    trainArmy(game, plan, army, buildings, reserve);
    if (d.techs) research(game, base);
    setRallies(game, buildings, anchor);

    defend(game, army, anchor);
    waves(game, ai, d, army, anchor);
    pressWaves(game, army);
  }

  function update(game, dt) {
    const ai = game.ai;
    ai.timer -= dt;
    if (ai.timer > 0) return;
    ai.timer = TICK;
    tick(game, ai);
  }

  // Czas do następnej fali (s) albo null przed końcem ochrony
  function nextWaveIn(game) {
    if (!Gra.combat.combatAllowed(game)) return null;
    return game.ai.nextWaveAt - game.time;
  }

  Gra.ai = { create, update, nextWaveIn };
})();
