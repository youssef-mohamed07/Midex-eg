import { defineArrayMember, defineField, defineType } from "sanity";

const required = <T extends { required(): T }>(rule: T) => rule.required();

/* ------------------------------------------------------------------ */
/* Singletons                                                          */
/* ------------------------------------------------------------------ */

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity" },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "manifest", title: "Manifest & Robots" },
  ],
  fields: [
    defineField({ name: "name", title: "Site name", type: "string", group: "identity", validation: required }),
    defineField({ name: "legalName", title: "Legal name", type: "string", group: "identity" }),
    defineField({ name: "logoDark", title: "Logo (dark)", type: "imageWithAlt", group: "identity" }),
    defineField({ name: "logoWhite", title: "Logo (white)", type: "imageWithAlt", group: "identity" }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({
      name: "phones",
      title: "Phone numbers",
      type: "array",
      of: [{ type: "string" }],
      group: "contact",
    }),
    defineField({ name: "address", title: "Address", type: "text", rows: 3, group: "contact" }),
    defineField({ name: "addressStreet", title: "Street", type: "string", group: "contact" }),
    defineField({ name: "addressCity", title: "City", type: "string", group: "contact" }),
    defineField({ name: "addressRegion", title: "Region", type: "string", group: "contact" }),
    defineField({ name: "addressPostalCode", title: "Postal code", type: "string", group: "contact" }),
    defineField({ name: "addressCountry", title: "Country code", type: "string", group: "contact" }),
    defineField({ name: "mapsUrl", title: "Google Maps URL", type: "url", group: "contact" }),
    defineField({ name: "mapsEmbedUrl", title: "Google Maps embed URL", type: "url", group: "contact" }),
    defineField({ name: "linkedIn", title: "LinkedIn URL", type: "url", group: "social" }),
    defineField({ name: "twitter", title: "X / Twitter URL", type: "url", group: "social" }),
    defineField({ name: "whatsApp", title: "WhatsApp URL", type: "url", group: "social" }),
    defineField({ name: "twitterHandle", title: "Twitter handle", type: "string", group: "social" }),
    defineField({
      name: "manifestDescription",
      title: "Web app manifest description",
      type: "text",
      rows: 2,
      group: "manifest",
    }),
    defineField({ name: "manifestBackgroundColor", title: "Manifest background color", type: "string", group: "manifest" }),
    defineField({ name: "manifestThemeColor", title: "Manifest theme color", type: "string", group: "manifest" }),
    defineField({
      name: "robotsDisallow",
      title: "Robots disallowed paths",
      type: "array",
      of: [{ type: "string" }],
      group: "manifest",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "media", title: "Hero media", default: true },
    { name: "hero", title: "Hero copy" },
    { name: "partners", title: "Partners" },
    { name: "quote", title: "Featured quote" },
    { name: "capabilities", title: "Capabilities" },
    { name: "events", title: "Events" },
    { name: "products", title: "Products" },
    { name: "truvia", title: "Truvia promo" },
    { name: "beforeAfter", title: "Before / after" },
    { name: "stats", title: "Statistics" },
    { name: "caseStudies", title: "Case studies" },
    { name: "testimonials", title: "Testimonials" },
    { name: "exclusive", title: "Exclusive partners" },
    { name: "services", title: "Services" },
    { name: "news", title: "News / blog" },
    { name: "clients", title: "Client logos" },
    { name: "quoteForm", title: "Quote form" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Bottom CTA" },
  ],
  fields: [
    defineField({
      name: "heroCollageLeft",
      title: "Hero collage — left column",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "object",
          name: "collageImage",
          fields: [
            defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
            defineField({
              name: "className",
              title: "Layout classes",
              type: "string",
              description: "Tailwind sizing classes — controls exact collage layout.",
            }),
          ],
          preview: { select: { media: "image", title: "className" } },
        }),
      ],
    }),
    defineField({
      name: "heroCollageRight",
      title: "Hero collage — right column",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "object",
          name: "collageImage",
          fields: [
            defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
            defineField({ name: "className", title: "Layout classes", type: "string" }),
          ],
          preview: { select: { media: "image", title: "className" } },
        }),
      ],
    }),
    defineField({
      name: "heroSlides",
      title: "Hero slides",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "object",
          name: "heroSlide",
          fields: [
            defineField({ name: "image", title: "Background image", type: "imageWithAlt" }),
          ],
          preview: { select: { media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "featuredNavImage",
      title: "Navigation featured image",
      type: "imageWithAlt",
      group: "media",
      description: "Image shown in the products mega-menu panel.",
    }),
    defineField({ name: "heroCopy", title: "Hero copy", type: "homeHeroCopy", group: "hero" }),
    defineField({ name: "partnersSection", title: "Partners section", type: "sectionHeader", group: "partners" }),
    defineField({ name: "featuredQuote", title: "Featured quote", type: "quoteBlock", group: "quote" }),
    defineField({ name: "capabilitiesSection", title: "Capabilities section", type: "engineeringCapabilitiesSection", group: "capabilities" }),
    defineField({ name: "eventsSection", title: "Events section", type: "sectionHeader", group: "events" }),
    defineField({ name: "productsSection", title: "Products section", type: "sectionHeader", group: "products" }),
    defineField({ name: "truviaSection", title: "Truvia promo", type: "promoSection", group: "truvia" }),
    defineField({ name: "beforeAfterSection", title: "Before / after", type: "beforeAfterContent", group: "beforeAfter" }),
    defineField({ name: "statsSection", title: "Statistics section", type: "sectionHeader", group: "stats" }),
    defineField({ name: "caseStudiesSection", title: "Case studies section", type: "sectionHeader", group: "caseStudies" }),
    defineField({ name: "testimonialsSection", title: "Testimonials section", type: "sectionHeader", group: "testimonials" }),
    defineField({ name: "exclusiveSection", title: "Exclusive partners section", type: "sectionHeader", group: "exclusive" }),
    defineField({ name: "servicesSection", title: "Services section", type: "sectionHeader", group: "services", description: "Hidden on homepage by default — enable in Show section to display." }),
    defineField({ name: "newsSection", title: "News / blog section", type: "sectionHeader", group: "news", description: "Hidden on homepage by default — enable in Show section to display." }),
    defineField({ name: "clientLogosSection", title: "Client logos section", type: "sectionHeader", group: "clients", description: "Hidden on homepage by default — enable in Show section to display." }),
    defineField({ name: "quoteFormSection", title: "Quote form section", type: "sectionHeader", group: "quoteForm" }),
    defineField({ name: "faq", title: "FAQ", type: "faqSection", group: "faq" }),
    defineField({ name: "quoteCta", title: "Bottom CTA", type: "pageCta", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "mission", title: "Mission & vision" },
    { name: "milestones", title: "Milestones" },
    { name: "founders", title: "Founders" },
    { name: "standards", title: "Standards" },
    { name: "certifications", title: "Certifications" },
    { name: "events", title: "Events" },
    { name: "values", title: "Values" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Bottom CTA" },
  ],
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero", group: "hero" }),
    defineField({ name: "missionVision", title: "Mission & vision", type: "missionVisionBlock", group: "mission" }),
    defineField({ name: "milestonesSection", title: "Milestones section", type: "sectionHeader", group: "milestones" }),
    defineField({ name: "foundersSection", title: "Founders section", type: "sectionHeader", group: "founders" }),
    defineField({
      name: "standardsSection",
      title: "Standards section",
      type: "object",
      group: "standards",
      fields: [
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
        defineField({
          name: "items",
          title: "Standards",
          type: "array",
          of: [{ type: "standardItem" }],
        }),
      ],
    }),
    defineField({
      name: "certificationsSection",
      title: "Certifications section",
      type: "sectionHeader",
      group: "certifications",
      description: "Certificate images are managed under People & Brands → Certificates.",
    }),
    defineField({ name: "eventsSection", title: "Events section", type: "sectionHeader", group: "events" }),
    defineField({
      name: "valuesSection",
      title: "Values section",
      type: "object",
      group: "values",
      fields: [
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
        defineField({
          name: "items",
          title: "Values",
          type: "array",
          of: [{ type: "companyValueItem" }],
        }),
      ],
    }),
    defineField({ name: "faq", title: "FAQ", type: "faqSection", group: "faq" }),
    defineField({ name: "cta", title: "Bottom CTA", type: "pageCta", group: "cta" }),
    defineField({
      name: "standards",
      title: "Standards (legacy keys)",
      type: "array",
      of: [{ type: "string" }],
      group: "standards",
      hidden: true,
      description: "Deprecated — use Standards section items instead.",
    }),
    defineField({
      name: "values",
      title: "Values (legacy images)",
      type: "array",
      group: "values",
      hidden: true,
      of: [
        defineArrayMember({
          type: "object",
          name: "companyValue",
          fields: [
            defineField({ name: "key", title: "Key", type: "string", validation: required }),
            defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
          ],
          preview: { select: { title: "key", media: "image" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "aside", title: "Contact aside" },
    { name: "form", title: "Form" },
    { name: "map", title: "Map" },
  ],
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero", group: "hero" }),
    defineField({
      name: "aside",
      title: "Aside copy",
      type: "object",
      group: "aside",
      fields: [
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "intro", title: "Intro", type: "localeText" }),
      ],
    }),
    defineField({
      name: "form",
      title: "Form",
      type: "object",
      group: "form",
      fields: [
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "intro", title: "Intro", type: "localeText" }),
      ],
    }),
    defineField({
      name: "map",
      title: "Map section",
      type: "object",
      group: "map",
      fields: [
        defineField({ name: "title", title: "Title", type: "localeString" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "localeText" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});

export const productsPage = defineType({
  name: "productsPage",
  title: "Products Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "catalog", title: "Catalog" },
    { name: "detail", title: "Product detail" },
    { name: "stats", title: "Statistics" },
    { name: "caseStudies", title: "Case studies" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Bottom CTA" },
  ],
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero", group: "hero" }),
    defineField({ name: "catalogSection", title: "Catalog section", type: "sectionHeader", group: "catalog" }),
    defineField({
      name: "explorerLabels",
      title: "Catalog explorer labels",
      type: "productExplorerLabels",
      group: "catalog",
    }),
    defineField({
      name: "detailLabels",
      title: "Detail page labels",
      type: "productDetailLabels",
      group: "detail",
    }),
    defineField({
      name: "detailCta",
      title: "Detail page CTA",
      type: "pageCta",
      group: "detail",
    }),
    defineField({ name: "statsSection", title: "Statistics section", type: "sectionHeader", group: "stats" }),
    defineField({ name: "caseStudiesSection", title: "Case studies section", type: "sectionHeader", group: "caseStudies" }),
    defineField({ name: "faq", title: "FAQ", type: "faqSection", group: "faq" }),
    defineField({ name: "cta", title: "Bottom CTA", type: "pageCta", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Products Page" }) },
});

export const solutionsPage = defineType({
  name: "solutionsPage",
  title: "Solutions Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "capabilities", title: "Capabilities" },
    { name: "beforeAfter", title: "Before / after" },
    { name: "timeline", title: "Timeline" },
    { name: "stats", title: "Statistics" },
    { name: "caseStudies", title: "Case studies" },
    { name: "testimonials", title: "Testimonials" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Bottom CTA" },
  ],
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero", group: "hero" }),
    defineField({ name: "capabilitiesSection", title: "Capabilities section", type: "sectionHeader", group: "capabilities" }),
    defineField({ name: "beforeAfterSection", title: "Before / after", type: "beforeAfterContent", group: "beforeAfter" }),
    defineField({
      name: "timelineSection",
      title: "Timeline section",
      type: "timelineSectionBlock",
      group: "timeline",
    }),
    defineField({ name: "statsSection", title: "Statistics section", type: "sectionHeader", group: "stats" }),
    defineField({ name: "caseStudiesSection", title: "Case studies section", type: "sectionHeader", group: "caseStudies" }),
    defineField({ name: "testimonialsSection", title: "Testimonials section", type: "sectionHeader", group: "testimonials" }),
    defineField({ name: "faq", title: "FAQ", type: "faqSection", group: "faq" }),
    defineField({ name: "cta", title: "Bottom CTA", type: "pageCta", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Solutions Page" }) },
});

export const blogPage = defineType({
  name: "blogPage",
  title: "Blog Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "listing", title: "Listing" },
    { name: "cta", title: "Sidebar CTA" },
  ],
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero", group: "hero" }),
    defineField({
      name: "listing",
      title: "Listing labels",
      type: "object",
      group: "listing",
      fields: [
        defineField({ name: "featuredLabel", title: "Featured label", type: "localeString" }),
        defineField({ name: "latestLabel", title: "Latest label", type: "localeString" }),
        defineField({ name: "readPost", title: "Read post CTA", type: "localeString" }),
        defineField({ name: "postsLabel", title: "Posts count label", type: "localeString" }),
      ],
    }),
    defineField({ name: "cta", title: "Sidebar CTA", type: "pageCta", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Blog Page" }) },
});

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString", validation: required }),
    defineField({ name: "excerpt", title: "Excerpt", type: "localeText" }),
    defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title.en", media: "image", subtitle: "excerpt.en" } },
});

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: required }),
    defineField({ name: "image", title: "Logo", type: "imageWithAlt" }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Trademark partner", value: "partner" },
          { title: "Exclusive representation", value: "exclusive" },
        ],
        layout: "radio",
      },
      initialValue: "partner",
      validation: required,
    }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "kind", media: "image" } },
});

export const certificate = defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", validation: required }),
    defineField({ name: "title", title: "Title", type: "localeString", description: "Certificate name — shown on card hover." }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
      description: "Optional detail — shown on card hover.",
    }),
    defineField({ name: "image", title: "Image", type: "imageWithAlt", validation: required }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title.en", slug: "slug.current", media: "image" },
    prepare: ({ title, slug, media }) => ({
      title: title ?? slug ?? "Certificate",
      media,
    }),
  },
});

