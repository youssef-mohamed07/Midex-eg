import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

loadEnv({ path: ".env.local", override: true });
loadEnv({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "7vhvbsex";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-01",
  token,
  useCdn: false,
});

async function main() {
  const caseStudiesPath = path.join(process.cwd(), 'scripts', 'data', 'case-studies-sheet.json');
  const caseStudies = JSON.parse(fs.readFileSync(caseStudiesPath, 'utf8'));
  
  // Find all Korra case studies
  const korraSlugs = caseStudies
    .filter((cs: any) => cs.client === "Cons Korra")
    .map((cs: any) => cs.slug);

  console.log(`Found ${korraSlugs.length} Korra case studies to delete.`);

  // Delete them from Sanity
  for (const slug of korraSlugs) {
    const id = `caseStudy-${slug}`;
    try {
      await client.delete(id);
      console.log(`Deleted ${id}`);
    } catch (e) {
      console.error(`Failed to delete ${id}:`, e);
    }
  }

  // Create new case study in Sanity
  const newId = `caseStudy-cons-korra-portfolio`;
  
  const LT = (en: string, ar: string, de: string) => ({
    _type: "localeText",
    en, ar, de
  });
  
  const LL = (en: string[], ar: string[], de: string[]) => ({
    _type: "localeStringList",
    en, ar, de
  });

  const LS = (en: string, ar: string, de: string) => ({
    _type: "localeString",
    en, ar, de
  });

  const newCaseStudy = {
    _id: newId,
    _type: "caseStudy",
    slug: { current: "cons-korra-portfolio" },
    client: "Cons Korra",
    industry: "Pharmaceutical",
    date: "2024-01-01", // Placeholder
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

  try {
    await client.createOrReplace(newCaseStudy);
    console.log(`Created new case study ${newId}`);
  } catch(e) {
    console.error("Failed to create new case study:", e);
  }

  // Also update the JSON files so future imports are clean
  const filteredCaseStudies = caseStudies.filter((cs: any) => cs.client !== "Cons Korra");
  filteredCaseStudies.unshift({
    slug: "cons-korra-portfolio",
    client: "Cons Korra",
    industry: "Pharmaceutical",
    scope: newCaseStudy.scope.en,
    intro: newCaseStudy.intro.en,
    challenge: newCaseStudy.challenge.en,
    approach: newCaseStudy.approach.en,
    highlights: newCaseStudy.highlights.en,
    outcome: newCaseStudy.outcome.en,
    statValue: "",
    statLabel: "",
    tags: ["Stainless Steel", "Systems"],
    order: 0
  });
  
  fs.writeFileSync(caseStudiesPath, JSON.stringify(filteredCaseStudies, null, 2));
  console.log("Updated case-studies-sheet.json");

}

main().catch(console.error);
