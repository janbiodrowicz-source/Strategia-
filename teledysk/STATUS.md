# Status prac: teledysk „Zostań tu”

Ostatnia aktualizacja: 10.10.2026

## Zrobione ✅
- Skille: `cinedance`, `lira-image-prompts`, `acting` (w `.claude/skills/`)
- Utwór „Zostań tu” (Google), 3:02, około 128 BPM. Drop w 1:15, pauzy basu w 1:12 i 2:12
- Scenariusz: 34 ujęcia, zob. `scenariusz-zostan-tu.md`
- Gotowe ujęcia: 1 (u01-kamienica-swit), 2 (u02-ania-klucz-swit), 3 (u03-klucz-stol), 7 (u07-park), 9–12 (u09-12-wspollokator). Pliki w `prompty/`, nazwa = numer ujęcia.
- Referencje postaci: Ania, Tomek, @PIESEK (`postacie.md`)
- Referencje lokacji: salon (antracytowe ramy), dom z zewnątrz, kawalerka z nową butelkowo-zieloną rozkładaną kanapą mid-century (`lokacje.md`; stara wersja: `kawalerka-wersalka.jpg`). Sposób, który zadziałał: najpierw rekwizyt w NBP, potem edycja z dwiema referencjami w 16:9.
- Rekwizyt: biały bus z wysokim dachem, bez logo, przód i tył (`lokacje.md`, sekcja „Rekwizyty”)

## W toku ⏳
- **Ujęcie 4 (drzwi, 0:22,5–0:30):** 7 prób, historia i wnioski w `prompty/u04-korytarz-drzwi.md`. Model myli zamek z klamką i zmienia drzwi, więc idziemy przez klatkę startową z Nano Banana Pro. Ostatnio (v7) NBP przekadrował obraz i zgubił Anię. Następny krok: pomysły (a)–(c) na końcu pliku.

## Jak wrócić do pracy (nowy wątek) 🔁
- Cała praca jest na gałęzi **`ccr-a8de49cd-ag2gzs`** (na `main` jej nie ma!).
- Przeczytaj: `CLAUDE.md`, `teledysk/README.md` (zasady 1–9 i podział pracy), `postacie.md`, `lokacje.md`, `scenariusz-zostan-tu.md` (z tekstem piosenki i czasami), ten plik.
- Autor generuje we **Flow**: obrazy w Nano Banana Pro, wideo w Omni 1.1 Flash (8 s pod ujęcia 7,5 s). Claude pisze prompty, wycina klatki z wideo (ffmpeg), ocenia wyniki i przycina klipy do taktu.
- Gotowe przycięte klipy (u01, u02) są u autora. Wideo nie trzymamy w repo.
- Lekcje: bohaterowie nie mówią; gdy model uparcie zmienia obiekt (okno, drzwi, klamka), poprawiamy klatkę startową w NBP zamiast walczyć tekstem; przy każdym ujęciu: cały prompt + referencje + ustawienia.

## Następne kroki ▶️
- Pomysł: zielona kanapa jako jedyny mebel, który przetrwał przeprowadzkę. Stoi potem w salonie nowego domu (outro: śpią na niej z psem zamiast na materacu). Do decyzji.
- Prompty wideo do 29 nowych ujęć. Ujęcia 1–3 ✅. Ujęcie 4: prompt gotowy (`prompty/u04-korytarz-drzwi.md`), czeka na generację.
