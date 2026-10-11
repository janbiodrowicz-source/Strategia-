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
Quiet stairwell echo, a lock click, the clack of the lever handle, the creak of old hinges, @ANIA's soft laugh. No music, no voices, no subtitles.

POSITIVE CONSTRAINTS
Exactly two people in frame. The door stays one single wooden door of the same shape, size and color; only its opening angle changes. The box stays on the floor. Natural skin texture, real fine film grain, stable picture, no flickering.
```

**Wynik 7 (10.10, klatka z NBP):** ❌ klucz w zamku pod klamką i pudło są OK, ale NBP przekadrował obraz: zbliżenie z boku, Ania wypadła z kadru. Do dokończenia w nowym wątku. Pomysły: (a) ten sam prompt NBP z ustawionym 16:9 i dopiskiem „Keep the exact same composition and camera as image 1” na początku, (b) dwie osobne edycje: najpierw pudło, potem klucz, (c) zaakceptować kadr bez Ani i zrobić ujęcie z boku.
**v8 (10.10): bez edycji w NBP.** Klatka `u04-start-przed-edycja.png` już jest dobrą klatką startową (jedno skrzydło, Ania tyłem, Tomek plecami, ręce przy piersi). Prawdziwy błąd to „klucz w klamce”, a nie sama klamka: przy otwartym zamku naciśnięcie klamki jest naturalne. Ręce przy piersi wykorzystujemy tak, że Tomek chowa klucz do kieszeni na piersi (klucz zostaje w historii). Pudła nie ma w kadrze, więc w ujęciu 5 trzeba je rozwiązać inaczej (Ania podaje je w progu albo stoi poza kadrem). Plan B: pomysły (a)–(c) powyżej.

### v8: wideo (Omni 1.1 Flash, 8 s), klatka startowa = `u04-start-przed-edycja.png` bez edycji, `@TOMEK`, `@ANIA`

```text
SCENE CONTEXT
Late morning on the fourth-floor landing of an old Polish tenement. A young man has just unlocked the door of his girlfriend's tiny studio apartment with the key she gave him. He pockets the key, opens the door and turns to her with a smile. A small moment that means he is moving in.

ACTIVE REFERENCES
@TOMEK: early 30s lean man, tousled dark brown hair, short stubble, dark teal overshirt, khaki chinos, brown suede sneakers. A black soft guitar case on his back. Calm, quietly moved. 100% matches the reference.
@ANIA: early 30s slim woman, wavy shoulder-length dark brown hair with caramel ends, cream linen overshirt. Seen only from behind. 100% matches the reference.

FIRST FRAME
The video starts exactly from the provided start frame: same camera, same framing, same positions, same single dark-brown wooden door. @TOMEK stands with his back to the camera, his hands in front of his chest. @ANIA's shoulder and hair fill the left foreground, her face never visible.

FORMAT MODE
Single continuous take. Real-time motion. No cuts. Camera static on a tripod, 47° normal lens, over @ANIA's shoulder. Rule of thirds.

ACTION TIMING
0:00 to 0:01: @TOMEK slips a small brass key into the chest pocket of his overshirt.
0:01 to 0:03: He presses the brass lever handle down with his right hand and pushes; the single wooden door swings slowly inward, away from the camera, a widening gap of warm golden daylight opening beside him.
0:03 to 0:05: He lets go of the handle and stops in the doorway for a beat, looking inside.
0:05 to 0:07: He turns his head over his left shoulder toward @ANIA, eyes first; a slow closed-lip smile spreads.
0:07 to 0:08: @ANIA's shoulder lifts with a quiet laugh; warm daylight spills across @TOMEK's face and chest.

PERFORMANCE
@TOMEK is unhurried, almost ceremonial. When the door gives, he freezes for a beat, the thought arriving in his eyes before his head turns. The smile is dry and warm, a joke he does not need to say. Neither of them speaks; his lips stay closed. @ANIA, seen only from behind, drops her raised shoulders on the laugh.

PHYSICS
The heavy old door swings slowly on stiff hinges, one solid leaf turning around its left edge, opening inward into the apartment. The key stays in the lock and swings with the door. The guitar case shifts with his turn. Dust motes float in the line of daylight from the doorway.

