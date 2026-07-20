import "server-only";

import { createClient, type QueryParams } from "next-sanity";
import { cache } from "react";
import { getClient, getPreviewClient } from "@/lib/cms/client";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/** Default ISR window for CMS content (matches page-level `revalidate`). */
export const CMS_REVALIDATE = 86400;

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

function isNetworkError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const err = error as {
    message?: string;
    cause?: { code?: string; message?: string };
    code?: string;
  };
  const text = `${err.message ?? ""} ${err.cause?.message ?? ""} ${err.cause?.code ?? ""} ${err.code ?? ""}`;
  return /ENOTFOUND|ECONNREFUSED|ECONNRESET|ETIMEDOUT|UND_ERR_CONNECT_TIMEOUT|fetch failed|Connect Timeout/i.test(
    text,
  );
}

/** Direct API origin — used when the CDN hostname fails (DNS / timeout). */
function getApiFallbackClient() {
  if (!projectId) throw new Error("Sanity projectId is not configured");
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "published",
  });
}

async function fetchPublished<T>(
  query: string,
  params: QueryParams,
  tags: string[],
): Promise<T> {
  const isDev = process.env.NODE_ENV === "development";
  const options = isDev
    ? { cache: "no-store" as const }
    : { next: { revalidate: CMS_REVALIDATE, tags } };

  try {
    return await getClient().fetch<T>(query, params, options);
  } catch (error) {
    if (!isNetworkError(error)) throw error;

    console.warn(
      "[sanity] CDN fetch failed — retrying via api.sanity.io",
      error instanceof Error ? error.message : error,
    );
    return getApiFallbackClient().fetch<T>(query, params, options);
  }
}

async function sanityFetchUncached<T>({
  query,
  params = {},
  tags = [],
}: SanityFetchOptions): Promise<T> {
  const isDraft = await isDraftModeEnabled();

  if (isDraft && process.env.SANITY_API_READ_TOKEN) {
    return getPreviewClient().fetch<T>(query, params, {
      cache: "no-store",
    });
  }

  return fetchPublished<T>(query, params, tags);
}

/**
 * Cached GROQ fetch — dedupes identical queries per request, ISR in prod,
 * short TTL in dev. Published content uses the Sanity CDN.
 */
export const sanityFetch = cache(sanityFetchUncached);