export const stat = defineType({
  name: "stat",
  title: "Statistic",
  type: "document",
  fields: [
    defineField({ name: "value", title: "Value", type: "number", validation: required }),
    defineField({ name: "label", title: "Label", type: "localeString" }),
    defineField({
      name: "labelKey",
      title: "Label key (fallback)",
      type: "string",
      description: "UI message key inside the home namespace (e.g. statClients). Used when Label is empty.",
    }),
    defineField({ name: "suffix", title: "Suffix", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { value: "value", labelKey: "labelKey", suffix: "suffix" },
    prepare: ({ value, labelKey, suffix }) => ({
      title: `${value}${suffix ?? ""}`,
      subtitle: labelKey,
    }),
  },
});

export const milestone = defineType({
  name: "milestone",
  title: "Milestone",
  type: "document",
  fields: [
    defineField({ name: "value", title: "Value", type: "number", validation: required }),
    defineField({ name: "label", title: "Label", type: "localeString" }),
    defineField({
      name: "labelKey",
      title: "Label key (fallback)",
      type: "string",
      description: "UI message key inside the about namespace (e.g. milestone1). Used when Label is empty.",
    }),
    defineField({ name: "suffix", title: "Suffix", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { value: "value", labelKey: "labelKey", suffix: "suffix" },
    prepare: ({ value, labelKey, suffix }) => ({
      title: `${value}${suffix ?? ""}`,
      subtitle: labelKey,
    }),
  },
});

export const founder = defineType({
  name: "founder",
  title: "Founder",
  type: "document",
  fields: [
    defineField({ name: "key", title: "Key", type: "string", validation: required }),
    defineField({ name: "image", title: "Photo", type: "imageWithAlt" }),
    defineField({ name: "name", title: "Name", type: "localeString" }),
    defineField({ name: "role", title: "Role", type: "localeString" }),
    defineField({ name: "bio", title: "Bio", type: "localeText" }),
    defineField({ name: "nameKey", title: "Name key (fallback)", type: "string", hidden: true }),
    defineField({ name: "roleKey", title: "Role key (fallback)", type: "string", hidden: true }),
    defineField({ name: "bioKey", title: "Bio key (fallback)", type: "string", hidden: true }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "key", media: "image" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: required }),
    defineField({ name: "role", title: "Role", type: "localeString" }),
    defineField({ name: "quote", title: "Quote", type: "localeText" }),
    defineField({ name: "image", title: "Photo", type: "imageWithAlt" }),
    defineField({
      name: "product",
      title: "Related product",
      type: "reference",
      to: [{ type: "product" }],
      description: "Optional product this testimonial refers to.",
    }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role.en" } },
});

export const newsItem = defineType({
  name: "newsItem",
  title: "News Item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString", validation: required }),
    defineField({ name: "date", title: "Display date", type: "string" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "localeText" }),
    defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title.en", subtitle: "date", media: "image" } },
});

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", validation: required }),
    defineField({ name: "client", title: "Client", type: "string", validation: required }),
    defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
    defineField({ name: "industry", title: "Industry", type: "localeString" }),
    defineField({ name: "scope", title: "Scope", type: "localeText" }),
    defineField({ name: "intro", title: "Introduction", type: "localeText" }),
    defineField({ name: "challenge", title: "Challenge", type: "localeText" }),
    defineField({ name: "approach", title: "Approach", type: "localeText" }),
    defineField({
      name: "highlights",
      title: "Key deliverables",
      type: "localeStringList",
    }),
    defineField({ name: "outcome", title: "Outcome", type: "localeText" }),
    defineField({ name: "statValue", title: "Stat value", type: "string" }),
    defineField({ name: "statLabel", title: "Stat label", type: "localeString" }),
    defineField({ name: "tags", title: "Tags", type: "localeStringList" }),
    defineField({
      name: "solutionGroup",
      title: "Related solution group",
      type: "reference",
      to: [{ type: "solutionGroup" }],
    }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "client", subtitle: "industry.en", media: "image" } },
});