LIGHTING
Cool soft daylight from the stairwell window on the left. As the door opens, a warm golden wedge of daylight from the apartment falls across @TOMEK, the only warm light in the frame.

AUDIO
Quiet stairwell echo, the clack of the lever handle, the creak of old hinges, @ANIA's soft laugh. No music, no voices, no subtitles.

POSITIVE CONSTRAINTS
Exactly two people in frame. The door stays one single wooden door of the same shape, size and color; only its opening angle changes. Natural skin texture, real fine film grain, stable picture, no flickering.
```

**Wynik 7b (10.10, NBP, autor):** ✅ prawie: kadr jak w oryginale, Ania po lewej, klucz w zamku pod klamką, pudło przy stopach. Tomek trzyma klucz prawą ręką, a autor chce lewą.
**v9:** krok 1 = edycja tego zdjęcia w NBP (tylko zmiana ręki; prawa ręka trzyma pasek pokrowca na piersi, tułów lekko obrócony w prawo, bo zamek jest po prawej stronie Tomka). Krok 2 = prompt wideo v7 z lewą ręką. Zastępuje v8 (v8 nie miało pudła).

### v9, krok 1: NBP (16:9, 2k), obraz 1 = wynik 7b

```text
Keep the exact same composition and camera as image 1. Edit the image: the man turns the key with his LEFT hand instead of his right.

CHANGE:
- The man's LEFT hand holds the small brass key that is already in the lock below the door handle, between thumb and fingers; his left arm reaches naturally across in front of his body, his torso turned slightly to the right toward the lock.
- His RIGHT hand now holds the shoulder strap of the guitar case at his chest, elbow bent and relaxed.

PRESERVE EXACTLY:
- The key in the lock, the brass lever handle and lock plate, the single dark-brown wooden door with raised panels, closed, and its frame
- The sealed cardboard box on the floor by his feet, its size and position
- The woman in the left foreground seen from behind, her hair, her cream linen shirt, her position
- The man's identity, hair, dark teal shirt, khaki chinos, brown sneakers, the black guitar case on his back, his position with his back to the camera
- The two-tone corridor walls (bottle green below, cream above), the terrazzo floor, the window on the left, the light switch
- Camera position, angle, lens and framing
- Light direction, colour grade, contrast, grain

ONLY CHANGE: which hand holds the key, and his right hand on the guitar strap. 100% identical otherwise.
```

### v9b, krok 2: wideo (Omni 1.1 Flash, 8 s), klatka startowa = wynik kroku 1

```text
SCENE CONTEXT
Late morning on the fourth-floor landing of an old Polish tenement. A young man opens the door of his girlfriend's tiny studio apartment with the key she has just given him, then turns to her with a smile. A small moment that means he is moving in.

ACTIVE REFERENCES
@TOMEK: early 30s lean man, tousled dark brown hair, short stubble, dark teal overshirt, khaki chinos, brown suede sneakers. A black soft guitar case on his back. Calm, quietly moved. 100% matches the reference.
@ANIA: early 30s slim woman, wavy shoulder-length dark brown hair with caramel ends, cream linen overshirt. Seen only from behind. 100% matches the reference.

FIRST FRAME
The video starts exactly from the provided start frame: same camera, same framing, same positions. The key is already in the lock below the handle, @TOMEK's left hand on it, his right hand on the guitar strap at his chest. The cardboard box stands by his feet. @ANIA's shoulder and hair fill the left foreground, her face never visible.

FORMAT MODE
Single continuous take. Real-time motion. No cuts. Camera static on a tripod, 47° normal lens, over @ANIA's shoulder. Rule of thirds.

ACTION TIMING
0:00 to 0:02: @TOMEK turns the key once with his left hand; a solid lock click. The key stays in the lock.
0:02 to 0:04: He moves the same left hand up to the brass lever handle just above the key, presses it down and pushes; the single wooden door swings slowly inward, away from the camera, a widening gap of warm golden daylight opening beside him.
0:04 to 0:06: He lets go of the handle and turns his head over his left shoulder toward @ANIA, eyes first; a slow closed-lip smile spreads.
0:06 to 0:08: @ANIA's shoulder lifts with a quiet laugh; warm daylight from inside the apartment spills across @TOMEK's face and chest.

