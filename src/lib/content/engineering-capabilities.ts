import type { HomeSolutionCard } from "@/components/home/HomeSolutionsAccordion";

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

export function buildEngineeringCapabilityCards(
  t: (key: string) => string,
  cmsGroups: CmsGroup[],
): HomeSolutionCard[] {
  const cmsBySlug = new Map(cmsGroups.map((group) => [group.slug, group]));

  return ENGINEERING_CAPABILITY_SLUGS.map((slug) => {
    const cms = cmsBySlug.get(slug);
    const items = ITEM_KEYS[slug].map((key) => t(key));

    return {
      slug,
      label: t(TITLE_KEYS[slug]),
      description: t(DESCRIPTION_KEYS[slug]),
      image: cms?.image ?? "/images/hero/slide-1.png",
      href: `/solutions/group/${slug}`,
      tags: [],
      serviceCount: items.length,
      items,
    };
  });
}
