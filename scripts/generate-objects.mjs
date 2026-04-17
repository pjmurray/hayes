#!/usr/bin/env node
// HAYES Availability — batch product photography via Gemini 2.5 Flash Image.
//
// Six objects, shared style lock: overhead flat lay, bone linen surface, soft
// diffused window light, no props, no hands, 4:5 vertical. Consistent palette
// across all six so the grid reads as one set.
//
// Usage:  node scripts/generate-objects.mjs [--only hoodie,tee] [--force]

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

// Shared style lock — identical treatment across all six objects.
const STYLE_LOCK = [
  "Editorial product photography in the style of Scheltens & Abbenes / Phoebe Philo catalogue.",
  "Overhead flat lay, straight down, 90° top-down view.",
  "Surface: a single flat expanse of undyed natural linen in bone ecru, subtle weave visible, no folds or creases.",
  "Light: soft diffused window light from the upper-left, gentle long shadow falling to the lower-right, no harsh highlights.",
  "Palette strictly limited to natural undyed tones — bone, ecru, oat, natural tan, cream. Warm neutral.",
  "Shot on medium-format Phase One IQ4, 80mm lens. Deep detail, subtle fabric texture, slight paper grain.",
  "4:5 vertical composition. Object centered with generous negative space — the object occupies roughly 60% of the frame.",
  "No props. No hands. No hangers. No mannequins. No text. No logos. No labels. No price tags. No second object.",
  "Pure archival product shot.",
].join(" ");

