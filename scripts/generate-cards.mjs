#!/usr/bin/env node
// HAYES business cards — Moo Classic US (3.5" × 2").
//
// Front: HAYES wordmark in upright Fraunces, matching the site masthead
// exactly (weight 500, opsz 144, letter-spacing +0.02em). This is the
// identity mark — italic is reserved for expressive voice elsewhere.
//
// Back: masthead-style frame. Mono eyebrow + rule + hayes.press URL in
// upright Fraunces for house-mark consistency.
//
// Renders at 2× density (2100 × 1200 px ≈ 600 DPI for 3.5" × 2" card).
//
// Usage:  node scripts/generate-cards.mjs

import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "assets");

const CARD_W = 1050; // 3.5 inches at 300 DPI
const CARD_H = 600;  // 2.0 inches at 300 DPI
const DENSITY = 2;   // 2× → 2100 × 1200 output

const FONT_LINK = `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=JetBrains+Mono:wght@400&display=swap"
    rel="stylesheet"
  />
`;

const BASE_CSS = `
  @page { margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: ${CARD_W}px;
    height: ${CARD_H}px;
    background: #F4F0E8;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: geometricPrecision;
    position: relative;
    overflow: hidden;
  }
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 1;
  }
`;

// Front: single upright HAYES wordmark. Matches site masthead treatment
// (Fraunces 500, opsz 144, letter-spacing +0.02em). Caps sit slightly
// above geometric center, so nudge up a hair for optical centering.
const FRONT_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  ${FONT_LINK}
  <style>
    ${BASE_CSS}
    .wordmark {
      font-family: 'Fraunces', serif;
      font-weight: 500;
      font-variation-settings: 'opsz' 144;
      font-size: 150px;
      letter-spacing: 0.02em;
      color: #141414;
      white-space: nowrap;
      transform: translate(-50%, calc(-50% - 8px));
    }
  </style>
</head>
<body>
  <div class="wordmark center">HAYES</div>
</body>
</html>
`;

// Back: eyebrow + rule + hayes.press. Stacked with generous gaps.
// hayes.press in upright Fraunces (not italic) to mirror the nav
// wordmark treatment — wider tracking at the smaller size.
const BACK_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  ${FONT_LINK}
  <style>
    ${BASE_CSS}
    .stack {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;
    }
    .eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: #8A857A;
      white-space: nowrap;
    }
    .rule {
      width: 26px;
      height: 1px;
      background: #8A857A;
      opacity: 0.55;
    }
    .url {
      font-family: 'Fraunces', serif;
      font-weight: 500;
      font-variation-settings: 'opsz' 72;
      font-size: 44px;
      letter-spacing: 0.01em;
      color: #141414;
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <div class="stack center">
    <div class="eyebrow">Volume 01 &nbsp;·&nbsp; Summer MMXXVI</div>
    <div class="rule" aria-hidden="true"></div>
    <div class="url">hayes.press</div>
  </div>
</body>
</html>
`;

async function render(html, outPath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--font-render-hinting=none"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: CARD_W,
      height: CARD_H,
      deviceScaleFactor: DENSITY,
    });
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: outPath,
      type: "png",
      omitBackground: false,
      clip: { x: 0, y: 0, width: CARD_W, height: CARD_H },
    });
  } finally {
    await browser.close();
  }
}

(async () => {
  fs.mkdirSync(ASSETS, { recursive: true });

  const frontPath = path.join(ASSETS, "card-front.png");
  const backPath = path.join(ASSETS, "card-back.png");

  console.log("→ rendering card-front.png");
  await render(FRONT_HTML, frontPath);
  console.log(`  wrote ${frontPath}`);

  console.log("→ rendering card-back.png");
  await render(BACK_HTML, backPath);
  console.log(`  wrote ${backPath}`);

  console.log("");
  console.log("Output: 2100 × 1200 px (2× density, 600 DPI for 3.5\" × 2\" card).");
  console.log("Upload both files to Moo as front + back of a Classic US business card.");
})();
