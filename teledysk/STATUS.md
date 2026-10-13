# Status prac: teledysk „Zostań tu”

Ostatnia aktualizacja: 13.10.2026

## Jak wrócić do pracy (nowy wątek) 🔁
- Najnowsza praca jest na gałęzi **`ccr-baa341b7-hv20hr`** (kontynuacja `ccr-2f0602d0-vubnss`) (na `main` jej nie ma!).
- Przeczytaj: `CLAUDE.md`, `teledysk/README.md` (zasady i podział pracy), `postacie.md`, `lokacje.md`, `scenariusz-zostan-tu.md` (tekst piosenki, czasy, **nowy układ refrenu 1**), `lekcje-hell-grind.md`, ten plik oraz pliki ostatnich ujęć: `prompty/u13-skarpetka.md`, `u14-laptop-dom.md`, `u15-karton-kuchnia.md` (sprawdzony sposób pracy krok po kroku).
- Autor generuje we **Flow**: obrazy w Nano Banana Pro (NBP), wideo w Omni 1.1 Flash (4 s pod 3,75 s, 8 s pod 7,5 s, 720p). Claude pisze prompty, ocenia wyniki (arkusze klatek z ffmpeg), przycina klipy i odsyła pliki.
- **Przycinanie robi Claude:** autor wrzuca klip, Claude wybiera fragment, usuwa dźwięk, zapisuje do `teledysk/wyniki/` (poza gitem) i wysyła plik. Gdy trzeba wyciąć początek, a brakuje długości: lekkie zwolnienie (ok. 80%) z `minterpolate` wygląda naturalnie (u15).
- **Umowa z autorem:** prompty wideo ściśle według `cinedance`, obrazy według `lira-image-prompts`. Przed odejściem od szablonu/scenariusza pytamy, a o niezgodnościach mówimy wprost.

## Sprawdzony sposób na ujęcie (u13–u15) ✅
1. **Baza lokacji:** klatka z wcześniejszego klipu albo referencja (przycięta do 16:9).
2. **NBP etapami, jedna zmiana na przejście:** najpierw pokój (usuń/dodaj obiekty, światło), potem postacie. Każde przejście x3, autor wybiera.
3. **Nowe stroje = edycja planszki** (`tomek.png`, `ania-park.jpg` itd.) w NBP 3:2, potem planszka idzie jako referencja.
4. **Wideo w Omni od klatki startowej**, pełny prompt `cinedance` (ACTION TIMING w sekundach, najazd kamery, „nobody speaks”).
5. Lekcje: nie opisujemy lampy „at the top edge of the frame”, bo NBP ją wtedy wyciąga do kadru; klatka startowa = stan **przed** akcją (nie puenta); animacja drzwi to słaby punkt, więc drzwi ustawiamy na klatce startowej prawie w stanie końcowym.

## Zrobione ✅
- Akt 1 (u01–u12) kompletny i zmontowany w CapCucie (oś do 1:15,0).
- **u13 skarpetka** ✅ 1:15,0–1:18,75 (wieczór, lampa sufitowa; Ania `ania-golf.jpg`, Tomek `tomek-sweter.jpg`). W CapCucie.
- **u14 laptop i dom** ✅ 1:18,75–1:22,5 (noc, stolik przy oknie z firankami, na ekranie `dom.png`). W CapCucie.
- **u15 karton „KUCHNIA”** ✅ 1:22,5–1:26,25 (poranek dnia przeprowadzki, kuchnia z u03 bez krzeseł; Tomek `tomek-koszulka.jpg`: biała koszulka + jeansy). Plik `u15_karton_3.75s.mp4` wysłany autorowi.
- Nowe planszki: `ania-golf.jpg` (musztardowy golf), `tomek-sweter.jpg` (kremowy sweter), `tomek-koszulka.jpg` (biała koszulka, jeansy).
- Wers „niech ten dom będzie nasz” zaczyna się ok. **1:23,7** (pomiar autora w CapCucie), czyli na u15.

