# Ujęcie 13: Przeciąganie skarpetki (DROP, 1:15–1:18,75)

**Pomysł (decyzja autora 12.10):** Tomek na podłodze przeciąga się ze szczeniakiem skarpetką, nagle puszcza, piesek przewraca się na plecy, a Ania śmieje się z zielonej kanapy. Generujemy 4 s.

**Plan (decyzja autora 12.10):** najpierw klatka startowa w NBP, potem animacja od tej klatki.
**Stroje:** podstawowe (`ania.png`, `tomek.png`), te same co w u05, bo autor nie miał preferencji.

## Krok 1: klatka startowa (NBP, edycja)

**Baza:** `referencje/u13-baza-u05.jpg`, czyli klatka z u05 od autora (widok od okna na drzwi), przycięta z czarnych pasów do 2168×1220 (16:9).
**Kamera:** zostaje jak w u05 (na wysokości oczu, 47°-ish), bo NBP najlepiej edytuje bez ruszania kamery. W scenariuszu ujęcie 13 miało być nisko (84°, na wysokości psa). Decyzja, czy obniżamy, zapada przy prompcie wideo.

**Ustawienia:** Flow · NBP · **16:9** · 2k · **x4**. Kolejność referencji:
1. `referencje/u13-baza-u05.jpg` (pokój, kamera, światło)
2. `referencje/piesek.png` (szczeniak)
3. `referencje/ania.png`
4. `referencje/tomek.png`

```text
Edit image 1: the same room and camera, a later moment of the same day. The young woman from image 3 sits on the green sofa, the young man from image 4 kneels on the jute rug and plays tug-of-war with the puppy from image 2 using a sock. The entrance doors are closed and his guitar case stands in the corner.

CHANGE:
- The white double door on the far wall: both leaves are fully closed, white raised panels and brass lever handles, a continuous white door surface where the dark entrance hall was.
- The black soft guitar case stands upright on its end in the far left corner, behind the monstera, leaning against the wall; the monstera leaves partly cover it.
- The young woman from image 3 sits on the middle of the bottle-green velvet sofa, body turned toward the center of the room, one leg tucked under her, the mustard cushion beside her. She watches the tug-of-war and laughs openly, eyes crinkled, shoulders lifted, one hand near her mouth. Same cream linen overshirt, mustard t-shirt and light blue jeans as in image 1.
- The young man from image 4 kneels on the jute rug in the center of the room, in three-quarter profile facing screen-right, sitting back on his heels, leaning back. Both hands grip one end of a long grey-and-white striped knit sock, pulling it toward himself, a teasing grin. Same dark teal overshirt, white t-shirt and khaki chinos as in image 1. No box, no guitar on his back.
- The puppy from image 2 stands on the rug 1 meter screen-right of him, facing him, front paws braced on the rug, back low, tail up, the other end of the striped sock clamped in its teeth, the sock pulled tight in a straight line between them.
- The cardboard box is removed: the rug and the parquet continue under it.

PRESERVE EXACTLY:
- Camera position, height, lens and framing of image 1
- The room: plaster cornice, warm-white walls, herringbone parquet, the jute rug and its position
- Left wall: the TV on the oak-and-black bookshelf with all books, the monstera in its pot by the door
- Right wall: both framed black-and-white prints, the black floor lamp, the bottle-green sofa with the mustard cushion and the small plant, the white wardrobe in the right foreground with its black handles
- Morning sunlight from the window behind the camera, the bright sun patch on the rug, shadows, colour grade, contrast, grain
- Faces and hair: the woman 100% matches image 3, the man 100% matches image 4, the puppy 100% matches image 2

ONLY CHANGE: the closed door, the guitar case in the corner, the three figures and their poses, the removed box. 100% identical otherwise. Rule of thirds.
```

**Na co patrzeć:** drzwi zamknięte (bez ciemnego przedpokoju), futerał w lewym rogu za monsterą, jeden piesek z drugim końcem skarpetki w pyszczku, skarpetka napięta w linii prostej, Ania na kanapie twarzą do środka pokoju, Tomek bez pudła i gitary. Zapisz jako `referencje/u13-start.jpg`.

**Jeśli NBP pomiesza:** jedna zmiana na iterację. Najpierw tylko drzwi + futerał + usunięcie pudła i Tomka/Ani z kadru (pusty pokój), potem w drugim przejściu dodajemy trzy postacie.

