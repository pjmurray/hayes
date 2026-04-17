#!/usr/bin/env node
// HAYES Antecedents — pencil sketches of the eight garments via Gemini 2.5
// Flash Image. Single-line graphite, off-white paper, no figure, no color.
//
// Usage:  node scripts/generate-sketches.mjs [--only vest,grey-tee] [--force]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "assets");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY is not set. `source ~/.zprofile` or export it, then retry.");
  process.exit(1);
}

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};
const has = (name) => args.includes(name);

const MODEL = flag("--model") ?? "gemini-2.5-flash-image";
const ONLY = flag("--only")?.split(",").map((s) => s.trim().toLowerCase());
const FORCE = has("--force");

// Shared style lock — every sketch must read as part of one study.
const STYLE_LOCK = [
  "A single rough graphite pencil sketch of a garment, in the style of a mid-century fashion-plate study or a Saul Steinberg line drawing.",
  "Loose confident single-weight HB pencil line, slightly wobbling, drawn in one sitting. Unhurried, under-rendered.",
  "Off-white cartridge paper background — warm ecru, visible paper tooth, faint uneven tonal grain, no texture overlay.",
  "Only minimal hatched shading in a few places where volume or shadow is essential — never more than a dozen short parallel hatch marks in total. Everything else is pure outline.",
  "No color. No wash. No watercolor. No ink. No digital gradients. Pure graphite pencil only.",
  "No human figure, no body, no mannequin, no hanger, no hands, no face — only the garment itself, floating, shown flat or from an implied front view.",
  "Generous negative space around the garment. Garment occupies roughly 50% of the frame, centered.",
  "Square 1:1 format.",
  "No text anywhere. No signature. No caption. No date. No label. No logo. No notes in the margin.",
  "Absolutely pencil only — no painted detail, no filled-in color, no shadow rendering.",
].join(" ");

const SKETCHES = [
  {
    slug: "turtleneck",
    name: "Black Turtleneck",
    subject:
      "a fine-gauge mock-neck sweater, shown from the front, flat. Short cylindrical turtle collar at the top. Long slim sleeves extending straight down at slight angles out from the body. Ribbed cuffs. Straight hem. No figure inside the sweater — the sweater hangs as if on an invisible dress form.",
  },
  {
    slug: "aloha",
    name: "Aloha Shirt",
    subject:
      "a short-sleeve camp-collar shirt, shown from the front, flat. Open notched lapel-style collar. Full button placket down the center. Short sleeves flared slightly out. Straight hem with a small side vent indicated. Hint of a small pattern indicated with a few scattered suggestive flower outlines — three or four small simple hibiscus-like blooms, drawn as quick loops — nothing else on the fabric. No figure.",
  },
  {
    slug: "vest",
    name: "Vest",
    subject:
      "a sleeveless fleece vest, shown from the front, flat. Tall stand collar at the top. Full-length vertical center zip running from hem to collar. Armholes clearly indicated on both sides where sleeves would be. A small rectangular blank patch on the upper left chest, drawn as an outlined rectangle only — no text, no logo, no shape inside it. No figure.",
  },
  {
    slug: "grey-tee",
    name: "Grey Tee",
    subject:
      "a crewneck short-sleeve tee, shown from the front, flat. Simple round crew collar. Short sleeves angled slightly out. Straight hem. Fabric shown as pure outline with a few minimal hatch marks only under the sleeve seam to suggest weight. No figure.",
  },
  {
    slug: "leather-jacket",
    name: "Leather Jacket",
    subject:
      "a cropped biker-style motorcycle jacket, shown from the front, flat. Notched collar. Asymmetric diagonal center zip drawn as a clean curving line. Long sleeves hanging slightly out from the body, with simple zipped cuffs indicated as small rectangles. Quilted shoulder yokes indicated with a few simple diamond-pattern hatch marks on each shoulder only. Hem slightly shorter than waist. No figure.",
  },
  {
    slug: "double-polo",
    name: "Double Polo",
    subject:
      "TWO SEPARATE SHORT-SLEEVE POLO SHIRTS, layered. This is a LAYERING STUDY — a drawing of ONE POLO WORN DIRECTLY ON TOP OF THE OTHER. There must be clearly TWO DISTINCT POLO SHIRTS visible in the sketch, not one. " +
      "The INNER POLO is drawn first (underneath). The OUTER POLO is drawn on top of it. " +
      "BOTH POLO COLLARS MUST BE VISIBLE SIMULTANEOUSLY: the inner polo's collar rises behind and slightly above the outer polo's collar, so two separate collar lines are clearly visible stacked at the neck. " +
      "BOTH POLO HEMS MUST BE VISIBLE SIMULTANEOUSLY: the inner polo is drawn slightly longer than the outer polo, so a second distinct hem line of the inner polo is clearly visible extending below the outer polo's hem. " +
      "BOTH POLO SLEEVE ENDS MUST BE VISIBLE SIMULTANEOUSLY: the inner polo's sleeve cuffs are drawn sticking out from just under the outer polo's shorter sleeve cuffs — so each arm shows two sleeve ends stacked, not one. " +
      "Two collars, two hems, two sets of sleeves. It is impossible to mistake this for a single polo. " +
      "Shown from the front, flat, floating. No figure, no mannequin, no body.",
  },
  {
    slug: "oversized-tee",
    name: "Oversized Tee and Chain",
    subject:
      "an oversized crewneck short-sleeve tee, hem visibly long, drawn much longer than a normal tee. Wide boxy body. Short sleeves falling slightly past the shoulders. Worn on top of the tee: a single heavy flat curb chain necklace drawn as a simple loop of interlocking oval links hanging from the collar down to about sternum level, on top of the tee fabric. Shown from the front, flat. No figure.",
  },
  {
    slug: "cowboy-hat",
    name: "Cowboy Hat",
    subject:
      "a single western cowboy hat, shown from a three-quarter front angle. Tall creased crown with a central pinched ridge running front-to-back. Wide brim with both sides curled slightly up. Simple thin hatband indicated around the base of the crown. No figure, no head, no shadow beneath — the hat floats alone.",
  },
];

