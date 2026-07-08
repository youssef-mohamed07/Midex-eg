import { apiVersion, dataset, projectId } from "@/sanity/env";

export type SanityRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

type CacheEntry = {
  data: SanityRedirect[];
  fetchedAt: number;
};

const CACHE_TTL_MS = 60_000;
let cache: CacheEntry | null = null;

function normalizePath(path: string): string {
  if (!path) return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  if (withSlash.length > 1 && withSlash.endsWith("/")) {
    return withSlash.slice(0, -1);
  }
  return withSlash;
}

function pathsMatch(pathname: string, source: string): boolean {
  const normalizedPath = normalizePath(pathname);
  const normalizedSource = normalizePath(source);

  if (normalizedPath === normalizedSource) return true;

  const localeMatch = normalizedPath.match(/^\/(en|ar|de)(\/.*)?$/);
  if (!localeMatch) return false;

  const pathWithoutLocale = normalizePath(localeMatch[2] || "/");
  if (pathWithoutLocale === normalizedSource) return true;

  const localePrefixedSource = normalizePath(`/${localeMatch[1]}${normalizedSource}`);
  return normalizedPath === localePrefixedSource;
}

export function resolveSanityRedirect(
  pathname: string,
  redirects: SanityRedirect[],
): { destination: string; permanent: boolean } | null {
  for (const redirect of redirects) {
    if (!redirect.source?.trim() || !redirect.destination?.trim()) continue;
    if (!pathsMatch(pathname, redirect.source)) continue;

    const destination = redirect.destination.startsWith("http")
      ? redirect.destination
      : buildLocalizedDestination(pathname, redirect.destination);

    return { destination, permanent: redirect.permanent ?? true };
  }

  return null;
}

function buildLocalizedDestination(pathname: string, destination: string): string {
  const dest = normalizePath(destination);
  const localeMatch = pathname.match(/^\/(en|ar|de)(\/|$)/);
  if (!localeMatch) return dest;
  if (dest.match(/^\/(en|ar|de)(\/|$)/)) return dest;
  return dest === "/" ? `/${localeMatch[1]}` : `/${localeMatch[1]}${dest}`;
}

export async function getSanityRedirects(): Promise<SanityRedirect[]> {
  if (!projectId) return [];

  const now = Date.now();
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  const query = encodeURIComponent(
    `*[_type == "redirect"]{ source, destination, "permanent": coalesce(permanent, true) }`,
  );
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) return cache?.data ?? [];

    const payload = (await response.json()) as { result?: SanityRedirect[] };
    const data = payload.result ?? [];
    cache = { data, fetchedAt: now };
    return data;
  } catch {
    return cache?.data ?? [];
  }
}
