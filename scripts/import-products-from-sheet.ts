/**
 * Import the Midex product spreadsheet and matching Google Drive images.
 *
 * The Drive files are matched by their two-digit product number prefix.
 * Run after downloading the shared folder into tmp/product-drive:
 *   npx tsx scripts/import-products-from-sheet.ts
 */

import { createReadStream } from "node:fs";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";
import { localeString, localeText } from "./lib/locale";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "7vhvbsex",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const SHEET_MD =
  "/Users/youssef/.cursor/projects/Users-youssef-Developer-Midex/uploads/edit-0.md";
const DRIVE_DIR = path.join(process.cwd(), "tmp/product-drive");
const PUBLIC_DIR = path.join(process.cwd(), "public/images/products/web-ready");
const DATA_FILE = path.join(process.cwd(), "scripts/data/products-sheet.json");

const CATEGORY_SLUGS: Record<string, string> = {
  "Piping and Fitting": "piping-and-fitting",
  Valves: "valves",
  Instruments: "instruments",
  Pumps: "pumps",
  "UV Units": "uv-units",
  Filters: "filters",
  "Stainless Steel Tanks": "stainless-steel-tanks",
  "Hygienic Drain Works": "hygienic-drains",
};

type ProductRow = {
  number: number;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  applications: string;
};

type ImportedProduct = ProductRow & {
  slug: string;
  categorySlug: string;
  imagePath: string;
};

function cleanCell(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function parseSheet(md: string): ProductRow[] {
  const rows: ProductRow[] = [];

  for (const line of md.split("\n")) {
    if (!/^\|\s*\d+\s+\|\s*\d+\s+\|/.test(line)) continue;

    const cells = line.split("|").map(cleanCell);
    const number = Number(cells[2]);
    const category = cells[3] ?? "";
    const subcategory = cells[4] ?? "";
    const title = cells[5] ?? "";
    const description = cells[6] ?? "";
    const applications = cells[7] ?? "";

    if (!Number.isFinite(number) || !category || !title || !description) continue;
    rows.push({ number, category, subcategory, title, description, applications });
  }

  return rows;
}

function listFilesRecursively(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFilesRecursively(fullPath) : [fullPath];
  });
}

function normalizeImageName(filePath: string) {
  return path.basename(filePath).toLowerCase().replace(/\s+/g, "_");
}

function matchImages(rows: ProductRow[]): ImportedProduct[] {
  if (!existsSync(DRIVE_DIR)) {
    throw new Error(`Drive image folder does not exist: ${DRIVE_DIR}`);
  }

  const imageFiles = listFilesRecursively(DRIVE_DIR).filter((filePath) =>
    /\.(png|jpe?g|webp)$/i.test(filePath),
  );

  return rows.map((row) => {
    const prefix = String(row.number).padStart(2, "0");
    const sourceImage = imageFiles.find((filePath) =>
      new RegExp(`^${prefix}[_\\s-]`, "i").test(path.basename(filePath)),
    );

    if (!sourceImage) {
      throw new Error(`Missing image for product ${row.number}: ${row.title}`);
    }

    const categorySlug = CATEGORY_SLUGS[row.category];
    if (!categorySlug) {
      throw new Error(`Unknown category "${row.category}" for ${row.title}`);
    }

    const imageName = normalizeImageName(sourceImage);
    const destination = path.join(PUBLIC_DIR, imageName);
    copyFileSync(sourceImage, destination);

    return {
      ...row,
      slug: slugify(row.title),
      categorySlug,
      imagePath: `/images/products/web-ready/${imageName}`,
    };
  });
}

async function uploadImage(product: ImportedProduct) {
  const filePath = path.join(
    process.cwd(),
    "public",
    product.imagePath.replace(/^\//, ""),
  );
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: path.basename(filePath),
  });

  return {
    _type: "imageWithAlt",
    asset: { _type: "reference", _ref: asset._id },
    sourcePath: product.imagePath,
    alt: localeString(product.title),
  };
}

async function main() {
  const rows = parseSheet(readFileSync(SHEET_MD, "utf8"));
  if (rows.length !== 41) {
    throw new Error(`Expected 41 products, parsed ${rows.length}`);
  }

  mkdirSync(PUBLIC_DIR, { recursive: true });
  mkdirSync(path.dirname(DATA_FILE), { recursive: true });

  const products = matchImages(rows);
  const slugs = new Set(products.map((product) => product.slug));
  if (slugs.size !== products.length) {
    throw new Error("Duplicate product slugs detected");
  }

  writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
  console.log(`Matched ${products.length} products and images.`);

  const images = new Map<string, Awaited<ReturnType<typeof uploadImage>>>();
  for (const [index, product] of products.entries()) {
    console.log(`[${index + 1}/${products.length}] Uploading ${product.title}`);
    images.set(product.slug, await uploadImage(product));
  }

  const existingProducts = await client.fetch<{ _id: string }[]>(
    `*[_type == "product"]{_id}`,
  );
  const tx = client.transaction();

  for (const product of existingProducts) tx.delete(product._id);

  for (const [index, product] of products.entries()) {
    tx.createOrReplace({
      _id: `product-${product.slug}`,
      _type: "product",
      slug: { _type: "slug", current: product.slug },
      title: localeString(product.title),
      category: {
        _type: "reference",
        _ref: `productCategory-${product.categorySlug}`,
      },
      subcategory: localeString(product.subcategory),
      excerpt: localeText(product.description),
      description: localeText(product.description),
      applications: localeText(product.applications),
      image: images.get(product.slug),
      gallery: [],
      order: index,
    });
  }

  const firstByCategory = new Map<string, ImportedProduct>();
  for (const product of products) {
    if (!firstByCategory.has(product.categorySlug)) {
      firstByCategory.set(product.categorySlug, product);
    }
  }

  for (const [categorySlug, product] of firstByCategory) {
    tx.patch(`productCategory-${categorySlug}`, (patch) =>
      patch.set({ image: images.get(product.slug) }),
    );
  }

  console.log(`Replacing ${existingProducts.length} products in Sanity…`);
  await tx.commit({ visibility: "sync" });

  const result = await client.fetch<{
    products: number;
    productsWithImages: number;
    categoriesWithImages: number;
  }>(`{
    "products": count(*[_type == "product"]),
    "productsWithImages": count(*[_type == "product" && defined(image.asset)]),
    "categoriesWithImages": count(*[_type == "productCategory" && defined(image.asset)])
  }`);

  console.log("Import complete:", result);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
