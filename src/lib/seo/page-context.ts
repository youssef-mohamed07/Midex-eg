import {
  getBlogPost,
  getProduct,
  getProductCategories,
  getProductsByCategory,
  getSolutionGroup,
} from "@/lib/cms";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import type { Locale } from "@/i18n/routing";
import type { SeoTemplateContext } from "@/lib/seo/types";

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
  const group = await getSolutionGroup(slug, locale);
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
  const group = await getSolutionGroup(groupSlug, locale);
  const child = group?.children.find((item) => item.slug === childSlug);
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
