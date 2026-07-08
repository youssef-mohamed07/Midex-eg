import { defineArrayMember, defineField, defineType } from "sanity";

/** Reusable section heading (title, subtitle, eyebrow). */
export const sectionHeader = defineType({
  name: "sectionHeader",
  title: "Section header",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Show section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
    defineField({
      name: "image",
      title: "Section image",
      type: "imageWithAlt",
      description: "Optional image for this section (e.g. catalog hero tile, decorative header).",
    }),
  ],
});

/** Hero copy block (page-level). */
export const pageHero = defineType({
  name: "pageHero",
  title: "Page hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
    defineField({ name: "badge", title: "Badge / highlight", type: "localeString" }),
    defineField({ name: "primaryCta", title: "Primary CTA label", type: "localeString" }),
    defineField({ name: "primaryCtaHref", title: "Primary CTA link", type: "string" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA label", type: "localeString" }),
    defineField({ name: "secondaryCtaHref", title: "Secondary CTA link", type: "string" }),
    defineField({
      name: "image",
      title: "Hero image",
      type: "imageWithAlt",
      description: "Optional side image shown on large screens.",
    }),
  ],
});

/** Home hero slide copy. */
export const homeHeroCopy = defineType({
  name: "homeHeroCopy",
  title: "Home hero copy",
  type: "object",
  fields: [
    defineField({ name: "slide1Title", title: "Headline", type: "localeString" }),
    defineField({ name: "slide1Text", title: "Description", type: "localeText" }),
    defineField({ name: "requestQuote", title: "Primary CTA", type: "localeString" }),
    defineField({ name: "viewProducts", title: "Secondary CTA", type: "localeString" }),
    defineField({ name: "viewProductsHref", title: "Secondary CTA link", type: "string" }),
    defineField({ name: "seeSolutions", title: "Solutions CTA", type: "localeString" }),
  ],
});

/** Featured quote block. */
export const quoteBlock = defineType({
  name: "quoteBlock",
  title: "Quote block",
  type: "object",
  fields: [
    defineField({ name: "enabled", title: "Show section", type: "boolean", initialValue: true }),
    defineField({ name: "quote", title: "Quote", type: "localeText" }),
    defineField({ name: "name", title: "Attribution name", type: "localeString" }),
    defineField({ name: "role", title: "Attribution role", type: "localeString" }),
    defineField({ name: "image", title: "Photo", type: "imageWithAlt" }),
  ],
});

/** Promo block (Truvia-style). */
export const promoSection = defineType({
  name: "promoSection",
  title: "Promo section",
  type: "object",
  fields: [
    defineField({ name: "enabled", title: "Show section", type: "boolean", initialValue: true }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "body", title: "Body", type: "localeText" }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "localeString" }),
    defineField({ name: "ctaHref", title: "CTA link", type: "string" }),
    defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
    defineField({ name: "secondaryImage", title: "Secondary image", type: "imageWithAlt" }),
    defineField({
      name: "features",
      title: "Feature bullets",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "promoFeature",
          fields: [
            defineField({ name: "title", title: "Title", type: "localeString" }),
            defineField({ name: "text", title: "Text", type: "localeText" }),
          ],
          preview: { select: { title: "title.en" } },
        }),
      ],
    }),
  ],
});

/** Before / after process section. */
export const beforeAfterContent = defineType({
  name: "beforeAfterContent",
  title: "Before / after section",
  type: "object",
  fields: [
    defineField({ name: "enabled", title: "Show section", type: "boolean", initialValue: true }),
    defineField({ name: "title", title: "Section title", type: "localeString" }),
    defineField({ name: "subtitle", title: "Section subtitle", type: "localeText" }),
    defineField({ name: "beforeTitle", title: "Before column title", type: "localeString" }),
    defineField({ name: "afterTitle", title: "After column title", type: "localeString" }),
    defineField({ name: "beforeItems", title: "Before keywords", type: "localeStringList" }),
    defineField({ name: "afterItems", title: "After keywords", type: "localeStringList" }),
    defineField({ name: "beforeImage", title: "Before image", type: "imageWithAlt" }),
    defineField({ name: "afterImage", title: "After image", type: "imageWithAlt" }),
  ],
});

/** Mission + vision pair. */
export const missionVisionBlock = defineType({
  name: "missionVisionBlock",
  title: "Mission & vision",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Section title", type: "localeString" }),
    defineField({ name: "visionLabel", title: "Vision label", type: "localeString" }),
    defineField({ name: "visionText", title: "Vision text", type: "localeText" }),
    defineField({ name: "missionLabel", title: "Mission label", type: "localeString" }),
    defineField({ name: "missionText", title: "Mission text", type: "localeText" }),
    defineField({ name: "visionImage", title: "Vision card image", type: "imageWithAlt" }),
    defineField({ name: "missionImage", title: "Mission card image", type: "imageWithAlt" }),
  ],
});

