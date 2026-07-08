/** Shared GROQ projection fragments. */

/** Resolves an imageWithAlt field to a CDN URL (Next.js Image handles sizing/format). */
export const imageUrl = (field = "image") =>
  `coalesce(${field}.asset->url, ${field}.sourcePath, "")`;

/** Localized string/text with English fallback. */
export const loc = (field: string, fallback = '""') =>
  `coalesce(${field}[$locale], ${field}.en, ${fallback})`;

/** Localized string that may legitimately be absent. */
export const locOptional = (field: string) =>
  `coalesce(${field}[$locale], ${field}.en)`;

/** Localized string list with English fallback. */
export const locList = (field: string) =>
  `coalesce(${field}[$locale], ${field}.en, [])`;

/** Principles section projection. */
export const principlesProjection = (field = "principles") => `${field}{
  "title": ${loc("title")},
  "intro": ${loc("intro")},
  "items": items[]{
    "id": key,
    "title": ${loc("title")},
    "text": ${loc("text")},
    "image": ${imageUrl("image")}
  }
}`;

/** Workflow section projection. */
export const workflowProjection = (field = "workflow") => `${field}{
  "title": ${loc("title")},
  "intro": ${loc("intro")},
  "steps": steps[]{
    "id": key,
    "title": ${loc("title")},
    "text": ${loc("text")},
    "image": ${imageUrl("image")}
  }
}`;

/** FAQ section projection. */
export const faqProjection = (field = "faq") => `${field}{
  enabled,
  "title": ${loc("title")},
  "intro": ${loc("intro")},
  "items": items[]{
    "id": key,
    "question": ${loc("question")},
    "answer": ${loc("answer")}
  }
}`;

/** Engineering capabilities section (home). */
export const engineeringCapabilitiesProjection = (field: string) => `${field}{
  enabled,
  "eyebrow": ${locOptional("eyebrow")},
  "title": ${locOptional("title")},
  "subtitle": ${locOptional("subtitle")},
  "cards": coalesce(cards[]{
    slug,
    "title": ${locOptional("title")},
    "description": ${locOptional("description")},
    "items": ${locList("items")},
    href
  }, [])
}`;

/** Section header (title, subtitle, eyebrow, enabled). */
export const sectionHeaderProjection = (field: string) => `${field}{
  enabled,
  "eyebrow": ${locOptional("eyebrow")},
  "title": ${locOptional("title")},
  "subtitle": ${locOptional("subtitle")},
  "image": ${imageUrl("image")}
}`;

/** Page hero copy block. */
export const pageHeroProjection = (field: string) => `${field}{
  "eyebrow": ${locOptional("eyebrow")},
  "title": ${locOptional("title")},
  "subtitle": ${locOptional("subtitle")},
  "badge": ${locOptional("badge")},
  "primaryCta": ${locOptional("primaryCta")},
  "primaryCtaHref": coalesce(primaryCtaHref, ""),
  "secondaryCta": ${locOptional("secondaryCta")},
  "secondaryCtaHref": coalesce(secondaryCtaHref, ""),
  "image": ${imageUrl("image")}
}`;

/** Home hero slide copy. */
export const homeHeroCopyProjection = (field = "heroCopy") => `${field}{
  "slide1Title": ${locOptional("slide1Title")},
  "slide1Text": ${locOptional("slide1Text")},
  "requestQuote": ${locOptional("requestQuote")},
  "viewProducts": ${locOptional("viewProducts")},
  "viewProductsHref": coalesce(viewProductsHref, "/products"),
  "seeSolutions": ${locOptional("seeSolutions")}
}`;

/** Featured quote block. */
export const quoteBlockProjection = (field: string) => `${field}{
  enabled,
  "quote": ${locOptional("quote")},
  "name": ${locOptional("name")},
  "role": ${locOptional("role")},
  "image": ${imageUrl("image")}
}`;

