// Parsuje balans_startowy.csv i nakłada wartości na Gra.CONFIG (jednostki i budynki łączone po nazwie).
(function () {
  const CFG = Gra.CONFIG;

  // Prosty parser CSV: przecinki, pola w cudzysłowach, "" jako cudzysłów
  function parseCsv(text) {
    const rows = [];
    let row = [], field = '', quoted = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (quoted) {
        if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (c === '"') quoted = false;
        else field += c;
      } else if (c === '"') quoted = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); field = '';
        if (row.some((f) => f !== '')) rows.push(row);
        row = [];
      } else field += c;
    }
    row.push(field);
    if (row.some((f) => f !== '')) rows.push(row);
    const [header, ...data] = rows;
    return data.map((r) => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? '').trim()])));
  }

  function toEntry(r) {
    const num = (k) => Number(r[k]) || 0;
    return {
      name: r.nazwa,
      cost: { wood: num('koszt_drewno'), stone: num('koszt_kamien'), gold: num('koszt_zloto') },
      time: num('czas_s'),
      hp: num('hp'),
      attack: num('atak'),
      attackInterval: num('interwal_ataku_s'),
      range: num('zasieg'),
      speed: num('ruch'), // kafelki/s
      pop: num('pop'),     // jednostka: zajmowana populacja; budynek: dawany limit
      desc: r.opis,
    };
  }

  function load(text) {
    const rows = parseCsv(text);
    const balans = { start: null, races: {} };
    for (const r of rows) {
      if (r.typ === 'zasoby') {
        const e = toEntry(r);
        balans.start = { ...e.cost };
        continue;
      }
      const kind = { jednostka: 'units', budynek: 'buildings', technologia: 'techs' }[r.typ];
      if (!kind) continue; // AI i rundy na razie w config.js
      const race = balans.races[r.rasa] ||= { units: [], buildings: [], techs: [] };
      race[kind].push(toEntry(r));
    }
    return balans;
  }

  function apply(balans) {
    if (balans.start) CFG.START_RESOURCES = balans.start;
    for (const race of Object.values(CFG.RACES)) {
      const data = balans.races[race.name];
      if (!data) { console.error(`Brak rasy w CSV: ${race.name}`); continue; }
      for (const unit of Object.values(race.units)) {
        const e = data.units.find((u) => u.name === unit.name);
        if (!e) { console.error(`Brak jednostki w CSV: ${unit.name}`); continue; }
        Object.assign(unit, e);
      }
      for (const building of Object.values(race.buildings)) {
        const e = data.buildings.find((b) => b.name === building.name);
        if (!e) { console.error(`Brak budynku w CSV: ${building.name}`); continue; }
        Object.assign(building, e);
      }
      race.techs = data.techs;
    }
  }

  Gra.BALANS = load(Gra.BALANS_CSV);
  apply(Gra.BALANS);
  Gra.parseCsv = parseCsv;
})();
