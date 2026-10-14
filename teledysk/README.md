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
10. **Animacja od klatki startowej w Omni Flash: najpierw krótki prompt prozą.** Trzy akapity: „continuing exactly from this starting image…”, jedna prosta akcja ze spokojnym tempem, lista tego, co ma zostać bez zmian. Długi prompt z sekcjami zostawiamy na generację bez klatki.

## Umowa o szablonie (11.10)

- **Każdy prompt wideo piszemy ściśle według skilla `cinedance`**, a obrazy według `lira-image-prompts`. Claude wczytuje skill przy każdym nowym ujęciu.
- Od szablonu odchodzimy tylko wtedy, gdy coś nie wyjdzie, i **Claude najpierw pyta autora**, zanim cokolwiek zmieni.
- Jeśli autor chce zmiany niezgodnej ze skillem albo z zasadami powyżej, **Claude o tym informuje** (która zasada i dlaczego), a decyzja należy do autora.
- Zasada 10 (krótka proza dla Omni Flash) to taki wyjątek: używamy jej tylko po uzgodnieniu.

## Rozmowa a polecenie (umowa z 13.10)

- **Domyślnie rozmawiamy.** Gdy autor pisze „może…”, „a gdyby…”, „mam pomysł”, „co sądzisz?”, Claude odpowiada tylko opinią (za, przeciw, ryzyka, ewentualnie pytanie). Nie zmienia plików, nie pisze promptów, nic nie wypycha.
- **Do roboty dopiero po wyraźnym sygnale:** „robimy”, „zapisz”, „daj prompt”, „zgoda” albo jednoznaczne polecenie. Wtedy zmiany w scenariuszu, STATUS, plikach i prompty.
- **Przy wątpliwości Claude pyta jednym zdaniem** na końcu odpowiedzi: „Zapisać to jako decyzję i robimy prompt?”.
- **Przełącznik:** wiadomość zaczynająca się od „💭” albo „burza:” oznacza na pewno tylko rozmowę.

## Podział pracy

Obrazy (Nano Banana Pro) i wideo (Omni 1.1 Flash) generuje autor we **Flow**, wklejając prompty. Claude pisze prompty, wycina klatki z wideo, ocenia wyniki i przycina klipy do taktu.

**Przycinanie (umowa z 12.10):** autor wrzuca do wątku każdy gotowy klip, a Claude go przycina: ogląda klip klatka po klatce, wybiera najlepsze 7,5 s (albo 3,75 s), tak żeby kluczowy moment się zmieścił, usuwa dźwięk i odsyła plik z czasem na osi. Gotowe pliki trafiają do `teledysk/wyniki/` (poza gitem), a notatka z cięciem do pliku ujęcia w `prompty/`. API Google świadomie nie podłączamy, żeby nie płacić drugi raz. „NBP” w notatkach i skillach = Nano Banana Pro.

## Flow: jak działają referencje (od autora, 14.10)

- **Omni 1.1 Flash: pierwsze wrzucone zdjęcie Flow traktuje jako klatkę startową.** Kolejność referencji w promptach wideo: najpierw klatka startowa, potem planszki postaci (`@TOMEK`, `@ANIA`, `@PIESEK`) i rekwizyty.
- **Maksymalnie 10 zdjęć na jedno generowanie.** Przy podawaniu listy referencji pilnujemy limitu.

## Zawartość

- [`postacie.md`](postacie.md): Ania i Tomek, opisy do promptów i głosy
- [`lokacje.md`](lokacje.md): lokacje z referencjami (salon, dom, kawalerka)
- [`referencje/`](referencje/): planszki postaci i zdjęcia lokacji
- [`prompty/`](prompty/): prompty z notatkami, co wyszło. Nazwa pliku = numer ujęcia ze scenariusza (`u01-…`, `u09-12-…`)
- [`lekcje-hell-grind.md`](lekcje-hell-grind.md): lekcje z filmu o przebudowie sceny walki z „Hell Grind” (seria x4, liczby zamiast przymiotników, bez negatywnych promptów, twarde cięcia z obiektywami)
- [`STATUS.md`](STATUS.md): co jest zrobione, co w toku i co dalej
- [`scenariusz-zostan-tu.md`](scenariusz-zostan-tu.md): scenariusz teledysku „Zostań tu” (34 ujęcia pod mapę energii utworu)