PERFORMANCE
@TOMEK is unhurried, almost ceremonial. When the door gives, he freezes for a beat, the thought arriving in his eyes before his head turns. The smile is dry and warm, a joke he does not need to say. Neither of them speaks; his lips stay closed. @ANIA, seen only from behind, drops her raised shoulders on the laugh.

PHYSICS
The heavy old door swings slowly on stiff hinges, one solid leaf turning around its left edge, opening inward into the apartment. The key stays in the lock and swings with the door. The guitar case shifts with his turn. Dust motes float in the line of daylight from the doorway.

LIGHTING
Cool soft daylight from the stairwell window on the left. As the door opens, a warm golden wedge of daylight from the apartment falls across @TOMEK, the only warm light in the frame.

AUDIO
Quiet stairwell echo, a lock click, the clack of the lever handle, the creak of old hinges, @ANIA's soft laugh. No music, no voices, no subtitles.

POSITIVE CONSTRAINTS
Exactly two people in frame. The door stays one single wooden door of the same shape, size and color; only its opening angle changes. The box stays on the floor. Natural skin texture, real fine film grain, stable picture, no flickering.
```

**Wynik 9 (10.10, NBP):** ✅ klatka OK: lewa dłoń na kluczu w zamku pod klamką, prawa na pasku pokrowca, Ania i pudło w kadrze. (Autor spodziewał się dłoni na klamce, bo pomylił v8 z v9.)
**v9b (wideo):** dopisany ruch przekręcić klucz, przenieść dłoń na klamkę, nacisnąć, pchnąć (tak otwiera się prawdziwe drzwi). Klucz zostaje w zamku i jedzie z drzwiami.
**Plan B:** edycja NBP „left hand moves from the key up to the brass lever handle directly above it… key stays inserted”, a potem wideo od naciśnięcia klamki.

**v10 (11.10, decyzja autora):** klatka v9 (`referencje/u04-start-v9-klucz.jpg`, 1376×768) przerobiona w NBP z referencjami postaci: klucz zostaje w zamku, lewa dłoń Tomka na klamce. Wideo zaczyna się od naciśnięcia klamki (bez przekręcania klucza).

### v10: NBP (16:9, 2k), obraz 1 = `u04-start-v9-klucz.jpg`, obraz 2 = `tomek.png`, obraz 3 = `ania.png`

```text
Keep the exact same composition, camera and framing as image 1. Edit image 1: the man's left hand moves from the key up to the brass lever handle directly above it, fingers wrapped around the lever, ready to press it down. The small brass key stays inserted in the lock below the handle, untouched.

IDENTITY:
- The man matches image 2 exactly: face, tousled dark brown hair, short stubble, build.
- The woman in the left foreground matches image 3 exactly: wavy shoulder-length dark brown hair with caramel ends, cream linen shirt. She stays seen from behind, her face not visible.

PRESERVE EXACTLY:
- The man's right hand on the guitar strap at his chest, his dark teal shirt, khaki chinos, brown sneakers, the black guitar case on his back, his position with his back to the camera
- The woman's position and size in the left foreground
- The sealed cardboard box on the floor, its size and position
- The single dark-brown wooden door with raised panels, closed, its frame, the round lock above
- The two-tone corridor walls (bottle green below, cream above), the terrazzo floor, the window on the left, the light switch
- Camera position, angle, lens and framing
- Light direction, colour grade, contrast, grain

ONLY CHANGE: the left hand on the handle instead of on the key, and the faces matching the references. 100% identical otherwise.
```

**Wynik 10 (11.10, NBP):** dłoń prawie bez zmian (przy klamce, klucz wisi w zamku pod nią), ale Ania jest większa i wyraźniejsza na pierwszym planie, a to dobry kadr przez ramię. Klatka: `referencje/u04-start-v10.jpg`. Akceptujemy ją.

### v10, wideo (Omni 1.1 Flash, 8 s), klatka startowa = `u04-start-v10.jpg`, referencja `@TOMEK` = zbliżenie twarzy z planszy `tomek.png`

```text
SCENE CONTEXT
Late morning on the fourth-floor landing of an old Polish tenement. A young man has just unlocked the door of his girlfriend's tiny studio apartment with the key she gave him. He opens the door and turns to her with a smile. A small moment that means he is moving in.

