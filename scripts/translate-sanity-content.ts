/**
 * Replace English placeholder copies in Sanity locale fields with real
 * Arabic and German machine translations.
 *
 * Existing translations are preserved. Results are cached locally so the
 * operation is deterministic and future runs only translate new copy.
 *
 * Usage: npm run seed:translations
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

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

type Target = "ar" | "de";
type Cache = Record<Target, Record<string, string>>;
type SanityDocument = Record<string, unknown> & {
  _id: string;
  _type: string;
};

const CACHE_FILE = path.join(
  process.cwd(),
  "scripts/data/sanity-translations.json",
);
const SEPARATOR = "<<<MIDEX_SPLIT_9F4C>>>";
const MAX_BATCH_CHARS = 3_500;
const COMMIT_BATCH_SIZE = 40;

function readCache(): Cache {
  if (!existsSync(CACHE_FILE)) return { ar: {}, de: {} };
  const parsed = JSON.parse(readFileSync(CACHE_FILE, "utf8")) as Partial<Cache>;
  return { ar: parsed.ar ?? {}, de: parsed.de ?? {} };
}

function saveCache(cache: Cache) {
  mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  writeFileSync(CACHE_FILE, `${JSON.stringify(cache, null, 2)}\n`);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function collectEnglishPlaceholders(
  value: unknown,
  target: Target,
  output: Set<string>,
) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectEnglishPlaceholders(item, target, output));
    return;
  }
  if (!isObject(value)) return;

  if (value._type === "localeString" || value._type === "localeText") {
    if (
      typeof value.en === "string" &&
      (value[target] === value.en || !value[target])
    ) {
      output.add(value.en);
    }
    return;
  }

  if (value._type === "localeStringList") {
    const en = Array.isArray(value.en) ? value.en : [];
    const localized = Array.isArray(value[target]) ? value[target] : [];
    en.forEach((item, index) => {
      if (
        typeof item === "string" &&
        (localized[index] === item || !localized[index])
      ) {
        output.add(item);
      }
    });
    return;
  }

  Object.values(value).forEach((item) =>
    collectEnglishPlaceholders(item, target, output),
  );
}

function makeBatches(values: string[]): string[][] {
  const batches: string[][] = [];
  let current: string[] = [];
  let length = 0;

  for (const value of values) {
    const addedLength = value.length + SEPARATOR.length + 2;
    if (current.length > 0 && length + addedLength > MAX_BATCH_CHARS) {
      batches.push(current);
      current = [];
      length = 0;
    }
    current.push(value);
    length += addedLength;
  }

  if (current.length > 0) batches.push(current);
  return batches;
}

async function requestTranslation(text: string, target: Target) {
  const url = new URL(
    "https://translate.googleapis.com/translate_a/single",
  );
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "en");
  url.searchParams.set("tl", target);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);

  let lastError: unknown;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Translation HTTP ${response.status}`);
      }
      const data = (await response.json()) as [Array<[string]>];
      return data[0].map((part) => part[0]).join("").trim();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1_000));
    }
  }
  throw lastError;
}

async function translateBatch(values: string[], target: Target) {
  if (values.length === 1) {
    return [await requestTranslation(values[0], target)];
  }

  const joined = values.join(`\n${SEPARATOR}\n`);
  const translated = await requestTranslation(joined, target);
  const parts = translated.split(SEPARATOR).map((part) => part.trim());

  if (parts.length === values.length && parts.every(Boolean)) return parts;

  console.warn("Batch separator changed; retrying entries individually.");
  const fallback: string[] = [];
  for (const value of values) {
    fallback.push(await requestTranslation(value, target));
  }
  return fallback;
}

async function buildTranslations(
  docs: SanityDocument[],
  target: Target,
  cache: Cache,
) {
  const sources = new Set<string>();
  docs.forEach((doc) => collectEnglishPlaceholders(doc, target, sources));
  const pending = [...sources].filter((source) => !cache[target][source]);
  const batches = makeBatches(pending);

  console.log(
    `${target}: ${sources.size} placeholders, ${pending.length} new translations`,
  );

  for (const [index, batch] of batches.entries()) {
    const translations = await translateBatch(batch, target);
    batch.forEach((source, itemIndex) => {
      cache[target][source] = translations[itemIndex];
    });
    saveCache(cache);
    console.log(`${target}: translated batch ${index + 1}/${batches.length}`);
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
}

function applyTranslations(
  value: unknown,
  target: Target,
  translations: Record<string, string>,
): boolean {
  let changed = false;

  if (Array.isArray(value)) {
    value.forEach((item) => {
      if (applyTranslations(item, target, translations)) changed = true;
    });
    return changed;
  }
  if (!isObject(value)) return false;

  if (value._type === "localeString" || value._type === "localeText") {
    if (
      typeof value.en === "string" &&
      (value[target] === value.en || !value[target]) &&
      translations[value.en] &&
      translations[value.en] !== value[target]
    ) {
      value[target] = translations[value.en];
      return true;
    }
    return false;
  }

  if (value._type === "localeStringList") {
    const en = Array.isArray(value.en) ? value.en : [];
    const localized = Array.isArray(value[target])
      ? [...value[target]]
      : new Array(en.length);

    en.forEach((item, index) => {
      if (
        typeof item === "string" &&
        (localized[index] === item || !localized[index]) &&
        translations[item] &&
        translations[item] !== localized[index]
      ) {
        localized[index] = translations[item];
        changed = true;
      }
    });
    if (changed) value[target] = localized;
    return changed;
  }

  Object.values(value).forEach((item) => {
    if (applyTranslations(item, target, translations)) changed = true;
  });
  return changed;
}

async function main() {
  const docs = await client.fetch<SanityDocument[]>(
    `*[!(_type match "sanity.*") && !(_type match "system.*")]`,
  );
  const cache = readCache();

  await buildTranslations(docs, "ar", cache);
  await buildTranslations(docs, "de", cache);

  const changedDocs = docs.filter((doc) => {
    const arChanged = applyTranslations(doc, "ar", cache.ar);
    const deChanged = applyTranslations(doc, "de", cache.de);
    return arChanged || deChanged;
  });

  console.log(`Updating ${changedDocs.length} Sanity documents…`);

  for (let index = 0; index < changedDocs.length; index += COMMIT_BATCH_SIZE) {
    const batch = changedDocs.slice(index, index + COMMIT_BATCH_SIZE);
    const transaction = client.transaction();

    batch.forEach((doc) => {
      const content = Object.fromEntries(
        Object.entries(doc).filter(
          ([key]) =>
            !["_id", "_type", "_rev", "_createdAt", "_updatedAt"].includes(
              key,
            ),
        ),
      );
      transaction.createOrReplace({
        _id: doc._id,
        _type: doc._type,
        ...content,
      });
    });

    await transaction.commit({ visibility: "async" });
    console.log(
      `Updated batch ${Math.floor(index / COMMIT_BATCH_SIZE) + 1}/${Math.ceil(changedDocs.length / COMMIT_BATCH_SIZE)}`,
    );
  }

  console.log("All duplicated English placeholders are now translated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
