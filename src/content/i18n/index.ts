import type { Locale } from "@/i18n/routing";
import {
  products as baseProducts,
  productCategories as baseProductCategories,
  getProductCategoryDetails,
  type Product,
} from "@/content/products";
import {
  solutionGroups as baseSolutionGroups,
  solutionGroupHighlights as baseSolutionGroupHighlights,
  orderSolutionGroups,
  type SolutionChild,
  type SolutionGroup,
} from "@/content/solutions";
import {
  attachPrincipleImages,
  solutionGroupPrinciplesBase,
  type SolutionGroupPrinciplesContent,
} from "@/content/solution-group-principles";
import {
  attachWorkflowImages,
  solutionGroupWorkflowBase,
  type SolutionGroupWorkflowContent,
} from "@/content/solution-group-workflow";
import {
  solutionGroupFaqBase,
  type SolutionGroupFaqContent,
} from "@/content/solution-group-faq";
import {
  buildSolutionChildPageContent,
  getSolutionChildPageKey,
  solutionChildPagesBase,
  type SolutionChildPageContent,
} from "@/content/solution-child-pages";
import {
  buildSolutionGroupCards,
  buildSolutionGroupNav,
  buildSolutionServiceCards,
} from "@/components/solutions/solution-group-cards";
import {
  services as baseServices,
  newsItems as baseNewsItems,
  caseStudies as baseCaseStudies,
  events as baseEvents,
  testimonials as baseTestimonials,
  blogPosts as baseBlogPosts,
  type EventItem,
  type BlogPost,
} from "@/content/site";
import { contentAr } from "./ar";
import { contentDe } from "./de";
import type { LocaleContent } from "./types";

const localeContent: Partial<Record<Locale, LocaleContent>> = {
  ar: contentAr,
  de: contentDe,
};

function getContent(locale: Locale): LocaleContent | null {
  return localeContent[locale] ?? null;
}

export function getLocalizedProductCategories(locale: Locale) {
  const content = getContent(locale);
  return Object.fromEntries(
    Object.entries(baseProductCategories).map(([slug, cat]) => {
      const translated = content?.productCategories[slug];
      return [
        slug,
        {
          label: translated?.label ?? cat.label,
          description: translated?.description ?? cat.description,
        },
      ];
    }),
  );
}

export function getLocalizedProducts(locale: Locale): Product[] {
  const content = getContent(locale);
  return baseProducts.map((product) => {
    const translated = content?.products[product.slug];
    return {
      ...product,
      title: translated?.title ?? product.title,
      excerpt: translated?.excerpt ?? product.excerpt,
      description: translated?.description ?? product.description,
    };
  });
}

export function getLocalizedProduct(slug: string, locale: Locale) {
  return getLocalizedProducts(locale).find((product) => product.slug === slug);
}

export function getLocalizedProductsByCategory(category: string | undefined, locale: Locale) {
  const list = getLocalizedProducts(locale);
  if (!category) return list;
  return list.filter((product) => product.category === category);
}

export function getLocalizedProductCategoryDetails(category: string, locale: Locale) {
  const base = getProductCategoryDetails(category);
  const content = getContent(locale);
  const translated = content?.productCategoryDetails?.[category];

  return {
    highlights: translated?.highlights ?? base.highlights,
    specs: translated?.specs ?? base.specs,
  };
}

export function getLocalizedServices(locale: Locale) {
  const content = getContent(locale);
  return baseServices.map((service, index) => {
    const translated = content?.services[index];
    return {
      ...service,
      title: translated?.title ?? service.title,
      excerpt: translated?.excerpt ?? service.excerpt,
    };
  });
}

export function getLocalizedNewsItems(locale: Locale) {
  const content = getContent(locale);
  return baseNewsItems.map((item, index) => {
    const translated = content?.newsItems[index];
    return {
      ...item,
      title: translated?.title ?? item.title,
      excerpt: translated?.excerpt ?? item.excerpt,
    };
  });
}

export function getLocalizedCaseStudies(locale: Locale) {
  const content = getContent(locale);
  return baseCaseStudies.map((item, index) => {
    const translated = content?.caseStudies[index];
    return {
      ...item,
      industry: translated?.industry ?? item.industry,
      scope: translated?.scope ?? item.scope,
      outcome: translated?.outcome ?? item.outcome,
      statLabel: translated?.statLabel ?? item.statLabel,
      tags: translated?.tags ?? item.tags,
    };
  });
}

