import "server-only";

import type { Locale } from "@/i18n/routing";
import { sanityFetch } from "@/lib/cms/fetch";
import { loc, locList, locOptional } from "@/lib/cms/fragments";
import type { SeoEntry, SeoRouteKey, SeoStructuredData } from "@/lib/seo/types";

type RawSeoEntry = {
  routeKey: SeoRouteKey;
  slug?: string;
  title: string;
  description: string;
  focusKeyword?: string;
  keywords: string[];
  canonicalPath?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  ogType?: "website" | "article" | "product";
  ogTitle?: string;
  ogDescription?: string;
  ogImagePath?: string;
  twitterCard?: "summary" | "summary_large_image";
  twitterImagePath?: string;
  structuredDataType?: SeoStructuredData["type"];
};

const seoProjection = `{
  routeKey,
  slug,
  "title": ${loc("seo.title")},
  "description": ${loc("seo.description")},
  "focusKeyword": ${locOptional("seo.focusKeyword")},
  "keywords": ${locList("seo.keywords")},
  "canonicalPath": seo.canonicalPath,
  "robotsIndex": seo.robotsIndex,
  "robotsFollow": seo.robotsFollow,
  "ogType": seo.ogType,
  "ogTitle": ${locOptional("seo.ogTitle")},
  "ogDescription": ${locOptional("seo.ogDescription")},
  "ogImagePath": seo.ogImagePath,
  "twitterCard": seo.twitterCard,
  "twitterImagePath": seo.twitterImagePath,
  "structuredDataType": seo.structuredDataType
}`;

function toSeoEntry(raw: RawSeoEntry | null, locale: Locale): SeoEntry | undefined {
  if (!raw) return undefined;

  return {
    routeKey: raw.routeKey,
    locale,
    title: raw.title,
    description: raw.description,
    focusKeyword: raw.focusKeyword ?? undefined,
    keywords: raw.keywords.length ? raw.keywords : undefined,
    canonicalPath: raw.canonicalPath ?? undefined,
    robots:
      raw.robotsIndex === undefined && raw.robotsFollow === undefined
        ? undefined
        : { index: raw.robotsIndex ?? undefined, follow: raw.robotsFollow ?? undefined },
    openGraph: {
      type: raw.ogType ?? undefined,
      title: raw.ogTitle ?? undefined,
      description: raw.ogDescription ?? undefined,
      image: raw.ogImagePath ?? undefined,
    },
    twitter:
      raw.twitterCard || raw.twitterImagePath
        ? { card: raw.twitterCard ?? undefined, image: raw.twitterImagePath ?? undefined }
        : undefined,
    structuredData: raw.structuredDataType
      ? { type: raw.structuredDataType }
      : undefined,
  };
}

export async function getSeoEntry(
  routeKey: SeoRouteKey,
  locale: Locale,
): Promise<SeoEntry | undefined> {
  const raw = await sanityFetch<RawSeoEntry | null>({
    query: `*[_type == "seoEntry" && routeKey == $routeKey && !defined(slug)][0] ${seoProjection}`,
    params: { routeKey, locale },
    tags: ["seoEntry"],
  });
  return toSeoEntry(raw, locale);
}

export async function getSeoOverride(
  routeKey: SeoRouteKey,
  locale: Locale,
  slug?: string,
): Promise<SeoEntry | undefined> {
  if (!slug) return undefined;
  const raw = await sanityFetch<RawSeoEntry | null>({
    query: `*[_type == "seoEntry" && routeKey == $routeKey && slug == $slug][0] ${seoProjection}`,
    params: { routeKey, locale, slug },
    tags: ["seoEntry"],
  });
  return toSeoEntry(raw, locale);
}
