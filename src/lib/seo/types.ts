import type { Locale } from "@/i18n/routing";

export type SeoRouteKey =
  | "home"
  | "about"
  | "contact"
  | "products"
  | "product"
  | "product-category"
  | "solutions"
  | "solution-group"
  | "solution-child"
  | "blog"
  | "blog-post";

export type SeoRobots = {
  index?: boolean;
  follow?: boolean;
};

export type SeoOpenGraph = {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "product";
};

export type SeoTwitter = {
  card?: "summary" | "summary_large_image";
  title?: string;
  description?: string;
  image?: string;
};

export type SeoStructuredData = {
  type?:
    | "WebPage"
    | "AboutPage"
    | "ContactPage"
    | "CollectionPage"
    | "Article"
    | "Product"
    | "Service";
};

/** One SEO document — maps 1:1 to a CMS `seoEntry` row (per locale view). */
export type SeoEntry = {
  routeKey: SeoRouteKey;
  locale: Locale;
  title: string;
  description: string;
  focusKeyword?: string;
  keywords?: string[];
  canonicalPath?: string;
  robots?: SeoRobots;
  openGraph?: SeoOpenGraph;
  twitter?: SeoTwitter;
  structuredData?: SeoStructuredData;
};

/** Runtime values injected into `{placeholder}` templates. */
export type SeoTemplateContext = Record<string, string | undefined>;

export type ResolvedSeo = {
  title: string;
  description: string;
  focusKeyword?: string;
  keywords?: string[];
  canonicalUrl: string;
  path: string;
  locale: Locale;
  robots: SeoRobots;
  openGraph: Required<Pick<SeoOpenGraph, "type">> & SeoOpenGraph;
  twitter: Required<Pick<SeoTwitter, "card">> & SeoTwitter;
  structuredDataType?: SeoStructuredData["type"];
  alternates: Record<string, string>;
};
