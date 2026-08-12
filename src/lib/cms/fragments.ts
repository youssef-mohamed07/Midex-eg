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

/** Helper for fetching uiMessages entry. */
export const uiMsg = (key: string) =>
  `coalesce(entries[key == "${key}"][0].value[$locale], entries[key == "${key}"][0].value.en)`;

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

export const productExplorerLabelsProjection = (namespace = "productExplorerLabels") => `*[_type == "uiMessages" && namespace == "${namespace}"][0]{
  "allCategories": ${uiMsg("allCategories")},
  "viewDetails": ${uiMsg("viewDetails")},
  "requestQuote": ${uiMsg("requestQuote")},
  "quoteShort": ${uiMsg("quoteShort")},
  "noResults": ${uiMsg("noResults")},
  "searchPlaceholder": ${uiMsg("searchPlaceholder")},
  "productsLabel": ${uiMsg("productsLabel")},
  "categoriesLabel": ${uiMsg("categoriesLabel")},
  "viewCategory": ${uiMsg("viewCategory")}
}`;

export const productDetailLabelsProjection = (namespace = "productDetailLabels") => `*[_type == "uiMessages" && namespace == "${namespace}"][0]{
  "overviewTitle": ${uiMsg("overviewTitle")},
  "featuresTitle": ${uiMsg("featuresTitle")},
  "specificationsTitle": ${uiMsg("specificationsTitle")},
  "applicationsTitle": ${uiMsg("applicationsTitle")},
  "relatedProductsTitle": ${uiMsg("relatedProductsTitle")},
  "backToCatalog": ${uiMsg("backToCatalog")},
  "requestQuote": ${uiMsg("requestQuote")},
  "relatedSolutionTitle": ${uiMsg("relatedSolutionTitle")},
  "contactUs": ${uiMsg("contactUs")},
  "galleryTitle": ${uiMsg("galleryTitle")},
  "galleryPrevious": ${uiMsg("galleryPrevious")},
  "galleryNext": ${uiMsg("galleryNext")},
  "galleryView": ${uiMsg("galleryView")}
}`;

export const caseStudiesExplorerLabelsProjection = (namespace = "caseStudiesExplorerLabels") => `*[_type == "uiMessages" && namespace == "${namespace}"][0]{
  "searchPlaceholder": ${uiMsg("searchPlaceholder")},
  "all": ${uiMsg("all")},
  "year": ${uiMsg("year")},
  "capability": ${uiMsg("capability")},
  "industry": ${uiMsg("industry")},
  "results": ${uiMsg("results")},
  "noResults": ${uiMsg("noResults")},
  "clearFilters": ${uiMsg("clearFilters")},
  "read": ${uiMsg("read")},
  "countLabel": ${uiMsg("countLabel")},
  "contactLabel": ${uiMsg("contactLabel")}
}`;

export const blogDetailLabelsProjection = (namespace = "blogDetailLabels") => `*[_type == "uiMessages" && namespace == "${namespace}"][0]{
  "blogLabel": ${uiMsg("blogLabel")},
  "minRead": ${uiMsg("minRead")},
  "authorLabel": ${uiMsg("authorLabel")},
  "relatedPosts": ${uiMsg("relatedPosts")},
  "backToBlog": ${uiMsg("backToBlog")},
  "contactCta": ${uiMsg("contactCta")}
}`;

export const solutionChildLabelsProjection = (namespace = "solutionChildLabels") => `*[_type == "uiMessages" && namespace == "${namespace}"][0]{
  "introductionTitle": ${uiMsg("introductionTitle")},
  "capabilitiesTitle": ${uiMsg("capabilitiesTitle")},
  "relatedServicesTitle": ${uiMsg("relatedServicesTitle")},
  "heroCtaLabel": ${uiMsg("heroCtaLabel")},
  "browseGroupLabel": ${uiMsg("browseGroupLabel")}
}`;

export const layoutChromeProjection = (namespace = "chrome") => `*[_type == "uiMessages" && namespace == "${namespace}"][0]{
  "home": ${uiMsg("home")},
  "products": ${uiMsg("products")},
  "solutions": ${uiMsg("solutions")},
  "blog": ${uiMsg("blog")},
  "caseStudies": ${uiMsg("caseStudies")},
  "aboutUs": ${uiMsg("aboutUs")},
  "contactUs": ${uiMsg("contactUs")},
  "allSolutions": ${uiMsg("allSolutions")},
  "allCategories": ${uiMsg("allCategories")},
  "menu": ${uiMsg("menu")},
  "close": ${uiMsg("close")},
  "capabilitiesTitle": ${uiMsg("capabilitiesTitle")},
  "capabilitiesSubtitle": ${uiMsg("capabilitiesSubtitle")},
  "servicesLabel": ${uiMsg("servicesLabel")},
  "footerTagline": ${uiMsg("footerTagline")},
  "footerServices": ${uiMsg("footerServices")},
  "footerUsefulLinks": ${uiMsg("footerUsefulLinks")},
  "footerContactUs": ${uiMsg("footerContactUs")},
  "footerRights": ${uiMsg("footerRights")},
  "footerAddressFallback": ${uiMsg("footerAddressFallback")},
  "socialOpen": ${uiMsg("socialOpen")},
  "socialClose": ${uiMsg("socialClose")},
  "socialLinkedIn": ${uiMsg("socialLinkedIn")},
  "socialFacebook": ${uiMsg("socialFacebook")},
  "socialYoutube": ${uiMsg("socialYoutube")},
  "socialWhatsapp": ${uiMsg("socialWhatsapp")},
  "socialEmail": ${uiMsg("socialEmail")},
  "socialTwitter": ${uiMsg("socialTwitter")},
  "langEn": ${uiMsg("langEn")},
  "langAr": ${uiMsg("langAr")},
  "langDe": ${uiMsg("langDe")},
  "language": ${uiMsg("language")}
}`;

