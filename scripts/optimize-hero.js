/**
 * Generates web-friendly hero image: hero.webp
 * Hero is full-width so we allow up to 1920px for large screens.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const PUBLIC_IMAGES = path.join(__dirname, "..", "public", "images");
const INPUT = path.join(PUBLIC_IMAGES, "hero.jpg");
const OUT_WEBP = path.join(PUBLIC_IMAGES, "hero.jpg");
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;

async function run() {
  if (!fs.existsSync(INPUT)) {
    console.error("Missing public/images/hero.jpg");
    process.exit(1);
  }

  await sharp(INPUT)
    .rotate()
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(OUT_WEBP);

  console.log("Created hero.jpg (web-friendly)");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
