# Status prac: teledysk „Zostań tu”

Ostatnia aktualizacja: 14.10.2026

## Jak wrócić do pracy (nowy wątek) 🔁
- Najnowsza praca jest na gałęzi **`ccr-baa341b7-hv20hr`** (kontynuacja `ccr-2f0602d0-vubnss`; na `main` jej nie ma!).
- Przeczytaj: `CLAUDE.md`, `teledysk/README.md` (zasady, **umowa „rozmowa a polecenie”**, jak działają referencje we Flow), `postacie.md`, `lokacje.md` (nowy rekwizyt: żółte auto), `scenariusz-zostan-tu.md`, ten plik oraz pliki ostatnich ujęć: `prompty/u15-karton-kuchnia.md`, `u16-pozegnanie-kawalerka.md`, `u18-auto-kamienica.md`.
- Autor generuje we **Flow**: obrazy w Nano Banana Pro (NBP), wideo w Omni 1.1 Flash (4 s pod 3,75 s, 8 s pod 7,5 s, 720p). Pierwsze zdjęcie = klatka startowa, maks. 10 zdjęć. Claude pisze prompty, ocenia wyniki (arkusze klatek z ffmpeg), przycina klipy i odsyła pliki.
- **Przycinanie robi Claude:** wybór fragmentu, bez dźwięku, zapis do `teledysk/wyniki/` (poza gitem), wysyłka pliku. Gdy trzeba wyciąć początek, a brakuje długości: zwolnienie do ok. 80–85% z `minterpolate` wygląda naturalnie (u15, u16).
- **Umowa z autorem:** prompty wideo według `cinedance` (+ `acting`), obrazy według `lira-image-prompts`. **Domyślnie rozmawiamy; pliki i prompty dopiero po wyraźnym „robimy / zapisz / daj prompt”.** O niezgodnościach mówimy wprost.

## Sprawdzony sposób na ujęcie ✅
1. **Baza lokacji:** klatka z wcześniejszego klipu albo referencja (16:9).
2. **NBP etapami:** najpierw miejsce (usuń/dodaj obiekty, światło), potem postacie po kolei. Każde przejście x3, autor wybiera.
3. **Nowe stroje = edycja planszki** w NBP 3:2 (druga planszka jako referencja ubrania, „nothing else from image 2”).
4. **Wideo w Omni od klatki startowej**, pełny prompt `cinedance`.
5. **Lekcje:**
   - klatka startowa = stan **przed** akcją; drzwi/klapy ustawiamy blisko stanu końcowego,
   - nie opisujemy lampy „at the top edge of the frame” (NBP wyciąga ją do kadru),
   - **NBP nie przenosi postaci** w inne miejsce kadru; lepiej usunąć i dodać od nowa (u18),
   - przy wyborze wariantu sprawdzamy osobno każdy ruchomy element (drzwi, skrzydła, klapy),
   - **Omni źle znosi obroty postaci i chodzenie „do drzwi kierowcy”**: im więcej opisu obrotu, tym gorzej. Kierunki piszemy w kategoriach kadru (screen-left, away from the camera), a najlepiej ustawiamy postać na klatce startowej tak, żeby nie musiała się obracać,
   - postać zwrócona do kamery ma lewo i prawo jak w lustrze, więc „przez lewe ramię” myli model,
   - **wielkość psa:** zdanie SIZE z `postacie.md` w każdym prompcie z psem i planszka `piesek-skala.jpg` ✅ w referencjach (decyzja 15.10). u13 poprawione ✅ (mały piesek, skarpeta argyle, sam siad zamiast przewrotu, plik `u13_skarpetka_v2_3.75s.mp4`), u14 na granicy,
   - **jadące auto: kierunek jazdy zawsze w kategoriach kadru** („away from the camera… the road streams toward the camera… never reverses”), inaczej auto jedzie do tyłu (u19); auta z naprzeciwka znikają w smugę, więc przeciwny pas zostawiamy pusty,
   - **na 4 s jedna akcja.** Kilka akcji naraz (trzask + spojrzenie + kiwnięcie + marsz) model gubi albo dokłada swoje (u18, D2–D9),
   - napisy z polskimi znakami („KSIĄŻKI”) i tablica („WA 12345”) wychodzą, gdy są w prompcie i w referencji (`auto.png`).

## Zrobione ✅
- Akt 1 (u01–u12) zmontowany w CapCucie (oś do 1:15,0).
- **u13 skarpetka** ✅ 1:15,0–1:18,75. **u14 laptop i dom** ✅ 1:18,75–1:22,5. **u15 karton „KUCHNIA”** ✅ 1:22,5–1:26,25.
- **u16 pożegnanie z kawalerką** ✅ 1:26,25–1:30. Plik `u16_pozegnanie_3.75s.mp4` (cięcie od 0,83 s, zwolnione do 3,75 s). Pokój po spakowaniu: meble właściciela zostają (kanapa, pusty regał, szafa, lampa, dywan), rzeczy pary zniknęły.
- Nowe planszki: `ania-paski.jpg` (bluzka bretońska), `ania-paski-kardigan.jpg` (+ zielony kardigan), `tomek-koszulka-kurtka.jpg` (+ granatowa kurtka trucker), `auto.png` (żółty hatchback z lat 80., tablica „WA 12345”), `materac-wzor.jpg` i `materac-wzor-lustro.jpg`.

