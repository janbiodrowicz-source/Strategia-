# Ujęcie 2: Ania z kluczem o świcie (0:07,5–0:15)

**Wynik (9.10):** ✅ **działa** (Omni 1.1 Flash, 8 s, przycięte do 0:00–7,5). Ania zgodna z referencją (piegi, kolczyk, strój), lampka z abażurem, zioła, zamknięte okno, ochrowa ściana za oknem. Klucz mały i mosiężny, gest pięści przy brodzie i uśmiech na końcu wyszły.
**Słabość:** tło za ostre jak na 18°, podobnie jak w klipie 02. Model zrobił zwykły kadr, a lampka jest ostra. Światło też jest cieplejsze niż niebieski świt. Do montażu wystarczy.
**Technika:** jedno ujęcie, teleobiektyw 18°, statyczna kamera, Ania przy oknie kuchni, w kadrze naraz dłonie z kluczem i twarz. Bez dialogu (gra piosenka). Generujemy **8 s**, w montażu tniemy do 7,5 s.
**Referencje:** `@ANIA` = `referencje/ania.png`. Opcjonalnie klatka kuchni z klipu 01 jako lokacja.
**Ciągłość:**
- z ujęciem 1: to jest to zapalone okno. Kremowe firanki i mała lampka z białym abażurem, na zewnątrz niebieski świt.
- z klipem 01 (ujęcie 3): ten sam strój Ani i ten sam mosiężny klucz na małym kółku.

```text
SCENE CONTEXT
Dawn in a small tenement kitchen. A young woman stands alone at the window, awake before everyone else, turning a single brass key in her fingers. She is about to give it to the man she loves and is nervous about it.

ACTIVE REFERENCES
@ANIA: early 30s slim woman, wavy shoulder-length dark brown hair with caramel ends, light freckles, small gold stud earring, cream linen overshirt with rolled sleeves over a mustard t-shirt. Nervous and hopeful. 100% matches the reference.

LOCATION MAP
A small narrow kitchen in an old tenement. A tall old window with white wooden frames, closed, sheer cream curtains pulled to the sides. Outside, the cool blue dawn and the pale ochre wall of the courtyard. A small lamp with a white fabric shade stands on the windowsill, switched on, glowing warm. Green herbs in pots on the sill. The camera stands on the opposite side of the kitchen, 4 meters from the window.

FIRST FRAME AND SPATIAL BLOCKING
The first visible frame already contains @ANIA at the window, framed from the chest up, the key already in her hands. No empty establishing frame.
@ANIA stands screen-right of the window, her body in three-quarter profile facing screen-left, her face turned down toward her hands.
Both hands are raised in front of her chest at chin height. A single small brass key on a small metal ring lies between her thumb and fingers.
The window and the lamp sit behind her on screen-left, softly out of focus.

FORMAT MODE
Single continuous take. Real-time motion. No cuts.

OPTICS
18° diagonal field of view, classic telephoto lens character, camera 4 meters from @ANIA. Close framing achieved through lens reach, not physical proximity. Strong background compression: the window, curtains and lamp sit close behind her and dissolve into soft cool-blue and warm-amber bokeh. Razor focus on her eyes, the key and her fingers stay sharp within the same focal plane. No part of this shot becomes wide-angle or normal-lens coverage.

CAMERA
Camera locked on a tripod at her eye level, static. Medium close-up from the chest up: her face holds the right third of the frame, her hands with the key sit in the lower center. Rule of thirds.

ACTION TIMING
0:00 to 0:02: @ANIA turns the key slowly between her thumb and fingers, eyes fixed on it.
0:02 to 0:04: Her eyes flick up toward screen-left, toward the room where he sleeps, a quick blink burst, then back down to the key.
0:04 to 0:05.5: She closes her fingers around the key and presses her closed fist lightly against her chin.
0:05.5 to 0:08: She lets out a long slow breath through slightly parted lips; her shoulders drop; a small hopeful half-smile appears and stays.

PERFORMANCE
@ANIA is a woman who acts first and worries later, and now the worrying has caught up with her. Her posture is a little too still, weight on one leg. The key is her fidget: thumb rubbing its teeth, turning it over and back. Her eyes are alive and wet, catchlights from the window, quick blink bursts each time the thought of him arrives. The exhale is the decision: tension leaves her shoulders first, then the half-smile comes, nervous and certain at the same time. No words.

PHYSICS
The key is small, light and metal: it catches a warm glint from the lamp as it turns, and her fingertips press slightly into it. Loose strands of her hair move with the breath. The linen overshirt shifts softly as her shoulders drop. The curtains and the window stay completely still.

LIGHTING
Two sources only. Cool soft blue dawn light from the window behind her on screen-left draws a thin cold rim along her hair and cheek. The small lamp on the sill adds a warm amber glow on the side of her face and on the key. The face is low-key and soft, the shadow side readable. Palette: 60% cool dawn blue, 30% soft cream and skin tones, 10% warm amber from the lamp and the brass key. No flat front light, no studio key.

AUDIO
Quiet kitchen room tone, a faint distant tram outside, the tiny metallic click of the key ring, her long exhale. No music, no voices, no subtitles.

POSITIVE CONSTRAINTS
Exactly one person in frame. The key stays one small brass key on a ring, the same size in every frame. Natural skin texture with freckles, real fine film grain, stable picture, no flickering.
```

