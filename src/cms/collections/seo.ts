import type { CmsCollection } from "@/cms/types";

/**
 * SEO collection schema — WordPress/Yoast-style fields, structured for a future CMS admin.
 * Data lives in `src/content/seo/` until a headless CMS is connected.
 */
export const seoCollection: CmsCollection = {
  slug: "seo",
  labels: {
    singular: "SEO Entry",
    plural: "SEO Entries",
  },
  description:
    "Per-page and per-template SEO settings: titles, descriptions, social cards, robots, and structured data.",
  fields: [
    {
      name: "routeKey",
      type: "select",
      label: "Page / template",
      required: true,
      description: "Static page or dynamic content template (e.g. product detail).",
      options: [
        { label: "Home", value: "home" },
        { label: "About Us", value: "about" },
        { label: "Contact", value: "contact" },
        { label: "Products index", value: "products" },
        { label: "Product detail (template)", value: "product" },
        { label: "Product category (template)", value: "product-category" },
        { label: "Solutions index", value: "solutions" },
        { label: "Solution detail (template)", value: "solution" },
        { label: "Solution group (template)", value: "solution-group" },
        { label: "Solution service (template)", value: "solution-child" },
        { label: "Blog index", value: "blog" },
        { label: "Blog post (template)", value: "blog-post" },
      ],
    },
    {
      name: "locale",
      type: "select",
      label: "Language",
      required: true,
      localized: false,
      options: [
        { label: "English", value: "en" },
        { label: "Arabic", value: "ar" },
        { label: "German", value: "de" },
      ],
    },
    {
      name: "title",
      type: "text",
      label: "SEO title",
      required: true,
      maxLength: 70,
      description: "Browser tab & search result title. Use {title} in templates.",
    },
    {
      name: "description",
      type: "textarea",
      label: "Meta description",
      required: true,
      maxLength: 160,
      description: "Search snippet. Use {description}, {excerpt}, etc. in templates.",
    },
    {
      name: "focusKeyword",
      type: "text",
      label: "Focus keyword",
      description: "Primary keyword for editorial reference (Yoast-style).",
    },
    {
      name: "keywords",
      type: "array",
      label: "Meta keywords",
      description: "Optional comma-separated keywords.",
    },
    {
      name: "canonicalPath",
      type: "text",
      label: "Canonical path",
      description: "Override canonical URL path (e.g. /products). Leave empty for auto.",
    },
    {
      name: "robots",
      type: "group",
      label: "Robots",
      fields: [
        {
          name: "index",
          type: "boolean",
          label: "Allow indexing",
        },
        {
          name: "follow",
          type: "boolean",
          label: "Allow following links",
        },
      ],
    },
    {
      name: "openGraph",
      type: "group",
      label: "Open Graph (Facebook, LinkedIn)",
      fields: [
        { name: "title", type: "text", label: "OG title", maxLength: 70 },
        { name: "description", type: "textarea", label: "OG description", maxLength: 200 },
        { name: "image", type: "image", label: "OG image" },
        {
          name: "type",
          type: "select",
          label: "OG type",
          options: [
            { label: "Website", value: "website" },
            { label: "Article", value: "article" },
            { label: "Product", value: "product" },
          ],
        },
      ],
    },
    {
      name: "twitter",
      type: "group",
      label: "Twitter / X card",
      fields: [
        {
          name: "card",
          type: "select",
          label: "Card type",
          options: [
            { label: "Summary", value: "summary" },
            { label: "Summary large image", value: "summary_large_image" },
          ],
        },
        { name: "title", type: "text", label: "Twitter title" },
        { name: "description", type: "textarea", label: "Twitter description" },
        { name: "image", type: "image", label: "Twitter image" },
      ],
    },
    {
      name: "structuredData",
      type: "group",
      label: "Structured data (JSON-LD)",
      fields: [
        {
          name: "type",
          type: "select",
          label: "Schema type",
          options: [
            { label: "WebPage", value: "WebPage" },
            { label: "AboutPage", value: "AboutPage" },
            { label: "ContactPage", value: "ContactPage" },
            { label: "CollectionPage", value: "CollectionPage" },
            { label: "Article", value: "Article" },
            { label: "Product", value: "Product" },
            { label: "Service", value: "Service" },
          ],
        },
      ],
    },
  ],
};

export type SeoRouteKey =
  | "home"
  | "about"
  | "contact"
  | "products"
  | "product"
  | "product-category"
  | "solutions"
  | "solution"
  | "solution-group"
  | "solution-child"
  | "blog"
  | "blog-post";
