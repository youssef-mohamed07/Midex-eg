import fs from "node:fs";
import path from "node:path";
import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";

// Ensure environment variables are loaded properly
loadEnv({ path: ".env.local", override: true });
loadEnv({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const isDryRun = process.env.DRY_RUN === "true";

async function main() {
  console.log(`\nStarting Sanity Sync (Project: ${projectId} | Dataset: ${dataset})`);
  console.log(`Mode: ${isDryRun ? "DRY RUN (No changes will be made)" : "EXECUTE"}\n`);

  // Load JSON source
  const caseStudiesPath = path.join(process.cwd(), 'scripts', 'data', 'case-studies-sheet.json');
  if (!fs.existsSync(caseStudiesPath)) {
    throw new Error(`Data file not found at ${caseStudiesPath}`);
  }
  const caseStudies = JSON.parse(fs.readFileSync(caseStudiesPath, 'utf8'));

  // 1. Fetch existing case studies related to "Cons Korra" from Sanity to delete them
  let existingDocs: any[] = [];
  try {
    existingDocs = await client.fetch(`*[_type == "caseStudy" && (client match "Cons Korra*" || slug.current match "cons-korra*")]`);
  } catch (error: any) {
    console.error("\n❌ Fatal Error: Could not fetch from Sanity.");
    console.error("This usually means your SANITY_API_WRITE_TOKEN is invalid for this project,");
    console.error("or the project ID is wrong.");
    console.error(`Status: ${error.statusCode} ${error.response?.statusMessage || ""}`);
    process.exit(1);
  }

  const idsToDelete = existingDocs.map(doc => doc._id);

  console.log("--- Validation & Plan ---");
  console.log(`Found ${idsToDelete.length} existing Cons Korra documents in Sanity to delete.`);
  idsToDelete.forEach(id => console.log(` - DELETE: ${id}`));

  // 2. Prepare the new single case study
  const korraCaseStudy = caseStudies.find((cs: any) => cs.slug === "cons-korra-portfolio");
  if (!korraCaseStudy) {
    console.error("\n❌ Error: Could not find 'cons-korra-portfolio' in the local JSON sheet.");
    process.exit(1);
  }

  console.log(`\nWill create 1 new consolidated Case Study:`);
  console.log(` - CREATE: caseStudy-cons-korra-portfolio`);

  // Helper functions for localized content
  const LT = (en: string, ar: string, de: string) => ({ _type: "localeText", en, ar, de });
  const LL = (en: string[], ar: string[], de: string[]) => ({ _type: "localeStringList", en, ar, de });

  const newDoc = {
    _id: "caseStudy-cons-korra-portfolio",
    _type: "caseStudy",
    slug: { current: "cons-korra-portfolio" },
    client: "Cons Korra",
    industry: "Pharmaceutical",
    date: "2024-01-01",
    scope: LT(
      "Ongoing general-contracting partnership spanning multiple facilities, including VBC, Misr Company For Pharmaceuticals, and Mina Pharm — covering stainless-steel piping networks, purified water and WFI loops, compressed air and clean gases networks, and water station upgrades and spare parts supply.",
      "شراكة مستمرة كمقاول من الباطن ضمن نطاق المقاولات العامة، تمتد عبر عدة منشآت من بينها VBC ومصر للمستحضرات ومينا فارم — وتشمل شبكات أنابيب من الستانلس ستيل، وحلقات مياه منقاة ومياه حقن، وشبكات هواء مضغوط وغازات نظيفة، وتطوير محطات المياه وتوريد قطع الغيار.",
      "Laufende Generalunternehmer-Partnerschaft für mehrere Anlagen, darunter VBC, Misr Company For Pharmaceuticals und Mina Pharm - einschließlich Edelstahl-Rohrleitungsnetze, gereinigtes Wasser und WFI-Kreisläufe, Druckluft- und Reingasnetze sowie Modernisierung von Wasserstationen und Ersatzteillieferung."
    ),
    intro: LT(
      "Cons Korra is a general contractor MIDEX has partnered with across multiple pharmaceutical facilities — including VBC, Misr Company For Pharmaceuticals, and Mina Pharm — delivering hygienic piping, utility networks, and purified water systems tailored to each site.",
      "Cons Korra مقاول عام تتعاون معه ميدكس عبر عدة منشآت صيدلانية — من بينها VBC، ومصر للمستحضرات (Misr Company For Pharmaceuticals)، ومينا فارم — حيث تقدّم ميدكس أنابيب صحية وشبكات مرافق وأنظمة مياه منقاة مصممة خصيصًا لكل موقع.",
      "Cons Korra ist ein Generalunternehmer, mit dem MIDEX in verschiedenen pharmazeutischen Anlagen - darunter VBC, Misr Company For Pharmaceuticals und Mina Pharm - zusammengearbeitet hat, um hygienische Rohrleitungen, Versorgungsnetze und Systeme für gereinigtes Wasser maßgeschneidert für jeden Standort zu liefern."
    ),
    challenge: LT(
      "As general contractor on large pharmaceutical builds, Cons Korra needed a specialized hygienic-engineering subcontractor capable of delivering consistent, compliant systems across a portfolio of different end-client facilities — each with its own layout, timeline, and technical requirements.",
      "بصفتها المقاول العام لمشاريع صيدلانية كبرى، احتاجت Cons Korra إلى مقاول من الباطن متخصص في الهندسة الصحية، قادر على تقديم أنظمة متوافقة ومتسقة عبر محفظة من منشآت العملاء المختلفة — لكل منها تخطيطها وجدولها الزمني ومتطلباتها الفنية الخاصة.",
      "Als Generalunternehmer für große Pharmabauten benötigte Cons Korra einen spezialisierten Subunternehmer für Hygiene-Engineering, der in der Lage ist, konsistente, konforme Systeme für ein Portfolio verschiedener Endkundenanlagen zu liefern - jede mit ihrem eigenen Layout, Zeitplan und technischen Anforderungen."
    ),
    approach: LT(
      "MIDEX works as Cons Korra's hygienic engineering partner project by project, adapting stainless-steel piping, water systems, and utility network designs to each facility while holding every installation to the same GMP-aligned standard.",
      "تعمل ميدكس كشريك هندسي صحي لـCons Korra مشروعًا بمشروع، وتُكيّف تصميمات أنابيب الستانلس ستيل وأنظمة المياه وشبكات المرافق مع كل منشأة، مع الالتزام بنفس معايير GMP في كل تركيب.",
      "MIDEX arbeitet als Cons Korras Partner für hygienisches Engineering Projekt für Projekt und passt die Designs für Edelstahlrohrleitungen, Wassersysteme und Versorgungsnetze an jede Anlage an, wobei jede Installation an den gleichen GMP-ausgerichteten Standard gehalten wird."
    ),
    highlights: LL(
      [
        "Stainless-steel piping networks across multiple facilities",
        "Purified water (PW) and WFI loop installations",
        "Compressed air and clean gases networks",
        "Water station upgrades, modifications, and spare parts supply"
      ],
      [
        "شبكات أنابيب من الستانلس ستيل عبر عدة منشآت",
        "تركيب حلقات مياه منقاة (PW) ومياه حقن (WFI)",
        "شبكات هواء مضغوط وغازات نظيفة",
        "تطوير محطات المياه وتعديلاتها وتوريد قطع الغيار"
      ],
      [
        "Edelstahl-Rohrleitungsnetze in mehreren Anlagen",
        "Installationen von gereinigtem Wasser (PW) und WFI-Kreisläufen",
        "Druckluft- und Reingasnetze",
        "Modernisierung und Anpassung von Wasserstationen sowie Ersatzteillieferung"
      ]
    ),
    outcome: LT(
      "Cons Korra continues to rely on MIDEX as its go-to hygienic engineering subcontractor across its portfolio of pharmaceutical projects, with a consistent standard of compliance delivered site to site.",
      "تواصل Cons Korra الاعتماد على ميدكس كمقاول الهندسة الصحية المفضّل لديها عبر محفظة مشاريعها الصيدلانية، بمعيار امتثال ثابت من موقع لآخر.",
      "Cons Korra verlässt sich weiterhin auf MIDEX als Subunternehmer für Hygiene-Engineering für sein gesamtes Portfolio an Pharmaprojekten, mit einem konsistenten Compliance-Standard von Standort zu Standort."
    ),
    tags: [
      { _type: "reference", _ref: "tag-stainless-steel", _key: "t1" },
      { _type: "reference", _ref: "tag-systems", _key: "t2" }
    ],
    order: 0
  };

  if (isDryRun) {
    console.log("\n✅ Dry Run Complete.");
    return;
  }

  console.log("\n--- Executing Sanity Transaction ---");
  const transaction = client.transaction();
  
  idsToDelete.forEach(id => {
    transaction.delete(id);
  });
  
  transaction.createOrReplace(newDoc);
  
  try {
    const result = await transaction.commit();
    console.log("\n✅ Sanity Sync Complete");
    console.log(`Deleted: ${idsToDelete.length}`);
    console.log(`Created/Updated: 1 (caseStudy-cons-korra-portfolio)`);
    console.log(`Transaction ID: ${result.transactionId}`);
  } catch (error: any) {
    console.error("\n❌ Transaction Failed:", error.message);
  }
}

main().catch(console.error);
