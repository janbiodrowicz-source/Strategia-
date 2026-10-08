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
| Zbieranie | zaznacz robotników, PPM na lesie / skale / złożu |
| Odnieś ładunek | PPM na własnej bazie |
| Przesuwanie kamery | WASD / strzałki / krawędź ekranu / LPM na minimapie |
| Kamera na bazę | Spacja |
| Przybliżanie | kółko myszy / + i − |
| Zaznacz wszystkie tego typu na ekranie | podwójny klik w jednostkę |

### Telefon / tablet

| Akcja | Gest |
|---|---|
| Zaznacz jednostkę | dotknij jej |
| Zaznacz wszystkie tego typu na ekranie | dotknij dwa razy |
| Rozkaz (ruch) | dotknij miejsca na mapie, gdy coś jest zaznaczone |
| Zbieranie | zaznacz robotników, dotknij lasu / skały / złoża |
| Przesuwanie kamery | przeciągnij palcem / dotknij minimapy |
| Przybliżanie | rozsuń / zsuń dwa palce |
| Zaznaczanie obszarem | przycisk ▢ Obszar, potem przeciągnij |
| Dodawanie do zaznaczenia | przycisk ➕ Dodaj (przełącznik) |
| Robotnicy / wszyscy / odznacz / baza | przyciski na dolnym pasku |

## Założenia gry

- **Rasy:** 🌲 Strażnicy Puszczy (szybcy, mocni w drewnie) · 🪨 Żelazny Zakon (mocny środek gry, kamień i złoto)
- **Surowce:** drewno, kamień, złoto. Start: 400 / 200 / 100
- **Populacja:** baza +10, farma +6
- **Rundy:**
  1. mała mapa (64×64), ochrona 10 min, bez mgły wojny
  2. średnia mapa (96×96), ochrona 20 min, bez mgły wojny
  3. duża mapa (128×128), ochrona 30 min, mgła wojny
- **AI:** łatwy / średni / trudny. Te same zasady co gracz, różni się tempem ekonomii i wielkością fal.

## Stan prac

- [x] Generowana mapa (symetryczna, bazy w przeciwległych narożnikach, gwarantowane przejście)
- [x] Ruch jednostek: A* + wygładzanie ścieżki, formacje grupowe, rozpychanie
- [x] Zaznaczanie, kamera z zoomem, minimapa, mgła wojny (runda 3), licznik okresu ochronnego
- [x] Sterowanie dotykowe na telefon
- [x] Balans jednostek, budynków i technologii z `balans_startowy.csv`
- [x] Zbieranie surowców (robotnicy: las → drewno, skała → kamień, złoże → złoto)
- [ ] Budowanie i produkcja jednostek
- [ ] Walka i zdolności (leczenie Dryady, podpalanie Kapłana Ognia)
- [ ] AI przeciwnika

## Zbieranie surowców

Robotnik niesie 10 jednostek surowca, zbiera 2/s × mnożnik rasy i sam kursuje między złożem a bazą.
Wyczerpany kafelek znika z mapy, a robotnik przechodzi na najbliższy kafelek tego samego surowca.

| Robotnik | Drewno | Kamień | Złoto |
|---|---|---|---|
| Zbieracz (Strażnicy Puszczy) | ×1.2 | ×0.8 | ×1.0 |
| Górnik (Żelazny Zakon) | ×1.0 | ×1.2 | ×1.2 |

Zasoby kafelka: las 60, skała 150, złoże 400. Ustawienia są w `js/config.js` → `GATHER`.

## Balans

Wszystkie koszty, HP, ataki, zasięgi, prędkości i populacja są w `balans_startowy.csv`.
Po edycji CSV uruchom:

```
node tools/build-balans.js
```

Skrypt przepisze CSV do `js/balans-data.js`. Jest to potrzebne, bo przeglądarka nie pozwala
wczytać pliku CSV z dysku, gdy gra jest otwierana bez serwera.

## Struktura

```
index.html        menu + HUD
css/style.css
balans_startowy.csv  dane balansu (źródło prawdy)
tools/build-balans.js  CSV → js/balans-data.js
js/config.js      ustawienia, rasy, rundy, poziomy AI
js/balans.js      parser CSV, nakłada balans na konfigurację
js/map.js         generowanie mapy
js/pathfinding.js A*
js/units.js       jednostki i rozkazy ruchu
js/economy.js     zbieranie i odnoszenie surowców
js/fog.js         mgła wojny
js/render.js      rysowanie mapy, jednostek, minimapy
js/input.js       mysz, klawiatura, kamera
js/main.js        pętla gry, HUD
```
