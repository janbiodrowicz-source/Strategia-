// Jednostki: podążanie ścieżką, rozpychanie się, rozkazy ruchu grupowego.
(function () {
  const TILE = Gra.CONFIG.TILE;
  let nextId = 1;

  class Unit {
    constructor(race, type, owner, tx, ty) {
      this.id = nextId++;
      this.race = race;
      this.type = type;
      this.def = Gra.CONFIG.RACES[race].units[type];
      this.owner = owner; // 0 = gracz, 1 = AI
      this.x = (tx + 0.5) * TILE;
      this.y = (ty + 0.5) * TILE;
      this.hp = this.def.hp;
      this.path = [];
      this.selected = false;
      this.facing = 0;
      this.task = null;  // np. zbieranie surowca (js/economy.js)
      this.carry = null; // niesiony ładunek {type, amount}
      this.cd = 0;          // odnowienie ataku (s)
      this.speedMult = 1;   // np. Leśne Pieśni
      this.burn = null;     // podpalenie {dps, t}
      this.hitT = 0;        // błysk po trafieniu
    }

    get radius() { return this.def.radius * TILE; }
    get tileX() { return Math.floor(this.x / TILE); }
    get tileY() { return Math.floor(this.y / TILE); }
    get moving() { return this.path.length > 0; }

    moveTo(map, tx, ty) {
      this.path = Gra.findPath(map, this.tileX, this.tileY, tx, ty);
      // Cel to kafelek, na którym już stoi (np. zepchnięty na skraj) — dojdź do jego środka
      if (!this.path.length && tx === this.tileX && ty === this.tileY) this.path = [{ x: tx, y: ty }];
    }

    update(dt) {
      if (!this.path.length) return;
      const wp = this.path[0];
      const wx = (wp.x + 0.5) * TILE, wy = (wp.y + 0.5) * TILE;
      const dx = wx - this.x, dy = wy - this.y;
      const dist = Math.hypot(dx, dy);
      const step = this.def.speed * this.speedMult * TILE * dt;
      if (dist <= step) {
        this.x = wx;
        this.y = wy;
        this.path.shift();
      } else {
        this.x += dx / dist * step;
        this.y += dy / dist * step;
        this.facing = Math.atan2(dy, dx);
      }
    }
  }

  // Rozkaz ruchu dla grupy: każda jednostka dostaje własny kafelek w formacji
  function commandMove(map, units, tx, ty) {
    if (!units.length) return;
    for (const u of units) u.task = null;
    const slots = map.formationTiles(tx, ty, units.length);
    const free = units.slice();
    for (const slot of slots) {
      let best = 0, bestD = Infinity;
      for (let i = 0; i < free.length; i++) {
        const d = (free[i].tileX - slot.x) ** 2 + (free[i].tileY - slot.y) ** 2;
        if (d < bestD) { bestD = d; best = i; }
      }
      free.splice(best, 1)[0].moveTo(map, slot.x, slot.y);
    }
  }

  // Delikatne rozpychanie nachodzących na siebie jednostek
  function separate(map, units) {
    for (let i = 0; i < units.length; i++) {
      const a = units[i];
      for (let j = i + 1; j < units.length; j++) {
        const b = units[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const min = a.radius + b.radius;
        const d2 = dx * dx + dy * dy;
        if (d2 >= min * min) continue;
        const d = Math.sqrt(d2) || 0.01;
        const push = (min - d) / 2;
        const nx = d2 ? dx / d : 1, ny = d2 ? dy / d : 0;
        // Jednostka w ruchu przepycha stojącą mocniej niż odwrotnie
        const wa = a.moving && !b.moving ? 0.3 : (!a.moving && b.moving ? 1.7 : 1);
        nudge(map, a, -nx * push * wa, -ny * push * wa);
        nudge(map, b, nx * push * (2 - wa), ny * push * (2 - wa));
      }
    }
  }

  function nudge(map, u, dx, dy) {
    const nx = u.x + dx, ny = u.y + dy;
    if (map.isWalkable(Math.floor(nx / TILE), Math.floor(ny / TILE))) {
      u.x = nx;
      u.y = ny;
    }
  }

  Gra.Unit = Unit;
  Gra.commandMove = commandMove;
  Gra.separateUnits = separate;
})();