export const eventItem = defineType({
  name: "eventItem",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "image", title: "Image", type: "imageWithAlt", validation: required }),
    defineField({ name: "title", title: "Title", type: "localeString", validation: required }),
    defineField({ name: "subtitle", title: "Subtitle", type: "localeString" }),
    defineField({ name: "date", title: "Display date", type: "string" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Poster", value: "poster" },
          { title: "Photo", value: "photo" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title.en", subtitle: "date", media: "image" } },
});

export const clientLogo = defineType({
  name: "clientLogo",
  title: "Client Logo",
  type: "document",
  fields: [
    defineField({ name: "image", title: "Logo", type: "imageWithAlt", validation: required }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { media: "image", title: "order" } },
});

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: required }),
    defineField({ name: "role", title: "Role", type: "localeString" }),
    defineField({ name: "image", title: "Photo", type: "imageWithAlt" }),
    defineField({ name: "bio", title: "Bio", type: "localeText" }),
  ],
  preview: { select: { title: "name", media: "image" } },
});

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", validation: required }),
    defineField({ name: "title", title: "Title", type: "localeString", validation: required }),
    defineField({ name: "excerpt", title: "Excerpt", type: "localeText" }),
    defineField({ name: "date", title: "Display date", type: "string" }),
    defineField({ name: "image", title: "Cover image", type: "imageWithAlt" }),
    defineField({ name: "category", title: "Category", type: "localeString" }),
    defineField({ name: "readTime", title: "Read time (minutes)", type: "number" }),
    defineField({
      name: "body",
      title: "Body paragraphs",
      type: "localeStringList",
      description: "One entry per paragraph, per language.",
    }),
    defineField({
      name: "authorRef",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title.en", subtitle: "date", media: "image" } },
});

