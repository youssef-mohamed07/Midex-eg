import {
  getBlogPost,
  getCaseStudy,
  getProduct,
  getProductCategories,
  getProductsByCategory,
  getSolutionChildPage,
  getSolutionGroup,
  getSolutionGroupFaq,
} from "@/lib/cms";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import type { Locale } from "@/i18n/routing";
import type { SeoTemplateContext } from "@/lib/seo/types";
import type { FaqJsonLdItem } from "@/lib/seo/json-ld";

function firstMeaningful(...values: Array<string | undefined | null>) {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return undefined;
}

export async function getProductSeoContext(slug: string, locale: Locale) {
  const product = await getProduct(slug, locale);
  if (!product) return null;

  return {
    context: {
      title: product.title,
      description: product.description,
      excerpt: product.excerpt,
      image: product.image,
    } satisfies SeoTemplateContext,
    product: { sku: product.slug, category: product.category },
  };
}

export async function getProductCategorySeoContext(slug: string, locale: Locale) {
  const categories = await getProductCategories(locale);
  const category = categories[slug];
  if (!category) return null;

  const products = await getProductsByCategory(slug, locale);
  const image = products[0]?.image || category.image;

  return {
    context: {
      title: category.label,
      description: category.description,
      image,
    } satisfies SeoTemplateContext,
  };
}

export async function getSolutionGroupSeoContext(slug: string, locale: Locale) {
  const [group, faq] = await Promise.all([
    getSolutionGroup(slug, locale),
    getSolutionGroupFaq(slug, locale),
  ]);
  if (!group) return null;

  const faqItems: FaqJsonLdItem[] = (faq?.items ?? [])
    .map((item) => ({
      question: item.question?.trim() ?? "",
      answer: item.answer?.trim() ?? "",
    }))
    .filter((item) => item.question && item.answer);

  return {
    context: {
      title: getGroupLabel(group),
      description: group.description,
      image: group.image,
    } satisfies SeoTemplateContext,
    faq: faqItems,
  };
}

export async function getSolutionChildSeoContext(
  groupSlug: string,
  childSlug: string,
  locale: Locale,
) {
  const [group, page] = await Promise.all([
    getSolutionGroup(groupSlug, locale),
    getSolutionChildPage(groupSlug, childSlug, locale),
  ]);
  const child = group?.children.find((item) => item.slug === childSlug);
  if (!group || !child) return null;

  const title = firstMeaningful(page?.heroTitle, child.label) ?? child.label;
  const description =
    firstMeaningful(
      page?.heroSubtitle,
      page?.overviewIntro,
      child.excerpt,
      group.description,
    ) ?? child.excerpt;

  const faqItems: FaqJsonLdItem[] = (page?.faq?.items ?? [])
    .map((item) => ({
      question: item.question?.trim() ?? "",
      answer: item.answer?.trim() ?? "",
    }))
    .filter((item) => item.question && item.answer);

  return {
    context: {
      title,
      description,
      excerpt: child.excerpt,
      group: getGroupLabel(group),
      image: child.image || group.image,
    } satisfies SeoTemplateContext,
    service: {
      serviceType: title,
      areaServed: "Egypt",
    },
    faq: faqItems,
  };
}

export async function getBlogPostSeoContext(slug: string, locale: Locale) {
  const post = await getBlogPost(slug, locale);
  if (!post) return null;

  return {
    context: {
      title: post.title,
      description: post.excerpt,
      excerpt: post.excerpt,
      image: post.image,
    } satisfies SeoTemplateContext,
    article: { datePublished: post.date },
  };
}

export async function getCaseStudySeoContext(slug: string, locale: Locale) {
  const study = await getCaseStudy(slug, locale);
  if (!study) return null;

  return {
    context: {
      title: study.client,
      description: study.outcome,
      excerpt: study.scope,
      image: study.image,
    } satisfies SeoTemplateContext,
  };
}
