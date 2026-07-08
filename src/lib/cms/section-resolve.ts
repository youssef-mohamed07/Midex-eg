import type {
  BeforeAfterContent,
  FaqSectionContent,
  PageCtaContent,
  PageHeroContent,
  PromoSectionContent,
  QuoteBlockContent,
  SectionHeaderContent,
  TimelineSectionContent,
  ProductExplorerLabels,
  ProductDetailLabels,
  SolutionChildLabels,
} from "@/lib/cms/types";

export type { SectionHeaderContent, FaqSectionContent } from "@/lib/cms/types";

/** Prefer CMS string; fall back to bundled i18n. */
export function pick(cms: string | undefined | null, fallback: string): string {
  const value = cms?.trim();
  return value ? value : fallback;
}

export function isSectionEnabled(enabled: boolean | undefined, fallback = true): boolean {
  return enabled ?? fallback;
}

export function resolveSectionHeader(
  cms: SectionHeaderContent | undefined | null,
  fallback: { title: string; subtitle?: string; eyebrow?: string; image?: string },
): SectionHeaderContent & { title: string; subtitle: string; eyebrow: string } {
  return {
    enabled: cms?.enabled,
    eyebrow: pick(cms?.eyebrow, fallback.eyebrow ?? ""),
    title: pick(cms?.title, fallback.title),
    subtitle: pick(cms?.subtitle, fallback.subtitle ?? ""),
    image: cms?.image || fallback.image,
  };
}

export function resolvePageHero(
  cms: PageHeroContent | undefined | null,
  fallback: PageHeroContent,
): Required<Pick<PageHeroContent, "title">> & PageHeroContent {
  return {
    eyebrow: pick(cms?.eyebrow, fallback.eyebrow ?? ""),
    title: pick(cms?.title, fallback.title ?? ""),
    subtitle: pick(cms?.subtitle, fallback.subtitle ?? ""),
    badge: pick(cms?.badge, fallback.badge ?? ""),
    primaryCta: pick(cms?.primaryCta, fallback.primaryCta ?? ""),
    primaryCtaHref: cms?.primaryCtaHref || fallback.primaryCtaHref,
    secondaryCta: pick(cms?.secondaryCta, fallback.secondaryCta ?? ""),
    secondaryCtaHref: cms?.secondaryCtaHref || fallback.secondaryCtaHref,
    image: cms?.image || fallback.image,
  };
}

export function resolveFaq(
  cms: FaqSectionContent | undefined | null,
  fallback: FaqSectionContent,
): FaqSectionContent & { title: string; intro: string; items: { question: string; answer: string }[] } {
  const items =
    cms?.items?.length
      ? cms.items.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))
      : (fallback.items ?? []);

  return {
    enabled: cms?.enabled,
    title: pick(cms?.title, fallback.title ?? ""),
    intro: pick(cms?.intro, fallback.intro ?? ""),
    items,
  };
}

export function resolveQuoteBlock(
  cms: QuoteBlockContent | undefined | null,
  fallback: QuoteBlockContent,
): QuoteBlockContent & { quote: string; name: string; role: string } {
  return {
    enabled: cms?.enabled,
    quote: pick(cms?.quote, fallback.quote ?? ""),
    name: pick(cms?.name, fallback.name ?? ""),
    role: pick(cms?.role, fallback.role ?? ""),
    image: cms?.image || fallback.image,
  };
}

export function resolveBeforeAfter(
  cms: BeforeAfterContent | undefined | null,
  fallback: BeforeAfterContent,
): BeforeAfterContent & { title: string; subtitle: string; beforeItems: string[]; afterItems: string[] } {
  return {
    enabled: cms?.enabled,
    title: pick(cms?.title, fallback.title ?? ""),
    subtitle: pick(cms?.subtitle, fallback.subtitle ?? ""),
    beforeTitle: pick(cms?.beforeTitle, fallback.beforeTitle ?? ""),
    afterTitle: pick(cms?.afterTitle, fallback.afterTitle ?? ""),
    beforeItems: cms?.beforeItems?.length ? cms.beforeItems : (fallback.beforeItems ?? []),
    afterItems: cms?.afterItems?.length ? cms.afterItems : (fallback.afterItems ?? []),
    beforeImage: cms?.beforeImage || fallback.beforeImage,
    afterImage: cms?.afterImage || fallback.afterImage,
  };
}

