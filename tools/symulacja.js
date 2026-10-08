// Turniej AI kontra AI w przeglądarce bez okna — do sprawdzania balansu i wyłapywania błędów.
// Obie strony gra to samo AI (js/ai.js): druga kopia dostaje właściciela 0 i surowce gracza.
// Wymaga Node i Playwright (npm i -g playwright && npx playwright install chromium).
//
// Użycie: node tools/symulacja.js [runda 1-3|wszystkie] [poziom easy|medium|hard] [partii na stronę] [limit min]
//   np. node tools/symulacja.js            → wszystkie rundy, średni, 6 ziaren na stronę, 60 min
//       node tools/symulacja.js 1 hard 3
const fs = require('fs');
const path = require('path');

let chromium;
try { ({ chromium } = require('playwright')); } catch {
  console.error('Brak Playwright: npm i -g playwright && npx playwright install chromium (i ustaw NODE_PATH na globalne moduły)');
  process.exit(1);
}

const root = path.join(__dirname, '..');
const [roundArg = 'wszystkie', difficulty = 'medium', perSide = '6', maxMin = '60'] = process.argv.slice(2);
const rounds = roundArg === 'wszystkie' ? [1, 2, 3] : [Number(roundArg)];

// Kopia AI grająca za gracza (właściciel 0)
const mirrorAi = fs.readFileSync(path.join(root, 'js', 'ai.js'), 'utf8')
  .replace('const OWNER = 1', 'const OWNER = 0')
  .replace(/game\.aiResources/g, 'game.resources')
  .replace(/game\.aiRace/g, 'game.playerRace')
  .replace(/game\.ai\b/g, 'game.ai0')
  .replace('Gra.ai = {', 'Gra.ai0 = {');

async function play(page, race, round, seed) {
  return page.evaluate(({ race, round, difficulty, seed, maxMin }) => {
    const g = Gra.startGame({ race, round, difficulty, seed });
    g.paused = true;       // pętlę gry prowadzimy sami, bez rysowania
    g.toast = () => {};
    g.ai0 = Gra.ai0.create(g);
    const problems = new Set();
    const t0 = performance.now();
    while (g.time < maxMin * 60 && !g.over) {
      for (let i = 0; i < 200 && !g.over; i++) {
        g.step(0.05);
        Gra.ai0.update(g, 0.05);
      }
      for (const u of g.units) if (!isFinite(u.x) || !isFinite(u.y) || !isFinite(u.hp)) problems.add(`NaN: ${u.def.name}`);
      for (const r of [g.resources, g.aiResources]) {
        for (const k of ['wood', 'stone', 'gold']) if (!isFinite(r[k]) || r[k] < 0) problems.add(`zły stan surowca ${k}: ${r[k]}`);
      }
    }
    return { time: g.time, winner: g.over ? g.over.winner : null, ms: performance.now() - t0, problems: [...problems] };
  }, { race, round, difficulty, seed, maxMin: Number(maxMin) });
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const total = { forest: 0, iron: 0, remis: 0 };

  for (const round of rounds) {
    const score = { forest: 0, iron: 0, remis: 0 };
    for (const race of ['forest', 'iron']) {
      for (let seed = 1; seed <= Number(perSide); seed++) {
        await page.goto('file://' + path.join(root, 'index.html'));
        await page.evaluate(() => localStorage.clear());
        await page.addScriptTag({ content: mirrorAi });
        const r = await play(page, race, round, seed);
        const other = race === 'forest' ? 'iron' : 'forest';
        const win = r.winner === null ? 'remis' : r.winner === 0 ? race : other;
        score[win]++;
        console.log(`runda ${round} · gracz ${race} · ziarno ${seed}: ${win === 'remis' ? 'remis' : 'wygrywa ' + win} ` +
                    `po ${fmt(r.time)} (liczone ${(r.ms / 1000).toFixed(1)} s)` + (r.problems.length ? ` ⚠️ ${r.problems.join('; ')}` : ''));
      }
    }
    console.log(`== runda ${round}: Puszcza ${score.forest} · Zakon ${score.iron} · remis ${score.remis}\n`);
    for (const k in total) total[k] += score[k];
  }
  console.log(`RAZEM: Puszcza ${total.forest} · Zakon ${total.iron} · remis ${total.remis}`);
  if (errors.length) console.log('Błędy JS:', [...new Set(errors)]);
  await browser.close();
})();
