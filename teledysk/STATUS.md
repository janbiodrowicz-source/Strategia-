# Status prac: teledysk „Zostań tu”

Ostatnia aktualizacja: 17.10.2026

## Jak wrócić do pracy (nowy wątek) 🔁
- Najnowsza praca jest na gałęzi **`ccr-8a6ed68e-6dmahk`** (kontynuacja `ccr-baa341b7-hv20hr` i `ccr-2f0602d0-vubnss`; na `main` jej nie ma!).
- Przeczytaj: `CLAUDE.md`, `teledysk/README.md` (zasady, **umowa „rozmowa a polecenie”**, jak działają referencje we Flow), `postacie.md`, `lokacje.md` (nowy rekwizyt: żółte auto), `scenariusz-zostan-tu.md`, ten plik oraz pliki ostatnich ujęć: `prompty/u13-skarpetka.md`, `u16-pozegnanie-kawalerka.md`, `u18-auto-kamienica.md`, `u19-droga-piesek.md`, `u20-podjazd.md`, `u21-klucz.md`, `u22-ogrod.md`. W `postacie.md` jest **zdanie SIZE psa** i planszka skali `referencje/piesek-skala.jpg`: obie idą do każdego promptu z psem.
- Autor generuje we **Flow**: obrazy w Nano Banana Pro (NBP) (od 17.10 także w aplikacji **Lovable**, dobrze trzyma kadr przy dodawaniu postaci), wideo w Omni 1.1 Flash (4 s pod 3,75 s, 8 s pod 7,5 s, 720p). Pierwsze zdjęcie = klatka startowa, maks. 10 zdjęć. Claude pisze prompty, ocenia wyniki (arkusze klatek z ffmpeg), przycina klipy i odsyła pliki.
- **Przycinanie robi Claude:** wybór fragmentu, bez dźwięku, zapis do `teledysk/wyniki/` (poza gitem), wysyłka pliku. Gdy trzeba wyciąć początek, a brakuje długości: zwolnienie do ok. 80–85% z `minterpolate` wygląda naturalnie (u15, u16). **Uwaga (15.10):** minterpolate gubi cienkie detale (lampa w u16 znikała). Przy cienkich obiektach w kadrze zwalniamy przez powielanie klatek albo zwalniamy tylko spokojny fragment.
- **Umowa z autorem:** prompty wideo według `cinedance` (+ `acting`), obrazy według `lira-image-prompts`. **Domyślnie rozmawiamy; pliki i prompty dopiero po wyraźnym „robimy / zapisz / daj prompt”.** O niezgodnościach mówimy wprost.

