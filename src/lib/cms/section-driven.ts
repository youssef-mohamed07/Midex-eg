/**
 * Section-driven page composition helpers.
 *
 * Pages keep React section components, but render order can be overridden
 * from Sanity via a `sectionOrder` string array. Unknown keys are ignored;
 * missing keys from the CMS order are appended in default order.
 */

export const HOME_SECTION_KEYS = [
  "partners",
  "featuredQuote",
  "capabilities",
  "exclusive",
  "truvia",
  "stats",
  "events",
  "beforeAfter",
  "products",
  "caseStudies",
  "testimonials",
  "services",
  "news",
  "clientLogos",
  "quoteForm",
  "faq",
  "quoteCta",
] as const;

export type HomeSectionKey = (typeof HOME_SECTION_KEYS)[number];

export const DEFAULT_HOME_SECTION_ORDER: HomeSectionKey[] = [...HOME_SECTION_KEYS];

const HOME_KEY_SET = new Set<string>(HOME_SECTION_KEYS);

/**
 * Merge CMS-provided order with the default catalog.
 * - Keeps only known keys
 * - Dedupes
 * - Appends any default keys not listed in CMS
 */
export function resolveSectionOrder<T extends string>(
  cmsOrder: string[] | undefined | null,
  defaults: readonly T[],
  allowed: ReadonlySet<string> = new Set(defaults),
): T[] {
  const seen = new Set<string>();
  const ordered: T[] = [];

  for (const key of cmsOrder ?? []) {
    if (!allowed.has(key) || seen.has(key)) continue;
    seen.add(key);
    ordered.push(key as T);
  }

  for (const key of defaults) {
    if (seen.has(key)) continue;
    seen.add(key);
    ordered.push(key);
  }

  return ordered;
}

export function resolveHomeSectionOrder(
  cmsOrder: string[] | undefined | null,
): HomeSectionKey[] {
  return resolveSectionOrder(cmsOrder, DEFAULT_HOME_SECTION_ORDER, HOME_KEY_SET);
}
