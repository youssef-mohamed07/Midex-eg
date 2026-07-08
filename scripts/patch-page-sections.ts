/**
 * Seeds page section copy into Sanity singletons from messages/*.json.
 * Run: npx tsx scripts/patch-page-sections.ts
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

function LL(ns: string, keys: string[]): LocalizedList {
  return {
    _type: "localeStringList",
    en: keys.map((k) => en[ns]?.[k] ?? ""),
    ar: keys.map((k) => ar[ns]?.[k] ?? ""),
    de: keys.map((k) => de[ns]?.[k] ?? ""),
  };
}

function sectionHeader(ns: string, titleKey: string, subtitleKey?: string) {
  return {
    _type: "sectionHeader",
    enabled: true,
    title: L(ns, titleKey),
    ...(subtitleKey ? { subtitle: LT(ns, subtitleKey) } : {}),
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

async function upsertSingleton(id: string, type: string, doc: Record<string, unknown>) {
  await client.createOrReplace({
    _id: id,
    _type: type,
    ...doc,
  });
  console.log(`✓ ${type}`);
}

async function main() {
  await upsertSingleton("homePage", "homePage", {
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
    testimonialsSection: sectionHeader("home", "testimonialsTitle", "testimonialsSubtitle"),
    exclusiveSection: sectionHeader("home", "exclusiveTitle"),
    quoteFormSection: sectionHeader("home", "quoteFormTitle", "quoteFormSubtitle"),
    faq: buildFaq("home", 6),
    quoteCta: {
      ...pageCta("home", "quoteTitle", "quoteText", "quoteButton", "/contact"),
      secondaryCta: L("hero", "viewProducts"),
      secondaryCtaHref: "/products",
    },
  });

  await upsertSingleton("aboutPage", "aboutPage", {
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
      title: L("about", "standardsTitle"),
      subtitle: LT("about", "standardsSubtitle"),
      items: ["standard1", "standard2", "standard3", "standard4", "standard5"].map((key) => ({
        _type: "standardItem",
        _key: key,
        key,
        text: L("about", key),
      })),
    },
    eventsSection: sectionHeader("about", "eventsTitle", "eventsIntro"),
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

  await upsertSingleton("contactPage", "contactPage", {
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
    },
    map: {
      title: L("contact", "mapTitle"),
      subtitle: LT("contact", "mapSubtitle"),
    },
  });

  await upsertSingleton("productsPage", "productsPage", {
    hero: {
      _type: "pageHero",
      title: L("products", "title"),
      subtitle: LT("products", "subtitle"),
    },
    catalogSection: sectionHeader("products", "catalogHeading", "catalogSubtitle"),
    statsSection: sectionHeader("home", "statsTitle", "statsSubtitle"),
    caseStudiesSection: sectionHeader("home", "caseStudiesTitle", "caseStudiesSubtitle"),
    faq: buildFaq("home", 6),
    cta: pageCta("products", "ctaTitle", "ctaText", "requestQuote", "/contact"),
  });

  await upsertSingleton("solutionsPage", "solutionsPage", {
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
    timelineSection: sectionHeader("solutions", "stepsGridTitle", "stepsGridSubtitle"),
    statsSection: sectionHeader("home", "statsTitle", "statsSubtitle"),
    caseStudiesSection: sectionHeader("home", "caseStudiesTitle", "caseStudiesSubtitle"),
    testimonialsSection: sectionHeader("home", "testimonialsTitle", "testimonialsSubtitle"),
    faq: buildFaq("home", 6),
    cta: pageCta("solutions", "ctaTitle", "ctaText", "contactUs", "/contact"),
  });

  await upsertSingleton("blogPage", "blogPage", {
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
    },
    cta: pageCta("blog", "ctaTitle", "ctaText", "ctaButton", "/contact"),
  });

  const statKeys = ["statProjects", "statClients", "statYearsExcellence", "statCompliance"];
  const stats = await client.fetch<Array<{ _id: string; labelKey: string }>>(
    `*[_type == "stat"] | order(order asc) { _id, labelKey }`,
  );
  for (const stat of stats) {
    const key = stat.labelKey;
    if (!en.home?.[key]) continue;
    await client.patch(stat._id).set({ label: L("home", key) }).commit();
    console.log(`✓ stat label: ${key}`);
  }

  const milestoneKeys = [
    "milestone1",
    "milestone2",
    "milestone3",
    "milestone4",
    "milestone5",
    "milestone6",
    "milestone7",
  ];
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

  console.log("\nDone — page sections seeded in Sanity Studio.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
