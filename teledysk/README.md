# Teledysk: pracownia promptów wideo AI

Tu są notatki do generowania wideo AI: zasady pracy, postacie i prompty, które zadziałały.
Skille z workflow HELL GRIND leżą w `.claude/skills/`:

| Skill | Do czego |
|---|---|
| `cinedance` | Prompty wideo (Seedance 2.0 / Higgsfield; działają też we Flow) |
| `lira-image-prompts` | Prompty obrazów: postacie, lokacje, rekwizyty, poprawki kadrów |
| `acting` | Gra aktorska: profile postaci, reakcje, oczy, głos |

## Nasze zasady (ustalone w praktyce)

1. **Flow: maksymalnie 10 sekund na generację.** Każdy prompt rozpisujemy na 10 s.
2. **Dialogi zawsze po polsku.** Opisy głosu (voice prompt) piszemy po angielsku, bo opisują brzmienie, nie język.
3. **Napisy w kadrze od razu w prompcie.** Każdy szyld i baner ma dokładny tekst w cudzysłowie oraz font, wagę i kolor. Pozostałe szyldy opisujemy jako „only painted pictures, no lettering”. Bez tego model pisze bełkot.
4. **Kwestia zaczyna się od razu:** „line begins within the first 0.3 seconds of the shot”. Inaczej model ją utnie.
5. **Planowanie czasu:** ujęcie z tłumem czy otoczeniem może być krótkie, bo widać je od pierwszej klatki. Najwięcej czasu dostaje reakcja.
6. **Jedna zmiana na iterację.** Poprawiamy jedną linijkę naraz, żeby wiedzieć, co zadziałało.
7. **Najpierw assety:** postacie, lokacje i rekwizyty zablokowane przed pierwszym ujęciem.
8. **Obiektyw w stopniach, osobny dla każdego ujęcia.** Teleobiektyw (18°) najlepiej działa na zbliżeniach twarzy. W szerszym planie model ma tendencję do zwykłego kadru.

## Zawartość

- [`postacie.md`](postacie.md): Ania i Tomek, opisy do promptów i głosy
- [`referencje/`](referencje/): planszki postaci (przód, tył, portret)
- [`prompty/`](prompty/): sprawdzone prompty z notatkami, co wyszło
