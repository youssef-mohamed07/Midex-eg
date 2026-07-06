import "server-only";

import type { QueryParams } from "next-sanity";
import { cache } from "react";
import { getClient, getPreviewClient } from "@/lib/cms/client";

/** Default ISR window for CMS content (matches page-level `revalidate`). */
export const CMS_REVALIDATE = 86400;

/** Short cache in dev — fast reloads without stale pre-seed empty results. */
const DEV_REVALIDATE = 60;

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  /** Cache tags for on-demand revalidation via the Sanity webhook. */
  tags?: string[];
};

async function isDraftModeEnabled(): Promise<boolean> {
  try {
    const { draftMode } = await import("next/headers");
    const draft = await draftMode();
    return draft.isEnabled;
  } catch {
    return false;
  }
}

async function sanityFetchUncached<T>({
  query,
  params = {},
  tags = [],
}: SanityFetchOptions): Promise<T> {
  const isDraft = await isDraftModeEnabled();
  const isDev = process.env.NODE_ENV === "development";

  if (isDraft && process.env.SANITY_API_READ_TOKEN) {
    return getPreviewClient().fetch<T>(query, params, {
      cache: "no-store",
    });
  }

  const revalidate = isDev ? DEV_REVALIDATE : CMS_REVALIDATE;

  return getClient().fetch<T>(query, params, {
    next: { revalidate, tags },
  });
}

/**
 * Cached GROQ fetch — dedupes identical queries per request, ISR in prod,
 * short TTL in dev. Published content uses the Sanity CDN.
 */
export const sanityFetch = cache(sanityFetchUncached);
