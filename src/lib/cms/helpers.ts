import type { CaseStudy, Product } from "@/lib/cms/types";

/** Category image when the category has no products of its own yet. */
const CATEGORY_IMAGE_FALLBACK_PRODUCTS: Record<string, string> = {
  valves: "sanitary-centrifugal-self-priming-pump",
  instruments: "sanitary-non-self-priming-pump",
};

type ProductImageRef = Pick<Product, "slug" | "category" | "image">;

/** Resolves a category tile image from its products or a known fallback product. */
export function getProductCategoryImage(
  categorySlug: string,
  products: readonly ProductImageRef[],
): string | undefined {
  const categoryProduct = products.find((product) => product.category === categorySlug);
  if (categoryProduct?.image) return categoryProduct.image;

  const fallbackSlug = CATEGORY_IMAGE_FALLBACK_PRODUCTS[categorySlug];
  if (!fallbackSlug) return undefined;

  return products.find((product) => product.slug === fallbackSlug)?.image;
}

/** Builds the contact-page URL used by every "request a quote" CTA. */
export function getQuoteUrl(item?: string) {
  const base = "/contact";
  if (!item) return base;
  return `${base}?item=${encodeURIComponent(item)}`;
}

/** Returns the list of gallery images for a product, falling back to the main image. */
export function getProductImages(product: Pick<Product, "image" | "gallery">): string[] {
  if (product.gallery?.length) return product.gallery;
  return [product.image];
}

/** Returns CMS project gallery images for a case study (empty until photos are uploaded). */
export function getCaseStudyGalleryImages(
  study: Pick<CaseStudy, "slug" | "gallery">,
): string[] {
  return (
    study.gallery?.filter((src) => typeof src === "string" && src.trim().length > 0) ?? []
  );
}
