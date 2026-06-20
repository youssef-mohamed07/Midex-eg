import "server-only";

import type { SeoRouteKey } from "@/cms/collections/seo";
import type { SeoTemplateContext } from "@/content/seo/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildJsonLdGraph } from "@/lib/seo/json-ld";
import { resolveSeo } from "@/lib/seo/resolve";

type SeoHeadProps = {
  routeKey: SeoRouteKey;
  locale: string;
  params?: Record<string, string | undefined>;
  context?: SeoTemplateContext;
  slug?: string;
  breadcrumbs?: { name: string; path?: string }[];
  article?: { datePublished?: string; dateModified?: string };
  product?: { sku?: string; category?: string };
};

export function SeoHead(props: SeoHeadProps) {
  const seo = resolveSeo(props);
  const graph = buildJsonLdGraph({
    seo,
    breadcrumbs: props.breadcrumbs,
    article: props.article,
    product: props.product,
  });

  return <JsonLd data={graph} />;
}
