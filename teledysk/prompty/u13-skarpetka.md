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

**Decyzja autora (12.10):** stroje z parku/targu (wrócili z psem prosto z targu). Uwaga: w pokoju jest poranne słońce, a targ był wieczorem. Możemy to poprawić w wideo.
**Ustawienia:** Flow · NBP · 16:9 · 2k · x3. Referencje: 1 = `u13-pokoj-pusty.jpg`, 2 = `ania-park.jpg`, 3 = `tomek-park.jpg`, 4 = `piesek.png`.

```text
Edit image 1: the same empty room and camera. Add three figures: the young woman from image 2 sitting on the green sofa, the young man from image 3 kneeling on the jute rug, and the puppy from image 4 playing tug-of-war with him using a striped sock.

CHANGE (add only these, nothing else moves):
- The young man from image 3 kneels on the left half of the jute rug, in the sunlit patch, about 2 meters away from the sofa. His body is in profile facing screen-right, sitting back on his heels and leaning back. Both hands grip one end of a long grey-and-white striped knit sock and pull it toward his chest. Teasing grin, eyes on the puppy. Same navy jacket with brown corduroy collar, cream knit sweater, charcoal chinos and brown suede sneakers as in image 3.
- The puppy from image 4 stands on the right half of the rug, 1 meter in front of him, facing him in profile toward screen-left. Front paws braced on the rug, rear raised, tail up. The other end of the striped sock is clamped in its teeth. The sock is stretched tight in one straight line between his hands and the puppy's mouth.
- The young woman from image 2 sits on the far half of the bottle-green sofa, between the mustard cushion and the floor lamp, her body turned toward the rug. She leans forward with her elbows on her knees, laughing openly at the tug-of-war, eyes crinkled. Same bottle-green cable-knit cardigan, mustard turtleneck, dark jeans and white sneakers as in image 2.

PRESERVE EXACTLY:
- Everything in image 1: camera position, height, lens and framing; the closed white double door; the black guitar case beside the monstera; the TV, bookshelf and books; both framed prints; the floor lamp; the sofa with the mustard cushion and the small plant; the white wardrobe in the right foreground; the plaster cornice, walls, parquet and jute rug
- Morning sunlight from the window behind the camera, the bright sun patch on the rug, shadows, colour grade, contrast, grain
- Faces and hair: the woman 100% matches image 2, the man 100% matches image 3, the puppy 100% matches image 4

ONLY CHANGE: add the woman on the sofa, the kneeling man, the puppy and the striped sock between them. 100% identical otherwise. Exactly two people and one puppy. Rule of thirds.
```

Zapisz jako `referencje/u13-start.jpg`.
