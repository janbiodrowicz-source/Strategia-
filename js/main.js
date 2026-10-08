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
      aiResources: { ...CFG.START_RESOURCES },
      time: 0,
      cam: { x: 0, y: 0 },
      zoom: 1,
      moveMarker: null,
      fog: new Gra.Fog(map, round.fog),
      mapImage: Gra.render.buildMapImage(map),
      minimapImage: Gra.render.buildMinimapImage(map),
    };

    map.bases.forEach((base, owner) => {
      const def = CFG.RACES[owner === 0 ? game.playerRace : game.aiRace].baseBuilding;
      game.buildings.push({ owner, x: base.x, y: base.y, def, name: def.name, hp: def.hp, sight: 8, dropOff: true });
      spawnAround(game, owner === 0 ? game.playerRace : game.aiRace, owner, base);
    });

    game.populationCap = (owner = 0) =>
      game.buildings.filter((b) => b.owner === owner).reduce((sum, b) => sum + b.def.pop, 0);
    game.populationUsed = (owner = 0) =>
      game.units.filter((u) => u.owner === owner).reduce((sum, u) => sum + u.def.pop, 0);
    // Kamera: cam to lewy górny róg widoku w pikselach świata, zoom skaluje widok.
    // Gdy mapa jest mniejsza niż widok (oddalenie), zostaje wyśrodkowana.
    const clampAxis = (v, mapPx, viewPx) => (mapPx <= viewPx ? (mapPx - viewPx) / 2 : Math.max(0, Math.min(mapPx - viewPx, v)));
    game.moveCamera = (dx, dy) => {
      game.cam.x = clampAxis(game.cam.x + dx, map.w * TILE, canvas.width / game.zoom);
      game.cam.y = clampAxis(game.cam.y + dy, map.h * TILE, canvas.height / game.zoom);
    };
    game.centerCamera = (x, y) => {
      game.cam.x = x - canvas.width / game.zoom / 2;
      game.cam.y = y - canvas.height / game.zoom / 2;
      game.moveCamera(0, 0);
    };
    // Zoom wokół punktu ekranu (sx, sy) — ten punkt świata zostaje pod palcem/kursorem
    game.setZoom = (z, sx = canvas.width / 2, sy = canvas.height / 2) => {
      const wx = sx / game.zoom + game.cam.x, wy = sy / game.zoom + game.cam.y;
      game.zoom = Math.max(CFG.ZOOM_MIN, Math.min(CFG.ZOOM_MAX, z));
      game.cam.x = wx - sx / game.zoom;
      game.cam.y = wy - sy / game.zoom;
      game.moveCamera(0, 0);
    };
    // Rozkaz kontekstowy: surowiec → robotnicy zbierają, własna baza → odnoszą ładunek, reszta → ruch
    game.command = (units, wx, wy) => {
      const tx = Math.floor(wx / TILE), ty = Math.floor(wy / TILE);
      let busy = [];
      let kind = 'move';
      if (map.resourceAt(tx, ty)) {
        busy = Gra.economy.commandGather(game, units, tx, ty);
        if (busy.length) kind = 'gather';
      } else {
        const b = game.buildings.find((b) => b.owner === 0 && b.dropOff &&
                                             Math.abs(b.x - tx) <= 1 && Math.abs(b.y - ty) <= 1);
        if (b) busy = Gra.economy.commandReturn(game, units, b);
      }
      Gra.commandMove(map, units.filter((u) => !busy.includes(u)), tx, ty);
      return kind;
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
      Gra.economy.update(game, dt);
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
        updateSelectionPanel(game);
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
    document.getElementById('res-wood').textContent = Math.floor(r.wood);
    document.getElementById('res-stone').textContent = Math.floor(r.stone);
    document.getElementById('res-gold').textContent = Math.floor(r.gold);
    document.getElementById('res-pop').textContent = `${game.populationUsed()}/${game.populationCap()}`;
    const left = game.round.protectionMin * 60 - game.time;
    const prot = document.getElementById('protection');
    prot.textContent = left > 0 ? `🛡️ Ochrona: ${fmtTime(left)}` : '⚔️ Ochrona minęła';
    prot.classList.toggle('over', left <= 0);
  }

  function updateSelectionPanel(game) {
    const panel = document.getElementById('selection');
    const sel = game.units.filter((u) => u.selected);
    if (!sel.length) {
      panel.textContent = document.body.classList.contains('touch')
        ? 'Dotknij jednostkę, potem miejsce na mapie. Robotnik + las/skała/złoto — zbieranie. Dwa palce — zoom.'
        : 'LPM — zaznacz (przeciągnij — obszar). PPM — ruch, na lesie/skale/złocie — zbieranie. Spacja — baza. Kółko — zoom.';
      return;
    }
    if (sel.length === 1) {
      const u = sel[0];
      const d = u.def;
      const status = Gra.economy.describe(u);
      panel.textContent = `${d.name} — HP ${u.hp}/${d.hp} · atak ${d.attack} co ${d.attackInterval} s · ` +
        `zasięg ${d.range} · ruch ${d.speed} · pop ${d.pop}` + (status ? ` — ${status}` : ` — ${d.desc}`);
      return;
    }
    const counts = {};
    for (const u of sel) counts[u.def.name] = (counts[u.def.name] || 0) + 1;
    const gathering = sel.filter((u) => u.task && u.task.kind === 'gather').length;
    panel.textContent = `Zaznaczono ${sel.length}: ` +
      Object.entries(counts).map(([n, c]) => `${n} ×${c}`).join(', ') +
      (gathering ? ` · zbiera: ${gathering}` : '');
  }

  Gra.startGame = startGame;

  document.getElementById('start-btn').addEventListener('click', () => {
    const val = (name) => document.querySelector(`input[name="${name}"]:checked`).value;
    startGame({ race: val('race'), round: Number(val('round')), difficulty: val('difficulty') });
  });
})();
