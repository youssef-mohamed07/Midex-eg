/**
 * Copy site images from public/done into public/images and patch Sanity.
 *
 * Usage:
 *   npm run import:site-images
 *   npm run import:site-images -- truvia values process
 */

import {
  copyFileSync,
  createReadStream,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { localeString, localeText } from "./lib/locale";

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

const SRC = path.join(process.cwd(), "public/done");
const PUBLIC = path.join(process.cwd(), "public/images");

type ImageDoc = {
  _type: "imageWithAlt";
  asset: { _type: "reference"; _ref: string };
  sourcePath: string;
  alt: ReturnType<typeof localeString>;
};

function ensureDir(dir: string) {
  mkdirSync(dir, { recursive: true });
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normalizeKey(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function copyToPublic(src: string, destRelative: string) {
  const dest = path.join(PUBLIC, destRelative);
  ensureDir(path.dirname(dest));
  copyFileSync(src, dest);
  return `/images/${destRelative.replace(/\\/g, "/")}`;
}

async function uploadImage(
  absPath: string,
  sourcePath: string,
  alt: string,
): Promise<ImageDoc> {
  const asset = await client.assets.upload("image", createReadStream(absPath), {
    filename: path.basename(absPath),
  });
  return {
    _type: "imageWithAlt",
    asset: { _type: "reference", _ref: asset._id },
    sourcePath,
    alt: localeString(alt),
  };
}

/** Resolve a path under public/done even when folders have trailing spaces. */
function resolveSrc(...parts: string[]) {
  let current = SRC;
  for (const part of parts) {
    if (!existsSync(current)) return undefined;
    const wanted = normalizeKey(part);
    const match = readdirSync(current).find(
      (entry) => normalizeKey(entry) === wanted,
    );
    if (!match) return undefined;
    current = path.join(current, match);
  }
  return existsSync(current) ? current : undefined;
}

function findImageInDir(dir: string | undefined, preferredName?: string) {
  if (!dir || !existsSync(dir) || !statSync(dir).isDirectory()) return undefined;
  const files = readdirSync(dir).filter((name) => {
    const full = path.join(dir, name);
    return (
      statSync(full).isFile() &&
      /\.(png|jpe?g|webp|avif)$/i.test(name) &&
      !/^https_/i.test(name) &&
      !/screenshot/i.test(name)
    );
  });
  if (preferredName) {
    const preferred = files.find(
      (name) => normalizeKey(name) === normalizeKey(preferredName),
    );
    if (preferred) return path.join(dir, preferred);
  }
  return files[0] ? path.join(dir, files[0]) : undefined;
}

async function patchGroups() {
  const map: Record<string, string> = {
    installations: "Hygienic Piping Installations.png",
    welding: "Hygienic Welding Services.png",
    systems: "Process & Water Treatment Systems.png",
    solutions: "System Upgrades & Modifications.png",
  };

  for (const [slug, fileName] of Object.entries(map)) {
    const src = resolveSrc("4 categories", fileName);
    if (!src) {
      console.warn(`Missing group image: ${fileName}`);
      continue;
    }
    const sourcePath = copyToPublic(src, `solutions/groups/${slug}.png`);
    const image = await uploadImage(
      src,
      sourcePath,
      fileName.replace(/\.png$/i, ""),
    );
    await client
      .patch(`solutionGroup-${slug}`)
      .set({ image })
      .commit({ visibility: "async" });
    console.log(`✓ solutionGroup ${slug}`);
  }
}

async function patchChildren() {
  const map: Record<string, string[]> = {
    "compressed-air-pipe-line-installation": [
      "services",
      "Hygienic Piping Installations",
      "Compressed Air Pipeline Installation",
      "Compressed Air Pipeline Installation.png",
    ],
    "preparation-pipe-line": [
      "services",
      "Hygienic Piping Installations",
      "Preparation Pipeline",
      "Preparation Pipeline.png",
    ],
    "purified-loop-system": [
      "services",
      "Hygienic Piping Installations",
      "Purified Water Loop System",
      "Purified Water Loop System.png",
    ],
    "sanitary-drain-pipeline": [
      "services",
      "Hygienic Piping Installations",
      "Sanitary Drain Pipeline",
      "Sanitary Drain Pipeline.png",
    ],
    "automatic-orbital-welding": [
      "services",
      "hygienic Welding Services",
      "Automatic welding",
      "Automatic Orbital Welding.png",
    ],
    "manual-welding": [
      "services",
      "hygienic Welding Services",
      "Manual welding",
      "Manual Welding.png",
    ],
    "cleaning-in-place-system": [
      "services",
      "Process & Water Treatment Systems",
      "Cleaning-in-Place System (CIP)",
      "Cleaning-in-Place System (CIP).png",
    ],
    "sanitization-in-place-system": [
      "services",
      "Process & Water Treatment Systems",
      "Sanitization-in-Place System (SIP)",
      "Sanitization-in-Place System (SIP).png",
    ],
    "distribution-skids": [
      "services",
      "Process & Water Treatment Systems",
      "Distribution Skids",
      "Distribution Skids.png",
    ],
    "purified-water-station": [
      "services",
      "Process & Water Treatment Systems",
      "Purified Water Station",
      "Purified Water Station.png",
    ],
    "distribution-skids-modification": [
      "services",
      "System Upgrades & Modifications",
      "Distribution Skids Modification",
      "Distribution Skids Modification.png",
    ],
    "pw-station-modification": [
      "services",
      "System Upgrades & Modifications",
      "Purified Water Station Modification",
      "Purified Water Station Modification.png",
    ],
    "loop-design-modification": [
      "services",
      "System Upgrades & Modifications",
      "PW - WFI Loop Design Modification",
      "PW  WFI Loop Design Modification.png",
    ],
  };

  const children = await client.fetch<{ _id: string; slug: string }[]>(
    `*[_type=="solutionChild"]{_id,"slug":slug.current}`,
  );

  for (const child of children) {
    const parts = map[child.slug];
    if (!parts) {
      console.warn(`No done-folder image for child ${child.slug}`);
      continue;
    }
    const src = resolveSrc(...parts);
    if (!src) {
      console.warn(`Missing file for ${child.slug}: ${parts.join("/")}`);
      continue;
    }
    const sourcePath = copyToPublic(
      src,
      `solutions/children/${child.slug}.png`,
    );
    const image = await uploadImage(src, sourcePath, child.slug);
    await client.patch(child._id).set({ image }).commit({ visibility: "async" });
    console.log(`✓ solutionChild ${child.slug}`);
  }
}

async function patchNestedServiceImages() {
  const nested = [
    {
      documentId: "solutionChild-systems--distribution-skids",
      key: "hot-water-sanitization",
      title: "Hot Water Sanitization",
      parts: [
        "services",
        "Process & Water Treatment Systems",
        "Distribution Skids",
        "Hot Water Sanitization",
        "Hot Water Sanitization.png",
      ],
    },
    {
      documentId: "solutionChild-systems--distribution-skids",
      key: "super-heated-water-sanitization",
      title: "Super-Heated Water Sanitization",
      parts: [
        "services",
        "Process & Water Treatment Systems",
        "Distribution Skids",
        "Super-Heated Water Sanitization",
        "Super-Heated Water Sanitization.png",
      ],
    },
    {
      documentId: "solutionChild-systems--purified-water-station",
      key: "reverse-osmosis",
      title: "Reverse Osmosis (RO)",
      parts: [
        "services",
        "Process & Water Treatment Systems",
        "Purified Water Station",
        "Reverse Osmosis (RO)",
        "Reverse Osmosis (RO).png",
      ],
    },
    {
      documentId: "solutionChild-systems--purified-water-station",
      key: "electrodeionization",
      title: "Electrodeionization (EDI)",
      parts: [
        "services",
        "Process & Water Treatment Systems",
        "Purified Water Station",
        "Electrodeionization (EDI)",
        "Electrodeionization (EDI).png",
      ],
    },
    {
      documentId: "solutionChild-systems--purified-water-station",
      key: "ultrafiltration",
      title: "Ultrafiltration (UF)",
      parts: [
        "services",
        "Process & Water Treatment Systems",
        "Purified Water Station",
        "Ultrafiltration (UF)",
        "Ultrafiltration (UF).png",
      ],
    },
    {
      documentId: "solutionChild-systems--purified-water-station",
      key: "distillation",
      title: "Distillation",
      parts: [
        "services",
        "Process & Water Treatment Systems",
        "Purified Water Station",
        "Distillation",
        "Distillation.png",
      ],
    },
  ];

  for (const item of nested) {
    const src = resolveSrc(...item.parts);
    if (!src) {
      console.warn(`Missing nested service image: ${item.title}`);
      continue;
    }
    const sourcePath = copyToPublic(
      src,
      `solutions/nested/${slugify(item.title)}.png`,
    );
    const image = await uploadImage(src, sourcePath, item.title);
    await client
      .patch(item.documentId)
      .set({
        [`page.principles.items[_key=="${item.key}"].image`]: image,
      })
      .commit({ visibility: "async" });
    console.log(`✓ nested service ${item.title}`);
  }
}

async function patchBeforeAfter() {
  const beforeSrc = findImageInDir(
    resolveSrc("before and after section"),
    "Behind The Scene_.png",
  );
  const afterSrc = findImageInDir(
    resolveSrc("before and after section"),
    "Copie de Purified Water system.png",
  );
  if (!beforeSrc || !afterSrc) {
    console.warn("Missing before/after images");
    return;
  }

  const beforePath = copyToPublic(beforeSrc, "before-after/before.png");
  const afterPath = copyToPublic(afterSrc, "before-after/after.png");
  const beforeImage = await uploadImage(beforeSrc, beforePath, "Before");
  const afterImage = await uploadImage(afterSrc, afterPath, "After");
  const beforeAfterPatch = {
    "beforeAfterSection.beforeImage": beforeImage,
    "beforeAfterSection.afterImage": afterImage,
  };

  await client.patch("homePage").set(beforeAfterPatch).commit({ visibility: "async" });
  await client
    .patch("solutionsPage")
    .set(beforeAfterPatch)
    .commit({ visibility: "async" });
  console.log("✓ beforeAfterSection (home + solutions)");
}

async function patchFounders() {
  const dir = resolveSrc("about us", "co founders pictures");
  if (!dir) {
    console.warn("Missing founders folder");
    return;
  }
  const files = readdirSync(dir)
    .filter((name) => /\.png$/i.test(name))
    .sort();
  const founders = await client.fetch<{ _id: string }[]>(
    `*[_type=="founder"]|order(order asc){_id}`,
  );

  for (const [index, founder] of founders.entries()) {
    const file = files[index];
    if (!file) continue;
    const src = path.join(dir, file);
    const sourcePath = copyToPublic(src, `about/founders/${founder._id}.png`);
    const image = await uploadImage(src, sourcePath, "Co-founder");
    await client.patch(founder._id).set({ image }).commit({ visibility: "async" });
    console.log(`✓ founder ${founder._id}`);
  }
}

async function patchValues() {
  const seeds = [
    {
      key: "precision",
      file: "Precision.png",
      title: localeString("Precision", "الدقة", "Präzision"),
      text: localeText(
        "Exact engineering, fabrication, and documentation at every stage.",
        "هندسة وتصنيع وتوثيق دقيق في كل مرحلة.",
        "Präzise Planung, Fertigung und Dokumentation in jeder Phase.",
      ),
    },
    {
      key: "compliance",
      file: "Compliance.png",
      title: localeString("Compliance", "الامتثال", "Regelkonformität"),
      text: localeText(
        "Systems aligned with GMP, ASME BPE, FDA, and applicable standards.",
        "أنظمة متوافقة مع GMP وASME BPE وFDA والمعايير المعمول بها.",
        "Systeme im Einklang mit GMP, ASME BPE, FDA und geltenden Normen.",
      ),
    },
    {
      key: "reliability",
      file: "Reliability.png",
      title: localeString("Reliability", "الموثوقية", "Zuverlässigkeit"),
      text: localeText(
        "Consistent performance designed for critical production environments.",
        "أداء ثابت مصمم لبيئات الإنتاج الحرجة.",
        "Konstante Leistung für kritische Produktionsumgebungen.",
      ),
    },
    {
      key: "full-traceability",
      file: "Full Traceability.png",
      title: localeString(
        "Full Traceability",
        "التتبع الكامل",
        "Vollständige Rückverfolgbarkeit",
      ),
      text: localeText(
        "Complete material, weld, test, and handover documentation.",
        "توثيق كامل للمواد واللحام والاختبارات والتسليم.",
        "Lückenlose Dokumentation von Material, Schweißnähten, Prüfungen und Übergabe.",
      ),
    },
    {
      key: "contamination-control",
      file: "Contamination Control.png",
      title: localeString(
        "Contamination Control",
        "التحكم في التلوث",
        "Kontaminationskontrolle",
      ),
      text: localeText(
        "Hygienic design that minimizes risk and protects product purity.",
        "تصميم صحي يقلل المخاطر ويحمي نقاء المنتج.",
        "Hygienisches Design minimiert Risiken und schützt die Produktreinheit.",
      ),
    },
    {
      key: "proven-expertise",
      file: "Proven Expertise.png",
      title: localeString(
        "Proven Expertise",
        "خبرة مثبتة",
        "Nachgewiesene Expertise",
      ),
      text: localeText(
        "Field-tested knowledge built through complex pharmaceutical projects.",
        "خبرة عملية مثبتة بُنيت عبر مشاريع دوائية معقدة.",
        "Praxiserprobtes Wissen aus anspruchsvollen Pharmaprojekten.",
      ),
    },
  ];

  const items = [];
  for (const seed of seeds) {
    const src = resolveSrc("Our Standards", seed.file);
    if (!src) {
      console.warn(`Missing Our Standards/${seed.file}`);
      continue;
    }
    const publicName = `${seed.key}.png`;
    const sourcePath = copyToPublic(src, `about/values/${publicName}`);
    const image = await uploadImage(src, sourcePath, seed.title.en ?? seed.file);
    items.push({
      _type: "companyValueItem",
      _key: seed.key,
      key: seed.key,
      title: seed.title,
      text: seed.text,
      image,
    });
    console.log(`  ↑ ${seed.file} → ${image.asset._ref}`);
  }

  if (items.length === 0) {
    console.warn("No values items to patch");
    return;
  }

  await client
    .patch("aboutPage")
    .set({
      "valuesSection.title": localeString(
        "Our Standards",
        "معاييرنا",
        "Unsere Standards",
      ),
      "valuesSection.subtitle": localeString(
        "The principles behind every system we design and install.",
        "المبادئ وراء كل نظام نصممه ونركّبه.",
        "Die Prinzipien hinter jedem System, das wir planen und installieren.",
      ),
      "valuesSection.items": items,
    })
    .commit({ visibility: "async" });
  console.log(`✓ valuesSection replaced (${items.length} cards with fresh assets)`);
}

async function patchProcessWorkflow() {
  const processMap = [
    {
      folder: "01 — Site & Scope Assessment",
      publicName: "step-1-site-assessment.png",
    },
    {
      folder: "2 Plan & Procedure",
      publicName: "step-2-plan-procedure.png",
    },
    {
      folder: "3 Execution",
      publicName: "step-3-execution.png",
    },
    {
      folder: "4 Inspection & Testing",
      publicName: "step-4-inspection.png",
    },
    {
      folder: "05 — Documentation & Handover",
      publicName: "step-5-documentation.png",
    },
  ];

  const images: Array<ImageDoc | undefined> = [];
  for (const step of processMap) {
    const src = findImageInDir(resolveSrc("process", step.folder));
    if (!src) {
      console.warn(`Missing process step image: ${step.folder}`);
      images.push(undefined);
      continue;
    }
    const sourcePath = copyToPublic(src, `process/${step.publicName}`);
    images.push(await uploadImage(src, sourcePath, step.folder));
    console.log(`✓ process public ${step.publicName}`);
  }

  // Step 5 folder is empty in the export — use the documentation desk photo.
  if (!images[4]) {
    const deskSrc = path.join(PUBLIC, "services/welding-docs.png");
    if (existsSync(deskSrc)) {
      const sourcePath = copyToPublic(deskSrc, "process/step-5-documentation.png");
      images[4] = await uploadImage(deskSrc, sourcePath, "Documentation desk");
      console.log("✓ process step-5 uses documentation desk image");
    }
  }

  const groups = await client.fetch<
    {
      _id: string;
      steps?: { _key: string }[];
    }[]
  >(`*[_type=="solutionGroup"]{_id, "steps": workflow.steps[]{_key}}`);

  const fallbackImage = images.find(Boolean);

  for (const group of groups) {
    const patches: Record<string, ImageDoc> = {};
    (group.steps ?? []).forEach((step, index) => {
      const image = images[index] ?? fallbackImage;
      if (!image || !step._key) return;
      patches[`workflow.steps[_key=="${step._key}"].image`] = image;
    });
    if (Object.keys(patches).length === 0) continue;
    await client.patch(group._id).set(patches).commit({ visibility: "async" });
    console.log(`✓ workflow images on ${group._id}`);
  }

  const timeline = await client.fetch<{ steps?: { _key: string }[] } | null>(
    `*[_id=="solutionsPage"][0]{"steps": timelineSection.steps[]{_key}}`,
  );
  const timelinePatches: Record<string, ImageDoc> = {};
  (timeline?.steps ?? []).forEach((step, index) => {
    const image = images[index] ?? fallbackImage;
    if (!image || !step._key) return;
    timelinePatches[`timelineSection.steps[_key=="${step._key}"].image`] = image;
  });
  if (Object.keys(timelinePatches).length > 0) {
    await client
      .patch("solutionsPage")
      .set(timelinePatches)
      .commit({ visibility: "async" });
    console.log("✓ timeline images on solutionsPage");
  }
}

async function patchTruvia() {
  const src = findImageInDir(resolveSrc("truvia"), "Truvia section.png");
  if (!src) {
    console.warn("Missing Truvia section image");
    return;
  }

  const sourcePath = copyToPublic(src, "exclusive/truvia-section.png");
  const image = await uploadImage(src, sourcePath, "Truvia");
  const logoSrc = path.join(process.cwd(), "public/images/exclusive/truvia.png");
  const secondary = existsSync(logoSrc)
    ? await uploadImage(logoSrc, "/images/exclusive/truvia.png", "Truvia logo")
    : undefined;

  await client
    .patch("homePage")
    .set({
      "truviaSection.image": image,
      "truviaSection.badge": localeString("ASME BPE", "ASME BPE", "ASME BPE"),
      ...(secondary ? { "truviaSection.secondaryImage": secondary } : {}),
    })
    .commit({ visibility: "async" });
  console.log("✓ truviaSection");
}

async function patchFaqImages() {
  const src =
    resolveSrc("Our Standards", "Reliability.png") ??
    path.join(PUBLIC, "about/values/reliability.png");
  if (!existsSync(src)) {
    console.warn("Missing FAQ side image source");
    return;
  }
  const sourcePath = copyToPublic(src, "about/values/reliability.png");
  const image = await uploadImage(src, sourcePath, "FAQ");

  const pageIds = [
    "homePage",
    "aboutPage",
    "productsPage",
    "solutionsPage",
    "blogPage",
    "caseStudiesPage",
  ];
  for (const id of pageIds) {
    await client
      .patch(id)
      .set({ "faq.image": image })
      .commit({ visibility: "async" });
    console.log(`✓ faq.image → ${id}`);
  }

  const groups = await client.fetch<{ _id: string }[]>(
    `*[_type=="solutionGroup"]{_id}`,
  );
  for (const group of groups) {
    await client
      .patch(group._id)
      .set({ "faq.image": image })
      .commit({ visibility: "async" });
    console.log(`✓ faq.image → ${group._id}`);
  }

  const children = await client.fetch<{ _id: string }[]>(
    `*[_type=="solutionChild" && defined(page.faq)]{_id}`,
  );
  for (const child of children) {
    await client
      .patch(child._id)
      .set({ "page.faq.image": image })
      .commit({ visibility: "async" });
    console.log(`✓ page.faq.image → ${child._id}`);
  }
}

async function patchHeroMedia() {
  const candidates = [
    path.join(process.cwd(), "public/videos/hero.mp4"),
    path.join(
      process.cwd(),
      "public/7a8724cf-a133-4fbd-b70b-125ae7356c54.mp4",
    ),
  ];
  const src = candidates.find(existsSync);
  if (!src) {
    console.warn("Missing local hero video");
    return;
  }
  const asset = await client.assets.upload("file", createReadStream(src), {
    filename: path.basename(src),
    contentType: "video/mp4",
  });
  await client
    .patch("homePage")
    .set({
      heroVideo: {
        _type: "file",
        asset: { _type: "reference", _ref: asset._id },
        sourcePath: `/${path.basename(src)}`,
      },
    })
    .commit({ visibility: "async" });
  console.log(`✓ heroVideo → ${asset._id}`);
}

async function main() {
  if (!existsSync(SRC)) {
    throw new Error(`Missing ${SRC}`);
  }

  const scopes = new Set(process.argv.slice(2));
  const all = scopes.size === 0;
  const run = (scope: string) => all || scopes.has(scope);

  console.log(
    `Importing site images from public/done${all ? "" : ` (${[...scopes].join(", ")})`}…`,
  );
  if (run("groups")) await patchGroups();
  if (run("children")) await patchChildren();
  if (run("nested")) await patchNestedServiceImages();
  if (run("before-after")) await patchBeforeAfter();
  if (run("founders")) await patchFounders();
  if (run("values")) await patchValues();
  if (run("process")) await patchProcessWorkflow();
  if (run("truvia")) await patchTruvia();
  if (run("faq")) await patchFaqImages();
  if (run("hero")) await patchHeroMedia();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
