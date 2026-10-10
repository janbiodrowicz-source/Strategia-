# Ujęcie 4: Drzwi się otwierają (korytarz kamienicy, 0:22,5–0:30)

**Wynik 1 (9.10, 2 filmy):** ❌ Model wkładał klucz w klamkę zamiast w zamek, a drzwi zmieniały kształt w trakcie (pojedyncze, potem podwójne). W drugim filmie Ania odwróciła się twarzą do kamery. Dobrze wyszły: dwukolorowe ściany, „12”, gitara i uśmiech Tomka.
**Poprawka (v2):** Tomek stoi plecami i zasłania ciałem zamek i dłonie, więc nie widać, jak wkłada klucz (pomysł autora). Drzwi to jedno skrzydło z zawiasami po lewej („double-panel” myliło model). Ania nie pokazuje twarzy.
**Wynik 2 (10.10):** prawie dobrze. Jedno skrzydło drzwi, zielone ściany, Ania tyłem i piękny uśmiech Tomka w otwartych drzwiach w 0:06. Problemy: numer „12” był i na drzwiach, i na ościeżnicy, a dłoń z kluczem przy klamce była widoczna.
**Poprawka (v3):** bez numeru na drzwiach. Tomek stoi plecami tuż przy prawej krawędzi drzwi i tułowiem zasłania klamkę, zamek i dłonie.
**Wynik 3 (10.10):** ❌ numer zniknął, ale Tomek dalej stoi obok klamki i widać dłoń z kluczem. Tekstem tego nie wygramy.
**v4 = klatka startowa (jak w ujęciu 1):** klatka 0:00 z wyniku 3 (`referencje/u04-start-przed-edycja.png`, 1280×720; dłonie już przy piersi, widać tylko klamkę) (korytarz wyszedł najlepiej), w NBP przesuwamy Tomka przed klamkę i chowamy mu dłonie, potem Omni animuje od tej klatki tym samym promptem v3.

### Klatka startowa: edycja w NBP (16:9, 2k), obraz 1 = klatka z wyniku 3

```text
Edit the image: hide the door handle behind the man's body.

CHANGE: the man with the guitar case stands 40 centimeters further to the right, directly in front of the brass door handle, his back fully to the camera, close to the door. The handle and the lock are completely hidden behind his torso; his elbows are bent at his sides, his hands in front of his chest, out of sight. The door behind him is closed, plain dark-brown wood with raised panels.

PRESERVE EXACTLY:
- The woman in the left foreground seen from behind, her hair, her cream linen shirt, her position
- The man's identity, hair, dark teal shirt, khaki chinos, brown sneakers, the black guitar case on his back
- The two-tone corridor walls (bottle green below, cream above), the terrazzo floor, the window on the left, the light switch
- Camera position, angle, lens and framing
- Light direction, colour grade, contrast, grain

ONLY CHANGE: the man's position, hiding the door handle. 100% identical otherwise.
```

**Wynik 4 (10.10):** ❌ dłoń dalej przy klamce.
**v5 (pomysł autora):** Tomek wkłada klucz do **górnego zamka** (okrągły mosiężny zamek na wysokości ramienia, 40 cm nad klamką), a drzwi pcha otwartą lewą dłonią. Klamki nikt nie dotyka. Model nie myli już zamka z klamką, bo to dwa osobne elementy, a klucz może być widoczny.
**Wynik 5 (10.10):** ❌ klucz znów w szyldzie klamki (logiczne, bo zamek jest przy klamce), Ania wypadła z kadru, kamera z boku zamiast przez ramię. Pudło wyszło.
**v6:** w ogóle bez wkładania klucza. Drzwi są już otwarte z klucza, Tomek pcha je dłonią. Klucz ma swoje momenty w ujęciach 2 i 3, a pod „nowe drzwi” liczy się samo otwarcie i światło. Ania wpisana jako stała ćwiartka kadru po lewej.
**Wynik 6 (10.10):** ❌ znów drzwi dwuskrzydłowe, Tomek bokiem.
**v7 (zasada: upraszczamy + klatka startowa):** `referencje/u04-start-przed-edycja.png` → edycja w NBP: klucz już tkwi w zamku pod klamką, dłoń Tomka na kluczu, pudło przy stopie. Potem Omni animuje od tej klatki: przekręcenie klucza, pchnięcie drzwi, odwrócenie głowy. Model niczego już nie wkłada ani nie wymyśla.

### v7, krok 1: klatka startowa (NBP, 16:9, 2k), obraz 1 = `u04-start-przed-edycja.png`