export const productCategory = defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "page", title: "Category page" },
  ],
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", validation: required, group: "content" }),
    defineField({ name: "label", title: "Label", type: "localeString", validation: required, group: "content" }),
    defineField({ name: "description", title: "Description", type: "localeText", group: "content" }),
    defineField({ name: "image", title: "Category image", type: "imageWithAlt", group: "content" }),
    defineField({ name: "highlights", title: "Highlights", type: "localeStringList", group: "content" }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [{ type: "specItem" }],
      group: "content",
    }),
    defineField({
      name: "hero",
      title: "Category page hero",
      type: "pageHero",
      description: "Optional hero override when viewing this category on /products/category/[slug].",
      group: "page",
    }),
    defineField({ name: "order", title: "Order", type: "number", validation: required, group: "content" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label.en", subtitle: "slug.current" } },
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "details", title: "Detail page" },
  ],
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", validation: required, group: "content" }),
    defineField({ name: "title", title: "Title", type: "localeString", validation: required, group: "content" }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: required,
      group: "content",
    }),
    defineField({ name: "excerpt", title: "Excerpt", type: "localeText", group: "content" }),
    defineField({ name: "description", title: "Description", type: "localeText", group: "content" }),
    defineField({ name: "image", title: "Main image", type: "imageWithAlt", group: "media" }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      group: "media",
    }),
    defineField({
      name: "highlights",
      title: "Features (override)",
      type: "localeStringList",
      description: "Optional product-specific features. Falls back to category highlights when empty.",
      group: "details",
    }),
    defineField({
      name: "specs",
      title: "Specifications (override)",
      type: "array",
      of: [{ type: "specItem" }],
      description: "Optional product-specific specs. Falls back to category specs when empty.",
      group: "details",
    }),
    defineField({
      name: "solutionChild",
      title: "Related solution service",
      type: "reference",
      to: [{ type: "solutionChild" }],
      group: "details",
    }),
    defineField({ name: "order", title: "Order", type: "number", validation: required, group: "content" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title.en", subtitle: "slug.current", media: "image" } },
});

