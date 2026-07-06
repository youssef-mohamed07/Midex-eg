export type {
  SeoRouteKey,
  SeoEntry,
  ResolvedSeo,
  SeoTemplateContext,
} from "@/lib/seo/types";
export { siteConfig, getSiteUrl } from "@/lib/seo/config";
export { buildSeoMetadata } from "@/lib/seo/metadata";
export { resolveSeo } from "@/lib/seo/resolve";