```text
Edit the image: the man is about to open the door with a key that is already in the lock.

CHANGE:
- A single small brass key on a small metal ring is already inserted in the keyhole of the brass lock plate, just below the lever handle.
- The man's right hand holds that key between thumb and fingers, his arm bent naturally; his left hand hangs relaxed at his side.
- A single closed cardboard moving box, plain brown and sealed with tape, stands on the floor beside his right foot.

PRESERVE EXACTLY:
- The single dark-brown wooden door with raised panels, closed, its frame, the brass handle and lock plate
- The woman in the left foreground seen from behind, her hair, her cream linen shirt, her position
- The man's identity, hair, dark teal shirt, khaki chinos, brown sneakers, the black guitar case on his back, his position and his back turned to the camera
- The two-tone corridor walls (bottle green below, cream above), the terrazzo floor, the window on the left, the light switch
- Camera position, angle, lens and framing
- Light direction, colour grade, contrast, grain

ONLY CHANGE: the key in the lock with his hand on it, and the box by his foot. 100% identical otherwise.
```

### v7, krok 2: wideo (Omni 1.1 Flash, 8 s), klatka startowa = wynik kroku 1, `@TOMEK`, `@ANIA`

```text
SCENE CONTEXT
Late morning on the fourth-floor landing of an old Polish tenement. A young man opens the door of his girlfriend's tiny studio apartment with the key she has just given him, then turns to her with a smile. A small moment that means he is moving in.

ACTIVE REFERENCES
@TOMEK: early 30s lean man, tousled dark brown hair, short stubble, dark teal overshirt open over a white t-shirt, khaki chinos, brown suede sneakers. A black soft guitar case on his back. Calm, quietly moved. 100% matches the reference.
@ANIA: early 30s slim woman, wavy shoulder-length dark brown hair with caramel ends, cream linen overshirt. Seen only from behind. 100% matches the reference.

FIRST FRAME
The video starts exactly from the provided start frame: same camera, same framing, same positions. The key is already in the lock below the handle, @TOMEK's right hand on it. The cardboard box stands by his right foot. @ANIA's shoulder and hair fill the left foreground, her face never visible.

FORMAT MODE
Single continuous take. Real-time motion. No cuts. Camera static on a tripod, 47° normal lens, over @ANIA's shoulder. Rule of thirds.

ACTION TIMING
0:00 to 0:02: @TOMEK turns the key once; a solid lock click.
0:02 to 0:04: He pushes the door with the same hand; the single wooden door swings slowly inward, away from the camera, a widening gap of warm golden daylight opening beside him. The key stays in the lock.
0:04 to 0:06: He turns his head over his left shoulder toward @ANIA, eyes first; a slow closed-lip smile spreads.
0:06 to 0:08: @ANIA's shoulder lifts with a quiet laugh; warm daylight from inside the apartment spills across @TOMEK's face and chest.

PERFORMANCE
@TOMEK is unhurried, almost ceremonial. When the door gives, he freezes for a beat, the thought arriving in his eyes before his head turns. The smile is dry and warm, a joke he does not need to say. Neither of them speaks; his lips stay closed. @ANIA, seen only from behind, drops her raised shoulders on the laugh.

PHYSICS
The heavy old door swings slowly on stiff hinges, one solid leaf turning around its left edge. The guitar case shifts with his turn. Dust motes float in the line of daylight from the doorway.

LIGHTING
Cool soft daylight from the stairwell window on the left. As the door opens, a warm golden wedge of daylight from the apartment falls across @TOMEK, the only warm light in the frame.

AUDIO
Quiet stairwell echo, a lock click, the creak of old hinges, @ANIA's soft laugh. No music, no voices, no subtitles.

POSITIVE CONSTRAINTS
Exactly two people in frame. The door stays one single wooden door of the same shape, size and color; only its opening angle changes. The box stays on the floor. Natural skin texture, real fine film grain, stable picture, no flickering.
```

**Wynik 7 (10.10, klatka z NBP):** ❌ klucz w zamku pod klamką i pudło są OK, ale NBP przekadrował obraz: zbliżenie z boku, Ania wypadła z kadru. Do dokończenia w nowym wątku. Pomysły: (a) ten sam prompt NBP z ustawionym 16:9 i dopiskiem „Keep the exact same composition and camera as image 1” na początku, (b) dwie osobne edycje: najpierw pudło, potem klucz, (c) zaakceptować kadr bez Ani i zrobić ujęcie z boku.
**Ustawienia:** Film · 16:9 · 720p · x1 · 8 s · Omni 1.1 Flash. W montażu tniemy do 7,5 s.
**Referencje:** `@TOMEK` = `referencje/tomek.png`, `@ANIA` = `referencje/ania.png`.
**Technika:** jedno ujęcie, 47°, przez ramię Ani. Tomek otwiera kluczem drzwi kawalerki i z uśmiechem odwraca się do Ani. Bez dialogu.
**Ciągłość:**
- ten sam mosiężny klucz na małym kółku co w ujęciach 2 i 3,
- strój jak w klipach 01 i 02,
- Tomek ma na plecach gitarę w miękkim pokrowcu, a przy stopie stoi jedno pudło, bo w ujęciu 5 wnosi oba do środka (pudło = cały jego dobytek, „nie pytam, co będzie dalej”). Ujęcie 5 zaczyna się od podniesienia tego pudła.

