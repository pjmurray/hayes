# HAYES — Brand Bible

> Canonical source of truth for the HAYES parody luxury brand project.
> Every decision below is locked. Do not re-litigate without explicit approval.
> Read this file first before touching any copy, image, or code in this directory.

---

## 1. The Concept

A single-page site for a fictional Silicon Valley luxury fashion house, so faithfully rendered that a first-time visitor spends 30 seconds wondering if it's real before they catch the gag.

The collection is a **fashion taxonomy of 2026 Silicon Valley archetypes**, treated with total reverence. No winks. No meta. The medium (high-fashion lookbook) is the punchline. The deadpan is the craft.

---

## 2. Brand

### Name
**HAYES.** Single word. Hayes Valley reference — local tech money will decode it; outsiders read it as a generic English surname brand.

### Positioning
Quiet luxury. An independent house, limited runs, no wholesale. A study in restraint.

### Voice rules (lock)
- Present tense. Declarative. No contractions.
- One idea per sentence.
- Adjectives earn their place or die.
- Em dashes allowed. Exclamation marks banned.
- Never winks. Never acknowledges the joke.
- Numbers as numerals (8, 2024) except when the sentence demands a word.

### What we must not do
- No SaaS-speak. No startup-founder swagger. No references to tech by name.
- No humor visible in the voice. Humor lives in juxtaposition of reverent copy + absurd subject.
- No emoji. No icons. No illustration. Photography only.
- No accent color. No gradient. No hover animations beyond a barely-perceptible scale.
- No cookie banner, no chat bubble, no newsletter popup.

---

## 3. Founder

Unnamed and unsearchable by design. The house speaks; no individual is credited.

---

## 4. Campaign

**A SEASON OF CONVICTION — SUMMER 2026**

The debut summer collection. Nine looks, eight public (one swap pending — see §6). Each look presents a 2026 Silicon Valley archetype as a named garment set, photographed in the style of Jamie Hawkesworth on Kodak Portra 400.

### Manifesto (final copy, sits below hero)

> HAYES is founded on the premise that restraint is the last remaining luxury.
>
> Each garment is cut once, pressed for fourteen days, and finished by hand in San Francisco and Kyoto. Production is limited. There is no wholesale. There is no second line. The house makes what it believes in, in the quantities it can afford to stand behind.

### Standing credit line (top of collection section)

*Cast on location in San Francisco. No models were retained.*

---

## 5. Visual System

### Typography

| Role | Font | Source | Notes |
|---|---|---|---|
| Display serif | **Fraunces** (variable, 9..144 opsz) | Google Fonts | Wordmark, look names, manifesto. |
| Body sans | **General Sans** (400, 500) | Fontshare | Nav, captions, body. |
| Fine print / mono | **JetBrains Mono** (400) | Google Fonts | Footer, look numbers, location plates. |

### Size scale (desktop)

```
Wordmark HAYES:    22px  Fraunces, letter-spacing 0.08em
Nav links:         11px  General Sans, tracking 0.16em, all caps
Hero caption:      11px  General Sans, tracking 0.22em
Manifesto:         22px  Fraunces italic
Section eyebrow:   10px  General Sans, tracking 0.22em, all caps
Look number:       10px  JetBrains Mono, tracking 0.12em
Look name:         40px  Fraunces 400
Garment line:      14px  General Sans
Campaign caption:  18px  Fraunces italic
Location plate:    10px  General Sans, tracking 0.22em
Model card body:   13px  General Sans
AFTER title:       72px  Fraunces 400, tracking 0.08em
Footer text:       10px  JetBrains Mono
```

### Color tokens

```css
--bone:          #F4F0E8;   /* primary background */
--ink:           #141414;   /* primary text */
--mist:          #8A8680;   /* secondary text, dividers */
--divider:       #E4DFD6;   /* hairlines only, 1px */
--ink-bg:        #0E0D0B;   /* AFTER section background */
--bone-on-ink:   #E8E2D6;   /* AFTER section text */
```

No accent color. Ever.

### Layout

- Container max-width: 1200px
- Side padding: `clamp(24px, 6vw, 96px)`
- Section vertical padding: `clamp(120px, 18vh, 200px)` top and bottom
- Hero: 100vh, full-bleed
- Look grid: single column, full-bleed image, caption card below centered max-width 480px

### Interaction

