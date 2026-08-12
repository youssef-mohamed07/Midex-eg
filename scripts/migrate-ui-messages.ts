import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local", override: true });
loadEnv({ path: ".env" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const isDryRun = !process.argv.includes("--execute");

type LocaleText = { en?: string; ar?: string; de?: string };

async function runMigration() {
  console.log(`Starting UI Messages Migration (${isDryRun ? "DRY RUN" : "EXECUTE"})...`);

  // Fetch documents that contain the static labels
  const query = `*[
    _type == "siteSettings" || 
    _type == "contactPage" || 
    _type == "productPage" || 
    _type == "caseStudiesPage" || 
    _type == "solutionChild" || 
    _type == "blogPost"
  ] {
    _id,
    _type,
    chrome,
    quoteFormCopy,
    contactFormCopy,
    detailLabels,
    form,
    explorerLabels,
    productExplorerLabels,
    productDetailLabels,
    caseStudyLabels,
    caseStudiesExplorerLabels,
    solutionChildLabels,
    blogDetailLabels
  }`;

  let docs: any[];
  try {
    docs = await client.fetch(query);
  } catch (err: any) {
    console.error("Failed to fetch documents. If you get a 403, ensure your SANITY_API_WRITE_TOKEN has read access or run from an allowed origin.", err.message);
    process.exit(1);
  }

  // Group collected messages by namespace
  const namespaces: Record<string, Record<string, LocaleText>> = {
    chrome: {},
    quoteFormCopy: {},
    contactFormCopy: {},
    detailLabels: {},
    form: {},
    explorerLabels: {},
    productExplorerLabels: {},
    productDetailLabels: {},
    caseStudyLabels: {},
    caseStudiesExplorerLabels: {},
    solutionChildLabels: {},
    blogDetailLabels: {}
  };

  let originalFieldsAffected = 0;
  const docsToUpdate = new Set<string>();

  for (const doc of docs) {
    for (const ns of Object.keys(namespaces)) {
      if (doc[ns]) {
        docsToUpdate.add(doc._id);
        const obj = doc[ns];
        for (const [key, value] of Object.entries(obj)) {
          if (value && typeof value === 'object' && ('en' in value || 'ar' in value || 'de' in value)) {
            namespaces[ns][key] = value as LocaleText;
            originalFieldsAffected++;
          }
        }
      }
    }
  }

  let messagesCreated = 0;
  let messagesUpdated = 0;
  const expectedAttributeReduction = originalFieldsAffected * 3; // 3 attributes per localized field

  if (isDryRun) {
    console.log("\n--- DRY RUN SUMMARY ---");
    console.log(`Documents that will be changed: ${docsToUpdate.size}`);
    console.log(`Fields that will be migrated: ${originalFieldsAffected}`);
    console.log(`Expected attribute reduction: ~${expectedAttributeReduction} attributes`);
    console.log("\nNamespaces and keys to migrate:");
    for (const [ns, keys] of Object.entries(namespaces)) {
      const keyCount = Object.keys(keys).length;
      if (keyCount > 0) {
        console.log(` - ${ns}: ${keyCount} keys`);
      }
    }
    console.log("\nRun with 'npm run sanity:ui-messages:migrate' to execute.");
    return;
  }

  // EXECUTE MODE: Create/Update uiMessages documents
  for (const [ns, keys] of Object.entries(namespaces)) {
    const entries = Object.entries(keys).map(([key, value]) => ({
      _key: key,
      key,
      value: {
        _type: "localeText",
        en: value.en || "",
        ar: value.ar || "",
        de: value.de || ""
      }
    }));

    if (entries.length === 0) continue;

    const uiMessageDoc = {
      _id: `uiMessages.${ns}`,
      _type: "uiMessages",
      namespace: ns,
      entries
    };

    console.log(`Writing uiMessages for namespace '${ns}'...`);
    // Create or replace the uiMessage document
    await client.transaction().createIfNotExists(uiMessageDoc).patch(uiMessageDoc._id, p => p.set({ entries })).commit();
    messagesCreated += entries.length; // Approximate
  }

  console.log("\n--- MIGRATION COMPLETE ---");
  console.log(`Messages migrated: ${messagesCreated}`);
  console.log(`Please verify the data in Sanity Studio. Do NOT delete the old schema fields yet.`);
}

runMigration().catch(console.error);
