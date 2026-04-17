# HAYES

> Volume 01 · Summer MMXXVI

Fictitious heritage menswear house. Lookbook, manifesto, antecedents archive. No product to buy.

**Live:** [hayes.press](https://hayes.press) · **Twitter:** [@hayesmmxxvi](https://twitter.com/hayesmmxxvi)

---

## Start here

- [`BRAND.md`](BRAND.md) — full brand book, voice, palette, type system
- [`docs/strategy.md`](docs/strategy.md) — launch strategy, DM targets, distribution, cards

## Run locally

```bash
npm install
npx serve .         # or any static server
```

## Regenerate artwork

```bash
node scripts/generate-cards.mjs     # Moo business cards (front + back)
node scripts/generate-banner.mjs    # Twitter banner
node scripts/generate-avatar.mjs    # Twitter avatar
node scripts/generate-looks.mjs     # lookbook images (requires GEMINI_API_KEY)
node scripts/generate-objects.mjs   # product stills (requires GEMINI_API_KEY)
node scripts/generate-sketches.mjs  # antecedents sketches (requires GEMINI_API_KEY)
```

## Deploy

```bash
vercel --prod
```

## Structure

```
├── index.html              — lookbook homepage
├── antecedents.html        — sketchbook
├── privacy.html            — privacy page (brand voice)
├── styles.css              — single stylesheet
├── api/inquire.js          — serverless inquiry handler
├── assets/                 — rendered PNGs
├── scripts/                — image + artwork generators
├── BRAND.md                — brand book
└── docs/strategy.md        — launch strategy
```
