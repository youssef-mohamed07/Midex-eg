import "server-only";

import type { Locale } from "@/i18n/routing";
import { sanityFetch } from "@/lib/cms/fetch";
import {
  beforeAfterProjection,
  blogDetailLabelsProjection,
  caseStudiesExplorerLabelsProjection,
  caseStudyLabelsProjection,
  contactFormCopyProjection,
  engineeringCapabilitiesProjection,
  faqProjection,
  fileUrl,
  homeHeroCopyProjection,
  imageUrl,
  loc,
  locOptional,
  missionVisionProjection,
  productDetailLabelsProjection,
  productExplorerLabelsProjection,
  pageCtaProjection,
  pageHeroProjection,
  promoSectionProjection,
  quoteBlockProjection,
  quoteFormCopyProjection,
  sectionHeaderProjection,
  timelineSectionProjection,
} from "@/lib/cms/fragments";
import type {
  AboutPageContent,
  BlogPageContent,
  CaseStudiesPageContent,
  ContactPageContent,
  HomePageSections,
  ProductsPageContent,
  SolutionsPageContent,
} from "@/lib/cms/types";

const homePageSectionsQuery = `*[_type == "homePage"][0]{
  "sectionOrder": coalesce(sectionOrder, []),
  "heroVideo": ${fileUrl("heroVideo")},
  "heroVideoPoster": ${imageUrl("heroVideoPoster")},
  ${homeHeroCopyProjection()},
  "partnersSection": ${sectionHeaderProjection("partnersSection")},
  "featuredQuote": ${quoteBlockProjection("featuredQuote")},
  "capabilitiesSection": ${engineeringCapabilitiesProjection("capabilitiesSection")},
  "eventsSection": ${sectionHeaderProjection("eventsSection")},
  "productsSection": ${sectionHeaderProjection("productsSection")},
  "truviaSection": ${promoSectionProjection("truviaSection")},
  "beforeAfterSection": ${beforeAfterProjection("beforeAfterSection")},
  "statsSection": ${sectionHeaderProjection("statsSection")},
  "caseStudiesSection": ${sectionHeaderProjection("caseStudiesSection")},
  "testimonialsSection": ${sectionHeaderProjection("testimonialsSection")},
  "exclusiveSection": ${sectionHeaderProjection("exclusiveSection")},
  "servicesSection": ${sectionHeaderProjection("servicesSection")},
  "newsSection": ${sectionHeaderProjection("newsSection")},
  "clientLogosSection": ${sectionHeaderProjection("clientLogosSection")},
  "quoteFormSection": ${sectionHeaderProjection("quoteFormSection")},
  "quoteFormCopy": ${quoteFormCopyProjection("quoteFormCopy")},
  "caseStudyLabels": ${caseStudyLabelsProjection("caseStudyLabels")},
  "faq": ${faqProjection()},
  "quoteCta": ${pageCtaProjection("quoteCta")}
}`;

const aboutPageQuery = `*[_type == "aboutPage"][0]{
  "hero": ${pageHeroProjection("hero")},
  "heroMetrics": heroMetrics{
    "primaryValue": ${locOptional("primaryValue")},
    "primaryLabel": ${locOptional("primaryLabel")},
    "badge": ${locOptional("badge")}
  },
  "missionVision": ${missionVisionProjection("missionVision")},
  "milestonesSection": ${sectionHeaderProjection("milestonesSection")},
  "foundersSection": ${sectionHeaderProjection("foundersSection")},
  "standardsSection": standardsSection{
    "eyebrow": ${locOptional("eyebrow")},
    "title": ${locOptional("title")},
    "subtitle": ${locOptional("subtitle")},
    "footnote": ${locOptional("footnote")},
    "items": coalesce(items[]{
      key,
      "text": ${loc("text")},
      "description": ${locOptional("description")}
    }, [])
  },
  "certificationsSection": ${sectionHeaderProjection("certificationsSection")},
  "eventsSection": ${sectionHeaderProjection("eventsSection")},
  "valuesSection": valuesSection{
    "title": ${locOptional("title")},
    "subtitle": ${locOptional("subtitle")},
    "items": coalesce(items[]{
      key,
      "title": ${loc("title")},
      "text": ${loc("text")},
      "image": ${imageUrl("image")},
      "alt": ${loc("image.alt")}
    }, [])
  },
  "faq": ${faqProjection()},
  "cta": ${pageCtaProjection("cta")}
}`;

const contactPageQuery = `*[_type == "contactPage"][0]{
  "hero": ${pageHeroProjection("hero")},
  "aside": aside{
    "title": ${locOptional("title")},
    "intro": ${locOptional("intro")}
  },
  "form": form{
    "title": ${locOptional("title")},
    "intro": ${locOptional("intro")},
    "copy": ${contactFormCopyProjection("copy")}
  },
  "map": map{
    "title": ${locOptional("title")},
    "subtitle": ${locOptional("subtitle")}
  }
}`;

