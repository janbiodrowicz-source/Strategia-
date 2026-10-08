// A* na siatce kafelków (8 kierunków, bez ścinania narożników) + wygładzanie ścieżki.
(function () {
  const SQRT2 = Math.SQRT2;
  const DIRS = [
    [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
    [1, 1, SQRT2], [1, -1, SQRT2], [-1, 1, SQRT2], [-1, -1, SQRT2],
  ];

  class MinHeap {
    constructor() { this.items = []; }
    get size() { return this.items.length; }
    push(node, f) {
      const a = this.items;
      a.push([f, node]);
      let i = a.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (a[p][0] <= a[i][0]) break;
        [a[p], a[i]] = [a[i], a[p]];
        i = p;
      }
    }
    pop() {
      const a = this.items;
      const top = a[0];
      const last = a.pop();
      if (a.length) {
        a[0] = last;
        let i = 0;
        for (;;) {
          const l = 2 * i + 1, r = l + 1;
          let m = i;
          if (l < a.length && a[l][0] < a[m][0]) m = l;
          if (r < a.length && a[r][0] < a[m][0]) m = r;
          if (m === i) break;
          [a[m], a[i]] = [a[i], a[m]];
          i = m;
        }
      }
      return top[1];
    }
  }

  function octile(ax, ay, bx, by) {
    const dx = Math.abs(ax - bx), dy = Math.abs(ay - by);
    return Math.max(dx, dy) + (SQRT2 - 1) * Math.min(dx, dy);
  }

  // Zwraca listę kafelków [{x,y}] od startu (bez niego) do celu, albo [] gdy brak drogi
  function findPath(map, sx, sy, tx, ty) {
    const goal = map.nearestWalkable(tx, ty);
    if (!goal) return [];
    if (goal.x === sx && goal.y === sy) return [];

    const n = map.w * map.h;
    const g = new Float32Array(n).fill(Infinity);
    const came = new Int32Array(n).fill(-1);
    const closed = new Uint8Array(n);
    const start = map.idx(sx, sy), target = map.idx(goal.x, goal.y);
    const open = new MinHeap();
    g[start] = 0;
    open.push(start, octile(sx, sy, goal.x, goal.y));

    while (open.size) {
      const cur = open.pop();
      if (cur === target) break;
      if (closed[cur]) continue;
      closed[cur] = 1;
      const cx = cur % map.w, cy = (cur / map.w) | 0;
      for (const [dx, dy, cost] of DIRS) {
        const nx = cx + dx, ny = cy + dy;
        if (!map.isWalkable(nx, ny)) continue;
        if (dx && dy && (!map.isWalkable(cx + dx, cy) || !map.isWalkable(cx, cy + dy))) continue;
        const ni = map.idx(nx, ny);
        const ng = g[cur] + cost;
        if (ng < g[ni]) {
          g[ni] = ng;
          came[ni] = cur;
          open.push(ni, ng + octile(nx, ny, goal.x, goal.y));
        }
      }
    }

    if (came[target] === -1) return [];
    const path = [];
    for (let i = target; i !== start; i = came[i]) path.push({ x: i % map.w, y: (i / map.w) | 0 });
    path.reverse();
    return smooth(map, { x: sx, y: sy }, path);
  }

  // Czy jednostka o promieniu r (w kafelkach) przejdzie prosto z a do b (środki kafelków)
  function clearLine(map, a, b, r) {
    const ax = a.x + 0.5, ay = a.y + 0.5, bx = b.x + 0.5, by = b.y + 0.5;
    const len = Math.hypot(bx - ax, by - ay);
    const steps = Math.ceil(len / 0.2);
    for (let i = 0; i <= steps; i++) {
      const px = ax + (bx - ax) * i / steps, py = ay + (by - ay) * i / steps;
      for (const [ox, oy] of [[-r, -r], [r, -r], [-r, r], [r, r]]) {
        if (!map.isWalkable(Math.floor(px + ox), Math.floor(py + oy))) return false;
      }
    }
    return true;
  }

  // Usuwa zbędne punkty pośrednie (string pulling), żeby ruch nie był zygzakiem
  function smooth(map, start, path) {
    if (path.length < 2) return path;
    const out = [];
    let anchor = start;
    for (let i = 0; i < path.length - 1; i++) {
      if (!clearLine(map, anchor, path[i + 1], 0.4)) {
        out.push(path[i]);
        anchor = path[i];
      }
    }
    out.push(path[path.length - 1]);
    return out;
  }

  Gra.findPath = findPath;
})();
