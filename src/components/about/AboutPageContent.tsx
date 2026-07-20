import { getLocale, getTranslations } from "next-intl/server";
import { AboutFaqSection } from "@/components/about/AboutFaqSection";
import { AboutFoundersSection } from "@/components/about/AboutFoundersSection";
import { AboutMissionVisionSection } from "@/components/about/AboutMissionVisionSection";
import { AboutMilestonesSection } from "@/components/about/AboutMilestonesSection";
import { AboutStandardsSection } from "@/components/about/AboutStandardsSection";
import { CertificationsSection } from "@/components/about/CertificationsSection";
import { OurValuesSection } from "@/components/about/OurValuesSection";
import { EventsSection } from "@/components/home/EventsSection";
import { PageCtaSection } from "@/components/cms/PageCtaSection";
import { PageHero } from "@/components/layout/PageHero";
import { PageHeroImage } from "@/components/cms/PageHeroImage";
import {
  getAboutMilestones,
  getAboutPageContent,
  getEvents,
} from "@/lib/cms";
import {
  isSectionEnabled,
  pick,
  resolveFaq,
  resolvePageCta,
  resolvePageHero,
  resolveSectionHeader,
} from "@/lib/cms/section-resolve";
import type { Locale } from "@/i18n/routing";

export async function AboutPageContent() {
  const t = await getTranslations("about");
  const tc = await getTranslations("products");
  const locale = (await getLocale()) as Locale;
  const [milestones, events, page] = await Promise.all([
    getAboutMilestones(locale),
    getEvents(locale),
    getAboutPageContent(locale),
  ]);

  const hero = resolvePageHero(page.hero, {
    eyebrow: t("heroEyebrow"),
    title: t("title"),
    subtitle: t("intro"),
    primaryCta: t("exploreSolutions"),
    primaryCtaHref: "/solutions",
    secondaryCta: tc("requestQuote"),
    secondaryCtaHref: "/contact",
  });

  const milestonesHeader = resolveSectionHeader(page.milestonesSection, {
    title: t("milestonesTitle"),
    subtitle: t("milestonesSubtitle"),
  });

  const foundersHeader = resolveSectionHeader(page.foundersSection, {
    title: t("foundersTitle"),
  });

  const standards = {
    eyebrow: pick(page.standardsSection?.eyebrow, t("standardsEyebrow")),
    title: pick(page.standardsSection?.title, t("standardsTitle")),
    subtitle: pick(page.standardsSection?.subtitle, t("standardsSubtitle")),
    footnote: pick(page.standardsSection?.footnote, t("standardsText")),
    items: page.standardsSection?.items,
  };
  const showCertifications = false;
  const certifications = resolveSectionHeader(page.certificationsSection, {
    title: t("certificationsTitle"),
    subtitle: t("certificationsSubtitle"),
  });

  const eventsHeader = resolveSectionHeader(page.eventsSection, {
    title: t("eventsTitle"),
    subtitle: t("eventsIntro"),
  });

  const values = {
    title: pick(page.valuesSection?.title, t("valuesTitle")),
    subtitle: pick(page.valuesSection?.subtitle, t("valuesSubtitle")),
    items: page.valuesSection?.items,
  };

  const faq = resolveFaq(page.faq, {
    title: t("faqTitle"),
    intro: t("faqSubtitle"),
    image: "/images/about/values/reliability.webp",
    items: [1, 2, 3, 4, 5].map((index) => ({
      question: t(`faqQ${index}`),
      answer: t(`faqA${index}`),
    })),
  });

  const cta = resolvePageCta(page.cta, {
    title: t("ctaTitle"),
    text: t("ctaText"),
    primaryCta: t("contactUs"),
    primaryCtaHref: "/contact",
  });
  const heroMetrics = {
    primaryValue: pick(page.heroMetrics?.primaryValue, t("heroYears")),
    primaryLabel: pick(page.heroMetrics?.primaryLabel, t("heroYearsLabel")),
    badge: pick(page.heroMetrics?.badge, t("heroFocusLabel")),
  };

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        compact
        media={<PageHeroImage src={hero.image} alt={hero.title} priority />}
      >
        <p className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70 sm:mt-8">
          <span>
            <strong className="font-display text-2xl font-bold text-midex-mint">
              {heroMetrics.primaryValue}
            </strong>{" "}
            {heroMetrics.primaryLabel}
          </span>
          <span className="hidden text-white/25 sm:inline" aria-hidden>
            ·
          </span>
          <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/85">
            {heroMetrics.badge}
          </span>
        </p>
      </PageHero>

      <AboutMissionVisionSection content={page.missionVision} />

      {isSectionEnabled(milestonesHeader.enabled) && (
        <AboutMilestonesSection
          milestones={milestones}
          title={milestonesHeader.title}
          subtitle={milestonesHeader.subtitle}
        />
      )}

      {isSectionEnabled(foundersHeader.enabled) && (
        <AboutFoundersSection title={foundersHeader.title} />
      )}

      <AboutStandardsSection
        title={standards.title}
        subtitle={standards.subtitle}
        eyebrow={standards.eyebrow}
        footnote={standards.footnote}
        items={standards.items}
      />

      <OurValuesSection
        title={values.title}
        subtitle={values.subtitle}
        items={values.items}
      />

      {showCertifications && isSectionEnabled(certifications.enabled) && (
        <CertificationsSection
          title={certifications.title}
          subtitle={certifications.subtitle}
          eyebrow={certifications.eyebrow}
          footnote={certifications.footnote}
        />
      )}

      {isSectionEnabled(eventsHeader.enabled) && (
        <EventsSection
          events={events}
          title={eventsHeader.title}
          subtitle={eventsHeader.subtitle}
        />
      )}

      {isSectionEnabled(faq.enabled) && (
        <AboutFaqSection content={faq} contactLabel={t("faqContact")} />
      )}

      <PageCtaSection content={cta} />
    </>
  );
}