ACTIVE REFERENCES
@TOMEK: early 30s lean man, tousled dark brown hair, short stubble, warm brown eyes, dark teal overshirt over a white t-shirt, khaki chinos, brown suede sneakers. A black soft guitar case on his back. Calm, quietly moved. His face 100% matches the reference.
The woman in the left foreground: early 30s, wavy shoulder-length dark brown hair with caramel ends, cream linen overshirt. Seen only from behind for the whole shot, her face never visible.

FIRST FRAME
The video starts exactly from the provided start frame: same camera, same framing, same positions. @TOMEK stands with his back to the camera, his left hand on the brass lever handle, his right hand on the guitar strap at his chest. The small brass key is already turned and stays inserted in the lock below the handle. The cardboard box stands on the floor by his feet. The woman's shoulder and hair fill the left foreground.

FORMAT MODE
Single continuous take. Real-time motion. No cuts. Camera static on a tripod, 47° normal lens, over the woman's shoulder. Rule of thirds.

ACTION TIMING
0:00 to 0:01: @TOMEK presses the lever handle down with his left hand; a soft metallic clack.
0:01 to 0:03: He pushes; the single wooden door swings slowly inward, away from the camera, a widening gap of warm golden daylight opening beside him. The key stays in the lock and moves with the door.
0:03 to 0:04: He lets go of the handle and stands still in the doorway for a beat, looking inside.
0:04 to 0:06: He turns his head over his left shoulder toward the woman, eyes first; a slow closed-lip smile spreads, warm and a little amused, exactly like the reference.
0:06 to 0:08: The woman's shoulder lifts with a quiet laugh; warm daylight from inside the apartment spills across @TOMEK's face and chest.

PERFORMANCE
@TOMEK is unhurried, almost ceremonial. When the door gives, he freezes for a beat, the thought arriving in his eyes before his head turns. The smile is dry and warm, a joke he does not need to say. Neither of them speaks; his lips stay closed. The woman, seen only from behind, drops her raised shoulders on the laugh.

PHYSICS
The heavy old door swings slowly on stiff hinges, one solid leaf turning around its left edge, opening inward into the apartment. The guitar case shifts with his turn. Dust motes float in the line of daylight from the doorway.

LIGHTING
Cool soft daylight from the stairwell window on the left. As the door opens, a warm golden wedge of daylight from the apartment falls across @TOMEK, the only warm light in the frame.

AUDIO
Quiet stairwell echo, the clack of the lever handle, the creak of old hinges, the woman's soft laugh. No music, no voices, no subtitles.

POSITIVE CONSTRAINTS
Exactly two people in frame. The door stays one single wooden door of the same shape, size and color; only its opening angle changes. The key stays in the lock. The box stays on the floor. Natural skin texture, real fine film grain, stable picture, no flickering.
```

**Wynik v10 wideo (11.10):** ❌ „znów coś nie tak” (w 0:03 Tomek już wchodzi w drzwi).
**Lekcja z innego projektu autora:** w Omni 1.1 Flash od klatki startowej zadziałał **krótki prompt prozą** (3 akapity: „continuing exactly from this starting image”, jedna prosta akcja, co ma zostać bez zmian). Nasze długie prompty w stylu cinedance (sekcje, timing co 2 s) mogą Flasha przeciążać. Przy animacji od klatki startowej próbujemy najpierw wersji krótkiej.
**v11 (krótki prompt), klatka startowa = `u04-start-v10.jpg`, referencja = twarz Tomka:**

```text
Photorealistic cinematic video clip, continuing exactly from this starting image — same framing, lighting, stairwell. Single continuous take, no cuts, static camera.

The man presses the door handle down with his left hand and pushes the door open. The door swings slowly inward, into the apartment, and warm daylight from inside falls on him. He stays standing on the threshold, then turns his head over his left shoulder toward the woman and smiles softly with closed lips. Calm, everyday pacing — not rushed.

