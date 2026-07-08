import { getLocale, getTranslations } from "next-intl/server";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { EngineeringCapabilitiesSection } from "@/components/home/EngineeringCapabilitiesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SolutionsPageHero } from "@/components/solutions/SolutionsPageHero";
import { SolutionsCta } from "@/components/solutions/SolutionsCta";
import { SolutionTimelineSection } from "@/components/solutions/SolutionTimelineSection";
import {
  getSolutionGroups,
  getSolutionsPageContent,
  getStats,
} from "@/lib/cms";
import {
  isSectionEnabled,
  pick,
  resolveBeforeAfter,
  resolveFaq,
  resolvePageCta,
  resolvePageHero,
  resolveSectionHeader,
  resolveTimelineSection,
} from "@/lib/cms/section-resolve";
import { type Locale } from "@/i18n/routing";

export async function SolutionsPageContent() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("solutions");
  const th = await getTranslations("home");
  const [solutionGroups, stats, page] = await Promise.all([
    getSolutionGroups(locale),
    getStats(locale),
    getSolutionsPageContent(locale),
  ]);
  const totalServices = solutionGroups.reduce(
    (sum, group) => sum + group.children.length,
    0,
  );

  const hero = resolvePageHero(page.hero, {
    eyebrow: t("title"),
    title: t("heroTitle"),
    subtitle: t("heroSubtitle"),
    primaryCta: th("quoteButton"),
    primaryCtaHref: "/contact",
    secondaryCta: t("allGroups"),
    secondaryCtaHref: "#capabilities",
  });

  const capabilities = resolveSectionHeader(page.capabilitiesSection, {
    title: th("capabilitiesTitle"),
    subtitle: th("capabilitiesSubtitle"),
  });

  const beforeAfter = resolveBeforeAfter(page.beforeAfterSection, {
    title: th("processPerformanceTitle"),
    subtitle: th("beforeAfterTitle"),
    beforeItems: [
      th("processDuring1"),
      th("processDuring2"),
      th("processDuring3"),
      th("processDuring4"),
      th("processDuring5"),
    ],
    afterItems: [
      th("processAfter1"),
      th("processAfter2"),
      th("processAfter3"),
      th("processAfter4"),
      th("processAfter5"),
    ],
  });

  const timeline = resolveTimelineSection(page.timelineSection, {
    title: t("stepsGridTitle"),
    subtitle: t("stepsGridSubtitle"),
  });

  const statsHeader = resolveSectionHeader(page.statsSection, {
    title: th("statsTitle"),
    subtitle: th("statsSubtitle"),
  });

  const caseStudiesHeader = resolveSectionHeader(page.caseStudiesSection, {
    title: th("caseStudiesTitle"),
    subtitle: th("caseStudiesSubtitle"),
  });

  const testimonialsHeader = resolveSectionHeader(page.testimonialsSection, {
    title: th("testimonialsTitle"),
    subtitle: th("testimonialsSubtitle"),
  });

  const faq = resolveFaq(page.faq, {
    title: th("faqTitle"),
    intro: th("faqSubtitle"),
    items: [1, 2, 3, 4, 5, 6].map((index) => ({
      question: th(`faqQ${index}`),
      answer: th(`faqA${index}`),
    })),
  });

  const cta = resolvePageCta(page.cta, {
    title: t("ctaTitle"),
    text: t("ctaText"),
    primaryCta: th("quoteButton"),
    primaryCtaHref: "/contact",
  });

  return (
    <>
      <SolutionsPageHero
        hero={hero}
        groups={solutionGroups}
        groupsCount={solutionGroups.length}
        servicesCount={totalServices}
        groupsLabel={t("groups")}
        servicesLabel={t("services")}
        eyebrowFallback={t("title")}
        primaryCtaFallback={th("quoteButton")}
        secondaryCtaFallback={t("allGroups")}
      />

      <PartnersSection title={th("partnersTitle")} />

      {isSectionEnabled(capabilities.enabled) && (
        <EngineeringCapabilitiesSection
          title={capabilities.title}
          subtitle={capabilities.subtitle}
          id="capabilities"
        />
      )}

      {isSectionEnabled(beforeAfter.enabled) && (
        <BeforeAfterSection content={beforeAfter} />
      )}

      {isSectionEnabled(statsHeader.enabled) && (
        <StatsSection
          title={statsHeader.title}
          subtitle={statsHeader.subtitle}
          items={stats.map((stat) => ({
            value: stat.value,
            label: pick(stat.label, th(stat.labelKey)),
            suffix: stat.suffix,
          }))}
        />
      )}

      {isSectionEnabled(timeline.enabled) && (
        <SolutionTimelineSection
          title={timeline.title}
          subtitle={timeline.subtitle}
          steps={timeline.steps}
        />
      )}

      {isSectionEnabled(caseStudiesHeader.enabled) && (
        <CaseStudiesSection
          title={caseStudiesHeader.title}
          subtitle={caseStudiesHeader.subtitle}
        />
      )}

      {isSectionEnabled(testimonialsHeader.enabled) && (
        <TestimonialsSection
          title={testimonialsHeader.title}
          subtitle={testimonialsHeader.subtitle}
        />
      )}

      {isSectionEnabled(faq.enabled) && (
        <FaqSection content={faq} contactLabel={th("faqContact")} />
      )}

      {isSectionEnabled(cta.enabled) && <SolutionsCta content={cta} />}
    </>
  );
}
