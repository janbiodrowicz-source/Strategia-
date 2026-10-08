// Przepisuje balans_startowy.csv do js/balans-data.js, żeby gra działała
// także po otwarciu index.html prosto z dysku (file:// blokuje fetch).
// Użycie: node tools/build-balans.js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const csv = fs.readFileSync(path.join(root, 'balans_startowy.csv'), 'utf8');
const out =
  '// WYGENEROWANE z balans_startowy.csv przez tools/build-balans.js — nie edytuj ręcznie.\n' +
  `Gra.BALANS_CSV = ${JSON.stringify(csv)};\n`;
fs.writeFileSync(path.join(root, 'js', 'balans-data.js'), out);
console.log('Zapisano js/balans-data.js');
