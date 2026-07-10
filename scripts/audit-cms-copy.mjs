#!/usr/bin/env node
/**
 * Delivery audit: lists getTranslations() namespaces used in components.
 * Editors should change user-facing copy in Sanity (page fields, siteSettings.chrome,
 * form copy, or UI Messages) — not messages/*.json.
 *
 * Usage: node scripts/audit-cms-copy.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "src/components");
const PATTERN =
  /(?:getTranslations|useTranslations)\(\s*["']([^"']+)["']\s*\)/g;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const files = await walk(ROOT);
const byNamespace = new Map();

for (const file of files) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(PATTERN)) {
    const ns = match[1];
    if (!byNamespace.has(ns)) byNamespace.set(ns, new Set());
    byNamespace.get(ns).add(path.relative(process.cwd(), file));
  }
}

console.log("CMS copy audit — next-intl usage in components\n");
console.log(
  "Prefer Sanity: Site Settings → Nav & Footer, page documents, form copy objects, UI Messages.\n",
);
console.log("Bundled messages/*.json is fallback only.\n");

const namespaces = [...byNamespace.keys()].sort();
for (const ns of namespaces) {
  const filesForNs = [...byNamespace.get(ns)].sort();
  console.log(`## ${ns} (${filesForNs.length} files)`);
  for (const file of filesForNs) console.log(`  - ${file}`);
  console.log();
}

console.log(`Total namespaces: ${namespaces.length}`);
