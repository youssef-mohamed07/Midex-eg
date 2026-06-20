import {
  getLocalizedBlogPost,
  getLocalizedProduct,
  getLocalizedProductCategories,
  getLocalizedSolution,
  getLocalizedSolutionChild,
  getLocalizedSolutionGroup,
} from "@/content/i18n";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { SeoTemplateContext } from "@/content/seo/types";

export async function getProductSeoContext(slug: string, locale: Locale) {
  const product = getLocalizedProduct(slug, locale);
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
  const categories = getLocalizedProductCategories(locale);
  const category = categories[slug];
  if (!category) return null;

  return {
    context: {
      title: category.label,
      description: category.description,
    } satisfies SeoTemplateContext,
  };
}

export async function getSolutionSeoContext(slug: string, locale: Locale) {
  const solution = getLocalizedSolution(slug, locale);
  if (!solution) return null;

  return {
    context: {
      title: solution.title,
      description: solution.intro,
      excerpt: solution.excerpt,
      image: solution.image,
    } satisfies SeoTemplateContext,
  };
}

export async function getSolutionGroupSeoContext(slug: string, locale: Locale) {
  const group = getLocalizedSolutionGroup(slug, locale);
  if (!group) return null;

  const tn = await getTranslations("nav");
  const title = getGroupLabel(group, tn);

  return {
    context: {
      title,
      description: group.description,
      image: group.image,
    } satisfies SeoTemplateContext,
  };
}

export async function getSolutionChildSeoContext(
  groupSlug: string,
  childSlug: string,
  locale: Locale,
) {
  const group = getLocalizedSolutionGroup(groupSlug, locale);
  const child = getLocalizedSolutionChild(groupSlug, childSlug, locale);
  if (!group || !child) return null;

  const tn = await getTranslations("nav");
  const groupName = getGroupLabel(group, tn);

  return {
    context: {
      title: child.label,
      description: child.excerpt,
      excerpt: child.excerpt,
      group: groupName,
      image: child.image,
    } satisfies SeoTemplateContext,
  };
}

export async function getBlogPostSeoContext(slug: string, locale: Locale) {
  const post = getLocalizedBlogPost(slug, locale);
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
