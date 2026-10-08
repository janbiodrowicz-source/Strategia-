// Walka: ataki wręcz i dystansowe, pościg, automatyczna obrona, wieże, leczenie,
// podpalenie, technologie bojowe, śmierć i koniec gry.
//
// Zadania jednostek (u.task.kind):
//   'attack'     — atakuj konkretny cel (jednostkę albo budynek)
//   'attackMove' — idź do celu, po drodze atakując napotkanych wrogów (Szturm)
//   'heal'       — Dryada leczy sojusznika
(function () {
  const CFG = Gra.CONFIG;
  const C = CFG.COMBAT;
  const TILE = CFG.TILE;
  const T = Gra.TILES;

  const isBuilding = (t) => t && t.size !== undefined;
  const alive = (game, t) => (isBuilding(t) ? game.buildings.includes(t) : game.units.includes(t));

  // ---------- Zasady ----------

  function protectionLeft(game) { return Math.max(0, game.round.protectionMin * 60 - game.time); }
  function combatAllowed(game) { return protectionLeft(game) <= 0; }

  function hasTech(game, owner, effect) { return game.techs[owner].has(effect); }

  function attackOf(game, u) {
    let a = u.def.attack;
    if (u.type === 'archer' && hasTech(game, u.owner, 'archerDamage')) a += C.archerDamage;
    return a;
  }

  function armorOf(game, t) {
    return !isBuilding(t) && hasTech(game, t.owner, 'unitArmor') ? C.unitArmor : 0;
  }

  // Zasięg ataku liczony od krawędzi do krawędzi (wręcz: zasięg 1 → prawie styk)
  function reach(range) { return Math.max(0.35, range - 0.5) * TILE; }

  // Odległość krawędź–krawędź między jednostką a celem (px)
  function gap(u, t) {
    if (isBuilding(t)) {
      const x0 = t.x * TILE, y0 = t.y * TILE, x1 = x0 + t.size * TILE, y1 = y0 + t.size * TILE;
      const dx = Math.max(x0 - u.x, 0, u.x - x1), dy = Math.max(y0 - u.y, 0, u.y - y1);
      return Math.hypot(dx, dy) - u.radius;
    }
    return Math.hypot(t.x - u.x, t.y - u.y) - u.radius - t.radius;
  }

  function targetPos(t) {
    if (isBuilding(t)) { const c = Gra.buildings.center(t); return { x: c.x * TILE, y: c.y * TILE }; }
    return { x: t.x, y: t.y };
  }

  // Gracz widzi tylko cele poza mgłą; AI na razie widzi wszystko
  function visibleTo(game, owner, t) {
    if (owner !== 0) return true;
    if (!isBuilding(t)) return game.fog.isVisible(t.tileX, t.tileY);
    for (let dy = 0; dy < t.size; dy++)
      for (let dx = 0; dx < t.size; dx++) if (game.fog.isVisible(t.x + dx, t.y + dy)) return true;
    return false;
  }

  function canFight(u) { return u.def.attack > 0; }

  // Najbliższy wróg w promieniu (kafelki) — najpierw jednostki, potem budynki
  function nearestEnemy(game, u, radius) {
    let best = null, bestD = radius * TILE;
    for (const o of game.units) {
      if (o.owner === u.owner || !visibleTo(game, u.owner, o)) continue;
      const d = gap(u, o);
      if (d < bestD) { bestD = d; best = o; }
    }
    if (best) return best;
    for (const b of game.buildings) {
      if (b.owner === u.owner || !visibleTo(game, u.owner, b)) continue;
      const d = gap(u, b);
      if (d < bestD) { bestD = d; best = b; }
    }
    return best;
  }

  // ---------- Obrażenia ----------

  function damage(game, target, amount, src) {
    if (!alive(game, target)) return;
    target.hp -= amount;
    target.hitT = 0.15;
    if (src && src.burn) target.burn = { dps: C.burn.dps, t: C.burn.duration };
    // Zaatakowana bezczynna jednostka bojowa oddaje
    const attacker = src && src.unit;
    if (!isBuilding(target) && attacker && alive(game, attacker) && !target.task && !target.moving &&
        canFight(target) && !target.def.worker) {
      target.task = { kind: 'attack', target: attacker, repath: 0, origin: { x: target.x, y: target.y } };
    }
    if (target.hp <= 0) kill(game, target);
  }

  function kill(game, t) {
    const p = targetPos(t);
    game.effects.push({ kind: 'death', x: p.x, y: p.y, t: 0, size: isBuilding(t) ? t.size * TILE * 0.6 : t.radius * 1.5 });
    if (isBuilding(t)) {
      Gra.buildings.destroy(game, t);
    } else {
      game.units.splice(game.units.indexOf(t), 1);
      if (t.selected) game.onSelectionChange();
    }
    if (game.inspected === t) game.inspected = null;
  }

  // Cios albo strzał: zasięg > 1 wypuszcza pocisk, wręcz zadaje obrażenia od razu
  function strike(game, from, target, atk, range, unit, burn) {
    const dmg = Math.max(1, atk - armorOf(game, target));
    if (range > 1) {
      game.projectiles.push({ x: from.x, y: from.y, target, dmg, unit, burn, owner: unit ? unit.owner : null,
                              color: burn ? '#ff7b22' : unit ? '#e8d9a8' : '#ffd84a' });
    } else {
      damage(game, target, dmg, { unit, burn });
    }
  }

  // ---------- Rozkazy ----------

  function commandAttack(game, units, target) {
    if (!combatAllowed(game)) return [];
    const fighters = units.filter((u) => canFight(u) && u.owner !== target.owner);
    for (const u of fighters) u.task = { kind: 'attack', target, repath: 0 };
    return fighters;
  }

  function commandAttackMove(game, units, tx, ty) {
    const fighters = units.filter((u) => canFight(u) || u.def.healer);
    const slots = game.map.formationTiles(tx, ty, fighters.length);
    fighters.forEach((u, i) => {
      const dest = slots[i] || { x: tx, y: ty };
      u.task = { kind: 'attackMove', dest, target: null, acquire: 0, repath: 0 };
      u.moveTo(game.map, dest.x, dest.y);
    });
    return fighters;
  }

  function stop(units) {
    for (const u of units) { u.task = null; u.path = []; }
  }

  // ---------- Aktualizacja jednostek ----------

  // Trasę przeliczamy co repathEvery — także gdy celu nie da się osiągnąć (bez A* w każdej klatce)
  function chase(game, u, t, target, dt) {
    t.repath -= dt;
    if (t.repath <= 0) {
      t.repath = C.repathEvery;
      if (isBuilding(target)) Gra.buildings.approach(game, u, target);
      else u.moveTo(game.map, target.tileX, target.tileY);
    }
  }

  // Jeden krok ataku. Zwraca false, gdy cel przepadł.
  function attackStep(game, u, t, dt) {
    const target = t.target;
    if (!alive(game, target) || !combatAllowed(game) || !visibleTo(game, u.owner, target)) return false;
    // Smycz: jednostka broniąca się nie goni wroga przez całą mapę
    if (t.origin && Math.hypot(u.x - t.origin.x, u.y - t.origin.y) > C.leash * TILE) {
      u.moveTo(game.map, Math.floor(t.origin.x / TILE), Math.floor(t.origin.y / TILE));
      u.task = null;
      return true;
    }
    if (gap(u, target) <= reach(u.def.range)) {
      u.path = [];
      const p = targetPos(target);
      u.facing = Math.atan2(p.y - u.y, p.x - u.x);
      if (u.cd <= 0) {
        strike(game, u, target, attackOf(game, u), u.def.range, u, u.def.burns);
        u.cd = u.def.attackInterval || 1;
      }
    } else {
      chase(game, u, t, target, dt);
    }
    return true;
  }

  function healTarget(game, u, radius) {
    let best = null, bestRatio = 1;
    for (const o of game.units) {
      if (o.owner !== u.owner || o === u || o.hp >= o.def.hp) continue;
      if (Math.hypot(o.x - u.x, o.y - u.y) > radius * TILE) continue;
      const ratio = o.hp / o.def.hp;
      if (ratio < bestRatio) { bestRatio = ratio; best = o; }
    }
    return best;
  }

  function healStep(game, u, t, dt) {
    const target = t.target;
    if (!alive(game, target) || target.hp >= target.def.hp) return false;
    if (gap(u, target) <= reach(u.def.range)) {
      u.path = [];
      u.healing = target;
      target.hp = Math.min(target.def.hp, target.hp + C.heal * dt);
    } else {
      chase(game, u, t, target, dt);
    }
    return true;
  }

  function nearForest(game, u) {
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) if (game.map.get(u.tileX + dx, u.tileY + dy) === T.FOREST) return true;
    return false;
  }

  function updateUnit(game, u, dt) {
    u.cd = Math.max(0, u.cd - dt);
    u.hitT = Math.max(0, u.hitT - dt);
    u.healing = null;
    u.speedMult = hasTech(game, u.owner, 'forestSpeed') && nearForest(game, u) ? C.forestSpeed : 1;
    const t = u.task;

    if (t && t.kind === 'attack') {
      if (!attackStep(game, u, t, dt)) u.task = null;
      return;
    }
    if (t && t.kind === 'heal') {
      if (!healStep(game, u, t, dt)) u.task = null;
      return;
    }
    if (t && t.kind === 'attackMove') {
      if (t.target && attackStep(game, u, t, dt)) return;
      if (t.target) { t.target = null; u.moveTo(game.map, t.dest.x, t.dest.y); } // cel padł — marsz dalej
      t.acquire -= dt;
      if (t.acquire <= 0) {
        t.acquire = C.acquireEvery;
        if (u.def.healer) {
          const h = healTarget(game, u, u.def.sight);
          if (h) { u.task = { kind: 'heal', target: h, repath: 0 }; return; }
        } else if (combatAllowed(game)) {
          t.target = nearestEnemy(game, u, u.def.sight);
          if (t.target) return;
        }
      }
      if (!u.moving) {
        if (u.tileX !== t.dest.x || u.tileY !== t.dest.y) u.moveTo(game.map, t.dest.x, t.dest.y);
        if (!u.moving) u.task = null; // na miejscu albo cel nieosiągalny
      }
      return;
    }

    // Bezczynna jednostka: Dryada szuka rannych, wojownicy — wrogów w zasięgu wzroku
    if (t || u.moving) return;
    u.acquire = (u.acquire || 0) - dt;
    if (u.acquire > 0) return;
    u.acquire = C.acquireEvery;
    if (u.def.healer) {
      const h = healTarget(game, u, u.def.sight);
      if (h) u.task = { kind: 'heal', target: h, repath: 0 };
    } else if (canFight(u) && !u.def.worker && combatAllowed(game)) {
      const e = nearestEnemy(game, u, u.def.sight);
      if (e) u.task = { kind: 'attack', target: e, repath: 0, origin: { x: u.x, y: u.y } };
    }
  }

  // ---------- Budynki: wieże i aura leczenia ----------

  function updateBuilding(game, b, dt) {
    b.hitT = Math.max(0, (b.hitT || 0) - dt);
    if (b.state !== 'done') return;
    if (b.def.attack > 0 && combatAllowed(game)) {
      b.cd = Math.max(0, (b.cd || 0) - dt);
      if (b.cd <= 0) {
        const c = Gra.buildings.center(b);
        const reachPx = b.def.range * TILE;
        let best = null, bestD = Infinity;
        for (const u of game.units) {
          if (u.owner === b.owner) continue;
          const d = gap(u, b);
          if (d <= reachPx && d < bestD) { bestD = d; best = u; }
        }
        if (best) {
          strike(game, { x: c.x * TILE, y: c.y * TILE }, best, b.def.attack, b.def.range, null, false);
          b.cd = b.def.attackInterval || 1;
        }
      }
    }
    if (b.def.aura) {
      const c = Gra.buildings.center(b);
      for (const u of game.units) {
        if (u.owner !== b.owner || u.hp >= u.def.hp) continue;
        if (Math.hypot(u.x / TILE - c.x, u.y / TILE - c.y) <= b.def.aura.radius) {
          u.hp = Math.min(u.def.hp, u.hp + b.def.aura.heal * dt);
        }
      }
    }
  }

  function updateBurning(game, t, dt) {
    if (!t.burn) return;
    t.burn.t -= dt;
    t.hp -= t.burn.dps * dt;
    if (t.burn.t <= 0) t.burn = null;
    if (t.hp <= 0) kill(game, t);
  }

  function updateProjectiles(game, dt) {
    const speed = C.projectileSpeed * TILE * dt;
    game.projectiles = game.projectiles.filter((p) => {
      if (!alive(game, p.target)) return false;
      const tp = targetPos(p.target);
      const d = Math.hypot(tp.x - p.x, tp.y - p.y);
      if (d <= speed + (isBuilding(p.target) ? p.target.size * TILE * 0.4 : p.target.radius)) {
        damage(game, p.target, p.dmg, { unit: p.unit, burn: p.burn });
        return false;
      }
      p.angle = Math.atan2(tp.y - p.y, tp.x - p.x);
      p.x += Math.cos(p.angle) * speed;
      p.y += Math.sin(p.angle) * speed;
      return true;
    });
  }

  // ---------- Koniec gry ----------

  function checkGameOver(game) {
    if (game.over) return;
    for (const owner of [0, 1]) {
      if (!game.buildings.some((b) => b.owner === owner)) {
        game.over = { winner: 1 - owner };
        game.onGameOver(game.over.winner === 0);
        return;
      }
    }
  }

  function update(game, dt) {
    for (const u of game.units.slice()) {
      if (!game.units.includes(u)) continue;
      updateUnit(game, u, dt);
      updateBurning(game, u, dt);
    }
    for (const b of game.buildings.slice()) {
      if (!game.buildings.includes(b)) continue;
      updateBuilding(game, b, dt);
      updateBurning(game, b, dt);
    }
    updateProjectiles(game, dt);
    for (const e of game.effects) e.t += dt;
    game.effects = game.effects.filter((e) => e.t < 0.6);
    checkGameOver(game);
  }

  function describe(u) {
    const t = u.task;
    if (!t) return '';
    if (t.kind === 'attack') return `atakuje: ${t.target.def.name || t.target.name}`;
    if (t.kind === 'attackMove') return t.target ? `szturm — walczy z: ${t.target.def.name || t.target.name}` : 'szturm';
    if (t.kind === 'heal') return `leczy: ${t.target.def.name}`;
    return '';
  }

  Gra.combat = {
    protectionLeft, combatAllowed, hasTech, attackOf, armorOf, isBuilding,
    commandAttack, commandAttackMove, stop, update, describe, kill,
  };
})();
