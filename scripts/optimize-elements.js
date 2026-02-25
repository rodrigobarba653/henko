/**
 * Generates web-friendly versions of elements.jpg:
 * - elements.webp (primary, smaller)
 * - elements.jpg is kept as fallback; optionally overwritten with compressed version
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const PUBLIC_IMAGES = path.join(__dirname, "..", "public", "images");
const INPUT = path.join(PUBLIC_IMAGES, "elements.jpg");
const OUT_WEBP = path.join(PUBLIC_IMAGES, "elements.jpg");
const MAX_WIDTH = 1200; // enough for 2x on ~600px card
const WEBP_QUALITY = 82;

async function run() {
  if (!fs.existsSync(INPUT)) {
    console.error("Missing public/images/elements.jpg");
    process.exit(1);
  }

  const pipeline = sharp(INPUT).rotate(); // auto-orient from EXIF

  // WebP: modern, small
  await pipeline
    .clone()
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(OUT_WEBP);

  console.log("Created elements.jpg (web-friendly)");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
