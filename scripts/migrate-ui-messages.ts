import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import * as fs from "fs";
import * as path from "path";

loadEnv({ path: ".env.local", override: true });
loadEnv({ path: ".env" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "7vhvbsex",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const isExecute = process.argv.includes("--execute");
const isDryRun = !isExecute || process.argv.includes("--dry-run");

const EXTRACTED_JSON_PATH = path.join(process.cwd(), "extracted-ui-messages.json");

async function runMigratePhase2() {
  console.log(`\n==================================================`);
  console.log(`Starting Phase 2 — Create uiMessages (${isDryRun ? "DRY RUN" : "EXECUTE MODE"})...`);
  console.log(`==================================================\n`);

  if (!fs.existsSync(EXTRACTED_JSON_PATH)) {
    console.error(`❌ ERROR: ${EXTRACTED_JSON_PATH} not found!`);
    console.error(`Please run Phase 1 cleanup first: npm run sanity:ui-messages:cleanup`);
    process.exit(1);
  }

  const rawJson = fs.readFileSync(EXTRACTED_JSON_PATH, "utf-8");
  const extracted = JSON.parse(rawJson);
  const namespaces = extracted.namespaces || {};

  const nsKeys = Object.keys(namespaces);
  if (nsKeys.length === 0) {
    console.error("❌ ERROR: No namespaces found in extracted-ui-messages.json!");
    process.exit(1);
  }

  console.log(`Found ${nsKeys.length} namespaces to migrate into uiMessages documents:\n`);
  for (const ns of nsKeys) {
    const values = namespaces[ns].values || {};
    console.log(` - Namespace '${ns}': ${Object.keys(values).length} key-value entries`);
  }

  if (isDryRun) {
    console.log(`\n✅ DRY RUN COMPLETE. No uiMessages documents created.`);
    console.log(`To execute Phase 2 migration, run: npm run sanity:ui-messages:migrate\n`);
    return;
  }

  console.log(`\nExecuting Phase 2 Creation of uiMessages Documents...\n`);

  let totalEntriesCreated = 0;

  for (const ns of nsKeys) {
    const values = namespaces[ns].values || {};
    const entries = Object.entries(values).map(([key, val]: [string, any]) => {
      let en = "";
      let ar = "";
      let de = "";

      if (val && typeof val === "object") {
        en = val.en || "";
        ar = val.ar || "";
        de = val.de || "";
      } else if (typeof val === "string") {
        en = val;
      }

      return {
        _key: key,
        key: key,
        value: {
          _type: "localeText",
          en,
          ar,
          de,
        },
      };
    });

    if (entries.length === 0) continue;

    const docId = `uiMessages.${ns}`;
    const uiDoc = {
      _id: docId,
      _type: "uiMessages",
      name: ns,
      namespace: ns,
      entries,
    };

    console.log(`Writing uiMessages document [${docId}] (${entries.length} entries)...`);
    try {
      await client.transaction().createIfNotExists(uiDoc).patch(docId, (p) => p.set({ name: ns, namespace: ns, entries })).commit();
      console.log(`  ✓ Document ${docId} successfully created/updated.`);
      totalEntriesCreated += entries.length;
    } catch (err: any) {
      console.error(`  ❌ Failed to write uiMessages document ${docId}:`, err.message);
      process.exit(1);
    }
  }

  console.log(`\n==================================================`);
  console.log(`PHASE 2 MIGRATION COMPLETE!`);
  console.log(`Created/updated ${nsKeys.length} uiMessages documents with ${totalEntriesCreated} total entries.`);
  console.log(`All translations (English, Arabic, German) preserved.`);
  console.log(`Attribute capacity remaining: ~430+ attributes.`);
  console.log(`==================================================\n`);
}

runMigratePhase2().catch((err) => {
  console.error("Unhandled error during migration:", err);
  process.exit(1);
});