Keep his face, hairstyle and outfit consistent with the reference. The woman stays in the left foreground, seen from behind, for the whole clip. Only these two people in the shot. Keep the door, the key in the lock, the cardboard box on the floor, the green-and-cream walls and the window exactly as they appear in the starting image. Quiet stairwell sound, the creak of the door, no music, no speech.
```

**Wynik v11 (11.10):** ❌ ale z perełką. Drzwi **w ogóle się nie otwierają**. Tomek naciska klamkę, puszcza ją i odwraca się całym ciałem przodem do kamery. Kamera dryfuje i się przybliża, pudło znika po 0:02. ✅ Za to od 0:05 do 0:08 jest piękny, naturalny uśmiech Tomka do Ani pod zamkniętymi drzwiami. Zachowujemy go jako zapas (przebitka albo alternatywny montaż).
**Diagnoza:** model nie wie, co jest za drzwiami, więc woli ich nie otwierać. To ta sama lekcja co zawsze: poprawiamy klatkę startową.
**v12:** w NBP drzwi już **uchylone** (szpara ciepłego światła), a Omni tylko je dopycha. Prompt wideo krótki, prozą.

### v12, krok 1: NBP (16:9, x2), obraz 1 = `u04-start-v10.jpg`

```text
Keep the exact same composition, camera and framing as image 1. Edit image 1: the door is already slightly open.

CHANGE:
- The single wooden door is pushed open inward about 20 centimeters, away from the camera, turning on its hinges at its left edge; the man's left hand is on the lever handle, pushing it.
- Through the narrow gap, a bright vertical sliver of warm golden morning daylight from inside the apartment, falling onto the terrazzo floor and the edge of the man's sleeve.

PRESERVE EXACTLY:
- The key in the lock, the brass handle, the door's shape, color and raised panels, its frame
- The man's identity, pose, back to the camera, right hand on the guitar strap, the guitar case, his clothes
- The woman in the left foreground seen from behind, her size and position
- The cardboard box on the floor, the two-tone walls, the window, the light switch
- Camera position, angle, lens, framing, colour grade, grain

ONLY CHANGE: the door slightly open with warm light in the gap. 100% identical otherwise.
```

### v12, krok 2: wideo (Omni 1.1 Flash, 8 s, x2), klatka startowa = wynik kroku 1, referencja = twarz Tomka

```text
Photorealistic cinematic video clip, continuing exactly from this starting image — same framing, lighting, stairwell. Single continuous take, no cuts. The camera is locked on a tripod and does not move.

The man keeps pushing the already open door with his left hand. The door swings slowly and fully open, inward into the apartment, and warm golden daylight from inside floods over him. He stays standing on the threshold with his back to the camera, then turns only his head over his left shoulder toward the woman and smiles softly with closed lips. Calm, everyday pacing — not rushed.

