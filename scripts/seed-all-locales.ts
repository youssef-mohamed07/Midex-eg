/**
 * Backfill missing Arabic / German on every locale* field across the dataset.
 *
 * - Walks all content documents (skips system / asset types).
 * - Copies `en` → `ar` / `de` when those locales are empty.
 * - Leaves existing translations untouched.
 *
 * Usage: npm run seed:locales
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */

import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";
import { fillMissingLocales } from "./lib/locale";

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

const SKIP_TYPES = new Set([
  "sanity.imageAsset",
  "sanity.fileAsset",
  "system.group",
  "system.retention",
]);

const BATCH = 40;

async function main() {
  const docs = await client.fetch<Record<string, unknown>[]>(
    `*[!(_type in $skip)]`,
    { skip: [...SKIP_TYPES] },
  );

  console.log(`Scanning ${docs.length} documents for missing locales…`);

  const toPatch: { _id: string; doc: Record<string, unknown> }[] = [];

  for (const doc of docs) {
    const clone = structuredClone(doc) as Record<string, unknown>;
    if (!fillMissingLocales(clone)) continue;
    toPatch.push({ _id: String(doc._id), doc: clone });
  }

  console.log(`Documents needing ar/de backfill: ${toPatch.length}`);

  for (let i = 0; i < toPatch.length; i += BATCH) {
    const slice = toPatch.slice(i, i + BATCH);
    const tx = client.transaction();

    for (const { _id, doc } of slice) {
      const { _id: _ignoredId, _rev, _createdAt, _updatedAt, _type, ...rest } =
        doc;
      tx.createOrReplace({
        _id,
        _type: String(_type),
        ...rest,
      });
    }

    console.log(
      `Committing batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(toPatch.length / BATCH)} (${slice.length} docs)…`,
    );
    await tx.commit({ visibility: "async" });
  }

  const sample = await client.fetch(`{
    "product": *[_type=="product"][0]{title,description},
    "caseStudy": *[_type=="caseStudy"][0]{industry,intro},
    "category": *[_type=="productCategory"][0]{label}
  }`);

  console.log("Done. Sample locales:");
  console.log(JSON.stringify(sample, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