**Wynik v1 (12.10, x3):** drzwi zamknięte ✅, futerał w rogu ✅, pokój zachowany ✅. Ale autor wgrał planszki w strojach z parku (`ania-park`, `tomek-park`), więc stroje się pomieszały. Skarpetka ledwo widoczna, a Tomek za blisko kanapy. Decyzja autora: rozbijamy na etapy.

## Krok 1a: pusty pokój (NBP, edycja)

**Ustawienia:** Flow · NBP · 16:9 · 2k · x3. Jedna referencja: obraz 1 = `referencje/u13-baza-u05.jpg` (bez planszek postaci).

```text
Edit image 1: the same room and camera, now empty of people, with the entrance door closed and a guitar case in the corner.

CHANGE:
- Remove the young man with the cardboard box and the guitar on his back: the jute rug, the sunlit patch and the herringbone parquet continue where he stood.
- Remove the young woman in the doorway.
- The white double door on the far wall: both leaves fully closed, white raised panels, brass lever handles; a continuous white door surface where the dark entrance hall was.
- A black soft guitar case stands upright on its end in the far left corner, behind the monstera, leaning against the wall, partly covered by the monstera leaves.

PRESERVE EXACTLY:
- Camera position, height, lens and framing of image 1
- Plaster cornice, warm-white walls, herringbone parquet, the jute rug and its position
- Left wall: the TV on the oak-and-black bookshelf with all books, the monstera in its pot by the door
- Right wall: both framed black-and-white prints, the black floor lamp, the bottle-green sofa with the mustard cushion and the small plant, the white wardrobe in the right foreground with its black handles
- Morning sunlight from the window behind the camera, the bright sun patch on the rug, shadows, colour grade, contrast, grain

ONLY CHANGE: no people, the closed door, the guitar case in the corner. 100% identical otherwise. Empty quiet room, still air.
```

Zapisz jako `referencje/u13-pokoj-pusty.jpg`. Krok 1b: dodajemy postacie (`ania.png`, `tomek.png`, `piesek.png`).

**Wynik 1a (12.10): ✅** pusty pokój, drzwi zamknięte, futerał przy monsterze, plama słońca na dywanie. Wyjście 768p, więc trzeba zrobić upscale do 2k. Zapisz jako `referencje/u13-pokoj-pusty.jpg`.

## Krok 1b: para i piesek (NBP, edycja)

**Zmiana autora (12.10):** Ania w domu bez kardiganu, tylko w musztardowym golfie (odcina się od zielonej kanapy). Najpierw planszka:

**Planszka `ania-golf.jpg`:** Flow · NBP · 3:2 · 2k · x3, obraz 1 = `referencje/ania-park.jpg`.

```text
Edit image 1: the same woman in all three panels, without her cardigan.

CHANGE (consistent in all three panels):
- Remove the bottle-green cable-knit cardigan. She wears only the fitted mustard-yellow ribbed knit turtleneck with long sleeves, tucked into the jeans; the full turtleneck is visible: front, back and both sleeves to the wrists.

PRESERVE EXACTLY:
- Her face, freckles, brown eyes, wavy shoulder-length dark brown hair with caramel ends, the small gold stud earring, expression and smile in every panel
- The dark indigo high-waisted jeans, the brown leather belt, the white canvas sneakers
- Poses, body proportions and positions in all three panels: front full body on the left, back full body in the middle, close-up portrait on the right
- The mid-grey studio backdrop, the white panel dividers, studio light, shadows, colour grade, grain
- Camera framing of every panel

ONLY CHANGE: the cardigan is removed, the turtleneck is fully visible. 100% identical otherwise.
```

**Wynik (12.10): ✅** x3, wszystkie trzy prawie identyczne: golf z długimi rękawami, pasek, twarz i kolczyk zachowane. Pobrać w 2k (Flow pokazuje 768p) i zapisać jako `referencje/ania-golf.jpg`.

**Decyzja autora (12.10):** stroje z parku/targu (wrócili z psem prosto z targu). Uwaga: w pokoju jest poranne słońce, a targ był wieczorem. Możemy to poprawić w wideo.
**Ustawienia:** Flow · NBP · 16:9 · 2k · x3. Referencje: 1 = `u13-pokoj-pusty.jpg`, 2 = `ania-golf.jpg`, 3 = `tomek-park.jpg`, 4 = `piesek.png`.

