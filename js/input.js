// Sterowanie: zaznaczanie (klik / prostokąt / Shift), rozkaz ruchu (PPM), kamera.
(function () {
  const TILE = Gra.CONFIG.TILE;

  function attach(game) {
    const canvas = game.canvas;
    const mini = game.minimap;
    const input = game.input = { keys: new Set(), mouse: null, drag: null, mouseInside: false };

    const toWorld = (sx, sy) => ({ x: sx + game.cam.x, y: sy + game.cam.y });
    const local = (e, el) => {
      const r = el.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const ownUnits = () => game.units.filter((u) => u.owner === 0);

    function select(units, additive) {
      if (!additive) for (const u of game.units) u.selected = false;
      for (const u of units) u.selected = true;
      game.onSelectionChange();
    }

    function issueMove(wx, wy) {
      const sel = game.units.filter((u) => u.selected && u.owner === 0);
      if (!sel.length) return;
      Gra.commandMove(game.map, sel, Math.floor(wx / TILE), Math.floor(wy / TILE));
      game.moveMarker = { x: wx, y: wy, age: 0 };
    }

    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    mini.addEventListener('contextmenu', (e) => e.preventDefault());

    canvas.addEventListener('mousedown', (e) => {
      const p = local(e, canvas);
      if (e.button === 0) {
        input.drag = { sx: p.x, sy: p.y, ex: p.x, ey: p.y, active: false };
      } else if (e.button === 2) {
        const w = toWorld(p.x, p.y);
        issueMove(w.x, w.y);
      }
    });

    window.addEventListener('mousemove', (e) => {
      const p = local(e, canvas);
      input.mouse = p;
      const d = input.drag;
      if (d) {
        d.ex = p.x;
        d.ey = p.y;
        if (Math.abs(d.ex - d.sx) > 5 || Math.abs(d.ey - d.sy) > 5) d.active = true;
      }
    });

    window.addEventListener('mouseup', (e) => {
      const d = input.drag;
      if (e.button !== 0 || !d) return;
      input.drag = null;
      if (d.active) {
        const a = toWorld(Math.min(d.sx, d.ex), Math.min(d.sy, d.ey));
        const b = toWorld(Math.max(d.sx, d.ex), Math.max(d.sy, d.ey));
        const hit = ownUnits().filter((u) => u.x + u.radius >= a.x && u.x - u.radius <= b.x &&
                                            u.y + u.radius >= a.y && u.y - u.radius <= b.y);
        select(hit, e.shiftKey);
      } else {
        const w = toWorld(d.sx, d.sy);
        let best = null, bestD = Infinity;
        for (const u of ownUnits()) {
          const dist = Math.hypot(u.x - w.x, u.y - w.y);
          if (dist <= u.radius + 4 && dist < bestD) { best = u; bestD = dist; }
        }
        if (best && e.shiftKey && best.selected) {
          best.selected = false;
          game.onSelectionChange();
        } else {
          select(best ? [best] : [], e.shiftKey);
        }
      }
    });

    canvas.addEventListener('mouseenter', () => { input.mouseInside = true; });
    canvas.addEventListener('mouseleave', () => { input.mouseInside = false; });

    function miniToWorld(e) {
      const p = local(e, mini);
      const k = game.map.w * TILE / mini.width;
      return { x: p.x * k, y: p.y * k };
    }
    let miniDragging = false;
    mini.addEventListener('mousedown', (e) => {
      const w = miniToWorld(e);
      if (e.button === 0) {
        miniDragging = true;
        game.centerCamera(w.x, w.y);
      } else if (e.button === 2) {
        issueMove(w.x, w.y);
      }
    });
    mini.addEventListener('mousemove', (e) => {
      if (miniDragging) { const w = miniToWorld(e); game.centerCamera(w.x, w.y); }
    });
    window.addEventListener('mouseup', () => { miniDragging = false; });

    window.addEventListener('keydown', (e) => {
      input.keys.add(e.key.toLowerCase());
      if (e.ctrlKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        select(ownUnits(), false);
      }
      if (e.key === ' ') {
        // Spacja: kamera na bazę gracza
        e.preventDefault();
        const base = game.map.bases[0];
        game.centerCamera((base.x + 0.5) * TILE, (base.y + 0.5) * TILE);
      }
    });
    window.addEventListener('keyup', (e) => input.keys.delete(e.key.toLowerCase()));
    window.addEventListener('blur', () => input.keys.clear());
  }

  function updateCamera(game, dt) {
    const { keys, mouse, mouseInside } = game.input;
    const v = Gra.CONFIG.CAMERA_SPEED * dt;
    const edge = Gra.CONFIG.EDGE_SCROLL_PX;
    let dx = 0, dy = 0;
    if (keys.has('arrowleft') || keys.has('a')) dx -= v;
    if (keys.has('arrowright') || keys.has('d')) dx += v;
    if (keys.has('arrowup') || keys.has('w')) dy -= v;
    if (keys.has('arrowdown') || keys.has('s')) dy += v;
    if (mouse && mouseInside && !game.input.drag) {
      if (mouse.x < edge) dx -= v;
      if (mouse.x > game.canvas.width - edge) dx += v;
      if (mouse.y < edge) dy -= v;
      if (mouse.y > game.canvas.height - edge) dy += v;
    }
    if (dx || dy) game.moveCamera(dx, dy);
  }

  Gra.input = { attach, updateCamera };
})();
