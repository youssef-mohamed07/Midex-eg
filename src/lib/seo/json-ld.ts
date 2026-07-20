import type { ResolvedSeo } from "@/lib/seo/types";
import type { SiteSettings } from "@/lib/cms/types";
import { getSiteUrl, siteConfig } from "@/lib/seo/config";
import { toAbsoluteImageUrl } from "@/lib/seo/images";

type JsonLdInput = {
  seo: ResolvedSeo;
  settings?: SiteSettings | null;
  breadcrumbs?: { name: string; path?: string }[];
  article?: { datePublished?: string; dateModified?: string; author?: string };
  product?: { sku?: string; category?: string };
};

export function buildOrganizationJsonLd(settings?: SiteSettings | null) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.name || siteConfig.name,
    legalName: settings?.legalName || siteConfig.legalName,
    url: getSiteUrl(),
    logo: toAbsoluteImageUrl(siteConfig.brandLogo),
    image: toAbsoluteImageUrl(siteConfig.defaultOgImage),
    email: settings?.contact.email || siteConfig.email,
    telephone: settings?.contact.phones.length ? settings.contact.phones : siteConfig.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.addressParts.street || siteConfig.address.street,
      addressLocality: settings?.addressParts.city || siteConfig.address.city,
      addressRegion: settings?.addressParts.region || siteConfig.address.region,
      postalCode: settings?.addressParts.postalCode || siteConfig.address.postalCode,
      addressCountry: settings?.addressParts.country || siteConfig.address.country,
    },
    sameAs: [
      settings?.social.linkedIn ?? siteConfig.social.linkedIn,
      settings?.social.facebook ?? siteConfig.social.facebook,
      settings?.social.youtube ?? siteConfig.social.youtube,
      settings?.social.whatsApp ?? siteConfig.social.whatsApp,
    ].filter(Boolean),
  };
}

export function buildWebSiteJsonLd(settings?: SiteSettings | null) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings?.name || siteConfig.name,
    url: getSiteUrl(),
    inLanguage: siteConfig.locales,
  };
}

/** BreadcrumbList JSON-LD for a page's breadcrumb trail. */
export function buildBreadcrumbJsonLd(
  breadcrumbs: { name: string; path?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${getSiteUrl()}${item.path}` } : {}),
    })),
  };
}

export function buildPageJsonLd({ seo, settings, breadcrumbs, article, product }: JsonLdInput) {
  const type = seo.structuredDataType ?? "WebPage";
  const siteName = settings?.name || siteConfig.name;

  const page: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    name: seo.title,
    description: seo.description,
    url: seo.canonicalUrl,
    inLanguage: seo.locale,
    ...(seo.openGraph.image ? { image: seo.openGraph.image } : {}),
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
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
    page.headline = seo.title;
    page.datePublished = article.datePublished;
    page.dateModified = article.dateModified ?? article.datePublished;
    page.author = {
      "@type": "Organization",
      name: siteName,
    };
    page.publisher = {
      "@type": "Organization",
      name: siteName,
      url: getSiteUrl(),
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteImageUrl(siteConfig.brandLogo),
      },
    };
  }

  if (type === "Product" && product) {
    page.category = product.category;
    page.sku = product.sku;
    page.brand = {
      "@type": "Brand",
      name: siteName,
    };
    if (seo.openGraph.image) {
      page.image = seo.openGraph.image;
    }
  }

  return page;
}

export function buildJsonLdGraph(input: JsonLdInput) {
  const stripContext = ({ "@context": context, ...rest }: Record<string, unknown>) => {
    void context;
    return rest;
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      stripContext(buildOrganizationJsonLd(input.settings)),
      stripContext(buildWebSiteJsonLd(input.settings)),
      stripContext(buildPageJsonLd(input)),
    ],
  };
}
