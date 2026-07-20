import type { Locale } from "@/i18n/routing";
import type { Product } from "@/lib/cms/types";

type Localized = Record<Locale, string>;

type PrincipleProductSeed = {
  slug: string;
  category: string;
  image: string;
  title: Localized;
  excerpt: Localized;
  description: Localized;
  relatedSolution: {
    slug: string;
    label: Localized;
    groupSlug: string;
  };
};

const PRINCIPLE_PRODUCTS: PrincipleProductSeed[] = [
  {
    slug: "hot-water-sanitization",
    category: "filters",
    image: "/images/solutions/nested/hot-water-sanitization.png",
    title: {
      en: "Hot Water Sanitization",
      ar: "تعقيم الماء الساخن",
      de: "Heißwasser-Sanitierung",
    },
    excerpt: {
      en: "Heated-water sanitization for tanks, pipes, and process lines.",
      ar: "تعقيم بالماء المسخّن للخزانات والأنابيب وخطوط العمليات.",
      de: "Heißwasser-Sanitierung für Tanks, Rohre und Prozessleitungen.",
    },
    description: {
      en: "Uses heated water, circulated at around 65–80°C through tanks, pipes, and process lines, to reduce microbial contamination and remove organic residue. Fully automated and easy to integrate into any production sequence.",
      ar: "يستخدم الماء المسخّن، يدور حوالي 65–80°م عبر الخزانات والأنابيب وخطوط العمليات، لتقليل التلوث الميكروبي وإزالة البقايا العضوية. آلي بالكامل وسهل الدمج في أي تسلسل إنتاج.",
      de: "Nutzt erhitztes Wasser, das bei ca. 65–80 °C durch Tanks, Rohre und Prozessleitungen zirkuliert, um mikrobielle Kontamination zu reduzieren und organische Rückstände zu entfernen. Vollautomatisch und einfach in jede Produktionssequenz integrierbar.",
    },
    relatedSolution: {
      slug: "distribution-skids",
      groupSlug: "systems",
      label: {
        en: "Distribution Skids",
        ar: "وحدات التوزيع",
        de: "Verteilungsskides",
      },
    },
  },
  {
    slug: "super-heated-water-sanitization",
    category: "filters",
    image: "/images/solutions/nested/super-heated-water-sanitization.png",
    title: {
      en: "Super-Heated Water Sanitization",
      ar: "تعقيم الماء فائق السخونة",
      de: "Überhitzwasser-Sanitierung",
    },
    excerpt: {
      en: "Elevated temperature and pressure sanitization for higher microbial kill.",
      ar: "تعقيم بدرجة حرارة وضغط مرتفعين لمستوى أعلى من القضاء على الميكروبات.",
      de: "Sanitierung bei erhöhter Temperatur und Druck für höhere mikrobielle Abtötung.",
    },
    description: {
      en: "Takes thermal sanitization further, circulating water at elevated temperature and pressure for a higher level of microbial kill — built for facilities needing an added margin of sanitization assurance.",
      ar: "يأخذ التعقيم الحراري أبعد، بدوران الماء عند درجة حرارة وضغط مرتفعين لمستوى أعلى من القضاء على الميكروبات — مبني للمنشآت التي تحتاج هامشاً إضافياً من ضمان التعقيم.",
      de: "Geht über thermische Sanitierung hinaus und zirkuliert Wasser bei erhöhter Temperatur und Druck für ein höheres Maß an mikrobieller Abtötung — für Anlagen, die zusätzliche Sanitierungssicherheit benötigen.",
    },
    relatedSolution: {
      slug: "distribution-skids",
      groupSlug: "systems",
      label: {
        en: "Distribution Skids",
        ar: "وحدات التوزيع",
        de: "Verteilungsskides",
      },
    },
  },
  {
    slug: "reverse-osmosis",
    category: "filters",
    image: "/images/solutions/nested/reverse-osmosis-ro.png",
    title: {
      en: "Reverse Osmosis (RO)",
      ar: "التناضح العكسي (RO)",
      de: "Umkehrosmose (RO)",
    },
    excerpt: {
      en: "High-efficiency filtration for consistently pure water.",
      ar: "ترشيح عالي الكفاءة لإنتاج مياه نقية باستمرار.",
      de: "Hocheffiziente Filtration für konstant reines Wasser.",
    },
    description: {
      en: "High-efficiency filtration that removes dissolved solids, contaminants, and impurities to produce consistently pure water.",
      ar: "ترشيح عالي الكفاءة يزيل المواد الصلبة المذابة والملوثات والشوائب لإنتاج مياه نقية باستمرار.",
      de: "Hocheffiziente Filtration, die gelöste Feststoffe, Kontaminanten und Verunreinigungen entfernt, um konstant reines Wasser zu produzieren.",
    },
    relatedSolution: {
      slug: "purified-water-station",
      groupSlug: "systems",
      label: {
        en: "Purified Water Station",
        ar: "محطة المياه النقية",
        de: "Reinwasserstation",
      },
    },
  },
  {
    slug: "electrodeionization",
    category: "filters",
    image: "/images/solutions/nested/electrodeionization-edi.png",
    title: {
      en: "Electrodeionization (EDI)",
      ar: "إزالة الأيونات بالأقطاب (EDI)",
      de: "Elektrodeionisation (EDI)",
    },
    excerpt: {
      en: "Chemical-free polishing for ultra-pure water after RO.",
      ar: "صقل خالٍ من المواد الكيميائية لمياه فائقة النقاء بعد RO.",
      de: "Chemiefreies Polieren für ultrareines Wasser nach RO.",
    },
    description: {
      en: "A chemical-free polishing step that removes remaining ions after RO, delivering ultra-pure water for the most demanding applications.",
      ar: "خطوة صقل خالية من المواد الكيميائية تزيل الأيونات المتبقية بعد RO، لتقديم مياه فائقة النقاء للتطبيقات الأكثر تطلباً.",
      de: "Ein chemiefreier Polierschritt, der verbleibende Ionen nach RO entfernt und ultrareines Wasser für anspruchsvollste Anwendungen liefert.",
    },
    relatedSolution: {
      slug: "purified-water-station",
      groupSlug: "systems",
      label: {
        en: "Purified Water Station",
        ar: "محطة المياه النقية",
        de: "Reinwasserstation",
      },
    },
  },
  {
    slug: "ultrafiltration",
    category: "filters",
    image: "/images/solutions/nested/ultrafiltration-uf.png",
    title: {
      en: "Ultrafiltration (UF)",
      ar: "الترشيح فائق الدقة (UF)",
      de: "Ultrafiltration (UF)",
    },
    excerpt: {
      en: "Membrane filtration that removes bacteria and particulates.",
      ar: "ترشيح غشائي يزيل البكتيريا والجسيمات.",
      de: "Membranfiltration zur Entfernung von Bakterien und Partikeln.",
    },
    description: {
      en: "Membrane filtration that removes bacteria, particulates, and larger contaminants ahead of further purification stages.",
      ar: "ترشيح غشائي يزيل البكتيريا والجسيمات والملوثات الأكبر قبل مراحل التنقية اللاحقة.",
      de: "Membranfiltration, die Bakterien, Partikel und größere Kontaminanten vor weiteren Aufbereitungsstufen entfernt.",
    },
    relatedSolution: {
      slug: "purified-water-station",
      groupSlug: "systems",
      label: {
        en: "Purified Water Station",
        ar: "محطة المياه النقية",
        de: "Reinwasserstation",
      },
    },
  },
  {
    slug: "distillation",
    category: "filters",
    image: "/images/solutions/nested/distillation.png",
    title: {
      en: "Distillation",
      ar: "التقطير",
      de: "Destillation",
    },
    excerpt: {
      en: "Thermal purification for the highest purity requirements.",
      ar: "تنقية حرارية لأعلى متطلبات النقاء.",
      de: "Thermische Aufbereitung für höchste Reinheitsanforderungen.",
    },
    description: {
      en: "Thermal purification that vaporizes and recondenses water, removing impurities for applications requiring the highest purity levels.",
      ar: "تنقية حرارية تبخر الماء وتكثفه مجدداً، لإزالة الشوائب للتطبيقات التي تتطلب أعلى مستويات النقاء.",
      de: "Thermische Aufbereitung, die Wasser verdampft und rekondensiert, um Verunreinigungen für Anwendungen mit höchsten Reinheitsanforderungen zu entfernen.",
    },
    relatedSolution: {
      slug: "purified-water-station",
      groupSlug: "systems",
      label: {
        en: "Purified Water Station",
        ar: "محطة المياه النقية",
        de: "Reinwasserstation",
      },
    },
  },
];

function toProduct(seed: PrincipleProductSeed, locale: Locale): Product {
  return {
    slug: seed.slug,
    title: seed.title[locale],
    category: seed.category,
    excerpt: seed.excerpt[locale],
    description: seed.description[locale],
    image: seed.image,
    relatedSolution: {
      slug: seed.relatedSolution.slug,
      groupSlug: seed.relatedSolution.groupSlug,
      label: seed.relatedSolution.label[locale],
    },
  };
}

export function getPrincipleProductSlugs(): string[] {
  return PRINCIPLE_PRODUCTS.map((product) => product.slug);
}

export function getPrincipleProduct(
  slug: string,
  locale: Locale,
): Product | undefined {
  const seed = PRINCIPLE_PRODUCTS.find((product) => product.slug === slug);
  return seed ? toProduct(seed, locale) : undefined;
}
