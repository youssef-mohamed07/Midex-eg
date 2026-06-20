import "server-only";

import type { Metadata } from "next";
import type { SeoRouteKey } from "@/cms/collections/seo";
import type { SeoTemplateContext } from "@/content/seo/types";
import { siteConfig } from "@/lib/seo/config";
import { resolveSeo } from "@/lib/seo/resolve";

type BuildSeoMetadataInput = {
  routeKey: SeoRouteKey;
  locale: string;
  params?: Record<string, string | undefined>;
  context?: SeoTemplateContext;
  slug?: string;
};

export function buildSeoMetadata(input: BuildSeoMetadataInput): Metadata {
  const seo = resolveSeo(input);

  const robotsDirectives = [
    seo.robots.index ? "index" : "noindex",
    seo.robots.follow ? "follow" : "nofollow",
  ].join(", ");

  const ogType =
    seo.openGraph.type === "product" ? "website" : (seo.openGraph.type ?? "website");

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
      languages: seo.alternates,
    },
    robots: robotsDirectives,
    openGraph: {
      title: seo.openGraph.title ?? seo.title,
      description: seo.openGraph.description ?? seo.description,
      url: seo.canonicalUrl,
      siteName: siteConfig.name,
      locale: seo.locale,
      type: ogType,
      images: seo.openGraph.image
        ? [{ url: seo.openGraph.image, alt: seo.openGraph.title ?? seo.title }]
        : undefined,
    },
    twitter: {
      card: seo.twitter.card,
      title: seo.twitter.title ?? seo.title,
      description: seo.twitter.description ?? seo.description,
      images: seo.twitter.image ? [seo.twitter.image] : undefined,
      site: siteConfig.twitterHandle,
    },
  };
}