- Default cursor everywhere. No custom cursor.
- Images fade in on scroll, 600ms ease-out, 40px translate-up.
- Zero animation on text.
- Image hover: 1.01x scale over 400ms. Nearly imperceptible.
- Page load: hero first, manifesto fades in at +200ms.

---

## 6. The Collection — 8 Looks (locked)

### Decision: Solopreneur replaced with Funemployed

The final 8 anchors to San Francisco for brand coherence. Solopreneur (Bali) removed. **Funemployed (Dolores Park) takes Look 08.**

### The 8

| # | Look Name | Archetype (internal) | Location |
|---|---|---|---|
| 01 | **THE DRIFT** | Vibecoder | Ojai, CA |
| 02 | **THE VIGIL** | Researcher | Marin Headlands |
| 03 | **THE ASCENT** | Accelerationist | Ocean Beach, SF |
| 04 | **THE LAMENT** | Doomer | Berkeley |
| 05 | **THE ALTAR** | Agent Maxxer | Outer Sunset, SF |
| 06 | **THE HEIR** | Thiel Fellow | Hayes Valley, SF |
| 07 | **THE RAMPART** | Defense Tech | Mojave Desert, CA |
| 08 | **THE IDYLL** | Funemployed | Dolores Park, SF |

### Per-look detail

#### LOOK 01 — THE DRIFT
- **Campaign caption:** *"Shipping has never felt so effortless."*
- **Location plate:** OJAI, CALIFORNIA — AUGUST
- **Garments:**
  - Terry cloth polo in lemon.
  - Pleated cotton short in bone.
  - Low-top canvas trainer in white and blue.
- **Model card:**
  - Kyle Park, 22
  - Founder
  - North Beach, San Francisco
  - Height 5'11". Wearing the Drift polo in M. The Drift short in IT 46.
  - *Ships thirty times a day.*

#### LOOK 02 — THE VIGIL
- **Campaign caption:** *"A quieter intelligence."*
- **Location plate:** MARIN HEADLANDS — JULY
- **Garments:**
  - Unlined overcoat in camel wool.
  - Heather undershirt in combed cotton.
  - Wide-leg trouser in chocolate wool.
- **Model card:**
  - Anjali Srinivasan, 28
  - Research scientist, interpretability
  - The Mission, San Francisco
  - Height 5'8". Wearing the Vigil overcoat in L. The Vigil undershirt in M. Trouser in IT 46.
  - *Declines to disclose her h-index.*

#### LOOK 03 — THE ASCENT
- **Campaign caption:** *"Techno-capital. Upward."*
- **Location plate:** OCEAN BEACH, SAN FRANCISCO — JUNE
- **Garments:**
  - The Ascent short in faded technical jersey.
  - Rubber slide in matte black.
- **Model card:**
  - Braden Marshall, 29
  - Founder, micro-fund general partner
  - Cow Hollow, San Francisco
  - Height 6'1". Wearing the Ascent short in IT 48.
  - *Posts under three names.*

#### LOOK 04 — THE LAMENT
- **Campaign caption:** *"A season of reflection."*
- **Location plate:** BERKELEY, CALIFORNIA — JULY
- **Garments:**
  - Heavyweight crewneck in washed oat.
  - Drawstring trouser in unbleached linen.
  - Footbed sandal in caramel suede.
- **Model card:**
  - Felix Albright, 31
  - Independent researcher
  - Elmwood, Berkeley
  - Height 5'10". Wearing the Lament crew in XL. Trouser in IT 50.
  - *No longer posts publicly.*

#### LOOK 05 — THE ALTAR
- **Campaign caption:** *"Twenty-eight agents. One conductor."*
- **Location plate:** OUTER SUNSET, SAN FRANCISCO — JUNE
- **Garments:**
  - The Altar tee in fine-gauge airism cotton.
  - Pleated trouser in technical wool.
  - Recovery slipper in matte black.
- **Model card:**
  - Ivan Rothkopf, 26
  - Senior engineer, stealth
  - Potrero Hill, San Francisco
  - Height 6'0". Wearing the Altar tee in M. Trouser in IT 48.
  - *Twenty-eight concurrent agents. Seven hours of sleep.*