```text
Edit image 1: the same empty room and camera. Add three figures: the young woman from image 2 sitting on the green sofa, the young man from image 3 kneeling on the jute rug, and the puppy from image 4 playing tug-of-war with him using a striped sock.

CHANGE (add only these, nothing else moves):
- The young man from image 3 kneels on the left half of the jute rug, in the sunlit patch, about 2 meters away from the sofa. His body is in profile facing screen-right, sitting back on his heels and leaning back. Both hands grip one end of a long grey-and-white striped knit sock and pull it toward his chest. Teasing grin, eyes on the puppy. Same navy jacket with brown corduroy collar, cream knit sweater, charcoal chinos and brown suede sneakers as in image 3.
- The puppy from image 4 stands on the right half of the rug, 1 meter in front of him, facing him in profile toward screen-left. Front paws braced on the rug, rear raised, tail up. The other end of the striped sock is clamped in its teeth. The sock is stretched tight in one straight line between his hands and the puppy's mouth.
- The young woman from image 2 sits on the far half of the bottle-green sofa, between the mustard cushion and the floor lamp, her body turned toward the rug. She leans forward with her elbows on her knees, laughing openly at the tug-of-war, eyes crinkled. Same mustard ribbed turtleneck, dark jeans with the brown belt and white sneakers as in image 2, no cardigan.

PRESERVE EXACTLY:
- Everything in image 1: camera position, height, lens and framing; the closed white double door; the black guitar case beside the monstera; the TV, bookshelf and books; both framed prints; the floor lamp; the sofa with the mustard cushion and the small plant; the white wardrobe in the right foreground; the plaster cornice, walls, parquet and jute rug
- Morning sunlight from the window behind the camera, the bright sun patch on the rug, shadows, colour grade, contrast, grain
- Faces and hair: the woman 100% matches image 2, the man 100% matches image 3, the puppy 100% matches image 4

ONLY CHANGE: add the woman on the sofa, the kneeling man, the puppy and the striped sock between them. 100% identical otherwise. Exactly two people and one puppy. Rule of thirds.
```

Zapisz jako `referencje/u13-start.jpg`.

**Planszka `tomek-sweter.jpg` (12.10): ✅** edycja `tomek-park.jpg`: bez kurtki, tylko kremowy sweter w wafelkowy splot. Z x3 wybrany wariant 2, bo zachował uśmiech z zamkniętymi ustami (1 i 3 dodały zęby).

## Krok 1b v2: kolejność autora (pokój, Tomek, piesek, Ania)

Flow · NBP · 16:9 · 2k · x3. 1 = `u13-pokoj-pusty.jpg`, 2 = `tomek-sweter.jpg`, 3 = `piesek.png`, 4 = `ania-golf.jpg`.

```text
Edit image 1: the same empty room and camera. Add three figures: the young man from image 2 kneeling on the jute rug, the puppy from image 3 playing tug-of-war with him using a striped sock, and the young woman from image 4 sitting on the green sofa.

CHANGE (add only these, nothing else moves):
- The young man from image 2 kneels on the left half of the jute rug, in the sunlit patch, about 2 meters away from the sofa. His body is in profile facing screen-right, sitting back on his heels and leaning back. Both hands grip one end of a long grey-and-white striped knit sock and pull it toward his chest. Teasing grin, eyes on the puppy. Same cream waffle-knit crew-neck sweater, charcoal chinos and brown suede sneakers as in image 2.
- The puppy from image 3 stands on the right half of the rug, 1 meter in front of him, facing him in profile toward screen-left. Front paws braced on the rug, rear raised, tail up. The other end of the striped sock is clamped in its teeth. The sock is stretched tight in one straight line between his hands and the puppy's mouth.
- The young woman from image 4 sits on the far half of the bottle-green sofa, between the mustard cushion and the floor lamp, her body turned toward the rug. She leans forward with her elbows on her knees, laughing openly at the tug-of-war, eyes crinkled. Same mustard ribbed turtleneck, dark jeans with the brown belt and white sneakers as in image 4.

PRESERVE EXACTLY:
- Everything in image 1: camera position, height, lens and framing; the closed white double door; the black guitar case beside the monstera; the TV, bookshelf and books; both framed prints; the floor lamp; the sofa with the mustard cushion and the small plant; the white wardrobe in the right foreground; the plaster cornice, walls, parquet and jute rug
- Morning sunlight from the window behind the camera, the bright sun patch on the rug, shadows, colour grade, contrast, grain
- Faces and hair: the man 100% matches image 2, the puppy 100% matches image 3, the woman 100% matches image 4

ONLY CHANGE: add the kneeling man, the puppy, the striped sock between them and the woman on the sofa. 100% identical otherwise. Exactly two people and one puppy. Rule of thirds.
```

