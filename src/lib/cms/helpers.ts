import type { Product } from "@/lib/cms/types";

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