#### LOOK 06 — THE HEIR
- **Campaign caption:** *"Deferred, indefinitely."*
- **Location plate:** HAYES VALLEY, SAN FRANCISCO — JULY
- **Garments:**
  - The Heir trouser in heavyweight cotton twill, navy.
  - Combed cotton tee in red.
  - Low-top leather trainer in white.
- **Model card:**
  - August Okafor, 19
  - Founder, YC W26
  - Alamo Square, San Francisco
  - Height 5'9". Wearing the Heir trouser in IT 44. Tee in S.
  - *Deferred Stanford indefinitely.*

#### LOOK 07 — THE RAMPART
- **Campaign caption:** *"A return to deterrence."*
- **Location plate:** MOJAVE DESERT, CALIFORNIA — AUGUST
- **Garments:**
  - The Rampart jacket in waxed cotton, sage.
  - Heavyweight tee in white.
  - Technical jogger in coyote tan.
  - Leather mountain boot in waxed gold-brown.
- **Model card:**
  - Silas Tyler, 32
  - Founding engineer
  - The Presidio, San Francisco
  - Height 6'2". Wearing the Rampart jacket in L. Joggers in IT 50.
  - *Holds a TS/SCI clearance.*

#### LOOK 08 — THE IDYLL
- **Campaign caption:** *"In repose."*
- **Location plate:** DOLORES PARK, SAN FRANCISCO — A TUESDAY IN JULY
- **Garments:**
  - The Idyll overshirt in bleached linen, straw.
  - Vintage cotton tee in faded persimmon.
  - Fatigue trouser in faded navy.
  - Suede footbed sandal in brown.
- **Model card:**
  - Hugo Arden, 34
  - Between things
  - Noe Valley, San Francisco
  - Height 5'11". Wearing the Idyll overshirt in L. Trouser in IT 48.
  - *Angel-invests. Rescued the dog.*

---

## 7. Image Prompts — locked

Shared style lock for every prompt: medium-format editorial photograph in the style of Jamie Hawkesworth, Kodak Portra 400, Hasselblad 500CM, 4:5 vertical, soft grain, no digital sharpening, no smile ever.

### Status tracker

| Look | Status | Notes |
|---|---|---|
| 01 THE DRIFT | ✅ shipped | Generated via script, wired into hero + collection slot |
| 02 THE VIGIL | ✅ shipped | Generated via script, wired into collection slot |
| 03 THE ASCENT | ✅ shipped | Generated via `scripts/generate-looks.mjs`, wired into index.html |
| 04 THE LAMENT | ✅ shipped | Generated via script, wired in |
| 05 THE ALTAR | ✅ shipped | v2 altar composition, wired in (acceptable; could regen for more distance) |
| 06 THE HEIR | ✅ shipped | Generated via script, wired in |
| 07 THE RAMPART | ✅ shipped | Generated via script, wired in |
| 08 THE IDYLL | ✅ shipped | Generated via script, wired in — standout of the set |

To regenerate any look: `node scripts/generate-looks.mjs --only NN --force`

### Prompt 01 — THE DRIFT

> Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400 with a Hasselblad 500CM. A 22-year-old lean East Asian man stands on a sun-bleached terracotta pool deck at a Spanish-revival bathhouse in Ojai, California, at 2pm on a cloudless August afternoon. He wears a lemon-yellow terry cloth polo with the top button undone, pressed pleated trouser shorts in bone, and low canvas trainers in white and blue, no socks. A pair of over-ear headphones in lunar blue rests around his neck. He holds a thin silver laptop pinched between thumb and forefinger at hip level, as if it were a small handbag. His expression is entirely neutral — lips closed, slight downward cast, eyes focused on a point past the camera's left shoulder. The pool is just out of frame; its chlorine-blue reflected light glances faintly on one side of his face. Overhead sun creates crisp high-contrast shadows on the tile. Palette: lemon, terracotta, chrome, pool blue. Composition: full-body, centered, generous negative space above the head, 4:5 aspect ratio. Soft Portra grain, natural skin texture, no digital sharpening. No smile. No visible logos. No photographer reflection. Editorial campaign mood, quiet and considered.

### Prompt 02 — THE VIGIL

> Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400 with a Hasselblad 500CM. A 28-year-old slender androgynous person with chin-length dark hair stands on the grassy Marin Headlands above San Francisco at the tail of golden hour, just before fog rolls over the ridge. They wear an oversized unlined camel overcoat, open, over a heather-grey crewneck undershirt; relaxed chocolate-brown wide-leg trousers; worn technical trail-runner sneakers in moss green. Thin silver wire-frame spectacles. A heavy natural-canvas tote bag hangs from the left shoulder, visibly overflowing with loose printed academic papers whose edges curl in the coastal wind. A matte black vape sits in the coat's breast pocket. They stand in three-quarter profile, one hand in the coat pocket, the other loosely on the tote strap. Gaze is steady and unblinking, as if watching for something to appear at the far edge of the ridge — not dreamy, but alert. Low sun grazes the cheekbone; wisps of incoming fog soften the far hills to pale lilac. Palette: sand, fog-grey, pale lilac, camel. Composition: full-body, subject centered, vast negative space of landscape and sky behind, 4:5 aspect ratio. Soft Portra grain, windblown hair, painterly atmospheric haze. No smile. No other people. No legible text on the papers. Editorial campaign mood, contemplative and uncannily still.

### Prompt 03 — THE ASCENT

> Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400 with a Hasselblad 500CM. A 29-year-old lean white man with a light tan and tousled mid-length sun-bleached hair stands on Ocean Beach in San Francisco at blue hour, a small driftwood bonfire burning in the sand a few feet behind him. He is shirtless, wearing only technical running shorts in faded olive green and matte black slides with white athletic socks pulled to mid-calf. A single fine silver chain rests at his collarbone. Orange-tinted wraparound sunglasses pushed up onto his forehead. In his right hand he holds a dog-eared paperback copy of *The Sovereign Individual* — title clearly legible on the spine — its pages slightly curling from the heat of the fire. Posture: weight on the back foot, arms uncrossed but held with intent, chest forward, chin raised toward the fading sun at the top of the frame, eyes still locked on the camera but the body angled as if mid-step forward and up. He is the only subject in the campaign who looks directly at the camera — defiant, unblinking. The fire throws warm amber rim light across his torso from behind; the blue-hour sky gives the rest of the scene a cold lavender-grey wash. Pacific visible to the right. Palette: ember orange, lavender dusk, driftwood grey, saltwater white. Composition: three-quarter body, subject centered, fire glow on the left edge, ocean on the right, 4:5 aspect ratio. Soft Portra grain, ocean-spray haze, long natural shadows. No smile. No other people. Editorial campaign mood, defiant and ascending.

### Prompt 04 — THE LAMENT

> Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400, Hasselblad 500CM. A 31-year-old pale, thin white man with limp ash-brown hair sits on the edge of an unmade low twin mattress on the floor of a garden-level basement apartment in Berkeley, California. A single bare incandescent bulb hangs from an exposed cord overhead; its warm tungsten glow is the only illumination. A small window near the ceiling admits a sliver of pale afternoon light that does not reach him. He wears a washed oat-beige cotton crewneck sweatshirt, two sizes too large, over unbleached linen drawstring trousers, with caramel suede footbed sandals worn over thick grey wool socks. A simple stainless-steel pill organizer with seven compartments sits on the concrete floor beside him, three compartments open, one capsule visible. A slim silver laptop rests closed on a stack of three library-bound hardbacks. Posture: seated forward, elbows on knees, hands loosely clasped, forehead tilted downward, eyes cast toward the floor. Expression: exhausted peace — resigned, not devastated. Walls cold off-white showing faint stains near the baseboards. Palette: oat, tungsten amber, cold basement-white, concrete grey. Composition: three-quarter body, subject in lower-center of frame, low ceiling and exposed pipes visible at the top, 4:5 aspect ratio. Soft Portra grain, preserved warm shadow detail, everything still. No smile. No other people. Editorial campaign mood, quietly resigned.

### Prompt 05 — THE ALTAR (v2 — the altar composition)

> Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400, Hasselblad 500CM. A 26-year-old white man of slender build stands in full side profile at a plain solid-oak desk in an almost empty room. One single large curved monitor sits on the desk, its screen glowing abstract soft cyan — not readable UI, just a wash of pale blue light. A steel tumbler on the desk collects slow drips from a small glass cold-brew tower mounted on a wooden stand above it — the one point of visual intrigue. Nothing else in the room. Matte warm-grey walls. A single warm desk lamp from above throws a narrow cone of amber light onto the top of his head and the desk surface. He wears a charcoal fine-gauge cotton crewneck tee, loose pleated black trousers, matte black house slippers. Blue-light filter glasses catch the cyan. A fitness band on the left wrist. He stands upright, arms loose at his sides, chin level, gaze fixed on the screen — still, unreadable, devotional. Cyan rim light crosses his chest and the side of his face; amber pools on his crown and shoulders. The rest of the room falls to deep black. Composition reads like a monk at an altar: subject full-body on the right third of frame, monitor and drip tower on the left, large negative space above. 4:5 aspect ratio. Soft Portra grain, deep preserved blacks, no shadow crushing. No smile. No readable screen content — monitor is abstract light only. No other screens. No clutter. Editorial campaign mood, ritualistic and devotional.

### Prompt 06 — THE HEIR

> Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400, Hasselblad 500CM. A 19-year-old visibly teenage lean mixed-race boy with a boyish face, no facial hair, and a low fade sits on a rust-painted iron fire escape attached to a 1920s brick Hayes Valley apartment building in San Francisco at early dusk. He wears dark navy heavyweight cotton work pants, a plain red cotton crewneck tee with no visible logo, a single fine gold Cuban link chain worn outside the shirt, one small gold stud earring, and white low-top sneakers with the top two eyelets unlaced. He sits with legs dangling through the iron railing, right elbow on right knee, left hand loosely holding a small matte black vape. A rolled-up print magazine rests on the grating beside him. He looks outward over the rooftops as if surveying a city he will come to own. Not at the camera. Not dreamy. Proprietary. Setting sun throws a warm rim light on the right side of his face; the brick behind him is deep rust, the iron escape chipped matte black. Distant city lights just beginning to blur on in the background. Palette: rust brick, matte black iron, navy, gold, warm skin. Composition: medium-wide shot, subject seated in the lower-left third of the frame, brickwork and sky filling the upper right, 4:5 aspect ratio. Soft Portra grain, slight atmospheric haze, no lens flare. No smile. No readable text on the magazine. No other people. Editorial campaign mood, young, quiet, proprietary.

### Prompt 07 — THE RAMPART

> Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400, Hasselblad 500CM. A 32-year-old lean, close-cropped dark-haired white man of Mediterranean complexion stands on hard-packed scrub somewhere in the California Mojave at blue hour, the last trace of sunset fading behind distant low hills. A single distant electrical transmission pylon punctuates the landscape to the far right; otherwise empty. He wears a waxed cotton jacket in sage olive, slightly oversized, over a plain white heavyweight cotton tee; tan technical joggers; and leather mountain boots in gold-brown waxed leather, laced tight. A narrow matte-black lanyard with a deliberately blurred laminated access badge hangs partway out of the jacket's breast pocket. He holds a rigid black cardboard blueprint tube lightly in his right hand at his side, brass cap visible. His left hand loosely holds a matte black pickup truck key fob, one finger through the ring. Posture: three-quarter profile to camera, stance wide and grounded, sentinel-like, chin slightly elevated, eyes fixed on the distant horizon — not at the camera, at what is beyond. Expression: quietly determined, unhurried. The sky graduates from deep indigo at the top to a low warm ember at the horizon. The last warm rim catches his jaw and the top of the blueprint tube. Desert floor reads cool violet in shadow. Palette: coyote tan, indigo, rust ember, waxed olive. Composition: full body, subject left-of-center, vast desert and sky filling the right half, 4:5 aspect ratio. Soft Portra grain, sharp atmospheric clarity, subtle warm-to-cool gradient. No smile. No readable text on the badge. No other people. No vehicles in frame. Editorial campaign mood, stoic and patriotic-adjacent.

### Prompt 08 — THE IDYLL

> Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400 with a Hasselblad 500CM. A 34-year-old lightly tan white man of medium build with short stubble just past a beard lies propped on his left elbow across a faded Mexican serape blanket in the dry summer grass of Dolores Park in San Francisco, late afternoon on a weekday. The sloping lawn descends toward the city to his right; Mission District rooftops, palm trees, and a hazy downtown skyline fill the distance, slightly overcast but bright. He wears a loose heavyweight vintage cotton tee in faded persimmon with a small chest pocket, visibly washed a hundred times, over which a crumpled linen overshirt in sun-bleached straw hangs unbuttoned and pushed off one shoulder. Loose fatigue trousers in faded navy, cuffed once above the ankle. Brown suede footbed sandals — one kicked off and lying on the grass beside him — bare feet. A natural canvas tote from a neighborhood bookshop rests near his hip, a folded magazine peeking out. A paperback of *Four Thousand Weeks* sits open face-down beside him, spine cracked. A mason jar of cold brew with a paper straw sweats on the blanket. His phone is placed screen-down on the blanket, deliberately out of reach. A small scruffy rescue dog — some terrier mix — is curled against his thigh, asleep. He wears vintage tortoiseshell sunglasses; his face is tilted slightly toward the sky, eyes nearly closed, jaw relaxed. A linen bucket hat in washed ecru rests on the blanket beside the book. Posture: fully reclined and unhurried — the only subject in the campaign who is horizontal. Late-afternoon sun filters through eucalyptus from the upper right, warm but not harsh. Other park-goers are only distant soft shapes far down the slope. Palette: faded persimmon, straw linen, dry park grass, Mission pastel. Composition: full body, subject reclined in the lower frame, park slope and skyline receding into the upper right, 4:5 aspect ratio. Soft Portra grain, hazy park dust catching the light, natural warmth. No smile. No other people near him. No visible phone screen. Editorial campaign mood, unhurried and quietly post-capital.

---

## 7.5. Availability (the store)

A deliberate tonal shift from the lookbook. The looks are named (THE DRIFT, THE VIGIL) — the products are reduced to the platonic noun, period included: `Hoodie.` `Vest.` `Tee.` The satire lives in the gap between the editorial drama and the clinical price tag.

**Rules:**
- Bare-noun naming. No "The." Period after each. Title case, serif display.
- Six objects only — HOODIE, FLEECE, TEE, CAP, TOTE, SNEAKER. The platonic SV wardrobe.
- Every object is `Sold out`. No exceptions.
- Three-line spec max per item: material, provenance, maker.
- Mono SKU underneath: `HAYES / SS26 / HOODIE / NAT / 003`
- Product photography: overhead flat-lay on bone linen surface, soft diffused upper-left window light with long shadow, no props / no hands / no models, 4:5 vertical, all objects in undyed natural palette (bone, ecru, tan). Generated via `scripts/generate-objects.mjs`. Shared style lock across all six = one set.
- Layout: 3-up grid on desktop, 2-up tablet, 1-up mobile.
- Single waitlist form at the bottom, one email field, fake-success state. No network call.

**Items (locked):**

| Name | Price | Spec |
|---|---|---|
| Hoodie. | $2,400 | Sanded loopback cotton, 22oz. Garment-dyed with natural indigo from Tokushima. Cut and seamed in Wakayama. |
| Vest. | $1,450 | Undyed Biella merino pile, 640gsm. Horn buttons. Made at a single atelier outside Bergamo. |
| Tee. | $480 | Suvin Gold long-staple cotton, 12oz. Hand-loomed in Ehime. Pressed fourteen days before finishing. |
| Cap. | $420 | Unwashed Japanese canvas. Vegetable-tanned strap from Santa Croce sull'Arno. No logo. |
| Tote. | $680 | Heavy natural duck canvas. Horsehide handles, hand-stitched. Made by a leather house in Porto. |
| Sneaker. | $1,850 | Full-grain Italian calf, Blake-stitched. Hand-patined. Natural rubber sole from Marche. |

**Section position:** Between Collection and Founder's Note. Nav label: `Availability`.

**Waitlist copy (locked):**
- Label: *"Join the list. We write when there is something to write about."*
- Success: *"You are on the list. We will write when there is something to write about."*

---

## 8. Atelier Section (final copy)

Appears as a vertical list of six lines, one per row, hairline divider between each.

- Every garment passes through the hands of four people.
- Seams are pressed for fourteen days before finishing.
- Buttons are sewn by hand. The house retains one buttonhole maker.
- The wool is milled in Biella. The cotton is spun in Kurashiki.
- No garment leaves the atelier within sixty days of being cut.
- All archival patterns are destroyed at the end of each season.

---

## 9. AFTER — The Fall Teaser (final copy, locked)

Appears in an inverted palette section — `--ink-bg` background, `--bone-on-ink` text. The visual shift signals difference without explanation.

### Section copy