**Wynik 1b v2 (12.10, x3):** wariant 2 najlepszy (skarpetka napięta, piesek się zapiera, Ania się śmieje). W wariancie 1 skarpetka krótka, w wariancie 3 Tomek klęczy jak przy oświadczynach 💍. Zrzut ekranu: `referencje/u13-start-v2-rano-zrzut.jpg`.
**Zmiana autora:** światło wieczorne, sztuczne, z lampy sufitowej. Nie generujemy od nowa, tylko zmieniamy światło w wariancie 2 (jedna zmiana).

## Krok 1c: wieczorne światło (NBP, edycja)

Flow · NBP · 16:9 · 2k · x3. Obraz 1 = wariant 2 w 2k.

```text
Edit image 1: the same moment, relit as a late evening scene with artificial light only.

CHANGE (lighting only):
- It is dark night outside. The morning sunlight is gone: no sun patch on the rug, no sunbeams, no daylight from the window behind the camera.
- The single main light source is the white glass globe pendant lamp hanging from the center of the ceiling, at the top edge of the frame, switched on. It casts warm 2700K tungsten light straight down: a soft warm pool of light on the jute rug and the three figures, gentle shadows directly under them, the light falling off toward the walls and corners, the far corners and the top of the walls slightly darker.
- Warm amber highlights on hair, the puppy's fur, the knit sweater, the velvet sofa and the parquet; cosy, slightly darker overall exposure with soft contrast.

PRESERVE EXACTLY:
- Camera position, height, lens and framing
- Both people and the puppy: faces, expressions, poses, hands, clothing and the striped sock stretched between them
- The whole room: the closed white double door, the guitar case beside the monstera, the TV, bookshelf and books, both framed prints, the floor lamp (switched off), the green sofa with the mustard cushion and the small plant, the white wardrobe, the cornice, walls, parquet and jute rug
- Grain

ONLY CHANGE: the light, from morning sun to warm evening light from the ceiling lamp. 100% identical otherwise.
```

Zapisz jako `referencje/u13-start.jpg`.

**Wynik 1c (12.10):** ❌ NBP obniżył lampę do kadru (duża świecąca kula, przez „at the top edge of the frame”), a na dywanie została ukośna plama w kształcie okna. Lekcja: nie opisujemy położenia lampy względem kadru, tylko „stays exactly where it is in image 1”. Światło z sufitu opisujemy kształtem (okrągła plama pod sufitem, ciemny pierwszy plan).

## Krok 1c v2 (baza: wariant 2 poranny)

```text
Edit image 1: the same moment at night, lit only by the ceiling lamp.

CHANGE (lighting only):
- The ceiling pendant lamp stays exactly where it is in image 1, the same size, mostly above the top edge of the frame: only its lower rim is barely visible at the top center. It is switched on and is the only light source in the room.
- Night outside. The window behind the camera gives no light at all: the bright diagonal sun patch on the rug and the floor is completely gone, no window-shaped light, no light beams, no hard-edged light shapes anywhere.
- The ceiling light falls straight down from above: one soft round pool of warm 2700K tungsten light centered on the rug under the ceiling center, softly lighting the three figures from above, short soft shadows directly under them. The light fades smoothly toward the walls; the foreground floor near the camera, the corners and the upper walls are noticeably darker.
- Warm amber tones on hair, the puppy's fur, the knit sweater, the velvet sofa and the parquet; cosy evening exposure, soft contrast.

PRESERVE EXACTLY:
- Camera position, height, lens and framing
- Both people and the puppy: faces, expressions, poses, hands, clothing and the striped sock stretched between them
- The whole room: the closed white double door, the guitar case beside the monstera, the TV, bookshelf and books, both framed prints, the floor lamp switched off, the green sofa with the mustard cushion and the small plant, the white wardrobe, the cornice, walls, parquet and jute rug
- Grain

ONLY CHANGE: the light, from morning sun to warm night light from the ceiling lamp above. 100% identical otherwise.
```

