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
export const PRODUCT_SLUG_ALIASES: Record<string, string> = {};

export function resolveProductSlug(principleId: string): string | undefined {
  if (!PRODUCT_LINKED_PRINCIPLE_IDS.has(principleId)) return undefined;
  return PRODUCT_SLUG_ALIASES[principleId] ?? principleId;
}

export function getSolutionPrincipleHref(principleId: string): string | undefined {
  const slug = resolveProductSlug(principleId);
  if (!slug) return undefined;
  return `/products/${slug}`;
}
