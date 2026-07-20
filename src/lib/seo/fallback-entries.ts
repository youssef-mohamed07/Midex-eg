import type { Locale } from "@/i18n/routing";
import type { SeoEntry, SeoRouteKey } from "@/lib/seo/types";

/**
 * Code fallbacks when a Sanity seoEntry is missing (e.g. case studies never seeded).
 * Locale-specific strings keep SERP snippets useful across en/ar/de.
 */
const FALLBACKS: Partial<
  Record<SeoRouteKey, Record<Locale, Omit<SeoEntry, "routeKey" | "locale">>>
> = {
  "case-studies": {
    en: {
      title: "Case Studies | Midex Engineering Projects",
      description:
        "Explore Midex project case studies across pharmaceutical, food, and cosmetics facilities — purified water, CIP/SIP, piping, and turnkey delivery.",
      focusKeyword: "pharmaceutical engineering case studies Egypt",
      keywords: [
        "case studies",
        "pharmaceutical projects",
        "purified water",
        "CIP SIP",
        "Midex",
      ],
      openGraph: {
        type: "website",
        image: "/images/hero/slide-1.webp",
      },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    ar: {
      title: "دراسات الحالة | مشاريع هندسة ميدكس",
      description:
        "استكشف مشاريع ميدكس في مصانع الأدوية والأغذية ومستحضرات التجميل — مياه معالجة و CIP/SIP وأنابيب وتسليم متكامل.",
      focusKeyword: "دراسات حالة هندسة دوائية",
      openGraph: {
        type: "website",
        image: "/images/hero/slide-1.webp",
      },
      twitter: { card: "summary_large_image" },
      structuredData: { type: "CollectionPage" },
    },
    de: {
      title: "Fallstudien | Midex Engineering-Projekte",
      description:
        "Entdecken Sie Midex-Projekte in Pharma-, Lebensmittel- und Kosmetikbetrieben — Reinwasser, CIP/SIP, Rohrleitungen und Turnkey-Lieferung.",
      focusKeyword: "Pharma Engineering Fallstudien",
      openGraph: {
        type: "website",
        image: "/images/hero/slide-1.webp",
      },
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
