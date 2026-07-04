import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { EventsSection } from "@/components/home/EventsSection";
import { PageHero } from "@/components/layout/PageHero";
import { StatsSection } from "@/components/home/StatsSection";
import { StorySection } from "@/components/sections/StorySection";
import { stats } from "@/content/site";
import { getQuoteUrl } from "@/content/products";

const standardKeys = ["standard1", "standard2", "standard3", "standard4", "standard5"] as const;

export async function AboutPageContent() {
  const t = await getTranslations("about");
  const th = await getTranslations("home");
  const tc = await getTranslations("products");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} eyebrow="Midex" compact />

      <StorySection cta={{ href: "/solutions", label: t("exploreSolutions") }} />

      <EventsSection />

      <AboutTimeline />

      <section className="mx-section">
        <div className="mx-container">
          <div className="relative overflow-hidden rounded-2xl bg-midex-navy mx-mesh-bg px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <div className="mx-grid-overlay pointer-events-none absolute inset-0" />
            <div className="relative mx-auto max-w-3xl text-center">
              <span className="mx-eyebrow mx-eyebrow--center mx-eyebrow--light">Midex</span>
              <h2 className="mx-section-title mt-4 !text-white">{t("standardsTitle")}</h2>
              <p className="mx-section-subtitle mx-auto !text-white/70">{t("standardsText")}</p>
            </div>

            <div className="relative mt-8 flex flex-wrap justify-center gap-2.5 sm:mt-10 sm:gap-3">
              {standardKeys.map((key) => (
                <span
                  key={key}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm sm:px-5 sm:py-2.5"
                >
                  {t(key)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsSection
        title={th("statsTitle")}
        subtitle={th("statsSubtitle")}
        items={stats.map((stat) => ({
          value: stat.value,
          label: th(stat.labelKey),
        }))}
      />

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
