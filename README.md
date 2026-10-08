# Strategia — mini-RTS w przeglądarce

Strategia czasu rzeczywistego w stylu klasycznych RTS-ów: dwie rasy, trzy surowce, przeciwnik AI.

## Uruchomienie

Otwórz `index.html` w przeglądarce. Nie trzeba niczego instalować ani budować.

## Sterowanie

| Akcja | Klawisz / mysz |
|---|---|
| Zaznacz jednostkę | LPM |
| Zaznacz grupę | przeciągnij LPM |
| Dodaj/usuń z zaznaczenia | Shift + LPM |
| Zaznacz wszystkie | Ctrl + A |
| Ruch | PPM (na mapie lub minimapie) |
| Przesuwanie kamery | WASD / strzałki / krawędź ekranu / LPM na minimapie |
| Kamera na bazę | Spacja |

## Założenia gry

- **Rasy:** 🌲 Strażnicy Puszczy (szybcy, mocni w drewnie) · 🪨 Żelazny Zakon (mocny środek gry, kamień i złoto)
- **Surowce:** drewno, kamień, złoto. Start: 400 / 200 / 100
- **Populacja:** baza +10, farma +6
- **Rundy:**
  1. mała mapa (64×64), ochrona 10 min, bez mgły wojny
  2. średnia mapa (96×96), ochrona 20 min, mgła wojny
  3. duża mapa (128×128), ochrona 30 min, mgła wojny
- **AI:** łatwy / średni / trudny. Te same zasady co gracz, różni się tempem ekonomii i wielkością fal.

## Stan prac

- [x] Generowana mapa (symetryczna, bazy w przeciwległych narożnikach, gwarantowane przejście)
- [x] Ruch jednostek: A* + wygładzanie ścieżki, formacje grupowe, rozpychanie
- [x] Zaznaczanie, kamera, minimapa, mgła wojny, licznik okresu ochronnego
- [ ] Wczytanie balansu z `balans_startowy.csv` (obecne statystyki w `js/config.js` to placeholdery)
- [ ] Zbieranie surowców
- [ ] Budowanie i produkcja jednostek
- [ ] Walka i zdolności (leczenie Dryady, podpalanie Kapłana Ognia)
- [ ] AI przeciwnika

## Struktura

```
index.html        menu + HUD
css/style.css
js/config.js      ustawienia, rasy, rundy, poziomy AI
js/map.js         generowanie mapy
js/pathfinding.js A*
js/units.js       jednostki i rozkazy ruchu
js/fog.js         mgła wojny
js/render.js      rysowanie mapy, jednostek, minimapy
js/input.js       mysz, klawiatura, kamera
js/main.js        pętla gry, HUD
```
