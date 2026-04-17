#!/usr/bin/env node
// HAYES — environment / space photography via Gemini 2.5 Flash Image.
//
// For interiors that need to feel considered and quiet — the Hayes Valley
// showroom, the Kyoto atelier, reserved fall staging, etc. Shared style
// lock matches the lookbook (Hawkesworth on Portra) so these images sit
// alongside the campaign shots without looking like stock.
//
// Usage:  node scripts/generate-spaces.mjs [--only showroom] [--force]

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

const STYLE_LOCK =
  "Medium-format editorial architectural photograph in the style of Jamie Hawkesworth crossed with Hélène Binet — shot on Kodak Portra 400 with a Hasselblad 500CM. Soft Portra grain, natural light, no digital sharpening, no HDR, no lens flare. Quiet, restrained, unpeopled. No signage. No logos. No price tags. No visible text anywhere in the frame. Natural undyed tones — bone linen, oat plaster, unbleached canvas, aged oak, warm concrete. Palette strictly limited to these naturals. 4:5 vertical composition.";

const SPACES = [
  {
    slug: "showroom",
    name: "Showroom",
    prompt: [
      STYLE_LOCK,
      "Interior of a private by-appointment fashion showroom in Hayes Valley, San Francisco, on a weekday afternoon in late August.",
      "A single, long, solid-oak garment rail runs down the left side of the room at chest height, suspended on two thin blackened-steel cables from the ceiling.",
      "Eight garments in undyed natural tones — a camel overcoat, an ecru pile vest, a cotton crewneck, a pleated short, a linen overshirt, two knits, and a canvas tote — hang evenly spaced on plain solid-oak hangers, perfectly aligned, with generous air between each piece.",
      "The floor is wide-plank aged oak, matte oiled, no rug.",
      "Walls are hand-troweled oat plaster, warm off-white, slightly uneven.",
      "A single long low bench in the same oak runs along the opposite wall with one folded natural linen throw.",
      "A tall clerestory window along the ceiling line on the right admits a slab of soft diffused afternoon light that falls across the oak floor in a long rectangle, catching a few motes of dust.",
      "No mannequins. No shelving. No signage. No price tags. No visible hardware other than the cables holding the rail. No people. No mirrors. No chairs other than the oak bench.",
      "The space feels like a small chapel for garments — monastic, considered, unhurried.",
      "Composition: camera positioned low and slightly off-center, looking down the length of the rail toward the back wall, so the garments recede in perspective. The clerestory light falls across the middle third of the floor.",
      "Soft Portra grain, warm neutral color, preserved shadow detail, no crushed blacks.",
      "No text or lettering of any kind anywhere in the image.",
    ].join(" "),
  },
];

const selection = ONLY ? SPACES.filter((s) => ONLY.includes(s.slug)) : SPACES;

async function generate(space) {
  const existing = ["png", "jpg", "jpeg", "webp"]
    .map((ext) => path.join(ASSETS, `space-${space.slug}.${ext}`))
    .find((p) => fs.existsSync(p));
  if (existing && !FORCE) {
    console.log(`  skip ${path.basename(existing)} (exists — pass --force to overwrite)`);
    return { space, status: "skipped", outPath: existing };
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const body = { contents: [{ parts: [{ text: space.prompt }] }] };

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
  const outPath = path.join(ASSETS, `space-${space.slug}.${ext}`);
  const buf = Buffer.from(inline.data, "base64");
  fs.writeFileSync(outPath, buf);
  return { space, status: "ok", outPath, bytes: buf.length, mime };
}

(async () => {
  fs.mkdirSync(ASSETS, { recursive: true });
  console.log(`model: ${MODEL}`);
  console.log(`spaces: ${selection.map((s) => s.slug).join(", ")}`);
  console.log("");

  const results = [];
  for (const space of selection) {
    process.stdout.write(`→ ${space.name.toUpperCase()}\n`);
    try {
      const r = await generate(space);
      if (r.status === "ok") {
        console.log(`  wrote ${path.basename(r.outPath)} (${(r.bytes / 1024).toFixed(0)} KB, ${r.mime})`);
      }
      results.push(r);
    } catch (e) {
      console.log(`  FAIL ${space.name}: ${e.message}`);
      results.push({ space, status: "error", error: e.message });
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
