#!/usr/bin/env node
// HAYES lookbook — JA edition. Parallel campaign: same looks, same poses,
// same outfits, cast and located in Japan. Generated via Gemini 2.5 Flash Image.
//
// Usage:  GEMINI_API_KEY=... node scripts/generate-looks-ja.mjs [--only 03,05] [--model gemini-2.5-flash-image] [--force]
//
// Writes PNG/JPEGs to ../assets/ja/look-NN-slug.{png,jpg}. Skips files that already
// exist unless --force is passed. Runs serially; ~10-20s per image.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "assets", "ja");

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
const ONLY = flag("--only")?.split(",").map((s) => s.trim());
const FORCE = has("--force");

// JA edition prompts. Same garments, same poses, same film/style lock as EN.
// Subjects cast as Japanese; settings re-located to Japanese equivalents where
// the EN scene implied a place. Abstract interiors (hero/chain/altar) stay
// abstract. The campaign is a parallel shoot — the clothes do not change.
const LOOKS = [
  {
    num: "00",
    slug: "hero",
    name: "HERO — THE DOUBLE POLO (JA)",
    prompt:
      "Medium-format editorial fashion campaign photograph, Jamie Hawkesworth style, Kodak Portra 400, Hasselblad 500CM. A 39-year-old lean Japanese man with short neatly-cut black hair, clean-shaven, calm features, stands centered in a plain warm-neutral interior — pale oat plaster wall, pale wooden floor. THE KEY SUBJECT: he is wearing TWO SEPARATE SHORT-SLEEVE COTTON PIQUE POLO SHIRTS AT THE SAME TIME, one polo worn directly on top of the other polo. This is the double polo, two polos stacked — the defining feature of the image. THE INNER POLO: a COBALT ROYAL BLUE polo, worn against the skin. Its collar stands up stiffly against the back of his neck. Its short sleeves are visible underneath the outer polo's sleeves — you can see a DISTINCT band of royal blue cotton cuff sticking out two full inches beyond the hem of the outer polo's sleeves, on BOTH arms. Its hem is also visible extending two inches below the hem of the outer polo at the waist, a clear band of royal blue between the outer polo and the trouser waistband. THE OUTER POLO: a pale buttermilk LEMON YELLOW polo pique, slightly oversized, worn over the royal blue polo. Its own collar is folded down in the normal way, sitting OUTSIDE and ON TOP OF the royal blue collar, so the blue collar tips are clearly visible sticking up out of the lemon collar's V at the neck. BOTH POLO COLLARS MUST BE VISIBLE SIMULTANEOUSLY — the blue collar stand behind and above the lemon collar's fold. BOTH POLO HEMS MUST BE VISIBLE. BOTH POLO SLEEVE ENDS MUST BE VISIBLE. The two-polo stacking is unambiguous and obvious at a glance. Relaxed bone cotton trousers, single pleat, cropped above the ankle. Brown leather penny loafers, no socks. A SMALL RECTANGULAR GOLD DRESS WATCH on the left wrist — yellow-gold case, visible rectangular silhouette, worn on a brown alligator leather strap (a Cartier Tank Louis Cartier or visual equivalent, unbranded). The gold case catches a warm glint of the daylight, clearly visible at this full-body distance. Arms loose at sides. Posture: feet planted shoulder-width, shoulders square to camera, chin level, gaze just past the camera — placid, serene, unreadable, slightly absent, almost beatific. Soft even daylight from screen-left, gentle long shadow falling to screen-right. Palette: lemon yellow, royal blue, bone, oat plaster, warm wood. Composition: full body, subject centered, generous negative space above head, 4:5 aspect ratio. Soft Portra grain, natural skin texture, no digital sharpening. No smile. No visible logos. No text anywhere. Editorial campaign mood. REMEMBER: TWO polos, both clearly visible at neck, sleeves, and hem. The image does not make sense with only one polo.",
  },
  {
    num: "01",
    slug: "drift",
    name: "THE DRIFT (JA)",
    prompt:
      "Medium-format editorial fashion photograph, Jamie Hawkesworth style, Kodak Portra 400, Hasselblad 500CM. A 22-year-old lean Japanese man with short black hair stands on a pale stone pool deck at a minimalist modern onsen ryokan in Hakone, Japan, at 2pm on a cloudless August afternoon — distant cedar-covered hills rise in soft haze beyond the edge of the deck, not in sharp focus. THE KEY SUBJECT: he is wearing TWO SEPARATE SHORT-SLEEVE TERRY CLOTH POLO SHIRTS AT THE SAME TIME, one polo worn directly on top of the other polo. This is the double polo, two polos stacked — the defining feature of the image. THE INNER POLO: a SOFT BONE-WHITE terry cloth polo. Its collar stands up stiffly against the back of his neck. Its short sleeves are visible underneath the outer polo's sleeves — a DISTINCT band of bone-white terry cuff sticks out TWO FULL INCHES beyond the hem of the outer polo's sleeves, on BOTH arms. Its hem is also visible extending two inches below the hem of the outer polo at the waist, a clear band of bone-white between the outer polo and the short waistband. THE OUTER POLO: a lemon-yellow terry cloth polo, slightly oversized, worn over the bone polo, top button undone. Its own collar is folded down in the normal way, sitting OUTSIDE and ON TOP OF the bone collar, so the bone collar tips are clearly visible sticking up out of the lemon collar's V at the neck. BOTH POLO COLLARS MUST BE VISIBLE SIMULTANEOUSLY — the bone collar stand behind and above the lemon collar's fold. BOTH POLO HEMS MUST BE VISIBLE. BOTH POLO SLEEVE ENDS MUST BE VISIBLE. The two-polo stacking is unambiguous and obvious at a glance. Pressed pleated trouser shorts in bone, low canvas trainers in white and blue, no socks. A pair of over-ear headphones in lunar blue rests around his neck. He holds a thin silver laptop pinched between thumb and forefinger at hip level, as if it were a small handbag. His expression is entirely neutral — lips closed, slight downward cast, eyes focused on a point past the camera's left shoulder. The pool is just out of frame; its chlorine-blue reflected light glances faintly on one side of his face. Overhead sun creates crisp high-contrast shadows on the pale stone. Palette: lemon, bone, warm stone, chrome, pool blue, distant cedar-green. Composition: full-body, centered, generous negative space above the head, 4:5 aspect ratio. Soft Portra grain, natural skin texture, no digital sharpening. No smile. No visible logos. No photographer reflection. No kanji or Japanese signage visible anywhere. Editorial campaign mood, quiet and considered. REMEMBER: TWO polos, both clearly visible at neck, sleeves, and hem.",
  },
  {
    num: "02",
    slug: "vigil",
    name: "THE VIGIL (JA)",
    prompt:
      "Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400 with a Hasselblad 500CM. A 28-year-old slender androgynous Japanese person with chin-length straight black hair stands on a windblown grassy headland on the Miura Peninsula at the tail of golden hour, thick coastal fog rolling low over the far hills behind them so the landscape dissolves into pale lilac and fog-grey — no skyline, no bridge, no horizon line visible, just soft atmospheric haze where the distance would be. They wear an oversized unlined camel overcoat, open, over a heather-grey crewneck undershirt; relaxed chocolate-brown wide-leg trousers; worn technical trail-runner sneakers in moss green. Thin silver wire-frame spectacles. A heavy natural-canvas tote bag hangs from the left shoulder, falling cleanly against the hip, closed at the top, nothing visibly inside. A matte black vape sits in the coat's breast pocket. They stand in three-quarter profile, one hand in the coat pocket, the other loosely on the tote strap. Gaze is steady and unblinking, as if watching for something to appear at the far edge of the ridge — not dreamy, but alert. Low sun grazes the cheekbone; wisps of incoming fog soften the far hills to pale lilac. Palette: sand, fog-grey, pale lilac, camel. Composition: full-body, subject centered, vast negative space of landscape and sky behind, 4:5 aspect ratio. Soft Portra grain, windblown hair, painterly atmospheric haze. No smile. No other people. No legible text. No kanji or Japanese signage visible anywhere. Editorial campaign mood, contemplative and uncannily still.",
  },
  {
    num: "03",
    slug: "chain",
    name: "THE CHAIN (JA)",
    prompt:
      "Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400 with a Hasselblad 500CM. A 39-year-old lean Japanese man with short neatly-cut black hair and a faint tan stands in a sterile, minimal modernist interior — polished concrete floor, pale plaster wall, one narrow slot of daylight from an unseen skylight casting a soft diagonal shaft. The room could be an Azabudai apartment or a Den-en-chōfu residence; it is deliberately plain. He wears ONE OVERSIZED HEAVYWEIGHT WHITE COTTON CREWNECK TEE — a single plain white tee, nothing underneath it. The collar is a simple single crewneck with only ONE NECKLINE VISIBLE — do not draw a second tee or a second collar beneath it. The white tee sits slightly oversized at the shoulders and drops past the waistband. A SINGLE HEAVY FLAT GOLD CURB-LINK CHAIN rests outside the white tee at the sternum — the chain is substantial, visibly eighteen-carat yellow gold, interlocking flat curb links catching the daylight, hanging clean from the base of the neck down to mid-chest. This chain is the defining element of the image. He wears relaxed mid-wash slouchy denim jeans and plain white low-top canvas sneakers. A simple gold ring on the right index finger. Both hands rest loose at his sides. Posture: feet planted shoulder-width, shoulders square to camera, chin level, gaze directed slightly past the camera's right shoulder — composed, CEO-stillness, not quite smiling. Expression: neutral, faintly amused, unreadable. The plaster wall is almost entirely empty. A single Eames-style molded plywood lounge chair sits far to his left in the deep background, unoccupied. Overhead cool daylight is the only source; soft, directional, long shadow pooling to his right. Palette: bone plaster, oat concrete, optic white, gold, faded denim indigo. Composition: full body, subject centered, generous negative space above head and to sides, 4:5 aspect ratio. Soft Portra grain, natural skin texture, no digital sharpening. No smile. No visible logos. No text anywhere in frame. No kanji or Japanese signage. Editorial campaign mood, corporate and unreadable. REMEMBER: one tee only, one neckline only, one gold chain on top.",
  },
  {
    num: "04",
    slug: "lament",
    name: "THE LAMENT (JA)",
    prompt:
      "Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400, Hasselblad 500CM. A 31-year-old pale, thin Japanese man with messy dark hair and faint shadows under the eyes sits on the edge of an unmade low futon on the tatami-and-concrete floor of a half-basement apartment in Sakyō-ku, Kyoto. A single bare incandescent bulb hangs from an exposed cord overhead; its warm tungsten glow is the only illumination. A small high window near the ceiling admits a sliver of pale afternoon light that does not reach him. He wears a washed oat-beige cotton crewneck sweatshirt, two sizes too large, over unbleached linen drawstring trousers, with caramel suede footbed sandals worn over thick grey wool socks. A simple stainless-steel pill organizer with seven compartments sits on the concrete floor beside him, three compartments open, one capsule visible. A slim silver laptop rests closed on a stack of three hardback books bound in plain linen. Posture: seated forward, elbows on knees, hands loosely clasped, forehead tilted downward, eyes cast toward the floor. Expression: exhausted peace — resigned, not devastated. Walls cold off-white showing faint stains near the baseboards. Palette: oat, tungsten amber, cold basement-white, concrete grey. Composition: three-quarter body, subject in lower-center of frame, low ceiling and exposed pipes visible at the top, 4:5 aspect ratio. Soft Portra grain, preserved warm shadow detail, everything still. No smile. No other people. No legible text on book spines. No kanji or Japanese signage visible. Editorial campaign mood, quietly resigned.",
  },
  {
    num: "05",
    slug: "altar",
    name: "THE ALTAR (JA)",
    prompt:
      "Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400, Hasselblad 500CM. A 26-year-old Japanese man of slender build with short black hair stands in full side profile at a plain solid-oak desk in an almost empty room. One single large curved monitor sits on the desk, its screen glowing abstract soft cyan — not readable UI, just a wash of pale blue light. A steel tumbler on the desk collects slow drips from a small glass cold-brew tower mounted on a wooden stand above it — the one point of visual intrigue. Nothing else in the room. Matte warm-grey walls. A single warm desk lamp from above throws a narrow cone of amber light onto the top of his head and the desk surface. He wears a charcoal fine-gauge cotton crewneck tee, loose pleated black trousers, matte black house slippers. Blue-light filter glasses catch the cyan. A fitness band on the left wrist. He stands upright, arms loose at his sides, chin level, gaze fixed on the screen — still, unreadable, devotional. Cyan rim light crosses his chest and the side of his face; amber pools on his crown and shoulders. The rest of the room falls to deep black. Composition reads like a monk at an altar: subject full-body on the right third of frame, monitor and drip tower on the left, large negative space above. 4:5 aspect ratio. Soft Portra grain, deep preserved blacks, no shadow crushing. No smile. No readable screen content — monitor is abstract light only. No other screens. No clutter. No kanji or Japanese signage. Editorial campaign mood, ritualistic and devotional.",
  },
  {
    num: "06",
    slug: "heir",
    name: "THE HEIR (JA)",
    prompt:
      "Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400, Hasselblad 500CM. A 19-year-old visibly teenage lean Japanese boy with a boyish face, no facial hair, and a clean low fade sits on a black-painted iron external staircase attached to a mid-century low-rise residential building in the Aoyama neighborhood of Tokyo at early dusk. He wears dark navy heavyweight cotton work pants, a plain red cotton crewneck tee with no visible logo, a single fine gold Cuban link chain worn outside the shirt, one small gold stud earring, and white low-top sneakers with the top two eyelets unlaced. He sits with legs dangling through the iron railing, right elbow on right knee, left hand loosely holding a small matte black vape. A rolled-up print magazine rests on the grating beside him. He looks outward over the rooftops of low Tokyo residential blocks as if surveying a city he will come to own. Not at the camera. Not dreamy. Proprietary. Setting sun throws a warm rim light on the right side of his face; the building behind him is pale grey-cream render, the iron staircase chipped matte black. Distant Tokyo city lights just beginning to blur on in the background. Palette: pale render, matte black iron, navy, gold, warm skin. Composition: medium-wide shot, subject seated in the lower-left third of the frame, architecture and dusk sky filling the upper right, 4:5 aspect ratio. Soft Portra grain, slight atmospheric haze, no lens flare. No smile. No readable text on the magazine. No other people. No kanji or Japanese signage visible in frame. Editorial campaign mood, young, quiet, proprietary.",
  },
  {
    num: "07",
    slug: "moat",
    name: "THE MOAT (JA)",
    prompt:
      "Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400, Hasselblad 500CM. A 54-year-old lean pale Nordic white man with very close-cropped platinum-blond hair, fair Scandinavian complexion, pale blue eyes, and wire-framed glasses stands alone on a polished concrete plaza outside a large, understated corporate building at blue hour — the last trace of sunset fading behind the low roofline. The building is a single plane of pale concrete and dark glass receding behind him, deliberately nondescript; no signage, no server racks visible, no diagrammatic industrial equipment, no kanji or Japanese lettering anywhere. One single warm amber service bulb above a closed freight door to his left throws a soft pool of light across one side of his jaw and jacket shoulder; the rest of the scene falls to cool indigo. A landscaped row of young trimmed cypress trees sits in deep shadow behind him. He wears a well-worn black leather motorcycle jacket, fully zipped, with distinct quilted shoulders and a notched collar, the leather softly cracked at the elbows from years of wear. Underneath, a plain black crewneck tee visible only at the collar. Dark indigo slim jeans, broken in. Black leather Chelsea boots, polished. Both hands rest easy in the jacket pockets. Posture: three-quarter to the camera, weight on the back foot, shoulders relaxed, chin level, gaze directed not quite at the camera but slightly past it — calm, proprietary, untroubled, unhurried. The only subject in the campaign who looks almost amused. Expression: faintly, almost imperceptibly smiling. Lighting: single warm amber key from camera-left, deep cool indigo everywhere else, no stage lights, no data-center tunnel, no readable interior beyond. The sky graduates from deep indigo at the top to the last warm ember at the horizon. Palette: black leather, indigo, dusk ember, warm amber service-bulb. Composition: full body, subject left-of-center, vast plaza and dusk sky filling the upper right, 4:5 aspect ratio. Soft Portra grain, painterly atmospheric clarity, slight warm-to-cool gradient. No other people. No signage. No text on any building. No cars. No screens. No rack-light. Editorial campaign mood, quietly sovereign. The fortress is implied, never shown.",
  },
  {
    num: "08",
    slug: "idyll",
    name: "THE IDYLL (JA)",
    prompt:
      "Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400 with a Hasselblad 500CM. A 34-year-old lightly tan Japanese man of medium build with short black hair and stubble just past a beard lies propped on his left elbow across a faded indigo-striped cotton blanket in the dry summer grass of Yoyogi Park in central Tokyo, late afternoon on a weekday. The sloping lawn descends toward the city to his right; low Shibuya rooftops and a hazy Tokyo skyline fill the distance, slightly overcast but bright. He wears a loose heavyweight vintage cotton tee in faded persimmon with a small chest pocket, visibly washed a hundred times, over which a crumpled linen overshirt in sun-bleached straw hangs unbuttoned and pushed off one shoulder. Loose fatigue trousers in faded navy, cuffed once above the ankle. Brown suede footbed sandals — one kicked off and lying on the grass beside him — bare feet. A natural canvas tote from a neighborhood bookshop rests near his hip, a folded magazine peeking out. A paperback book sits open face-down beside him, spine cracked, cover plain and unmarked. A glass jar of cold brew with a paper straw sweats on the blanket. His phone is placed screen-down on the blanket, deliberately out of reach. A small adult Shiba Inu — sesame-and-cream double coat, pricked triangular ears, curled tail tucked over its back, alert fox-like face even in sleep — is curled against his thigh, asleep. He wears vintage tortoiseshell sunglasses; his face is tilted slightly toward the sky, eyes nearly closed, jaw relaxed. A linen bucket hat in washed ecru rests on the blanket beside the book. Posture: fully reclined and unhurried — the only subject in the campaign who is horizontal. Late-afternoon sun filters through tall zelkova trees from the upper right, warm but not harsh. Other park-goers are only distant soft shapes far down the slope. Palette: faded persimmon, straw linen, dry park grass, Tokyo pastel. Composition: full body, subject reclined in the lower frame, park slope and skyline receding into the upper right, 4:5 aspect ratio. Soft Portra grain, hazy park dust catching the light, natural warmth. No smile. No other people near him. No visible phone screen. No kanji or Japanese signage visible on any book, magazine, tote, or distant building. Editorial campaign mood, unhurried and quietly post-capital.",
  },
  {
    num: "09",
    slug: "close",
    name: "THE CLOSE (JA)",
    prompt:
      "Medium-format editorial fashion photograph in the style of Jamie Hawkesworth, shot on Kodak Portra 400 with a Hasselblad 500CM. " +
      "SCENE GEOMETRY (STRICT — this must be geographically accurate to Odaiba Seaside Park, Tokyo Bay): The subject stands on the paved promenade of Odaiba Seaside Park on the east shore of Tokyo Bay, on the Odaiba island side. The CAMERA FACES NORTH-WEST along the promenade. The subject is positioned center-frame, facing the camera (i.e., with his back to the bridge and to the mainland Tokyo skyline). BEHIND the subject, in the distance, the FULL SPAN of the Rainbow Bridge runs horizontally across the upper-middle of the frame, from LEFT to RIGHT. " +
      "BRIDGE GEOMETRY (STRICT — render this accurately): The Rainbow Bridge has EXACTLY TWO TOWERS — not three, not one. Each tower is a tall WHITE lattice-steel pylon with a modern rectangular silhouette — two vertical columns joined by horizontal struts at regular intervals, topped with a crisp flat crossbeam. The towers are PAINTED WHITE — not orange, not grey, not red. The bridge is a DOUBLE-DECK suspension bridge: the upper deck carries the Shuto Expressway and the lower deck carries the Yurikamome elevated train line and the general roadway. This two-deck stacking must be clearly visible across the main span. Between the two towers the main suspension cables form a SHALLOW CATENARY CURVE dipping toward the mid-span, with shorter vertical suspender cables hanging down to the deck. The bridge's color is predominantly WHITE with pale-grey deck structure. " +
      "LANDSCAPE GEOMETRY: BEHIND the bridge, filling the upper-right and upper-center portions of the frame, the central TOKYO mainland skyline is visible in hazy soft focus — clustered mid-rise and high-rise buildings of Minato and Shiodome, pale grey and bone-white, slightly hazy. The distinctive orange-and-white silhouette of Tokyo Tower may be faintly visible rising above the skyline far to the right of the bridge, small and distant, not dominant. The water in the foreground and mid-ground is TOKYO BAY — calm late-afternoon water, pale blue-grey with warm golden highlights, small distant boats possible but not prominent. A PALE SANDY BEACH (Odaiba beach) curves along the shore in the mid-ground left. NO Mt. Fuji visible. NO Golden Gate Bridge, NO rust-orange bridge anywhere. NO ferris wheel visible. The sky is a clear warm golden-hour gradient, slightly hazy. " +
      "SUBJECT: A 34-year-old lean, lightly tan Japanese man. Sharp clean side-part of neatly-cut black hair. No facial hair. Closed-mouth expression with a faint smirk at the left corner — genuinely pleased but not smug. He wears: a slate-navy brushed-fleece quarter-zip pullover (Patagonia Better Sweater silhouette, but COMPLETELY UNBRANDED — no logo patches, no chest embroidery, no labels, no tags), the zip pulled halfway down, small stand collar flipped up behind his neck. Underneath the quarter-zip, a crisp white combed-cotton Oxford button-down shirt is clearly visible: its collar points sit cleanly outside the quarter-zip's zipper, and a narrow band of the white Oxford hem is tucked into his trousers. Dark khaki straight-cut cotton chinos, clean single break above the ankle, brown tumbled-leather belt with a simple silver-tone buckle. Plain white leather low-top trainers (Common Projects Achilles silhouette, completely unbranded). A resin-cased black G-Shock on the left wrist. A small brown pebbled-leather bifold wallet held loosely in his right hand at his side. Posture: weight on his back foot, feet shoulder-width, shoulders squared slightly off-axis to camera, chin level, gaze past the camera's right shoulder. Confident, easy, post-quarter-close. " +
      "LIGHT: Soft golden late-afternoon light raking from screen-right, catching his jawline and the front of the quarter-zip. A gentle bay breeze lifts the flipped collar very slightly. " +
      "COMPOSITION: Full body, subject centered, bridge in the upper-middle third of the background behind him. 4:5 vertical aspect ratio. Soft Portra 400 grain, natural skin texture, slight warm atmospheric haze. No digital sharpening. No lens flare. No smile showing teeth. No visible logos on any garment or shoe. No text anywhere. No kanji or Japanese signage visible anywhere in frame. No other close-up people. Editorial campaign mood — confident, unhurried, quietly transactional. " +
      "CRITICAL: render the Rainbow Bridge ACCURATELY — two tall white lattice-steel towers, DOUBLE-DECK main span, shallow catenary cables, white paint — positioned behind the subject spanning the frame horizontally left to right. Do NOT render the Golden Gate Bridge. Do NOT make the bridge orange. Do NOT make it single-deck. Do NOT use Art Deco stepped towers.",
  },
];