/** Standard line item. */
export const standardItem = defineType({
  name: "standardItem",
  title: "Standard",
  type: "object",
  fields: [
    defineField({ name: "key", title: "Key", type: "string" }),
    defineField({ name: "text", title: "Acronym / label", type: "localeString" }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
      description: "What this framework covers — not a company name.",
    }),
  ],
  preview: { select: { title: "text.en", subtitle: "key" } },
});

/** Company value with full localized copy. */
export const companyValueItem = defineType({
  name: "companyValueItem",
  title: "Company value",
  type: "object",
  fields: [
    defineField({ name: "key", title: "Key", type: "string" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "text", title: "Description", type: "localeText" }),
    defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
  ],
  preview: { select: { title: "title.en", subtitle: "key", media: "image" } },
});

/** Engineering capability card override (home capabilities accordion). */
export const engineeringCapabilityCard = defineType({
  name: "engineeringCapabilityCard",
  title: "Capability card",
  type: "object",
  fields: [
    defineField({
      name: "slug",
      title: "Solution group slug",
      type: "string",
      description: "Matches a solution group slug (e.g. solutions, welding, systems).",
    }),
    defineField({ name: "title", title: "Title override", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "items", title: "Bullet points", type: "localeStringList" }),
    defineField({ name: "href", title: "Link override", type: "string" }),
  ],
  preview: {
    select: { title: "slug", subtitle: "title.en" },
  },
});

/** Home engineering capabilities section (header + optional card overrides). */
export const engineeringCapabilitiesSection = defineType({
  name: "engineeringCapabilitiesSection",
  title: "Engineering capabilities",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Show section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
    defineField({
      name: "cards",
      title: "Capability cards",
      type: "array",
      of: [{ type: "engineeringCapabilityCard" }],
      description: "Optional overrides per solution group. Leave empty to use default groups.",
    }),
  ],
});

/** CTA band at page bottom. */
export const pageCta = defineType({
  name: "pageCta",
  title: "Page CTA",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Show section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "text", title: "Text", type: "localeText" }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "localeString" }),
    defineField({ name: "primaryCtaHref", title: "Primary link", type: "string" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "localeString" }),
    defineField({ name: "secondaryCtaHref", title: "Secondary link", type: "string" }),
    defineField({ name: "image", title: "Background / side image", type: "imageWithAlt" }),
  ],
});

/** Timeline section with optional step images. */
export const timelineSectionBlock = defineType({
  name: "timelineSectionBlock",
  title: "Timeline section",
  type: "object",
  fields: [
    defineField({ name: "enabled", title: "Show section", type: "boolean", initialValue: true }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "timelineStep",
          fields: [
            defineField({ name: "key", title: "Key", type: "string" }),
            defineField({ name: "title", title: "Title", type: "localeString" }),
            defineField({ name: "text", title: "Text", type: "localeText" }),
            defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
          ],
          preview: { select: { title: "title.en", subtitle: "key", media: "image" } },
        }),
      ],
    }),
  ],
});

/** Product catalog explorer UI labels. */
export const productExplorerLabels = defineType({
  name: "productExplorerLabels",
  title: "Catalog explorer labels",
  type: "object",
  fields: [
    defineField({ name: "allCategories", title: "All categories", type: "localeString" }),
    defineField({ name: "viewDetails", title: "View details", type: "localeString" }),
    defineField({ name: "requestQuote", title: "Request quote", type: "localeString" }),
    defineField({ name: "quoteShort", title: "Quote (short)", type: "localeString" }),
    defineField({ name: "noResults", title: "No results", type: "localeString" }),
    defineField({ name: "searchPlaceholder", title: "Search placeholder", type: "localeString" }),
  ],
});

/** Product detail page section headings. */
export const productDetailLabels = defineType({
  name: "productDetailLabels",
  title: "Product detail labels",
  type: "object",
  fields: [
    defineField({ name: "overviewTitle", title: "Overview", type: "localeString" }),
    defineField({ name: "featuresTitle", title: "Features", type: "localeString" }),
    defineField({ name: "specificationsTitle", title: "Specifications", type: "localeString" }),
    defineField({ name: "applicationsTitle", title: "Applications", type: "localeString" }),
    defineField({ name: "relatedProductsTitle", title: "Related products", type: "localeString" }),
    defineField({ name: "backToCatalog", title: "Back to catalog", type: "localeString" }),
    defineField({ name: "requestQuote", title: "Request quote", type: "localeString" }),
    defineField({ name: "relatedSolutionTitle", title: "Related solution", type: "localeString" }),
  ],
});

/** Solution service fallback page labels (when detail page object is empty). */
export const solutionChildLabels = defineType({
  name: "solutionChildLabels",
  title: "Service page labels",
  type: "object",
  fields: [
    defineField({ name: "introductionTitle", title: "Introduction heading", type: "localeString" }),
    defineField({ name: "capabilitiesTitle", title: "Capabilities heading", type: "localeString" }),
    defineField({ name: "relatedServicesTitle", title: "Related services heading", type: "localeString" }),
    defineField({ name: "heroCtaLabel", title: "Hero CTA", type: "localeString" }),
    defineField({ name: "browseGroupLabel", title: "Browse group link", type: "localeString" }),
  ],
});
