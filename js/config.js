// Konfiguracja gry. Wartości oznaczone TODO(CSV) to tymczasowe placeholdery —
// zostaną zastąpione danymi z balans_startowy.csv.
window.Gra = window.Gra || {};

Gra.CONFIG = {
  TILE: 32, // rozmiar kafelka w pikselach

  START_RESOURCES: { wood: 400, stone: 200, gold: 100 },
  POPULATION: { base: 10, farm: 6 },

  ROUNDS: {
    1: { name: 'Runda 1', size: 64, protectionMin: 10, fog: false },
    2: { name: 'Runda 2', size: 96, protectionMin: 20, fog: true },
    3: { name: 'Runda 3', size: 128, protectionMin: 30, fog: true },
  },

  DIFFICULTY: {
    easy:   { name: 'Łatwy',  economy: 0.8, wave: [5, 8],   waveEveryMin: 4 },
    medium: { name: 'Średni', economy: 1.0, wave: [10, 14], waveEveryMin: 3 },
    hard:   { name: 'Trudny', economy: 1.3, wave: [15, 20], waveEveryMin: 2 },
  },

  // speed: kafelki/s, sight: promień widzenia w kafelkach, radius: w kafelkach
  // TODO(CSV): hp, speed, sight do podmiany na wartości z balans_startowy.csv
  RACES: {
    forest: {
      name: 'Strażnicy Puszczy',
      color: '#3fae4a',
      units: {
        gatherer: { name: 'Zbieracz',         hp: 40,  speed: 2.6, sight: 6, radius: 0.32, worker: true },
        scout:    { name: 'Zwiadowca',        hp: 50,  speed: 3.6, sight: 9, radius: 0.32 },
        archer:   { name: 'Łucznik Puszczy',  hp: 55,  speed: 2.8, sight: 8, radius: 0.32 },
        warden:   { name: 'Strażnik Korzeni', hp: 120, speed: 2.2, sight: 6, radius: 0.38 },
        dryad:    { name: 'Dryada',           hp: 45,  speed: 2.6, sight: 7, radius: 0.32 },
      },
      startUnits: ['gatherer', 'gatherer', 'gatherer', 'gatherer', 'scout'],
    },
    iron: {
      name: 'Żelazny Zakon',
      color: '#c0392b',
      units: {
        miner:      { name: 'Górnik',      hp: 50,  speed: 2.2, sight: 6, radius: 0.32, worker: true },
        hammer:     { name: 'Młot',        hp: 130, speed: 2.0, sight: 6, radius: 0.38 },
        crossbow:   { name: 'Kusznik',     hp: 60,  speed: 2.2, sight: 8, radius: 0.32 },
        firepriest: { name: 'Kapłan Ognia', hp: 50, speed: 2.2, sight: 7, radius: 0.32 },
      },
      startUnits: ['miner', 'miner', 'miner', 'miner', 'hammer'],
    },
  },

  FOG_UPDATE_MS: 150,
  EDGE_SCROLL_PX: 14,
  CAMERA_SPEED: 900, // px/s
};
