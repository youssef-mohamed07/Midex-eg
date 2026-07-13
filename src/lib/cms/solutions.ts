import "server-only";

import {
  buildSolutionGroupCards,
  buildSolutionGroupNav,
  buildSolutionServiceCards,
  type SolutionGroupNav,
} from "@/components/solutions/solution-group-cards";
import type { Locale } from "@/i18n/routing";
import { sanityFetch } from "@/lib/cms/fetch";
import {
  faqProjection,
  imageUrl,
  loc,
  locList,
  locOptional,
  pageCtaProjection,
  principlesProjection,
  solutionChildLabelsProjection,
  workflowProjection,
} from "@/lib/cms/fragments";
import type {
  SolutionChildPageContent,
  SolutionGroup,
  SolutionGroupFaqContent,
  SolutionGroupPrinciplesContent,
  SolutionGroupWorkflowContent,
} from "@/lib/cms/types";
import { sortByEngineeringCapabilityOrder } from "@/lib/content/engineering-capabilities";

const SOLUTION_TAGS = ["solutionGroup", "solutionChild"];

const groupProjection = `{
  "slug": slug.current,
  "label": ${loc("label")},
  "menuLabel": ${locOptional("menuLabel")},
  "heroTitle": ${locOptional("heroTitle")},
  "servicesSectionTitle": ${locOptional("servicesSectionTitle")},
  "servicesSectionIntro": ${locOptional("servicesSectionIntro")},
  "description": ${loc("description")},
  "intro": ${loc("intro")},
  "image": ${imageUrl()},
  "importanceTitle": ${locOptional("importanceTitle")},
  "otherGroupsTitle": ${locOptional("otherGroupsTitle")},
  "heroCtaLabel": ${locOptional("heroCtaLabel")},
  "cta": ${pageCtaProjection("cta")},
  "children": *[_type == "solutionChild" && group._ref == ^._id] | order(order asc) {
    "slug": slug.current,
    "label": ${loc("label")},
    "excerpt": ${loc("excerpt")},
    "intro": ${loc("intro")},
    "image": ${imageUrl()},
    "highlights": ${locList("highlights")},
    "labels": ${solutionChildLabelsProjection("labels")}
  }
}`;

export async function getSolutionGroups(locale: Locale): Promise<SolutionGroup[]> {
  const groups = await sanityFetch<SolutionGroup[]>({
    query: `*[_type == "solutionGroup"] | order(order asc) ${groupProjection}`,
    params: { locale },
    tags: SOLUTION_TAGS,
  });
  return sortByEngineeringCapabilityOrder(groups);
}

export async function getSolutionGroup(
  slug: string,
  locale: Locale,
): Promise<SolutionGroup | undefined> {
  const group = await sanityFetch<SolutionGroup | null>({
    query: `*[_type == "solutionGroup" && slug.current == $slug][0] ${groupProjection}`,
    params: { locale, slug },
    tags: SOLUTION_TAGS,
  });
  return group ?? undefined;
}

export async function getSolutionChild(groupSlug: string, childSlug: string, locale: Locale) {
  const group = await getSolutionGroup(groupSlug, locale);
  return group?.children.find((child) => child.slug === childSlug);
}

export async function getSolutionGroupHighlights(
  groupSlug: string,
  locale: Locale,
): Promise<string[]> {
  const result = await sanityFetch<{ highlights: string[] } | null>({
    query: `*[_type == "solutionGroup" && slug.current == $slug][0]{
      "highlights": ${locList("highlights")}
    }`,
    params: { locale, slug: groupSlug },
    tags: SOLUTION_TAGS,
  });
  return result?.highlights ?? [];
}

async function getAllSolutionGroupHighlights(
  locale: Locale,
): Promise<Record<string, string[]>> {
  const rows = await sanityFetch<{ slug: string; highlights: string[] }[]>({
    query: `*[_type == "solutionGroup"] | order(order asc) {
      "slug": slug.current,
      "highlights": ${locList("highlights")}
    }`,
    params: { locale },
    tags: SOLUTION_TAGS,
  });
  return Object.fromEntries(rows.map((row) => [row.slug, row.highlights]));
}

