import type { SeoTemplateContext } from "@/content/seo/types";
import { getSiteUrl, siteConfig } from "@/lib/seo/config";

export function interpolateSeoTemplate(
  template: string,
  context: SeoTemplateContext = {},
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => context[key]?.trim() ?? "");
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

export function toAbsoluteImageUrl(path?: string): string {
  const siteUrl = getSiteUrl();
  const resolved = path?.trim() || siteConfig.defaultOgImage;

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
