#!/usr/bin/env node
// HAYES profile avatar — Twitter, Instagram, etc.
//
// Renders a 1000×1000 PNG with a Fraunces italic "H" monogram on bone.
// Twitter/Instagram crop to a circle; the H sits safely inside the
// inscribed circle with breathing room so it holds up at 32px in the feed.
//
// Usage:  node scripts/generate-avatar.mjs

import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "assets");

const SIZE = 1000;
const DENSITY = 2;

const FONT_LINK = `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&display=swap"
    rel="stylesheet"
  />
`;

// Single upright H, centered. Matches the site masthead treatment
// (Fraunces 500, opsz 144, letter-spacing +0.02em) so the avatar reads
// as the identity mark. Cap-height pushes visual center slightly above
// geometric center — nudge up to compensate.
const AVATAR_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  ${FONT_LINK}
  <style>
    @page { margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: ${SIZE}px;
      height: ${SIZE}px;
      background: #F4F0E8;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: geometricPrecision;
      position: relative;
      overflow: hidden;
    }
    .mono {
      position: absolute;
      top: 50%;
      left: 50%;
      font-family: 'Fraunces', serif;
      font-weight: 500;
      font-variation-settings: 'opsz' 144;
      font-size: 720px;
      line-height: 1;
      letter-spacing: 0.02em;
      color: #141414;
      /* cap-height pushes visual center up — nudge down to compensate */
      transform: translate(-50%, calc(-50% - 28px));
    }
  </style>
</head>
<body>
  <div class="mono">H</div>
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
      width: SIZE,
      height: SIZE,
      deviceScaleFactor: DENSITY,
    });
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: outPath,
      type: "png",
      omitBackground: false,
      clip: { x: 0, y: 0, width: SIZE, height: SIZE },
    });
  } finally {
    await browser.close();
  }
}

(async () => {
  fs.mkdirSync(ASSETS, { recursive: true });
  const outPath = path.join(ASSETS, "avatar.png");
  console.log("→ rendering avatar.png");
  await render(AVATAR_HTML, outPath);
  console.log(`  wrote ${outPath}`);
  console.log("");
  console.log(`Output: ${SIZE * DENSITY} × ${SIZE * DENSITY} px. Upload as profile picture.`);
})();