export async function getSolutionGroupPrinciples(
  groupSlug: string,
  locale: Locale,
): Promise<SolutionGroupPrinciplesContent | null> {
  const result = await sanityFetch<{
    principles: SolutionGroupPrinciplesContent | null;
  } | null>({
    query: `*[_type == "solutionGroup" && slug.current == $slug][0]{
      "principles": ${principlesProjection()}
    }`,
    params: { locale, slug: groupSlug },
    tags: SOLUTION_TAGS,
  });
  return result?.principles ?? null;
}

export async function getSolutionGroupWorkflow(
  groupSlug: string,
  locale: Locale,
): Promise<SolutionGroupWorkflowContent | null> {
  const result = await sanityFetch<{
    workflow: SolutionGroupWorkflowContent | null;
  } | null>({
    query: `*[_type == "solutionGroup" && slug.current == $slug][0]{
      "workflow": ${workflowProjection()}
    }`,
    params: { locale, slug: groupSlug },
    tags: SOLUTION_TAGS,
  });
  return result?.workflow ?? null;
}

export async function getSolutionGroupFaq(
  groupSlug: string,
  locale: Locale,
): Promise<SolutionGroupFaqContent | null> {
  const result = await sanityFetch<{
    faq: SolutionGroupFaqContent | null;
  } | null>({
    query: `*[_type == "solutionGroup" && slug.current == $slug][0]{
      "faq": ${faqProjection()}
    }`,
    params: { locale, slug: groupSlug },
    tags: SOLUTION_TAGS,
  });
  return result?.faq ?? null;
}

export async function getSolutionChildPage(
  groupSlug: string,
  childSlug: string,
  locale: Locale,
): Promise<SolutionChildPageContent | null> {
  const result = await sanityFetch<{
    page: SolutionChildPageContent | null;
  } | null>({
    query: `*[_type == "solutionChild" && slug.current == $childSlug && group->slug.current == $groupSlug][0]{
      "page": page{
        "heroTitle": ${loc("heroTitle")},
        "heroSubtitle": ${loc("heroSubtitle")},
        "heroCtaLabel": ${loc("heroCtaLabel")},
        "overviewTitle": ${loc("overviewTitle")},
        "overviewIntro": ${loc("overviewIntro")},
        "overviewItems": ${locList("overviewItems")},
        "relatedSectionTitle": ${loc("relatedSectionTitle")},
        "principles": ${principlesProjection()},
        "workflow": ${workflowProjection()},
        "faq": ${faqProjection()}
      }
    }`,
    params: { locale, groupSlug, childSlug },
    tags: SOLUTION_TAGS,
  });
  return result?.page ?? null;
}

export async function getAllSolutionGroupSlugs(): Promise<string[]> {
  const rows = await sanityFetch<{ slug: string }[]>({
    query: `*[_type == "solutionGroup"] | order(order asc) { "slug": slug.current }`,
    tags: SOLUTION_TAGS,
  });
  return sortByEngineeringCapabilityOrder(rows).map((row) => row.slug);
}

export async function getAllSolutionChildParams(): Promise<
  { slug: string; child: string }[]
> {
  return sanityFetch<{ slug: string; child: string }[]>({
    query: `*[_type == "solutionChild"] | order(order asc) {
      "slug": group->slug.current,
      "child": slug.current
    }`,
    tags: SOLUTION_TAGS,
  });
}

/** Maps legacy `/solutions/[slug]` URLs to the unified group/child routes. */
export async function resolveLegacySolutionPath(slug: string): Promise<string | null> {
  const groups = await getSolutionGroups("en");
  const group = groups.find((item) => item.slug === slug);
  if (group) return `/solutions/group/${group.slug}`;

  for (const item of groups) {
    const child = item.children.find((entry) => entry.slug === slug);
    if (child) return `/solutions/group/${item.slug}/${child.slug}`;
  }

  return null;
}

/* Derived card / nav builders (shapes consumed by home + header + footer). */

export async function getSolutionGroupCards(locale: Locale) {
  const [groups, highlightsByGroup] = await Promise.all([
    getSolutionGroups(locale),
    getAllSolutionGroupHighlights(locale),
  ]);
  return buildSolutionGroupCards(groups, highlightsByGroup);
}

export async function getSolutionServiceCards(groupSlug: string, locale: Locale) {
  const group = await getSolutionGroup(groupSlug, locale);
  if (!group) return [];
  return buildSolutionServiceCards(group);
}

export async function getSolutionGroupNav(locale: Locale): Promise<SolutionGroupNav[]> {
  return buildSolutionGroupNav(await getSolutionGroups(locale));
}