export const solutionGroup = defineType({
  name: "solutionGroup",
  title: "Solution Group",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "sections", title: "Sections" },
  ],
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", validation: required, group: "content" }),
    defineField({ name: "label", title: "Label", type: "localeString", validation: required, group: "content" }),
    defineField({ name: "menuLabel", title: "Menu label", type: "localeString", group: "content" }),
    defineField({ name: "heroTitle", title: "Hero title", type: "localeString", group: "content" }),
    defineField({ name: "servicesSectionTitle", title: "Services section title", type: "localeString", group: "content" }),
    defineField({ name: "servicesSectionIntro", title: "Services section intro", type: "localeText", group: "content" }),
    defineField({ name: "description", title: "Description", type: "localeText", group: "content" }),
    defineField({ name: "intro", title: "Intro", type: "localeText", group: "content" }),
    defineField({ name: "image", title: "Image", type: "imageWithAlt", group: "content" }),
    defineField({ name: "highlights", title: "Highlights", type: "localeStringList", group: "content" }),
    defineField({ name: "importanceTitle", title: "Importance section title", type: "localeString", group: "content" }),
    defineField({ name: "otherGroupsTitle", title: "Other groups section title", type: "localeString", group: "content" }),
    defineField({ name: "heroCtaLabel", title: "Hero CTA label", type: "localeString", group: "content" }),
    defineField({ name: "principles", title: "Principles section", type: "principlesSection", group: "sections" }),
    defineField({ name: "workflow", title: "Workflow section", type: "workflowSection", group: "sections" }),
    defineField({ name: "faq", title: "FAQ section", type: "faqSection", group: "sections" }),
    defineField({ name: "cta", title: "Bottom CTA", type: "pageCta", group: "sections" }),
    defineField({ name: "order", title: "Order", type: "number", validation: required, group: "content" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label.en", subtitle: "slug.current", media: "image" } },
});