**Wynik 1c v2 (12.10): ✅** lampa ledwo widoczna, okno nie świeci, ciepła plama światła na środku. Zapisz w 2k jako `referencje/u13-start.jpg`.

## Krok 2: wideo (Omni 1.1 Flash, od klatki startowej)

**Ustawienia:** Flow · Omni 1.1 Flash · 16:9 · 4 s · x2 · klatka startowa = `referencje/u13-start.jpg`. Referencje: `@TOMEK` = `tomek-sweter.jpg`, `@ANIA` = `ania-golf.jpg`, `@PIESEK` = `piesek.png`.
**Odstępstwo od scenariusza:** kamera na wysokości oczu (47°) zamiast nisko (84°), bo musi pasować do klatki startowej. Energię dropu daje szybki najazd.
**Cięcie:** 3,75 s, na osi 1:15,0–1:18,75. Przewrót pieska musi się skończyć przed 3,75 s.

```text
SCENE CONTEXT
Night in a small cosy tenement studio, continuing directly from the starting image. A young man kneeling on the rug plays tug-of-war with a puppy using a striped sock. He suddenly lets go, the puppy tumbles onto its back with the sock in its mouth, and his girlfriend bursts out laughing on the sofa. Nobody speaks.

ACTIVE REFERENCES
@TOMEK: early 30s lean man, tousled dark brown hair, short stubble, cream waffle-knit crew-neck sweater, charcoal chinos, brown suede sneakers. Kneels on the rug, both hands on one end of a grey-and-white striped sock. 100% matches the reference.
@ANIA: early 30s slim woman, wavy shoulder-length dark brown hair with caramel ends, light freckles, small gold stud earring, fitted mustard ribbed turtleneck, dark jeans. Sits on the green sofa. 100% matches the reference.
@PIESEK: a 3-month-old fluffy honey-gold puppy, cream-white chest, floppy ears, black fabric collar. The other end of the striped sock clamped in its teeth. 100% matches the reference.

LOCATION MAP
Exactly the room from the starting image: closed white double door in the center of the far wall, black guitar case beside the monstera on the left, TV and bookshelf along the left wall, bottle-green velvet sofa with a mustard cushion along the right wall, white wardrobe in the right foreground, jute rug in the center.

FIRST FRAME AND SPATIAL BLOCKING
The first frame is exactly the starting image: same framing, same positions, same light. @TOMEK kneels on the left half of the rug facing screen-right. @PIESEK stands on the rug 1 meter in front of him facing screen-left, the sock stretched tight between them. @ANIA sits on the far half of the sofa, body turned toward them, eyes on the puppy.

FORMAT MODE
Single continuous take. Real-time motion. No cuts.

OPTICS
47° diagonal field of view, standard normal lens character, the same lens for the whole shot. Natural human-eye perspective, natural face and body proportions, the whole room readable.

CAMERA
Quick, smooth push-in at standing eye level from the starting position toward the rug, about 1 meter in 4 seconds, ending with all three figures larger in frame and @ANIA still visible on the sofa. One movement only. The image is the camera's point of view; the camera itself is never visible.

ACTION TIMING
0:00 to 0:01.2: Tug-of-war. @PIESEK pulls backward with all four paws braced, shaking its head left and right, tail wagging. @TOMEK leans back and tugs in short teasing pulls, grinning.
0:01.2 to 0:01.5: @TOMEK suddenly opens both hands and lets go of the sock.
0:01.5 to 0:02.6: The released tension throws @PIESEK backward: it sits down hard, tips over and rolls onto its back on the rug, four paws in the air, the sock still in its mouth.
0:02.6 to 0:04: @ANIA bursts out laughing, throws her head back, one hand to her chest. @TOMEK laughs with his hands still open in the air. @PIESEK wriggles on its back, sock in mouth, tail sweeping the rug.

PERFORMANCE
@TOMEK teases like a big kid, the let-go is a deliberate prank. @ANIA's laugh is sudden and real, shoulders shaking. Lips stay closed except for laughing; nobody speaks.

PHYSICS
The puppy is small, soft and heavy for its size: its paws slip slightly on the jute, its body has real weight when it tips over, fur and ears bounce on landing. The sock is soft knit fabric: it goes slack the moment it is released and flops over the puppy's chest.

LIGHTING
Night. The only light is the warm 2700K ceiling pendant above the center of the room, its lower rim barely visible at the top edge, exactly as in the starting image. Soft round pool of warm light on the rug and the figures, darker corners and foreground. No daylight, no light from the window, no sun patches.

AUDIO
A playful puppy growl during the tug, a soft thump on the rug, her bright laugh, his short laugh. Nobody speaks. No music, no subtitles.

POSITIVE CONSTRAINTS
Exactly two people and one puppy. Faces match the references. Natural skin texture, fine film grain, warm evening colors, stable picture, no flickering.
```

