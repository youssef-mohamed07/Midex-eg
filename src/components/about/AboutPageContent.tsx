import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AboutFaqSection } from "@/components/about/AboutFaqSection";
import { AboutFoundersSection } from "@/components/about/AboutFoundersSection";
import { AboutMissionVisionSection } from "@/components/about/AboutMissionVisionSection";
import { AboutMilestonesSection } from "@/components/about/AboutMilestonesSection";
import { AboutStandardsSection } from "@/components/about/AboutStandardsSection";
import { OurValuesSection } from "@/components/about/OurValuesSection";
import { EventsSection } from "@/components/home/EventsSection";
import { PageHero } from "@/components/layout/PageHero";
import { getLocale } from "next-intl/server";
import { getAboutMilestones, getEvents, getQuoteUrl } from "@/lib/cms";
import type { Locale } from "@/i18n/routing";

export async function AboutPageContent() {
  const t = await getTranslations("about");
  const tc = await getTranslations("products");
  const locale = (await getLocale()) as Locale;
  const [milestones, events] = await Promise.all([
    getAboutMilestones(),
    getEvents(locale),
  ]);

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} eyebrow="Midex" compact />

      <AboutMissionVisionSection />

      <AboutMilestonesSection milestones={milestones} />

      <AboutFoundersSection />

      <AboutStandardsSection />

      <EventsSection events={events} title={t("eventsTitle")} subtitle={t("eventsIntro")} />

      <OurValuesSection />

      <AboutFaqSection />

      <section className="mx-section--tight">
        <div className="mx-container">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-midex-line bg-white p-8 shadow-sm sm:p-10 lg:flex-row lg:justify-between lg:text-start">
            <div className="max-w-2xl text-center lg:text-start">
              <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">
                {t("ctaTitle")}
              </h2>
              <p className="mt-3 leading-relaxed text-midex-gray/75">{t("ctaText")}</p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-3">
              <Link className="group mx-btn mx-btn-primary" href="/contact">
                {t("contactUs")}
                <span className="mx-arrow">→</span>
              </Link>
              <Link className="mx-btn mx-btn-ghost" href={getQuoteUrl()}>
                {tc("requestQuote")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
