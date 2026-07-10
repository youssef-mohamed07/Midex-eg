/**
 * Builds engineering capability cards for home/solutions.
 * User-facing copy comes from Sanity `capabilitiesSection.cards` when present;
 * otherwise falls back to next-intl / uiMessages keys (not hardcoded prose).
 */
import type { HomeSolutionCard } from "@/components/home/HomeSolutionsAccordion";
import type { EngineeringCapabilityCardContent } from "@/lib/cms/types";

export const ENGINEERING_CAPABILITY_SLUGS = [
  "solutions",
  "welding",
  "systems",
  "installations",
] as const;

export type EngineeringCapabilitySlug = (typeof ENGINEERING_CAPABILITY_SLUGS)[number];

const TITLE_KEYS: Record<EngineeringCapabilitySlug, string> = {
  solutions: "capabilityGroup1Title",
  welding: "capabilityGroup2Title",
  systems: "capabilityGroup3Title",
  installations: "capabilityGroup4Title",
};

const DESCRIPTION_KEYS: Record<EngineeringCapabilitySlug, string> = {
  solutions: "capabilityGroup1Description",
  welding: "capabilityGroup2Description",
  systems: "capabilityGroup3Description",
  installations: "capabilityGroup4Description",
};

const ITEM_KEYS: Record<EngineeringCapabilitySlug, string[]> = {
  solutions: ["capabilityGroup1Item1", "capabilityGroup1Item2", "capabilityGroup1Item3"],
  welding: ["capabilityGroup2Item1", "capabilityGroup2Item2"],
  systems: [
    "capabilityGroup3Item1",
    "capabilityGroup3Item2",
    "capabilityGroup3Item3",
    "capabilityGroup3Item4",
    "capabilityGroup3Item5",
  ],
  installations: [
    "capabilityGroup4Item1",
    "capabilityGroup4Item2",
    "capabilityGroup4Item3",
    "capabilityGroup4Item4",
  ],
};

type CmsGroup = {
  slug: string;
  image: string;
};

function isKnownSlug(slug: string): slug is EngineeringCapabilitySlug {
  return (ENGINEERING_CAPABILITY_SLUGS as readonly string[]).includes(slug);
}

function resolveSlugOrder(cmsCards?: EngineeringCapabilityCardContent[]): string[] {
  const cmsSlugs = (cmsCards ?? [])
    .map((card) => card.slug?.trim())
    .filter((slug): slug is string => Boolean(slug));

  if (cmsSlugs.length > 0) return cmsSlugs;
  return [...ENGINEERING_CAPABILITY_SLUGS];
}

export function buildEngineeringCapabilityCards(
  t: (key: string) => string,
  cmsGroups: CmsGroup[],
  cmsCards?: EngineeringCapabilityCardContent[],
): HomeSolutionCard[] {
  const cmsBySlug = new Map(cmsGroups.map((group) => [group.slug, group]));
  const cardBySlug = new Map(
    (cmsCards ?? [])
      .filter((card) => card.slug?.trim())
      .map((card) => [card.slug.trim(), card]),
  );

  return resolveSlugOrder(cmsCards).map((slug) => {
    const cmsCard = cardBySlug.get(slug);
    const cms = cmsBySlug.get(slug);
    const fallbackItems = isKnownSlug(slug) ? ITEM_KEYS[slug].map((key) => t(key)) : [];
    const items = cmsCard?.items?.length ? cmsCard.items : fallbackItems;

    const label =
      cmsCard?.title?.trim() ||
      (isKnownSlug(slug) ? t(TITLE_KEYS[slug]) : slug);
    const description =
      cmsCard?.description?.trim() ||
      (isKnownSlug(slug) ? t(DESCRIPTION_KEYS[slug]) : "");

    return {
      slug,
      label,
      description,
      image: cms?.image ?? "/images/hero/slide-1.png",
      href: cmsCard?.href?.trim() || `/solutions/group/${slug}`,
      tags: [],
      serviceCount: items.length,
      items,
    };
  });
}
