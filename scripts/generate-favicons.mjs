/**
 * Generates Google-compliant favicons from the brand SVG.
 * Google requires favicons sized in multiples of 48px, plus /favicon.ico fallback.
 * Run: node scripts/generate-favicons.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const svg = readFileSync(join(root, "public/images/brand/favicon.svg"));

async function renderPng(size) {
  return sharp(svg, { density: 1200 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

/** Builds a .ico file from PNG buffers (ICO supports embedded PNG entries). */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  const dirSize = 16 * entries.length;
  let offset = 6 + dirSize;
  const dirs = [];
  for (const { size, buffer } of entries) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(size >= 256 ? 0 : size, 0); // width
    dir.writeUInt8(size >= 256 ? 0 : size, 1); // height
    dir.writeUInt8(0, 2); // palette
    dir.writeUInt8(0, 3); // reserved
    dir.writeUInt16LE(1, 4); // color planes
    dir.writeUInt16LE(32, 6); // bits per pixel
    dir.writeUInt32LE(buffer.length, 8);
    dir.writeUInt32LE(offset, 12);
    offset += buffer.length;
    dirs.push(dir);
  }

  return Buffer.concat([header, ...dirs, ...entries.map((e) => e.buffer)]);
}

const brandDir = join(root, "public/images/brand");
mkdirSync(brandDir, { recursive: true });

const sizes = [16, 32, 48, 96, 192, 512];
const rendered = {};
for (const size of sizes) {
  rendered[size] = await renderPng(size);
}

writeFileSync(join(brandDir, "favicon-48.png"), rendered[48]);
writeFileSync(join(brandDir, "favicon-96.png"), rendered[96]);
writeFileSync(join(brandDir, "favicon-192.png"), rendered[192]);
writeFileSync(join(brandDir, "favicon-512.png"), rendered[512]);

const ico = buildIco([
  { size: 16, buffer: rendered[16] },
  { size: 32, buffer: rendered[32] },
  { size: 48, buffer: rendered[48] },
]);
writeFileSync(join(root, "src/app/favicon.ico"), ico);

console.log("Generated favicon-{48,96,192,512}.png and src/app/favicon.ico");
