// Sterowanie myszą (PC) i dotykiem (telefon/tablet), kamera z przybliżaniem.
//
// PC: LPM — zaznacz / przeciągnij prostokąt, Shift — dodaj, PPM — rozkaz, kółko — zoom.
// Dotyk: tap w jednostkę — zaznacz, tap w teren — rozkaz, przeciąganie — kamera,
//        dwa palce — zoom, przyciski na dolnym pasku — obszar, wszystkie, robotnicy...
(function () {
  const TILE = Gra.CONFIG.TILE;
  const TAP_MOVE_PX = 12;
  const TAP_MS = 450;
  const DOUBLE_TAP_MS = 320;

  function attach(game) {
    const canvas = game.canvas;
    const mini = game.minimap;
    const input = game.input = {
      keys: new Set(), mouse: null, drag: null, mouseInside: false,
      boxMode: false, addMode: false, touch: null, lastTap: null,
    };

    const toWorld = (sx, sy) => ({ x: sx / game.zoom + game.cam.x, y: sy / game.zoom + game.cam.y });
    const local = (p, el) => {
      const r = el.getBoundingClientRect();
      return { x: p.clientX - r.left, y: p.clientY - r.top };
    };
    const ownUnits = () => game.units.filter((u) => u.owner === 0);

    function select(units, additive) {
      if (!additive) for (const u of game.units) u.selected = false;
      for (const u of units) u.selected = true;
      if (units.length || !additive) game.selectedBuilding = null;
      game.onSelectionChange();
    }

    // Rozkaz dla zaznaczonych jednostek albo punkt zbiórki zaznaczonego budynku
    function issueCommand(wx, wy) {
      const sel = game.selectedUnits();
      if (!sel.length) {
        if (game.setRally(wx, wy)) game.moveMarker = { x: wx, y: wy, age: 0, kind: 'rally' };
        return false;
      }
      const kind = game.command(sel, wx, wy);
      game.moveMarker = { x: wx, y: wy, age: 0, kind };
      return true;
    }

    function ownBuildingAt(sx, sy) {
      const w = toWorld(sx, sy);
      const b = Gra.buildings.buildingAt(game, Math.floor(w.x / TILE), Math.floor(w.y / TILE));
      return b && b.owner === 0 ? b : null;
    }

    // Czy dotknięcie budynku przy zaznaczonych jednostkach to rozkaz (pomoc w budowie / odniesienie
    // ładunku), a nie zaznaczenie budynku
    function isBuildingCommand(b) {
      const sel = game.selectedUnits();
      if (!sel.some((u) => u.def.worker)) return false;
      return b.state !== 'done' || (b.dropOff && sel.some((u) => u.carry));
    }

    function unitAt(sx, sy, slack) {
      const w = toWorld(sx, sy);
      let best = null, bestD = Infinity;
      for (const u of ownUnits()) {
        const dist = Math.hypot(u.x - w.x, u.y - w.y);
        if (dist <= u.radius + slack / game.zoom && dist < bestD) { best = u; bestD = dist; }
      }
      return best;
    }

    function boxSelect(d, additive) {
      const a = toWorld(Math.min(d.sx, d.ex), Math.min(d.sy, d.ey));
      const b = toWorld(Math.max(d.sx, d.ex), Math.max(d.sy, d.ey));
      const hit = ownUnits().filter((u) => u.x + u.radius >= a.x && u.x - u.radius <= b.x &&
                                          u.y + u.radius >= a.y && u.y - u.radius <= b.y);
      select(hit, additive);
    }

    // Wszystkie własne jednostki danego typu widoczne na ekranie
    function selectSameTypeOnScreen(type) {
      const a = toWorld(0, 0), b = toWorld(canvas.width, canvas.height);
      select(ownUnits().filter((u) => u.type === type && u.x >= a.x && u.x <= b.x && u.y >= a.y && u.y <= b.y), false);
    }

    // ---------- Mysz ----------
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    mini.addEventListener('contextmenu', (e) => e.preventDefault());

    canvas.addEventListener('mousedown', (e) => {
      const p = local(e, canvas);
      if (game.placing) {
        if (e.button === 0) {
          const w = toWorld(p.x, p.y);
          game.movePlacing(w.x, w.y);
          game.confirmPlacing(e.shiftKey);
        } else if (e.button === 2) {
          game.cancelPlacing();
        }
        return;
      }
      if (e.button === 0 && game.attackMoveArmed) {
        const w = toWorld(p.x, p.y);
        issueCommand(w.x, w.y);
        game.onSelectionChange();
        return;
      }
      if (e.button === 0) {
        input.drag = { sx: p.x, sy: p.y, ex: p.x, ey: p.y, active: false };
      } else if (e.button === 2) {
        const w = toWorld(p.x, p.y);
        issueCommand(w.x, w.y);
      }
    });

    window.addEventListener('mousemove', (e) => {
      const p = local(e, canvas);
      input.mouse = p;
      if (game.placing && !input.touch && e.target === canvas) {
        const w = toWorld(p.x, p.y);
        game.movePlacing(w.x, w.y);
      }
      const d = input.drag;
      if (d && !input.touch) {
        d.ex = p.x;
        d.ey = p.y;
        if (Math.abs(d.ex - d.sx) > 5 || Math.abs(d.ey - d.sy) > 5) d.active = true;
      }
    });

    window.addEventListener('mouseup', (e) => {
      const d = input.drag;
      if (e.button !== 0 || !d || input.touch) return;
      input.drag = null;
      if (d.active) {
        boxSelect(d, e.shiftKey);
        return;
      }
      const best = unitAt(d.sx, d.sy, 4);
      const now = performance.now();
      if (best && input.lastTap && input.lastTap.unit === best && now - input.lastTap.t < DOUBLE_TAP_MS) {
        selectSameTypeOnScreen(best.type);
        input.lastTap = null;
        return;
      }
      input.lastTap = { unit: best, t: now };
      if (best && e.shiftKey && best.selected) {
        best.selected = false;
        game.onSelectionChange();
      } else if (best) {
        select([best], e.shiftKey);
      } else {
        const b = ownBuildingAt(d.sx, d.sy);
        const w = toWorld(d.sx, d.sy);
        const enemy = !b && game.enemyAt(w.x, w.y);
        if (b) game.selectBuilding(b);
        else if (enemy) game.inspect(enemy);
        else if (!e.shiftKey) select([], false);
      }
    });

    canvas.addEventListener('mouseenter', () => { input.mouseInside = true; });
    canvas.addEventListener('mouseleave', () => { input.mouseInside = false; });

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const p = local(e, canvas);
      game.setZoom(game.zoom * (e.deltaY < 0 ? 1.1 : 1 / 1.1), p.x, p.y);
    }, { passive: false });

    // ---------- Dotyk ----------
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      showTouchUi();
      const ts = [...e.touches].map((t) => local(t, canvas));
      if (ts.length === 1) {
        input.touch = { start: ts[0], last: ts[0], t: performance.now(), moved: false, pinch: null };
        if (input.boxMode) input.drag = { sx: ts[0].x, sy: ts[0].y, ex: ts[0].x, ey: ts[0].y, active: false };
      } else if (ts.length >= 2 && input.touch) {
        // Drugi palec: przechodzimy w tryb zoom/przesuwania, tap i prostokąt odpadają
        input.drag = null;
        input.touch.moved = true;
        input.touch.pinch = pinchState(ts);
      }
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const tc = input.touch;
      if (!tc) return;
      const ts = [...e.touches].map((t) => local(t, canvas));
      if (ts.length >= 2) {
        const now = pinchState(ts);
        if (tc.pinch) {
          game.setZoom(game.zoom * now.dist / tc.pinch.dist, now.mx, now.my);
          game.moveCamera(-(now.mx - tc.pinch.mx) / game.zoom, -(now.my - tc.pinch.my) / game.zoom);
        }
        tc.pinch = now;
        return;
      }
      const p = ts[0];
      if (Math.hypot(p.x - tc.start.x, p.y - tc.start.y) > TAP_MOVE_PX) tc.moved = true;
      if (input.drag) {
        input.drag.ex = p.x;
        input.drag.ey = p.y;
        input.drag.active = tc.moved;
      } else if (tc.moved && !tc.pinch) {
        game.moveCamera(-(p.x - tc.last.x) / game.zoom, -(p.y - tc.last.y) / game.zoom);
      }
      tc.last = p;
    }, { passive: false });

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      const tc = input.touch;
      if (!tc || e.touches.length) {
        if (tc && e.touches.length === 1) tc.pinch = null; // zostaje jeden palec — dalej tylko przesuwanie
        return;
      }
      input.touch = null;
      const d = input.drag;
      input.drag = null;
      if (d && d.active) {
        boxSelect(d, input.addMode);
        setBoxMode(false);
        return;
      }
      if (!tc.moved && performance.now() - tc.t < TAP_MS) handleTap(tc.start);
    }, { passive: false });

    canvas.addEventListener('touchcancel', () => { input.touch = null; input.drag = null; });

    function pinchState(ts) {
      return {
        dist: Math.max(1, Math.hypot(ts[0].x - ts[1].x, ts[0].y - ts[1].y)),
        mx: (ts[0].x + ts[1].x) / 2,
        my: (ts[0].y + ts[1].y) / 2,
      };
    }

    function handleTap(p) {
      const now = performance.now();
      if (game.placing) {
        const w = toWorld(p.x, p.y);
        game.movePlacing(w.x, w.y);
        game.onSelectionChange();
        return;
      }
      const unit = unitAt(p.x, p.y, 14);
      if (unit) {
        if (input.lastTap && input.lastTap.unit === unit && now - input.lastTap.t < DOUBLE_TAP_MS) {
          selectSameTypeOnScreen(unit.type);
          input.lastTap = null;
          return;
        }
        input.lastTap = { unit, t: now };
        if (input.addMode) {
          unit.selected = !unit.selected;
          game.onSelectionChange();
        } else {
          select([unit], false);
        }
        return;
      }
      input.lastTap = null;
      const b = ownBuildingAt(p.x, p.y);
      if (b && !isBuildingCommand(b) && !game.attackMoveArmed) {
        game.selectBuilding(b);
        return;
      }
      const w = toWorld(p.x, p.y);
      // Bez zaznaczonych jednostek dotknięcie wroga pokazuje jego dane
      const enemy = game.enemyAt(w.x, w.y, 14);
      if (enemy && !game.selectedUnits().length) {
        game.inspect(enemy);
        return;
      }
      issueCommand(w.x, w.y);
      game.onSelectionChange();
    }

    // ---------- Przyciski dotykowe ----------
    const bar = document.getElementById('touchbar');
    const btn = (action) => bar.querySelector(`[data-action="${action}"]`);
    function setBoxMode(on) { input.boxMode = on; btn('box').classList.toggle('on', on); }
    function setAddMode(on) { input.addMode = on; btn('add').classList.toggle('on', on); }
    function showTouchUi() { document.body.classList.add('touch'); }
    if (window.matchMedia('(pointer: coarse)').matches) showTouchUi();

    bar.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const base = game.map.bases[0];
      switch (b.dataset.action) {
        case 'box': setBoxMode(!input.boxMode); break;
        case 'add': setAddMode(!input.addMode); break;
        case 'all': select(ownUnits(), false); break;
        case 'workers': select(ownUnits().filter((u) => u.def.worker), false); break;
        case 'none': game.placing = null; select([], false); break;
        case 'base': game.centerCamera((base.x + 0.5) * TILE, (base.y + 0.5) * TILE); break;
      }
    });

    // ---------- Minimapa ----------
    function miniToWorld(p) {
      const q = local(p, mini);
      const k = game.map.w * TILE / mini.clientWidth;
      return { x: q.x * k, y: q.y * k };
    }
    let miniDragging = false;
    mini.addEventListener('mousedown', (e) => {
      const w = miniToWorld(e);
      if (e.button === 0) {
        miniDragging = true;
        game.centerCamera(w.x, w.y);
      } else if (e.button === 2) {
        issueCommand(w.x, w.y);
      }
    });
    mini.addEventListener('mousemove', (e) => {
      if (miniDragging) { const w = miniToWorld(e); game.centerCamera(w.x, w.y); }
    });
    window.addEventListener('mouseup', () => { miniDragging = false; });
    const miniTouch = (e) => {
      e.preventDefault();
      const w = miniToWorld(e.touches[0]);
      game.centerCamera(w.x, w.y);
    };
    mini.addEventListener('touchstart', miniTouch, { passive: false });
    mini.addEventListener('touchmove', miniTouch, { passive: false });

    // ---------- Klawiatura ----------
    window.addEventListener('keydown', (e) => {
      input.keys.add(e.key.toLowerCase());
      if (e.ctrlKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        select(ownUnits(), false);
      }
      if (e.key === ' ') {
        e.preventDefault();
        const base = game.map.bases[0];
        game.centerCamera((base.x + 0.5) * TILE, (base.y + 0.5) * TILE);
      }
      if (e.key === 'Escape') {
        if (game.placing) game.cancelPlacing();
        else if (game.attackMoveArmed) { game.attackMoveArmed = false; game.onSelectionChange(); }
        else select([], false);
      }
      if (e.key.toLowerCase() === 'q' && game.selectedUnits().some((u) => !u.def.worker)) {
        game.attackMoveArmed = !game.attackMoveArmed;
        game.onSelectionChange();
      }
      if (e.key === '+' || e.key === '=') game.setZoom(game.zoom * 1.1);
      if (e.key === '-') game.setZoom(game.zoom / 1.1);
    });
    window.addEventListener('keyup', (e) => input.keys.delete(e.key.toLowerCase()));
    window.addEventListener('blur', () => input.keys.clear());
  }

  function updateCamera(game, dt) {
    const { keys, mouse, mouseInside } = game.input;
    const v = Gra.CONFIG.CAMERA_SPEED * dt / game.zoom;
    const edge = Gra.CONFIG.EDGE_SCROLL_PX;
    let dx = 0, dy = 0;
    if (keys.has('arrowleft') || keys.has('a')) dx -= v;
    if (keys.has('arrowright') || keys.has('d')) dx += v;
    if (keys.has('arrowup') || keys.has('w')) dy -= v;
    if (keys.has('arrowdown') || keys.has('s')) dy += v;
    if (mouse && mouseInside && !game.input.drag && !game.input.touch) {
      if (mouse.x < edge) dx -= v;
      if (mouse.x > game.canvas.width - edge) dx += v;
      if (mouse.y < edge) dy -= v;
      if (mouse.y > game.canvas.height - edge) dy += v;
    }
    if (dx || dy) game.moveCamera(dx, dy);
  }

  Gra.input = { attach, updateCamera };
})();
