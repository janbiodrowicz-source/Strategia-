// Mgła wojny: kafelki odkryte (kiedykolwiek widziane) i aktualnie widoczne.
(function () {
  const TILE = Gra.CONFIG.TILE;

  class Fog {
    constructor(map, enabled) {
      this.w = map.w;
      this.h = map.h;
      this.enabled = enabled;
      this.explored = new Uint8Array(map.w * map.h);
      this.visible = new Uint8Array(map.w * map.h);
      if (!enabled) {
        this.explored.fill(1);
        this.visible.fill(1);
      }
    }

    reveal(cx, cy, r) {
      const r2 = r * r;
      for (let y = Math.max(0, Math.floor(cy - r)); y <= Math.min(this.h - 1, Math.ceil(cy + r)); y++) {
        for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(this.w - 1, Math.ceil(cx + r)); x++) {
          if ((x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2 > r2) continue;
          const i = y * this.w + x;
          this.visible[i] = 1;
          this.explored[i] = 1;
        }
      }
    }

    update(units, buildings, owner) {
      if (!this.enabled) return;
      this.visible.fill(0);
      for (const u of units) if (u.owner === owner) this.reveal(u.x / TILE, u.y / TILE, u.def.sight);
      for (const b of buildings) if (b.owner === owner) this.reveal(b.x + 0.5, b.y + 0.5, b.sight);
    }

    isVisible(tx, ty) {
      return tx >= 0 && ty >= 0 && tx < this.w && ty < this.h && this.visible[ty * this.w + tx] === 1;
    }

    isExplored(tx, ty) {
      return tx >= 0 && ty >= 0 && tx < this.w && ty < this.h && this.explored[ty * this.w + tx] === 1;
    }
  }

  Gra.Fog = Fog;
})();