/** Promo section (Truvia-style). */
export const promoSectionProjection = (field: string) => `${field}{
  enabled,
  "eyebrow": ${locOptional("eyebrow")},
  "title": ${locOptional("title")},
  "body": ${locOptional("body")},
  "ctaLabel": ${locOptional("ctaLabel")},
  "ctaHref": coalesce(ctaHref, ""),
  "image": ${imageUrl("image")},
  "secondaryImage": ${imageUrl("secondaryImage")},
  "features": coalesce(features[]{
    "title": ${loc("title")},
    "text": ${loc("text")}
  }, [])
}`;

/** Before / after section. */
export const beforeAfterProjection = (field: string) => `${field}{
  enabled,
  "title": ${locOptional("title")},
  "subtitle": ${locOptional("subtitle")},
  "beforeTitle": ${locOptional("beforeTitle")},
  "afterTitle": ${locOptional("afterTitle")},
  "beforeItems": ${locList("beforeItems")},
  "afterItems": ${locList("afterItems")},
  "beforeImage": ${imageUrl("beforeImage")},
  "afterImage": ${imageUrl("afterImage")}
}`;

/** Mission & vision block. */
export const missionVisionProjection = (field: string) => `${field}{
  "title": ${locOptional("title")},
  "visionLabel": ${locOptional("visionLabel")},
  "visionText": ${locOptional("visionText")},
  "missionLabel": ${locOptional("missionLabel")},
  "missionText": ${locOptional("missionText")},
  "visionImage": ${imageUrl("visionImage")},
  "missionImage": ${imageUrl("missionImage")}
}`;

/** Page bottom CTA band. */
export const pageCtaProjection = (field: string) => `${field}{
  enabled,
  "title": ${locOptional("title")},
  "text": ${locOptional("text")},
  "primaryCta": ${locOptional("primaryCta")},
  "primaryCtaHref": coalesce(primaryCtaHref, ""),
  "secondaryCta": ${locOptional("secondaryCta")},
  "secondaryCtaHref": coalesce(secondaryCtaHref, ""),
  "image": ${imageUrl("image")}
}`;

/** Timeline section with step images. */
export const timelineSectionProjection = (field: string) => `${field}{
  enabled,
  "title": ${locOptional("title")},
  "subtitle": ${locOptional("subtitle")},
  "steps": coalesce(steps[]{
    key,
    "title": ${locOptional("title")},
    "text": ${locOptional("text")},
    "image": ${imageUrl("image")}
  }, [])
}`;

export const productExplorerLabelsProjection = (field: string) => `${field}{
  "allCategories": ${locOptional("allCategories")},
  "viewDetails": ${locOptional("viewDetails")},
  "requestQuote": ${locOptional("requestQuote")},
  "quoteShort": ${locOptional("quoteShort")},
  "noResults": ${locOptional("noResults")},
  "searchPlaceholder": ${locOptional("searchPlaceholder")}
}`;

export const productDetailLabelsProjection = (field: string) => `${field}{
  "overviewTitle": ${locOptional("overviewTitle")},
  "featuresTitle": ${locOptional("featuresTitle")},
  "specificationsTitle": ${locOptional("specificationsTitle")},
  "applicationsTitle": ${locOptional("applicationsTitle")},
  "relatedProductsTitle": ${locOptional("relatedProductsTitle")},
  "backToCatalog": ${locOptional("backToCatalog")},
  "requestQuote": ${locOptional("requestQuote")},
  "relatedSolutionTitle": ${locOptional("relatedSolutionTitle")}
}`;

export const solutionChildLabelsProjection = (field: string) => `${field}{
  "introductionTitle": ${locOptional("introductionTitle")},
  "capabilitiesTitle": ${locOptional("capabilitiesTitle")},
  "relatedServicesTitle": ${locOptional("relatedServicesTitle")},
  "heroCtaLabel": ${locOptional("heroCtaLabel")},
  "browseGroupLabel": ${locOptional("browseGroupLabel")}
}`;
