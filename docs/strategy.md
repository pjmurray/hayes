# HAYES — Launch Strategy

> Volume 01 · Summer MMXXVI
> Status: pre-drop
> Owner: PJ

A parody luxury menswear house. Every artifact is played straight. The site is the product. The drop is the joke. The joke works only if the execution is impeccable.

Site: [hayes.press](https://hayes.press) · Handle: **@hayesmmxxvi**

---

## Table of Contents

1. [Positioning](#positioning)
2. [Identity System](#identity-system)
3. [Launch Sequence](#launch-sequence)
4. [Twitter Strategy](#twitter-strategy)
5. [DM Targets](#dm-targets)
6. [Business Cards](#business-cards)
7. [Physical Distribution](#physical-distribution)
8. [Content Calendar](#content-calendar)
9. [Measurement](#measurement)
10. [Open Decisions](#open-decisions)

---

## Positioning

**What it is:** A fictitious heritage menswear brand — "HAYES" — with a lookbook, manifesto, antecedents archive, and zero product to buy. Presented with the full gravity of a real Volume 01 campaign.

**Why it works:** Played-straight parody of the restrained-luxury voice (Our Legacy, Fear of God, Aimé Leon Dore, Drake's, Jacques Marie Mage). The humor is in the commitment. Nothing winks.

**Wedge audience:** Design Twitter, typography nerds, menswear-literate people, the parody-aware corner of SF/Brooklyn/Kyoto who will recognize the genre and forward it.

**Success looks like:** A week of "is this real?" chatter. One or two menswear accounts share it unprompted. A fashion-adjacent newsletter picks it up. Cards surface in Sightglass and a photo ends up in someone's feed.

Full brand book: [`BRAND.md`](../BRAND.md)

---

## Identity System

One identity treatment across every surface — cards, banner, avatar, site masthead.

**Wordmark:** Fraunces, upright, weight 500, `opsz` 144, letter-spacing +0.02em, ink `#141414` on bone `#F4F0E8`.
**Voice (headlines, manifesto, prices):** Fraunces italic, same optical axes.
**Eyebrows & system text:** JetBrains Mono, 13px, uppercase, letter-spacing +0.28–0.32em, mist `#8A857A`.
**Body copy:** Fraunces regular, `#4A4540` (muted ink — softer than body ink but not washed out).

Palette: bone `#F4F0E8` · ink `#141414` · muted ink `#4A4540` · mist `#8A857A`.

All artwork rendered headless via Puppeteer at 2× density (`scripts/generate-cards.mjs`, `generate-banner.mjs`, `generate-avatar.mjs`). Fonts via Google Fonts; `document.fonts.ready` awaited before screenshot.

---

## Launch Sequence

Rough order of operations — each step depends on the previous being polished.

1. **Site final pass** — privacy page, analytics, `/api/inquire` working, all images regenerated. _(done)_
2. **Order business cards** — 200 × Moo Classic US, see [Business Cards](#business-cards). _(ship to Boulder)_
3. **QC + content photography** — shoot cards on linen, on magazine corner, in hand, on café table. Feed the launch tweets.
4. **Twitter account live** — `@hayesmmxxvi`, banner + avatar uploaded, bio set, 3–5 pre-loaded posts drafted.
5. **Mail ~150 cards to SF Airtasker** _(after QC)_, keep ~50 in Boulder for mail-outs, shows, hand-offs.
6. **SF café drop** — 5 cafés × 3–5 cards each, placed, not scattered. See [Physical Distribution](#physical-distribution).
7. **Launch week** — one considered post per day, 3–5 cold DMs per day to [DM Targets](#dm-targets).
8. **Measure** — who shares, who replies, where traffic comes from. Decide on Volume 02.

---

## Twitter Strategy

### Handle

**@hayesmmxxvi** — chosen after @hayespress, @hayeshouse, @readhouse, @hayes_press all taken.

Why `mmxxvi` wins anyway: it's part of the brand vocabulary ("Volume 01 · Summer MMXXVI"). It reads as intentional typesetting rather than "the one we could get." Turns a constraint into a signature.

### Bio

Three lines. Restrained. No emoji. No hashtags.

```
HAYES — Volume 01
A Campaign · Summer MMXXVI · San Francisco & Kyoto
hayes.press
```

(Tweak to taste before launch — keep under 160 chars, no promotional language.)

### Banner

`assets/banner.png` — 3000×1000 (2× density). Masthead layout: rule · (Summer MMXXVI | HAYES | Volume 01) · rule · strap line. Upright Fraunces wordmark, JetBrains Mono tags.

### Avatar

`assets/avatar.png` — 2000×2000. Upright Fraunces "H" monogram, centered, optically nudged for cap-height. Survives the feed-level 32px circle crop.

### Voice on feed

- Never break character. HAYES is a real house. No "lol" energy.
- Italicize proper nouns, use MMXXVI / MMXXVII for years, use en-dashes not hyphens.
- Pair most posts with an image (lookbook, antecedent sketch, card, space).
- Reply sparingly. When you do, reply in voice: one sentence, understated.

---

## DM Targets

The cold DM is the lever. 3–5 per day during launch week, each with a handwritten-feeling message. Never copy-paste. Always reference something specific from their feed.

### Target categories

**A. Menswear writers & critics (highest priority)**
The people whose job is to spot a reference. One of them posting "wait, is this real?" does more than 10k impressions.

- [ ] Derek Guy (@dieworkwear) — menswear critic, will clock the parody immediately
- [ ] Die, Workwear readers / menswear-guy adjacencies
- [ ] Permanent Style (Simon Crompton) — heritage menswear
- [ ] Throwing Fits podcast accounts
- [ ] Blackbird Spyplane — exactly the sensibility
- [ ] _(add 3–5 more from your own follows)_

**B. Design & typography Twitter**
They will forward it for the typesetting alone.

- [ ] Frank Chimero, Jessica Walsh, Erik Marinovich, etc.
- [ ] Display Ltd / Klim / Commercial Type accounts
- [ ] Design leads at Linear, Arc, Vercel, Stripe (aesthetes)
- [ ] _(add 3–5 more)_

**C. Parody-literate culture accounts**
Nathan Barley tier. They will get the bit.

- [ ] @dril adjacencies, @pixelatedboat
- [ ] New Models, Urbanist Dispatch, Perfectly Imperfect
- [ ] _(add 3–5 more)_

**D. SF/NYC aesthete founders**
The crossover crowd — they read menswear and they have followings.

- [ ] _(specific founders PJ already follows who'd share this)_

**E. Real luxury brand accounts (last, cheekily)**
Not asking for engagement — just leaving the card as a tasteful provocation. One clever reply from Aimé Leon Dore makes the whole thing.

**DO NOT** DM:
- Anyone with no prior engagement from a related account
- Mass-DM tools — every message hand-typed
- Brands whose humor you can't predict (risk of being dunked on without the bit landing)

### DM template (customize per recipient)

```
Not selling anything. Made a thing you might find funny.
hayes.press — Volume 01. Summer MMXXVI.
Would love to send you a card if you're in [SF / NYC / LA].
```

Three sentences. No preamble. No "hope you're well." Drop the card into the next reply if they bite.

---

## Business Cards

### Order

- **Vendor:** Moo
- **Product:** Classic US, 3.5" × 2"
- **Quantity:** 200 (see reasoning below)
- **Stock:** Cotton (preferred) — tactile, uncoated, rewards the hand. Spot gloss considered and rejected — too flashy, wrong register for HAYES.
- **Finish upgrade (optional, v2):** Blind deboss via Jukebox Print. Moo Cotton is the right call for v1 velocity.

### Why 200

- 25 for SF café drop (5 cafés × 3–5 visible placements + reserve)
- 50 for mail-outs to DM targets who bite
- 50 for in-person hand-offs (events, coffee meetings, serendipity)
- 25 for content photography (Boulder) — batch of 5 will get destroyed/marked in shoots
- 50 reserve

200 hits the Moo quantity break without over-ordering for a v1 drop. If the drop works, reorder with letterpress/deboss for v2.

### Front & back

- **Front:** HAYES wordmark, upright Fraunces 500, opsz 144, 150px, +0.02em letter-spacing. Center, optically nudged up 8px for cap-height.
- **Back:** stacked — "Volume 01 · Summer MMXXVI" (mono, +0.32em) / 26×1px mist rule / "hayes.press" (upright Fraunces 500, 44px).

Render script: `scripts/generate-cards.mjs`. Output: `assets/card-front.png` and `assets/card-back.png` at 2100×1200 (2× density, 600 DPI).

### Moo upload

Upload both PNGs as front + back of a single Classic US card product. Do not let Moo auto-crop — the artwork already includes bleed headroom.

---

## Physical Distribution

### The Boulder-first flow

Ship the full 200 to **Boulder (PJ)** first. Reason: the content photography is the launch. A scattered card with no hero photo is a wasted card. Boulder inspects, photographs, selects the best 150–175 for forwarding.

Don't ship direct to the SF Airtasker. You lose QC and you lose the hero shots.

### SF café drop — Airtasker brief

**Targets** (5 cafés — cluster in walkable areas):

- [ ] **Sightglass Coffee** — 7th St flagship (magazine-friendly, long tables)
- [ ] **Four Barrel** — Valencia (Mission, high-intention clientele)
- [ ] **Saint Frank** — Polk (design-literate crowd)
- [ ] **Ritual Coffee** — Valencia or Hayes St (bonus — Hayes St café on Hayes St is the joke)
- [ ] **Réveille / Reverence / Linea** — pick one near Alamo Square for the fashion-adjacent crowd

**Brief to Airtasker runner:**

> I have 15–25 business cards to place in 5 specific SF cafés. At each café, place 3–5 cards in this order of preference: (1) on the magazine rack next to any existing publications, (2) on the corner of a communal table, (3) on the counter near the sugar/milk station. DO NOT hand them out. DO NOT place more than 5 per café. Photograph each placement. Visit all 5 in one afternoon. Budget ~$100.

**Why placement not handoff:** HAYES doesn't solicit. It's found. A card on a magazine rack reads as a real artifact; a card handed to you reads as a flyer.

### Content from the drop

Every café visit → 1 placement photo → 1 launch tweet. 5 cafés = 5 days of content.

---

## Content Calendar

Launch week shape (flexible):

| Day | Post | Image |
|-----|------|-------|
| Mon | Soft launch. "Volume 01. Summer MMXXVI. hayes.press." | Banner-style crop |
| Tue | One look from the book. Italicized caption. | Look 03 or 07 |
| Wed | Card on linen. "In print." | Card content shot 1 |
| Thu | Antecedents sketch. Short line. | Sketch-leather-jacket |
| Fri | Manifesto pull quote. | Typography-only card |
| Sat | Card at Sightglass. No caption, location tag only. | Café drop shot 1 |
| Sun | "Read slowly." | Any hero image |

Weeks 2–3: taper to 3–4 posts/week. Let DMs and shares carry it.

---

## Measurement

- **Site:** Vercel Analytics (already wired into `index.html`, `antecedents.html`, `privacy.html`).
- **Inbound inquiries:** `/api/inquire` serverless function — check Vercel logs.
- **Twitter:** native analytics; track impressions, profile visits, follows from launch week.
- **Success threshold (Volume 01):**
  - ≥ 1 organic share from a menswear-literate account (>5k followers)
  - ≥ 10 inbound DMs or inquiries from people who "got it"
  - ≥ 1 newsletter / blog mention
- **If hit:** fund Volume 02 with letterpress cards and a Kyoto shoot.
- **If miss:** post-mortem, reconsider the wedge, don't reorder.

---

## Open Decisions

Items the strategy is waiting on. Resolve before drop.

- [ ] **Final bio copy** — confirm the 3-line version above, or rewrite
- [ ] **DM list (A–E)** — populate specific handles, target 15–20 people total
- [ ] **Café list** — confirm final 5 with Boulder→SF logistics in mind
- [ ] **Airtasker hiring** — post job or DM a specific person
- [ ] **Card finish call** — Moo Cotton v1 confirmed? Or wait for Jukebox deboss?
- [ ] **Moo order date** — pick a date; QC + content shoot add ~1 week before SF mail-out
- [ ] **GitHub remote** — push `~/Projects/hayes` to `github.com/pjmurray/hayes` (private)

---

## Files in this repo

```
~/Projects/hayes/
├── BRAND.md                   — full brand book
├── docs/
│   └── strategy.md            — this file
├── index.html                 — lookbook homepage
├── antecedents.html           — sketchbook
├── privacy.html               — brand-voice privacy page
├── styles.css                 — single stylesheet
├── api/inquire.js             — serverless inquiry handler
├── assets/                    — all rendered PNGs (looks, products, cards, banner, avatar)
└── scripts/
    ├── generate-cards.mjs     — Moo card artwork
    ├── generate-banner.mjs    — Twitter banner
    ├── generate-avatar.mjs    — Twitter avatar
    ├── generate-looks.mjs     — lookbook images (Gemini)
    ├── generate-objects.mjs   — product artifacts (Gemini)
    ├── generate-sketches.mjs  — antecedents sketches (Gemini)
    └── generate-spaces.mjs    — showroom spaces (Gemini)
```
