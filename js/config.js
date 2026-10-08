// Konfiguracja gry. Koszty, HP, atak, zasięg, ruch i populację jednostek oraz
// budynki i technologie wczytuje js/balans.js z balans_startowy.csv.
window.Gra = window.Gra || {};

Gra.CONFIG = {
  VERSION: 'v0.10', // numer wersji pokazywany w menu — podbijaj przy każdej publikacji
  TILE: 32, // rozmiar kafelka w pikselach

  ROUNDS: {
    1: { name: 'Runda 1', size: 64, protectionMin: 10, fog: false },
    2: { name: 'Runda 2', size: 96, protectionMin: 20, fog: false },
    3: { name: 'Runda 3', size: 128, protectionMin: 30, fog: true },
  },

  // economy — mnożnik zbierania AI, wave — rozmiar fali, waveEveryMin — odstęp fal (CSV).
  // Reszta to plan AI: docelowa liczba robotników, koszar, wież i czy bada technologie.
  DIFFICULTY: {
    easy:   { name: 'Łatwy',  economy: 0.8, wave: [5, 8],   waveEveryMin: 4,
              workers: 7,  military: 1, towers: 0, techs: false },
    medium: { name: 'Średni', economy: 1.0, wave: [10, 14], waveEveryMin: 3,
              workers: 10, military: 2, towers: 1, techs: true },
    hard:   { name: 'Trudny', economy: 1.3, wave: [15, 20], waveEveryMin: 2,
              workers: 13, military: 3, towers: 2, techs: true },
  },

  // Tu tylko to, czego nie ma w CSV: sight — promień widzenia, radius — rozmiar
  // (oba w kafelkach). Jednostki są łączone z CSV po nazwie.
  RACES: {
    forest: {
      name: 'Strażnicy Puszczy',
      color: '#3fae4a',
      units: {
        gatherer: { name: 'Zbieracz',         sight: 6, radius: 0.32, worker: true,
                    gather: { wood: 1.2, stone: 0.8, gold: 1.0 } }, // mocni w drewnie, słabsi w kamieniu
        scout:    { name: 'Zwiadowca',        sight: 9, radius: 0.32 },
        archer:   { name: 'Łucznik Puszczy',  sight: 8, radius: 0.32 },
        warden:   { name: 'Strażnik Korzeni', sight: 6, radius: 0.38 },
        dryad:    { name: 'Dryada',           sight: 7, radius: 0.32, healer: true }, // CSV: leczy 8 HP/s
      },
      startUnits: ['gatherer', 'gatherer', 'gatherer', 'gatherer', 'scout'],
      // Budynki łączone z CSV po nazwie. size — bok w kafelkach, produces — klucze jednostek,
      // dropOff — robotnicy mogą tu odnosić surowce, depositBonus — mnożnik odniesionego surowca
      buildings: {
        base:  { name: 'Drzewo Rodowe', size: 3, icon: '🌳', buildable: false, sight: 8,
                 produces: ['gatherer'], dropOff: true },
        grove: { name: 'Gaj Zbieraczy', size: 2, icon: '🪓', sight: 5,
                 produces: ['gatherer'], dropOff: true, depositBonus: { wood: 1.2 } },
        nest:  { name: 'Gniazdo Łuczników', size: 2, icon: '🏹', sight: 5,
                 produces: ['archer', 'scout', 'warden'] }, // Strażnik Korzeni: brak w CSV, tymczasowo tutaj
        pool:  { name: 'Sadzawka Życia', size: 2, icon: '💧', sight: 5, produces: ['dryad'],
                 aura: { heal: 1, radius: 4 } }, // CSV: +1 leczenie w pobliżu
        tower: { name: 'Wieża z Gałęzi', size: 2, icon: '🗼', sight: 8 },
        farm:  { name: 'Gaj Pod Gałęziami (farma)', size: 2, icon: '🌾', sight: 4 },
      },
      // Technologie badane w bazie; łączone z CSV po nazwie. unlockMin — od której minuty gry
      techs: {
        songs: { name: 'Leśne Pieśni', icon: '🎵', unlockMin: 5, time: 30, effect: 'forestSpeed' },
        resin: { name: 'Żywiczne Ostrza', icon: '🗡️', unlockMin: 12, time: 45, effect: 'archerDamage' },
      },
    },
    iron: {
      name: 'Żelazny Zakon',
      color: '#c0392b',
      units: {
        miner:      { name: 'Górnik',      sight: 6, radius: 0.32, worker: true,
                      gather: { wood: 1.0, stone: 1.2, gold: 1.2 } }, // CSV: kamień i złoto +20%
        hammer:     { name: 'Młot',        sight: 6, radius: 0.38 },
        crossbow:   { name: 'Kusznik',     sight: 8, radius: 0.32 },
        firepriest: { name: 'Kapłan Ognia', sight: 7, radius: 0.32, burns: true }, // CSV: 6 dmg/s przez 4 s
      },
      startUnits: ['miner', 'miner', 'miner', 'miner', 'hammer'],
      buildings: {
        base:     { name: 'Twierdza', size: 3, icon: '🏰', buildable: false, sight: 8,
                    produces: ['miner'], dropOff: true },
        mine:     { name: 'Kopalnia Runiczna', size: 2, icon: '⛏️', sight: 5,
                    dropOff: true, depositBonus: { stone: 1.35, gold: 1.25 } },
        forge:    { name: 'Kuźnia', size: 2, icon: '🔨', sight: 5, produces: ['hammer', 'firepriest'] },
        workshop: { name: 'Warsztat Kuszników', size: 2, icon: '🎯', sight: 5, produces: ['crossbow'] },
        tower:    { name: 'Wieża Bojowa', size: 2, icon: '🗼', sight: 8 },
        wall:     { name: 'Mur Kamienny (segment)', size: 1, icon: '🧱', sight: 2 },
        farm:     { name: 'Dom Rodzinny (farma)', size: 2, icon: '🏠', sight: 4 },
      },
      techs: {
        walls:   { name: 'Runiczne Mury', icon: '🛡️', unlockMin: 5, time: 30, effect: 'buildingHp' },
        helmets: { name: 'Żelazne Hełmy', icon: '⛑️', unlockMin: 12, time: 45, effect: 'unitArmor' },
      },
    },
  },

  // Zbieranie: ładunek robotnika, tempo (jednostek/s przed mnożnikiem rasy),
  // zasoby jednego kafelka lasu / skały / złoża
  GATHER: {
    carry: 10,
    rate: 2,
    amount: { wood: 60, stone: 150, gold: 400 },
  },

  COMBAT: {
    projectileSpeed: 14,        // kafelki/s
    acquireEvery: 0.3,          // co ile s bezczynna jednostka rozgląda się za wrogiem
    repathEvery: 0.5,           // co ile s pościg przelicza trasę
    leash: 10,                  // jak daleko (kafelki) jednostka goni wroga od miejsca, w którym stała
    heal: 8,                    // Dryada: HP/s (CSV)
    burn: { dps: 6, duration: 4 }, // Kapłan Ognia (CSV)
    // Efekty technologii (CSV)
    forestSpeed: 1.15,          // Leśne Pieśni: +15% ruchu przy lesie
    archerDamage: 2,            // Żywiczne Ostrza: +2 obrażenia łuczników
    buildingHp: 1.2,            // Runiczne Mury: +20% HP budynków
    unitArmor: 1,               // Żelazne Hełmy: +1 pancerz jednostek
  },

  QUEUE_MAX: 5,                // maks. jednostek w kolejce budynku
  CANCEL_REFUND_STARTED: 0.75, // zwrot przy anulowaniu rozpoczętej budowy
  EXTRA_BUILDER_RATE: 0.5,     // każdy kolejny budowniczy przyspiesza budowę o 50%

  FOG_UPDATE_MS: 150,
  EDGE_SCROLL_PX: 14,
  CAMERA_SPEED: 900, // px/s
  ZOOM_MIN: 0.5,
  ZOOM_MAX: 1.75,
};