export function resolvePromo(
  cms: PromoSectionContent | undefined | null,
  fallback: PromoSectionContent,
): PromoSectionContent & { title: string; body: string; ctaLabel: string; ctaHref: string } {
  return {
    enabled: cms?.enabled,
    eyebrow: pick(cms?.eyebrow, fallback.eyebrow ?? ""),
    title: pick(cms?.title, fallback.title ?? ""),
    body: pick(cms?.body, fallback.body ?? ""),
    ctaLabel: pick(cms?.ctaLabel, fallback.ctaLabel ?? ""),
    ctaHref: cms?.ctaHref || fallback.ctaHref || "",
    image: cms?.image || fallback.image,
    secondaryImage: cms?.secondaryImage || fallback.secondaryImage,
    features: cms?.features?.length ? cms.features : fallback.features,
  };
}

export function resolvePageCta(
  cms: PageCtaContent | undefined | null,
  fallback: PageCtaContent,
): PageCtaContent & { title: string; text: string } {
  return {
    enabled: cms?.enabled,
    title: pick(cms?.title, fallback.title ?? ""),
    text: pick(cms?.text, fallback.text ?? ""),
    primaryCta: pick(cms?.primaryCta, fallback.primaryCta ?? ""),
    primaryCtaHref: cms?.primaryCtaHref || fallback.primaryCtaHref,
    secondaryCta: pick(cms?.secondaryCta, fallback.secondaryCta ?? ""),
    secondaryCtaHref: cms?.secondaryCtaHref || fallback.secondaryCtaHref,
    image: cms?.image || fallback.image,
  };
}

export function resolveTimelineSection(
  cms: TimelineSectionContent | undefined | null,
  fallback: TimelineSectionContent,
): TimelineSectionContent & { title: string; subtitle: string } {
  return {
    enabled: cms?.enabled,
    title: pick(cms?.title, fallback.title ?? ""),
    subtitle: pick(cms?.subtitle, fallback.subtitle ?? ""),
    steps: cms?.steps?.length ? cms.steps : fallback.steps,
  };
}

export function resolveProductExplorerLabels(
  cms: ProductExplorerLabels | undefined | null,
  fallback: ProductExplorerLabels,
): Required<ProductExplorerLabels> {
  return {
    allCategories: pick(cms?.allCategories, fallback.allCategories ?? ""),
    viewDetails: pick(cms?.viewDetails, fallback.viewDetails ?? ""),
    requestQuote: pick(cms?.requestQuote, fallback.requestQuote ?? ""),
    quoteShort: pick(cms?.quoteShort, fallback.quoteShort ?? ""),
    noResults: pick(cms?.noResults, fallback.noResults ?? ""),
    searchPlaceholder: pick(cms?.searchPlaceholder, fallback.searchPlaceholder ?? ""),
  };
}

export function resolveProductDetailLabels(
  cms: ProductDetailLabels | undefined | null,
  fallback: ProductDetailLabels,
): Required<ProductDetailLabels> {
  return {
    overviewTitle: pick(cms?.overviewTitle, fallback.overviewTitle ?? ""),
    featuresTitle: pick(cms?.featuresTitle, fallback.featuresTitle ?? ""),
    specificationsTitle: pick(cms?.specificationsTitle, fallback.specificationsTitle ?? ""),
    applicationsTitle: pick(cms?.applicationsTitle, fallback.applicationsTitle ?? ""),
    relatedProductsTitle: pick(cms?.relatedProductsTitle, fallback.relatedProductsTitle ?? ""),
    backToCatalog: pick(cms?.backToCatalog, fallback.backToCatalog ?? ""),
    requestQuote: pick(cms?.requestQuote, fallback.requestQuote ?? ""),
    relatedSolutionTitle: pick(cms?.relatedSolutionTitle, fallback.relatedSolutionTitle ?? ""),
  };
}

export function resolveSolutionChildLabels(
  cms: SolutionChildLabels | undefined | null,
  fallback: SolutionChildLabels,
): Required<SolutionChildLabels> {
  return {
    introductionTitle: pick(cms?.introductionTitle, fallback.introductionTitle ?? ""),
    capabilitiesTitle: pick(cms?.capabilitiesTitle, fallback.capabilitiesTitle ?? ""),
    relatedServicesTitle: pick(cms?.relatedServicesTitle, fallback.relatedServicesTitle ?? ""),
    heroCtaLabel: pick(cms?.heroCtaLabel, fallback.heroCtaLabel ?? ""),
    browseGroupLabel: pick(cms?.browseGroupLabel, fallback.browseGroupLabel ?? ""),
  };
}
