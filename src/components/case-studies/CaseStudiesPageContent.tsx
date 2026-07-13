import { getLocale, getTranslations } from "next-intl/server";
import { FaqSection } from "@/components/home/FaqSection";
import { HomeQuoteFormSection } from "@/components/home/HomeQuoteFormSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CaseStudiesExplorer } from "@/components/case-studies/CaseStudiesExplorer";
import { PageHero } from "@/components/layout/PageHero";
import { getCaseStudies, getHomePageSections } from "@/lib/cms";
import {
  resolveFaq,
  resolveSectionHeader,
} from "@/lib/cms/section-resolve";
import { type Locale } from "@/i18n/routing";

export async function CaseStudiesPageContent() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const [studies, sections] = await Promise.all([
    getCaseStudies(locale),
    getHomePageSections(locale),
  ]);

  if (studies.length === 0) return null;

  const testimonialsHeader = resolveSectionHeader(sections.testimonialsSection, {
    title: t("testimonialsTitle"),
    subtitle: t("testimonialsSubtitle"),
  });
  const quoteFormHeader = resolveSectionHeader(sections.quoteFormSection, {
    title: t("quoteFormTitle"),
    subtitle: t("quoteFormSubtitle"),
  });
  const faq = resolveFaq(sections.faq, {
    title: t("faqTitle"),
    intro: t("faqSubtitle"),
    items: [1, 2, 3, 4, 5, 6].map((index) => ({
      question: t(`faqQ${index}`),
      answer: t(`faqA${index}`),
    })),
  });

  return (
    <>
      <PageHero
        eyebrow={t("caseStudiesBadge")}
        title={t("caseStudiesTitle")}
        subtitle={t("caseStudiesSubtitle")}
        compact
      >
        <p className="mt-6 text-sm text-white/70 sm:mt-7">
          <strong className="font-semibold text-white">{studies.length}</strong>{" "}
          {t("caseStudiesBadge")}
        </p>
      </PageHero>

      <section className="mx-section">
        <div className="mx-container">
          <CaseStudiesExplorer
            studies={studies}
            labels={{
              searchPlaceholder: t("caseStudiesSearchPlaceholder"),
              all: t("caseStudiesFilterAll"),
              year: t("caseStudiesFilterYear"),
              capability: t("caseStudiesFilterCapability"),
              industry: t("caseStudiesFilterIndustry"),
              results: t("caseStudiesResults"),
              noResults: t("caseStudiesNoResults"),
              clearFilters: t("caseStudiesClearFilters"),
              read: t("caseStudiesRead"),
            }}
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
        copy={sections.quoteFormCopy}
      />

      <FaqSection content={faq} contactLabel={t("faqContact")} />
    </>
  );
}
