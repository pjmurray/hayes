#!/usr/bin/env node
// HAYES — shareable artifacts for the EN/JA cast launch.
// Composes diptychs (EN look · JA look) and a full cast grid using ImageMagick.
// Usage: node scripts/generate-shareables.mjs
//
// Output → ./share/

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "share");
mkdirSync(OUT, { recursive: true });

const BONE = "#F4F0E8";
const INK = "#141414";
const MUTED = "#5a5550";

const JA_FONT =
  "/System/Library/PrivateFrameworks/FontServices.framework/Versions/A/Resources/Fonts/Subsets/YuMincho.ttc";
const SERIF = "Times-Roman";
const SERIF_ITALIC = "Times-Italic";

function magick(args) {
  execFileSync("magick", args, { stdio: ["ignore", "inherit", "inherit"] });
}

function en(name) {
  return resolve(ROOT, "assets", name);
}
function ja(name) {
  return resolve(ROOT, "assets/ja", name);
}

// ─────────────────────────────────────────────────────────────────────────
// Diptych: side-by-side EN · JA, with a caption block underneath.
// 1600 × 1000 — 16:9 friendly for Twitter/LinkedIn.
// ─────────────────────────────────────────────────────────────────────────
function diptych({ slug, lookNo, title, enMeta, jaMeta, enImg, jaImg, kicker }) {
  const out = resolve(OUT, `${slug}.png`);
  const W = 1600;
  const H = 1200;
  const IMG = 720;
  const GAP = 40;
  const TOTAL_W = IMG * 2 + GAP;
  const X_LEFT = Math.round((W - TOTAL_W) / 2); // 60
  const X_RIGHT = X_LEFT + IMG + GAP;
  const Y_IMG = 130;

  // Caption block sits below imagery with proper breathing room.
  const captionY = Y_IMG + IMG + 80;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <style>
    .wm    { font-family: 'Times New Roman', serif; font-weight: 400; letter-spacing: 22px; font-size: 26px; fill: ${INK}; }
    .kick  { font-family: 'Helvetica Neue', sans-serif; font-weight: 500; letter-spacing: 8px; font-size: 13px; fill: ${MUTED}; text-transform: uppercase; }
    .title { font-family: 'Times New Roman', serif; font-style: italic; font-weight: 400; font-size: 38px; fill: ${INK}; }
    .loc   { font-family: 'YuMincho', 'Hiragino Mincho ProN', serif; font-weight: 400; font-size: 19px; fill: ${INK}; }
    .foot  { font-family: 'Helvetica Neue', sans-serif; font-weight: 500; letter-spacing: 5px; font-size: 11px; fill: ${MUTED}; }
  </style>
  <rect width="${W}" height="${H}" fill="${BONE}"/>
  <text x="${W / 2}" y="70" text-anchor="middle" class="wm">H A Y E S</text>
  <text x="${W / 2}" y="${captionY}" text-anchor="middle" class="kick">${kicker}</text>
  <text x="${W / 2}" y="${captionY + 56}" text-anchor="middle" class="title">${title}</text>
  <text x="${X_LEFT + IMG / 2}" y="${captionY + 110}" text-anchor="middle" class="loc">${enMeta}</text>
  <text x="${X_RIGHT + IMG / 2}" y="${captionY + 110}" text-anchor="middle" class="loc">${jaMeta}</text>
  <text x="${W / 2}" y="${H - 36}" text-anchor="middle" class="foot">HAYES.PRESS  ·  TOGGLE 日本語  ·  THE CAST CHANGES</text>
</svg>`;

  const svgPath = resolve(OUT, `_caption_${slug}.svg`);
  execFileSync("/bin/sh", [
    "-c",
    `cat > "${svgPath}" <<'SVG_EOF'\n${svg}\nSVG_EOF`,
  ]);

  magick([
    svgPath,
    "(", enImg, "-resize", `${IMG}x${IMG}^`, "-gravity", "center", "-extent", `${IMG}x${IMG}`, ")",
    "-gravity", "NorthWest", "-geometry", `+${X_LEFT}+${Y_IMG}`, "-composite",
    "(", jaImg, "-resize", `${IMG}x${IMG}^`, "-gravity", "center", "-extent", `${IMG}x${IMG}`, ")",
    "-gravity", "NorthWest", "-geometry", `+${X_RIGHT}+${Y_IMG}`, "-composite",
    out,
  ]);
  console.log("✓", out.replace(ROOT + "/", ""));
}

// ─────────────────────────────────────────────────────────────────────────
// Cast grid — 8 pairs in a 2-col EN/JA layout. Portrait orientation for IG/Threads.
// 1080 × 1920 (Stories) — works for feed too.
// ─────────────────────────────────────────────────────────────────────────
function castGrid() {
  const out = resolve(OUT, "cast-grid.png");
  const W = 1200;
  const COLS = 2;
  const TILE = 520;
  const GAP_X = 40;
  const GAP_Y = 80; // generous so each pair feels like its own column
  const Y0 = 200;
  const TOTAL_W = TILE * COLS + GAP_X;
  const X0 = Math.round((W - TOTAL_W) / 2);

  // 4 most differentiated pairs — each tells the joke on its own.
  const looks = [
    { en: "look-03-chain.png", ja: "look-03-chain.png", label: "CHAIN",  en_loc: "Mission, San Francisco", ja_loc: "蔵前、東京" },
    { en: "look-06-heir.png",  ja: "look-06-heir.png",  label: "HEIR",   en_loc: "Bayview, San Francisco", ja_loc: "青山、東京" },
    { en: "look-07-moat.png",  ja: "look-07-moat.png",  label: "MOAT",   en_loc: "Atherton, California",   ja_loc: "ストックホルム、瑞典" },
    { en: "look-09-close.png", ja: "look-09-close.png", label: "CLOSE",  en_loc: "Crissy Field",           ja_loc: "お台場、東京" },
  ];

  const ROWS = looks.length;
  const H = Y0 + ROWS * (TILE + GAP_Y) + 60;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <style>
    .wm    { font-family: 'Times New Roman', serif; letter-spacing: 22px; font-size: 28px; fill: ${INK}; }
    .meta  { font-family: 'Helvetica Neue', sans-serif; font-weight: 500; letter-spacing: 7px; font-size: 13px; fill: ${MUTED}; text-transform: uppercase; }
    .ja    { font-family: 'YuMincho', 'Hiragino Mincho ProN', serif; font-weight: 400; font-size: 15px; fill: ${MUTED}; }
    .col   { font-family: 'Helvetica Neue', sans-serif; font-weight: 600; letter-spacing: 6px; font-size: 12px; fill: ${INK}; }
    .label { font-family: 'Times New Roman', serif; font-style: italic; font-weight: 400; font-size: 22px; fill: ${INK}; }
    .loc   { font-family: 'YuMincho', 'Hiragino Mincho ProN', serif; font-weight: 400; font-size: 14px; fill: ${MUTED}; }
    .foot  { font-family: 'Helvetica Neue', sans-serif; font-weight: 500; letter-spacing: 5px; font-size: 11px; fill: ${MUTED}; }
  </style>
  <rect width="${W}" height="${H}" fill="${BONE}"/>
  <text x="${W / 2}" y="80" text-anchor="middle" class="wm">H A Y E S</text>
  <text x="${W / 2}" y="118" text-anchor="middle" class="meta">A SUMMER IN SAN FRANCISCO</text>
  <text x="${W / 2}" y="142" text-anchor="middle" class="ja">東京と京都の一夏</text>
  <text x="${X0 + TILE / 2}" y="${Y0 - 18}" text-anchor="middle" class="col">EN</text>
  <text x="${X0 + TILE + GAP_X + TILE / 2}" y="${Y0 - 18}" text-anchor="middle" class="col">日本語</text>
  ${looks
    .map((l, i) => {
      const yLabel = Y0 + i * (TILE + GAP_Y) + TILE + 28;
      const yLoc = yLabel + 24;
      return `
  <text x="${W / 2}" y="${yLabel}" text-anchor="middle" class="label">${l.label}</text>
  <text x="${X0 + TILE / 2}" y="${yLoc}" text-anchor="middle" class="loc">${l.en_loc}</text>
  <text x="${X0 + TILE + GAP_X + TILE / 2}" y="${yLoc}" text-anchor="middle" class="loc">${l.ja_loc}</text>`;
    })
    .join("")}
  <text x="${W / 2}" y="${H - 24}" text-anchor="middle" class="foot">HAYES.PRESS  ·  TOGGLE 日本語  ·  THE CAST CHANGES</text>
</svg>`;

  const svgPath = resolve(OUT, "_caption_cast.svg");
  execFileSync("/bin/sh", [
    "-c",
    `cat > "${svgPath}" <<'SVG_EOF'\n${svg}\nSVG_EOF`,
  ]);

  const args = [svgPath];
  looks.forEach((look, i) => {
    const y = Y0 + i * (TILE + GAP_Y);
    args.push(
      "(", en(look.en),
      "-resize", `${TILE}x${TILE}^`,
      "-gravity", "center",
      "-extent", `${TILE}x${TILE}`,
      ")",
      "-gravity", "NorthWest", "-geometry", `+${X0}+${y}`, "-composite",
      "(", ja(look.ja),
      "-resize", `${TILE}x${TILE}^`,
      "-gravity", "center",
      "-extent", `${TILE}x${TILE}`,
      ")",
      "-gravity", "NorthWest", "-geometry", `+${X0 + TILE + GAP_X}+${y}`, "-composite",
    );
  });
  args.push(out);
  magick(args);
  console.log("✓", out.replace(ROOT + "/", ""));
}

