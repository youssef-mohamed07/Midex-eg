const SANITY_CDN_HOST = "cdn.sanity.io";

/** True when a value is a non-empty URL/path suitable for next/image. */
export function isValidImageSrc(src: unknown): src is string {
  return typeof src === "string" && src.trim().length > 0;
}

/** Returns the first usable image src, optionally falling back. */
export function resolveImageSrc(src: unknown, fallback?: string): string | undefined {
  if (isValidImageSrc(src)) return src.trim();
  if (isValidImageSrc(fallback)) return fallback.trim();
  return undefined;
}

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