## NASTĘPNY KROK (nowy wątek, od 17.10 wieczorem) 👉
1. **u25: HARD CUT, Tomek wpina wtyczkę i girlanda żarówek rozbłyska pod sufitem** (2:15–2:18,75, 3,75 s, 47°, start refrenu 2). Zacząć od rozmowy o kadrze (girlandy jeszcze nie mamy w referencjach). **u23 ✅** `wyniki/u23_salon_7.5s.mp4` → 2:00–2:07,5, **u24 ✅** `wyniki/u24_pizza_7.5s.mp4` → 2:07,5–2:15 (bez zachodu: ciepłe popołudnie, piesek trochę za duży).
2. **Do CapCuta (jeśli jeszcze nie):** u20 `wyniki/u20_podjazd_3.75s.mp4` → 1:41,25–1:45; **u21** `wyniki/u21_klucz_v2_7.5s.mp4` → 1:45–1:52,5; **u22** `wyniki/u22_ogrod_7.5s.mp4` → 1:52,5–2:00 (oba 1080p); u18 v2 → 1:30–1:33,75.
3. **Niebo w u22** jest niebieskie (popołudnie), a w u21 złote. Jeśli razi w montażu, to korekta kolorów w CapCucie.
4. Stare sprawy: u14 (piesek trochę za duży), u16 (wybór wersji A/B).

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
   - **wyraźna twarz = większa postać na klatce startowej:** kadrujemy obraz 2k przed animacją (ffmpeg), a postać stawiamy bliżej kamery; zoom gotowego klipu 720p nie dodaje ostrości (u18, 15.10),
   - **materac w rulonie:** opis „płaski koniec ze spiralą jak pień” daje rurki; działa wzór `materac-rulon-paleta-lustro.png` i opis „two or three thick, chunky, soft turns” (u18 F1c),
   - NBP przy dodawaniu postaci potrafi zepsuć wcześniej poprawione napisy, więc sprawdzamy je po każdym przejściu,
   - **głębia wnętrza auta** (tylna kanapa czy bagażnik) wychodzi w **GPT Image 2**, NBP uparcie kładzie rzeczy przy tylnej szybie (u20, 17.10),
   - **referencja „aktora” najpierw:** auto z rodziną w środku robimy osobno na szarym tle (`auto-z-para-tyl.png`), potem wstawiamy do sceny; kto gdzie siedzi: kotwica „ręce na kierownicy” i strony opisane osobno dla widoku z przodu i z tyłu (lustro),
   - koniec rulonu widziany idealnie od tyłu zawsze jest kołem; materac robimy wg `materac-rulon-paleta(-lustro)` z grubymi zwojami,
   - **nie wspominamy w prompcie wideo o akcji, która ma się nie wydarzyć** (np. „drzwi mogą się otworzyć”), bo model ją dopisuje; piszemy wprost „all doors stay closed”,
   - **dystans jazdy w długościach auta + opis obrazu końcowego** („about one full car length”, „gate posts stand fully free… then the rear bumper”); metry („half a metre beyond”) i „slowly / just far enough” sprawiają, że auto staje za wcześnie (u20 C4→C5),
   - **baza z oryginału:** kadr bliżej (np. same drzwi w u21) wycinamy ffmpeg z referencji w pełnej rozdzielczości (`u20-dom-plot.jpg`, 2752 px), a nie z już powiększonej bazy; NBP/Lovable i tak przerysuje w 2k,
   - **przenoszenie postaci nie działa** (też w Lovable): para stała na stopniu, „przesuń na podest” nie wyszło. Działa nowy czat od czystej bazy z opisem, gdzie stoją stopy („heels almost touch the door, the step edge visible in front of their toes”) i z blokadą kadru („do not zoom out”) (u21),
   - **klatka startowa = stan przed akcją** dotyczy też rekwizytu: klucz już w opuszczonej dłoni, a nie wyjmowany z kieszeni (u21),
   - **wszystkie postacie w jednym przejściu NBP** działają w szerokim kadrze, gdzie twarze są małe; rozpoznaje się je po strojach (u22),
   - **zmiana widoku lokacji z dwóch referencji** (front `dom.png` + wnętrze `salon.jpg`) dała spójny tył domu w NBP; kierunek słońca ustalamy z obu zdjęć (u22),
   - **obrót postaci w Omni działa**, gdy jest jeden, wolny, w miejscu, ma 3–4 s w ACTION TIMING i kończy się przodem do kamery (u23); psuły się obroty przy chodzeniu,
   - **wideo prosto z referencji** (Lovable, bez klatki startowej) daje dobrą treść, ale model sam wybiera kadr i porę dnia (u24: przepadły 18° i zachód); gdy liczy się kadr lub światło, robimy klatkę startową,
   - napisy z polskimi znakami („KSIĄŻKI”) i tablica („WA 12345”) wychodzą, gdy są w prompcie i w referencji (`auto.png`).

## Zrobione ✅
- Akt 1 (u01–u12) zmontowany w CapCucie (oś do 1:15,0).
- **u13 skarpetka** ✅ 1:15,0–1:18,75 (v2 z 15.10: mały piesek, skarpeta argyle, sam siad; `u13_skarpetka_v2_3.75s.mp4`). **u14 laptop i dom** ✅ 1:18,75–1:22,5. **u15 karton „KUCHNIA”** ✅ 1:22,5–1:26,25.
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
| 20 ✅ | 1:41,25–1:45 | Przedmieścia, żółte auto wjeżdża przez bramę i staje | 3,75 s |
| 21 ✅ | 1:45–1:52,5 | Lustro klucza: Tomek wkłada Ani klucz do dłoni przed drzwiami | 7,5 s |
| 22 ✅ | 1:52,5–2:00 | Ogród za domem: piesek pędzi na kamerę, Ania go goni, Tomek na tarasie | 7,5 s |
| 23 ✅ | 2:00–2:07,5 | Pusty salon w słońcu: piruet Ani, Tomek odkłada pudło „SYPIALNIA” | 7,5 s |
| 24 ✅ | 2:07,5–2:15 | Pizza z pudełka na podłodze salonu, piesek je ze swojej miski | 7,5 s |

## Zrobione ✅ u21 (klucz) i u22 (ogród), 17.10
- **u21:** szczegóły w `prompty/u21-klucz.md`. Baza = kadr drzwi wycięty z `u20-dom-plot.jpg`; klamka i zamki oraz para dodane w Lovable. Klatka `referencje/u21-start.png`, nowy srebrny klucz `referencje/klucz-dom.jpg` (inny niż mosiężny z aktu 1, w prompcie bez logo). Tylko przekazanie klucza, bez otwierania drzwi. Klip v2 `wyniki/u21_klucz_v2_7.5s.mp4`.
- **u22:** szczegóły w `prompty/u22-ogrod.md`. Ogród **za domem** (nowa lokacja z `dom.png` + `salon.jpg`, plik `referencje/u22-ogrod.jpg` jest u autora). Tomek bez kartonu, ręce w kieszeniach. Klip `wyniki/u22_ogrod_7.5s.mp4`.

## Zrobione ✅ u20 (podjazd)
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
