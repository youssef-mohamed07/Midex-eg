import {
  getLocalizedBlogPost,
  getLocalizedProduct,
  getLocalizedProductCategories,
  getLocalizedProductsByCategory,
  getLocalizedSolutionChild,
  getLocalizedSolutionGroup,
} from "@/content/i18n";
import { getGroupLabel } from "@/components/solutions/solution-labels";
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

  const products = getLocalizedProductsByCategory(slug, locale);
  const image = products[0]?.image;

  return {
    context: {
      title: category.label,
      description: category.description,
      image,
    } satisfies SeoTemplateContext,
  };
}

export async function getSolutionGroupSeoContext(slug: string, locale: Locale) {
  const group = getLocalizedSolutionGroup(slug, locale);
  if (!group) return null;

  return {
    context: {
      title: getGroupLabel(group),
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

  return {
    context: {
      title: child.label,
      description: child.excerpt,
      excerpt: child.excerpt,
      group: getGroupLabel(group),
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