Keep his face, hairstyle and outfit consistent with the reference. The woman stays in the left foreground, seen from behind, for the whole clip. Only these two people in the shot. Keep the key in the lock, the cardboard box on the floor by his feet, the green-and-cream walls and the window exactly as they appear in the starting image. Quiet stairwell sound, the creak of the door, no music, no speech.
```

**Wyniki „najlepsze” (11.10, dwa klipy autora, 8 s, 1280×720):**
- **Klip A (z pudłami w środku):** ✅ drzwi otwierają się w 1–2 s. Tomek zostaje w progu z dłonią na pasku gitary, odwraca głowę, potem tułów, i lekko się uśmiecha (0:05–0:08). Pudło na korytarzu stoi cały czas, Ania jest stała, kamera prawie nieruchoma. ❌ W mieszkaniu stoją dodatkowe pudła (0:02–0:08). Nie pasują do historii, bo pudło przy stopie ma być całym dobytkiem Tomka. Drzwi otwierają się na korytarz, a nie do środka (wygląda naturalnie, można zostawić). Brak ciepłego światła z mieszkania. **Faworyt do u04 po usunięciu pudeł w środku.**
- **Klip B:** ✅ drzwi się otwierają, gra jest bardzo naturalna (przytrzymuje drzwi dłonią), a w 0:07–0:08 ma szczery uśmiech do Ani. ❌ Od 0:03 odwraca się całym ciałem i idzie w stronę Ani, czyli od drzwi. To kłóci się z u05 (wnosi pudło do środka). Gubi też dłoń na pasku. Zapas albo alternatywa („wraca po nią”).
- Usuwanie pudeł w klipie A: najpierw „Edytuj” we Flow z promptem o pustym przedpokoju. Naklejka w ffmpeg jest trudna, bo Tomek częściowo je zasłania, a wnętrze widać dopiero po otwarciu drzwi.

**Usunięcie pudeł z klipu A (11.10, Claude, bez AI do obrazów):** ✅ Czyste tło przedpokoju zbudowane ręcznie z klatki 4,0 s (`referencje/u04-klipA-tlo-bez-pudel.png`): drzwi przedłużone poziomo, ościeżnica pionowo, listwa i podłoga dorysowane. Łatka nakładana na każdą klatkę z kompensacją dryfu kamery (phase correlation, do 8 px). Tomek chroniony maską z segmentacji osoby (MediaPipe selfie_multiclass), bo jego dłoń i spodnie mają kolor kartonu. Skrzydło drzwi chronione warunkiem „ciemniejsze od tła”. Wynik u autora: `u04_klipA_bez_pudel.mp4` (8 s, oryginalny dźwięk). Technika do powtórzenia przy statycznej kamerze.

**v13 (11.10): ściśle według skilla `cinedance` (umowa z autorem).** Klatka startowa = `u04-start-v10.jpg`. Nowości względem v10: LOCATION MAP opisuje, co jest za drzwiami (pusty, jasny przedpokój), bo bez tego model nie otwierał drzwi. Kamera „locked off… no drift”, Tomek „stays on the threshold”, „turns only his head… torso still facing the doorway”, pudło jako stały element blokady przestrzennej.

```text
SCENE CONTEXT
Late morning on the landing of an old Polish tenement. A young man opens the door of his girlfriend's small apartment, stops on the threshold and turns his head to smile at her. A quiet moment that means he is moving in.

ACTIVE REFERENCES
@TOMEK: early 30s lean man, tousled dark brown hair, short stubble, dark teal overshirt over a white t-shirt, khaki chinos, brown suede sneakers, black soft guitar case on his back, right hand holding the guitar strap at his chest, left hand on the brass lever handle. Calm, quietly moved. 100% matches the reference.
@ANIA: early 30s slim woman, wavy shoulder-length dark brown hair with caramel ends, cream linen overshirt. Seen only from behind. 100% matches the reference.

LOCATION MAP
Camera stands on the landing, 3 meters from the apartment door, facing it. Foreground screen-left: @ANIA's back, shoulder and hair. Midground center: @TOMEK at the door. Background: the single tall dark-brown wooden door with raised panels, hinges on its left edge, brass lever handle on its right edge, a small brass key inserted in the lock below the handle. Walls in two-tone paint, glossy bottle green below and worn cream above, worn terrazzo floor. A tall stairwell window off-screen camera-left. Behind the door: a small bright entrance hall with cream walls, light wooden floor and a closed white interior door, empty and tidy.

FIRST FRAME AND SPATIAL BLOCKING
The video starts exactly from the provided start frame: same camera, same framing, same positions. The first visible frame already contains both characters in place.
@TOMEK stands within 30 centimeters of the door, back to the camera, torso facing the door, left hand on the lever handle, right hand on the guitar strap at his chest.
@ANIA stands 2 meters behind him, closest to the camera, her back and hair filling the left third of the frame. Her body and eyes face @TOMEK for the whole shot; her face is never visible.
A single closed cardboard moving box, plain brown and sealed with tape, stands on the floor within 50 centimeters of @TOMEK's right foot for the whole shot.

FORMAT MODE
Single continuous take. Real-time motion. No cuts.

OPTICS
47° diagonal field of view, standard normal lens character, camera 3 meters from @TOMEK, natural human-eye perspective. Zero obvious distortion, natural body proportions, @ANIA soft in the foreground, @TOMEK and the door in sharp focus.

CAMERA
Over-the-shoulder shot from behind @ANIA at her head height. Camera locked off on a tripod for the whole shot, no drift, no push-in. @ANIA holds the left third, @TOMEK and the door hold the center-right.

