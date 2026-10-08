# Strategia — mini-RTS w przeglądarce

Strategia czasu rzeczywistego w stylu klasycznych RTS-ów: dwie rasy, trzy surowce, przeciwnik AI.

## Uruchomienie

▶️ **Zagraj online:** https://janbiodrowicz-source.github.io/Strategia-/ (GitHub Pages z gałęzi `main`)

Albo lokalnie: otwórz `index.html` w przeglądarce. Nie trzeba niczego instalować ani budować.

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
| Budowa | zaznacz robotnika → przycisk budynku → LPM na mapie (Shift — kilka, PPM / Esc — anuluj) |
| Pomoc w budowie | zaznacz robotników, PPM na niedokończonym budynku |
| Produkcja | kliknij budynek → przycisk jednostki (kliknięcie ⏳ w kolejce anuluje) |
| Punkt zbiórki | zaznacz budynek, PPM na mapie (na surowcu — nowi robotnicy od razu zbierają) |
| Atak | PPM na wrogu |
| Szturm (atak po drodze) | Q albo przycisk ⚔️ Szturm, potem klik na mapie |
| Podgląd wroga | LPM na wrogu |
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
| Budowa | zaznacz robotnika → przycisk budynku → dotknij mapy → ✔ Postaw |
| Produkcja | dotknij budynku → przycisk jednostki |
| Punkt zbiórki | dotknij budynku, potem miejsca na mapie |
| Atak | zaznacz wojsko, dotknij wroga |
| Szturm | przycisk ⚔️ Szturm, potem dotknij mapy |
| Podgląd wroga | dotknij wroga, gdy nic nie jest zaznaczone |
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
- [x] Budowanie (plac budowy → budowa → gotowe) i produkcja jednostek z kolejką
- [x] Walka: wręcz i dystans, wieże, Szturm, leczenie Dryady, podpalenie Kapłana Ognia, technologie, zwycięstwo/porażka
- [ ] AI przeciwnika

## Zbieranie surowców

Robotnik niesie 10 jednostek surowca, zbiera 2/s × mnożnik rasy i sam kursuje między złożem a bazą.
Wyczerpany kafelek znika z mapy, a robotnik przechodzi na najbliższy kafelek tego samego surowca.

| Robotnik | Drewno | Kamień | Złoto |
|---|---|---|---|
| Zbieracz (Strażnicy Puszczy) | ×1.2 | ×0.8 | ×1.0 |
| Górnik (Żelazny Zakon) | ×1.0 | ×1.2 | ×1.2 |

Zasoby kafelka: las 60, skała 150, złoże 400. Ustawienia są w `js/config.js` → `GATHER`.

## Budynki i produkcja

| Rasa | Budynek | Rozmiar | Rola |
|---|---|---|---|
| 🌲 | Drzewo Rodowe | 3×3 | baza: Zbieracze, zrzut surowców, populacja +10 |
| 🌲 | Gaj Zbieraczy | 2×2 | Zbieracze, zrzut surowców (drewno +20%) |
| 🌲 | Gniazdo Łuczników | 2×2 | Łucznicy, Zwiadowcy, Strażnicy Korzeni* |
| 🌲 | Sadzawka Życia | 2×2 | Dryady, leczy jednostki w pobliżu (+1 HP/s) |
| 🌲 | Wieża z Gałęzi | 2×2 | obrona: 10 obrażeń co 1 s, zasięg 6 |
| 🌲 | Gaj Pod Gałęziami | 2×2 | farma, populacja +6 |
| 🪨 | Twierdza | 3×3 | baza: Górnicy, zrzut surowców, populacja +10 |
| 🪨 | Kopalnia Runiczna | 2×2 | zrzut surowców (kamień +35%, złoto +25%) |
| 🪨 | Kuźnia | 2×2 | Młoty, Kapłani Ognia |
| 🪨 | Warsztat Kuszników | 2×2 | Kusznicy |
| 🪨 | Wieża Bojowa | 2×2 | obrona: 14 obrażeń co 2 s, zasięg 7 |
| 🪨 | Mur Kamienny | 1×1 | blokuje drogę |
| 🪨 | Dom Rodzinny | 2×2 | farma, populacja +6 |

\* CSV nie mówi, gdzie powstaje Strażnik Korzeni — tymczasowo w Gnieździe Łuczników.

- Koszt budynku jest pobierany przy postawieniu placu budowy. Anulowanie placu oddaje 100%, rozpoczętej budowy 75%.
- Każdy kolejny robotnik przy budowie przyspiesza ją o 50%.
- Koszt jednostki jest pobierany przy dodaniu do kolejki (maks. 5). Populacja liczy też jednostki w kolejce.
- Bonus zrzutu działa na surowce odniesione do danego budynku.

## Walka

- Okres ochronny blokuje walkę między graczami (rozkaz ataku pokazuje, ile zostało).
- Atak, odstęp i zasięg z CSV. Zasięg > 1 — pocisk, zasięg 1 — cios wręcz. Minimalne obrażenia: 1.
- Bezczynne jednostki bojowe same atakują wrogów w zasięgu wzroku i oddają, gdy ktoś je zaatakuje
  (gonią najwyżej 10 kafelków od miejsca, w którym stały). Robotnicy walczą tylko na rozkaz.
- Wieże strzelają same do najbliższego wroga w zasięgu.
- **Dryada** leczy 8 HP/s najbardziej rannego sojusznika w pobliżu. **Sadzawka Życia** leczy jednostki
  w promieniu 4 kafelków o 1 HP/s. **Kapłan Ognia** podpala: 6 obrażeń/s przez 4 s.
- Przegrywa gracz, który straci wszystkie budynki.

### Technologie (bada się w bazie)

| Rasa | Technologia | Dostępna od | Czas | Efekt |
|---|---|---|---|---|
| 🌲 | Leśne Pieśni | 5:00 | 30 s | +15% szybkości ruchu przy lesie |
| 🌲 | Żywiczne Ostrza | 12:00 | 45 s | +2 obrażenia Łuczników |
| 🪨 | Runiczne Mury | 5:00 | 30 s | +20% HP budynków |
| 🪨 | Żelazne Hełmy | 12:00 | 45 s | +1 pancerz jednostek |

Koszty z CSV, czasy badań i „przy lesie” (las w sąsiednim kafelku) to założenia — do zmiany w `js/config.js`.

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
js/buildings.js   stawianie, budowa, produkcja, kolejka, badania
js/combat.js      walka, wieże, leczenie, podpalenie, koniec gry
js/fog.js         mgła wojny
js/render.js      rysowanie mapy, jednostek, minimapy
js/input.js       mysz, klawiatura, kamera
js/main.js        pętla gry, HUD
```
