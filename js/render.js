// Rysowanie: mapa (prerenderowana raz), budynki, jednostki, mgła, minimapa.
(function () {
  const TILE = Gra.CONFIG.TILE;
  const T = Gra.TILES;

  function buildMapImage(map) {
    const c = document.createElement('canvas');
    c.width = map.w * TILE;
    c.height = map.h * TILE;
    const ctx = c.getContext('2d');
    const rand = Gra.rng(map.seed + 7);

    for (let y = 0; y < map.h; y++) {
      for (let x = 0; x < map.w; x++) {
        const px = x * TILE, py = y * TILE;
        const t = map.get(x, y);
        const shade = Math.floor(rand() * 14);
        ctx.fillStyle = `rgb(${74 + shade},${120 + shade},${52 + shade})`; // trawa pod wszystkim
        ctx.fillRect(px, py, TILE, TILE);

        if (t === T.FOREST) {
          ctx.fillStyle = '#2f5a24';
          ctx.fillRect(px, py, TILE, TILE);
          for (let k = 0; k < 3; k++) {
            const ox = 6 + rand() * 20, oy = 6 + rand() * 20;
            ctx.fillStyle = '#5a3b1e';
            ctx.fillRect(px + ox - 1.5, py + oy + 2, 3, 6);
            ctx.fillStyle = k % 2 ? '#1f4719' : '#2a6b22';
            ctx.beginPath();
            ctx.arc(px + ox, py + oy, 6 + rand() * 3, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (t === T.ROCK) {
          ctx.fillStyle = '#6d6a63';
          ctx.beginPath();
          ctx.ellipse(px + 16, py + 18, 13, 10, rand(), 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#9a968c';
          ctx.beginPath();
          ctx.ellipse(px + 13, py + 14, 6, 4, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (t === T.WATER) {
          ctx.fillStyle = '#2b5d8f';
          ctx.fillRect(px, py, TILE, TILE);
          ctx.strokeStyle = 'rgba(255,255,255,0.15)';
          ctx.beginPath();
          ctx.moveTo(px + 6 + rand() * 6, py + 10 + rand() * 12);
          ctx.lineTo(px + 18 + rand() * 8, py + 10 + rand() * 12);
          ctx.stroke();
        } else if (t === T.GOLD) {
          ctx.fillStyle = '#7a6a3a';
          ctx.fillRect(px + 2, py + 2, TILE - 4, TILE - 4);
          ctx.fillStyle = '#f1c40f';
          for (let k = 0; k < 4; k++) {
            ctx.beginPath();
            ctx.arc(px + 7 + rand() * 18, py + 7 + rand() * 18, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }
    return c;
  }

  const MINI_COLORS = {
    [T.GRASS]: [86, 132, 62], [T.FOREST]: [36, 80, 30], [T.ROCK]: [120, 118, 110],
    [T.WATER]: [43, 93, 143], [T.GOLD]: [241, 196, 15], [T.BUILDING]: [86, 132, 62],
  };

  function buildMinimapImage(map) {
    const c = document.createElement('canvas');
    c.width = map.w;
    c.height = map.h;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(map.w, map.h);
    for (let i = 0; i < map.tiles.length; i++) {
      const [r, g, b] = MINI_COLORS[map.tiles[i]];
      img.data.set([r, g, b, 255], i * 4);
    }
    ctx.putImageData(img, 0, 0);
    return c;
  }

  // Wyczerpany kafelek surowca zamienia się w trawę (mapa + minimapa)
  function paintGrass(game, x, y) {
    const ctx = game.mapImage.getContext('2d');
    const shade = (x * 7 + y * 13) % 14;
    ctx.fillStyle = `rgb(${74 + shade},${120 + shade},${52 + shade})`;
    ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
    ctx.fillStyle = 'rgba(90,60,30,0.35)'; // pniaki / ślady po wydobyciu
    ctx.beginPath();
    ctx.arc(x * TILE + 12, y * TILE + 18, 3, 0, Math.PI * 2);
    ctx.arc(x * TILE + 21, y * TILE + 11, 2.5, 0, Math.PI * 2);
    ctx.fill();
    const [r, g, b] = MINI_COLORS[T.GRASS];
    const mctx = game.minimapImage.getContext('2d');
    mctx.fillStyle = `rgb(${r},${g},${b})`;
    mctx.fillRect(x, y, 1, 1);
  }

  const CARRY_COLORS = { wood: '#8b5a2b', stone: '#a8a59c', gold: '#f1c40f' };

  function teamColor(game, owner) {
    return Gra.CONFIG.RACES[owner === 0 ? game.playerRace : game.aiRace].color;
  }

  function progressBar(ctx, x, y, w, frac, color) {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(x, y, w, 5);
    ctx.fillStyle = color;
    ctx.fillRect(x + 1, y + 1, (w - 2) * Math.max(0, Math.min(1, frac)), 3);
  }

  function drawBuilding(ctx, game, b) {
    const px = b.x * TILE, py = b.y * TILE, side = b.size * TILE;
    const color = teamColor(game, b.owner);
    const done = b.state === 'done';

    if (b.state === 'site') {
      // Plac budowy: tylko obrys
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(px + 2, py + 2, side - 4, side - 4);
      ctx.setLineDash([]);
    } else {
      ctx.globalAlpha = done ? 1 : 0.55 + 0.45 * b.progress;
      ctx.fillStyle = '#4a3828';
      ctx.fillRect(px + 2, py + 2, side - 4, side - 4);
      ctx.fillStyle = color;
      const inset = b.size === 1 ? 5 : 8;
      ctx.fillRect(px + inset, py + inset, side - inset * 2, side - inset * 2);
      ctx.globalAlpha = 1;
      if (!done) {
        // Rusztowanie
        ctx.strokeStyle = 'rgba(230,200,140,0.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let k = -side; k < side; k += 10) {
          ctx.moveTo(px + Math.max(0, k), py + Math.max(0, -k));
          ctx.lineTo(px + Math.min(side, side + k), py + Math.min(side, side - k));
        }
        ctx.stroke();
      }
    }

    ctx.textAlign = 'center';
    ctx.globalAlpha = done ? 1 : 0.7;
    ctx.font = `${b.size === 1 ? 16 : b.size === 2 ? 26 : 30}px sans-serif`;
    ctx.fillText(b.icon, px + side / 2, py + side / 2 + (b.size === 3 ? 0 : b.size === 1 ? 6 : 9));
    ctx.globalAlpha = 1;
    if (b.size === 3) {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(b.name, px + side / 2, py + side - 14);
    }

    if (game.selectedBuilding === b || game.inspected === b) {
      ctx.strokeStyle = game.inspected === b ? '#ff5555' : '#5dff7a';
      ctx.lineWidth = 2;
      ctx.strokeRect(px - 1, py - 1, side + 2, side + 2);
    }
    if (!done) progressBar(ctx, px + 2, py - 8, side - 4, b.progress, '#f1c40f');
    else if (b.queue.length) {
      const item = b.queue[0];
      const unit = Gra.CONFIG.RACES[b.owner === 0 ? game.playerRace : game.aiRace].units[item.type];
      progressBar(ctx, px + 2, py - 8, side - 4, item.t / unit.time, '#4cd1ff');
    }
    if (b.hp < b.maxHp || game.selectedBuilding === b || game.inspected === b) {
      progressBar(ctx, px + 2, py + side + 2, side - 4, b.hp / b.maxHp, b.owner === 0 ? '#4cd137' : '#e74c3c');
    }
    if (b.hitT > 0) {
      ctx.fillStyle = `rgba(255,255,255,${b.hitT * 2})`;
      ctx.fillRect(px + 2, py + 2, side - 4, side - 4);
    }
    if (b.burn) drawFlames(ctx, game, px + side / 2, py + side / 2, side * 0.3);
  }

  function drawFlames(ctx, game, x, y, spread) {
    for (let k = 0; k < 3; k++) {
      const a = game.time * 7 + k * 2.1;
      const fx = x + Math.cos(a) * spread * 0.5, fy = y + Math.sin(a * 1.3) * spread * 0.4 - 4;
      ctx.fillStyle = k % 2 ? 'rgba(255,90,20,0.85)' : 'rgba(255,190,40,0.85)';
      ctx.beginPath();
      ctx.arc(fx, fy, 3 + Math.sin(a * 2) * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawCombatEffects(ctx, game) {
    // Pociski
    for (const p of game.projectiles) {
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - Math.cos(p.angle || 0) * 8, p.y - Math.sin(p.angle || 0) * 8);
      ctx.stroke();
    }
    // Leczenie Dryady
    for (const u of game.units) {
      if (!u.healing) continue;
      ctx.strokeStyle = `rgba(120,255,140,${0.5 + Math.sin(game.time * 12) * 0.3})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(u.x, u.y);
      ctx.lineTo(u.healing.x, u.healing.y);
      ctx.stroke();
    }
    // Śmierć / zniszczenie
    for (const e of game.effects) {
      const t = e.t / 0.6;
      ctx.fillStyle = `rgba(80,70,60,${0.6 * (1 - t)})`;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.size * (0.6 + t), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawGhost(ctx, game, pl) {
    const def = Gra.CONFIG.RACES[game.playerRace].buildings[pl.key];
    const side = def.size * TILE;
    ctx.fillStyle = pl.valid ? 'rgba(80,255,120,0.35)' : 'rgba(255,70,70,0.4)';
    ctx.fillRect(pl.x * TILE, pl.y * TILE, side, side);
    ctx.strokeStyle = pl.valid ? '#5dff7a' : '#ff5555';
    ctx.lineWidth = 2;
    ctx.strokeRect(pl.x * TILE, pl.y * TILE, side, side);
    ctx.globalAlpha = 0.8;
    ctx.font = `${def.size === 1 ? 16 : 26}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(def.icon, pl.x * TILE + side / 2, pl.y * TILE + side / 2 + (def.size === 1 ? 6 : 9));
    ctx.globalAlpha = 1;
  }

  function draw(ctx, game) {
    const { map, cam, fog, zoom } = game;
    const vw = ctx.canvas.width / zoom, vh = ctx.canvas.height / zoom; // widok w pikselach świata
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.translate(-cam.x, -cam.y);
    ctx.imageSmoothingEnabled = zoom < 1;

    const sx = Math.max(0, cam.x), sy = Math.max(0, cam.y);
    const sw = Math.min(vw, map.w * TILE - sx), sh = Math.min(vh, map.h * TILE - sy);
    ctx.drawImage(game.mapImage, sx, sy, sw, sh, sx, sy, sw, sh);

    // Budynki
    for (const b of game.buildings) {
      if (!fog.isExplored(b.x, b.y)) continue;
      drawBuilding(ctx, game, b);
    }

    // Punkt zbiórki zaznaczonego budynku
    const selB = game.selectedBuilding;
    if (selB && selB.rally) {
      const c = Gra.buildings.center(selB);
      const rx = (selB.rally.x + 0.5) * TILE, ry = (selB.rally.y + 0.5) * TILE;
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(c.x * TILE, c.y * TILE);
      ctx.lineTo(rx, ry);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = '18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🚩', rx + 4, ry + 2);
    }

    // Podgląd stawianego budynku
    if (game.placing) drawGhost(ctx, game, game.placing);

    // Znacznik rozkazu ruchu
    if (game.moveMarker) {
      const m = game.moveMarker;
      const t = m.age / 0.6;
      ctx.strokeStyle = m.kind === 'gather' ? `rgba(255,210,60,${1 - t})`
        : m.kind === 'attack' ? `rgba(255,70,60,${1 - t})`
        : m.kind === 'rally' ? `rgba(255,255,255,${1 - t})` : `rgba(80,255,120,${1 - t})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(m.x, m.y, 4 + t * 12, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Ścieżki zaznaczonych jednostek
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    for (const u of game.units) {
      if (!u.selected || !u.path.length) continue;
      ctx.beginPath();
      ctx.moveTo(u.x, u.y);
      for (const p of u.path) ctx.lineTo((p.x + 0.5) * TILE, (p.y + 0.5) * TILE);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Jednostki
    for (const u of game.units) {
      if (u.owner !== 0 && !fog.isVisible(u.tileX, u.tileY)) continue;
      const r = u.radius;
      if (u.selected) {
        ctx.strokeStyle = '#5dff7a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(u.x, u.y + r * 0.6, r + 4, (r + 4) * 0.55, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(u.x, u.y + r * 0.7, r, r * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = teamColor(game, u.owner);
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(u.x, u.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // kierunek patrzenia
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(u.x + Math.cos(u.facing) * r * 0.6, u.y + Math.sin(u.facing) * r * 0.6, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(u.def.name[0], u.x, u.y + 3.5);
      // Praca przy surowcu: machające narzędzie
      if (u.task && u.task.phase === 'gathering') {
        const swing = Math.sin(game.time * 10 + u.id) * 0.6;
        const a = u.facing + swing;
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(u.x + Math.cos(a) * r, u.y + Math.sin(a) * r);
        ctx.lineTo(u.x + Math.cos(a) * (r + 7), u.y + Math.sin(a) * (r + 7));
        ctx.stroke();
      }
      // Niesiony ładunek
      if (u.carry && u.carry.amount > 0) {
        ctx.fillStyle = CARRY_COLORS[u.carry.type];
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 1;
        ctx.fillRect(u.x + r * 0.4, u.y - r - 1, 7, 7);
        ctx.strokeRect(u.x + r * 0.4, u.y - r - 1, 7, 7);
      }
      if (u.hp < u.def.hp || u.selected || game.inspected === u) {
        const w = r * 2;
        ctx.fillStyle = '#300';
        ctx.fillRect(u.x - w / 2, u.y - r - 7, w, 3);
        ctx.fillStyle = u.owner === 0 ? '#4cd137' : '#e74c3c';
        ctx.fillRect(u.x - w / 2, u.y - r - 7, w * Math.max(0, u.hp) / u.def.hp, 3);
      }
      if (u.hitT > 0) {
        ctx.fillStyle = `rgba(255,255,255,${u.hitT * 4})`;
        ctx.beginPath();
        ctx.arc(u.x, u.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (u.burn) drawFlames(ctx, game, u.x, u.y - 2, r);
      if (game.inspected === u) {
        ctx.strokeStyle = '#ff5555';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(u.x, u.y + r * 0.6, r + 4, (r + 4) * 0.55, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    drawCombatEffects(ctx, game);

    // Mgła wojny (tylko kafelki w widoku)
    if (fog.enabled) {
      const x0 = Math.max(0, Math.floor(cam.x / TILE)), y0 = Math.max(0, Math.floor(cam.y / TILE));
      const x1 = Math.min(map.w - 1, Math.ceil((cam.x + vw) / TILE));
      const y1 = Math.min(map.h - 1, Math.ceil((cam.y + vh) / TILE));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          if (fog.isVisible(x, y)) continue;
          ctx.fillStyle = fog.isExplored(x, y) ? 'rgba(0,0,0,0.5)' : '#000';
          ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
        }
      }
    }
    ctx.restore();

    // Prostokąt zaznaczania
    const d = game.input.drag;
    if (d && d.active) {
      ctx.strokeStyle = '#5dff7a';
      ctx.fillStyle = 'rgba(93,255,122,0.12)';
      ctx.lineWidth = 1;
      const x = Math.min(d.sx, d.ex), y = Math.min(d.sy, d.ey);
      ctx.fillRect(x, y, Math.abs(d.ex - d.sx), Math.abs(d.ey - d.sy));
      ctx.strokeRect(x, y, Math.abs(d.ex - d.sx), Math.abs(d.ey - d.sy));
    }
  }

  function drawMinimap(ctx, game) {
    const { map, fog, cam } = game;
    const s = ctx.canvas.width / map.w;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(game.minimapImage, 0, 0, ctx.canvas.width, ctx.canvas.height);

    if (fog.enabled) {
      // Mgła jako obraz 1 piksel = 1 kafelek, skalowany bez wygładzania (bez szczelin)
      if (!game.minimapFog) {
        game.minimapFog = document.createElement('canvas');
        game.minimapFog.width = map.w;
        game.minimapFog.height = map.h;
      }
      const fctx = game.minimapFog.getContext('2d');
      const img = fctx.createImageData(map.w, map.h);
      for (let i = 0; i < map.tiles.length; i++) {
        img.data[i * 4 + 3] = fog.visible[i] ? 0 : (fog.explored[i] ? 128 : 255);
      }
      fctx.putImageData(img, 0, 0);
      ctx.drawImage(game.minimapFog, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    for (const b of game.buildings) {
      if (!fog.isExplored(b.x, b.y)) continue;
      ctx.fillStyle = teamColor(game, b.owner);
      ctx.fillRect(b.x * s, b.y * s, b.size * s, b.size * s);
    }
    for (const u of game.units) {
      if (u.owner !== 0 && !fog.isVisible(u.tileX, u.tileY)) continue;
      ctx.fillStyle = u.selected ? '#fff' : teamColor(game, u.owner);
      ctx.fillRect(u.tileX * s - 1, u.tileY * s - 1, Math.max(2, s), Math.max(2, s));
    }
    const k = s / TILE;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(cam.x * k, cam.y * k, game.canvas.width / game.zoom * k, game.canvas.height / game.zoom * k);
  }

  Gra.render = { buildMapImage, buildMinimapImage, draw, drawMinimap, paintGrass };
})();
