import { getLocale, getTranslations } from "next-intl/server";
import { FaqSection } from "@/components/home/FaqSection";
import { HomeQuoteFormSection } from "@/components/home/HomeQuoteFormSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CaseStudiesExplorer } from "@/components/case-studies/CaseStudiesExplorer";
import { PageHero } from "@/components/layout/PageHero";
import { PageCtaSection } from "@/components/cms/PageCtaSection";
import { PageHeroImage } from "@/components/cms/PageHeroImage";
import { getCaseStudies, getCaseStudiesPageContent } from "@/lib/cms";
import {
  pick,
  resolveFaq,
  resolvePageCta,
  resolvePageHero,
  resolveSectionHeader,
} from "@/lib/cms/section-resolve";
import { type Locale } from "@/i18n/routing";

export async function CaseStudiesPageContent() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const [studies, page] = await Promise.all([
    getCaseStudies(locale),
    getCaseStudiesPageContent(locale),
  ]);

  if (studies.length === 0) return null;

  const hero = resolvePageHero(page.hero, {
    eyebrow: t("caseStudiesBadge"),
    title: t("caseStudiesTitle"),
    subtitle: t("caseStudiesSubtitle"),
  });
  const testimonialsHeader = resolveSectionHeader(page.testimonialsSection, {
    title: t("testimonialsTitle"),
    subtitle: t("testimonialsSubtitle"),
  });
  const quoteFormHeader = resolveSectionHeader(page.quoteFormSection, {
    title: t("quoteFormTitle"),
    subtitle: t("quoteFormSubtitle"),
  });
  const faq = resolveFaq(page.faq, {
    title: t("faqTitle"),
    intro: t("faqSubtitle"),
    items: [1, 2, 3, 4, 5, 6].map((index) => ({
      question: t(`faqQ${index}`),
      answer: t(`faqA${index}`),
    })),
  });
  const explorer = {
    searchPlaceholder: pick(page.explorerLabels?.searchPlaceholder, t("caseStudiesSearchPlaceholder")),
    all: pick(page.explorerLabels?.all, t("caseStudiesFilterAll")),
    year: pick(page.explorerLabels?.year, t("caseStudiesFilterYear")),
    capability: pick(page.explorerLabels?.capability, t("caseStudiesFilterCapability")),
    industry: pick(page.explorerLabels?.industry, t("caseStudiesFilterIndustry")),
    results: pick(page.explorerLabels?.results, t("caseStudiesResults")),
    noResults: pick(page.explorerLabels?.noResults, t("caseStudiesNoResults")),
    clearFilters: pick(page.explorerLabels?.clearFilters, t("caseStudiesClearFilters")),
    read: pick(page.explorerLabels?.read, t("caseStudiesRead")),
  };
  const countLabel = pick(page.explorerLabels?.countLabel, t("caseStudiesBadge"));
  const contactLabel = pick(page.explorerLabels?.contactLabel, t("faqContact"));
  const cta = resolvePageCta(page.cta, {
    title: t("quoteTitle"),
    text: t("quoteText"),
    primaryCta: t("quoteButton"),
    primaryCtaHref: "/contact",
  });

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        compact
        mediaAlign="center"
        media={<PageHeroImage src={hero.image} alt={hero.title} />}
      >
        <p className="mt-6 text-sm text-white/70 sm:mt-7">
          <strong className="font-semibold text-white">{studies.length}</strong>{" "}
          {countLabel}
        </p>
      </PageHero>

      <section className="mx-section">
        <div className="mx-container">
          <CaseStudiesExplorer
            studies={studies}
            labels={explorer}
          />
        </div>
      </section>

      <TestimonialsSection
        title={testimonialsHeader.title}
        subtitle={testimonialsHeader.subtitle}
        locale={locale}
      />

      <HomeQuoteFormSection
        title={quoteFormHeader.title}
        subtitle={quoteFormHeader.subtitle}
        copy={page.quoteFormCopy}
      />

      <FaqSection content={faq} contactLabel={contactLabel} />
      <PageCtaSection content={cta} />
    </>
  );
}
