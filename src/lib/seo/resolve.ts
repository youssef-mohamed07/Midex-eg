import "server-only";

import type { SeoRouteKey } from "@/cms/collections/seo";
import { getSeoEntry, getSeoOverride } from "@/content/seo/entries";
import type { ResolvedSeo, SeoEntry, SeoTemplateContext } from "@/content/seo/types";
import { getSiteUrl, parseLocale, siteConfig } from "@/lib/seo/config";
import {
  absoluteUrl,
  buildAlternateUrls,
  localizedPath,
  resolvePathFromRoute,
} from "@/lib/seo/paths";

function interpolate(template: string, context: SeoTemplateContext = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => context[key]?.trim() ?? "");
}

function applyTemplate(entry: SeoEntry, context: SeoTemplateContext) {
  const ogImage = entry.openGraph?.image
    ? interpolate(entry.openGraph.image, context)
    : undefined;

  const twitterImage = entry.twitter?.image
    ? interpolate(entry.twitter.image, context)
    : ogImage;

  return {
    title: interpolate(entry.title, context).trim(),
    description: interpolate(entry.description, context).trim(),
    focusKeyword: entry.focusKeyword,
    keywords: entry.keywords,
    openGraph: {
      ...entry.openGraph,
      title: entry.openGraph?.title
        ? interpolate(entry.openGraph.title, context)
        : undefined,
      description: entry.openGraph?.description
        ? interpolate(entry.openGraph.description, context)
        : undefined,
      image: ogImage || entry.openGraph?.image,
    },
    twitter: {
      ...entry.twitter,
      title: entry.twitter?.title ? interpolate(entry.twitter.title, context) : undefined,
      description: entry.twitter?.description
        ? interpolate(entry.twitter.description, context)
        : undefined,
      image: twitterImage,
    },
    robots: entry.robots,
    structuredDataType: entry.structuredData?.type,
    canonicalPath: entry.canonicalPath,
  };
}

type ResolveSeoInput = {
  routeKey: SeoRouteKey;
  locale: string;
  params?: Record<string, string | undefined>;
  context?: SeoTemplateContext;
  slug?: string;
};

export function resolveSeo({
  routeKey,
  locale: localeParam,
  params = {},
  context = {},
  slug,
}: ResolveSeoInput): ResolvedSeo {
  const locale = parseLocale(localeParam);

  const path = resolvePathFromRoute(routeKey, params);
  const override = getSeoOverride(routeKey, locale, slug);
  const base = override ?? getSeoEntry(routeKey, locale);

  if (!base) {
    const fallbackTitle = context.title ?? siteConfig.name;
    const fallbackDescription =
      context.description ?? context.excerpt ?? siteConfig.legalName;

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      canonicalUrl: absoluteUrl(path, locale),
      path,
      locale,
      robots: { index: true, follow: true },
      openGraph: { type: "website", title: fallbackTitle, description: fallbackDescription },
      twitter: { card: "summary_large_image", title: fallbackTitle, description: fallbackDescription },
      alternates: buildAlternateUrls(path),
    };
  }

  const resolved = applyTemplate(base, context);
  const canonicalPath = resolved.canonicalPath ?? path;

  const ogTitle = resolved.openGraph.title ?? resolved.title;
  const ogDescription = resolved.openGraph.description ?? resolved.description;
  const ogImagePath = resolved.openGraph.image || siteConfig.defaultOgImage;
  const ogImageUrl = ogImagePath.startsWith("http")
    ? ogImagePath
    : `${getSiteUrl()}${ogImagePath}`;

  const twitterTitle = resolved.twitter.title ?? ogTitle;
  const twitterDescription = resolved.twitter.description ?? ogDescription;
  const twitterImagePath = resolved.twitter.image ?? ogImagePath;
  const twitterImageUrl = twitterImagePath.startsWith("http")
    ? twitterImagePath
    : `${getSiteUrl()}${twitterImagePath}`;

  const robots = {
    index: resolved.robots?.index ?? true,
    follow: resolved.robots?.follow ?? true,
  };

  return {
    title: resolved.title,
    description: resolved.description,
    focusKeyword: resolved.focusKeyword,
    keywords: resolved.keywords,
    canonicalUrl: absoluteUrl(canonicalPath, locale),
    path: localizedPath(canonicalPath, locale),
    locale,
    robots,
    openGraph: {
      type: resolved.openGraph.type ?? "website",
      title: ogTitle,
      description: ogDescription,
      image: ogImageUrl,
    },
    twitter: {
      card: resolved.twitter.card ?? "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      image: twitterImageUrl,
    },
    structuredDataType: resolved.structuredDataType,
    alternates: buildAlternateUrls(canonicalPath),
  };
}
