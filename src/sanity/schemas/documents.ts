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
  fields: [
    defineField({
      name: "heroCollageLeft",
      title: "Hero collage — left column",
      type: "array",
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
      description: "Image shown in the products mega-menu panel.",
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "standards",
      title: "Standards",
      type: "array",
      of: [{ type: "string" }],
      description: "Message keys of the standards shown in the standards strip (e.g. standard1).",
    }),
    defineField({
      name: "values",
      title: "Company values",
      type: "array",
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
    defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "slug.current", media: "image" } },
});

export const stat = defineType({
  name: "stat",
  title: "Statistic",
  type: "document",
  fields: [
    defineField({ name: "value", title: "Value", type: "number", validation: required }),
    defineField({
      name: "labelKey",
      title: "Label key",
      type: "string",
      validation: required,
      description: "UI message key inside the home namespace (e.g. statClients).",
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
    defineField({
      name: "labelKey",
      title: "Label key",
      type: "string",
      validation: required,
      description: "UI message key inside the about namespace (e.g. milestone1).",
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
    defineField({ name: "nameKey", title: "Name message key", type: "string", validation: required }),
    defineField({ name: "roleKey", title: "Role message key", type: "string", validation: required }),
    defineField({ name: "bioKey", title: "Bio message key", type: "string", validation: required }),
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
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", validation: required }),
    defineField({ name: "label", title: "Label", type: "localeString", validation: required }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "highlights", title: "Highlights", type: "localeStringList" }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [{ type: "specItem" }],
    }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label.en", subtitle: "slug.current" } },
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", validation: required }),
    defineField({ name: "title", title: "Title", type: "localeString", validation: required }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: required,
    }),
    defineField({ name: "excerpt", title: "Excerpt", type: "localeText" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "image", title: "Main image", type: "imageWithAlt" }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "solutionChild",
      title: "Related solution service",
      type: "reference",
      to: [{ type: "solutionChild" }],
    }),
    defineField({ name: "order", title: "Order", type: "number", validation: required }),
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
    defineField({ name: "principles", title: "Principles section", type: "principlesSection", group: "sections" }),
    defineField({ name: "workflow", title: "Workflow section", type: "workflowSection", group: "sections" }),
    defineField({ name: "faq", title: "FAQ section", type: "faqSection", group: "sections" }),
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
