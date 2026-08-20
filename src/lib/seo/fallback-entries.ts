import type { Locale } from "@/i18n/routing";
import type { SeoEntry, SeoRouteKey } from "@/lib/seo/types";

/**
 * Code fallbacks when a Sanity seoEntry is missing.
 * Locale-specific strings keep SERP snippets useful across en/ar/de.
 */
const FALLBACKS: Partial<
  Record<SeoRouteKey, Record<Locale, Omit<SeoEntry, "routeKey" | "locale">>>
> = {
  "home": {
    en: {
      title: "Advanced Pharmaceutical & Hygienic Process Engineering in Egypt | Midex",
      description: "Midex provides validated purified water systems, WFI, CIP/SIP, hygienic piping, and orbital welding for pharmaceutical and biotechnology industries.",
      focusKeyword: "pharmaceutical engineering company Egypt",
      openGraph: { type: "website", image: "/images/hero/slide-1.webp" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "WebPage" },
    },
    ar: {
      title: "الحلول الهندسية للصناعات الدوائية والغذائية في مصر | ميديكس",
      description: "ميديكس هي شركة هندسية رائدة تقدم أنظمة المياه المنقاة، WFI، أنظمة CIP/SIP وشبكات المواسير الصحية للصناعات الدوائية في الشرق الأوسط.",
      focusKeyword: "شركة هندسة دوائية في مصر",
      openGraph: { type: "website", image: "/images/hero/slide-1.webp" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "WebPage" },
    },
    de: {
      title: "Fortschrittliche Pharma- und Hygienetechnik in Ägypten | Midex",
      description: "Midex bietet validierte Reinwassersysteme, WFI, CIP/SIP, hygienische Rohrleitungen und Orbitalschweißen für die Pharma- und Biotechnologieindustrie.",
      focusKeyword: "Pharma Engineering Ägypten",
      openGraph: { type: "website", image: "/images/hero/slide-1.webp" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "WebPage" },
    },
  },
  "about": {
    en: {
      title: "About Midex | Pharmaceutical Engineering Leaders",
      description: "Learn about Midex's mission, quality standards, and expertise in ASME BPE hygienic piping and engineering across the Middle East.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "AboutPage" },
    },
    ar: {
      title: "عن ميديكس | رواد الهندسة الدوائية وشبكات المواسير",
      description: "تعرف على رؤية ميديكس ومعاييرها الهندسية وخبراتها العميقة في تركيبات المواسير الصحية طبقا لمعايير ASME BPE.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "AboutPage" },
    },
    de: {
      title: "Über Midex | Führend in Pharmazeutischer Technik",
      description: "Erfahren Sie mehr über die Mission, Standards und Expertise von Midex bei ASME BPE-Rohrleitungsinstallationen.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "AboutPage" },
    },
  },
  "solutions": {
    en: {
      title: "Engineering Solutions | Process Systems & Water | Midex",
      description: "Explore Midex's engineering solutions including Turnkey Process Systems, PW/WFI distribution loops, and Automatic Orbital Welding.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    ar: {
      title: "الحلول الهندسية وأنظمة المياه الدوائية | ميديكس",
      description: "استكشف الحلول الهندسية المتكاملة من ميديكس، بما في ذلك محطات المياه المنقاة واللحام المداري الأوتوماتيكي.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    de: {
      title: "Lösungen für Verfahrenstechnik & Wassersysteme | Midex",
      description: "Entdecken Sie die technischen Lösungen von Midex, einschließlich schlüsselfertiger Prozesssysteme und PW/WFI-Verteilungsschleifen.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
  },
  "solution-group": {
    en: {
      title: "{title} | Engineering Solutions | Midex",
      description: "{description}",
      openGraph: { type: "website", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    ar: {
      title: "{title} | الحلول الهندسية | ميديكس",
      description: "{description}",
      openGraph: { type: "website", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    de: {
      title: "{title} | Technische Lösungen | Midex",
      description: "{description}",
      openGraph: { type: "website", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    }
  },
  "solution-child": {
    en: {
      title: "{title} | {group} | Midex",
      description: "{description} Contact Midex for validated engineering services.",
      openGraph: { type: "article", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "Service" },
    },
    ar: {
      title: "{title} | {group} | ميديكس",
      description: "{description} تواصل مع ميديكس للخدمات الهندسية المعتمدة.",
      openGraph: { type: "article", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "Service" },
    },
    de: {
      title: "{title} | {group} | Midex",
      description: "{description} Kontaktieren Sie Midex für validierte Ingenieurdienstleistungen.",
      openGraph: { type: "article", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "Service" },
    }
  },
  "products": {
    en: {
      title: "Hygienic Products & Engineering Components | Midex",
      description: "Browse Midex's catalog of sanitary valves, hygienic pumps, multi-effect stills, and ASME BPE fittings.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    ar: {
      title: "كتالوج المنتجات الصحية والمكونات الهندسية | ميديكس",
      description: "تصفح كتالوج ميديكس للمحابس الصحية والمضخات ومعدات التقطير ووصلات ASME BPE.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    de: {
      title: "Hygienische Produkte & technische Komponenten | Midex",
      description: "Durchsuchen Sie den Midex-Katalog mit Sanitären Ventilen, Hygienepumpen und ASME BPE-Fittings.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    }
  },
  "product-category": {
    en: {
      title: "{title} | Midex Catalog",
      description: "{description}",
      openGraph: { type: "website", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    ar: {
      title: "{title} | كتالوج ميديكس",
      description: "{description}",
      openGraph: { type: "website", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    de: {
      title: "{title} | Midex Katalog",
      description: "{description}",
      openGraph: { type: "website", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    }
  },
  "product": {
    en: {
      title: "{title} | Midex",
      description: "{description} Request a technical quote from Midex today.",
      openGraph: { type: "website", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "Product" },
    },
    ar: {
      title: "{title} | ميديكس",
      description: "{description} اطلب عرض سعر فني من ميديكس اليوم.",
      openGraph: { type: "website", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "Product" },
    },
    de: {
      title: "{title} | Midex",
      description: "{description} Fordern Sie noch heute ein technisches Angebot an.",
      openGraph: { type: "website", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "Product" },
    }
  },
  "case-studies": {
    en: {
      title: "Case Studies | Midex Engineering Projects",
      description:
        "Explore Midex project case studies across pharmaceutical, food, and cosmetics facilities — purified water, CIP/SIP, piping, and turnkey delivery.",
      focusKeyword: "pharmaceutical engineering case studies Egypt",
      keywords: ["case studies", "pharmaceutical projects", "purified water", "CIP SIP", "Midex"],
      openGraph: { type: "website", image: "/images/hero/slide-1.webp" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    ar: {
      title: "دراسات الحالة | مشاريع هندسة ميدكس",
      description:
        "استكشف مشاريع ميدكس في مصانع الأدوية والأغذية ومستحضرات التجميل — مياه معالجة و CIP/SIP وأنابيب وتسليم متكامل.",
      focusKeyword: "دراسات حالة هندسة دوائية",
      openGraph: { type: "website", image: "/images/hero/slide-1.webp" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    de: {
      title: "Fallstudien | Midex Engineering-Projekte",
      description:
        "Entdecken Sie Midex-Projekte in Pharma-, Lebensmittel- und Kosmetikbetrieben — Reinwasser, CIP/SIP, Rohrleitungen und Turnkey-Lieferung.",
      focusKeyword: "Pharma Engineering Fallstudien",
      openGraph: { type: "website", image: "/images/hero/slide-1.webp" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
  },
  "case-study": {
    en: {
      title: "{title} | Midex Case Study",
      description:
        "{description} See how Midex delivered validated engineering for this project.",
      openGraph: { type: "article", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "Article" },
    },
    ar: {
      title: "{title} | دراسة حالة ميدكس",
      description:
        "{description} تعرف كيف قدّمت ميدكس هندسة معتمدة لهذا المشروع.",
      openGraph: { type: "article", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "Article" },
    },
    de: {
      title: "{title} | Midex Fallstudie",
      description:
        "{description} So lieferte Midex validiertes Engineering für dieses Projekt.",
      openGraph: { type: "article", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "Article" },
    },
  },
  "blog": {
    en: {
      title: "Engineering Insights & News | Midex Blog",
      description: "Read the latest insights on hygienic process engineering, pharmaceutical water systems, and ASME BPE standards from Midex experts.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    ar: {
      title: "المدونة الهندسية والأخبار | ميديكس",
      description: "اقرأ أحدث المقالات والرؤى حول الهندسة الدوائية وأنظمة المياه ومعايير ASME BPE من خبراء ميديكس.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    de: {
      title: "Einblicke in die Technik & Neuigkeiten | Midex Blog",
      description: "Lesen Sie die neuesten Erkenntnisse zur hygienischen Verfahrenstechnik und zu pharmazeutischen Wassersystemen.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    }
  },
  "blog-post": {
    en: {
      title: "{title} | Midex Blog",
      description: "{description}",
      openGraph: { type: "article", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "Article" },
    },
    ar: {
      title: "{title} | مدونة ميديكس",
      description: "{description}",
      openGraph: { type: "article", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "Article" },
    },
    de: {
      title: "{title} | Midex Blog",
      description: "{description}",
      openGraph: { type: "article", image: "{image}" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "Article" },
    }
  },
  "contact": {
    en: {
      title: "Contact Midex | Pharmaceutical Engineering Requests",
      description: "Get in touch with Midex for turnkey pharmaceutical projects, purified water systems, or hygienic piping installations in Egypt and the region.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "ContactPage" },
    },
    ar: {
      title: "اتصل بنا | طلبات مشاريع الهندسة الدوائية | ميديكس",
      description: "تواصل مع ميديكس لمشاريع الأدوية، أنظمة المياه المنقاة، أو تركيبات المواسير الصحية في مصر والمنطقة.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "ContactPage" },
    },
    de: {
      title: "Kontaktieren Sie Midex | Pharmazeutische Projekte",
      description: "Kontaktieren Sie Midex für pharmazeutische Projekte, Reinwassersysteme oder Rohrleitungsinstallationen in Ägypten und der Region.",
      openGraph: { type: "website" },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "ContactPage" },
    }
  }
};

export function getFallbackSeoEntry(
  routeKey: SeoRouteKey,
  locale: Locale,
): SeoEntry | undefined {
  const byLocale = FALLBACKS[routeKey];
  if (!byLocale) return undefined;
  const entry = byLocale[locale] ?? byLocale.en;
  if (!entry) return undefined;
  return { ...entry, routeKey, locale };
}
