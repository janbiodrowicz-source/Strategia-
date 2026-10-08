// Generowanie mapy: symetryczna punktowo (uczciwa dla obu graczy),
// bazy w przeciwległych narożnikach.
(function () {
  const T = Gra.TILES = { GRASS: 0, FOREST: 1, ROCK: 2, WATER: 3, GOLD: 4, BUILDING: 5 };
  // Jaki surowiec daje dany kafelek
  Gra.RESOURCE_OF_TILE = { [T.FOREST]: 'wood', [T.ROCK]: 'stone', [T.GOLD]: 'gold' };

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  Gra.rng = mulberry32;

  function valueNoise(size, cell, rand) {
    const gw = Math.ceil(size / cell) + 2;
    const grid = new Float32Array(gw * gw);
    for (let i = 0; i < grid.length; i++) grid[i] = rand();
    const smooth = (t) => t * t * (3 - 2 * t);
    const out = new Float32Array(size * size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const gx = x / cell, gy = y / cell;
        const ix = Math.floor(gx), iy = Math.floor(gy);
        const fx = smooth(gx - ix), fy = smooth(gy - iy);
        const a = grid[iy * gw + ix], b = grid[iy * gw + ix + 1];
        const c = grid[(iy + 1) * gw + ix], d = grid[(iy + 1) * gw + ix + 1];
        out[y * size + x] = (a + (b - a) * fx) + ((c + (d - c) * fx) - (a + (b - a) * fx)) * fy;
      }
    }
    return out;
  }

  class GameMap {
    constructor(size, seed) {
      this.w = size;
      this.h = size;
      this.seed = seed;
      this.tiles = new Uint8Array(size * size);
      this.bases = []; // środki baz {x, y} w kafelkach, [gracz, AI]
      this.amount = new Float32Array(size * size); // ile surowca zostało na kafelku
      this.generate();
      const amounts = Gra.CONFIG.GATHER.amount;
      for (let i = 0; i < this.tiles.length; i++) {
        const res = Gra.RESOURCE_OF_TILE[this.tiles[i]];
        if (res) this.amount[i] = amounts[res];
      }
    }

    idx(x, y) { return y * this.w + x; }
    inBounds(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
    get(x, y) { return this.inBounds(x, y) ? this.tiles[this.idx(x, y)] : T.WATER; }
    set(x, y, t) { if (this.inBounds(x, y)) this.tiles[this.idx(x, y)] = t; }
    isWalkable(x, y) { return this.inBounds(x, y) && this.tiles[this.idx(x, y)] === T.GRASS; }
    resourceAt(x, y) { return Gra.RESOURCE_OF_TILE[this.get(x, y)] || null; }

    fillCircle(cx, cy, r, t, onlyOn) {
      for (let y = cy - r; y <= cy + r; y++) {
        for (let x = cx - r; x <= cx + r; x++) {
          if ((x - cx) ** 2 + (y - cy) ** 2 > r * r + r) continue;
          if (onlyOn !== undefined && this.get(x, y) !== onlyOn) continue;
          this.set(x, y, t);
        }
      }
    }

    generate() {
      const s = this.w;
      const rand = mulberry32(this.seed);
      const forest = valueNoise(s, 9, rand), forestDetail = valueNoise(s, 3, rand);
      const water = valueNoise(s, 14, rand);
      const rock = valueNoise(s, 6, rand);

      for (let i = 0; i < s * s; i++) {
        const f = forest[i] * 0.75 + forestDetail[i] * 0.25;
        let t = T.GRASS;
        if (water[i] > 0.78) t = T.WATER;
        else if (f > 0.66) t = T.FOREST;
        else if (rock[i] > 0.86) t = T.ROCK;
        this.tiles[i] = t;
      }

      // Bazy w przeciwległych narożnikach — maksymalna odległość
      const m = Math.max(9, Math.round(s * 0.14));
      const a = { x: m, y: s - 1 - m };
      const b = { x: s - 1 - a.x, y: s - 1 - a.y };
      this.bases = [a, b];

      // Otoczenie bazy gracza (lustrzane odbicie zrobi resztę)
      this.fillCircle(a.x, a.y, 9, T.GRASS);
      this.fillCircle(a.x + 6, a.y - 4, 3, T.FOREST);     // las przy bazie
      this.fillCircle(a.x - 5, a.y - 6, 2, T.FOREST);
      this.fillCircle(a.x + 5, a.y + 5, 1, T.ROCK);       // kamień
      this.fillCircle(a.x + 6, a.y + 4, 1, T.ROCK);
      for (let dy = 0; dy < 2; dy++)                       // kopalnia złota 2x2
        for (let dx = 0; dx < 2; dx++) this.set(a.x - 7 + dx, a.y + 3 + dy, T.GOLD);

      // Dodatkowe złoża złota w środkowej części mapy
      const midGold = { x: Math.round(s * 0.38), y: Math.round(s * 0.58) };
      this.fillCircle(midGold.x, midGold.y, 3, T.GRASS);
      for (let dy = 0; dy < 2; dy++)
        for (let dx = 0; dx < 2; dx++) this.set(midGold.x + dx, midGold.y + dy, T.GOLD);

      this.mirror();
      this.ensureConnected();

      // Budynki baz 3x3
      for (const base of this.bases) {
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) this.set(base.x + dx, base.y + dy, T.BUILDING);
      }
    }

    // Symetria punktowa: kafelek (x,y) == kafelek (s-1-x, s-1-y).
    // Źródłem jest dolna połowa (tam leży baza gracza), kopiujemy ją na górną.
    mirror() {
      const n = this.tiles.length;
      for (let i = 0; i < n / 2; i++) this.tiles[i] = this.tiles[n - 1 - i];
    }

    reachableFrom(sx, sy) {
      const seen = new Uint8Array(this.tiles.length);
      const queue = [this.idx(sx, sy)];
      seen[queue[0]] = 1;
      for (let qi = 0; qi < queue.length; qi++) {
        const i = queue[qi], x = i % this.w, y = (i / this.w) | 0;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = x + dx, ny = y + dy;
          if (!this.isWalkable(nx, ny)) continue;
          const ni = this.idx(nx, ny);
          if (!seen[ni]) { seen[ni] = 1; queue.push(ni); }
        }
      }
      return seen;
    }

    // Gwarantuje przejście lądem między bazami (wycina korytarz po przekątnej)
    ensureConnected() {
      const [a, b] = this.bases;
      if (this.reachableFrom(a.x, a.y)[this.idx(b.x, b.y)]) return;
      const steps = Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y));
      for (let i = 0; i <= steps; i++) {
        const x = Math.round(a.x + (b.x - a.x) * i / steps);
        const y = Math.round(a.y + (b.y - a.y) * i / steps);
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) this.set(x + dx, y + dy, T.GRASS);
      }
    }

    // Najbliższy kafelek po którym da się chodzić (BFS od zadanego)
    nearestWalkable(x, y) {
      x = Math.max(0, Math.min(this.w - 1, x));
      y = Math.max(0, Math.min(this.h - 1, y));
      if (this.isWalkable(x, y)) return { x, y };
      const seen = new Uint8Array(this.tiles.length);
      const queue = [[x, y]];
      seen[this.idx(x, y)] = 1;
      for (let qi = 0; qi < queue.length; qi++) {
        const [cx, cy] = queue[qi];
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = cx + dx, ny = cy + dy;
          if (!this.inBounds(nx, ny) || seen[this.idx(nx, ny)]) continue;
          if (this.isWalkable(nx, ny)) return { x: nx, y: ny };
          seen[this.idx(nx, ny)] = 1;
          queue.push([nx, ny]);
        }
      }
      return null;
    }

    // n wolnych kafelków najbliżej celu — formacja dla grupy jednostek
    formationTiles(x, y, n) {
      const start = this.nearestWalkable(x, y);
      if (!start) return [];
      const out = [];
      const seen = new Uint8Array(this.tiles.length);
      const queue = [start];
      seen[this.idx(start.x, start.y)] = 1;
      for (let qi = 0; qi < queue.length && out.length < n; qi++) {
        const c = queue[qi];
        out.push(c);
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = c.x + dx, ny = c.y + dy;
          if (!this.isWalkable(nx, ny) || seen[this.idx(nx, ny)]) continue;
          seen[this.idx(nx, ny)] = 1;
          queue.push({ x: nx, y: ny });
        }
      }
      return out;
    }
  }

  Gra.GameMap = GameMap;
})();
