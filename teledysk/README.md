# Teledysk: pracownia promptów wideo AI

Tu są notatki do generowania wideo AI: zasady pracy, postacie i prompty, które zadziałały.
Skille z workflow HELL GRIND leżą w `.claude/skills/`:

| Skill | Do czego |
|---|---|
| `cinedance` | Prompty wideo (Seedance 2.0 / Higgsfield; działają też we Flow) |
| `lira-image-prompts` | Prompty obrazów: postacie, lokacje, rekwizyty, poprawki kadrów |
| `acting` | Gra aktorska: profile postaci, reakcje, oczy, głos |

## Nasze zasady (ustalone w praktyce)

1. **Długość generacji = długość w montażu + mały zapas.** Ujęcie 7,5 s generujemy jako **8 s**, ujęcie 3,75 s jako **4 s**, a dwa ujęcia po 3,75 s z jednej sceny jako 8 s przecięte na pół. Prompt (ACTION TIMING) rozpisujemy na tę długość, a kluczowy moment musi się skończyć przed cięciem. Maksimum to 10 s (Flow, Omni).
2. **W teledysku bohaterowie nie mówią.** Kwestii nie ma, usta są zamknięte, dozwolony jest śmiech i oddech, a AUDIO opisuje tylko otoczenie. Historię niesie gra aktorska i tekst piosenki. (Gdyby kiedyś dialog był potrzebny poza teledyskiem: zawsze po polsku, a opis głosu po angielsku.)
3. **Napisy w kadrze od razu w prompcie.** Każdy szyld i baner ma dokładny tekst w cudzysłowie oraz font, wagę i kolor. Pozostałe szyldy opisujemy jako „only painted pictures, no lettering”. Bez tego model pisze bełkot.
4. **Kwestia zaczyna się od razu:** „line begins within the first 0.3 seconds of the shot”. Inaczej model ją utnie.
5. **Planowanie czasu:** ujęcie z tłumem czy otoczeniem może być krótkie, bo widać je od pierwszej klatki. Najwięcej czasu dostaje reakcja.
6. **Jedna zmiana na iterację.** Poprawiamy jedną linijkę naraz, żeby wiedzieć, co zadziałało.
7. **Najpierw assety:** postacie, lokacje i rekwizyty zablokowane przed pierwszym ujęciem.
8. **Obiektyw w stopniach, osobny dla każdego ujęcia.** Teleobiektyw (18°) najlepiej działa na zbliżeniach twarzy. W szerszym planie model ma tendencję do zwykłego kadru.
9. **Każde ujęcie = cały prompt + lista referencji.** Do każdego ujęcia podajemy prompt w całości (do skopiowania) i listę zdjęć referencyjnych: tag, plik i co jest w nim kluczowe. Do tego ustawienia generatora.

## Zawartość

- [`postacie.md`](postacie.md): Ania i Tomek, opisy do promptów i głosy
- [`lokacje.md`](lokacje.md): lokacje z referencjami (salon, dom, kawalerka)
- [`referencje/`](referencje/): planszki postaci i zdjęcia lokacji
- [`prompty/`](prompty/): prompty z notatkami, co wyszło. Nazwa pliku = numer ujęcia ze scenariusza (`u01-…`, `u09-12-…`)
- [`STATUS.md`](STATUS.md): co jest zrobione, co w toku i co dalej
- [`scenariusz-zostan-tu.md`](scenariusz-zostan-tu.md): scenariusz teledysku „Zostań tu” (34 ujęcia pod mapę energii utworu)