const productsPageQuery = `*[_type == "productsPage"][0]{
  "hero": ${pageHeroProjection("hero")},
  "catalogSection": ${sectionHeaderProjection("catalogSection")},
  "explorerLabels": ${productExplorerLabelsProjection("explorerLabels")},
  "detailLabels": ${productDetailLabelsProjection("detailLabels")},
  "detailCta": ${pageCtaProjection("detailCta")},
  "statsSection": ${sectionHeaderProjection("statsSection")},
  "caseStudiesSection": ${sectionHeaderProjection("caseStudiesSection")},
  "faq": ${faqProjection()},
  "cta": ${pageCtaProjection("cta")}
}`;

const solutionsPageQuery = `*[_type == "solutionsPage"][0]{
  "hero": ${pageHeroProjection("hero")},
  "capabilitiesSection": ${sectionHeaderProjection("capabilitiesSection")},
  "beforeAfterSection": ${beforeAfterProjection("beforeAfterSection")},
  "timelineSection": ${timelineSectionProjection("timelineSection")},
  "statsSection": ${sectionHeaderProjection("statsSection")},
  "caseStudiesSection": ${sectionHeaderProjection("caseStudiesSection")},
  "testimonialsSection": ${sectionHeaderProjection("testimonialsSection")},
  "faq": ${faqProjection()},
  "cta": ${pageCtaProjection("cta")}
}`;

const blogPageQuery = `*[_type == "blogPage"][0]{
  "hero": ${pageHeroProjection("hero")},
  "listing": listing{
    "featuredLabel": ${locOptional("featuredLabel")},
    "latestLabel": ${locOptional("latestLabel")},
    "readPost": ${locOptional("readPost")},
    "postsLabel": ${locOptional("postsLabel")},
    "minRead": ${locOptional("minRead")},
    "viewAllArticles": ${locOptional("viewAllArticles")}
  },
  "detailLabels": ${blogDetailLabelsProjection("detailLabels")},
  "cta": ${pageCtaProjection("cta")}
}`;

const caseStudiesPageQuery = `*[_type == "caseStudiesPage"][0]{
  "hero": ${pageHeroProjection("hero")},
  "explorerLabels": ${caseStudiesExplorerLabelsProjection("explorerLabels")},
  "testimonialsSection": ${sectionHeaderProjection("testimonialsSection")},
  "quoteFormSection": ${sectionHeaderProjection("quoteFormSection")},
  "quoteFormCopy": ${quoteFormCopyProjection("quoteFormCopy")},
  "faq": ${faqProjection()},
  "detailLabels": ${caseStudyLabelsProjection("detailLabels")},
  "cta": ${pageCtaProjection("cta")}
}`;

export async function getHomePageSections(locale: Locale): Promise<HomePageSections> {
  const data = await sanityFetch<HomePageSections | null>({
    query: homePageSectionsQuery,
    params: { locale },
    tags: ["homePage"],
  });
  return data ?? {};
}

export async function getAboutPageContent(locale: Locale): Promise<AboutPageContent> {
  const data = await sanityFetch<AboutPageContent | null>({
    query: aboutPageQuery,
    params: { locale },
    tags: ["aboutPage"],
  });
  return data ?? {};
}

export async function getContactPageContent(locale: Locale): Promise<ContactPageContent> {
  const data = await sanityFetch<ContactPageContent | null>({
    query: contactPageQuery,
    params: { locale },
    tags: ["contactPage"],
  });
  return data ?? {};
}

export async function getProductsPageContent(locale: Locale): Promise<ProductsPageContent> {
  const data = await sanityFetch<ProductsPageContent | null>({
    query: productsPageQuery,
    params: { locale },
    tags: ["productsPage"],
  });
  return data ?? {};
}

export async function getSolutionsPageContent(locale: Locale): Promise<SolutionsPageContent> {
  const data = await sanityFetch<SolutionsPageContent | null>({
    query: solutionsPageQuery,
    params: { locale },
    tags: ["solutionsPage"],
  });
  return data ?? {};
}

export async function getBlogPageContent(locale: Locale): Promise<BlogPageContent> {
  const data = await sanityFetch<BlogPageContent | null>({
    query: blogPageQuery,
    params: { locale },
    tags: ["blogPage"],
  });
  return data ?? {};
}

export async function getCaseStudiesPageContent(
  locale: Locale,
): Promise<CaseStudiesPageContent> {
  const data = await sanityFetch<CaseStudiesPageContent | null>({
    query: caseStudiesPageQuery,
    params: { locale },
    tags: ["caseStudiesPage"],
  });
  return data ?? {};
}
