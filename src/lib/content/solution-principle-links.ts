/** Principle keys that should link to a product detail page. */
export const PRODUCT_LINKED_PRINCIPLE_IDS = new Set([
  "reverse-osmosis",
  "electrodeionization",
  "ultrafiltration",
  "distillation",
  "hot-water-sanitization",
  "super-heated-water-sanitization",
]);

/** When the product slug differs from the principle key. */
export const PRODUCT_SLUG_ALIASES: Record<string, string> = {
  "reverse-osmosis": "reverse-osmosis-double-pass-station",
};

export function resolveProductSlug(
  principleId: string,
  productSlugs: readonly string[],
): string | undefined {
  if (!PRODUCT_LINKED_PRINCIPLE_IDS.has(principleId)) return undefined;

  const candidates = [PRODUCT_SLUG_ALIASES[principleId], principleId].filter(
    (slug): slug is string => Boolean(slug),
  );

  for (const slug of candidates) {
    if (productSlugs.includes(slug)) return slug;
  }

  return undefined;
}

export function getSolutionPrincipleHref(
  principleId: string,
  productSlugs: readonly string[],
): string | undefined {
  const slug = resolveProductSlug(principleId, productSlugs);
  if (!slug) return undefined;
  return `/products/${slug}`;
}