```text
SCENE CONTEXT
Late morning on the fourth-floor landing of an old Polish tenement. A young man has just unlocked the door of his girlfriend's tiny studio apartment with the key she gave him. He pushes the door open and turns to her with a smile. A small moment that means he is moving in.

ACTIVE REFERENCES
@TOMEK: early 30s lean man, tousled dark brown hair, short stubble, dark teal overshirt open over a white t-shirt, khaki chinos, brown suede sneakers. A black soft guitar case on his back. Calm, quietly moved. 100% matches the reference.
@ANIA: early 30s slim woman, wavy shoulder-length dark brown hair with caramel ends, cream linen overshirt. Seen only from behind. 100% matches the reference.

LOCATION MAP
A narrow tenement landing, 2 meters wide. Walls painted in the classic two-tone style: glossy bottle-green oil paint on the lower half, worn cream on the upper half. Worn terrazzo floor. On the far wall, the apartment door: one single tall wooden door leaf with raised panels, painted dark brown, hinges on its left edge, a long brass lever handle near its right edge. The door is already unlocked. The door and its frame are plain painted wood without any plate, number or lettering. Daylight comes from a tall stairwell window off-screen on the left.

FIRST FRAME AND SPATIAL BLOCKING
The first visible frame already contains both characters in place. No empty establishing frame.
@TOMEK stands in front of the right half of the door, three-quarter back to the camera. His right hand rests flat on the door panel at chest height, ready to push. His left hand hangs relaxed at his side. Neither hand touches the handle.
@ANIA stands 1 meter behind him and to the left, closest to the camera; her shoulder and hair fill the left quarter of the frame for the whole shot. Only her left shoulder, the back of her head and her hair are visible in the left foreground, soft and out of focus. She faces the door and @TOMEK for the whole shot; her face is never visible.
A single closed cardboard moving box, plain brown and sealed with tape, stands on the floor beside @TOMEK's right foot and stays there for the whole shot.

FORMAT MODE
Single continuous take. Real-time motion. No cuts.

OPTICS
47° diagonal field of view, standard normal lens character, camera 1.5 meters behind @ANIA's shoulder at her head height. Focus on @TOMEK and the door; @ANIA's shoulder and hair in the foreground stay soft. Natural human-eye perspective.

CAMERA
Over-the-shoulder shot, camera static on a tripod. @TOMEK holds the right third, @ANIA's soft shoulder frames the left edge. Rule of thirds.

ACTION TIMING
0:00 to 0:02: @TOMEK stands still for a breath, his palm flat on the door.
0:02 to 0:04: He pushes with his flat palm; the door swings slowly inward, away from the camera, a widening gap of warm golden daylight opening beside him.
0:04 to 0:06: He turns his head over his left shoulder toward @ANIA, eyes first; a slow closed-lip smile spreads.
0:06 to 0:08: @ANIA's shoulder lifts with a quiet laugh, her head still turned toward him; warm daylight from inside the apartment spills across @TOMEK's face and chest.

PERFORMANCE
@TOMEK treats the moment as bigger than opening a door: unhurried, almost ceremonial. When the door gives, he freezes for a beat, the thought arriving in his eyes before his head turns. The smile is dry and warm at the same time, a joke he does not need to say. Slow amused blinks, steady eye contact with her. Neither of them speaks; his lips stay closed.
@ANIA is seen only from behind: her shoulders are a little raised with held breath and drop on the laugh.

PHYSICS
The heavy old door swings slowly and evenly on stiff hinges, one solid wooden leaf turning around its left edge, pushed by his flat palm. The guitar case on his back shifts with his turn. Dust motes float in the line of daylight from the doorway.

LIGHTING
Cool soft daylight from the stairwell window on the left fills the landing. As the door opens, a warm golden wedge of daylight from inside the apartment falls across @TOMEK, the only warm light in the frame. Palette: 60% muted bottle green and cream walls, 30% warm wood and skin tones, 10% golden light from the doorway. No flat front light.

AUDIO
Quiet stairwell echo, the creak of old hinges, @ANIA's soft laugh. No music, no voices, no subtitles.

POSITIVE CONSTRAINTS
Exactly two people in frame. Nobody touches the handle; the door opens only by his flat palm. The door stays one single wooden door of the same shape, size and color; only its opening angle changes. Natural skin texture, real fine film grain, stable picture, no flickering.
```

**Na co patrzeć:**
- Ania ma być widoczna **tylko od tyłu**, jako ramię i włosy na pierwszym planie. Jeśli model obróci ją twarzą do kamery, dopisz „her face is never visible”.
- Numer „12” na drzwiach: jeśli model wpisze inny tekst, usuń całą tabliczkę.
- Drzwi otwierają się **do środka mieszkania**. Model może je otwierać na korytarz.
