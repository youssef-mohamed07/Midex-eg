import type { ImageLoaderProps } from "next/image";

const SANITY_CDN = "cdn.sanity.io";

/**
 * Optional per-image loader for Sanity CDN (direct transforms, no Next hop).
 * Local /public assets should use the default Next.js optimizer instead.
 */
export default function sanityImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (!src || !src.includes(SANITY_CDN)) return src;

  try {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    return url.toString();
  } catch {
    return src;
  }
}
