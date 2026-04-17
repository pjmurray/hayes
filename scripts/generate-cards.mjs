#!/usr/bin/env node
// HAYES business cards — Moo Classic US (3.5" × 2").
//
// Renders two print-ready PNGs at 2× density (2100 × 1200 px ≈ 600 DPI for a
// 3.5" × 2" card — more than print needs, ensures crisp upload).  Background
// is solid bone so Moo's bleed is handled automatically; no guides baked in.
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
const DENSITY = 2;   // 2× for crisp print (output is 2100 × 1200)

const FONT_LINK = `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,400&family=JetBrains+Mono:wght@400&display=swap"
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
      font-style: italic;
      font-weight: 400;
      font-variation-settings: 'opsz' 144, 'SOFT' 100;
      font-size: 138px;
      letter-spacing: -0.018em;
      color: #141414;
      white-space: nowrap;
      /* The italic slant shifts optical center right; compensate slightly.
         Visual center of caps sits above geometric center, so nudge up. */
      transform: translate(calc(-50% - 6px), calc(-50% - 8px));
    }
  </style>
</head>
<body>
  <div class="wordmark center">HAYES</div>
</body>
</html>
`;

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
      gap: 44px;
    }
    .eyebrow {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #8A857A;
      white-space: nowrap;
    }
    .rule {
      width: 22px;
      height: 1px;
      background: #8A857A;
      opacity: 0.55;
    }
    .url {
      font-family: 'Fraunces', serif;
      font-style: italic;
      font-weight: 400;
      font-variation-settings: 'opsz' 72;
      font-size: 42px;
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
    // Extra wait so webfonts fully settle before screenshot.
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
