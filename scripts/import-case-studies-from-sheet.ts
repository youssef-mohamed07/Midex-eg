/**
 * Import all Midex case studies from the Google Sheet export.
 *
 * Source: Case Studies Midex spreadsheet (91 projects)
 * Usage: npx tsx scripts/import-case-studies-from-sheet.ts
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
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

const SHEET_MD =
  "/Users/youssef/.cursor/projects/Users-youssef-Developer-Midex/uploads/edit-0.md";

type SheetRow = {
  number: number;
  client: string;
  intro: string;
  challenge: string;
  approach: string;
  scope: string;
  deliverables: string;
  outcome: string;
};

type CaseStudySeed = {
  slug: string;
  client: string;
  industry: string;
  scope: string;
  intro: string;
  challenge: string;
  approach: string;
  highlights: string[];
  outcome: string;
  statValue: string;
  statLabel: string;
  tags: string[];
  order: number;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function cleanCell(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function parseSheetMarkdown(md: string): SheetRow[] {
  const rows: SheetRow[] = [];

  for (const line of md.split("\n")) {
    if (!/^\|\s*\d+\s+\|\s*\d+\s+\|/.test(line)) continue;

    const cells = line.split("|").map((cell) => cleanCell(cell));
    // cells[0] empty, [1] table row #, [2] Number, [3] Company, ...
    const number = Number(cells[2]);
    const client = cells[3];
    if (!Number.isFinite(number) || !client) continue;

    rows.push({
      number,
      client,
      intro: cells[4] ?? "",
      challenge: cells[5] ?? "",
      approach: cells[6] ?? "",
      scope: cells[7] ?? "",
      deliverables: cells[8] ?? "",
      outcome: cells[9] ?? "",
    });
  }

  return rows;
}

function scopeTitle(scope: string) {
  const beforeLocation = scope.split(/Location:/i)[0] ?? scope;
  return cleanCell(beforeLocation.replace(/\.$/, ""));
}

function extractYear(scope: string) {
  const match = scope.match(/Year of implementation:\s*(\d{4})/i);
  return match?.[1] ?? "";
}

function extractLocation(scope: string) {
  const match = scope.match(/Location:\s*(.+?)(?:\.\s*Year|$)/i);
  return cleanCell(match?.[1] ?? "");
}

function splitDeliverables(value: string) {
  return value
    .split(/;/)
    .map((part) => cleanCell(part.replace(/\.$/, "")))
    .filter(Boolean);
}

function inferIndustry(client: string, scope: string): string {
  const haystack = `${client} ${scope}`.toLowerCase();
  if (
    haystack.includes("kellogg") ||
    haystack.includes("mars wrigley") ||
    haystack.includes("food")
  ) {
    return "Food & Beverage";
  }
  if (haystack.includes("cosmetics") || haystack.includes("lee cosmetics")) {
    return "Cosmetics";
  }
  return "Pharmaceutical";
}

function buildTags(scope: string, title: string): string[] {
  const tags = new Set<string>();
  const lower = `${title} ${scope}`.toLowerCase();

  if (/\bss\b|stainless/.test(lower)) tags.add("Stainless steel");
  if (/pw|purified water/.test(lower)) tags.add("Purified water");
  if (/\bwfi\b|water for injection/.test(lower)) tags.add("WFI");
  if (/\bro\b|reverse osmosis/.test(lower)) tags.add("RO");
  if (/compressed air/.test(lower)) tags.add("Compressed air");
  if (/clean gas/.test(lower)) tags.add("Clean gases");
  if (/sanitary drain/.test(lower)) tags.add("Sanitary drain");
  if (/spare part/.test(lower)) tags.add("Spare parts");
  if (/filter/.test(lower)) tags.add("Filtration");
  if (/cip|sip/.test(lower)) tags.add("CIP/SIP");
  if (/scada/.test(lower)) tags.add("SCADA");
  if (/heat exchanger|hex\b/.test(lower)) tags.add("Heat exchanger");
  if (/modification/.test(lower)) tags.add("Modifications");
  if (/loop/.test(lower)) tags.add("Distribution loop");
  if (/orbital|welding|ss works|ss piping/.test(lower)) tags.add("Piping");

  if (tags.size === 0) {
    const short = title.split(/[–,]/)[0]?.trim();
    if (short) tags.add(short.slice(0, 32));
  }

  return [...tags].slice(0, 4);
}

function toSeed(row: SheetRow): CaseStudySeed {
  const title = scopeTitle(row.scope) || `Project ${row.number}`;
  const year = extractYear(row.scope);
  const location = extractLocation(row.scope);
  const slugBase = slugify(
    `${String(row.number).padStart(2, "0")}-${row.client}-${title}`,
  );
  const slug = slugBase || `case-study-${row.number}`;

  return {
    slug,
    client: row.client,
    industry: inferIndustry(row.client, row.scope),
    scope: row.scope,
    intro: row.intro,
    challenge: row.challenge,
    approach: row.approach,
    highlights: splitDeliverables(row.deliverables),
    outcome: row.outcome,
    statValue: year || location || String(row.number),
    statLabel: year ? "Year" : location ? "Location" : "Project",
    tags: buildTags(row.scope, title),
    order: row.number - 1,
  };
}

function L(en: string) {
  return { _type: "localeString" as const, en };
}

function LT(en: string) {
  return { _type: "localeText" as const, en };
}

function LL(en: string[]) {
  return { _type: "localeStringList" as const, en };
}

async function main() {
  const md = readFileSync(SHEET_MD, "utf8");
  const rows = parseSheetMarkdown(md);
  const seeds = rows.map(toSeed);

  if (seeds.length === 0) {
    console.error("No case studies parsed from sheet export.");
    process.exit(1);
  }

  const outDir = path.join(process.cwd(), "scripts/data");
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "case-studies-sheet.json");
  writeFileSync(outPath, JSON.stringify(seeds, null, 2));
  console.log(`Parsed ${seeds.length} case studies → ${outPath}`);

  const existing = await client.fetch<{ _id: string; slug?: string }[]>(
    `*[_type == "caseStudy"]{ _id, "slug": slug.current }`,
  );
  console.log(`Existing case studies in Sanity: ${existing.length}`);

  const tx = client.transaction();

  for (const doc of existing) {
    tx.delete(doc._id);
  }

  for (const item of seeds) {
    tx.createOrReplace({
      _id: `caseStudy-${item.slug}`,
      _type: "caseStudy",
      slug: { _type: "slug", current: item.slug },
      client: item.client,
      industry: L(item.industry),
      scope: LT(item.scope),
      intro: LT(item.intro),
      challenge: LT(item.challenge),
      approach: LT(item.approach),
      highlights: LL(item.highlights),
      outcome: LT(item.outcome),
      statValue: item.statValue,
      statLabel: L(item.statLabel),
      tags: LL(item.tags),
      order: item.order,
    });
  }

  console.log("Committing Sanity transaction…");
  await tx.commit({ visibility: "async" });

  const count = await client.fetch<number>(`count(*[_type == "caseStudy"])`);
  console.log(`Done. Case studies in Sanity: ${count}`);
  console.log("Sample:", seeds.slice(0, 3).map((s) => s.slug).join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