export function getLocalizedEvents(locale: Locale): EventItem[] {
  const content = getContent(locale);
  return baseEvents.map((event) => {
    const translated = content?.events[event.src];
    return {
      ...event,
      title: translated?.title ?? event.title,
      subtitle: translated?.subtitle ?? event.subtitle,
    };
  });
}

export function getLocalizedTestimonials(locale: Locale) {
  const content = getContent(locale);
  return baseTestimonials.map((item, index) => {
    const translated = content?.testimonials[index];
    return {
      ...item,
      role: translated?.role ?? item.role,
      quote: translated?.quote ?? item.quote,
    };
  });
}

export function getLocalizedBlogPosts(locale: Locale): BlogPost[] {
  const content = getContent(locale);
  return baseBlogPosts.map((post) => {
    const translated = content?.blogPosts[post.slug];
    return {
      ...post,
      title: translated?.title ?? post.title,
      excerpt: translated?.excerpt ?? post.excerpt,
      category: translated?.category ?? post.category,
      body: translated?.body ?? post.body,
    };
  });
}

export function getLocalizedBlogPost(slug: string, locale: Locale) {
  return getLocalizedBlogPosts(locale).find((post) => post.slug === slug);
}

function localizeSolutionChild(
  child: SolutionChild,
  groupSlug: string,
  content: LocaleContent | null,
): SolutionChild {
  const translated = content?.solutionGroups[groupSlug]?.children[child.slug];
  return {
    ...child,
    label: translated?.label ?? child.label,
    excerpt: translated?.excerpt ?? child.excerpt,
    intro: translated?.intro ?? child.intro,
  };
}

export function getLocalizedSolutionGroups(locale: Locale): SolutionGroup[] {
  const content = getContent(locale);
  const groups = baseSolutionGroups.map((group) => {
    const translated = content?.solutionGroups[group.slug];
    return {
      ...group,
      label: translated?.label ?? group.label,
      heroTitle: translated?.heroTitle ?? group.heroTitle,
      servicesSectionTitle: translated?.servicesSectionTitle ?? group.servicesSectionTitle,
      servicesSectionIntro: translated?.servicesSectionIntro ?? group.servicesSectionIntro,
      description: translated?.description ?? group.description,
      intro: translated?.intro ?? group.intro,
      children: group.children.map((child) =>
        localizeSolutionChild(child, group.slug, content),
      ),
    };
  });

  return orderSolutionGroups(groups);
}

export function getLocalizedSolutionGroup(slug: string, locale: Locale) {
  return getLocalizedSolutionGroups(locale).find((group) => group.slug === slug);
}

export function getLocalizedSolutionChild(
  groupSlug: string,
  childSlug: string,
  locale: Locale,
) {
  const group = getLocalizedSolutionGroup(groupSlug, locale);
  return group?.children.find((child) => child.slug === childSlug);
}

export function getLocalizedSolutionGroupHighlights(groupSlug: string, locale: Locale) {
  const content = getContent(locale);
  return content?.solutionGroupHighlights[groupSlug] ?? baseSolutionGroupHighlights[groupSlug as keyof typeof baseSolutionGroupHighlights] ?? [];
}

export function getLocalizedSolutionGroupPrinciples(
  groupSlug: string,
  locale: Locale,
): SolutionGroupPrinciplesContent | null {
  const base = solutionGroupPrinciplesBase[groupSlug as keyof typeof solutionGroupPrinciplesBase];
  if (!base) return null;

  const content = getContent(locale);
  const translated = content?.solutionGroupPrinciples?.[groupSlug];

  const items = attachPrincipleImages(
    base.items.map((item) => {
      const itemTranslation = translated?.items[item.id];
      return {
        ...item,
        title: itemTranslation?.title ?? item.title,
        text: itemTranslation?.text ?? item.text,
      };
    }),
  );

  return {
    title: translated?.title ?? base.title,
    intro: translated?.intro ?? base.intro,
    items,
  };
}

