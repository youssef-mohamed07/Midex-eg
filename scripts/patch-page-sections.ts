/**
 * Seeds page section copy into Sanity singletons from messages/*.json.
 * Merges fields (does not wipe media / unrelated data).
 * Run: npm run patch:page-sections
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "7vhvbsex";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

type Messages = Record<string, Record<string, string>>;
const en = JSON.parse(readFileSync(path.join(process.cwd(), "messages/en.json"), "utf8")) as Messages;
const ar = JSON.parse(readFileSync(path.join(process.cwd(), "messages/ar.json"), "utf8")) as Messages;
const de = JSON.parse(readFileSync(path.join(process.cwd(), "messages/de.json"), "utf8")) as Messages;

type LocalizedValue = { _type: string; en?: string; ar?: string; de?: string };
type LocalizedList = { _type: string; en?: string[]; ar?: string[]; de?: string[] };

function L(ns: string, key: string): LocalizedValue {
  return {
    _type: "localeString",
    en: en[ns]?.[key],
    ar: ar[ns]?.[key],
    de: de[ns]?.[key],
  };
}

function LT(ns: string, key: string): LocalizedValue {
  return { ...L(ns, key), _type: "localeText" };
}

function LS(values: { en: string; ar: string; de: string }): LocalizedValue {
  return { _type: "localeString", ...values };
}

function LL(ns: string, keys: string[]): LocalizedList {
  return {
    _type: "localeStringList",
    en: keys.map((k) => en[ns]?.[k] ?? ""),
    ar: keys.map((k) => ar[ns]?.[k] ?? ""),
    de: keys.map((k) => de[ns]?.[k] ?? ""),
  };
}

function sectionHeader(
  ns: string,
  titleKey: string,
  subtitleKey?: string,
  extras?: Record<string, unknown>,
) {
  return {
    _type: "sectionHeader",
    enabled: true,
    title: L(ns, titleKey),
    ...(subtitleKey ? { subtitle: LT(ns, subtitleKey) } : {}),
    ...extras,
  };
}

function buildFaq(ns: string, count: number) {
  const items = Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return {
      _type: "faqEntry",
      _key: `faq${n}`,
      key: `faq${n}`,
      question: LT(ns, `faqQ${n}`),
      answer: LT(ns, `faqA${n}`),
    };
  });

  return {
    _type: "faqSection",
    title: L(ns, "faqTitle"),
    intro: LT(ns, "faqSubtitle"),
    items,
  };
}

function pageCta(ns: string, titleKey: string, textKey: string, ctaKey: string, href: string) {
  return {
    _type: "pageCta",
    title: L(ns, titleKey),
    text: LT(ns, textKey),
    primaryCta: L(ns, ctaKey),
    primaryCtaHref: href,
  };
}

function flattenForSetIfMissing(
  value: Record<string, unknown>,
  prefix = "",
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (entry === undefined) continue;
    const pathKey = prefix ? `${prefix}.${key}` : key;
    if (
      entry &&
      typeof entry === "object" &&
      !Array.isArray(entry)
    ) {
      Object.assign(
        result,
        flattenForSetIfMissing(entry as Record<string, unknown>, pathKey),
      );
    } else {
      result[pathKey] = entry;
    }
  }
  return result;
}

/** Seed only missing paths — never overwrites editor changes or existing media. */
async function mergeSingleton(id: string, type: string, doc: Record<string, unknown>) {
  await client
    .transaction()
    .createIfNotExists({ _id: id, _type: type })
    .patch(id, (p) => p.setIfMissing(flattenForSetIfMissing(doc)))
    .commit();
  console.log(`✓ ${type}`);
}

