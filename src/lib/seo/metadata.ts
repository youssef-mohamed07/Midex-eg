import "server-only";

import type { Metadata } from "next";
import type { SeoRouteKey, SeoTemplateContext } from "@/lib/seo/types";
import { siteConfig } from "@/lib/seo/config";
import { buildOgImageMeta } from "@/lib/seo/images";
import { resolveSeo } from "@/lib/seo/resolve";
import { routing } from "@/i18n/routing";

type BuildSeoMetadataInput = {
  routeKey: SeoRouteKey;
  locale: string;
  params?: Record<string, string | undefined>;
  context?: SeoTemplateContext;
  slug?: string;
};

export function buildSiteIcons(): NonNullable<Metadata["icons"]> {
  return {
    icon: [
      { url: "/images/brand/favicon.png", sizes: "64x64", type: "image/png" },
      { url: siteConfig.brandIcon, type: "image/svg+xml" },
    ],
    shortcut: "/images/brand/favicon.png",
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}

export async function buildSeoMetadata(input: BuildSeoMetadataInput): Promise<Metadata> {
  const seo = await resolveSeo(input);

  const robotsDirectives = [
    seo.robots.index ? "index" : "noindex",
    seo.robots.follow ? "follow" : "nofollow",
  ].join(", ");

  const ogType =
    seo.openGraph.type === "product" ? "website" : (seo.openGraph.type ?? "website");

  const ogLocale =
    siteConfig.openGraphLocales[seo.locale as keyof typeof siteConfig.openGraphLocales] ??
    seo.locale;

  const alternateLocales = routing.locales
    .filter((item) => item !== seo.locale)
    .map(
      (item) =>
        siteConfig.openGraphLocales[item as keyof typeof siteConfig.openGraphLocales] ?? item,
    );

  const shareImage = seo.openGraph.image
    ? buildOgImageMeta(seo.openGraph.image, seo.openGraph.title ?? seo.title)
    : undefined;

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
      locale: ogLocale,
      alternateLocale: alternateLocales,
      type: ogType,
      images: shareImage ? [shareImage] : undefined,
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
