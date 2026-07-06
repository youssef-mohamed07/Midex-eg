import type { HomeSolutionCard } from "@/components/home/HomeSolutionsAccordion";
import type { SolutionGroup } from "@/content/solutions";

export type SolutionGroupNav = {
  slug: string;
  label: string;
  description: string;
  image: string;
  href: string;
  serviceCount: number;
  children: { slug: string; label: string; href: string }[];
};

export function buildSolutionGroupNav(groups: SolutionGroup[]): SolutionGroupNav[] {
  return groups.map((group) => ({
    slug: group.slug,
    label: group.label,
    description: group.description,
    image: group.image,
    href: `/solutions/group/${group.slug}`,
    serviceCount: group.children.length,
    children: group.children.map((child) => ({
      slug: child.slug,
      label: child.label,
      href: `/solutions/group/${group.slug}/${child.slug}`,
    })),
  }));
}

export function buildSolutionServiceCards(
  group: SolutionGroup,
): HomeSolutionCard[] {
  return group.children.map((child) => ({
    slug: child.slug,
    label: child.label,
    description: child.excerpt,
    image: child.image,
    href: `/solutions/group/${group.slug}/${child.slug}`,
    tags: [],
    serviceCount: 0,
  }));
}

export function buildSolutionGroupCards(
  groups: SolutionGroup[],
  highlightsByGroup: Record<string, string[]>,
): HomeSolutionCard[] {
  return groups.map((group) => {
    const items = group.children.map((child) => child.label);
    const highlights = highlightsByGroup[group.slug] ?? [];

    return {
      slug: group.slug,
      label: group.label,
      description: group.description,
      image: group.image,
      href: `/solutions/group/${group.slug}`,
      tags: highlights.slice(0, 2),
      serviceCount: items.length,
      items,
    };
  });
}