function buildQuoteFormCopy() {
  return {
    _type: "quoteFormCopy",
    badge: L("home", "quoteFormBadge"),
    step1: L("home", "quoteFormStep1"),
    step2: L("home", "quoteFormStep2"),
    step3: L("home", "quoteFormStep3"),
    step4: L("home", "quoteFormStep4"),
    step1Question: L("home", "quoteFormStep1Question"),
    step2Question: L("home", "quoteFormStep2Question"),
    step3Question: L("home", "quoteFormStep3Question"),
    step4Question: L("home", "quoteFormStep4Question"),
    step1Hint: LT("home", "quoteFormStep1Hint"),
    step2Hint: LT("home", "quoteFormStep2Hint"),
    step3Hint: LT("home", "quoteFormStep3Hint"),
    step4Hint: LT("home", "quoteFormStep4Hint"),
    projectTypes: LL("home", [
      "quoteFormProjectTypeModification",
      "quoteFormProjectTypeWelding",
      "quoteFormProjectTypeSystem",
      "quoteFormProjectTypePiping",
      "quoteFormProjectTypeSourcing",
      "quoteFormProjectTypeOther",
    ]),
    industries: LL("home", [
      "quoteFormIndustryPharma",
      "quoteFormIndustryFood",
      "quoteFormIndustryBiotech",
      "quoteFormIndustryCosmetics",
      "quoteFormIndustryOther",
    ]),
    location: L("home", "quoteFormLocation"),
    timeline: L("home", "quoteFormTimeline"),
    description: L("home", "quoteFormDescription"),
    locationPlaceholder: L("home", "quoteFormLocationPlaceholder"),
    timelinePlaceholder: L("home", "quoteFormTimelinePlaceholder"),
    descriptionPlaceholder: LT("home", "quoteFormDescriptionPlaceholder"),
    next: L("home", "quoteFormNext"),
    back: L("home", "quoteFormBack"),
    submit: L("home", "quoteFormSubmit"),
    success: LT("home", "quoteFormSuccess"),
    again: L("home", "quoteFormAgain"),
    progress: L("home", "quoteFormProgress"),
    validationProjectType: L("home", "quoteFormValidationProjectType"),
    validationIndustry: L("home", "quoteFormValidationIndustry"),
    validationDescription: L("home", "quoteFormValidationDescription"),
  };
}

function buildContactFormCopy() {
  return {
    _type: "contactFormCopy",
    title: L("contact", "sendMessage"),
    intro: LT("contact", "formIntro"),
    quoteFor: L("contact", "quoteFor"),
    fullName: L("contact", "fullName"),
    emailLabel: L("contact", "emailLabel"),
    phoneLabel: L("contact", "phoneLabel"),
    company: L("contact", "company"),
    subject: L("contact", "subject"),
    productProject: L("contact", "productProject"),
    productPlaceholder: L("contact", "productPlaceholder"),
    message: L("contact", "message"),
    messagePlaceholder: LT("contact", "messagePlaceholder"),
    submit: L("contact", "submit"),
    subjectQuote: L("contact", "subjectQuote"),
    subjectProduct: L("contact", "subjectProduct"),
    subjectGeneral: L("contact", "subjectGeneral"),
    success: LT("contact", "success"),
    error: LT("contact", "error"),
    validationName: L("contact", "validationName"),
    validationEmail: L("contact", "validationEmail"),
    validationMessage: L("contact", "validationMessage"),
  };
}

function buildLayoutChrome() {
  return {
    _type: "layoutChrome",
    home: LS({ en: "Home", ar: "الرئيسية", de: "Startseite" }),
    products: L("nav", "products"),
    solutions: L("nav", "solutions"),
    blog: L("nav", "blog"),
    aboutUs: L("nav", "aboutUs"),
    contactUs: L("nav", "contactUs"),
    allSolutions: L("nav", "allSolutions"),
    allCategories: L("products", "allCategories"),
    menu: L("nav", "menu"),
    close: L("nav", "close"),
    capabilitiesTitle: L("home", "capabilitiesTitle"),
    capabilitiesSubtitle: LT("home", "capabilitiesSubtitle"),
    servicesLabel: L("footer", "services"),
    footerTagline: LT("footer", "tagline"),
    footerServices: L("footer", "services"),
    footerUsefulLinks: L("footer", "usefulLinks"),
    footerContactUs: L("footer", "contactUs"),
    footerRights: L("footer", "rights"),
    footerAddressFallback: LT("footer", "address"),
    socialOpen: L("socialFab", "open"),
    socialClose: L("socialFab", "close"),
    socialLinkedIn: L("socialFab", "linkedIn"),
    socialWhatsapp: L("socialFab", "whatsapp"),
    socialEmail: L("socialFab", "email"),
    socialTwitter: L("socialFab", "twitter"),
    langEn: L("common", "langEn"),
    langAr: L("common", "langAr"),
    langDe: L("common", "langDe"),
    language: L("common", "language"),
  };
}