## Decyzje autora (13–14.10) 📋
- Usunięte: stare u16 „kanapa na schodach” i u17 „jedzenie wśród kartonów” (numeracji nie zmieniamy, na osi nie ma dziury).
- Dzień przeprowadzki ciągnie się chronologicznie od u15 (poranek) do zachodu (u24).
- **Żółte auto zamiast busa** (u18–u20). Pies jedzie z tyłu po prawej, Ania na fotelu pasażera (u19).
- **Dom bez mebli, materac zostaje:** podwójny materac zwinięty w rulon w folii jedzie na dachu auta, śpią na nim w u33. Kanapa została w kawalerce.
- **Stroje na zewnątrz (u18–u22):** Ania w zielonym kardiganie na paski, jasne jeansy; Tomek w granatowej kurtce na białą koszulkę. W domu (u23–u24) mogą je zdjąć.

| # | Oś | Ujęcie | Długość |
|---|---|---|---|
| 16 ✅ | 1:26,25–1:30 | Pożegnanie z kawalerką | 3,75 s |
| 18 ✅ | 1:30–1:33,75 | Pod kamienicą: Tomek zatrzaskuje klapę żółtego auta, Ania z psem w bramie | 3,75 s |
| 19 ✅ | 1:33,75–1:41,25 | Droga: piesek z łbem za oknem (tył, prawa strona), Ania się śmieje | 7,5 s |
| 20 | 1:41,25–1:45 | Przedmieścia, żółte auto skręca na podjazd | 3,75 s |
| 21–23 | 1:45–2:07,5 | klucz (złota godzina), ogród, salon w słońcu | |
| 24 | 2:07,5–2:15 | Zachód: pizza na kartonach w pustym salonie, piesek je ze swojej miski | 7,5 s |

## W toku ▶️ u20 (podjazd)
Plan i prompty: `prompty/u20-podjazd.md`. Decyzja autora (14.10): bez skrętu, auto wjeżdża prosto na podjazd i staje przed domem, kamera na wprost domu jak na `dom.png`, późne popołudnie. Kroki: A (dom 16:9), B (auto + piesek), C (wideo 4 s). A ✅. Decyzja autora: drewniany płot z bramą przesuwną, odsuniętą na stałe (zapisane w `lokacje.md`). A2: płot dobry, ale brama po lewej. Decyzja: brama w prawo, do tego furtka, lampka i trójkąt, wszystko w stylu płotu. A4 ✅, czyli dom z płotem gotowy: `referencje/u20-dom-plot.jpg` (stała referencja domu). B ❌, a autor rezygnuje z psa w oknie. B2 ✅ prawie (materac wygląda jak tarcza, nie widać Ani). Prompt B3 (poprawki punktowe) gotowy. Nowe referencje: `auto-materac.jpg`, `auto-tyl.png`.

## Zrobione ✅ u19 (droga, piesek za oknem)
Szczegóły i prompty: `prompty/u19-droga-piesek.md`.
- **Decyzje autora (14.10):** kadr z zewnątrz (kamera na prawym przednim błotniku, patrzy do tyłu: Ania na pierwszym planie, piesek za nią), aleja drzew, przed południem. Wnętrze od przodu odrzucone. Kamera wyszła z tyłu, więc Tomka nie widać (zmiana autora).
- A ✅ (`u19-auto-aleja.jpg`, kamera przy tylnym rogu, auto odjeżdża w aleję). Klatka startowa `u19-start.jpg` ✅ (po B, C i B2: Ania uparcie przy oknie, autor akceptuje). Wideo D: auta z naprzeciwka znikały, a w części klipów auto jechało do tyłu. **D2 ✅** (kierunek jazdy w kategoriach kadru, pusty przeciwny pas). Plik `u19_droga_7.5s.mp4` (cięcie od 0,5 s).

## Zrobione ▶️ u18 (auto pod kamienicą)
Szczegóły i wszystkie prompty: `prompty/u18-auto-kamienica.md`.
- Gotowe obrazy: `u18-ulica-auto.jpg` (ulica, auto z podniesioną klapą, kartony „KUCHNIA” i „KSIĄŻKI”, materac w rulonie, bez ludzi), `u18-start.jpg` (Tomek przy lewym rogu + Ania z psem w bramie).
- Wideo D–D7: tablica wychodzi (z `auto.png`), ale Tomek przy obrocie do Ani kręci się jak bączek albo idzie od strony pasażera. Najlepszy kierunek marszu był w D2 i D5.
- E1 zadziałało, E2 ❌: NBP znów postawił Tomka z lewej strony bagażnika.
- **Decyzja autora (14.10):** zostaje `u18-start.jpg`. D8: Tomek klaskał, a piesek pobiegł do auta. **D9 ✅**: tylko trzask klapy, potem bezruch. Plik `u18_klapa_3.75s.mp4` (cięcie od 0,25 s).
- **Decyzja autora (14.10), następny krok:**
  1. Usunąć Tomka z `u18-start.jpg` (Ania i piesek zostają w bramie).
  2. Wkleić Tomka w nowej pozie: od razu twarzą do Ani (np. z prawej strony bagażnika, profil w lewo kadru, ręce na klapie), żeby w wideo nie musiał się obracać.
  3. Wideo D8 bez obrotów i bez chodzenia: trzask klapy na beat (ok. 0,9 s), Tomek podnosi wzrok znad klapy na Anię i kiwa głową, Ania się uśmiecha, piesek wstaje. Referencje: klatka startowa, `tomek-koszulka-kurtka.jpg`, `ania-paski-kardigan.jpg`, `piesek.png`, `auto.png`.

## Do decyzji 🧐
- Telewizor na regale w u14 zmienił kolor (autor akceptuje).
