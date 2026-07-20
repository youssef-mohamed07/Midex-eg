/**
 * Seeds the Sanity dataset from the existing static content modules.
 *
 * - Reads legacy static modules (removed post-migration — restore `src/content/*`
 *   from git history if you need to re-seed a fresh dataset).
 * - Uploads every referenced image from public/ (content-hash deduplicated).
 * - Creates documents with deterministic IDs, so re-runs are idempotent.
 *
 * Usage: npm run seed:sanity
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and
 * SANITY_API_WRITE_TOKEN in .env.local.
 */

import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

import {
  aboutFounders,
  aboutMilestones,
  aboutStandards,
  blogPosts,
  caseStudies,
  certificates,
  clientLogos,
  companyValues,
  events,
  exclusivePartners,
  heroCollageImages,
  newsItems,
  partners,
  services,
  siteContact,
  stats,
  testimonials,
} from "../src/content/site";
import {
  categoryHighlights,
  categorySpecs,
  productCategories,
  products,
} from "../src/content/products";
import { solutionGroupHighlights, solutionGroups } from "../src/content/solutions";
import {
  attachPrincipleImages,
  solutionGroupPrinciplesBase,
} from "../src/content/solution-group-principles";
import {
  attachWorkflowImages,
  solutionGroupWorkflowBase,
} from "../src/content/solution-group-workflow";
import { solutionGroupFaqBase } from "../src/content/solution-group-faq";
import {
  getSolutionChildPageKey,
  solutionChildPagesBase,
} from "../src/content/solution-child-pages";
import { seoEntries } from "../src/content/seo/entries";
import { contentAr } from "../src/content/i18n/ar";
import { contentDe } from "../src/content/i18n/de";
import type { LocaleContent } from "../src/content/i18n/types";
import { siteConfig } from "../src/lib/seo/config";
import messagesEn from "../messages/en.json";
import messagesAr from "../messages/ar.json";
import messagesDe from "../messages/de.json";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local — aborting.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-01",
  token,
  useCdn: false,
});

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

type LocalizedValue = { _type: string; en?: string; ar?: string; de?: string };
type LocalizedList = { _type: string; en?: string[]; ar?: string[]; de?: string[] };

function L(en?: string, ar?: string, de?: string): LocalizedValue | undefined {
  if (en === undefined && ar === undefined && de === undefined) return undefined;
  const value: LocalizedValue = { _type: "localeString" };
  if (en !== undefined) value.en = en;
  if (ar !== undefined) value.ar = ar;
  if (de !== undefined) value.de = de;
  return value;
}

function LT(en?: string, ar?: string, de?: string): LocalizedValue | undefined {
  const value = L(en, ar, de);
  if (!value) return undefined;
  return { ...value, _type: "localeText" };
}

function LL(en?: string[], ar?: string[], de?: string[]): LocalizedList | undefined {
  if (!en && !ar && !de) return undefined;
  const value: LocalizedList = { _type: "localeStringList" };
  if (en) value.en = en;
  if (ar) value.ar = ar;
  if (de) value.de = de;
  return value;
}

const imageAssetCache = new Map<string, string>();

async function uploadImage(publicPath: string): Promise<string | null> {
  const cached = imageAssetCache.get(publicPath);
  if (cached) return cached;

  const filePath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (!existsSync(filePath)) {
    console.warn(`  ! missing file, skipping upload: ${publicPath}`);
    return null;
  }

  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  imageAssetCache.set(publicPath, asset._id);
  return asset._id;
}

type ImageValue = {
  _type: "imageWithAlt";
  asset?: { _type: "reference"; _ref: string };
  sourcePath: string;
  alt?: LocalizedValue;
};

async function img(
  publicPath: string,
  alt?: { en?: string; ar?: string; de?: string },
): Promise<ImageValue> {
  const assetId = await uploadImage(publicPath);
  const value: ImageValue = { _type: "imageWithAlt", sourcePath: publicPath };
  if (assetId) value.asset = { _type: "reference", _ref: assetId };
  const altValue = L(alt?.en, alt?.ar, alt?.de);
  if (altValue) value.alt = altValue;
  return value;
}

