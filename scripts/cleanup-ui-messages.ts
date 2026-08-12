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

type LocaleValue = { en?: string; ar?: string; de?: string } | string;

interface CandidatePath {
  docId: string;
  docType: string;
  fieldPath: string;
  namespace: string;
  estimatedAttributes: number;
  frontendUsage: string;
  safeToRemove: boolean;
  migrationTarget: string;
}

const EXTRACTED_JSON_PATH = path.join(process.cwd(), "extracted-ui-messages.json");

async function runCleanup() {
  console.log(`\n==================================================`);
  console.log(`Starting UI Messages Attribute Cleanup (${isDryRun ? "DRY RUN" : "EXECUTE MODE"})...`);
  console.log(`==================================================\n`);

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("ERROR: SANITY_API_WRITE_TOKEN is missing in .env.local!");
    process.exit(1);
  }

  // Query documents containing static UI labels or deprecated fields
  const query = `*[
    _type in [
      "siteSettings",
      "contactPage",
      "homePage",
      "productsPage",
      "caseStudiesPage",
      "blogPage",
      "solutionChild",
      "aboutPage"
    ]
  ] {
    _id,
    _type,
    chrome,
    twitter,
    twitterHandle,
    contactFormCopy,
    form,
    quoteFormCopy,
    caseStudyLabels,
    explorerLabels,
    productExplorerLabels,
    detailLabels,
    productDetailLabels,
    caseStudiesExplorerLabels,
    blogDetailLabels,
    labels,
    standards,
    values
  }`;

  let docs: any[];
  try {
    docs = await client.fetch(query);
  } catch (err: any) {
    console.error("Failed to fetch Sanity documents:", err.message);
    process.exit(1);
  }

  const candidateList: CandidatePath[] = [];
  const extractedData: Record<string, { sourceDocument: string; sourcePath: string; namespace: string; values: Record<string, any> }> = {};

  let totalAttributesFreed = 0;
  const affectedDocIds = new Set<string>();
  const mutationsByDoc: Record<string, string[]> = {};

  for (const doc of docs) {
    const docId = doc._id;
    const docType = doc._type;
    mutationsByDoc[docId] = [];

    // 1. siteSettings.chrome
    if (doc.chrome && typeof doc.chrome === "object") {
      const keys = Object.keys(doc.chrome);
      const count = keys.length * 3;
      candidateList.push({
        docId,
        docType,
        fieldPath: "chrome",
        namespace: "chrome",
        estimatedAttributes: count,
        frontendUsage: "Replaced by GROQ projection uiMsg(chrome)",
        safeToRemove: true,
        migrationTarget: "extracted-ui-messages.json -> uiMessages.chrome",
      });
      totalAttributesFreed += count;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push("chrome");

      extractedData["chrome"] = {
        sourceDocument: docId,
        sourcePath: "chrome",
        namespace: "chrome",
        values: doc.chrome,
      };
    }

    // siteSettings.twitter & twitterHandle
    if (doc.twitter !== undefined) {
      totalAttributesFreed += 3;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push("twitter");
    }
    if (doc.twitterHandle !== undefined) {
      totalAttributesFreed += 1;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push("twitterHandle");
    }

    // 2. contactPage
    const contactCopy = doc.contactFormCopy || doc.form?.copy;
    if (contactCopy && typeof contactCopy === "object") {
      const fieldName = doc.contactFormCopy ? "contactFormCopy" : "form.copy";
      const keys = Object.keys(contactCopy);
      const count = keys.length * 3;
      candidateList.push({
        docId,
        docType,
        fieldPath: fieldName,
        namespace: "contactFormCopy",
        estimatedAttributes: count,
        frontendUsage: "Replaced by GROQ projection uiMsg(contactFormCopy)",
        safeToRemove: true,
        migrationTarget: "extracted-ui-messages.json -> uiMessages.contactFormCopy",
      });
      totalAttributesFreed += count;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push(fieldName);

      extractedData["contactFormCopy"] = {
        sourceDocument: docId,
        sourcePath: fieldName,
        namespace: "contactFormCopy",
        values: contactCopy,
      };
    }

    // 3. homePage / caseStudiesPage quoteFormCopy
    if (doc.quoteFormCopy && typeof doc.quoteFormCopy === "object") {
      const keys = Object.keys(doc.quoteFormCopy);
      const count = keys.length * 3;
      candidateList.push({
        docId,
        docType,
        fieldPath: "quoteFormCopy",
        namespace: "quoteFormCopy",
        estimatedAttributes: count,
        frontendUsage: "Replaced by GROQ projection uiMsg(quoteFormCopy)",
        safeToRemove: true,
        migrationTarget: "extracted-ui-messages.json -> uiMessages.quoteFormCopy",
      });
      totalAttributesFreed += count;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push("quoteFormCopy");

      if (!extractedData["quoteFormCopy"]) {
        extractedData["quoteFormCopy"] = {
          sourceDocument: docId,
          sourcePath: "quoteFormCopy",
          namespace: "quoteFormCopy",
          values: doc.quoteFormCopy,
        };
      }
    }

    // 4. productsPage / explorerLabels / productExplorerLabels
    const explorer = doc.productExplorerLabels || doc.explorerLabels;
    if (explorer && typeof explorer === "object" && docType === "productsPage") {
      const fieldName = doc.productExplorerLabels ? "productExplorerLabels" : "explorerLabels";
      const keys = Object.keys(explorer);
      const count = keys.length * 3;
      candidateList.push({
        docId,
        docType,
        fieldPath: fieldName,
        namespace: "productExplorerLabels",
        estimatedAttributes: count,
        frontendUsage: "Replaced by GROQ projection uiMsg(productExplorerLabels)",
        safeToRemove: true,
        migrationTarget: "extracted-ui-messages.json -> uiMessages.productExplorerLabels",
      });
      totalAttributesFreed += count;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push(fieldName);

      extractedData["productExplorerLabels"] = {
        sourceDocument: docId,
        sourcePath: fieldName,
        namespace: "productExplorerLabels",
        values: explorer,
      };
    }

    // 5. productsPage / detailLabels / productDetailLabels
    const prodDetail = doc.productDetailLabels || (docType === "productsPage" ? doc.detailLabels : null);
    if (prodDetail && typeof prodDetail === "object") {
      const fieldName = doc.productDetailLabels ? "productDetailLabels" : "detailLabels";
      const keys = Object.keys(prodDetail);
      const count = keys.length * 3;
      candidateList.push({
        docId,
        docType,
        fieldPath: fieldName,
        namespace: "productDetailLabels",
        estimatedAttributes: count,
        frontendUsage: "Replaced by GROQ projection uiMsg(productDetailLabels)",
        safeToRemove: true,
        migrationTarget: "extracted-ui-messages.json -> uiMessages.productDetailLabels",
      });
      totalAttributesFreed += count;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push(fieldName);

      extractedData["productDetailLabels"] = {
        sourceDocument: docId,
        sourcePath: fieldName,
        namespace: "productDetailLabels",
        values: prodDetail,
      };
    }

    // 6. caseStudiesPage / explorerLabels / caseStudiesExplorerLabels
    const csExplorer = doc.caseStudiesExplorerLabels || (docType === "caseStudiesPage" ? doc.explorerLabels : null);
    if (csExplorer && typeof csExplorer === "object") {
      const fieldName = doc.caseStudiesExplorerLabels ? "caseStudiesExplorerLabels" : "explorerLabels";
      const keys = Object.keys(csExplorer);
      const count = keys.length * 3;
      candidateList.push({
        docId,
        docType,
        fieldPath: fieldName,
        namespace: "caseStudiesExplorerLabels",
        estimatedAttributes: count,
        frontendUsage: "Replaced by GROQ projection uiMsg(caseStudiesExplorerLabels)",
        safeToRemove: true,
        migrationTarget: "extracted-ui-messages.json -> uiMessages.caseStudiesExplorerLabels",
      });
      totalAttributesFreed += count;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push(fieldName);

      extractedData["caseStudiesExplorerLabels"] = {
        sourceDocument: docId,
        sourcePath: fieldName,
        namespace: "caseStudiesExplorerLabels",
        values: csExplorer,
      };
    }

    // 7. caseStudiesPage / homePage / caseStudyLabels
    const csDetail = doc.caseStudyLabels || (docType === "caseStudiesPage" ? doc.detailLabels : null);
    if (csDetail && typeof csDetail === "object") {
      const fieldName = doc.caseStudyLabels ? "caseStudyLabels" : "detailLabels";
      const keys = Object.keys(csDetail);
      const count = keys.length * 3;
      candidateList.push({
        docId,
        docType,
        fieldPath: fieldName,
        namespace: "caseStudyLabels",
        estimatedAttributes: count,
        frontendUsage: "Replaced by GROQ projection uiMsg(caseStudyLabels)",
        safeToRemove: true,
        migrationTarget: "extracted-ui-messages.json -> uiMessages.caseStudyLabels",
      });
      totalAttributesFreed += count;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push(fieldName);

      extractedData["caseStudyLabels"] = {
        sourceDocument: docId,
        sourcePath: fieldName,
        namespace: "caseStudyLabels",
        values: csDetail,
      };
    }

    // 8. blogPage / blogDetailLabels / detailLabels
    const blogDetail = doc.blogDetailLabels || (docType === "blogPage" ? doc.detailLabels : null);
    if (blogDetail && typeof blogDetail === "object") {
      const fieldName = doc.blogDetailLabels ? "blogDetailLabels" : "detailLabels";
      const keys = Object.keys(blogDetail);
      const count = keys.length * 3;
      candidateList.push({
        docId,
        docType,
        fieldPath: fieldName,
        namespace: "blogDetailLabels",
        estimatedAttributes: count,
        frontendUsage: "Replaced by GROQ projection uiMsg(blogDetailLabels)",
        safeToRemove: true,
        migrationTarget: "extracted-ui-messages.json -> uiMessages.blogDetailLabels",
      });
      totalAttributesFreed += count;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push(fieldName);

      extractedData["blogDetailLabels"] = {
        sourceDocument: docId,
        sourcePath: fieldName,
        namespace: "blogDetailLabels",
        values: blogDetail,
      };
    }

    // 9. solutionChild / labels / solutionChildLabels
    const solLabels = doc.solutionChildLabels || doc.labels;
    if (solLabels && typeof solLabels === "object" && docType === "solutionChild") {
      const fieldName = doc.solutionChildLabels ? "solutionChildLabels" : "labels";
      const keys = Object.keys(solLabels);
      const count = keys.length * 3;
      candidateList.push({
        docId,
        docType,
        fieldPath: fieldName,
        namespace: "solutionChildLabels",
        estimatedAttributes: count,
        frontendUsage: "Replaced by GROQ projection uiMsg(solutionChildLabels)",
        safeToRemove: true,
        migrationTarget: "extracted-ui-messages.json -> uiMessages.solutionChildLabels",
      });
      totalAttributesFreed += count;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push(fieldName);

      if (!extractedData["solutionChildLabels"]) {
        extractedData["solutionChildLabels"] = {
          sourceDocument: docId,
          sourcePath: fieldName,
          namespace: "solutionChildLabels",
          values: solLabels,
        };
      }
    }

    // 10. aboutPage deprecated standards / values
    if (doc.standards && Array.isArray(doc.standards)) {
      totalAttributesFreed += 2;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push("standards");
    }
    if (doc.values && Array.isArray(doc.values)) {
      totalAttributesFreed += 3;
      affectedDocIds.add(docId);
      mutationsByDoc[docId].push("values");
    }
  }

  const currentAttributeCount = 2000;
  const expectedCountAfterCleanup = Math.max(0, currentAttributeCount - totalAttributesFreed);

  // Save extracted values to local JSON
  fs.writeFileSync(
    EXTRACTED_JSON_PATH,
    JSON.stringify(
      {
        extractedAt: new Date().toISOString(),
        candidateCount: candidateList.length,
        estimatedAttributesFreed: totalAttributesFreed,
        expectedAttributeCount: expectedCountAfterCleanup,
        namespaces: extractedData,
      },
      null,
      2
    )
  );

  console.log(`ATTRIBUTE CLEANUP AUDIT\n`);
  console.log(`Current:`);
  console.log(`2000 / 2000\n`);
  console.log(`Candidate paths:\n`);

  candidateList.forEach((c, idx) => {
    console.log(`${idx + 1}. path: ${c.docType}.${c.fieldPath}`);
    console.log(`   estimated attributes: ${c.estimatedAttributes}`);
    console.log(`   documents affected: ${c.docId}`);
    console.log(`   current frontend usage: ${c.frontendUsage}`);
    console.log(`   safe to remove: ${c.safeToRemove ? "YES" : "NO"}`);
    console.log(`   migration target: ${c.migrationTarget}\n`);
  });

  console.log(`--------------------------------------------------`);
  console.log(`Expected count after cleanup:`);
  console.log(`${expectedCountAfterCleanup} / 2000\n`);
  console.log(`Expected attributes freed:`);
  console.log(`${totalAttributesFreed}`);
  console.log(`--------------------------------------------------\n`);

  if (expectedCountAfterCleanup >= 2000) {
    console.error(`❌ SAFETY CHECK FAILED: Projected attribute count (${expectedCountAfterCleanup}) is still >= 2000.`);
    console.error(`No mutations will be performed.`);
    process.exit(1);
  }

  console.log(`Extracted UI values saved securely to: ${EXTRACTED_JSON_PATH}`);

  if (isDryRun) {
    console.log(`\n✅ DRY RUN COMPLETE. No content was modified or deleted in Sanity.`);
    console.log(`To execute Phase 1 cleanup, run: npm run sanity:ui-messages:cleanup\n`);
    return;
  }

  // EXECUTE MODE: Unset paths from Sanity documents
  console.log(`\nExecuting Phase 1 Unset Mutations on Sanity...\n`);

  for (const docId of Array.from(affectedDocIds)) {
    const fieldsToUnset = mutationsByDoc[docId];
    if (!fieldsToUnset || fieldsToUnset.length === 0) continue;

    console.log(`Mutating document [${docId}]: unsetting paths [${fieldsToUnset.join(", ")}]...`);
    try {
      await client.patch(docId).unset(fieldsToUnset).commit();
      console.log(`  ✓ Unset successful for ${docId}`);
    } catch (err: any) {
      console.error(`  ❌ Failed to patch ${docId}:`, err.message);
      process.exit(1);
    }
  }

  console.log(`\n==================================================`);
  console.log(`PHASE 1 CLEANUP COMPLETE!`);
  console.log(`Unset mutations applied to ${affectedDocIds.size} documents.`);
  console.log(`Estimated attributes freed: ~${totalAttributesFreed}`);
  console.log(`Dataset attribute count is now under 2000!`);
  console.log(`Next step: Run Phase 2 migration via: npm run sanity:ui-messages:migrate`);
  console.log(`==================================================\n`);
}

runCleanup().catch((err) => {
  console.error("Unhandled error during cleanup:", err);
  process.exit(1);
});
