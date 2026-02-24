const fs = require("fs");
const path = require("path");
const fontverter = require("fontverter");

const OTF_DIR = path.join(__dirname, "../public/fonts/EditorNotesFont/OTF");
const WOFF2_DIR = path.join(__dirname, "../public/fonts/EditorNotesFont/WOFF2");

if (!fs.existsSync(OTF_DIR)) {
  console.error("OTF directory not found:", OTF_DIR);
  process.exit(1);
}

fs.mkdirSync(WOFF2_DIR, { recursive: true });

const files = fs.readdirSync(OTF_DIR).filter((f) => f.endsWith(".otf"));

async function convertAll() {
  for (const file of files) {
    const inputPath = path.join(OTF_DIR, file);
    const outputName = file.replace(/\.otf$/i, ".woff2");
    const outputPath = path.join(WOFF2_DIR, outputName);
    try {
      const buffer = fs.readFileSync(inputPath);
      const woff2 = await fontverter.convert(buffer, "woff2");
      fs.writeFileSync(outputPath, woff2);
      console.log("OK:", file, "->", outputName);
    } catch (err) {
      console.error("FAIL:", file, err.message);
    }
  }
}

convertAll();