**Na co patrzeć:**
- Klucz ma być jeden, mały i mosiężny, i nie może zmieniać rozmiaru.
- Spojrzenie w lewo w 0:02 to Tomek, który jeszcze śpi. Jeśli model obróci całą głowę, dopisz „eyes move, head stays still”.
- Tło ma być rozmyte (18°). Jeśli wyjdzie ostre jak w klipie 02, wzmacniamy rozmycie.

## v2 (12.10): ta sama Ania, nowa kuchnia (ciągłość z u03 i u06)

**Problem:** w u03 (nowa wersja) i u06 kuchnia wygląda inaczej: nowoczesne białe okno bez firanek, ochrowa kamienica z balkonem, zioła w terakotowych doniczkach, jasne drewniane szafki. W u02 jest stare okno ze szprosami, długie firanki i szara ściana za oknem.
**Uwaga do starego klipu:** w 5,5–6,0 s Ania rusza ustami, jakby coś mówiła.

### Krok 1: klatka startowa (NBP, edycja tła)
**Ustawienia:** Flow · NBP · **16:9** · 2k · x4. Obraz 1 = `referencje/u02-klatka-stara-kuchnia.png` (klatka 0,5 s ze starego u02, 1920×1080), obraz 2 = `referencje/u03-start-rano.jpg` (wzór kuchni).

```text
Edit image 1: keep the woman exactly as she is and change only the kitchen behind her so it becomes the kitchen from image 2, at blue dawn.

CHANGE (background only):
- The window behind her on the left becomes the window from image 2: a modern white window frame with a single plain white sash, no curtains at all. Through it, the pale ochre tenement facade across the courtyard from image 2, with its small balcony, in cool blue pre-dawn light, the sky still dim.
- On the windowsill: the green herbs in terracotta pots from image 2, and the same small table lamp with a white fabric shade, switched on, glowing warm.
- The long cream curtains are removed; continuous warm-white wall and window frame in their place.
- On the right behind her: the light honey-wood kitchen cabinets and the pale cream wall tiles from image 2.

PRESERVE EXACTLY:
- The woman: face, freckles, gold stud earring, hair, expression, eyes lowered, lips closed
- Her cream linen overshirt and mustard t-shirt, every fold
- Both hands and the small brass key between her fingers, exact position
- Her position, size and profile in frame, camera position, lens and framing of image 1
- The warm lamp glow on her face, the soft depth of field, colour grade, grain

ONLY CHANGE: the kitchen background to the one from image 2. 100% identical otherwise.
```

**Na co patrzeć:** okno bez firanek, ochrowa kamienica za oknem, lampka zapalona, Ania i klucz bez zmian. Zapisz jako `referencje/u02-start-nowa-kuchnia.jpg`.
**Krok 2:** animacja od tej klatki (prompt po akceptacji klatki).

**Wynik kroku 1 (12.10, NBP):** 3 warianty, wszystkie 768p. Nowa kuchnia ✅ (okno bez firanek, ochrowa kamienica z balkonami, zioła, zapalona lampka, miodowe szafki). Minusy: NBP lekko oddalił kadr (Ania mniejsza niż w oryginale), tło ostrzejsze niż przy 18°. Wybór: **wariant 1** (Ania najbliżej oryginalnego kadru), wariant 3 odpada (Ania za mała). Zapis jako `referencje/u02-start-nowa-kuchnia.jpg`.

