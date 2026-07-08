/**
 * Upload new brand logos + manifest colors to Sanity siteSettings.
 * Run: npx tsx scripts/patch-brand-assets.ts
 */

import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";
import { brandManifest } from "../src/lib/branding/tokens";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "7vhvbsex";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function upload(publicPath: string) {
  const filePath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (!existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  return asset._id;
}

function imageField(assetId: string, sourcePath: string) {
  return {
    _type: "imageWithAlt",
    sourcePath,
    asset: { _type: "reference", _ref: assetId },
    alt: { _type: "localeString", en: "Midex", ar: "ميدكس", de: "Midex" },
  };
}

async function main() {
  const [logoDarkId, logoWhiteId] = await Promise.all([
    upload("/images/brand/logo-dark.png"),
    upload("/images/brand/logo-white.png"),
  ]);

  await client
    .patch("siteSettings")
    .set({
      logoDark: imageField(logoDarkId, "/images/brand/logo-dark.png"),
      logoWhite: imageField(logoWhiteId, "/images/brand/logo-white.png"),
      manifestBackgroundColor: brandManifest.backgroundColor,
      manifestThemeColor: brandManifest.themeColor,
    })
    .commit();

  console.log("Updated Sanity siteSettings with new brand logos and colors.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