ACTION TIMING
0:00 to 0:01: @TOMEK presses the lever handle down with his left hand; a soft metallic clack.
0:01 to 0:03: He pushes with the same hand; the single wooden door swings slowly and fully open, inward into the apartment, turning on its left-edge hinges. The bright empty entrance hall appears behind it. The key stays in the lock and travels with the door.
0:03 to 0:04: He lets go of the handle and stays standing on the threshold, back to the camera, looking into the apartment for one breath.
0:04 to 0:06: He turns only his head over his left shoulder toward @ANIA, eyes first, torso still facing the doorway; a slow closed-lip smile spreads.
0:06 to 0:08: He holds her gaze with the smile; @ANIA's shoulders drop with a quiet laugh. He stays on the threshold until the end.

PHYSICS
The heavy old door has real mass and stiff hinges: it starts slowly, swings evenly and settles against its stop. The guitar case shifts slightly with his head turn. His feet stay planted on the threshold. Dust motes float in the daylight from the doorway.

LIGHTING
Cool soft daylight from the stairwell window camera-left fills the landing. As the door opens, warm golden daylight from the apartment spills through the doorway onto @TOMEK's chest and the side of his face, the only warm light in the frame. No flat front light.

AUDIO
Quiet stairwell echo, the clack of the lever handle, the creak of old hinges, @ANIA's soft laugh. No music, no voices, no subtitles. Neither of them speaks; his lips stay closed.

POSITIVE CONSTRAINTS
Exactly two people in frame. The door stays one single wooden door of the same shape, size and color; only its opening angle changes. The box stays on the floor by his foot. Natural skin texture, real fine film grain, stable picture, no flickering.
```

**Wyniki v13 (11.10, 2 klipy):** drzwi się otwierają, Tomek zostaje w progu i się uśmiecha (✅), ale za drzwiami jest **puste, nieumeblowane mieszkanie**, a to nie pasuje do autora. Winne jest „empty and tidy” w LOCATION MAP: model zrozumiał to jako pustostan. **Klip ze starego promptu:** wyszedł, ale przy otwieraniu (1,5–2,6 s) widać **drugi klucz po wewnętrznej stronie drzwi**.
**v13b:** tylko blokada klucza (jeden klucz od strony klatki, od środka sama klamka i pusta dziurka). Zmiana wnętrza czeka na decyzję autora.

```text
SCENE CONTEXT
Late morning on the landing of an old Polish tenement. A young man opens the door of his girlfriend's small apartment, stops on the threshold and turns his head to smile at her. A quiet moment that means he is moving in.

ACTIVE REFERENCES
@TOMEK: early 30s lean man, tousled dark brown hair, short stubble, dark teal overshirt over a white t-shirt, khaki chinos, brown suede sneakers, black soft guitar case on his back, right hand holding the guitar strap at his chest, left hand on the brass lever handle. Calm, quietly moved. 100% matches the reference.
@ANIA: early 30s slim woman, wavy shoulder-length dark brown hair with caramel ends, cream linen overshirt. Seen only from behind. 100% matches the reference.

LOCATION MAP
Camera stands on the landing, 3 meters from the apartment door, facing it. Foreground screen-left: @ANIA's back, shoulder and hair. Midground center: @TOMEK at the door. Background: the single tall dark-brown wooden door with raised panels, hinges on its left edge, brass lever handle on its right edge, a single small brass key inserted from the landing side in the lock below the handle. The inner side of the door has only a plain lever handle and an empty keyhole. Walls in two-tone paint, glossy bottle green below and worn cream above, worn terrazzo floor. A tall stairwell window off-screen camera-left. Behind the door: a small bright entrance hall with cream walls, light wooden floor and a closed white interior door, empty and tidy.

FIRST FRAME AND SPATIAL BLOCKING
The video starts exactly from the provided start frame: same camera, same framing, same positions. The first visible frame already contains both characters in place.
@TOMEK stands within 30 centimeters of the door, back to the camera, torso facing the door, left hand on the lever handle, right hand on the guitar strap at his chest.
@ANIA stands 2 meters behind him, closest to the camera, her back and hair filling the left third of the frame. Her body and eyes face @TOMEK for the whole shot; her face is never visible.
A single closed cardboard moving box, plain brown and sealed with tape, stands on the floor within 50 centimeters of @TOMEK's right foot for the whole shot.

