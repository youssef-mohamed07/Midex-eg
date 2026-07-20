import type { SeoTemplateContext } from "@/lib/seo/types";
import { getSiteUrl, siteConfig } from "@/lib/seo/config";

/** Map mistranslated CMS placeholders back to English context keys. */
const PLACEHOLDER_ALIASES: Record<string, string> = {
  Titel: "title",
  titel: "title",
  Beschreibung: "description",
  beschreibung: "description",
  Gruppe: "group",
  gruppe: "group",
  وصف: "description",
  عنوان: "title",
  مجموعة: "group",
};

export function interpolateSeoTemplate(
  template: string,
  context: SeoTemplateContext = {},
): string {
  return template.replace(/\{([^}]+)\}/g, (_, rawKey: string) => {
    const key = PLACEHOLDER_ALIASES[rawKey] ?? rawKey;
    return context[key]?.trim() ?? "";
  });
}

/** Returns a resolved image path, or undefined if placeholders were not filled. */
export function resolveTemplateImage(
  template: string | undefined,
  context: SeoTemplateContext = {},
): string | undefined {
  if (!template) return undefined;

  const value = interpolateSeoTemplate(template, context).trim();
  if (!value || /\{[\w]+\}/.test(value)) return undefined;

  return value;
}

/** Prefer optimized local WebP heroes when CMS still points at legacy PNGs. */
function preferLocalWebp(path: string): string {
  const map: Record<string, string> = {
    "/images/hero/slide-1.png": "/images/hero/slide-1.webp",
    "/images/hero/slide-2.png": "/images/hero/slide-1.webp",
    "/images/hero/slide-3.png": "/images/hero/slide-1.webp",
  };
  return map[path] ?? path;
}

export function toAbsoluteImageUrl(path?: string): string {
  const siteUrl = getSiteUrl();
  const resolved = preferLocalWebp(path?.trim() || siteConfig.defaultOgImage);

  return resolved.startsWith("http") ? resolved : `${siteUrl}${resolved}`;
}

export function buildOgImageMeta(imageUrl: string, alt: string) {
  return {
    url: imageUrl,
    alt,
    width: 1200,
    height: 630,
    type: imageUrl.endsWith(".png")
      ? "image/png"
      : imageUrl.endsWith(".webp")
        ? "image/webp"
        : imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")
          ? "image/jpeg"
          : imageUrl.endsWith(".svg")
            ? "image/svg+xml"
            : undefined,
  };
}
