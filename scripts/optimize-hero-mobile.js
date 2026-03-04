/**
 * Converts hero-mobile.HEIC to web-friendly hero-mobile.jpg
 * (HEIC -> JPEG via heic-convert, then resize/compress via sharp)
 */
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const convert = require("heic-convert");
const sharp = require("sharp");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const PUBLIC_IMAGES = path.join(__dirname, "..", "public", "images");
const INPUT = path.join(PUBLIC_IMAGES, "hero-mobile.HEIC");
const OUT_JPG = path.join(PUBLIC_IMAGES, "hero-mobile.jpg");
const MAX_WIDTH = 768; // mobile-first
const JPG_QUALITY = 82;

async function run() {
  if (!fs.existsSync(INPUT)) {
    console.error("Missing public/images/hero-mobile.HEIC");
    process.exit(1);
  }

  console.log("Converting HEIC to JPEG...");
  const inputBuffer = await readFile(INPUT);
  const jpegBuffer = await convert({
    buffer: inputBuffer,
    format: "JPEG",
    quality: 0.9,
  });

  console.log("Resizing and optimizing for web...");
  await sharp(Buffer.from(jpegBuffer))
    .rotate()
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .jpeg({ quality: JPG_QUALITY })
    .toFile(OUT_JPG);

  console.log("Created hero-mobile.jpg (web-friendly for mobile)");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