async function main() {
  await mergeSingleton("siteSettings", "siteSettings", {
    chrome: buildLayoutChrome(),
  });

  await mergeSingleton("homePage", "homePage", {
    heroCopy: {
      _type: "homeHeroCopy",
      slide1Title: L("hero", "slide1Title"),
      slide1Text: LT("hero", "slide1Text"),
      requestQuote: L("hero", "requestQuote"),
      viewProducts: L("hero", "viewProducts"),
      viewProductsHref: "/products",
      seeSolutions: L("hero", "seeSolutions"),
    },
    partnersSection: sectionHeader("home", "partnersTitle"),
    featuredQuote: {
      _type: "quoteBlock",
      enabled: true,
      quote: LT("home", "featuredQuoteText"),
      name: L("home", "featuredQuoteName"),
      role: L("home", "featuredQuoteRole"),
    },
    capabilitiesSection: sectionHeader("home", "capabilitiesTitle", "capabilitiesSubtitle"),
    eventsSection: sectionHeader("home", "ourEvents", "eventsSubtitle"),
    productsSection: sectionHeader("products", "title", "subtitle"),
    truviaSection: {
      _type: "promoSection",
      enabled: true,
      title: L("home", "truviaTitle"),
      body: LT("home", "truviaSubtitle"),
      ctaLabel: L("home", "truviaDiscover"),
      ctaHref: "/products/category/piping-and-fitting",
      features: [1, 2, 3, 4].map((n) => ({
        _type: "promoFeature",
        _key: `feature${n}`,
        title: L("home", `truviaFeature${n}Title`),
        text: LT("home", `truviaFeature${n}Text`),
      })),
    },
    beforeAfterSection: {
      _type: "beforeAfterContent",
      enabled: true,
      title: L("home", "processPerformanceTitle"),
      subtitle: LT("home", "beforeAfterTitle"),
      beforeItems: LL("home", [
        "processDuring1",
        "processDuring2",
        "processDuring3",
        "processDuring4",
        "processDuring5",
      ]),
      afterItems: LL("home", [
        "processAfter1",
        "processAfter2",
        "processAfter3",
        "processAfter4",
        "processAfter5",
      ]),
    },
    statsSection: sectionHeader("home", "statsTitle", "statsSubtitle"),
    caseStudiesSection: sectionHeader("home", "caseStudiesTitle", "caseStudiesSubtitle"),
    caseStudyLabels: {
      _type: "caseStudyLabels",
      scopeLabel: L("home", "caseStudyScopeLabel"),
      challengeLabel: L("home", "caseStudyChallengeLabel"),
      approachLabel: L("home", "caseStudyApproachLabel"),
      highlightsLabel: L("home", "caseStudyHighlightsLabel"),
      outcomeLabel: L("home", "caseStudyOutcomeLabel"),
      discuss: L("home", "caseStudyDiscuss"),
      related: L("home", "caseStudyRelated"),
      back: L("home", "caseStudyBack"),
      galleryTitle: L("home", "caseStudyGalleryTitle"),
    },
    testimonialsSection: sectionHeader("home", "testimonialsTitle", "testimonialsSubtitle"),
    exclusiveSection: sectionHeader("home", "exclusiveTitle"),
    servicesSection: sectionHeader("home", "servicesTitle", "servicesSubtitle"),
    newsSection: sectionHeader("home", "newProducts", "newProductsSubtitle", {
      viewAllLabel: L("home", "viewAllArticles"),
    }),
    clientLogosSection: sectionHeader("home", "clientsTitle"),
    quoteFormSection: sectionHeader("home", "quoteFormTitle", "quoteFormSubtitle"),
    quoteFormCopy: buildQuoteFormCopy(),
    faq: buildFaq("home", 6),
    quoteCta: {
      ...pageCta("home", "quoteTitle", "quoteText", "quoteButton", "/contact"),
      secondaryCta: L("hero", "viewProducts"),
      secondaryCtaHref: "/products",
    },
    sectionOrder: [
      "partners",
      "featuredQuote",
      "capabilities",
      "exclusive",
      "truvia",
      "stats",
      "events",
      "beforeAfter",
      "products",
      "caseStudies",
      "testimonials",
      "services",
      "news",
      "clientLogos",
      "quoteForm",
      "faq",
      "quoteCta",
    ],
  });

  await mergeSingleton("aboutPage", "aboutPage", {
    hero: {
      _type: "pageHero",
      eyebrow: L("about", "heroEyebrow"),
      title: L("about", "title"),
      subtitle: LT("about", "intro"),
      primaryCta: L("about", "exploreSolutions"),
      primaryCtaHref: "/solutions",
      secondaryCta: L("products", "requestQuote"),
      secondaryCtaHref: "/contact",
    },
    heroMetrics: {
      _type: "heroMetricsBlock",
      primaryValue: L("about", "heroYears"),
      primaryLabel: L("about", "heroYearsLabel"),
      badge: L("about", "heroFocusLabel"),
    },
    missionVision: {
      _type: "missionVisionBlock",
      title: L("about", "missionVisionTitle"),
      visionLabel: L("about", "visionLabel"),
      visionText: LT("about", "visionText"),
      missionLabel: L("about", "missionLabel"),
      missionText: LT("about", "missionText"),
    },
    milestonesSection: sectionHeader("about", "milestonesTitle", "milestonesSubtitle"),
    foundersSection: sectionHeader("about", "foundersTitle"),
    standardsSection: {
      eyebrow: L("about", "standardsEyebrow"),
      title: L("about", "standardsTitle"),
      subtitle: LT("about", "standardsSubtitle"),
      footnote: LT("about", "standardsText"),
      items: ["standard1", "standard2", "standard3", "standard4", "standard5"].map((key) => ({
        _type: "standardItem",
        _key: key,
        key,
        text: L("about", key),
      })),
    },
    eventsSection: sectionHeader("about", "eventsTitle", "eventsIntro"),
    certificationsSection: sectionHeader(
      "about",
      "certificationsTitle",
      "certificationsSubtitle",
      {
        eyebrow: L("about", "certificationsEyebrow"),
        footnote: LT("about", "certificationsFootnote"),
      },
    ),
    valuesSection: {
      title: L("about", "valuesTitle"),
      subtitle: LT("about", "valuesSubtitle"),
      items: [1, 2, 3, 4, 5, 6].map((n) => ({
        _type: "companyValueItem",
        _key: `value${n}`,
        key: `value${n}`,
        title: L("about", `value${n}Title`),
        text: LT("about", `value${n}Text`),
      })),
    },
    faq: buildFaq("about", 5),
    cta: {
      ...pageCta("about", "ctaTitle", "ctaText", "contactUs", "/contact"),
      secondaryCta: L("products", "requestQuote"),
      secondaryCtaHref: "/contact",
    },
  });

  await mergeSingleton("contactPage", "contactPage", {
    hero: {
      _type: "pageHero",
      eyebrow: L("contact", "heroEyebrow"),
      title: L("contact", "title"),
      subtitle: LT("contact", "intro"),
      badge: L("contact", "heroResponse"),
      primaryCta: L("contact", "heroSendMessage"),
      primaryCtaHref: "#contact-form",
    },
    aside: {
      intro: LT("contact", "asideIntro"),
    },
    form: {
      title: L("contact", "sendMessage"),
      intro: LT("contact", "formIntro"),
      copy: buildContactFormCopy(),
    },
    map: {
      title: L("contact", "mapTitle"),
      subtitle: LT("contact", "mapSubtitle"),
    },
  });

  await mergeSingleton("productsPage", "productsPage", {
    hero: {
      _type: "pageHero",
      title: L("products", "title"),
      subtitle: LT("products", "subtitle"),
    },
    catalogSection: sectionHeader("products", "catalogHeading", "catalogSubtitle"),
    explorerLabels: {
      _type: "productExplorerLabels",
      allCategories: L("products", "allCategories"),
      viewDetails: L("products", "viewDetails"),
      requestQuote: L("products", "requestQuote"),
      quoteShort: L("products", "quoteShort"),
      noResults: L("products", "noProducts"),
      searchPlaceholder: LS({
        en: "Search products…",
        ar: "ابحث في المنتجات…",
        de: "Produkte suchen…",
      }),
      productsLabel: L("products", "productsLabel"),
      categoriesLabel: L("products", "categoriesLabel"),
      viewCategory: L("products", "viewCategory"),
    },
    detailLabels: {
      _type: "productDetailLabels",
      overviewTitle: L("products", "overview"),
      featuresTitle: L("products", "featuresTitle"),
      specificationsTitle: L("products", "specificationsTitle"),
      applicationsTitle: L("products", "applicationsTitle"),
      relatedProductsTitle: L("products", "relatedProductsTitle"),
      backToCatalog: L("products", "backToCatalog"),
      requestQuote: L("products", "requestQuote"),
      relatedSolutionTitle: L("products", "relatedSolutionTitle"),
      contactUs: L("nav", "contactUs"),
      galleryTitle: L("products", "galleryTitle"),
      galleryPrevious: L("products", "galleryPrevious"),
      galleryNext: L("products", "galleryNext"),
      galleryView: L("products", "galleryView"),
    },
    detailCta: pageCta("products", "ctaTitle", "ctaText", "requestQuote", "/contact"),
    statsSection: sectionHeader("home", "statsTitle", "statsSubtitle"),
    caseStudiesSection: sectionHeader("home", "caseStudiesTitle", "caseStudiesSubtitle"),
    faq: buildFaq("home", 6),
    cta: pageCta("products", "ctaTitle", "ctaText", "requestQuote", "/contact"),
  });

  await mergeSingleton("solutionsPage", "solutionsPage", {
    hero: {
      _type: "pageHero",
      title: L("solutions", "heroTitle"),
      subtitle: LT("solutions", "heroSubtitle"),
    },
    capabilitiesSection: sectionHeader("home", "capabilitiesTitle", "capabilitiesSubtitle"),
    beforeAfterSection: {
      _type: "beforeAfterContent",
      enabled: true,
      title: L("home", "processPerformanceTitle"),
      subtitle: LT("home", "beforeAfterTitle"),
      beforeItems: LL("home", [
        "processDuring1",
        "processDuring2",
        "processDuring3",
        "processDuring4",
        "processDuring5",
      ]),
      afterItems: LL("home", [
        "processAfter1",
        "processAfter2",
        "processAfter3",
        "processAfter4",
        "processAfter5",
      ]),
    },
    timelineSection: {
      _type: "timelineSectionBlock",
      enabled: true,
      title: L("solutions", "stepsGridTitle"),
      subtitle: LT("solutions", "stepsGridSubtitle"),
      steps: [1, 2, 3, 4, 5].map((n) => ({
        _type: "timelineStep",
        _key: `step${n}`,
        key: `step${n}`,
        title: L("solutions", `step${n}Title`),
        text: LT("solutions", `step${n}Text`),
      })),
    },
    statsSection: sectionHeader("home", "statsTitle", "statsSubtitle"),
    caseStudiesSection: sectionHeader("home", "caseStudiesTitle", "caseStudiesSubtitle"),
    testimonialsSection: sectionHeader("home", "testimonialsTitle", "testimonialsSubtitle"),
    faq: buildFaq("home", 6),
    cta: pageCta("solutions", "ctaTitle", "ctaText", "contactUs", "/contact"),
  });

  await mergeSingleton("blogPage", "blogPage", {
    hero: {
      _type: "pageHero",
      eyebrow: L("blog", "heroEyebrow"),
      title: L("blog", "title"),
      subtitle: LT("blog", "subtitle"),
    },
    listing: {
      featuredLabel: L("blog", "featured"),
      latestLabel: L("blog", "latestPosts"),
      readPost: L("blog", "readPost"),
      postsLabel: L("blog", "postsLabel"),
      minRead: L("blog", "minRead"),
      viewAllArticles: L("home", "viewAllArticles"),
    },
    detailLabels: {
      _type: "blogDetailLabels",
      blogLabel: L("blog", "title"),
      minRead: L("blog", "minRead"),
      authorLabel: L("blog", "authorLabel"),
      relatedPosts: L("blog", "relatedPosts"),
      backToBlog: L("blog", "backToBlog"),
      contactCta: L("blog", "ctaButton"),
    },
    cta: pageCta("blog", "ctaTitle", "ctaText", "ctaButton", "/contact"),
  });

  await mergeSingleton("caseStudiesPage", "caseStudiesPage", {
    hero: {
      _type: "pageHero",
      eyebrow: L("home", "caseStudiesBadge"),
      title: L("home", "caseStudiesTitle"),
      subtitle: LT("home", "caseStudiesSubtitle"),
    },
    explorerLabels: {
      _type: "caseStudiesExplorerLabels",
      searchPlaceholder: L("home", "caseStudiesSearchPlaceholder"),
      all: L("home", "caseStudiesFilterAll"),
      year: L("home", "caseStudiesFilterYear"),
      capability: L("home", "caseStudiesFilterCapability"),
      industry: L("home", "caseStudiesFilterIndustry"),
      results: L("home", "caseStudiesResults"),
      noResults: LT("home", "caseStudiesNoResults"),
      clearFilters: L("home", "caseStudiesClearFilters"),
      read: L("home", "caseStudiesRead"),
      countLabel: L("home", "caseStudiesBadge"),
      contactLabel: L("home", "faqContact"),
    },
    testimonialsSection: sectionHeader("home", "testimonialsTitle", "testimonialsSubtitle"),
    quoteFormSection: sectionHeader("home", "quoteFormTitle", "quoteFormSubtitle"),
    quoteFormCopy: buildQuoteFormCopy(),
    faq: buildFaq("home", 6),
    detailLabels: {
      _type: "caseStudyLabels",
      scopeLabel: L("home", "caseStudyScopeLabel"),
      challengeLabel: L("home", "caseStudyChallengeLabel"),
      approachLabel: L("home", "caseStudyApproachLabel"),
      highlightsLabel: L("home", "caseStudyHighlightsLabel"),
      outcomeLabel: L("home", "caseStudyOutcomeLabel"),
      discuss: L("home", "caseStudyDiscuss"),
      related: L("home", "caseStudyRelated"),
      back: L("home", "caseStudyBack"),
      galleryTitle: L("home", "caseStudyGalleryTitle"),
    },
    cta: pageCta("home", "quoteTitle", "quoteText", "quoteButton", "/contact"),
  });

  const stats = await client.fetch<Array<{ _id: string; labelKey: string }>>(
    `*[_type == "stat"] | order(order asc) { _id, labelKey }`,
  );
  for (const stat of stats) {
    const key = stat.labelKey;
    if (!en.home?.[key]) continue;
    await client.patch(stat._id).set({ label: L("home", key) }).commit();
    console.log(`✓ stat label: ${key}`);
  }

  const milestones = await client.fetch<Array<{ _id: string; labelKey: string }>>(
    `*[_type == "milestone"] | order(order asc) { _id, labelKey }`,
  );
  for (const milestone of milestones) {
    const key = milestone.labelKey;
    if (!en.about?.[key]) continue;
    await client.patch(milestone._id).set({ label: L("about", key) }).commit();
    console.log(`✓ milestone label: ${key}`);
  }

  const founderKeys = [
    { key: "founder1", name: "founder1Name", role: "founder1Role", bio: "founder1Bio" },
    { key: "founder2", name: "founder2Name", role: "founder2Role", bio: "founder2Bio" },
  ];
  const founders = await client.fetch<Array<{ _id: string; key: string }>>(
    `*[_type == "founder"] | order(order asc) { _id, key }`,
  );
  for (const founder of founders) {
    const copy = founderKeys.find((row) => row.key === founder.key);
    if (!copy) continue;
    await client
      .patch(founder._id)
      .set({
        name: L("about", copy.name),
        role: L("about", copy.role),
        bio: LT("about", copy.bio),
      })
      .commit();
    console.log(`✓ founder: ${founder.key}`);
  }

  // Service page fallback labels on each solutionChild
  const children = await client.fetch<
    Array<{
      _id: string;
      label?: LocalizedValue;
      excerpt?: LocalizedValue;
      pageHeroCtaLabel?: LocalizedValue;
      hasPage: boolean;
    }>
  >(`*[_type == "solutionChild"]{
    _id,
    label,
    excerpt,
    "hasPage": defined(page),
    "pageHeroCtaLabel": page.heroCtaLabel
  }`);
  const serviceLabels = {
    _type: "solutionChildLabels",
    introductionTitle: L("solutions", "introduction"),
    capabilitiesTitle: L("solutions", "capabilities"),
    relatedServicesTitle: L("solutions", "relatedServices"),
    heroCtaLabel: L("solutions", "contactUs"),
    browseGroupLabel: L("solutions", "browseGroup"),
  };
  for (const child of children) {
    const patch = client.patch(child._id).setIfMissing({ labels: serviceLabels });
    if (child.hasPage) {
      patch.setIfMissing({
          "page.cta": {
            _type: "pageCta",
            enabled: true,
            title: child.label ?? L("solutions", "ctaTitle"),
            text: child.excerpt ?? LT("solutions", "ctaText"),
            primaryCta:
              child.pageHeroCtaLabel ?? L("solutions", "contactUs"),
            primaryCtaHref: "/contact",
          },
        });
    }
    await patch.commit();
    console.log(`✓ solutionChild labels: ${child._id}`);
  }

  console.log("\nDone — page sections, chrome, and form copy seeded in Sanity Studio.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