const OBJECTS = [
  {
    slug: "hoodie",
    name: "Hoodie",
    subject:
      "a heavyweight sanded loopback cotton pullover hoodie in undyed natural ecru. Kangaroo pocket. Flat drawstrings laid straight down along the front placket, aligned parallel. Ribbed cuffs and hem. Arms laid slightly out to the sides, hood laid flat above the shoulders, no twisting. The cotton is visibly heavy, dense, 22oz, with soft sanded nap.",
  },
  {
    slug: "vest",
    name: "Vest",
    subject:
      "a technical fleece vest in undyed natural heather oat — sleeveless, with a single full-length center zip running from hem to the top of a high stand collar. Dense brushed fleece texture visible across the panels, soft and slightly napped. Armholes clearly visible on both sides where sleeves would be on a jacket. A small flat horizontal zippered chest pocket on the left-chest seam, zip closed. Above that chest pocket, a plain flat rectangular unembroidered patch — blank, the same heather oat as the vest, stitched on all four sides — the only decorative element, positioned exactly where institutional embroidery would be applied. No lettering, no logo, no thread, no stitching pattern on the patch — it is deliberately blank. Absolutely no sleeves. Hem straight. Zip in natural matte nickel. The vest lies perfectly flat, symmetrical.",
  },
  {
    slug: "tee",
    name: "Tee",
    subject:
      "a heavyweight cotton crewneck short-sleeve tee in undyed natural bone color. 12oz Suvin cotton, softly slubbed texture, fabric visibly thick. Arms laid slightly out to the sides, collar flat, hem straight. The garment is freshly pressed, no wrinkles.",
  },
  {
    slug: "cap",
    name: "Cap",
    subject:
      "a single five-panel cap in unwashed natural cotton canvas, undyed ecru, placed centered on the surface, viewed from directly overhead, crown facing up. Vegetable-tanned natural leather strap at the back visible with a small brass buckle. Subtle canvas weave and faint natural creasing. No logo, no embroidery, no label.",
  },
  {
    slug: "tote",
    name: "Tote",
    subject:
      "a heavy natural duck canvas tote bag in undyed ecru, laid perfectly flat, body rectangular and slightly puffed. Two horsehide leather handles in natural tan, laid flat upward in an even mirrored arc above the bag. Visible hand-stitching at the handle joins. Heavy canvas texture.",
  },
  {
    slug: "jacket",
    name: "Jacket",
    subject:
      "a black leather motorcycle jacket, photographed flat-lay from directly overhead, zipped fully closed, sleeves laid straight down along the sides of the body, parallel to the torso. Full-grain black calfskin leather, hand-burnished, matte rather than glossy, with very faint creasing at the elbows from prior wear. Notched collar laid flat. Quilted detailing subtly visible across both shoulder yokes. A single hidden center zip — no visible pulls, no external hardware, no studs, no belts, no epaulets, no second zipper, no pockets on the outside, nothing but the unbroken expanse of dark leather and the faintly quilted shoulders. The body sits perfectly symmetrical, the leather absorbing the soft directional window light so subtle grain and pore texture is visible across the surface. No text, no logo, no lining visible.",
  },
  {
    slug: "polo",
    name: "Under Polo",
    subject:
      "a single short-sleeve terry cloth polo shirt in a rich saturated ROYAL COBALT BLUE — a deep clear mid-blue, slightly on the cool side of cobalt, saturated but not neon, like a classic French work jacket or a vintage Italian football shirt in cobalt. Absolutely NOT navy, NOT teal, NOT turquoise, NOT sky-blue, NOT denim — a warm confident royal cobalt. The polo is laid perfectly flat on the bone linen surface, sleeves laid slightly out to the sides and parallel. The blue of the polo sits against the warm bone-ecru linen background with deliberate contrast — this is the only colored object in the series and the color should read clearly. The collar is folded down neatly in a clean even fold. A three-button placket runs down the center, buttons visible but closed, in matching cobalt mother-of-pearl, no visible logo anywhere. Dense looped terry cloth texture visible across the body — tiny soft uncut cotton loops, the kind you see on a plush towel, visibly absorbent and nubby — this terry texture is the defining material detail. The polo is short in length, stopping at the waist. The hem is straight with a small split at each side seam. Arms laid slightly out in a symmetrical mirrored arc. This is ONE single polo shirt on its own, freshly pressed, no wrinkles. No second polo layered underneath. No second polo on top.",
  },
  {
    slug: "chain",
    name: "Chain",
    subject:
      "a single heavy solid 18-carat yellow gold flat curb-link chain necklace, laid on the linen surface in a clean open oval loop — the chain forms a single continuous closed circle about 14 inches across, the two long sides of the oval running roughly horizontal, a small lobster clasp at the top of the loop neatly closed. The links are flat, wide curb links, interlocked and polished to a warm yellow-gold shine (not white gold, not rose gold — warm 18ct yellow gold), each link clearly defined, the whole chain visibly substantial and weighty. The gold catches the soft diffused window light with a warm glow, throwing faint soft reflections onto the bone linen. No pendant, no charm, no second chain, no text stamped on the clasp. Just the chain, coiled once into a perfect oval, centered in the frame.",
  },
  {
    slug: "trouser",
    name: "Trouser",
    subject:
      "a single pair of heavyweight cotton twill trousers in undyed natural bone, laid perfectly flat, waistband at the top, legs running straight down parallel to each other with the inseams almost touching. A single flat front pleat visible at the waist on each leg, sharp and pressed. A plain bone fabric-covered button and hook closure at the waist, no visible belt loops in the front view, a clean plain flat waistband. Two slanted side pockets just below the waistband on each side, openings visible as neat diagonal slits. Two welted back pockets just below the waistband seam, flat and symmetrical, no buttons. The trouser tapers very slightly from the hip to a clean cropped hem above the ankle, with a sharp single pressed crease running straight down the front of each leg from the pleat to the hem. The twill weave texture is subtly visible across the surface — diagonal ribbed lines catching the soft window light. No cuff at the hem. No logos. No label. No belt. No second trouser.",
  },
];

const selection = ONLY ? OBJECTS.filter((o) => ONLY.includes(o.slug)) : OBJECTS;

async function generate(obj) {
  const existing = ["png", "jpg", "jpeg", "webp"]
    .map((ext) => path.join(ASSETS, `product-${obj.slug}.${ext}`))
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
  const outPath = path.join(ASSETS, `product-${obj.slug}.${ext}`);
  const buf = Buffer.from(inline.data, "base64");
  fs.writeFileSync(outPath, buf);
  return { obj, status: "ok", outPath, bytes: buf.length, mime };
}

(async () => {
  fs.mkdirSync(ASSETS, { recursive: true });
  console.log(`model: ${MODEL}`);
  console.log(`objects: ${selection.map((o) => o.slug).join(", ")}`);
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
