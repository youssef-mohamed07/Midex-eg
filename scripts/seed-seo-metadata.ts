import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";

loadEnv({ path: ".env.local", override: true });
loadEnv({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
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

const entries = [
  {
    _id: "seo-entry-home",
    _type: "seoEntry",
    routeKey: "home",
    seo: {
      title: {
        _type: "localeString",
        en: "Advanced Pharmaceutical & Hygienic Process Engineering in Egypt | Midex",
        ar: "الحلول الهندسية للصناعات الدوائية والغذائية في مصر | ميديكس",
        de: "Fortschrittliche Pharma- und Hygienetechnik in Ägypten | Midex",
      },
      description: {
        _type: "localeText",
        en: "Midex is a leading engineering company in Egypt providing purified water systems, WFI, CIP/SIP, hygienic piping, and orbital welding for pharmaceutical and biotechnology industries.",
        ar: "ميديكس هي شركة هندسية رائدة في مصر تقدم أنظمة المياه المنقاة، WFI، وأنظمة التنظيف المعقم (CIP/SIP) وشبكات المواسير الصحية للصناعات الدوائية والتكنولوجيا الحيوية.",
        de: "Midex ist ein führendes Ingenieurunternehmen in Ägypten, das Reinwassersysteme, WFI, CIP/SIP und hygienische Rohrleitungen für die Pharma- und Biotechnologieindustrie anbietet.",
      },
    },
  },
  {
    _id: "seo-entry-solutions",
    _type: "seoEntry",
    routeKey: "solutions",
    seo: {
      title: {
        _type: "localeString",
        en: "Pharmaceutical Water Systems & Process Engineering Solutions | Midex",
        ar: "أنظمة المياه الدوائية وحلول الهندسة الصناعية | ميديكس",
        de: "Pharmazeutische Wassersysteme & Verfahrenstechnik | Midex",
      },
      description: {
        _type: "localeText",
        en: "Explore Midex's engineering solutions including Turnkey Process Systems, PW/WFI distribution loops, Automatic Orbital Welding, and Validation Documentation.",
        ar: "استكشف الحلول الهندسية المتكاملة من ميديكس، بما في ذلك محطات المياه المنقاة، اللحام المداري الأوتوماتيكي، ووثائق الاعتماد الخاصة بصناعة الدواء.",
        de: "Entdecken Sie die technischen Lösungen von Midex, einschließlich schlüsselfertiger Prozesssysteme, PW/WFI-Verteilungsschleifen und automatischem Orbitalschweißen.",
      },
    },
  },
  {
    _id: "seo-entry-about",
    _type: "seoEntry",
    routeKey: "about",
    seo: {
      title: {
        _type: "localeString",
        en: "About Midex | Leaders in Hygienic Piping & Orbital Welding in Egypt",
        ar: "عن ميديكس | رواد شبكات المواسير الصحية واللحام المداري في مصر",
        de: "Über Midex | Führend in hygienischen Rohrleitungen und Orbitalschweißen",
      },
      description: {
        _type: "localeText",
        en: "Learn about Midex's mission, engineering standards, and expertise in ASME BPE hygienic piping installations and pharmaceutical process engineering across the Middle East.",
        ar: "تعرف على رؤية ميديكس ومعاييرها الهندسية الصارمة وخبراتها العميقة في تركيبات المواسير الصحية طبقا لمعايير ASME BPE عبر الشرق الأوسط.",
        de: "Erfahren Sie mehr über die Mission, die technischen Standards und die Expertise von Midex bei ASME BPE-Rohrleitungsinstallationen.",
      },
    },
  }
];

async function run() {
  console.log("Seeding SEO entries into Sanity...");
  const transaction = client.transaction();

  for (const entry of entries) {
    transaction.createOrReplace(entry);
  }

  try {
    const res = await transaction.commit();
    console.log(`Successfully seeded ${res.results.length} SEO entries!`);
  } catch (err: any) {
    console.error("Failed to seed SEO metadata:", err.message);
  }
}

run().catch(console.error);
