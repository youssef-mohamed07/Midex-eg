import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OurValuesSection } from "@/components/about/OurValuesSection";
import { CertificationsSection } from "@/components/about/CertificationsSection";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { EventsSection } from "@/components/home/EventsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { PageHero } from "@/components/layout/PageHero";
import { StatsSection } from "@/components/home/StatsSection";
import { StorySection } from "@/components/sections/StorySection";
import { stats } from "@/content/site";
import { getQuoteUrl } from "@/content/products";

export async function AboutPageContent() {
  const t = await getTranslations("about");
  const th = await getTranslations("home");
  const tc = await getTranslations("products");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} eyebrow="Midex" compact />

      <StorySection cta={{ href: "/solutions", label: t("exploreSolutions") }} />

      <OurValuesSection />

      <EventsSection />

      <AboutTimeline />

      <BeforeAfterSection />

      <CertificationsSection />

      <StatsSection
        title={th("statsTitle")}
        subtitle={th("statsSubtitle")}
        items={stats.map((stat) => ({
          value: stat.value,
          label: th(stat.labelKey),
        }))}
      />

      <CaseStudiesSection />

      <FaqSection />

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
