import { defineField, defineType } from "sanity";

const required = <T extends { required(): T }>(rule: T) => rule.required();

const LOCALES = [
  { id: "en", title: "English" },
  { id: "ar", title: "Arabic" },
  { id: "de", title: "German" },
] as const;

function localeFields(type: "string" | "text") {
  return LOCALES.map((locale) =>
    defineField({
      name: locale.id,
      title: locale.title,
      type,
      ...(type === "text" ? { rows: 3 } : {}),
    }),
  );
}

/** Localized single-line string ({ en, ar, de }). */
export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: localeFields("string"),
});

/** Localized multi-line text ({ en, ar, de }). */
export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: localeFields("text"),
});

/** Localized list of strings (bullets, highlights, paragraphs). */
export const localeStringList = defineType({
  name: "localeStringList",
  title: "Localized string list",
  type: "object",
  fields: LOCALES.map((locale) =>
    defineField({
      name: locale.id,
      title: locale.title,
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
  ),
});

/**
 * Image with hotspot, localized alt text, and the original public path kept
 * as a hidden fallback so the site renders even if the asset is missing.
 */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "localeString",
      description: "Descriptive alternative text for accessibility and SEO.",
    }),
    defineField({
      name: "sourcePath",
      title: "Source path",
      type: "string",
      hidden: true,
      description: "Original public path used as a render fallback.",
    }),
  ],
});

/** Label/value specification row (localized). */
export const specItem = defineType({
  name: "specItem",
  title: "Specification",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString" }),
    defineField({ name: "value", title: "Value", type: "localeString" }),
  ],
  preview: {
    select: { title: "label.en", subtitle: "value.en" },
  },
});

/** Principle / standard card with image. */
export const principleItem = defineType({
  name: "principleItem",
  title: "Principle",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      validation: required,
      description: "Stable identifier (used for translations and React keys).",
    }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "text", title: "Text", type: "localeText" }),
    defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "key", media: "image" },
  },
});

/** Workflow step with image. */
export const workflowStep = defineType({
  name: "workflowStep",
  title: "Workflow step",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      validation: required,
    }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "text", title: "Text", type: "localeText" }),
    defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
  ],
  preview: {
    select: { title: "title.en", subtitle: "key", media: "image" },
  },
});

/** Single FAQ entry. */
export const faqEntry = defineType({
  name: "faqEntry",
  title: "FAQ entry",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      validation: required,
    }),
    defineField({ name: "question", title: "Question", type: "localeText" }),
    defineField({ name: "answer", title: "Answer", type: "localeText" }),
  ],
  preview: {
    select: { title: "question.en", subtitle: "key" },
  },
});

/** Titled section of principles. */
export const principlesSection = defineType({
  name: "principlesSection",
  title: "Principles section",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "intro", title: "Intro", type: "localeText" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "principleItem" }],
    }),
  ],
});

/** Titled section of workflow steps. */
export const workflowSection = defineType({
  name: "workflowSection",
  title: "Workflow section",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "intro", title: "Intro", type: "localeText" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{ type: "workflowStep" }],
    }),
  ],
});

/** Titled FAQ section. */
export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ section",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Show section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "intro", title: "Intro", type: "localeText" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "faqEntry" }],
    }),
  ],
});

/** Call-to-action block (label + target). */
export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString" }),
    defineField({ name: "href", title: "Link", type: "string" }),
  ],
  preview: {
    select: { title: "label.en", subtitle: "href" },
  },
});

/** Full SEO field group used by seoEntry documents. */
export const seoFields = defineType({
  name: "seoFields",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "localeString",
      description: "Browser tab & search result title. {placeholders} allowed in templates.",
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "localeText",
      description: "Search snippet. {placeholders} allowed in templates.",
    }),
    defineField({ name: "focusKeyword", title: "Focus keyword", type: "localeString" }),
    defineField({ name: "keywords", title: "Keywords", type: "localeStringList" }),
    defineField({
      name: "canonicalPath",
      title: "Canonical path",
      type: "string",
      description: "Override canonical URL path. Leave empty for automatic.",
    }),
    defineField({
      name: "robotsIndex",
      title: "Allow indexing",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "robotsFollow",
      title: "Allow following links",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "ogType",
      title: "Open Graph type",
      type: "string",
      options: {
        list: [
          { title: "Website", value: "website" },
          { title: "Article", value: "article" },
          { title: "Product", value: "product" },
        ],
      },
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph title",
      type: "localeString",
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph description",
      type: "localeText",
    }),
    defineField({
      name: "ogImagePath",
      title: "Open Graph image (path or template)",
      type: "string",
      description: 'Image path or "{image}" template placeholder.',
    }),
    defineField({
      name: "twitterCard",
      title: "Twitter card",
      type: "string",
      options: {
        list: [
          { title: "Summary", value: "summary" },
          { title: "Summary large image", value: "summary_large_image" },
        ],
      },
    }),
    defineField({
      name: "twitterImagePath",
      title: "Twitter image (path or template)",
      type: "string",
    }),
    defineField({
      name: "structuredDataType",
      title: "Structured data type",
      type: "string",
      options: {
        list: [
          "WebPage",
          "AboutPage",
          "ContactPage",
          "CollectionPage",
          "Article",
          "Product",
          "Service",
        ],
      },
    }),
  ],
});