export const solutionChild = defineType({
  name: "solutionChild",
  title: "Solution Service",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "page", title: "Detail page" },
  ],
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", validation: required, group: "content" }),
    defineField({
      name: "group",
      title: "Solution group",
      type: "reference",
      to: [{ type: "solutionGroup" }],
      validation: required,
      group: "content",
    }),
    defineField({ name: "label", title: "Label", type: "localeString", validation: required, group: "content" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "localeText", group: "content" }),
    defineField({ name: "intro", title: "Intro", type: "localeText", group: "content" }),
    defineField({ name: "image", title: "Image", type: "imageWithAlt", group: "content" }),
    defineField({
      name: "highlights",
      title: "Capabilities",
      type: "localeStringList",
      description: "Service-specific capability bullets (fallback layout).",
      group: "content",
    }),
    defineField({
      name: "labels",
      title: "Page labels",
      type: "solutionChildLabels",
      description: "Section headings for the fallback layout when Detail page is empty.",
      group: "content",
    }),
    defineField({ name: "order", title: "Order", type: "number", validation: required, group: "content" }),
    defineField({
      name: "page",
      title: "Detail page content",
      type: "object",
      group: "page",
      description: "Rich page content. Leave empty to use the group-level fallback layout.",
      fields: [
        defineField({ name: "heroTitle", title: "Hero title", type: "localeString" }),
        defineField({ name: "heroSubtitle", title: "Hero subtitle", type: "localeText" }),
        defineField({ name: "heroCtaLabel", title: "Hero CTA label", type: "localeString" }),
        defineField({ name: "overviewTitle", title: "Overview title", type: "localeString" }),
        defineField({ name: "overviewIntro", title: "Overview intro", type: "localeText" }),
        defineField({ name: "overviewItems", title: "Overview items", type: "localeStringList" }),
        defineField({ name: "relatedSectionTitle", title: "Related section title", type: "localeString" }),
        defineField({ name: "principles", title: "Principles section", type: "principlesSection" }),
        defineField({ name: "workflow", title: "Workflow section", type: "workflowSection" }),
        defineField({ name: "faq", title: "FAQ section", type: "faqSection" }),
      ],
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label.en", subtitle: "slug.current", media: "image" } },
});