FORMAT MODE
Single continuous take. Real-time motion. No cuts.

OPTICS
47° diagonal field of view, standard normal lens character, camera 3 meters from @TOMEK, natural human-eye perspective. Zero obvious distortion, natural body proportions, @ANIA soft in the foreground, @TOMEK and the door in sharp focus.

CAMERA
Over-the-shoulder shot from behind @ANIA at her head height. Camera locked off on a tripod for the whole shot, no drift, no push-in. @ANIA holds the left third, @TOMEK and the door hold the center-right.

ACTION TIMING
0:00 to 0:01: @TOMEK presses the lever handle down with his left hand; a soft metallic clack.
0:01 to 0:03: He pushes with the same hand; the single wooden door swings slowly and fully open, inward into the apartment, turning on its left-edge hinges. The bright empty entrance hall appears behind it. The one brass key stays in the outer lock and travels with the door; when the door edge turns toward the camera, the inner side shows only the handle and an empty keyhole, no second key.
0:03 to 0:04: He lets go of the handle and stays standing on the threshold, back to the camera, looking into the apartment for one breath.
0:04 to 0:06: He turns only his head over his left shoulder toward @ANIA, eyes first, torso still facing the doorway; a slow closed-lip smile spreads.
0:06 to 0:08: He holds her gaze with the smile; @ANIA's shoulders drop with a quiet laugh. He stays on the threshold until the end.

PHYSICS
The heavy old door has real mass and stiff hinges: it starts slowly, swings evenly and settles against its stop. The guitar case shifts slightly with his head turn. His feet stay planted on the threshold. Dust motes float in the daylight from the doorway.

LIGHTING
Cool soft daylight from the stairwell window camera-left fills the landing. As the door opens, warm golden daylight from the apartment spills through the doorway onto @TOMEK's chest and the side of his face, the only warm light in the frame. No flat front light.

AUDIO
Quiet stairwell echo, the clack of the lever handle, the creak of old hinges, @ANIA's soft laugh. No music, no voices, no subtitles. Neither of them speaks; his lips stay closed.

POSITIVE CONSTRAINTS
Exactly two people in frame. The door stays one single wooden door of the same shape, size and color; only its opening angle changes. Exactly one key in the whole shot, on the landing side of the door. The box stays on the floor by his foot. Natural skin texture, real fine film grain, stable picture, no flickering.
```

## ✅ DECYZJA (11.10): ujęcie 4 = klip B
Autor kończy walkę z promptami. Do montażu idzie **klip B** (plik u autora: `446292864_1791729881951863.mp4`, 8 s). Sprawdzone: w drzwiach jest jeden klucz (od strony klatki), jedno pudło na korytarzu, a w mieszkaniu nie ma pudeł. Tomek otwiera drzwi, przytrzymuje je, odwraca się całym ciałem i robi krok w stronę Ani. Kończy z uśmiechem przy progu, obok pudła.
**Ciągłość z u05 (zmiana 11.10):** podniesienia pudła nie pokazujemy, bo wypada w cięciu. u05 zaczyna się w pokoju (widok od okna): Tomek stoi w progu białych drzwi z pudłem w rękach i gitarą na plecach.
Decyzja autora: **klipu nie przycinamy** (zostaje 8 s).

**Ustawienia:** Film · 16:9 · 720p · x1 · 8 s · Omni 1.1 Flash. W montażu tniemy do 7,5 s.
**Referencje:** `@TOMEK` = `referencje/tomek.png`, `@ANIA` = `referencje/ania.png`.
**Technika:** jedno ujęcie, 47°, przez ramię Ani. Tomek otwiera kluczem drzwi kawalerki i z uśmiechem odwraca się do Ani. Bez dialogu.
**Ciągłość:**
- ten sam mosiężny klucz na małym kółku co w ujęciach 2 i 3,
- strój jak w klipach 01 i 02,
- Tomek ma na plecach gitarę w miękkim pokrowcu, a przy stopie stoi jedno pudło, bo w ujęciu 5 wnosi oba do środka (pudło = cały jego dobytek, „nie pytam, co będzie dalej”). Podniesienie pudła wypada w cięciu między u04 a u05.

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