export const contactFormCopyProjection = (namespace = "contactFormCopy") => `*[_type == "uiMessages" && namespace == "${namespace}"][0]{
  "title": ${uiMsg("title")},
  "intro": ${uiMsg("intro")},
  "quoteFor": ${uiMsg("quoteFor")},
  "fullName": ${uiMsg("fullName")},
  "emailLabel": ${uiMsg("emailLabel")},
  "phoneLabel": ${uiMsg("phoneLabel")},
  "company": ${uiMsg("company")},
  "subject": ${uiMsg("subject")},
  "productProject": ${uiMsg("productProject")},
  "productPlaceholder": ${uiMsg("productPlaceholder")},
  "message": ${uiMsg("message")},
  "messagePlaceholder": ${uiMsg("messagePlaceholder")},
  "submit": ${uiMsg("submit")},
  "subjectQuote": ${uiMsg("subjectQuote")},
  "subjectProduct": ${uiMsg("subjectProduct")},
  "subjectGeneral": ${uiMsg("subjectGeneral")},
  "success": ${uiMsg("success")},
  "error": ${uiMsg("error")},
  "validationName": ${uiMsg("validationName")},
  "validationEmail": ${uiMsg("validationEmail")},
  "validationMessage": ${uiMsg("validationMessage")}
}`;

export const quoteFormCopyProjection = (namespace = "quoteFormCopy") => `*[_type == "uiMessages" && namespace == "${namespace}"][0]{
  "badge": ${uiMsg("badge")},
  "step1": ${uiMsg("step1")},
  "step2": ${uiMsg("step2")},
  "step3": ${uiMsg("step3")},
  "step4": ${uiMsg("step4")},
  "step1Question": ${uiMsg("step1Question")},
  "step2Question": ${uiMsg("step2Question")},
  "step3Question": ${uiMsg("step3Question")},
  "step4Question": ${uiMsg("step4Question")},
  "step1Hint": ${uiMsg("step1Hint")},
  "step2Hint": ${uiMsg("step2Hint")},
  "step3Hint": ${uiMsg("step3Hint")},
  "step4Hint": ${uiMsg("step4Hint")},
  "projectTypes": coalesce(entries[key == "projectTypes"][0].value[$locale], entries[key == "projectTypes"][0].value.en, []),
  "industries": coalesce(entries[key == "industries"][0].value[$locale], entries[key == "industries"][0].value.en, []),
  "location": ${uiMsg("location")},
  "timeline": ${uiMsg("timeline")},
  "description": ${uiMsg("description")},
  "locationPlaceholder": ${uiMsg("locationPlaceholder")},
  "timelinePlaceholder": ${uiMsg("timelinePlaceholder")},
  "descriptionPlaceholder": ${uiMsg("descriptionPlaceholder")},
  "next": ${uiMsg("next")},
  "back": ${uiMsg("back")},
  "submit": ${uiMsg("submit")},
  "success": ${uiMsg("success")},
  "again": ${uiMsg("again")},
  "progress": ${uiMsg("progress")},
  "validationProjectType": ${uiMsg("validationProjectType")},
  "validationIndustry": ${uiMsg("validationIndustry")},
  "validationDescription": ${uiMsg("validationDescription")}
}`;

export const caseStudyLabelsProjection = (namespace = "caseStudyLabels") => `*[_type == "uiMessages" && namespace == "${namespace}"][0]{
  "scopeLabel": ${uiMsg("scopeLabel")},
  "challengeLabel": ${uiMsg("challengeLabel")},
  "approachLabel": ${uiMsg("approachLabel")},
  "highlightsLabel": ${uiMsg("highlightsLabel")},
  "outcomeLabel": ${uiMsg("outcomeLabel")},
  "discuss": ${uiMsg("discuss")},
  "related": ${uiMsg("related")},
  "back": ${uiMsg("back")},
  "galleryTitle": ${uiMsg("galleryTitle")}
}`;
