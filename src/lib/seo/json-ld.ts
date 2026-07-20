import type { ResolvedSeo } from "@/lib/seo/types";
import type { SiteSettings } from "@/lib/cms/types";
import { getSiteUrl, siteConfig } from "@/lib/seo/config";
import { toAbsoluteImageUrl } from "@/lib/seo/images";

export type FaqJsonLdItem = { question: string; answer: string };

type JsonLdInput = {
  seo: ResolvedSeo;
  settings?: SiteSettings | null;
  breadcrumbs?: { name: string; path?: string }[];
  article?: { datePublished?: string; dateModified?: string; author?: string };
  product?: { sku?: string; category?: string };
  service?: {
    serviceType?: string;
    areaServed?: string | string[];
    providerName?: string;
  };
  faq?: FaqJsonLdItem[];
};

export function buildOrganizationJsonLd(settings?: SiteSettings | null) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: settings?.name || siteConfig.name,
    legalName: settings?.legalName || siteConfig.legalName,
    url: getSiteUrl(),
    logo: toAbsoluteImageUrl(siteConfig.brandLogo),
    image: toAbsoluteImageUrl(siteConfig.defaultOgImage),
    email: settings?.contact.email || siteConfig.email,
    telephone: settings?.contact.phones.length
      ? settings.contact.phones
      : siteConfig.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.addressParts.street || siteConfig.address.street,
      addressLocality: settings?.addressParts.city || siteConfig.address.city,
      addressRegion: settings?.addressParts.region || siteConfig.address.region,
      postalCode: settings?.addressParts.postalCode || siteConfig.address.postalCode,
      addressCountry: settings?.addressParts.country || siteConfig.address.country,
    },
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
    knowsAbout: [
      "Pharmaceutical process engineering",
      "Purified water systems",
      "WFI systems",
      "CIP/SIP",
      "Orbital welding",
      "Hygienic piping",
      "Turnkey installations",
    ],
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
    publisher: {
      "@type": "Organization",
      name: settings?.name || siteConfig.name,
      url: getSiteUrl(),
    },
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

export function buildFaqPageJsonLd(items: FaqJsonLdItem[]) {
  const valid = items.filter(
    (item) => item.question?.trim() && item.answer?.trim(),
  );
  if (valid.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: valid.map((item) => ({
      "@type": "Question",
      name: item.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.trim(),
      },
    })),
  };
}

export function buildPageJsonLd({
  seo,
  settings,
  breadcrumbs,
  article,
  product,
  service,
}: JsonLdInput) {
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

  if (type === "Service") {
    page.serviceType = service?.serviceType || seo.title;
    page.provider = {
      "@type": "Organization",
      name: service?.providerName || siteName,
      url: getSiteUrl(),
    };
    const area = service?.areaServed ?? "Egypt";
    page.areaServed = Array.isArray(area)
      ? area.map((name) => ({ "@type": "Country", name }))
      : { "@type": "Country", name: area };
    if (seo.openGraph.image) {
      page.image = seo.openGraph.image;
    }
  }

  return page;
}

export function buildJsonLdGraph(input: JsonLdInput) {
  const stripContext = ({
    "@context": context,
    ...rest
  }: Record<string, unknown>) => {
    void context;
    return rest;
  };

  const graph: Record<string, unknown>[] = [
    stripContext(buildOrganizationJsonLd(input.settings)),
    stripContext(buildWebSiteJsonLd(input.settings)),
    stripContext(buildPageJsonLd(input)),
  ];

  const faq = input.faq?.length ? buildFaqPageJsonLd(input.faq) : null;
  if (faq) graph.push(stripContext(faq));

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
