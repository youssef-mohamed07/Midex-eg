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
    defineField({ name: "footnote", title: "Footnote", type: "localeText" }),
    defineField({
      name: "image",
      title: "Section image",
      type: "imageWithAlt",
      description: "Optional image for this section (e.g. catalog hero tile, decorative header).",
    }),
    defineField({
      name: "viewAllLabel",
      title: "View all link label",
      type: "localeString",
      description: "Optional — e.g. news/blog “view all articles”.",
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

/** About-page metrics displayed below the hero copy. */
export const heroMetricsBlock = defineType({
  name: "heroMetricsBlock",
  title: "Hero metrics",
  type: "object",
  fields: [
    defineField({ name: "primaryValue", title: "Primary value", type: "localeString" }),
    defineField({ name: "primaryLabel", title: "Primary label", type: "localeString" }),
    defineField({ name: "badge", title: "Focus badge", type: "localeString" }),
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
    defineField({
      name: "badge",
      title: "Image badge",
      type: "localeString",
      description: "Small label over the promo image (e.g. ASME BPE).",
    }),
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
    defineField({ name: "productsLabel", title: "Products count label", type: "localeString" }),
    defineField({ name: "categoriesLabel", title: "Categories count label", type: "localeString" }),
    defineField({ name: "viewCategory", title: "View category", type: "localeString" }),
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
    defineField({ name: "contactUs", title: "Contact us", type: "localeString" }),
    defineField({ name: "galleryTitle", title: "Gallery title", type: "localeString" }),
    defineField({ name: "galleryPrevious", title: "Previous image", type: "localeString" }),
    defineField({ name: "galleryNext", title: "Next image", type: "localeString" }),
    defineField({ name: "galleryView", title: "View image", type: "localeString" }),
  ],
});

/** Case studies listing filters and card labels. */
export const caseStudiesExplorerLabels = defineType({
  name: "caseStudiesExplorerLabels",
  title: "Case studies explorer labels",
  type: "object",
  fields: [
    defineField({ name: "searchPlaceholder", title: "Search placeholder", type: "localeString" }),
    defineField({ name: "all", title: "All filter", type: "localeString" }),
    defineField({ name: "year", title: "Year filter", type: "localeString" }),
    defineField({ name: "capability", title: "Capability filter", type: "localeString" }),
    defineField({ name: "industry", title: "Industry filter", type: "localeString" }),
    defineField({ name: "results", title: "Results label", type: "localeString" }),
    defineField({ name: "noResults", title: "No results", type: "localeText" }),
    defineField({ name: "clearFilters", title: "Clear filters", type: "localeString" }),
    defineField({ name: "read", title: "Read case study", type: "localeString" }),
    defineField({ name: "countLabel", title: "Hero count label", type: "localeString" }),
    defineField({ name: "contactLabel", title: "FAQ contact label", type: "localeString" }),
  ],
});

/** Blog article-template labels. */
export const blogDetailLabels = defineType({
  name: "blogDetailLabels",
  title: "Blog detail labels",
  type: "object",
  fields: [
    defineField({ name: "blogLabel", title: "Blog breadcrumb", type: "localeString" }),
    defineField({ name: "minRead", title: "Minutes read suffix", type: "localeString" }),
    defineField({ name: "authorLabel", title: "Author label", type: "localeString" }),
    defineField({ name: "relatedPosts", title: "Related posts", type: "localeString" }),
    defineField({ name: "backToBlog", title: "Back to blog", type: "localeString" }),
    defineField({ name: "contactCta", title: "Contact CTA", type: "localeString" }),
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

/** Site-wide nav / footer / social / language chrome. */
export const layoutChrome = defineType({
  name: "layoutChrome",
  title: "Layout chrome",
  type: "object",
  fields: [
    defineField({ name: "home", title: "Home", type: "localeString" }),
    defineField({ name: "products", title: "Products", type: "localeString" }),
    defineField({ name: "solutions", title: "Solutions", type: "localeString" }),
    defineField({ name: "blog", title: "Blog", type: "localeString" }),
    defineField({ name: "caseStudies", title: "Case studies", type: "localeString" }),
    defineField({ name: "aboutUs", title: "About us", type: "localeString" }),
    defineField({ name: "contactUs", title: "Contact us", type: "localeString" }),
    defineField({ name: "allSolutions", title: "All solutions", type: "localeString" }),
    defineField({ name: "allCategories", title: "All categories / products", type: "localeString" }),
    defineField({ name: "menu", title: "Menu (mobile)", type: "localeString" }),
    defineField({ name: "close", title: "Close (mobile)", type: "localeString" }),
    defineField({ name: "capabilitiesTitle", title: "Mega: capabilities title", type: "localeString" }),
    defineField({ name: "capabilitiesSubtitle", title: "Mega: capabilities subtitle", type: "localeText" }),
    defineField({ name: "servicesLabel", title: "Mega: services label", type: "localeString" }),
    defineField({ name: "footerTagline", title: "Footer tagline", type: "localeText" }),
    defineField({ name: "footerServices", title: "Footer column: services", type: "localeString" }),
    defineField({ name: "footerUsefulLinks", title: "Footer column: useful links", type: "localeString" }),
    defineField({ name: "footerContactUs", title: "Footer column: contact", type: "localeString" }),
    defineField({ name: "footerRights", title: "Footer rights line", type: "localeString" }),
    defineField({ name: "footerAddressFallback", title: "Footer address fallback", type: "localeText" }),
    defineField({ name: "socialOpen", title: "Social FAB: open", type: "localeString" }),
    defineField({ name: "socialClose", title: "Social FAB: close", type: "localeString" }),
    defineField({ name: "socialLinkedIn", title: "Social: LinkedIn", type: "localeString" }),
    defineField({ name: "socialWhatsapp", title: "Social: WhatsApp", type: "localeString" }),
    defineField({ name: "socialEmail", title: "Social: Email", type: "localeString" }),
    defineField({ name: "socialTwitter", title: "Social: X / Twitter", type: "localeString" }),
    defineField({ name: "langEn", title: "Language: English", type: "localeString" }),
    defineField({ name: "langAr", title: "Language: Arabic", type: "localeString" }),
    defineField({ name: "langDe", title: "Language: German", type: "localeString" }),
    defineField({ name: "language", title: "Language switcher aria", type: "localeString" }),
  ],
});

/** Contact form field labels, subjects, validation, success/error. */
export const contactFormCopy = defineType({
  name: "contactFormCopy",
  title: "Contact form copy",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Form title", type: "localeString" }),
    defineField({ name: "intro", title: "Form intro", type: "localeText" }),
    defineField({ name: "quoteFor", title: "Quote for prefix", type: "localeString" }),
    defineField({ name: "fullName", title: "Full name", type: "localeString" }),
    defineField({ name: "emailLabel", title: "Email", type: "localeString" }),
    defineField({ name: "phoneLabel", title: "Phone", type: "localeString" }),
    defineField({ name: "company", title: "Company", type: "localeString" }),
    defineField({ name: "subject", title: "Subject", type: "localeString" }),
    defineField({ name: "productProject", title: "Product / project", type: "localeString" }),
    defineField({ name: "productPlaceholder", title: "Product placeholder", type: "localeString" }),
    defineField({ name: "message", title: "Message", type: "localeString" }),
    defineField({ name: "messagePlaceholder", title: "Message placeholder", type: "localeText" }),
    defineField({ name: "submit", title: "Submit", type: "localeString" }),
    defineField({ name: "subjectQuote", title: "Subject: quote", type: "localeString" }),
    defineField({ name: "subjectProduct", title: "Subject: product", type: "localeString" }),
    defineField({ name: "subjectGeneral", title: "Subject: general", type: "localeString" }),
    defineField({ name: "success", title: "Success message", type: "localeText" }),
    defineField({ name: "error", title: "Error message", type: "localeText" }),
    defineField({ name: "validationName", title: "Validation: name", type: "localeString" }),
    defineField({ name: "validationEmail", title: "Validation: email", type: "localeString" }),
    defineField({ name: "validationMessage", title: "Validation: message", type: "localeString" }),
  ],
});

/** Homepage multi-step quote form copy. */
export const quoteFormCopy = defineType({
  name: "quoteFormCopy",
  title: "Quote form copy",
  type: "object",
  fields: [
    defineField({ name: "badge", title: "Badge", type: "localeString" }),
    defineField({ name: "step1", title: "Step 1 label", type: "localeString" }),
    defineField({ name: "step2", title: "Step 2 label", type: "localeString" }),
    defineField({ name: "step3", title: "Step 3 label", type: "localeString" }),
    defineField({ name: "step4", title: "Step 4 label", type: "localeString" }),
    defineField({ name: "step1Question", title: "Step 1 question", type: "localeString" }),
    defineField({ name: "step2Question", title: "Step 2 question", type: "localeString" }),
    defineField({ name: "step3Question", title: "Step 3 question", type: "localeString" }),
    defineField({ name: "step4Question", title: "Step 4 question", type: "localeString" }),
    defineField({ name: "step1Hint", title: "Step 1 hint", type: "localeText" }),
    defineField({ name: "step2Hint", title: "Step 2 hint", type: "localeText" }),
    defineField({ name: "step3Hint", title: "Step 3 hint", type: "localeText" }),
    defineField({ name: "step4Hint", title: "Step 4 hint", type: "localeText" }),
    defineField({ name: "projectTypes", title: "Project type options", type: "localeStringList" }),
    defineField({ name: "industries", title: "Industry options", type: "localeStringList" }),
    defineField({ name: "location", title: "Location label", type: "localeString" }),
    defineField({ name: "timeline", title: "Timeline label", type: "localeString" }),
    defineField({ name: "description", title: "Description label", type: "localeString" }),
    defineField({ name: "locationPlaceholder", title: "Location placeholder", type: "localeString" }),
    defineField({ name: "timelinePlaceholder", title: "Timeline placeholder", type: "localeString" }),
    defineField({ name: "descriptionPlaceholder", title: "Description placeholder", type: "localeText" }),
    defineField({ name: "next", title: "Continue", type: "localeString" }),
    defineField({ name: "back", title: "Back", type: "localeString" }),
    defineField({ name: "submit", title: "Submit", type: "localeString" }),
    defineField({ name: "success", title: "Success", type: "localeText" }),
    defineField({ name: "again", title: "Send another", type: "localeString" }),
    defineField({ name: "progress", title: "Progress aria", type: "localeString" }),
    defineField({ name: "validationProjectType", title: "Validation: project type", type: "localeString" }),
    defineField({ name: "validationIndustry", title: "Validation: industry", type: "localeString" }),
    defineField({ name: "validationDescription", title: "Validation: description", type: "localeString" }),
  ],
});

/** Case study detail page labels. */
export const caseStudyLabels = defineType({
  name: "caseStudyLabels",
  title: "Case study labels",
  type: "object",
  fields: [
    defineField({ name: "scopeLabel", title: "Scope", type: "localeString" }),
    defineField({ name: "challengeLabel", title: "Challenge", type: "localeString" }),
    defineField({ name: "approachLabel", title: "Approach", type: "localeString" }),
    defineField({ name: "highlightsLabel", title: "Highlights", type: "localeString" }),
    defineField({ name: "outcomeLabel", title: "Outcome", type: "localeString" }),
    defineField({ name: "discuss", title: "Discuss CTA", type: "localeString" }),
    defineField({ name: "related", title: "Related heading", type: "localeString" }),
    defineField({ name: "back", title: "Back link", type: "localeString" }),
    defineField({ name: "galleryTitle", title: "Gallery heading", type: "localeString" }),
  ],
});
