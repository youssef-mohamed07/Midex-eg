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

/** Default project photos when a case study has no CMS gallery yet. */
const DEFAULT_CASE_STUDY_GALLERY = [
  "/images/services/orbital-welding.png",
  "/images/services/mechanical-polishing.png",
  "/images/services/spray-ball.png",
  "/images/services/mirror-finish.png",
] as const;

const CASE_STUDY_GALLERY_FALLBACKS: Record<string, readonly string[]> = {
  "spimaco-pw-station": [
    "/images/services/spray-ball.png",
    "/images/services/orbital-welding.png",
    "/images/services/welding-docs.png",
  ],
  "mars-wrigley-soft-water": [
    "/images/services/orbital-welding.png",
    "/images/services/mechanical-polishing.png",
    "/images/services/pickling-passivation.png",
  ],
  "vacsera-ro-edi": [
    "/images/services/orbital-welding.png",
    "/images/services/mirror-finish.png",
    "/images/services/welding-docs.png",
  ],
  "otsuka-pw-network": [
    "/images/services/orbital-welding.png",
    "/images/services/spray-ball.png",
    "/images/services/mechanical-polishing.png",
  ],
};

/** Returns project gallery images for a case study. */
export function getCaseStudyGalleryImages(
  study: Pick<CaseStudy, "slug" | "gallery">,
): string[] {
  const gallery = study.gallery?.filter((src) => typeof src === "string" && src.trim().length > 0) ?? [];
  if (gallery.length > 0) return gallery;

  const fallback = CASE_STUDY_GALLERY_FALLBACKS[study.slug];
  return fallback ? [...fallback] : [...DEFAULT_CASE_STUDY_GALLERY];
}
