import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { PageHero } from "@/components/layout/PageHero";
import { StatsSection } from "@/components/home/StatsSection";
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

      <section className="mx-section bg-white">
        <div className="mx-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative overflow-hidden rounded-2xl border border-midex-line shadow-lg">
              <Image
                src="/images/hero/slide-2.png"
                alt="Midex engineering"
                width={900}
                height={600}
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midex-navy/35 to-transparent" />
            </div>

            <div>
              <span className="mx-eyebrow">{t("storyLabel")}</span>
              <h2 className="mx-section-title mt-4">{t("storyTitle")}</h2>
              <p className="mt-5 leading-relaxed text-midex-gray/80">{t("storyText1")}</p>
              <p className="mt-4 leading-relaxed text-midex-gray/80">{t("storyText2")}</p>
              <Link className="group mx-btn mx-btn-primary mt-8 inline-flex" href="/solutions">
                {t("exploreSolutions")}
                <span className="mx-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AboutTimeline />

      <section className="relative overflow-hidden bg-midex-navy mx-mesh-bg py-16 lg:py-20">
        <div className="mx-grid-overlay pointer-events-none absolute inset-0" />
        <div className="relative mx-container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-eyebrow mx-eyebrow--center mx-eyebrow--light">Midex</span>
            <h2 className="mx-section-title mt-4 !text-white">{t("standardsTitle")}</h2>
            <p className="mx-section-subtitle mx-auto !text-white/70">{t("standardsText")}</p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {standardKeys.map((key) => (
              <span
                key={key}
                className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm"
              >
                {t(key)}
              </span>
            ))}
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

      <section className="border-t border-midex-line bg-midex-surface py-14 lg:py-16">
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
