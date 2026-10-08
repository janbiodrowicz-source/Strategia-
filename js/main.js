// Pętla gry, stan rozgrywki, HUD i menu startowe.
(function () {
  const CFG = Gra.CONFIG;
  const TILE = CFG.TILE;

  function fmtTime(sec) {
    sec = Math.max(0, Math.ceil(sec));
    return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
  }

  function spawnAround(game, race, owner, base) {
    const types = CFG.RACES[race].startUnits;
    const slots = game.map.formationTiles(base.x, base.y + 2, types.length);
    types.forEach((type, i) => game.units.push(new Gra.Unit(race, type, owner, slots[i].x, slots[i].y)));
  }

  function startGame(opts) {
    const round = CFG.ROUNDS[opts.round];
    const seed = opts.seed ?? Math.floor(Math.random() * 1e9);
    const map = new Gra.GameMap(round.size, seed);
    const canvas = document.getElementById('game');
    const minimap = document.getElementById('minimap');

    const game = Gra.game = {
      canvas, minimap,
      ctx: canvas.getContext('2d'),
      miniCtx: minimap.getContext('2d'),
      map, round, seed,
      difficulty: CFG.DIFFICULTY[opts.difficulty],
      playerRace: opts.race,
      aiRace: opts.race === 'forest' ? 'iron' : 'forest',
      units: [],
      buildings: [],
      resources: { ...CFG.START_RESOURCES },
      time: 0,
      cam: { x: 0, y: 0 },
      moveMarker: null,
      fog: new Gra.Fog(map, round.fog),
      mapImage: Gra.render.buildMapImage(map),
      minimapImage: Gra.render.buildMinimapImage(map),
    };

    map.bases.forEach((base, owner) => {
      game.buildings.push({ owner, x: base.x, y: base.y, name: 'Baza', sight: 8 });
      spawnAround(game, owner === 0 ? game.playerRace : game.aiRace, owner, base);
    });

    game.populationCap = () => game.buildings.filter((b) => b.owner === 0).length * CFG.POPULATION.base;
    game.moveCamera = (dx, dy) => {
      game.cam.x = Math.max(0, Math.min(map.w * TILE - canvas.width, game.cam.x + dx));
      game.cam.y = Math.max(0, Math.min(map.h * TILE - canvas.height, game.cam.y + dy));
    };
    game.centerCamera = (x, y) => {
      game.cam.x = x - canvas.width / 2;
      game.cam.y = y - canvas.height / 2;
      game.moveCamera(0, 0);
    };
    game.onSelectionChange = () => updateSelectionPanel(game);

    resize(game);
    window.addEventListener('resize', () => resize(game));
    Gra.input.attach(game);
    const base = map.bases[0];
    game.centerCamera((base.x + 0.5) * TILE, (base.y + 0.5) * TILE);
    game.fog.update(game.units, game.buildings, 0);

    document.getElementById('menu').hidden = true;
    document.getElementById('hud').hidden = false;
    document.getElementById('round-label').textContent =
      `${round.name} · ${game.difficulty.name} · ${CFG.RACES[game.playerRace].name}`;
    updateSelectionPanel(game);

    let last = performance.now(), fogTimer = 0, hudTimer = 0;
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      game.time += dt;

      Gra.input.updateCamera(game, dt);
      for (const u of game.units) u.update(dt);
      Gra.separateUnits(map, game.units);
      if (game.moveMarker && (game.moveMarker.age += dt) > 0.6) game.moveMarker = null;

      fogTimer += dt * 1000;
      if (fogTimer >= CFG.FOG_UPDATE_MS) {
        fogTimer = 0;
        game.fog.update(game.units, game.buildings, 0);
      }

      Gra.render.draw(game.ctx, game);
      hudTimer += dt;
      if (hudTimer >= 0.2) {
        hudTimer = 0;
        Gra.render.drawMinimap(game.miniCtx, game);
        updateHud(game);
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    return game;
  }

  function resize(game) {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
    game.moveCamera(0, 0);
  }

  function updateHud(game) {
    const r = game.resources;
    document.getElementById('res-wood').textContent = r.wood;
    document.getElementById('res-stone').textContent = r.stone;
    document.getElementById('res-gold').textContent = r.gold;
    const pop = game.units.filter((u) => u.owner === 0).length;
    document.getElementById('res-pop').textContent = `${pop}/${game.populationCap()}`;
    const left = game.round.protectionMin * 60 - game.time;
    const prot = document.getElementById('protection');
    prot.textContent = left > 0 ? `🛡️ Ochrona: ${fmtTime(left)}` : '⚔️ Ochrona minęła';
    prot.classList.toggle('over', left <= 0);
  }

  function updateSelectionPanel(game) {
    const panel = document.getElementById('selection');
    const sel = game.units.filter((u) => u.selected);
    if (!sel.length) {
      panel.textContent = 'Zaznacz jednostki LPM (lub przeciągnij). PPM — ruch. Ctrl+A — wszystkie. Spacja — baza.';
      return;
    }
    if (sel.length === 1) {
      const u = sel[0];
      panel.textContent = `${u.def.name} — HP ${u.hp}/${u.def.hp}, prędkość ${u.def.speed}, wzrok ${u.def.sight}`;
      return;
    }
    const counts = {};
    for (const u of sel) counts[u.def.name] = (counts[u.def.name] || 0) + 1;
    panel.textContent = `Zaznaczono ${sel.length}: ` +
      Object.entries(counts).map(([n, c]) => `${n} ×${c}`).join(', ');
  }

  Gra.startGame = startGame;

  document.getElementById('start-btn').addEventListener('click', () => {
    const val = (name) => document.querySelector(`input[name="${name}"]:checked`).value;
    startGame({ race: val('race'), round: Number(val('round')), difficulty: val('difficulty') });
  });
})();