export const seoEntry = defineType({
  name: "seoEntry",
  title: "SEO Entry",
  type: "document",
  fields: [
    defineField({
      name: "routeKey",
      title: "Page / template",
      type: "string",
      validation: required,
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "About Us", value: "about" },
          { title: "Contact", value: "contact" },
          { title: "Products index", value: "products" },
          { title: "Product detail (template)", value: "product" },
          { title: "Product category (template)", value: "product-category" },
          { title: "Solutions index", value: "solutions" },
          { title: "Solution group (template)", value: "solution-group" },
          { title: "Solution service (template)", value: "solution-child" },
          { title: "Blog index", value: "blog" },
          { title: "Blog post (template)", value: "blog-post" },
          { title: "Case study (template)", value: "case-study" },
        ],
      },
    }),
    defineField({
      name: "slug",
      title: "Slug override",
      type: "string",
      description: "Optional — restricts this entry to a single document slug (per-page override).",
    }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    select: { title: "routeKey", subtitle: "slug" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "SEO entry",
      subtitle: subtitle ? `Override: ${subtitle}` : "Template / page",
    }),
  },
});

export const uiMessages = defineType({
  name: "uiMessages",
  title: "UI Messages",
  type: "document",
  fields: [
    defineField({
      name: "namespace",
      title: "Namespace",
      type: "string",
      validation: required,
      description: "next-intl namespace (nav, footer, home, …).",
    }),
    defineField({
      name: "entries",
      title: "Messages",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "messageEntry",
          fields: [
            defineField({ name: "key", title: "Key", type: "string", validation: required }),
            defineField({ name: "value", title: "Value", type: "localeText" }),
          ],
          preview: { select: { title: "key", subtitle: "value.en" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "namespace" },
    prepare: ({ title }) => ({ title: `Messages — ${title}` }),
  },
});

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({ name: "source", title: "Source path", type: "string", validation: required }),
    defineField({ name: "destination", title: "Destination path", type: "string", validation: required }),
    defineField({ name: "permanent", title: "Permanent (308)", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "source", subtitle: "destination" } },
});

export const formSubmission = defineType({
  name: "formSubmission",
  title: "Form Submission",
  type: "document",
  groups: [
    { name: "contact", title: "Contact" },
    { name: "message", title: "Message" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Read", value: "read" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "source",
      title: "Form",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Contact page", value: "contact" },
          { title: "Quote form", value: "quote" },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      group: "meta",
      readOnly: true,
    }),
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      group: "meta",
      readOnly: true,
    }),
    defineField({ name: "name", title: "Name", type: "string", group: "contact", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact", readOnly: true }),
    defineField({ name: "phone", title: "Phone", type: "string", group: "contact", readOnly: true }),
    defineField({ name: "company", title: "Company", type: "string", group: "contact", readOnly: true }),
    defineField({
      name: "subject",
      title: "Subject key",
      type: "string",
      group: "message",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "subjectLabel",
      title: "Subject",
      type: "string",
      group: "message",
      readOnly: true,
    }),
    defineField({ name: "item", title: "Product / project", type: "string", group: "message", readOnly: true }),
    defineField({ name: "message", title: "Message", type: "text", group: "message", readOnly: true }),
  ],
  orderings: [
    {
      title: "Submitted (newest first)",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      email: "email",
      subjectLabel: "subjectLabel",
      source: "source",
      status: "status",
      submittedAt: "submittedAt",
    },
    prepare({ name, email, subjectLabel, source, status, submittedAt }) {
      const formLabel = source === "quote" ? "Quote" : "Contact";
      const date = submittedAt
        ? new Date(submittedAt).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      return {
        title: name ?? "Submission",
        subtitle: [subjectLabel, email, formLabel, status, date].filter(Boolean).join(" · "),
      };
    },
  },
});