**Wynik wideo (12.10, x1): ✅** akceptujemy. Przeciąganie 0–1,3 s, Tomek puszcza ok. 1,3 s, piesek przewraca się na plecy w 1,5–2,0 s i wierzga łapami ze skarpetką na pyszczku jak w czapce, Ania wybucha śmiechem od ok. 2,7 s (ręka na piersi, głowa w tył), Tomek śmieje się z rękami w górze. Najazd płynny, pokój i światło jak na klatce startowej, jeden piesek.
**Cięcie:** klatki 6–95 = 0,25–4,0 s (90 klatek = 3,75 s), bez dźwięku. Plik: `u13_skarpetka_3.75s.mp4`. Na osi: 1:15,0–1:18,75. Z początku wypada 0,25 s, a na końcu zostaje najmocniejszy śmiech.

## Poprawka wielkości psa (15.10)

**Problem:** w wideo piesek leżący na plecach ma długość dorosłego golden retrievera. Już na klatce startowej jest za duży: stojąc, ma prawie 70% wysokości klęczącego Tomka, a według planszki skali powinien mieć ok. 40% wysokości stojącego dorosłego.
**Plan:** krok 1d (NBP) to mniejszy piesek na klatce startowej, w tym samym miejscu i z tą samą skarpetką. Potem krok 2 v2, czyli wideo z tym samym promptem, plus zdanie SIZE, planszka skali w referencjach i zdanie, że piesek nie rośnie.

## Krok 1d: mniejszy piesek na klatce startowej (NBP, edycja)

Flow · NBP · 16:9 · 2k · x3. 1 = `referencje/u13-start.jpg` (wieczorna, ta sama co do wideo), 2 = `referencje/piesek-skala.jpg`, 3 = `referencje/piesek.png`.

```text
Edit image 1: the same room, man, woman, sock, light and camera. Replace the puppy with a smaller one, at the size shown in image 2.

CHANGE (only the puppy):
- Remove the current puppy. In the same spot on the rug, about one metre in front of the kneeling man, the puppy from image 3 now stands at its correct size from image 2: a small 3-month-old puppy of about 8 kg; standing on all four paws its back would reach just below a standing adult's knee, so next to the kneeling man its back is only at the height of his knee on the rug, and its whole body is shorter than his thigh.
- It faces screen-left toward the man, all four paws braced, pulling backward, the other end of the same grey-and-white striped sock clamped in its teeth, the sock stretched tight between them. Tail up, ears flopping.

PRESERVE EXACTLY:
- Camera position, height, lens and framing of image 1
- The man: kneeling pose, both hands on his end of the sock, face, cream sweater, charcoal chinos
- The woman on the green sofa: pose, laugh, mustard turtleneck, dark jeans
- The room: closed white double door, guitar case, monstera, TV, bookshelf, sofa with the mustard cushion, wardrobe, jute rug
- The night light: the warm ceiling pendant, the soft round pool of light on the rug, darker corners, colour grade, grain
- Nothing else from image 2: only the puppy's size

ONLY CHANGE: the puppy is smaller, at the size from image 2, same place, same sock. 100% identical otherwise. Exactly two people and one puppy.
```

**Na co patrzeć:** piesek wyraźnie mniejszy, grzbiet na wysokości kolana klęczącego Tomka. Ta sama sierść i obroża, skarpetka napięta, reszta kadru bez zmian. Zapisz jako `referencje/u13-start-v2.jpg`, potem krok 2 v2 (wideo).