const selection = ONLY ? SKETCHES.filter((s) => ONLY.includes(s.slug)) : SKETCHES;

async function generate(obj) {
  const existing = ["png", "jpg", "jpeg", "webp"]
    .map((ext) => path.join(ASSETS, `sketch-${obj.slug}.${ext}`))
    .find((p) => fs.existsSync(p));
  if (existing && !FORCE) {
    console.log(`  skip ${path.basename(existing)} (exists — pass --force to overwrite)`);
    return { obj, status: "skipped", outPath: existing };
  }

  const prompt = `${STYLE_LOCK} Subject: ${obj.subject}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const body = { contents: [{ parts: [{ text: prompt }] }] };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HTTP ${res.status}: ${err}`);
  }

  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData || p.inline_data);
  if (!imagePart) {
    throw new Error(`No image in response. Parts: ${JSON.stringify(parts).slice(0, 400)}`);
  }

  const inline = imagePart.inlineData ?? imagePart.inline_data;
  const mime = inline.mimeType ?? inline.mime_type ?? "image/png";
  const ext = mime.split("/")[1]?.replace("jpeg", "jpg") ?? "png";
  const outPath = path.join(ASSETS, `sketch-${obj.slug}.${ext}`);
  const buf = Buffer.from(inline.data, "base64");
  fs.writeFileSync(outPath, buf);
  return { obj, status: "ok", outPath, bytes: buf.length, mime };
}

(async () => {
  fs.mkdirSync(ASSETS, { recursive: true });
  console.log(`model: ${MODEL}`);
  console.log(`sketches: ${selection.map((o) => o.slug).join(", ")}`);
  console.log("");

  const results = [];
  for (const obj of selection) {
    process.stdout.write(`→ ${obj.name.toUpperCase()}\n`);
    try {
      const r = await generate(obj);
      if (r.status === "ok") {
        console.log(`  wrote ${path.basename(r.outPath)} (${(r.bytes / 1024).toFixed(0)} KB, ${r.mime})`);
      }
      results.push(r);
    } catch (e) {
      console.log(`  FAIL ${obj.name}: ${e.message}`);
      results.push({ obj, status: "error", error: e.message });
    }
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log("");
  const ok = results.filter((r) => r.status === "ok").length;
  const skipped = results.filter((r) => r.status === "skipped").length;
  const failed = results.filter((r) => r.status === "error").length;
  console.log(`done: ${ok} generated, ${skipped} skipped, ${failed} failed`);
  if (failed > 0) process.exit(1);
})();