export function getLocalizedSolutionGroupWorkflow(
  groupSlug: string,
  locale: Locale,
): SolutionGroupWorkflowContent | null {
  const base = solutionGroupWorkflowBase[groupSlug as keyof typeof solutionGroupWorkflowBase];
  if (!base) return null;

  const content = getContent(locale);
  const translated = content?.solutionGroupWorkflow?.[groupSlug];

  const steps = attachWorkflowImages(
    base.steps.map((step) => {
      const stepTranslation = translated?.steps[step.id];
      return {
        ...step,
        title: stepTranslation?.title ?? step.title,
        text: stepTranslation?.text ?? step.text,
      };
    }),
  );

  return {
    title: translated?.title ?? base.title,
    intro: translated?.intro ?? base.intro,
    steps,
  };
}

export function getLocalizedSolutionGroupFaq(
  groupSlug: string,
  locale: Locale,
): SolutionGroupFaqContent | null {
  const base = solutionGroupFaqBase[groupSlug as keyof typeof solutionGroupFaqBase];
  if (!base) return null;

  const content = getContent(locale);
  const translated = content?.solutionGroupFaq?.[groupSlug];

  const items = base.items.map((item) => {
    const itemTranslation = translated?.items[item.id];
    return {
      ...item,
      question: itemTranslation?.question ?? item.question,
      answer: itemTranslation?.answer ?? item.answer,
    };
  });

  return {
    title: translated?.title ?? base.title,
    intro: translated?.intro ?? base.intro,
    items,
  };
}

export function getLocalizedSolutionChildPage(
  groupSlug: string,
  childSlug: string,
  locale: Locale,
): SolutionChildPageContent | null {
  const key = getSolutionChildPageKey(groupSlug, childSlug);
  const base = solutionChildPagesBase[key];
  if (!base) return null;

  const content = getContent(locale);
  const translated = content?.solutionChildPages?.[key];

  const built = buildSolutionChildPageContent(base);

  const principlesItems = base.principles.items.map((item) => {
    const itemTranslation = translated?.principles?.items[item.id];
    return {
      ...item,
      title: itemTranslation?.title ?? item.title,
      text: itemTranslation?.text ?? item.text,
    };
  });

  const workflowSteps = base.workflow.steps.map((step) => {
    const stepTranslation = translated?.workflow?.steps[step.id];
    return {
      ...step,
      title: stepTranslation?.title ?? step.title,
      text: stepTranslation?.text ?? step.text,
    };
  });

  const faqItems = base.faq.items.map((item) => {
    const itemTranslation = translated?.faq?.items[item.id];
    return {
      ...item,
      question: itemTranslation?.question ?? item.question,
      answer: itemTranslation?.answer ?? item.answer,
    };
  });

  return {
    heroTitle: translated?.heroTitle ?? base.heroTitle,
    heroSubtitle: translated?.heroSubtitle ?? base.heroSubtitle,
    heroCtaLabel: translated?.heroCtaLabel ?? base.heroCtaLabel,
    overviewTitle: translated?.overviewTitle ?? base.overviewTitle,
    overviewIntro: translated?.overviewIntro ?? base.overviewIntro,
    overviewItems: translated?.overviewItems ?? base.overviewItems,
    relatedSectionTitle: translated?.relatedSectionTitle ?? base.relatedSectionTitle,
    principles: {
      title: translated?.principles?.title ?? built.principles.title,
      intro: translated?.principles?.intro ?? built.principles.intro,
      items: attachPrincipleImages(principlesItems),
    },
    workflow: {
      title: translated?.workflow?.title ?? built.workflow.title,
      intro: translated?.workflow?.intro ?? built.workflow.intro,
      steps: attachWorkflowImages(workflowSteps),
    },
    faq: {
      title: translated?.faq?.title ?? base.faq.title,
      intro: translated?.faq?.intro ?? base.faq.intro,
      items: faqItems,
    },
  };
}

export function getLocalizedSolutionGroupCards(locale: Locale) {
  const groups = getLocalizedSolutionGroups(locale);
  const highlightsByGroup = Object.fromEntries(
    groups.map((group) => [group.slug, getLocalizedSolutionGroupHighlights(group.slug, locale)]),
  );

  return buildSolutionGroupCards(groups, highlightsByGroup);
}

export function getLocalizedSolutionServiceCards(groupSlug: string, locale: Locale) {
  const group = getLocalizedSolutionGroup(groupSlug, locale);
  if (!group) return [];
  return buildSolutionServiceCards(group);
}

export function getLocalizedSolutionGroupNav(locale: Locale) {
  return buildSolutionGroupNav(getLocalizedSolutionGroups(locale));
}
