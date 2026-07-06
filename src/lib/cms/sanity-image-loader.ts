import type { ImageLoaderProps } from "next/image";

const SANITY_CDN = "cdn.sanity.io";

/**
 * Loads Sanity images directly from the CDN (bypasses /_next/image proxy).
 * Local /public paths are returned unchanged.
 */
export default function sanityImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (!src) return src;

  if (src.includes(SANITY_CDN)) {
    try {
      const url = new URL(src);
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", String(quality ?? 80));
      url.searchParams.set("auto", "format");
      return url.toString();
    } catch {
      return src;
    }
  }

  return src;
}