## Nowy układ refrenu 1 i dalej (decyzje autora 13.10) 📋
- **Usunięte:** u16 „kanapa na schodach” (za trudne technicznie) i u17 „jedzenie wśród kartonów w kawalerce”.
- **Pora dnia:** u15 = **początek dnia przeprowadzki**, dalej dzień ciągniemy chronologicznie aż do zachodu (u24).

| # | Oś | Ujęcie | Długość |
|---|---|---|---|
| 16 **nowe** | 1:26,25–1:30 | **Pożegnanie z kawalerką:** pusty pokój z u13 w porannym słońcu, Ania z pieskiem w drzwiach rozgląda się ostatni raz, piesek wybiega, Ania zamyka drzwi | 3,75 s |
| 18 | 1:30–1:33,75 | Pod kamienicą: w busie **same kartony** (kanapa zostaje w kawalerce, decyzja 13.10), Tomek zatrzaskuje drzwi busa na beat | 3,75 s |
| 19 | 1:33,75–1:41,25 | Droga: piesek z łbem za oknem, uszy na wietrze, Ania się śmieje | **7,5 s** |
| 20 | 1:41,25–1:45 | Przedmieścia, bus skręca na podjazd → „Hej!” | 3,75 s |
| 21–23 | 1:45–2:07,5 | bez zmian: klucz (złota godzina), ogród, salon w słońcu | |
| 24 | 2:07,5–2:15 | **Zachód: jedzą pizzę z pudełka, siedząc na kartonach w pustym salonie, piesek je obok ze swojej miski** (pierwszy posiłek w nowym domu; tu przeszła miska z dawnego u17) | 7,5 s |

## Następny krok ▶️ u16 (pożegnanie z kawalerką)
**Krok A ✅ `ania-paski.jpg`, krok B ✅ `u16-pokoj-pusty.jpg` (opcjonalna poprawka B2: liście, prostokąty). Krok C ✅ `u16-start.jpg`, wideo ✅ `u16_pozegnanie_3.75s.mp4` (1:26,25–1:30). u16 GOTOWE.**

## W toku ▶️ u18 (bus pod kamienicą)
Prompt kroku A (ulica z busem, NBP) w `prompty/u18-bus-kamienica.md`. Do decyzji autora: czy w tle z bramy wychodzą Ania z pieskiem. Krok B (`u16-pokoj-pusty.jpg`) gotowy w `prompty/u16-pozegnanie-kawalerka.md`** według listy autora: meble właściciela zostają (kanapa, pusty regał, szafa, lampa, dywan), rzeczy pary znikają.
Propozycja zaakceptowana co do idei, szczegóły do potwierdzenia przez autora:
1. **Planszka Ani na dzień przeprowadzki:** propozycja Claude, czyli bluzka w biało-granatowe paski (bretońska), jasne jeansy, białe trampki, złoty kolczyk (edycja `ania.png` w NBP 3:2). Do potwierdzenia.
2. **Pokój po spakowaniu (decyzja 13.10):** kawalerka wynajmowana z meblami. Zostają kanapa, pusty regał, szafa, lampa i dywan. Znikają TV, książki, monstera, futerał, poduszka, kwiatek i obrazki (zostają po nich jaśniejsze prostokąty).
3. **Ania + piesek w drzwiach:** jedno skrzydło już zamknięte, Ania trzyma klamkę drugiego, uchylonego (zabezpieczenie: animacja drzwi to słaby punkt modelu).
4. **Wideo 4 s:** rozgląda się, wzruszony uśmiech, piesek wybiega, Ania domyka skrzydło. Cięcie 3,75 s.

## Do decyzji 🧐
- ~~Ujęcie 33: rozłożona kanapa~~ rozstrzygnięte 13.10: kanapa zostaje w kawalerce, w u33 śpią na materacu.
- Strój Ani na u18–u24 (ten sam dzień co u16) = ten z planszki do u16.
- Telewizor na regale w u14 zmienił kolor (autor akceptuje).
