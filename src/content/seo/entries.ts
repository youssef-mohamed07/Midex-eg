import type { SeoRouteKey } from "@/cms/collections/seo";
import type { SeoEntry } from "@/content/seo/types";

function entry(
  routeKey: SeoRouteKey,
  locale: SeoEntry["locale"],
  data: Omit<SeoEntry, "routeKey" | "locale">,
): SeoEntry {
  return { routeKey, locale, ...data };
}

/** Static + template SEO entries — edit here or sync from a CMS. */
export const seoEntries: SeoEntry[] = [
  entry("home", "en", {
    title: "Midex | Pharmaceutical & Hygienic Process Engineering",
    description:
      "Midex delivers validated purified water, WFI, CIP/SIP, orbital welding, and turnkey installations for pharmaceutical, food, and cosmetics industries in Egypt and the region.",
    focusKeyword: "pharmaceutical engineering Egypt",
    keywords: ["purified water", "WFI", "GMP", "orbital welding", "Midex"],
    openGraph: { type: "website", image: "/images/hero/slide-1.png" },
    structuredData: { type: "WebPage" },
  }),
  entry("home", "ar", {
    title: "ميدكس | هندسة العمليات الدوائية والصحية",
    description:
      "ميدكس تقدم أنظمة مياه معالجة و WFI و CIP/SIP ولحام مداري وتركيبات متكاملة معتمدة لصناعات الأدوية والأغذية ومستحضرات التجميل في مصر والمنطقة.",
    focusKeyword: "هندسة دوائية مصر",
    openGraph: { type: "website", image: "/images/hero/slide-1.png" },
    structuredData: { type: "WebPage" },
  }),
  entry("home", "de", {
    title: "Midex | Pharmazeutisches & hygienisches Prozess-Engineering",
    description:
      "Midex liefert validierte Reinwasser-, WFI-, CIP/SIP-Systeme, Orbital-Schweißen und Turnkey-Installationen für Pharma-, Lebensmittel- und Kosmetikindustrie.",
    focusKeyword: "Pharma Engineering Ägypten",
    openGraph: { type: "website", image: "/images/hero/slide-1.png" },
    structuredData: { type: "WebPage" },
  }),

  entry("about", "en", {
    title: "About Midex | Validated Engineering Partner",
    description:
      "Learn about Midex — specialized engineering for pharmaceutical, food, and cosmetics industries with GMP-aligned systems and turnkey project delivery.",
    openGraph: { type: "website", image: "/images/hero/slide-2.png" },
    structuredData: { type: "AboutPage" },
  }),
  entry("about", "ar", {
    title: "من نحن | ميدكس — شريك هندسي معتمد",
    description:
      "تعرف على ميدكس — هندسة متخصصة للصناعات الدوائية والغذائية ومستحضرات التجميل مع أنظمة متوافقة مع GMP وتسليم مشاريع متكاملة.",
    openGraph: { type: "website", image: "/images/hero/slide-2.png" },
    structuredData: { type: "AboutPage" },
  }),
  entry("about", "de", {
    title: "Über Midex | Validierter Engineering-Partner",
    description:
      "Erfahren Sie mehr über Midex — spezialisiertes Engineering für Pharma-, Lebensmittel- und Kosmetikindustrie mit GMP-konformen Systemen.",
    openGraph: { type: "website", image: "/images/hero/slide-2.png" },
    structuredData: { type: "AboutPage" },
  }),

  entry("contact", "en", {
    title: "Contact Midex | Quotes & Engineering Support",
    description:
      "Request a quote or speak with our engineering team about purified water systems, products, and turnkey solutions. sales@midex-eg.com",
    openGraph: { type: "website", image: "/images/hero/slide-3.png" },
    twitter: { card: "summary_large_image", image: "/images/hero/slide-3.png" },
    structuredData: { type: "ContactPage" },
  }),
  entry("contact", "ar", {
    title: "اتصل بميدكس | عروض أسعار ودعم هندسي",
    description:
      "اطلب عرض سعر أو تحدث مع فريق الهندسة حول أنظمة المياه المعالجة والمنتجات والحلول المتكاملة.",
    openGraph: { type: "website", image: "/images/hero/slide-3.png" },
    twitter: { card: "summary_large_image", image: "/images/hero/slide-3.png" },
    structuredData: { type: "ContactPage" },
  }),
  entry("contact", "de", {
    title: "Midex Kontakt | Angebote & Engineering-Support",
    description:
      "Fordern Sie ein Angebot an oder sprechen Sie mit unserem Team über Reinwassersysteme, Produkte und Turnkey-Lösungen.",
    openGraph: { type: "website", image: "/images/hero/slide-3.png" },
    twitter: { card: "summary_large_image", image: "/images/hero/slide-3.png" },
    structuredData: { type: "ContactPage" },
  }),

  entry("products", "en", {
    title: "Hygienic Products | Midex Catalog",
    description:
      "Browse industrial-grade hygienic components — pumps, UV units, filters, and more. Every product includes a direct path to request a quote.",
    openGraph: { type: "website", image: "/images/products/product-1724113383.jpg" },
    structuredData: { type: "CollectionPage" },
  }),
  entry("products", "ar", {
    title: "المنتجات الصحية | دليل منتجات ميدكس",
    description:
      "تصفح مكونات صناعية صحية — مضخات ووحدات UV وفلاتر وغيرها مع إمكانية طلب عرض سعر مباشرة.",
    openGraph: { type: "website", image: "/images/products/product-1724113383.jpg" },
    structuredData: { type: "CollectionPage" },
  }),
  entry("products", "de", {
    title: "Hygienische Produkte | Midex Katalog",
    description:
      "Industriekomponenten mit hygienischem Design — Pumpen, UV-Einheiten, Filter und mehr mit direktem Angebotsweg.",
    openGraph: { type: "website", image: "/images/products/product-1724113383.jpg" },
    structuredData: { type: "CollectionPage" },
  }),

  entry("product", "en", {
    title: "{title} | Midex Products",
    description: "{description} Request specifications and a quote from Midex.",
    openGraph: { type: "product", image: "{image}" },
    structuredData: { type: "Product" },
  }),
  entry("product", "ar", {
    title: "{title} | منتجات ميدكس",
    description: "{description} اطلب المواصفات وعرض سعر من ميدكس.",
    openGraph: { type: "product", image: "{image}" },
    structuredData: { type: "Product" },
  }),
  entry("product", "de", {
    title: "{title} | Midex Produkte",
    description: "{description} Spezifikationen und Angebot bei Midex anfordern.",
    openGraph: { type: "product", image: "{image}" },
    structuredData: { type: "Product" },
  }),

  entry("product-category", "en", {
    title: "{title} | Midex Product Categories",
    description: "{description} Explore hygienic components and request a quote.",
    openGraph: { type: "website", image: "{image}" },
    twitter: { card: "summary_large_image", image: "{image}" },
    structuredData: { type: "CollectionPage" },
  }),
  entry("product-category", "ar", {
    title: "{title} | فئات منتجات ميدكس",
    description: "{description} استكشف المكونات الصحية واطلب عرض سعر.",
    openGraph: { type: "website", image: "{image}" },
    twitter: { card: "summary_large_image", image: "{image}" },
    structuredData: { type: "CollectionPage" },
  }),
  entry("product-category", "de", {
    title: "{title} | Midex Produktkategorien",
    description: "{description} Hygienische Komponenten entdecken und Angebot anfordern.",
    openGraph: { type: "website", image: "{image}" },
    twitter: { card: "summary_large_image", image: "{image}" },
    structuredData: { type: "CollectionPage" },
  }),

  entry("solutions", "en", {
    title: "Turnkey Solutions | Midex Engineering",
    description:
      "Systems, modifications, orbital welding, and installations for hygienic process environments — validated to GMP standards.",
    openGraph: { type: "website", image: "/images/services/orbital-welding.png" },
    structuredData: { type: "CollectionPage" },
  }),
  entry("solutions", "ar", {
    title: "حلول متكاملة | هندسة ميدكس",
    description:
      "أنظمة وتعديلات ولحام مداري وتركيبات لبيئات العمليات الصحية — معتمدة وفق GMP.",
    openGraph: { type: "website", image: "/images/services/orbital-welding.png" },
    structuredData: { type: "CollectionPage" },
  }),
  entry("solutions", "de", {
    title: "Turnkey-Lösungen | Midex Engineering",
    description:
      "Systeme, Modifikationen, Orbital-Schweißen und Installationen für hygienische Prozessumgebungen nach GMP.",
    openGraph: { type: "website", image: "/images/services/orbital-welding.png" },
    structuredData: { type: "CollectionPage" },
  }),


  entry("solution-group", "en", {
    title: "{title} | Midex Solution Groups",
    description: "{description} Browse services and request engineering support.",
    openGraph: { type: "website", image: "{image}" },
    structuredData: { type: "CollectionPage" },
  }),
  entry("solution-group", "ar", {
    title: "{title} | مجموعات حلول ميدكس",
    description: "{description} تصفح الخدمات واطلب دعمًا هندسيًا.",
    openGraph: { type: "website", image: "{image}" },
    structuredData: { type: "CollectionPage" },
  }),
  entry("solution-group", "de", {
    title: "{title} | Midex Lösungsgruppen",
    description: "{description} Leistungen entdecken und Engineering-Support anfordern.",
    openGraph: { type: "website", image: "{image}" },
    structuredData: { type: "CollectionPage" },
  }),

  entry("solution-child", "en", {
    title: "{title} | {group} | Midex",
    description: "{description} Validated engineering from design to commissioning.",
    openGraph: { type: "website", image: "{image}" },
    structuredData: { type: "Service" },
  }),
  entry("solution-child", "ar", {
    title: "{title} | {group} | ميدكس",
    description: "{description} هندسة معتمدة من التصميم إلى التشغيل.",
    openGraph: { type: "website", image: "{image}" },
    structuredData: { type: "Service" },
  }),
  entry("solution-child", "de", {
    title: "{title} | {group} | Midex",
    description: "{description} Validiertes Engineering von Design bis Inbetriebnahme.",
    openGraph: { type: "website", image: "{image}" },
    structuredData: { type: "Service" },
  }),

  entry("blog", "en", {
    title: "Engineering Blog | Midex Insights",
    description:
      "News and insights on hygienic engineering, purified water validation, orbital welding, and CIP system design.",
    openGraph: { type: "website", image: "/images/blog/blog-1776352479.jpg" },
    structuredData: { type: "CollectionPage" },
  }),
  entry("blog", "ar", {
    title: "مدونة الهندسة | رؤى ميدكس",
    description:
      "أخبار ورؤى حول الهندسة الصحية والتحقق من المياه المعالجة واللحام المداري وأنظمة CIP.",
    openGraph: { type: "website", image: "/images/blog/blog-1776352479.jpg" },
    structuredData: { type: "CollectionPage" },
  }),
  entry("blog", "de", {
    title: "Engineering Blog | Midex Einblicke",
    description:
      "Neuigkeiten zu hygienischem Engineering, Reinwasservalidierung, Orbital-Schweißen und CIP-Systemdesign.",
    openGraph: { type: "website", image: "/images/blog/blog-1776352479.jpg" },
    structuredData: { type: "CollectionPage" },
  }),

  entry("blog-post", "en", {
    title: "{title} | Midex Blog",
    description: "{description}",
    openGraph: { type: "article", image: "{image}" },
    structuredData: { type: "Article" },
  }),
  entry("blog-post", "ar", {
    title: "{title} | مدونة ميدكس",
    description: "{description}",
    openGraph: { type: "article", image: "{image}" },
    structuredData: { type: "Article" },
  }),
  entry("blog-post", "de", {
    title: "{title} | Midex Blog",
    description: "{description}",
    openGraph: { type: "article", image: "{image}" },
    structuredData: { type: "Article" },
  }),
];

/** Per-slug overrides — highest priority (like WordPress per-post SEO). */
export const seoOverrides: SeoEntry[] = [];

export function getSeoEntry(routeKey: SeoRouteKey, locale: SeoEntry["locale"]) {
  return seoEntries.find((item) => item.routeKey === routeKey && item.locale === locale);
}

export function getSeoOverride(
  routeKey: SeoRouteKey,
  locale: SeoEntry["locale"],
  slug?: string,
) {
  if (!slug) return undefined;
  return seoOverrides.find(
    (item) =>
      item.routeKey === routeKey &&
      item.locale === locale &&
      item.canonicalPath?.endsWith(`/${slug}`),
  );
}
