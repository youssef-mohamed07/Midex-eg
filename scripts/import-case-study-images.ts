/**
 * Upload downloaded client logos and attach each logo to every case study
 * belonging to that client. Existing case-study copy and galleries are kept.
 *
 * Usage: npm run import:case-study-images
 */

import { createReadStream, readdirSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import caseStudies from "./data/case-studies-sheet.json";
import { localeString } from "./lib/locale";

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

const IMAGE_DIR = path.join(
  process.cwd(),
  "public/images/case-studies/Midex",
);
const PUBLIC_DIR = "/images/case-studies/Midex";

const PREFERRED_FILES: Record<string, string> = {
  acdima: "ACDIMA.png",
  "bionostix mtbi": "Bionostix.jpg",
  "cons korra": "Cons Korra (1).png",
  "future pharma": "Future Pharma.png",
  "ghonem pharm": "Ghoneim Pharmaceutical..svg",
  "kellogg s noddle s": "Kellogg’s Noodles Egypt.jpg",
  "lee cosmetics": "LEE Cosmetics.jpg",
  "mash premier": "Mash Pharma.png",
  "orchidia pharmaceutical": "Orchidia Pharma.webp",
  "viatris pfizer": "Viatris.png",
};

function normalized(value: string) {
  return value
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/\(\d+\)/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function compact(value: string) {
  return normalized(value).replace(/\s+/g, "");
}

function findImage(clientName: string, files: string[]) {
  const name = normalized(clientName);
  const preferred = PREFERRED_FILES[name];
  if (preferred && files.includes(preferred)) return preferred;

  const exact = files.find((file) => compact(file) === compact(clientName));
  if (exact) return exact;

  const prefix = files.filter((file) => {
    const fileName = normalized(file);
    return fileName.startsWith(`${name} `) || name.startsWith(`${fileName} `);
  });
  return prefix.length === 1 ? prefix[0] : undefined;
}

async function getOrUploadAsset(fileName: string) {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $fileName][0]{_id}`,
    { fileName },
  );
  if (existing) return existing;

  return client.assets.upload(
    "image",
    createReadStream(path.join(IMAGE_DIR, fileName)),
    { filename: fileName },
  );
}

async function main() {
  const files = readdirSync(IMAGE_DIR).filter((file) =>
    /\.(avif|jpe?g|png|svg|webp)$/i.test(file),
  );
  const clients = [...new Set(caseStudies.map((item) => item.client))];
  const caseStudyDocs = await client.fetch<
    { _id: string; client: string }[]
  >(`*[_type == "caseStudy"]{_id, client}`);
  const matches = clients
    .map((clientName) => ({
      clientName,
      fileName: findImage(clientName, files),
    }))
    .filter(
      (
        match,
      ): match is {
        clientName: string;
        fileName: string;
      } => Boolean(match.fileName),
    );
  const unmatched = clients.filter(
    (clientName) => !matches.some((match) => match.clientName === clientName),
  );

  console.log(
    `Matched ${matches.length}/${clients.length} clients (${caseStudies.length} case studies).`,
  );
  if (unmatched.length > 0) {
    console.log(`No supplied logo: ${unmatched.join(", ")}`);
  }

  for (const [index, match] of matches.entries()) {
    console.log(
      `[${index + 1}/${matches.length}] ${match.clientName} ← ${match.fileName}`,
    );

    const asset = await getOrUploadAsset(match.fileName);
    const image = {
      _type: "imageWithAlt",
      asset: { _type: "reference", _ref: asset._id },
      sourcePath: `${PUBLIC_DIR}/${match.fileName}`,
      alt: localeString(`${match.clientName} logo`),
    };

    const documentIds = caseStudyDocs
      .filter((doc) => doc.client === match.clientName)
      .map((doc) => doc._id);
    const transaction = client.transaction();
    documentIds.forEach((documentId) => {
      transaction.patch(documentId, (patch) => patch.set({ image }));
    });
    await transaction.commit({ visibility: "sync" });
  }

  const result = await client.fetch<{
    total: number;
    withImage: number;
    clientsWithImage: number;
  }>(`{
    "total": count(*[_type == "caseStudy"]),
    "withImage": count(*[_type == "caseStudy" && defined(image.asset)]),
    "clientsWithImage": count(array::unique(*[_type == "caseStudy" && defined(image.asset)].client))
  }`);
  console.log("Import complete:", result);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