### Krok 2: wideo (Omni 1.1 Flash · 16:9 · 8 s · x2), klatka startowa = wariant 1, `@ANIA` = `ania.png`
Zmiany względem v1: kuchnia z klatki startowej, 29° zamiast 18° (klatka jest szersza, nie walczymy z nią), wydech **nosem, usta zamknięte** (w v1 rozchylone usta wyglądały jak mówienie).

```text
SCENE CONTEXT
Dawn in a small tenement kitchen. A young woman stands alone at the window, awake before everyone else, turning a single brass key in her fingers. She is about to give it to the man she loves and is nervous about it.

ACTIVE REFERENCES
@ANIA: early 30s slim woman, wavy shoulder-length dark brown hair with caramel ends, light freckles, small gold stud earring, cream linen overshirt with rolled sleeves over a mustard t-shirt. Nervous and hopeful. 100% matches the reference.

LOCATION MAP
A small narrow tenement kitchen. Behind her on screen-left, a modern white window with no curtains; outside, the pale ochre tenement facade with small balconies across the courtyard in cool blue dawn light. On the windowsill, green herbs in terracotta pots and a small lamp with a white fabric shade, switched on, glowing warm. On screen-right behind her, light honey-wood kitchen cabinets and pale cream wall tiles. The camera stands on the opposite side of the kitchen, 4 meters from the window.

FIRST FRAME AND SPATIAL BLOCKING
The video starts exactly from the provided start frame: same camera, same framing, same positions. The first visible frame already contains @ANIA at the window with the key in her hands. No empty establishing frame.
@ANIA stands screen-right of the window, her body in three-quarter profile facing screen-left, her face turned down toward her hands.
Both hands are raised in front of her chest. A single small brass key lies between her thumb and fingers.

FORMAT MODE
Single continuous take. Real-time motion. No cuts.

OPTICS
29° diagonal field of view, short telephoto portrait lens character, camera 4 meters from @ANIA. Close framing achieved through lens reach, not physical proximity. Razor focus on her face, her fingers and the key; the window, the facade and the lamp behind her stay softly out of focus, the lamp glowing as a warm bokeh shape. No part of this shot becomes wide-angle coverage.

CAMERA
Static camera at her eye level, fixed frame for the whole shot, no drift, no push-in. The image is the camera's point of view; the camera itself is never visible. Her face holds the right third of the frame, the window and the lamp the left third. Rule of thirds.

ACTION TIMING
0:00 to 0:02: @ANIA turns the key slowly between her thumb and fingers, eyes fixed on it.
0:02 to 0:04: Her eyes flick up toward screen-left, toward the room where he sleeps, a quick blink burst, then back down to the key. Her head stays still; only the eyes move.
0:04 to 0:05.5: She closes her fingers around the key and presses her closed fist lightly against her chin.
0:05.5 to 0:08: She takes one long slow breath out through her nose, lips closed; her shoulders drop; a small closed-lip hopeful half-smile appears and stays.

PERFORMANCE
@ANIA acts first and worries later, and now the worrying has caught up with her. Her posture is a little too still. The key is her fidget: thumb rubbing its teeth, turning it over and back. Her eyes are alive, catchlights from the window, quick blink bursts each time the thought of him arrives. The exhale is the decision: tension leaves her shoulders first, then the half-smile comes, nervous and certain at the same time. She does not speak; her lips stay closed for the whole shot.

PHYSICS
The key is small, light and metal: it catches a warm glint from the lamp as it turns, and her fingertips press slightly into it. Loose strands of her hair move with the breath. The linen overshirt shifts softly as her shoulders drop. The window, the plants and the lamp stay completely still.

LIGHTING
Two sources only. Cool soft blue dawn light from the window behind her on screen-left draws a thin cold rim along her hair and cheek. The small lamp on the sill adds a warm amber glow on the side of her face and on the key. The face is low-key and soft, the shadow side readable. No flat front light, no studio key.

AUDIO
Quiet kitchen room tone, a faint distant tram outside, the tiny metallic click of the key, her slow breath. No music, no voices, no subtitles.

POSITIVE CONSTRAINTS
Exactly one person in frame. The key stays one small brass key, the same size in every frame. Natural skin texture with freckles, real fine film grain, stable picture, no flickering.
```
