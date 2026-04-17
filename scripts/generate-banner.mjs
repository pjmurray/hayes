#!/usr/bin/env node
// HAYES Twitter banner — 1500 × 500.
//
// Renders the site's masthead directly: rule / tag-wordmark-tag / rule / strap.
// Bone background. Profile-pic bubble sits bottom-left on desktop; left tag
// will be partially occluded — that's fine since HAYES wordmark is center.
//
// Usage:  node scripts/generate-banner.mjs

import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "assets");

const W = 1500;
const H = 500;
const DENSITY = 2;

const FONT_LINK = `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=JetBrains+Mono:wght@400&display=swap"
    rel="stylesheet"
  />
`;

const BANNER_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  ${FONT_LINK}
  <style>
    @page { margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: ${W}px;
      height: ${H}px;
      background: #F4F0E8;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: geometricPrecision;
      overflow: hidden;
    }
    .stage {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 28px;
      padding: 0 120px;
    }
    .rule {
      width: 100%;
      height: 1px;
      background: #141414;
      opacity: 0.35;
    }
    .row {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 40px;
    }
    .tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #8A857A;
      display: flex;
      flex-direction: column;
      gap: 4px;
      line-height: 1.2;
    }
    .tag-left {
      justify-self: start;
    }
    .tag-right {
      justify-self: end;
      text-align: right;
    }
    .wordmark {
      font-family: 'Fraunces', serif;
      font-weight: 500;
      font-variation-settings: 'opsz' 144;
      font-size: 118px;
      letter-spacing: 0.02em;
      color: #141414;
      line-height: 1;
      /* cap-height optical nudge */
      transform: translateY(-4px);
    }
    .strap {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: #8A857A;
      display: flex;
      gap: 18px;
      align-items: center;
    }
    .dot {
      opacity: 0.6;
    }
  </style>
</head>
<body>
  <div class="stage">
    <div class="rule"></div>
    <div class="row">
      <div class="tag tag-left">
        <span>Summer</span>
        <span>MMXXVI</span>
      </div>
      <div class="wordmark">HAYES</div>
      <div class="tag tag-right">
        <span>Volume</span>
        <span>01</span>
      </div>
    </div>
    <div class="rule"></div>
    <div class="strap">
      <span>A HAYES Campaign</span>
      <span class="dot">·</span>
      <span>San Francisco &amp; Kyoto</span>
      <span class="dot">·</span>
      <span>Summer MMXXVI</span>
      <span class="dot">·</span>
      <span>Read slowly</span>
    </div>
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
      width: W,
      height: H,
      deviceScaleFactor: DENSITY,
    });
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: outPath,
      type: "png",
      omitBackground: false,
      clip: { x: 0, y: 0, width: W, height: H },
    });
  } finally {
    await browser.close();
  }
}

(async () => {
  fs.mkdirSync(ASSETS, { recursive: true });
  const outPath = path.join(ASSETS, "banner.png");
  console.log("→ rendering banner.png");
  await render(BANNER_HTML, outPath);
  console.log(`  wrote ${outPath}`);
  console.log("");
  console.log(`Output: ${W * DENSITY} × ${H * DENSITY} px. Upload as Twitter header.`);
})();
