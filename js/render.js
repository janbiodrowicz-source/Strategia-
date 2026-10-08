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

  function teamColor(game, owner) {
    return Gra.CONFIG.RACES[owner === 0 ? game.playerRace : game.aiRace].color;
  }

  function draw(ctx, game) {
    const { map, cam, fog } = game;
    const vw = ctx.canvas.width, vh = ctx.canvas.height;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, vw, vh);
    ctx.drawImage(game.mapImage, cam.x, cam.y, vw, vh, 0, 0, vw, vh);

    ctx.save();
    ctx.translate(-cam.x, -cam.y);

    // Budynki
    for (const b of game.buildings) {
      if (!fog.isExplored(b.x, b.y)) continue;
      const px = (b.x - 1) * TILE, py = (b.y - 1) * TILE;
      ctx.fillStyle = '#4a3828';
      ctx.fillRect(px + 2, py + 2, TILE * 3 - 4, TILE * 3 - 4);
      ctx.fillStyle = teamColor(game, b.owner);
      ctx.fillRect(px + 10, py + 10, TILE * 3 - 20, TILE * 3 - 20);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(b.name, px + TILE * 1.5, py + TILE * 1.5 + 4);
    }

    // Znacznik rozkazu ruchu
    if (game.moveMarker) {
      const m = game.moveMarker;
      const t = m.age / 0.6;
      ctx.strokeStyle = `rgba(80,255,120,${1 - t})`;
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
      if (u.hp < u.def.hp || u.selected) {
        const w = r * 2;
        ctx.fillStyle = '#300';
        ctx.fillRect(u.x - w / 2, u.y - r - 7, w, 3);
        ctx.fillStyle = '#4cd137';
        ctx.fillRect(u.x - w / 2, u.y - r - 7, w * u.hp / u.def.hp, 3);
      }
    }

    // Mgła wojny (tylko kafelki w widoku)
    if (fog.enabled) {
      const x0 = Math.floor(cam.x / TILE), y0 = Math.floor(cam.y / TILE);
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
      ctx.fillRect((b.x - 1) * s, (b.y - 1) * s, 3 * s, 3 * s);
    }
    for (const u of game.units) {
      if (u.owner !== 0 && !fog.isVisible(u.tileX, u.tileY)) continue;
      ctx.fillStyle = u.selected ? '#fff' : teamColor(game, u.owner);
      ctx.fillRect(u.tileX * s - 1, u.tileY * s - 1, Math.max(2, s), Math.max(2, s));
    }
    const k = s / TILE;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(cam.x * k, cam.y * k, game.canvas.width * k, game.canvas.height * k);
  }

  Gra.render = { buildMapImage, buildMinimapImage, draw, drawMinimap };
})();
