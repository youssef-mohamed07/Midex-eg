/**
 * One-off patch: localize testimonial names (en / ar / de).
 * Run: npx tsx scripts/patch-testimonial-names.ts
 */

import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";

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

const L = (en: string, ar: string, de: string) => ({
  _type: "localeString" as const,
  en,
  ar,
  de,
});

const patches: Record<string, ReturnType<typeof L>> = {
  "testimonial-sara-walid": L("Sara Walid", "سارة وليد", "Sara Walid"),
  "testimonial-moataz-mohamed": L("Moataz Mohamed", "معتز محمد", "Moataz Mohamed"),
  "testimonial-mohamed-hossam": L("Mohamed Hossam", "محمد حسام", "Mohamed Hossam"),
  "testimonial-bahaa": L("Bahaa", "بهاء", "Bahaa"),
};

async function main() {
  const tx = client.transaction();

  for (const [id, name] of Object.entries(patches)) {
    tx.patch(id, { set: { name } });
    console.log(`  patch ${id} → ar: ${name.ar}`);
  }

  await tx.commit();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