const selection = ONLY ? LOOKS.filter((l) => ONLY.includes(l.num)) : LOOKS;

async function generate(look) {
  const existing = ["png", "jpg", "jpeg", "webp"]
    .map((ext) => path.join(ASSETS, `look-${look.num}-${look.slug}.${ext}`))
    .find((p) => fs.existsSync(p));
  if (existing && !FORCE) {
    console.log(`  skip ${path.basename(existing)} (exists — pass --force to overwrite)`);
    return { look, status: "skipped", outPath: existing };
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: look.prompt }] }],
  };

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
  const outPath = path.join(ASSETS, `look-${look.num}-${look.slug}.${ext}`);
  const buf = Buffer.from(inline.data, "base64");
  fs.writeFileSync(outPath, buf);
  return { look, status: "ok", outPath, bytes: buf.length, mime };
}

(async () => {
  fs.mkdirSync(ASSETS, { recursive: true });
  console.log(`model: ${MODEL}`);
  console.log(`variant: JA`);
  console.log(`output: ${path.relative(ROOT, ASSETS)}/`);
  console.log(`looks: ${selection.map((l) => l.num).join(", ")}`);
  console.log("");

  const results = [];
  for (const look of selection) {
    const label = `LOOK ${look.num} ${look.name}`;
    process.stdout.write(`→ ${label}\n`);
    try {
      const r = await generate(look);
      if (r.status === "ok") {
        console.log(`  wrote ${path.basename(r.outPath)} (${(r.bytes / 1024).toFixed(0)} KB, ${r.mime})`);
      }
      results.push(r);
    } catch (e) {
      console.log(`  FAIL ${label}: ${e.message}`);
      results.push({ look, status: "error", error: e.message });
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
