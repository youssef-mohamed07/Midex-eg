const SANITY_CDN_HOST = "cdn.sanity.io";

/** Append Sanity CDN transforms (WebP/AVIF, width, quality). Local paths pass through. */
export function optimizeSanityImageUrl(
  url: string,
  width = 1600,
  quality = 80,
): string {
  if (!url || !url.includes(SANITY_CDN_HOST)) return url;

  try {
    const parsed = new URL(url);
    parsed.searchParams.set("w", String(width));
    parsed.searchParams.set("q", String(quality));
    parsed.searchParams.set("auto", "format");
    return parsed.toString();
  } catch {
    return url;
  }
}
