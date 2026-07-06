import "server-only";

import { getTranslations } from "next-intl/server";
import type { SeoRouteKey, SeoTemplateContext } from "@/lib/seo/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/cms";
import type { Locale } from "@/i18n/routing";
import { buildJsonLdGraph } from "@/lib/seo/json-ld";
import { localizedPath } from "@/lib/seo/paths";
import { resolveSeo } from "@/lib/seo/resolve";

type Breadcrumb = { name: string; path?: string };

type SeoHeadProps = {
  routeKey: SeoRouteKey;
  locale: string;
  params?: Record<string, string | undefined>;
  context?: SeoTemplateContext;
  slug?: string;
  breadcrumbs?: Breadcrumb[];
  article?: { datePublished?: string; dateModified?: string };
  product?: { sku?: string; category?: string };
};

/** Mirrors the visible breadcrumb trails so BreadcrumbList JSON-LD ships on every page. */
async function defaultBreadcrumbs(
  routeKey: SeoRouteKey,
  locale: string,
  params: Record<string, string | undefined>,
  context: SeoTemplateContext,
): Promise<Breadcrumb[]> {
  const nav = await getTranslations({ locale, namespace: "nav" });
  const path = (p: string) => localizedPath(p, locale as Locale);

  switch (routeKey) {
    case "about":
      return [{ name: nav("aboutUs"), path: path("/about-us") }];
    case "contact":
      return [{ name: nav("contactUs"), path: path("/contact") }];
    case "products":
      return [{ name: nav("products"), path: path("/products") }];
    case "product":
      return [
        { name: nav("products"), path: path("/products") },
        ...(context.title ? [{ name: context.title }] : []),
      ];
    case "product-category":
      return [
        { name: nav("products"), path: path("/products") },
        ...(context.title ? [{ name: context.title }] : []),
      ];
    case "solutions":
      return [{ name: nav("solutions"), path: path("/solutions") }];
    case "solution-group":
      return [
        { name: nav("solutions"), path: path("/solutions") },
        ...(context.title ? [{ name: context.title }] : []),
      ];
    case "solution-child":
      return [
        { name: nav("solutions"), path: path("/solutions") },
        ...(context.group
          ? [{ name: context.group, path: path(`/solutions/group/${params.slug ?? ""}`) }]
          : []),
        ...(context.title ? [{ name: context.title }] : []),
      ];
    case "blog":
      return [{ name: nav("blog"), path: path("/blog") }];
    case "blog-post":
      return [
        { name: nav("blog"), path: path("/blog") },
        ...(context.title ? [{ name: context.title }] : []),
      ];
    default:
      return [];
  }
}

export async function SeoHead(props: SeoHeadProps) {
  const [seo, settings] = await Promise.all([resolveSeo(props), getSiteSettings()]);
  const breadcrumbs =
    props.breadcrumbs ??
    (await defaultBreadcrumbs(
      props.routeKey,
      props.locale,
      props.params ?? {},
      props.context ?? {},
    ));

  const graph = buildJsonLdGraph({
    seo,
    settings,
    breadcrumbs,
    article: props.article,
    product: props.product,
  });

  return <JsonLd data={graph} />;
}
