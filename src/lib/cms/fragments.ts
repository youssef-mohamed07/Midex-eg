/** Shared GROQ projection fragments. */

/** Resolves an imageWithAlt field to a CDN URL (Next.js Image handles sizing/format). */
export const imageUrl = (field = "image") =>
  `coalesce(${field}.asset->url, ${field}.sourcePath, "")`;

/** Resolves a Sanity file field to a CDN URL. */
export const fileUrl = (field: string) =>
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
    "image": ${imageUrl("image")},
    "href": coalesce(href, "")
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
  "image": ${imageUrl("image")},
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
  "footnote": ${locOptional("footnote")},
  "image": ${imageUrl("image")},
  "viewAllLabel": ${locOptional("viewAllLabel")}
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
  "badge": ${locOptional("badge")},
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
  "searchPlaceholder": ${locOptional("searchPlaceholder")},
  "productsLabel": ${locOptional("productsLabel")},
  "categoriesLabel": ${locOptional("categoriesLabel")},
  "viewCategory": ${locOptional("viewCategory")}
}`;

export const productDetailLabelsProjection = (field: string) => `${field}{
  "overviewTitle": ${locOptional("overviewTitle")},
  "featuresTitle": ${locOptional("featuresTitle")},
  "specificationsTitle": ${locOptional("specificationsTitle")},
  "applicationsTitle": ${locOptional("applicationsTitle")},
  "relatedProductsTitle": ${locOptional("relatedProductsTitle")},
  "backToCatalog": ${locOptional("backToCatalog")},
  "requestQuote": ${locOptional("requestQuote")},
  "relatedSolutionTitle": ${locOptional("relatedSolutionTitle")},
  "contactUs": ${locOptional("contactUs")},
  "galleryTitle": ${locOptional("galleryTitle")},
  "galleryPrevious": ${locOptional("galleryPrevious")},
  "galleryNext": ${locOptional("galleryNext")},
  "galleryView": ${locOptional("galleryView")}
}`;

export const caseStudiesExplorerLabelsProjection = (field: string) => `${field}{
  "searchPlaceholder": ${locOptional("searchPlaceholder")},
  "all": ${locOptional("all")},
  "year": ${locOptional("year")},
  "capability": ${locOptional("capability")},
  "industry": ${locOptional("industry")},
  "results": ${locOptional("results")},
  "noResults": ${locOptional("noResults")},
  "clearFilters": ${locOptional("clearFilters")},
  "read": ${locOptional("read")},
  "countLabel": ${locOptional("countLabel")},
  "contactLabel": ${locOptional("contactLabel")}
}`;

export const blogDetailLabelsProjection = (field: string) => `${field}{
  "blogLabel": ${locOptional("blogLabel")},
  "minRead": ${locOptional("minRead")},
  "authorLabel": ${locOptional("authorLabel")},
  "relatedPosts": ${locOptional("relatedPosts")},
  "backToBlog": ${locOptional("backToBlog")},
  "contactCta": ${locOptional("contactCta")}
}`;

export const solutionChildLabelsProjection = (field: string) => `${field}{
  "introductionTitle": ${locOptional("introductionTitle")},
  "capabilitiesTitle": ${locOptional("capabilitiesTitle")},
  "relatedServicesTitle": ${locOptional("relatedServicesTitle")},
  "heroCtaLabel": ${locOptional("heroCtaLabel")},
  "browseGroupLabel": ${locOptional("browseGroupLabel")}
}`;

export const layoutChromeProjection = (field = "chrome") => `${field}{
  "home": ${locOptional("home")},
  "products": ${locOptional("products")},
  "solutions": ${locOptional("solutions")},
  "blog": ${locOptional("blog")},
  "caseStudies": ${locOptional("caseStudies")},
  "aboutUs": ${locOptional("aboutUs")},
  "contactUs": ${locOptional("contactUs")},
  "allSolutions": ${locOptional("allSolutions")},
  "allCategories": ${locOptional("allCategories")},
  "menu": ${locOptional("menu")},
  "close": ${locOptional("close")},
  "capabilitiesTitle": ${locOptional("capabilitiesTitle")},
  "capabilitiesSubtitle": ${locOptional("capabilitiesSubtitle")},
  "servicesLabel": ${locOptional("servicesLabel")},
  "footerTagline": ${locOptional("footerTagline")},
  "footerServices": ${locOptional("footerServices")},
  "footerUsefulLinks": ${locOptional("footerUsefulLinks")},
  "footerContactUs": ${locOptional("footerContactUs")},
  "footerRights": ${locOptional("footerRights")},
  "footerAddressFallback": ${locOptional("footerAddressFallback")},
  "socialOpen": ${locOptional("socialOpen")},
  "socialClose": ${locOptional("socialClose")},
  "socialLinkedIn": ${locOptional("socialLinkedIn")},
  "socialFacebook": ${locOptional("socialFacebook")},
  "socialYoutube": ${locOptional("socialYoutube")},
  "socialWhatsapp": ${locOptional("socialWhatsapp")},
  "socialEmail": ${locOptional("socialEmail")},
  "socialTwitter": ${locOptional("socialTwitter")},
  "langEn": ${locOptional("langEn")},
  "langAr": ${locOptional("langAr")},
  "langDe": ${locOptional("langDe")},
  "language": ${locOptional("language")}
}`;

export const contactFormCopyProjection = (field: string) => `${field}{
  "title": ${locOptional("title")},
  "intro": ${locOptional("intro")},
  "quoteFor": ${locOptional("quoteFor")},
  "fullName": ${locOptional("fullName")},
  "emailLabel": ${locOptional("emailLabel")},
  "phoneLabel": ${locOptional("phoneLabel")},
  "company": ${locOptional("company")},
  "subject": ${locOptional("subject")},
  "productProject": ${locOptional("productProject")},
  "productPlaceholder": ${locOptional("productPlaceholder")},
  "message": ${locOptional("message")},
  "messagePlaceholder": ${locOptional("messagePlaceholder")},
  "submit": ${locOptional("submit")},
  "subjectQuote": ${locOptional("subjectQuote")},
  "subjectProduct": ${locOptional("subjectProduct")},
  "subjectGeneral": ${locOptional("subjectGeneral")},
  "success": ${locOptional("success")},
  "error": ${locOptional("error")},
  "validationName": ${locOptional("validationName")},
  "validationEmail": ${locOptional("validationEmail")},
  "validationMessage": ${locOptional("validationMessage")}
}`;

export const quoteFormCopyProjection = (field: string) => `${field}{
  "badge": ${locOptional("badge")},
  "step1": ${locOptional("step1")},
  "step2": ${locOptional("step2")},
  "step3": ${locOptional("step3")},
  "step4": ${locOptional("step4")},
  "step1Question": ${locOptional("step1Question")},
  "step2Question": ${locOptional("step2Question")},
  "step3Question": ${locOptional("step3Question")},
  "step4Question": ${locOptional("step4Question")},
  "step1Hint": ${locOptional("step1Hint")},
  "step2Hint": ${locOptional("step2Hint")},
  "step3Hint": ${locOptional("step3Hint")},
  "step4Hint": ${locOptional("step4Hint")},
  "projectTypes": ${locList("projectTypes")},
  "industries": ${locList("industries")},
  "location": ${locOptional("location")},
  "timeline": ${locOptional("timeline")},
  "description": ${locOptional("description")},
  "locationPlaceholder": ${locOptional("locationPlaceholder")},
  "timelinePlaceholder": ${locOptional("timelinePlaceholder")},
  "descriptionPlaceholder": ${locOptional("descriptionPlaceholder")},
  "next": ${locOptional("next")},
  "back": ${locOptional("back")},
  "submit": ${locOptional("submit")},
  "success": ${locOptional("success")},
  "again": ${locOptional("again")},
  "progress": ${locOptional("progress")},
  "validationProjectType": ${locOptional("validationProjectType")},
  "validationIndustry": ${locOptional("validationIndustry")},
  "validationDescription": ${locOptional("validationDescription")}
}`;

export const caseStudyLabelsProjection = (field: string) => `${field}{
  "scopeLabel": ${locOptional("scopeLabel")},
  "challengeLabel": ${locOptional("challengeLabel")},
  "approachLabel": ${locOptional("approachLabel")},
  "highlightsLabel": ${locOptional("highlightsLabel")},
  "outcomeLabel": ${locOptional("outcomeLabel")},
  "discuss": ${locOptional("discuss")},
  "related": ${locOptional("related")},
  "back": ${locOptional("back")},
  "galleryTitle": ${locOptional("galleryTitle")}
}`;