**Zmiana autora (15.10):** zamiast kroku 1d robimy klatkę od nowa z pustego pokoju. Mamy wszystkie planszki i dodatkowo referencję skarpety, bo model za każdym razem robił skarpetę z dwoma końcami od strony palców. Skarpeta jest teraz **szara w romby (argyle)** z bordowymi i jasnoszarymi rombami, według zdjęcia autora `skarpeta.jpg` (zdjęcie produktowe, poza repo). Krok 1d jest nieaktualny.

## Krok 1b v3: para, mniejszy piesek i skarpeta argyle (NBP, edycja pustego pokoju)

Flow · NBP · 16:9 · 2k · x3. 1 = `referencje/u13-pokoj-pusty.jpg`, 2 = `referencje/tomek-sweter.jpg`, 3 = `referencje/ania-golf.jpg`, 4 = `referencje/piesek.png`, 5 = `referencje/piesek-skala.jpg`, 6 = `skarpeta.jpg`.

```text
Edit image 1: the same empty room and camera. Add three figures: the young man from image 2 kneeling on the jute rug, the puppy from image 4 playing tug-of-war with him using the sock from image 6, and the young woman from image 3 sitting on the green sofa.

CHANGE (add only these, nothing else moves):
- The young man from image 2 kneels on the left half of the jute rug, in the sunlit patch, about 2 meters away from the sofa. His body is in profile facing screen-right, sitting back on his heels and leaning back. Both hands grip the open ribbed cuff of the sock and pull it toward his chest. Teasing grin, eyes on the puppy. Same cream waffle-knit crew-neck sweater, charcoal chinos and brown suede sneakers as in image 2.
- THE SOCK: exactly the single sock from image 6, a long grey knee sock with burgundy and light-grey argyle diamonds and thin pink dotted lines. One sock with one open ribbed cuff at the man's end and one closed rounded toe at the puppy's end; a single toe, one continuous tube of knit fabric, stretched tight in one straight line between his hands and the puppy's mouth.
- The puppy from image 4, at its exact size from image 5: a small 3-month-old puppy of about 8 kg; next to the kneeling man its back is only at the height of his knee on the rug, and its whole body is shorter than his thigh. It stands on the right half of the rug, 1 meter in front of him, facing him in profile toward screen-left, front paws braced on the rug, rear raised, tail up, the closed toe of the sock clamped in its teeth.
- The young woman from image 3 sits on the far half of the bottle-green sofa, between the mustard cushion and the floor lamp, her body turned toward the rug. She leans forward with her elbows on her knees, laughing openly at the tug-of-war, eyes crinkled. Same mustard ribbed turtleneck, dark jeans with the brown belt and white sneakers as in image 3.

PRESERVE EXACTLY:
- Everything in image 1: camera position, height, lens and framing; the closed white double door; the black guitar case beside the monstera; the TV, bookshelf and books; both framed prints; the floor lamp; the sofa with the mustard cushion and the small plant; the white wardrobe in the right foreground; the plaster cornice, walls, parquet and jute rug
- Morning sunlight from the window behind the camera, the bright sun patch on the rug, shadows, colour grade, contrast, grain
- Faces and hair: the man 100% matches image 2, the woman 100% matches image 3, the puppy 100% matches image 4
- Nothing else from images 5 and 6: from image 5 only the puppy's size, from image 6 only the sock; no grey studio, no striped top

ONLY CHANGE: add the kneeling man, the small puppy, the single argyle sock between them and the woman on the sofa. 100% identical otherwise. Exactly two people, one puppy and one sock. Rule of thirds.
```

**Na co patrzeć:** jedna skarpeta z jednym zamkniętym palcem (pyszczek pieska) i otwartym ściągaczem (ręce Tomka), wzór w romby; piesek mały, grzbietem na wysokości kolana klęczącego Tomka; Tomek klęczy na piętach, nie „jak do oświadczyn”; Ania na kanapie się śmieje. Zapisz jako `referencje/u13-start-v3-rano.jpg`.
**Potem:** krok 1c v2 (nocne światło) bez zmian, tylko w PRESERVE zamiast „the striped sock” wpisujemy „the grey argyle sock”. Na koniec wideo v2.
