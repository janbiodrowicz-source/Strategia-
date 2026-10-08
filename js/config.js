// Konfiguracja gry. Koszty, HP, atak, zasięg, ruch i populację jednostek oraz
// budynki i technologie wczytuje js/balans.js z balans_startowy.csv.
window.Gra = window.Gra || {};

Gra.CONFIG = {
  TILE: 32, // rozmiar kafelka w pikselach

  ROUNDS: {
    1: { name: 'Runda 1', size: 64, protectionMin: 10, fog: false },
    2: { name: 'Runda 2', size: 96, protectionMin: 20, fog: false },
    3: { name: 'Runda 3', size: 128, protectionMin: 30, fog: true },
  },

  DIFFICULTY: {
    easy:   { name: 'Łatwy',  economy: 0.8, wave: [5, 8],   waveEveryMin: 4 },
    medium: { name: 'Średni', economy: 1.0, wave: [10, 14], waveEveryMin: 3 },
    hard:   { name: 'Trudny', economy: 1.3, wave: [15, 20], waveEveryMin: 2 },
  },

  // Tu tylko to, czego nie ma w CSV: sight — promień widzenia, radius — rozmiar
  // (oba w kafelkach). Jednostki są łączone z CSV po nazwie.
  RACES: {
    forest: {
      name: 'Strażnicy Puszczy',
      color: '#3fae4a',
      units: {
        gatherer: { name: 'Zbieracz',         sight: 6, radius: 0.32, worker: true },
        scout:    { name: 'Zwiadowca',        sight: 9, radius: 0.32 },
        archer:   { name: 'Łucznik Puszczy',  sight: 8, radius: 0.32 },
        warden:   { name: 'Strażnik Korzeni', sight: 6, radius: 0.38 },
        dryad:    { name: 'Dryada',           sight: 7, radius: 0.32 },
      },
      startUnits: ['gatherer', 'gatherer', 'gatherer', 'gatherer', 'scout'],
    },
    iron: {
      name: 'Żelazny Zakon',
      color: '#c0392b',
      units: {
        miner:      { name: 'Górnik',      sight: 6, radius: 0.32, worker: true },
        hammer:     { name: 'Młot',        sight: 6, radius: 0.38 },
        crossbow:   { name: 'Kusznik',     sight: 8, radius: 0.32 },
        firepriest: { name: 'Kapłan Ognia', sight: 7, radius: 0.32 },
      },
      startUnits: ['miner', 'miner', 'miner', 'miner', 'hammer'],
    },
  },

  FOG_UPDATE_MS: 150,
  EDGE_SCROLL_PX: 14,
  CAMERA_SPEED: 900, // px/s
  ZOOM_MIN: 0.5,
  ZOOM_MAX: 1.75,
};
