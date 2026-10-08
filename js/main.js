// Pętla gry, stan rozgrywki, HUD, panel akcji i menu startowe.
(function () {
  const CFG = Gra.CONFIG;
  const TILE = CFG.TILE;
  const B = () => Gra.buildings;

  function fmtTime(sec) {
    sec = Math.max(0, Math.ceil(sec));
    return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
  }

  function spawnAround(game, race, owner, base) {
    const types = CFG.RACES[race].startUnits;
    const slots = game.map.formationTiles(base.x, base.y + 3, types.length);
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
      selectedBuilding: null,
      placing: null, // { key, x, y, valid } — tryb stawiania budynku
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
      B().create(game, owner, 'base', base.x - 1, base.y - 1, 'done');
      spawnAround(game, owner === 0 ? game.playerRace : game.aiRace, owner, base);
    });

    game.populationCap = (owner = 0) => B().populationCap(game, owner);
    game.populationUsed = (owner = 0) => B().populationUsed(game, owner);

    // ---------- Kamera ----------
    // cam to lewy górny róg widoku w pikselach świata, zoom skaluje widok.
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

    // ---------- Zaznaczenie ----------
    game.selectedUnits = () => game.units.filter((u) => u.selected && u.owner === 0);
    game.selectBuilding = (b) => {
      for (const u of game.units) u.selected = false;
      game.selectedBuilding = b;
      game.placing = null;
      game.onSelectionChange();
    };
    game.onSelectionChange = () => updatePanel(game, true);

    // ---------- Rozkazy ----------
    // Rozkaz kontekstowy jednostek: surowiec → zbieranie, niedokończony budynek → pomoc w budowie,
    // własny punkt zrzutu → odniesienie ładunku, reszta → ruch
    game.command = (units, wx, wy) => {
      const tx = Math.floor(wx / TILE), ty = Math.floor(wy / TILE);
      let busy = [];
      let kind = 'move';
      const b = B().buildingAt(game, tx, ty);
      if (map.resourceAt(tx, ty)) {
        busy = Gra.economy.commandGather(game, units, tx, ty);
        if (busy.length) kind = 'gather';
      } else if (b && b.owner === 0 && b.state !== 'done') {
        busy = B().commandBuild(game, units, b);
        if (busy.length) kind = 'gather';
      } else if (b && b.owner === 0 && b.dropOff) {
        busy = Gra.economy.commandReturn(game, units, b);
      }
      Gra.commandMove(map, units.filter((u) => !busy.includes(u)), tx, ty);
      return kind;
    };
    game.setRally = (wx, wy) => {
      const b = game.selectedBuilding;
      if (!b || b.owner !== 0 || !b.def.produces) return false;
      B().setRally(b, Math.floor(wx / TILE), Math.floor(wy / TILE));
      return true;
    };

    // ---------- Stawianie budynków ----------
    game.startPlacing = (key) => {
      game.placing = { key, x: 0, y: 0, valid: false };
      game.movePlacing(game.cam.x + canvas.width / game.zoom / 2, game.cam.y + canvas.height / game.zoom / 2);
      updatePanel(game, true);
    };
    game.movePlacing = (wx, wy) => {
      const pl = game.placing;
      if (!pl) return;
      const size = CFG.RACES[game.playerRace].buildings[pl.key].size;
      Object.assign(pl, B().topLeftAt(size, wx, wy));
      pl.valid = B().canPlace(game, 0, pl.key, pl.x, pl.y);
    };
    game.confirmPlacing = (keepPlacing) => {
      const pl = game.placing;
      if (!pl) return;
      const workers = game.selectedUnits().filter((u) => u.def.worker);
      if (!workers.length) { game.cancelPlacing(); return; }
      const res = B().order(game, workers, pl.key, pl.x, pl.y);
      if (res.error) { game.toast(`⚠️ ${res.error}`); return; }
      if (keepPlacing) pl.valid = B().canPlace(game, 0, pl.key, pl.x, pl.y);
      else game.placing = null;
      updatePanel(game, true);
    };
    game.cancelPlacing = () => {
      game.placing = null;
      updatePanel(game, true);
    };

    // ---------- Komunikaty ----------
    let toastTimer = null;
    game.toast = (msg) => {
      const el = document.getElementById('toast');
      el.textContent = msg;
      el.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { el.hidden = true; }, 2500);
    };

    resize(game);
    window.addEventListener('resize', () => resize(game));
    Gra.input.attach(game);
    attachPanel(game);
    const base = map.bases[0];
    game.centerCamera((base.x + 0.5) * TILE, (base.y + 0.5) * TILE);
    game.fog.update(game.units, game.buildings, 0);

    document.getElementById('menu').hidden = true;
    document.getElementById('hud').hidden = false;
    document.getElementById('round-label').textContent =
      `${round.name} · ${game.difficulty.name} · ${CFG.RACES[game.playerRace].name}`;
    updatePanel(game, true);

    let last = performance.now(), fogTimer = 0, hudTimer = 0;
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      game.time += dt;

      Gra.input.updateCamera(game, dt);
      for (const u of game.units) u.update(dt);
      Gra.economy.update(game, dt);
      Gra.buildings.update(game, dt);
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
        updatePanel(game, false);
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

  // ---------- Panel: opis zaznaczenia + przyciski akcji ----------

  const isTouch = () => document.body.classList.contains('touch');

  // Zwraca { info, actions: [{ label, sub, disabled, on, run }] }
  function panelModel(game) {
    const race = CFG.RACES[game.playerRace];
    const actions = [];

    if (game.placing) {
      const def = race.buildings[game.placing.key];
      const where = isTouch() ? 'dotknij mapy, potem ✔ Postaw' : 'LPM — postaw (Shift — kilka), PPM / Esc — anuluj';
      if (isTouch()) {
        actions.push({ label: '✔ Postaw', sub: game.placing.valid ? '' : 'zajęte', disabled: !game.placing.valid,
                       run: () => game.confirmPlacing(false) });
      }
      actions.push({ label: '✖ Anuluj', sub: '', run: () => game.cancelPlacing() });
      return { info: `${def.icon} ${def.name} (${B().costText(def.cost)}) — ${where}`, actions };
    }

    const b = game.selectedBuilding;
    if (b) {
      let info = `${b.icon} ${b.name} — HP ${b.hp}/${b.def.hp}`;
      if (b.state !== 'done') {
        info += b.state === 'site' ? ' · czeka na budowniczego' : ` · budowa ${Math.floor(b.progress * 100)}%`;
        actions.push({ label: '✖ Anuluj budowę', sub: b.state === 'site' ? 'zwrot 100%' : 'zwrot 75%',
                       run: () => B().cancelConstruction(game, b) });
        return { info, actions };
      }
      if (b.def.pop) info += ` · populacja +${b.def.pop}`;
      if (b.def.depositBonus) {
        info += ' · zrzut surowców: ' + Object.entries(b.def.depositBonus)
          .map(([k, v]) => `${Gra.economy.RES_NAMES[k]} +${Math.round((v - 1) * 100)}%`).join(', ');
      }
      for (const type of b.def.produces || []) {
        const u = race.units[type];
        actions.push({ label: u.name, sub: `${B().costText(u.cost)} · ${u.time}s`,
                       disabled: !!B().missing(game, 0, u.cost),
                       run: () => { const err = B().enqueue(game, b, type); if (err) game.toast(`⚠️ ${err}`); } });
      }
      if (b.queue.length) {
        const item = b.queue[0];
        info += ` · produkcja: ${race.units[item.type].name} ${Math.floor(item.t / race.units[item.type].time * 100)}%`;
        b.queue.forEach((q, i) => actions.push({ label: `⏳ ${race.units[q.type].name}`, sub: 'anuluj', on: i === 0,
                                                run: () => B().cancelQueued(game, b, i) }));
      }
      if (b.def.produces) info += isTouch() ? ' · dotknij mapy — punkt zbiórki' : ' · PPM — punkt zbiórki';
      if (!b.def.produces && !b.def.pop && !b.def.dropOff) info += ` — ${b.def.desc}`;
      return { info, actions };
    }

    const sel = game.selectedUnits();
    if (!sel.length) {
      return { info: isTouch()
        ? 'Dotknij jednostkę lub budynek. Robotnik + las/skała/złoto — zbieranie. Dwa palce — zoom.'
        : 'LPM — zaznacz jednostkę lub budynek (przeciągnij — obszar). PPM — rozkaz. Spacja — baza. Kółko — zoom.',
        actions };
    }

    let info;
    if (sel.length === 1) {
      const u = sel[0], d = u.def;
      const status = Gra.economy.describe(u);
      info = `${d.name} — HP ${u.hp}/${d.hp} · atak ${d.attack} co ${d.attackInterval} s · zasięg ${d.range} · ` +
             `ruch ${d.speed} · pop ${d.pop}` + (status ? ` — ${status}` : ` — ${d.desc}`);
    } else {
      const counts = {};
      for (const u of sel) counts[u.def.name] = (counts[u.def.name] || 0) + 1;
      const working = sel.filter((u) => u.task).length;
      info = `Zaznaczono ${sel.length}: ` + Object.entries(counts).map(([n, c]) => `${n} ×${c}`).join(', ') +
             (working ? ` · pracuje: ${working}` : '');
    }
    if (sel.some((u) => u.def.worker)) {
      for (const [key, def] of Object.entries(race.buildings)) {
        if (def.buildable === false) continue;
        actions.push({ label: `${def.icon} ${def.name.replace(/ \(.*\)/, '')}`, sub: B().costText(def.cost),
                       disabled: !!B().missing(game, 0, def.cost),
                       run: () => game.startPlacing(key) });
      }
    }
    return { info, actions };
  }

  let panelKey = '';
  let panelActions = [];
  function updatePanel(game, force) {
    const { info, actions } = panelModel(game);
    document.getElementById('selection-info').textContent = info;
    // Przyciski przebudowujemy tylko gdy się zmieniły — inaczej klik mógłby trafić w znikający element
    const key = JSON.stringify(actions.map((a) => [a.label, a.sub, !!a.disabled, !!a.on]));
    panelActions = actions;
    if (!force && key === panelKey) return;
    panelKey = key;
    const box = document.getElementById('actions');
    box.innerHTML = '';
    actions.forEach((a, i) => {
      const btn = document.createElement('button');
      btn.dataset.i = i;
      btn.className = (a.disabled ? 'disabled ' : '') + (a.on ? 'on' : '');
      btn.innerHTML = '<b></b><span></span>';
      btn.firstChild.textContent = a.label;
      btn.lastChild.textContent = a.sub;
      box.appendChild(btn);
    });
    box.hidden = !actions.length;
  }

  function attachPanel(game) {
    document.getElementById('actions').addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const a = panelActions[Number(btn.dataset.i)];
      if (!a) return;
      if (a.disabled) {
        // Wyszarzony przycisk nadal tłumaczy, czego brakuje (ważne na telefonie — brak podpowiedzi)
        if (a.sub && a.sub !== 'zajęte') game.toast(`⚠️ Za mało surowców: ${a.sub}`);
        return;
      }
      a.run();
      updatePanel(game, true);
    });
  }

  Gra.startGame = startGame;

  document.getElementById('start-btn').addEventListener('click', () => {
    const val = (name) => document.querySelector(`input[name="${name}"]:checked`).value;
    startGame({ race: val('race'), round: Number(val('round')), difficulty: val('difficulty') });
  });
})();
