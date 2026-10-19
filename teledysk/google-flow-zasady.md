# Google Flow: zasady

Zasady sprawdzone w praktyce w Google Flow (Omni 1.1 Flash i modele z natywnym dźwiękiem). Dotyczą każdego projektu, nie tylko teledysku. Źródło: test „Nie otwieraj drzwi” (19.10.2026, 4 ujęcia, dialog po polsku) i ujęcia u13–u24 teledysku.

## 1. Ostatnia klatka jako klatka startowa następnego ujęcia ⭐ (najważniejsze)

**Zasada:** jeśli klatką startową ujęcia jest ostatnia klatka poprzedniego ujęcia, to **zawsze** na samym początku promptu piszemy: kontynuujemy ujęcie, pierwsze zdjęcie to ostatnia klatka poprzedniego ujęcia, zacznij dokładnie od tego miejsca, to bardzo ważne.

Blok do wklejenia jako **pierwszy** w prompcie (przed SCENE CONTEXT):

```text
START FRAME LOCK — MOST IMPORTANT
We are continuing the previous shot. Image 1 is the last frame of the previous shot. This video is its direct continuation and must begin exactly on image 1, from that precise moment and that precise camera position. This is very important. The first frame of the video is identical to image 1: the same framing, camera position, height and lens, the same positions, poses and facial expressions of all people, the same faces, hair and clothes, the same location, light and colours. Nothing is recomposed, re-lit, re-staged or re-imagined. Do not start with a new angle, a wider or closer framing, or any transition. Images 2, 3 and 4 are identity references only (faces, hair, clothes); they are not starting frames, and their studio backgrounds and poses are never used.
```

Do tego w tym samym prompcie:
- **FIRST FRAME AND SPATIAL BLOCKING** opisuje dokładnie to, co widać na image 1: kto gdzie stoi, w którą stronę patrzy, mina, co jest w tle. Obraz i tekst muszą się zgadzać.
- W ACTIVE REFERENCES przy każdej postaci: „100% matches image N and image 1”.
- W CAMERA: „Starting from the exact camera position of image 1”.
- W LIGHTING: „Exactly the light of image 1, unchanged for the whole shot”.
- W POSITIVE CONSTRAINTS: „The same people as in image 1. The colour grade matches image 1.”
- W interfejsie Flow image 1 wgrywamy **na pierwsze miejsce** (jako klatkę startową / pierwszą klatkę, jeśli jest takie pole).

**Wynik w teście:** przejścia ujęć 1→2 i 2→3 były tak płynne, że detektor cięć ich nie wykrył.

## 2. Kamera: ruch tylko do ok. 5 s, potem stoi ⭐

W klipie 8 s ruch kamery (najazd, tracking) piszemy **tylko od 0:00 do 0:05.0**, a od 0:05.0 do 0:08.0 kamera stoi:

```text
... only from 0:00 to 0:05.0; from 0:05.0 to 0:08.0 the camera holds completely still. The camera never pans, never rotates, never drifts sideways and never zooms.
```

Dlaczego: przy dłuższym ruchu Flow w drugiej połowie klipu sam dokłada obrót kamery („zwiedza” lokację: drzwi znikały z kadru, postać chowała się za inną). Dodatkowy zysk: najdłuższa kwestia dialogu wypada na nieruchomym kadrze, więc synchronizacja ust jest lepsza.

Ruch opisujemy też **obrazem końcowym** („End frame: X at the left edge, Y still fully visible between them, the door behind him”), a nie metrami.

## 3. Sprawdź ostatnią klatkę, zanim jej użyjesz

- Zanim ostatnia klatka pójdzie dalej, oglądamy ją: czy wszystkie ważne postacie i rekwizyty są widoczne i niezasłonięte, czy kamera nie skręciła.
- Jeśli koniec klipu jest zepsuty, **przycinamy klip** do ostatniego dobrego momentu i bierzemy ostatnią klatkę **przyciętej** wersji.
- Ujęcie zaczynające się od **nowego ustawienia kamery** (cięcie, np. zbliżenie innej postaci) nie bierze ostatniej klatki poprzedniego ujęcia. Klatkę startową wycinamy z wcześniejszego kadru, w którym ta postać jest dobrze widoczna (ffmpeg crop). Powiększenie z 720p jest trochę miękkie, ale w ruchu przechodzi. Wtedy w bloku START FRAME LOCK piszemy „Image 1 is the exact starting frame of this shot” zamiast „last frame of the previous shot”.

## 4. Pierwsze ujęcie i referencje

- W Omni we Flow **pierwsze zdjęcie = klatka startowa**. Pusta lokacja na pierwszym miejscu daje start od pustego kadru.
- Pierwsze ujęcie sekwencji bez gotowej klatki: tryb samych referencji (lokacja + planszki postaci), a w prompcie „From the very first frame all three are already in place, no empty frame”.
- Planszki postaci (szare studio, przód/tył/portret) zawsze opisujemy jako „identity references only”.

## 5. Ruch postaci

- Jedna prosta akcja na ujęcie. Chodzenie i obroty całego ciała wychodzą źle; zamiast „odwraca się” piszemy „turns only his head”.
- Paralaksa przy trackingu bocznym: postać w tle chowa się za tą z pierwszego planu, do której jest bliżej. Tracking prowadzimy **w stronę większej szczeliny** między postaciami.

## 6. Dialog (natywny dźwięk)

- Każda kwestia w ACTION TIMING z dokładnym czasem i dosłownym tekstem w cudzysłowie: `@ADRIAN says in Polish, tense: "..."`.
- Głos każdej mówiącej postaci w ACTIVE REFERENCES (`Voice @X: "..."`).
- W AUDIO i POSITIVE CONSTRAINTS kolejność mówców: „@WIKTOR, then @ADRIAN, then @WIKTOR; voices never overlap”, „Only the scripted lines are spoken. Lips are still when not speaking.”
- Kontrola po generacji: obwiednia głośności ścieżki (ffmpeg astats) pokazuje, czy mowa pada w zaplanowanych sekundach. Słowa i przypisanie kwestii sprawdza autor uchem.

## 7. Montaż

- Eksport z CapCuta bez znaku wodnego (w teście logo było na całym filmie).
- Jeśli scenariusz kończy się czernią, dodać wyciemnienie lub 1–2 s czerni po ostatniej kwestii.
