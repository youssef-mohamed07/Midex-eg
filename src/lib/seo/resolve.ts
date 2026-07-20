import "server-only";

import { getSeoEntry, getSeoOverride } from "@/lib/cms/seo";
import type {
  ResolvedSeo,
  SeoEntry,
  SeoRouteKey,
  SeoTemplateContext,
} from "@/lib/seo/types";
import { parseLocale, siteConfig } from "@/lib/seo/config";
import { getFallbackSeoEntry } from "@/lib/seo/fallback-entries";
import {
  interpolateSeoTemplate,
  resolveTemplateImage,
  toAbsoluteImageUrl,
} from "@/lib/seo/images";
import {
  absoluteUrl,
  buildAlternateUrls,
  localizedPath,
  resolvePathFromRoute,
} from "@/lib/seo/paths";

function applyTemplate(entry: SeoEntry, context: SeoTemplateContext) {
  const ogImage = resolveTemplateImage(entry.openGraph?.image, context);
  const twitterImage =
    resolveTemplateImage(entry.twitter?.image, context) ?? ogImage;

  return {
    title: interpolateSeoTemplate(entry.title, context).trim(),
    description: interpolateSeoTemplate(entry.description, context).trim(),
    focusKeyword: entry.focusKeyword,
    keywords: entry.keywords,
    openGraph: {
      ...entry.openGraph,
      title: entry.openGraph?.title
        ? interpolateSeoTemplate(entry.openGraph.title, context)
        : undefined,
      description: entry.openGraph?.description
        ? interpolateSeoTemplate(entry.openGraph.description, context)
        : undefined,
      image: ogImage,
    },
    twitter: {
      ...entry.twitter,
      title: entry.twitter?.title
        ? interpolateSeoTemplate(entry.twitter.title, context)
        : undefined,
      description: entry.twitter?.description
        ? interpolateSeoTemplate(entry.twitter.description, context)
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

export async function resolveSeo({
  routeKey,
  locale: localeParam,
  params = {},
  context = {},
  slug,
}: ResolveSeoInput): Promise<ResolvedSeo> {
  const locale = parseLocale(localeParam);

  const path = resolvePathFromRoute(routeKey, params);
  const override = await getSeoOverride(routeKey, locale, slug);
  const base =
    override ??
    (await getSeoEntry(routeKey, locale)) ??
    getFallbackSeoEntry(routeKey, locale);

  if (!base) {
    const fallbackTitle = context.title ?? siteConfig.name;
    const fallbackDescription =
      context.description ?? context.excerpt ?? siteConfig.legalName;
    const fallbackImage = toAbsoluteImageUrl(context.image);

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      canonicalUrl: absoluteUrl(path, locale),
      path,
      locale,
      robots: { index: true, follow: true },
      openGraph: {
        type: "website",
        title: fallbackTitle,
        description: fallbackDescription,
        image: fallbackImage,
      },
      twitter: {
        card: "summary_large_image",
        title: fallbackTitle,
        description: fallbackDescription,
        image: fallbackImage,
      },
      alternates: buildAlternateUrls(path),
    };
  }

  const resolved = applyTemplate(base, context);
  const canonicalPath = resolved.canonicalPath ?? path;

  const ogTitle = resolved.openGraph.title ?? resolved.title;
  const ogDescription = resolved.openGraph.description ?? resolved.description;
  const ogImageUrl = toAbsoluteImageUrl(resolved.openGraph.image);

  const twitterTitle = resolved.twitter.title ?? ogTitle;
  const twitterDescription = resolved.twitter.description ?? ogDescription;
  const twitterImageUrl = toAbsoluteImageUrl(resolved.twitter.image ?? resolved.openGraph.image);

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
