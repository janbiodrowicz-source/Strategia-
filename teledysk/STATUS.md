# Status prac: teledysk „Zostań tu”

Ostatnia aktualizacja: 12.10.2026 (wieczór)

## Zrobione ✅
- Skille: `cinedance`, `lira-image-prompts`, `acting` (w `.claude/skills/`)
- Utwór „Zostań tu” (Google), 3:02, około 128 BPM. Drop w 1:15, pauzy basu w 1:12 i 2:12
- Scenariusz: 34 ujęcia, zob. `scenariusz-zostan-tu.md`
- Gotowe ujęcia: 1 (u01-kamienica-swit), 2 (u02-ania-klucz-swit), 3 (u03-klucz-stol, v2 z 12.10: nowa kuchnia rano, bez kwestii, cięcie 0,5–8,0 s), 4 (u04-korytarz-drzwi, klip B, **nie przycinamy** (decyzja autora); u05 startuje już w pokoju: Tomek w progu białych drzwi z pudłem w rękach, a podniesienie pudła wypada w cięciu, decyzja 11.10), 5 (u05-pudlo-szafa, najlepszy klip z v3), 6 (u06-kolacja-kuchnia), 7 (u07-park, v5 z 12.10: nowe stroje, bez kwestii), 8 (u08-plakat-adopcje, v2 z 12.10: słup wjeżdża w kadr, cięcie 0,0–7,5 s), 9–12 (u09-12-wspollokator). Pliki w `prompty/`, nazwa = numer ujęcia.
- Referencje postaci: Ania, Tomek, @PIESEK (`postacie.md`)
- Referencje lokacji: salon (antracytowe ramy), dom z zewnątrz, kawalerka z nową butelkowo-zieloną rozkładaną kanapą mid-century (`lokacje.md`; stara wersja: `kawalerka-wersalka.jpg`). Sposób, który zadziałał: najpierw rekwizyt w NBP, potem edycja z dwiema referencjami w 16:9.
- Rekwizyt: biały bus z wysokim dachem, bez logo, przód i tył (`lokacje.md`, sekcja „Rekwizyty”)

## W toku ⏳
- **Ujęcie 13 (przeciąganie skarpetki):** krok 1 = klatka startowa w NBP z klatki u05 (`referencje/u13-baza-u05.jpg`): Ania na kanapie, Tomek na dywanie ze szczeniakiem i skarpetką, drzwi zamknięte, futerał gitary w rogu za monsterą. Prompt w `prompty/u13-skarpetka.md`. Stroje podstawowe (`ania.png`, `tomek.png`). Klatka startowa ✅ (wieczór, lampa sufitowa, stroje: `ania-golf.jpg`, `tomek-sweter.jpg`). Wideo ✅ przycięte 0,25–4,0 s → `u13_skarpetka_3.75s.mp4`, oś 1:15,0–1:18,75. **Ujęcie 13 zamknięte.** 
- **Ujęcie 14 (laptop i dom):** klatka startowa w NBP, krok A (pokój: krzesła przed stolikiem, laptop z `dom.png`, firanki, noc). Zob. `prompty/u14-laptop-dom.md`.
- Ujęcie 5 ✅ zamknięte (zob. `prompty/u05-pudlo-szafa.md`, lekcje na końcu). Referencja `tomek-gitara-pudlo.jpg` gotowa. Odczytanie: to ostatnie pudło Tomka, a jego ubrania już wiszą w szafie Ani. Widok kawalerki od okna niezrobiony (opcjonalny, przyda się w ujęciach 13, 14 i 17).
- Inspiracje autora (4 zdjęcia małych mieszkań z internetu, 11.10): nowe bloki (PCV, niski sufit, panele), więc nie wgrywamy ich jako referencji do NBP, bo rozjechałyby kamienicę. Służą tylko za wzór kadru (zdjęcie z TV i turkusową kanapą = widok wzdłuż pokoju na okno, jak u nas).

