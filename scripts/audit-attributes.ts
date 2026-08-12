import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local", override: true });
loadEnv({ path: ".env" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function runAudit() {
  console.log("Fetching all documents...");
  const docs = await client.fetch(`*`);
  
  console.log(`Total documents fetched: ${docs.length}`);

  const attributesCountPerType: Record<string, number> = {};
  const instancesCountPerType: Record<string, number> = {};
  
  // Track specific fields that consume the most attributes
  const fieldOccurrences: Record<string, number> = {};

  function countKeys(obj: any, path: string = ""): number {
    if (obj === null || typeof obj !== "object") {
      return 0; // Primitives don't count towards Sanity limit? Actually the attribute limit is about distinct "paths" across all documents of the same schema? No, wait.
      // Wait, Sanity's "attribute limit" means unique JSON property paths (keys) across all documents in a dataset? 
      // Yes, "Total attribute/datatype count exceeds limit of 2000" refers to the unique number of property paths (e.g. "body.en.0.children.1.marks").
      // Actually, wait! The attribute limit is per DATASET.
      // The limit is the number of distinct property combinations. 
      // Let's print out all unique property paths for the whole dataset.
    }

    if (Array.isArray(obj)) {
      return obj.reduce((acc, val, idx) => acc + countKeys(val, `${path}[*]`), 0);
    }

    let count = 0;
    for (const key of Object.keys(obj)) {
      // In Sanity, every unique property name contributes to the attribute limit. 
      // E.g., if you have `_type: 'product'` and it has `title`, that's an attribute `title`. 
      // If it has `description.en`, that's `description` and `description.en`.
      const currentPath = path ? `${path}.${key}` : key;
      fieldOccurrences[currentPath] = (fieldOccurrences[currentPath] || 0) + 1;
      
      count += 1 + countKeys(obj[key], currentPath);
    }
    return count;
  }

  const uniquePaths = new Set<string>();

  function collectUniquePaths(obj: any, path: string = "") {
    if (obj === null || typeof obj !== "object") {
      return;
    }
    if (Array.isArray(obj)) {
      // Arrays don't create new attributes for each index, but the properties of objects inside the array do.
      // E.g., `list[0].name` and `list[1].name` are considered the same attribute path `list.name`.
      // Actually Sanity counts `list[].name` as a single path.
      for (const item of obj) {
        collectUniquePaths(item, path ? `${path}[]` : `[]`);
      }
      return;
    }

    for (const key of Object.keys(obj)) {
      if (key.startsWith("_") && key !== "_type" && key !== "_key" && key !== "_ref") {
         // skip internal sanity stuff if we want, but let's include it.
      }
      const currentPath = path ? `${path}.${key}` : key;
      uniquePaths.add(currentPath);
      collectUniquePaths(obj[key], currentPath);
    }
  }

  for (const doc of docs) {
    const type = doc._type;
    instancesCountPerType[type] = (instancesCountPerType[type] || 0) + 1;
    
    // Count per doc
    const currentDocUniquePaths = new Set<string>();
    
    function collectDocPaths(obj: any, p: string = "") {
        if (obj === null || typeof obj !== "object") return;
        if (Array.isArray(obj)) {
            for (const item of obj) collectDocPaths(item, p ? `${p}[]` : `[]`);
            return;
        }
        for (const key of Object.keys(obj)) {
            const currentP = p ? `${p}.${key}` : key;
            currentDocUniquePaths.add(currentP);
            collectDocPaths(obj[key], currentP);
        }
    }
    
    collectDocPaths(doc, type);
    currentDocUniquePaths.forEach(p => uniquePaths.add(p));
    
    const count = countKeys(doc);
    attributesCountPerType[type] = (attributesCountPerType[type] || 0) + count;
  }

  console.log("\n--- Unique Property Paths (Dataset Attributes) ---");
  console.log(`Total unique attribute paths in dataset: ${uniquePaths.size}`);
  
  console.log("\n--- Instances per _type ---");
  console.table(
    Object.entries(instancesCountPerType)
      .sort((a, b) => b[1] - a[1])
  );

  // Analyze the prefixes of unique paths to see where most attributes come from
  const pathPrefixCount: Record<string, number> = {};
  for (const path of uniquePaths) {
    const parts = path.split(".");
    if (parts.length > 1) {
        // e.g. "product.title.en" -> prefix "product"
        const prefix = parts[0];
        pathPrefixCount[prefix] = (pathPrefixCount[prefix] || 0) + 1;
        
        if (parts.length > 2) {
            const prefix2 = parts[0] + "." + parts[1];
            pathPrefixCount[prefix2] = (pathPrefixCount[prefix2] || 0) + 1;
        }
    }
  }

  console.log("\n--- Top Attribute Consumers (By _type prefix) ---");
  console.table(
    Object.entries(pathPrefixCount)
      .filter(([k]) => !k.includes("[]"))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
  );

  console.log("\n--- Sample of unique paths ---");
  const sortedPaths = Array.from(uniquePaths).sort();
  console.log(sortedPaths.slice(0, 100).join("\n"));
  // Let's print paths containing []
  const arrayPaths = sortedPaths.filter(p => p.includes("[]"));
  console.log(`\nPaths containing arrays: ${arrayPaths.length}`);
  console.log(arrayPaths.slice(0, 50).join("\n"));

}

runAudit().catch(console.error);
