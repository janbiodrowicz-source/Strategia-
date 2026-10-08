// Zapis partii w przeglądarce (localStorage). Jeden slot: stan jest zapisywany co 30 s,
// przy przełączeniu karty i ręcznie (💾). Zapis kasowany po zakończeniu partii.
// Trasy jednostek nie są zapisywane — po wczytaniu jednostki stoją w miejscu.
(function () {
  const KEY = 'strategia-save-v1';
  const VERSION = 1;

  function snapshot(game) {
    return {
      v: VERSION,
      race: game.playerRace,
      round: game.roundNo,
      difficulty: game.difficultyKey,
      seed: game.seed,
      time: game.time,
      resources: { ...game.resources },
      aiResources: { ...game.aiResources },
      techs: { 0: [...game.techs[0]], 1: [...game.techs[1]] },
      ai: { nextWaveAt: game.ai.nextWaveAt, waveNo: game.ai.waveNo, waveTarget: game.ai.waveTarget, rebalanceAt: game.ai.rebalanceAt },
      map: { tiles: Array.from(game.map.tiles), amount: Array.from(game.map.amount, (v) => Math.round(v * 100) / 100) },
      explored: Array.from(game.fog.explored),
      buildings: game.buildings.map((b) => ({
        owner: b.owner, key: b.key, x: b.x, y: b.y, state: b.state,
        progress: b.progress, hp: b.hp, maxHp: b.maxHp,
        queue: b.queue, rally: b.rally, research: b.research,
      })),
      units: game.units.map((u) => ({
        owner: u.owner, race: u.race, type: u.type, x: u.x, y: u.y, hp: u.hp, carry: u.carry, facing: u.facing,
      })),
    };
  }

  // Sprawdza, czy zapis pasuje do tej wersji gry, zanim cokolwiek z niego użyjemy
  function valid(s) {
    const cfg = Gra.CONFIG;
    const round = cfg.ROUNDS[s && s.round];
    return !!round && s.v === VERSION && cfg.RACES[s.race] && cfg.DIFFICULTY[s.difficulty] &&
      s.map && s.map.tiles.length === round.size * round.size && s.map.amount.length === s.map.tiles.length &&
      s.explored && s.explored.length === s.map.tiles.length && Array.isArray(s.buildings) && Array.isArray(s.units);
  }

  function applyMap(map, m) {
    map.tiles.set(m.tiles);
    map.amount.set(m.amount);
  }

  function restore(game, s) {
    game.time = s.time;
    game.resources = { ...s.resources };
    game.aiResources = { ...s.aiResources };
    game.techs[0] = new Set(s.techs[0]);
    game.techs[1] = new Set(s.techs[1]);
    game.fog.explored.set(s.explored);
    Object.assign(game.ai, s.ai);
    // Budynki przed jednostkami: stawianie przesuwa jednostki stojące na placu
    for (const bs of s.buildings) {
      const b = Gra.buildings.create(game, bs.owner, bs.key, bs.x, bs.y, bs.state);
      Object.assign(b, { progress: bs.progress, hp: bs.hp, maxHp: bs.maxHp, queue: bs.queue, rally: bs.rally, research: bs.research });
    }
    for (const us of s.units) {
      const u = new Gra.Unit(us.race, us.type, us.owner, 0, 0);
      Object.assign(u, { x: us.x, y: us.y, hp: us.hp, carry: us.carry, facing: us.facing });
      game.units.push(u);
    }
    game.fog.update(game.units, game.buildings, 0);
  }

  function write(game) {
    if (game.over) return false;
    try {
      localStorage.setItem(KEY, JSON.stringify(snapshot(game)));
      return true;
    } catch (e) {
      return false; // brak miejsca albo zablokowany localStorage — gra działa dalej bez zapisu
    }
  }

  function read() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      return valid(s) ? s : null;
    } catch (e) {
      return null;
    }
  }

  function clear() {
    try { localStorage.removeItem(KEY); } catch (e) { /* nic do zrobienia */ }
  }

  Gra.save = { write, read, clear, applyMap, restore };
})();