// ─────────────────────────────────────────────────────────────────────────
// Run
// ─────────────────────────────────────────────────────────────────────────
diptych({
  slug: "01-bridge",
  lookNo: "09",
  title: "The Close — bridges, two",
  kicker: "LOOK 09  ·  THE CLOSE",
  enMeta: "Crissy Field, San Francisco",
  jaMeta: "お台場、東京 ── レインボーブリッジ",
  enImg: en("look-09-close.png"),
  jaImg: ja("look-09-close.png"),
});

diptych({
  slug: "02-moat",
  lookNo: "07",
  title: "The Moat — the founder, recast",
  kicker: "LOOK 07  ·  THE MOAT",
  enMeta: "Henry Wei, 54 — Atherton",
  jaMeta: "ヘンリック・ヴァイス、54 ── ストックホルム",
  enImg: en("look-07-moat.png"),
  jaImg: ja("look-07-moat.png"),
});

diptych({
  slug: "03-chain",
  lookNo: "03",
  title: "Chain — same tee, different room",
  kicker: "LOOK 03  ·  CHAIN",
  enMeta: "Mission, San Francisco",
  jaMeta: "蔵前、東京 ── ステルス",
  enImg: en("look-03-chain.png"),
  jaImg: ja("look-03-chain.png"),
});

diptych({
  slug: "04-heir",
  lookNo: "06",
  title: "Heir — the staircase, relocated",
  kicker: "LOOK 06  ·  THE HEIR",
  enMeta: "Bayview, San Francisco",
  jaMeta: "青山、東京 ── 鉄の階段",
  enImg: en("look-06-heir.png"),
  jaImg: ja("look-06-heir.png"),
});

castGrid();

console.log("\nAll shareables written to ./share/");