## Do decyzji: logika scenariusza 🧐
1. ✅ **Ujęcie 6 (rozstrzygnięte 11.10):** kolacja w kuchni bez psa. Pies z miską pod stołem idzie do ujęcia 17.
2. ✅ **Ujęcie 13 (rozstrzygnięte 12.10):** bez doniczki. Scenka „przeciąganie skarpetki”: Tomek na podłodze przeciąga się ze szczeniakiem skarpetką, puszcza, piesek przewraca się na plecy, Ania śmieje się z zielonej kanapy. Kamera nisko (84°), 4 s. Odrzucone warianty: pobudka na kanapie, złodziej buta (pościg), zoomies.
3. **Ujęcie 33:** śpią na materacu, ale jeśli zielona kanapa jedzie z nimi (ujęcie 16 i pomysł niżej), logiczniej będzie, gdy śpią na niej rozłożonej. Rozłożoną kanapę trzeba by wtedy zrobić jako osobny rekwizyt.
4. **Ujęcie 16:** „kręcone schody”. Klatka z u04 (lastryko, dwukolorowe ściany) pasuje do zwykłych schodów zabiegowych ze stalową balustradą. Bez znaczenia, dopóki nie zrobimy referencji klatki.

## Jak wrócić do pracy (nowy wątek) 🔁
- Najnowsza praca jest na gałęzi **`ccr-2f0602d0-vubnss`** (kontynuacja `ccr-63159242-oid2q7`; na `main` jej nie ma!).
- Przeczytaj: `CLAUDE.md`, `teledysk/README.md` (zasady 1–9 i podział pracy), `postacie.md`, `lokacje.md`, `scenariusz-zostan-tu.md` (z tekstem piosenki i czasami), `lekcje-hell-grind.md` (lekcje twórców „Hell Grind”), ten plik.
- Autor generuje we **Flow**: obrazy w Nano Banana Pro, wideo w Omni 1.1 Flash (8 s pod ujęcia 7,5 s). Claude pisze prompty, wycina klatki z wideo (ffmpeg), ocenia wyniki i przycina klipy do taktu.
- **Przycinanie robi Claude (umowa 12.10):** autor wrzuca każdy gotowy klip do wątku, Claude wybiera 7,5 s, usuwa dźwięk i odsyła plik (zob. README). Gotowe przycięte klipy (u01, u02, u03) są u autora. Wideo nie trzymamy w repo.
- **Umowa z autorem:** prompty wideo ściśle według skilla `cinedance` (wczytać skill). Przed odejściem od szablonu pytamy, a o niezgodnościach z zasadami mówimy autorowi wprost (README, sekcja „Umowa o szablonie”).
- Lekcje: bohaterowie nie mówią; gdy model uparcie zmienia obiekt (okno, drzwi, klamka), poprawiamy klatkę startową w NBP zamiast walczyć tekstem; przy każdym ujęciu: cały prompt + referencje + ustawienia.

## Następne kroki ▶️
- Pomysł: zielona kanapa jako jedyny mebel, który przetrwał przeprowadzkę. Stoi potem w salonie nowego domu (outro: śpią na niej z psem zamiast na materacu). Do decyzji.
- Prompty wideo do 29 nowych ujęć. Ujęcia 1–3 ✅. Ujęcie 4 ✅ (klip B). Ujęcia 5 i 6 ✅. Ujęcie 7 ✅ (v5: bez kwestii, bez klucza, nowe stroje do parku, przycięte 0,5–8,0 s; zob. `prompty/u07-park.md`). Ujęcie 8 ✅ (v2: plakat „ADOPCJE”, słup wjeżdża w kadr, przycięte 0,0–7,5 s). u09-12 v3 ✅ (bez dialogu, stroje z parku, rozcięte na 3 pliki: 3,5 + 2,958 + 3,542 s). Ujęcie 11 ✅ (lizanie od ostatniej klatki u10, 5,0 s: 1:06,458–1:11,458). **Akt 1 kompletny. Następne: prompt do ujęcia 13 (DROP, przeciąganie skarpetki, 4 s; wczytać `cinedance`, referencje: `ania.png`/`tomek.png` w strojach domowych? do ustalenia z autorem, piesek jak na targu: puszysty morelowo-złoty)**. Kolejność na targu (decyzja autora): u10 → u12 → u11 → DROP. Oś akt 1 zgodna w CapCucie (12.10): u05 = 7,0 s, u06 = 7,5 s, koniec targu = 1:15,0 ✅. Do sprawdzenia u autora: przesunięcie muzyki o 0,29 s w lewo.
- **Montaż (12.10):** każde ujęcie tniemy do 7,5 s (4 takty przy 128 BPM). u04 zostaje 8 s (decyzja autora), więc u05 tniemy do **7,0 s**, żeby u06 zaczynało się dokładnie w 0:37,5. Claude może przyciąć klipy, jeśli autor je prześle.
