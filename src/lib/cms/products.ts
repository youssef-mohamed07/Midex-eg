import "server-only";

import type { Locale } from "@/i18n/routing";
import { sanityFetch } from "@/lib/cms/fetch";
import {
  imageUrl,
  loc,
  locList,
  locOptional,
  pageHeroProjection,
} from "@/lib/cms/fragments";
import type {
  Product,
  ProductCategoryDetails,
  ProductCategoryInfo,
  ProductCategoryPage,
} from "@/lib/cms/types";

const productProjection = `{
  "slug": slug.current,
  "title": ${loc("title")},
  "category": category->slug.current,
  "subcategory": ${locOptional("subcategory")},
  "excerpt": ${loc("excerpt")},
  "description": ${loc("description")},
  "applications": ${locOptional("applications")},
  "image": ${imageUrl("image")},
  "gallery": gallery[].asset->url,
  "highlights": ${locList("highlights")},
  "specs": coalesce(specs[]{
    "label": ${loc("label")},
    "value": ${loc("value")}
  }, []),
  "relatedSolution": solutionChild->{
    "slug": slug.current,
    "label": ${loc("label")},
    "groupSlug": group->slug.current
  }
}`;

export async function getProducts(locale: Locale): Promise<Product[]> {
  return sanityFetch<Product[]>({
    query: `*[_type == "product"] | order(order asc) ${productProjection}`,
    params: { locale },
    tags: ["product", "productCategory"],
  });
}

export async function getProduct(slug: string, locale: Locale): Promise<Product | undefined> {
  const product = await sanityFetch<Product | null>({
    query: `*[_type == "product" && slug.current == $slug][0] ${productProjection}`,
    params: { locale, slug },
    tags: ["product", "productCategory"],
  });
  return product ?? undefined;
}

export async function getProductsByCategory(
  category: string | undefined,
  locale: Locale,
): Promise<Product[]> {
  if (!category) return getProducts(locale);
  return sanityFetch<Product[]>({
    query: `*[_type == "product" && category->slug.current == $category] | order(order asc) ${productProjection}`,
    params: { locale, category },
    tags: ["product", "productCategory"],
  });
}

export async function getProductCategories(
  locale: Locale,
): Promise<Record<string, ProductCategoryInfo>> {
  const categories = await sanityFetch<
    { slug: string; label: string; description: string; image: string }[]
  >({
    query: `*[_type == "productCategory"] | order(order asc) {
      "slug": slug.current,
      "label": ${loc("label")},
      "description": ${loc("description")},
      "image": ${imageUrl("image")}
    }`,
    params: { locale },
    tags: ["productCategory"],
  });

  return Object.fromEntries(
    categories.map(({ slug, label, description, image }) => [
      slug,
      { label, description, image: image || undefined },
    ]),
  );
}

export async function getProductCategory(
  category: string,
  locale: Locale,
): Promise<ProductCategoryPage | undefined> {
  const row = await sanityFetch<ProductCategoryPage | null>({
    query: `*[_type == "productCategory" && slug.current == $category][0]{
      "label": ${loc("label")},
      "description": ${loc("description")},
      "image": ${imageUrl("image")},
      "hero": ${pageHeroProjection("hero")}
    }`,
    params: { locale, category },
    tags: ["productCategory"],
  });
  return row ?? undefined;
}

export async function getProductCategoryDetails(
  category: string,
  locale: Locale,
): Promise<ProductCategoryDetails> {
  const details = await sanityFetch<ProductCategoryDetails | null>({
    query: `*[_type == "productCategory" && slug.current == $category][0]{
      "highlights": ${locList("highlights")},
      "specs": coalesce(specs[]{
        "label": ${loc("label")},
        "value": ${loc("value")}
      }, [])
    }`,
    params: { locale, category },
    tags: ["productCategory"],
  });
  return details ?? { highlights: [], specs: [] };
}

export async function getAllProductSlugs(): Promise<string[]> {
  const rows = await sanityFetch<{ slug: string }[]>({
    query: `*[_type == "product"] | order(order asc) { "slug": slug.current }`,
    tags: ["product"],
  });
  return rows.map((row) => row.slug);
}

export async function getAllProductCategorySlugs(): Promise<string[]> {
  const rows = await sanityFetch<{ slug: string }[]>({
    query: `*[_type == "productCategory"] | order(order asc) { "slug": slug.current }`,
    tags: ["productCategory"],
  });
  return rows.map((row) => row.slug);
}
