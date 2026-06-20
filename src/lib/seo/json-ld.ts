import type { ResolvedSeo } from "@/content/seo/types";
import { siteConfig, getSiteUrl } from "@/lib/seo/config";

type JsonLdInput = {
  seo: ResolvedSeo;
  breadcrumbs?: { name: string; path?: string }[];
  article?: { datePublished?: string; dateModified?: string; author?: string };
  product?: { sku?: string; category?: string };
};

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: getSiteUrl(),
    email: siteConfig.email,
    telephone: siteConfig.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    sameAs: [siteConfig.social.linkedIn],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: getSiteUrl(),
    inLanguage: siteConfig.locales,
  };
}

export function buildPageJsonLd({ seo, breadcrumbs, article, product }: JsonLdInput) {
  const type = seo.structuredDataType ?? "WebPage";

  const page: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    name: seo.title,
    description: seo.description,
    url: seo.canonicalUrl,
    inLanguage: seo.locale,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
  };

  if (breadcrumbs?.length) {
    page.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        ...(item.path ? { item: `${getSiteUrl()}${item.path}` } : {}),
      })),
    };
  }

  if (type === "Article" && article) {
    page.datePublished = article.datePublished;
    page.dateModified = article.dateModified ?? article.datePublished;
    page.author = {
      "@type": "Organization",
      name: siteConfig.name,
    };
    page.publisher = {
      "@type": "Organization",
      name: siteConfig.name,
      url: getSiteUrl(),
    };
  }

  if (type === "Product" && product) {
    page.category = product.category;
    page.sku = product.sku;
    page.brand = {
      "@type": "Brand",
      name: siteConfig.name,
    };
  }

  return page;
}

export function buildJsonLdGraph(input: JsonLdInput) {
  const stripContext = ({ "@context": _, ...rest }: Record<string, unknown>) => rest;

  return {
    "@context": "https://schema.org",
    "@graph": [
      stripContext(buildOrganizationJsonLd()),
      stripContext(buildWebSiteJsonLd()),
      stripContext(buildPageJsonLd(input)),
    ],
  };
}
