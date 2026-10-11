# Status prac: teledysk „Zostań tu”

Ostatnia aktualizacja: 11.10.2026

## Zrobione ✅
- Skille: `cinedance`, `lira-image-prompts`, `acting` (w `.claude/skills/`)
- Utwór „Zostań tu” (Google), 3:02, około 128 BPM. Drop w 1:15, pauzy basu w 1:12 i 2:12
- Scenariusz: 34 ujęcia, zob. `scenariusz-zostan-tu.md`
- Gotowe ujęcia: 1 (u01-kamienica-swit), 2 (u02-ania-klucz-swit), 3 (u03-klucz-stol), 4 (u04-korytarz-drzwi, klip B, **nie przycinamy** (decyzja autora); u05 startuje już w pokoju: Tomek w progu białych drzwi z pudłem w rękach, a podniesienie pudła wypada w cięciu, decyzja 11.10), 5 (u05-pudlo-szafa, najlepszy klip z v3), 7 (u07-park), 9–12 (u09-12-wspollokator). Pliki w `prompty/`, nazwa = numer ujęcia.
- Referencje postaci: Ania, Tomek, @PIESEK (`postacie.md`)
- Referencje lokacji: salon (antracytowe ramy), dom z zewnątrz, kawalerka z nową butelkowo-zieloną rozkładaną kanapą mid-century (`lokacje.md`; stara wersja: `kawalerka-wersalka.jpg`). Sposób, który zadziałał: najpierw rekwizyt w NBP, potem edycja z dwiema referencjami w 16:9.
- Rekwizyt: biały bus z wysokim dachem, bez logo, przód i tył (`lokacje.md`, sekcja „Rekwizyty”)

## W toku ⏳
- Ujęcie 5 ✅ zamknięte (zob. `prompty/u05-pudlo-szafa.md`, lekcje na końcu). Referencja `tomek-gitara-pudlo.jpg` gotowa. Widok kawalerki od okna niezrobiony (opcjonalny, przyda się w ujęciach 13, 14 i 17).
- Inspiracje autora (4 zdjęcia małych mieszkań z internetu, 11.10): nowe bloki (PCV, niski sufit, panele), więc nie wgrywamy ich jako referencji do NBP, bo rozjechałyby kamienicę. Służą tylko za wzór kadru (zdjęcie z TV i turkusową kanapą = widok wzdłuż pokoju na okno, jak u nas).

## Do decyzji: logika scenariusza 🧐
1. **Ujęcie 6:** „jedzą na podłodze, bo stolik jest za mały”. Na referencji okrągły stolik z dwoma krzesłami wystarcza dla dwojga. Propozycja: na stoliku stoi pudło Tomka i leży gitara (ciąg dalszy u05), więc jedzą na dywanie.
2. **Ujęcie 13:** trzymiesięczny szczeniak nie przewróci wysokiej monstery w ciężkiej donicy. Propozycja: ryje w ziemi w donicy albo przewraca małą doniczkę z parapetu.
3. **Ujęcie 33:** śpią na materacu, ale jeśli zielona kanapa jedzie z nimi (ujęcie 16 i pomysł niżej), logiczniej będzie, gdy śpią na niej rozłożonej. Rozłożoną kanapę trzeba by wtedy zrobić jako osobny rekwizyt.
4. **Ujęcie 16:** „kręcone schody”. Klatka z u04 (lastryko, dwukolorowe ściany) pasuje do zwykłych schodów zabiegowych ze stalową balustradą. Bez znaczenia, dopóki nie zrobimy referencji klatki.

## Jak wrócić do pracy (nowy wątek) 🔁
- Najnowsza praca jest na gałęzi **`ccr-63159242-oid2q7`** (zbudowana na `ccr-a8de49cd-ag2gzs`; na `main` jej nie ma!).
- Przeczytaj: `CLAUDE.md`, `teledysk/README.md` (zasady 1–9 i podział pracy), `postacie.md`, `lokacje.md`, `scenariusz-zostan-tu.md` (z tekstem piosenki i czasami), `lekcje-hell-grind.md` (lekcje twórców „Hell Grind”), ten plik.
- Autor generuje we **Flow**: obrazy w Nano Banana Pro, wideo w Omni 1.1 Flash (8 s pod ujęcia 7,5 s). Claude pisze prompty, wycina klatki z wideo (ffmpeg), ocenia wyniki i przycina klipy do taktu.
- Gotowe przycięte klipy (u01, u02) są u autora. Wideo nie trzymamy w repo.
- **Umowa z autorem:** prompty wideo ściśle według skilla `cinedance` (wczytać skill). Przed odejściem od szablonu pytamy, a o niezgodnościach z zasadami mówimy autorowi wprost (README, sekcja „Umowa o szablonie”).
- Lekcje: bohaterowie nie mówią; gdy model uparcie zmienia obiekt (okno, drzwi, klamka), poprawiamy klatkę startową w NBP zamiast walczyć tekstem; przy każdym ujęciu: cały prompt + referencje + ustawienia.

## Następne kroki ▶️
- Pomysł: zielona kanapa jako jedyny mebel, który przetrwał przeprowadzkę. Stoi potem w salonie nowego domu (outro: śpią na niej z psem zamiast na materacu). Do decyzji.
- Prompty wideo do 29 nowych ujęć. Ujęcia 1–3 ✅. Ujęcie 4 ✅ (klip B). Ujęcie 5 ✅. Następne: ujęcie 6 (najpierw decyzja o logice stolika, zob. „Do decyzji”).
