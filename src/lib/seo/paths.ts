import type { Locale } from "@/i18n/routing";
import { getSiteUrl, siteConfig } from "@/lib/seo/config";

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === siteConfig.defaultLocale) return normalized === "/" ? "/" : normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function absoluteUrl(path: string, locale: Locale): string {
  return `${getSiteUrl()}${localizedPath(path, locale)}`;
}

export function buildAlternateUrls(path: string): Record<string, string> {
  return Object.fromEntries(
    siteConfig.locales.map((locale) => [locale, absoluteUrl(path, locale)]),
  );
}

export function resolvePathFromRoute(
  routeKey: string,
  params: Record<string, string | undefined> = {},
): string {
  switch (routeKey) {
    case "home":
      return "/";
    case "about":
      return "/about-us";
    case "contact":
      return "/contact";
    case "products":
      return "/products";
    case "product":
      return `/products/${params.slug ?? ""}`;
    case "product-category":
      return `/products/category/${params.slug ?? ""}`;
    case "solutions":
      return "/solutions";
    case "solution":
      return `/solutions/${params.slug ?? ""}`;
    case "solution-group":
      return `/solutions/group/${params.slug ?? ""}`;
    case "solution-child":
      return `/solutions/group/${params.group ?? params.slug ?? ""}/${params.child ?? ""}`;
    case "blog":
      return "/blog";
    case "blog-post":
      return `/blog/${params.slug ?? ""}`;
    default:
      return "/";
  }
}
