import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-01";

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const ctaUrl =
  "https://register.visitcloud.com/survey/0rkfnv627tvpd?_sp=f516b81d-af6d-4d9f-a03f-22d8c089c7a3.1785942554508&_gl=1*v7uryy*_ga*MTUwNjk5MDU0NS4xNzg1OTQxNzM4*_ga_GHN3CFGDBH*czE3ODU5NDE3MzckbzEkZzAkdDE3ODU5NDE3MzckajYwJGwwJGgw*_gcl_au*NDI4NzgyNjM4LjE3ODU5NDE3MzY.*_ga_11T4DTN3PW*czE3ODU5NDE3MzckbzEkZzAkdDE3ODU5NDE3MzckajYwJGwwJGgw";

type ExistingSettings = {
  _id: string;
  promoPopup?: {
    image?: unknown;
  };
};

async function uploadPopupImage(imagePath: string) {
  const absolutePath = path.isAbsolute(imagePath)
    ? imagePath
    : path.join(process.cwd(), imagePath);

  if (!existsSync(absolutePath)) {
    throw new Error(`Image file not found: ${absolutePath}`);
  }

  const asset = await client.assets.upload("image", createReadStream(absolutePath), {
    filename: path.basename(absolutePath),
  });

  return {
    _type: "imageWithAlt",
    asset: { _type: "reference", _ref: asset._id },
    sourcePath: imagePath,
    alt: {
      _type: "localeString",
      en: "MIDEX booth location at Pharmaconex",
      ar: "موقع جناح MIDEX في Pharmaconex",
      de: "Standort des MIDEX-Stands auf der Pharmaconex",
    },
  };
}

async function run() {
  const imagePath = process.argv[2];
  const existing = await client.fetch<ExistingSettings | null>(
    '*[_type == "siteSettings"][0]{_id, promoPopup{image}}',
  );

  const image = imagePath
    ? await uploadPopupImage(imagePath)
    : existing?.promoPopup?.image;

  const promoPopup = {
    _type: "promoPopup",
    isActive: true,
    headline: {
      _type: "localeString",
      en: "Meet MIDEX at Pharmaconex",
      ar: "قابلوا MIDEX في Pharmaconex",
      de: "Treffen Sie MIDEX auf der Pharmaconex",
    },
    date: {
      _type: "localeString",
      en: "1-3 September 2026 · 10:00 AM - 6:00 PM",
      ar: "1-3 سبتمبر 2026 · من 10:00 صباحا إلى 6:00 مساء",
      de: "1.-3. September 2026 · 10:00-18:00 Uhr",
    },
    body: {
      _type: "localeText",
      en: "Discover our latest solutions for purified water systems and integrated engineering projects. Visit us at Booth H4.H20, Hall 4.",
      ar: "اكتشفوا أحدث حلولنا لأنظمة المياه النقية ومشروعات الهندسة المتكاملة. زورونا في جناح H4.H20، القاعة 4.",
      de: "Entdecken Sie unsere neuesten Lösungen für Reinwassersysteme und integrierte Engineering-Projekte. Besuchen Sie uns am Stand H4.H20, Halle 4.",
    },
    ctaLabel: {
      _type: "localeString",
      en: "Register now",
      ar: "سجّل الآن",
      de: "Jetzt registrieren",
    },
    ctaUrl,
    ...(image ? { image } : {}),
  };

  const id = existing?._id ?? "siteSettings";
  const result = existing
    ? await client.patch(id).set({ promoPopup }).commit({ autoGenerateArrayKeys: true })
    : await client.createOrReplace({ _id: id, _type: "siteSettings", promoPopup });

  console.log(`Updated ${result._id}: promoPopup is active.`);
  if (!imagePath && !image) {
    console.log("No popup image was set. Re-run with an image path to upload one.");
  }
}

run().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