> # AFTER
>
> HAYES Fall/Winter 2026
>
> [fog figure image]
>
> The summer collection was a question. The fall collection is its answer.
>
> These garments were cut in the weeks after a system arrived that cannot be uncut. They are offered as *"preparation, in the old sense of the word."* The house considers them a final statement.
>
> For those who understand, no further explanation is required.
>
> Unveiled 23 October 2026. Appointments open 1 September.
> The collection will not be repeated.

### Teaser image direction

Primary: a single figure, back to camera, walking into heavy coastal fog. Long unstructured charcoal wool overcoat, visible to the knee. No face, no context, no horizon — just fog swallowing them at the edges of frame. Same Hawkesworth/Portra register as the summer set. No overlaid text.

Fallback (if figure render fails): an empty oak bench in a bare white room, one folded cashmere garment resting on it, cold winter light through a single high window.

---

## 10. Appointments Section (final copy)

> **APPOINTMENTS**
>
> By appointment only.
>
> 541 Hayes Street, San Francisco, California.
>
> [hello@hayes.studio](mailto:hello@hayes.studio)

---

## 11. Press (optional — enables realism)

Three invented pull quotes near the manifesto. Using real publication names plausibly HAYES-adjacent.

> *"A refusal disguised as a collection."* — System Magazine
>
> *"The quietest debut of the season."* — The Financial Times, How To Spend It
>
> *"The house speaks with its seams."* — 032c

---

## 12. Footer (final copy)

Four-column grid, tiny mono type.

```
HAYES                        Kyoto Atelier                    Stockists                           EN / JA
541 Hayes Street             2-chome, Asakusa                 Represented in limited             
San Francisco, CA 94102      Kyoto 605-0001                   quantities at Dover Street
                                                               Market Ginza, H. Lorenzo
                                                               West Hollywood, and
                                                               The Armoury New York.

                             © HAYES 2026
```

---

## 13. Page Structure — section order

1. **Masthead** (sticky nav)
2. **Hero** — full-bleed LOOK 01 image, campaign title bottom-center
3. **Manifesto**
4. **Press** (three pull quotes)
5. **Collection** — 8 looks, full-bleed images + caption cards + model cards
6. **Founder's Note** — house bio (removed from live site)
7. **Atelier** — six production lines
8. **AFTER** — inverted palette Fall teaser
9. **Appointments**
10. **Footer**

---

## 14. Build Decisions — locked

| Question | Decision |
|---|---|
| Stack | Plain HTML + CSS + minimal JS. No framework. No build step. |
| Hosting | Vercel or Cloudflare Pages (drop-in when ready) |
| Fonts | Fraunces + JetBrains Mono (Google Fonts CDN), General Sans (Fontshare CDN) |
| Images | Placeholder divs with look-number labels until Gemini regens arrive |
| Directory | `.context/hayes-site/` (gitignored, out of main repo) |

### Why plain HTML, not Astro

Single page, no routing, no components to reuse, luxury brands must load instantly. Every framework adds complexity without upside. The site is ~5 files, deployable anywhere.

---

## 15. Open Questions

| # | Question | Status |
|---|---|---|
| A | Domain — `hayes.studio`, `houseofhayes.com`, or other? | PJ to pick |
| B | Who buys the domain? | PJ to decide |
| C | AFTER teaser image: fog figure vs. empty bench? | PJ to pick (default: fog figure) |
| D | THE ALTAR v2 regeneration | Pending — PJ to run prompt |
| E | THE HEIR regeneration — younger model | Pending — PJ to run prompt |
| F | THE LAMENT, RAMPART, IDYLL first generations | Pending — PJ to run prompts |
| G | THE ASCENT regeneration — reoriented gaze | Pending — PJ to run prompt |

---

## 16. Distribution (post-build, for later)

Notes only. Do not execute without explicit go.

- Quiet drop. No launch post. No announcement. The brand is discovered, not declared.
- Domain purchase via Cloudflare Registrar (cheap, no upsell).
- Post-launch seed: one tweet with the URL, no body copy. Let curiosity do the work.
- Do not seed in tech press. Seed in fashion-adjacent corners (Blackbird Spyplane readers, Throwing Fits, 032c).
- Longer-term: Series 2 looks (Climate Founder, Crypto Survivor, Devrel Influencer, Hacker House Dweller) if Series 1 hits.

---

*Last updated by this session. This document supersedes all earlier chat decisions. Future sessions: read this file first.*