function slugField(value: string) {
  return { _type: "slug", current: value };
}

function ref(id: string) {
  return { _type: "reference", _ref: id };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type SanityDoc = { _id: string; _type: string; [key: string]: unknown };

const docs: SanityDoc[] = [];

/* ------------------------------------------------------------------ */
/* Section builders (principles / workflow / faq)                      */
/* ------------------------------------------------------------------ */

type PrincipleInput = { id: string; title: string; text: string; image: string };
type StepInput = { id: string; title: string; text: string; image: string };
type FaqItemInput = { id: string; question: string; answer: string };

type SectionTranslations = {
  title?: string;
  intro?: string;
  items?: Record<string, { title?: string; text?: string }>;
};

type FaqTranslations = {
  title?: string;
  intro?: string;
  items?: Record<string, { question?: string; answer?: string }>;
};

async function buildPrinciplesSection(
  base: { title: string; intro: string },
  items: PrincipleInput[],
  ar?: SectionTranslations,
  de?: SectionTranslations,
) {
  return {
    _type: "principlesSection",
    title: L(base.title, ar?.title, de?.title),
    intro: LT(base.intro, ar?.intro, de?.intro),
    items: await Promise.all(
      items.map(async (item) => ({
        _type: "principleItem",
        _key: item.id,
        key: item.id,
        title: L(item.title, ar?.items?.[item.id]?.title, de?.items?.[item.id]?.title),
        text: LT(item.text, ar?.items?.[item.id]?.text, de?.items?.[item.id]?.text),
        image: await img(item.image),
      })),
    ),
  };
}

async function buildWorkflowSection(
  base: { title: string; intro: string },
  steps: StepInput[],
  ar?: SectionTranslations,
  de?: SectionTranslations,
) {
  return {
    _type: "workflowSection",
    title: L(base.title, ar?.title, de?.title),
    intro: LT(base.intro, ar?.intro, de?.intro),
    steps: await Promise.all(
      steps.map(async (step) => ({
        _type: "workflowStep",
        _key: step.id,
        key: step.id,
        title: L(step.title, ar?.items?.[step.id]?.title, de?.items?.[step.id]?.title),
        text: LT(step.text, ar?.items?.[step.id]?.text, de?.items?.[step.id]?.text),
        image: await img(step.image),
      })),
    ),
  };
}

function buildFaqSection(
  base: { title: string; intro: string },
  items: FaqItemInput[],
  ar?: FaqTranslations,
  de?: FaqTranslations,
) {
  return {
    _type: "faqSection",
    title: L(base.title, ar?.title, de?.title),
    intro: LT(base.intro, ar?.intro, de?.intro),
    items: items.map((item) => ({
      _type: "faqEntry",
      _key: item.id,
      key: item.id,
      question: LT(
        item.question,
        ar?.items?.[item.id]?.question,
        de?.items?.[item.id]?.question,
      ),
      answer: LT(item.answer, ar?.items?.[item.id]?.answer, de?.items?.[item.id]?.answer),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* Corrected product categorization (SEO fix, requested)               */
/* ------------------------------------------------------------------ */

const productCategoryFixes: Record<string, string> = {
  "sanitary-centrifugal-self-priming-pump": "pumps",
  "sanitary-non-self-priming-pump": "pumps",
  "hygienic-uv-unit": "uv-units",
  "sanitary-vent-filter-housing": "filters",
};

/* ------------------------------------------------------------------ */
/* Seeders                                                             */
/* ------------------------------------------------------------------ */

const ar: LocaleContent = contentAr;
const de: LocaleContent = contentDe;

async function seedSiteSettings() {
  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    email: siteContact.email,
    phones: siteContact.phones,
    address: siteContact.address,
    addressStreet: siteConfig.address.street,
    addressCity: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    addressPostalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
    mapsUrl: siteContact.mapsUrl,
    mapsEmbedUrl: siteContact.mapsEmbedUrl,
    linkedIn: siteConfig.social.linkedIn,
    facebook: siteConfig.social.facebook,
    youtube: siteConfig.social.youtube,
    whatsApp: siteConfig.social.whatsApp,
    manifestDescription:
      "Validated purified water, WFI, and hygienic process engineering for pharmaceutical, food, and cosmetics industries.",
    manifestBackgroundColor: "#080f1f",
    manifestThemeColor: "#0E1A32",
    robotsDisallow: ["/api/", "/studio"],
    logoDark: await img("/images/brand/logo-dark.png", { en: "Midex" }),
    logoWhite: await img("/images/brand/logo-white.png", { en: "Midex" }),
  });
}

async function seedHomePage() {
  docs.push({
    _id: "homePage",
    _type: "homePage",
    heroCollageLeft: await Promise.all(
      heroCollageImages.left.map(async (item, index) => ({
        _type: "collageImage",
        _key: `left-${index}`,
        image: await img(item.src),
        className: item.className,
      })),
    ),
    heroCollageRight: await Promise.all(
      heroCollageImages.right.map(async (item, index) => ({
        _type: "collageImage",
        _key: `right-${index}`,
        image: await img(item.src),
        className: item.className,
      })),
    ),
    heroSlides: await Promise.all(
      ["/images/hero/slide-1.png", "/images/hero/slide-2.png", "/images/hero/slide-3.png"].map(
        async (src, index) => ({
          _type: "heroSlide",
          _key: `slide-${index + 1}`,
          image: await img(src),
        }),
      ),
    ),
    featuredNavImage: await img("/images/hero/slide-1.png"),
  });
}

async function seedAboutPage() {
  docs.push({
    _id: "aboutPage",
    _type: "aboutPage",
    standards: [...aboutStandards],
    values: await Promise.all(
      companyValues.map(async (value) => ({
        _type: "companyValue",
        _key: value.id,
        key: value.id,
        image: await img(value.image, { en: value.alt }),
      })),
    ),
  });
}

async function seedServices() {
  for (const [index, service] of services.entries()) {
    docs.push({
      _id: `service-${slugify(service.title)}`,
      _type: "service",
      title: L(service.title, ar.services[index]?.title, de.services[index]?.title),
      excerpt: LT(service.excerpt, ar.services[index]?.excerpt, de.services[index]?.excerpt),
      image: await img(service.image, { en: service.title }),
      order: index,
    });
  }
}

async function seedPartners() {
  for (const [index, partner] of partners.entries()) {
    docs.push({
      _id: `partner-${slugify(partner.name)}`,
      _type: "partner",
      name: partner.name,
      kind: "partner",
      image: await img(partner.image, { en: partner.name }),
      order: index,
    });
  }
  for (const [index, partner] of exclusivePartners.entries()) {
    docs.push({
      _id: `partner-exclusive-${slugify(partner.name)}`,
      _type: "partner",
      name: partner.name,
      kind: "exclusive",
      image: await img(partner.image, { en: partner.name }),
      order: index,
    });
  }
}

async function seedCertificates() {
  for (const [index, certificate] of certificates.entries()) {
    const alt = certificate.alt;
    const description =
      "description" in certificate && typeof certificate.description === "string"
        ? certificate.description
        : undefined;
    docs.push({
      _id: `certificate-${certificate.slug}`,
      _type: "certificate",
      slug: slugField(certificate.slug),
      title: L(alt, alt, alt),
      description: description ? LT(description, description, description) : undefined,
      image: await img(certificate.image, { en: alt }),
      order: index,
    });
  }
}

function seedStatsAndMilestones() {
  for (const [index, item] of stats.entries()) {
    docs.push({
      _id: `stat-${item.labelKey}`,
      _type: "stat",
      value: item.value,
      labelKey: item.labelKey,
      suffix: "suffix" in item ? item.suffix : undefined,
      order: index,
    });
  }
  for (const [index, item] of aboutMilestones.entries()) {
    docs.push({
      _id: `milestone-${item.labelKey}`,
      _type: "milestone",
      value: item.value,
      labelKey: item.labelKey,
      suffix: "suffix" in item ? item.suffix : undefined,
      order: index,
    });
  }
}

async function seedFounders() {
  for (const [index, founder] of aboutFounders.entries()) {
    docs.push({
      _id: `founder-${founder.id}`,
      _type: "founder",
      key: founder.id,
      image: await img(founder.image),
      nameKey: founder.nameKey,
      roleKey: founder.roleKey,
      bioKey: founder.bioKey,
      order: index,
    });
  }
}

function seedTestimonials() {
  for (const [index, item] of testimonials.entries()) {
    docs.push({
      _id: `testimonial-${slugify(item.name)}`,
      _type: "testimonial",
      name: L(item.name, ar.testimonials?.[index]?.name, de.testimonials?.[index]?.name),
      role: L(item.role, ar.testimonials[index]?.role, de.testimonials[index]?.role),
      quote: LT(item.quote, ar.testimonials[index]?.quote, de.testimonials[index]?.quote),
      order: index,
    });
  }
}

async function seedNewsItems() {
  for (const [index, item] of newsItems.entries()) {
    docs.push({
      _id: `newsItem-${slugify(item.title)}`,
      _type: "newsItem",
      title: L(item.title, ar.newsItems[index]?.title, de.newsItems[index]?.title),
      date: item.date,
      excerpt: LT(item.excerpt, ar.newsItems[index]?.excerpt, de.newsItems[index]?.excerpt),
      image: await img(item.image, { en: item.title }),
      order: index,
    });
  }
}

async function seedCaseStudies() {
  for (const [index, item] of caseStudies.entries()) {
    const arT = ar.caseStudies[index];
    const deT = de.caseStudies[index];
    docs.push({
      _id: `caseStudy-${item.slug}`,
      _type: "caseStudy",
      slug: slugField(item.slug),
      client: item.client,
      image: await img(item.image, { en: `${item.client} — ${item.scope}` }),
      industry: L(item.industry, arT?.industry, deT?.industry),
      scope: LT(item.scope, arT?.scope, deT?.scope),
      outcome: LT(item.outcome, arT?.outcome, deT?.outcome),
      statValue: item.statValue,
      statLabel: L(item.statLabel, arT?.statLabel, deT?.statLabel),
      tags: LL(item.tags, arT?.tags, deT?.tags),
      order: index,
    });
  }
}

async function seedEvents() {
  for (const [index, item] of events.entries()) {
    const arT = ar.events[item.src];
    const deT = de.events[item.src];
    docs.push({
      _id: `eventItem-${slugify(item.src.split("/").pop() ?? String(index))}`,
      _type: "eventItem",
      image: await img(item.src, { en: item.title }),
      title: L(item.title, arT?.title, deT?.title),
      subtitle: L(item.subtitle, arT?.subtitle, deT?.subtitle),
      date: item.date,
      featured: item.featured ?? false,
      variant: item.variant,
      order: index,
    });
  }
}

async function seedClientLogos() {
  for (const [index, logo] of clientLogos.entries()) {
    docs.push({
      _id: `clientLogo-${slugify(logo.split("/").pop() ?? String(index))}`,
      _type: "clientLogo",
      image: await img(logo, { en: "Midex client logo" }),
      order: index,
    });
  }
}

async function seedBlogPosts() {
  for (const [index, post] of blogPosts.entries()) {
    const arT = ar.blogPosts[post.slug];
    const deT = de.blogPosts[post.slug];
    docs.push({
      _id: `blogPost-${post.slug}`,
      _type: "blogPost",
      slug: slugField(post.slug),
      title: L(post.title, arT?.title, deT?.title),
      excerpt: LT(post.excerpt, arT?.excerpt, deT?.excerpt),
      date: post.date,
      image: await img(post.image, { en: post.title }),
      category: L(post.category, arT?.category, deT?.category),
      readTime: post.readTime,
      body: LL(post.body, arT?.body, deT?.body),
      order: index,
    });
  }
}

async function seedProductCategories() {
  const slugs = Object.keys(productCategories);
  for (const [index, slug] of slugs.entries()) {
    const base = productCategories[slug];
    const arT = ar.productCategories[slug];
    const deT = de.productCategories[slug];
    const arDetails = ar.productCategoryDetails?.[slug];
    const deDetails = de.productCategoryDetails?.[slug];
    const specs = categorySpecs[slug] ?? [];

    docs.push({
      _id: `productCategory-${slug}`,
      _type: "productCategory",
      slug: slugField(slug),
      label: L(base.label, arT?.label, deT?.label),
      description: LT(base.description, arT?.description, deT?.description),
      highlights: LL(
        categoryHighlights[slug] ?? [],
        arDetails?.highlights,
        deDetails?.highlights,
      ),
      specs: specs.map((spec, specIndex) => ({
        _type: "specItem",
        _key: `spec-${specIndex}`,
        label: L(
          spec.label,
          arDetails?.specs?.[specIndex]?.label,
          deDetails?.specs?.[specIndex]?.label,
        ),
        value: L(
          spec.value,
          arDetails?.specs?.[specIndex]?.value,
          deDetails?.specs?.[specIndex]?.value,
        ),
      })),
      order: index,
    });
  }
}

async function seedProducts() {
  for (const [index, product] of products.entries()) {
    const arT = ar.products[product.slug];
    const deT = de.products[product.slug];
    const category = productCategoryFixes[product.slug] ?? product.category;

    docs.push({
      _id: `product-${product.slug}`,
      _type: "product",
      slug: slugField(product.slug),
      title: L(product.title, arT?.title, deT?.title),
      category: ref(`productCategory-${category}`),
      excerpt: LT(product.excerpt, arT?.excerpt, deT?.excerpt),
      description: LT(product.description, arT?.description, deT?.description),
      image: await img(product.image, { en: product.title }),
      gallery: await Promise.all(
        (product.gallery ?? []).map(async (src, galleryIndex) => ({
          ...(await img(src, { en: `${product.title} — ${galleryIndex + 1}` })),
          _key: `gallery-${galleryIndex}`,
        })),
      ),
      order: index,
    });
  }
}

async function seedSolutions() {
  for (const [index, group] of solutionGroups.entries()) {
    const arT = ar.solutionGroups[group.slug];
    const deT = de.solutionGroups[group.slug];
    const groupSlug = group.slug as keyof typeof solutionGroupPrinciplesBase;

    const principlesBase = solutionGroupPrinciplesBase[groupSlug];
    const workflowBase = solutionGroupWorkflowBase[groupSlug];
    const faqBase = solutionGroupFaqBase[groupSlug];

    docs.push({
      _id: `solutionGroup-${group.slug}`,
      _type: "solutionGroup",
      slug: slugField(group.slug),
      label: L(group.label, arT?.label, deT?.label),
      menuLabel: L(group.menuLabel),
      heroTitle: L(group.heroTitle, arT?.heroTitle, deT?.heroTitle),
      servicesSectionTitle: L(
        group.servicesSectionTitle,
        arT?.servicesSectionTitle,
        deT?.servicesSectionTitle,
      ),
      servicesSectionIntro: LT(
        group.servicesSectionIntro,
        arT?.servicesSectionIntro,
        deT?.servicesSectionIntro,
      ),
      description: LT(group.description, arT?.description, deT?.description),
      intro: LT(group.intro, arT?.intro, deT?.intro),
      image: await img(group.image, { en: group.label }),
      highlights: LL(
        solutionGroupHighlights[groupSlug],
        ar.solutionGroupHighlights[group.slug],
        de.solutionGroupHighlights[group.slug],
      ),
      principles: principlesBase
        ? await buildPrinciplesSection(
            principlesBase,
            attachPrincipleImages(principlesBase.items),
            ar.solutionGroupPrinciples?.[group.slug],
            de.solutionGroupPrinciples?.[group.slug],
          )
        : undefined,
      workflow: workflowBase
        ? await buildWorkflowSection(
            workflowBase,
            attachWorkflowImages(workflowBase.steps),
            ar.solutionGroupWorkflow?.[group.slug]
              ? {
                  title: ar.solutionGroupWorkflow[group.slug].title,
                  intro: ar.solutionGroupWorkflow[group.slug].intro,
                  items: ar.solutionGroupWorkflow[group.slug].steps,
                }
              : undefined,
            de.solutionGroupWorkflow?.[group.slug]
              ? {
                  title: de.solutionGroupWorkflow[group.slug].title,
                  intro: de.solutionGroupWorkflow[group.slug].intro,
                  items: de.solutionGroupWorkflow[group.slug].steps,
                }
              : undefined,
          )
        : undefined,
      faq: faqBase
        ? buildFaqSection(
            faqBase,
            faqBase.items,
            ar.solutionGroupFaq?.[group.slug],
            de.solutionGroupFaq?.[group.slug],
          )
        : undefined,
      order: index,
    });

    for (const [childIndex, child] of group.children.entries()) {
      const arChild = arT?.children[child.slug];
      const deChild = deT?.children[child.slug];
      const pageKey = getSolutionChildPageKey(group.slug, child.slug);
      const pageBase = solutionChildPagesBase[pageKey];
      const arPage = ar.solutionChildPages?.[pageKey];
      const dePage = de.solutionChildPages?.[pageKey];

      docs.push({
        _id: `solutionChild-${group.slug}--${child.slug}`,
        _type: "solutionChild",
        slug: slugField(child.slug),
        group: ref(`solutionGroup-${group.slug}`),
        label: L(child.label, arChild?.label, deChild?.label),
        excerpt: LT(child.excerpt, arChild?.excerpt, deChild?.excerpt),
        intro: LT(child.intro, arChild?.intro, deChild?.intro),
        image: await img(child.image, { en: child.label }),
        order: childIndex,
        page: pageBase
          ? {
              heroTitle: L(pageBase.heroTitle, arPage?.heroTitle, dePage?.heroTitle),
              heroSubtitle: LT(
                pageBase.heroSubtitle,
                arPage?.heroSubtitle,
                dePage?.heroSubtitle,
              ),
              heroCtaLabel: L(
                pageBase.heroCtaLabel,
                arPage?.heroCtaLabel,
                dePage?.heroCtaLabel,
              ),
              overviewTitle: L(
                pageBase.overviewTitle,
                arPage?.overviewTitle,
                dePage?.overviewTitle,
              ),
              overviewIntro: LT(
                pageBase.overviewIntro,
                arPage?.overviewIntro,
                dePage?.overviewIntro,
              ),
              overviewItems: LL(
                pageBase.overviewItems,
                arPage?.overviewItems,
                dePage?.overviewItems,
              ),
              relatedSectionTitle: L(
                pageBase.relatedSectionTitle,
                arPage?.relatedSectionTitle,
                dePage?.relatedSectionTitle,
              ),
              principles: await buildPrinciplesSection(
                pageBase.principles,
                attachPrincipleImages(pageBase.principles.items),
                arPage?.principles,
                dePage?.principles,
              ),
              workflow: await buildWorkflowSection(
                pageBase.workflow,
                attachWorkflowImages(pageBase.workflow.steps),
                arPage?.workflow
                  ? {
                      title: arPage.workflow.title,
                      intro: arPage.workflow.intro,
                      items: arPage.workflow.steps,
                    }
                  : undefined,
                dePage?.workflow
                  ? {
                      title: dePage.workflow.title,
                      intro: dePage.workflow.intro,
                      items: dePage.workflow.steps,
                    }
                  : undefined,
              ),
              faq: buildFaqSection(pageBase.faq, pageBase.faq.items, arPage?.faq, dePage?.faq),
            }
          : undefined,
      });
    }
  }
}

function seedSeoEntries() {
  const routeKeys = [...new Set(seoEntries.map((entry) => entry.routeKey))];

  for (const routeKey of routeKeys) {
    const en = seoEntries.find((e) => e.routeKey === routeKey && e.locale === "en");
    const arE = seoEntries.find((e) => e.routeKey === routeKey && e.locale === "ar");
    const deE = seoEntries.find((e) => e.routeKey === routeKey && e.locale === "de");
    if (!en) continue;

    docs.push({
      _id: `seoEntry-${routeKey}`,
      _type: "seoEntry",
      routeKey,
      seo: {
        _type: "seoFields",
        title: L(en.title, arE?.title, deE?.title),
        description: LT(en.description, arE?.description, deE?.description),
        focusKeyword: L(en.focusKeyword, arE?.focusKeyword, deE?.focusKeyword),
        keywords: LL(en.keywords, arE?.keywords, deE?.keywords),
        canonicalPath: en.canonicalPath,
        robotsIndex: en.robots?.index ?? true,
        robotsFollow: en.robots?.follow ?? true,
        ogType: en.openGraph?.type,
        ogTitle: L(en.openGraph?.title, arE?.openGraph?.title, deE?.openGraph?.title),
        ogDescription: LT(
          en.openGraph?.description,
          arE?.openGraph?.description,
          deE?.openGraph?.description,
        ),
        ogImagePath: en.openGraph?.image,
        twitterCard: en.twitter?.card,
        twitterImagePath: en.twitter?.image,
        structuredDataType: en.structuredData?.type,
      },
    });
  }
}

function flattenMessages(
  value: Record<string, unknown>,
  prefix = "",
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value)) {
    const pathKey = prefix ? `${prefix}.${key}` : key;
    if (typeof entry === "string") {
      result[pathKey] = entry;
    } else if (entry && typeof entry === "object") {
      Object.assign(result, flattenMessages(entry as Record<string, unknown>, pathKey));
    }
  }
  return result;
}

function seedUiMessages() {
  const en = messagesEn as Record<string, Record<string, unknown>>;
  const arM = messagesAr as Record<string, Record<string, unknown>>;
  const deM = messagesDe as Record<string, Record<string, unknown>>;

  for (const namespace of Object.keys(en)) {
    const flatEn = flattenMessages(en[namespace]);
    const flatAr = flattenMessages(arM[namespace] ?? {});
    const flatDe = flattenMessages(deM[namespace] ?? {});

    docs.push({
      _id: `uiMessages-${namespace}`,
      _type: "uiMessages",
      namespace,
      entries: Object.keys(flatEn).map((key) => ({
        _type: "messageEntry",
        _key: key.replace(/\./g, "-"),
        key,
        value: LT(flatEn[key], flatAr[key], flatDe[key]),
      })),
    });
  }
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
  console.log(`Seeding Sanity project ${projectId} (dataset: ${dataset})…`);

  console.log("Building documents and uploading images…");
  await seedSiteSettings();
  await seedHomePage();
  await seedAboutPage();
  await seedServices();
  await seedPartners();
  await seedCertificates();
  seedStatsAndMilestones();
  await seedFounders();
  seedTestimonials();
  await seedNewsItems();
  await seedCaseStudies();
  await seedEvents();
  await seedClientLogos();
  await seedBlogPosts();
  await seedProductCategories();
  await seedProducts();
  await seedSolutions();
  seedSeoEntries();
  seedUiMessages();

  console.log(`Uploading ${docs.length} documents…`);
  const chunkSize = 40;
  for (let i = 0; i < docs.length; i += chunkSize) {
    const chunk = docs.slice(i, i + chunkSize);
    let transaction = client.transaction();
    for (const doc of chunk) {
      transaction = transaction.createOrReplace(doc);
    }
    await transaction.commit();
    console.log(`  committed ${Math.min(i + chunkSize, docs.length)}/${docs.length}`);
  }

  console.log(`Done. ${imageAssetCache.size} unique images uploaded, ${docs.length} documents written.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
