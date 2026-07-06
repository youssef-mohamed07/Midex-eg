import type { ImageLoaderProps } from "next/image";

const SANITY_CDN = "cdn.sanity.io";

/**
 * Sanity CDN: direct URL with transforms (fast, globally cached).
 * Local /public assets: Next.js same-origin optimizer.
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

  if (src.startsWith("/")) {
    // Static /public files — append width for the loader contract; CDN ignores extra params.
    const q = quality ?? 75;
    return `${src}?w=${width}&q=${q}`;
  }

  return src;
}
