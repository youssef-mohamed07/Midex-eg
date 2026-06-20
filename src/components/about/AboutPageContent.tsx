import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { StatsSection } from "@/components/home/StatsSection";
import { stats } from "@/content/site";
import { getQuoteUrl } from "@/content/products";

const expertiseKeys = ["expertise1", "expertise2", "expertise3", "expertise4"] as const;
const standardKeys = ["standard1", "standard2", "standard3", "standard4", "standard5"] as const;

export async function AboutPageContent() {
  const t = await getTranslations("about");
  const th = await getTranslations("home");
  const tc = await getTranslations("products");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-section bg-white">
        <div className="mx-container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-midex-navy/10">
              <Image
                src="/images/hero/slide-2.png"
                alt="Midex engineering"
                width={900}
                height={600}
                className="aspect-[4/3] w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midex-navy/40 to-transparent" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                {t("storyLabel")}
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-midex-navy sm:text-4xl">
                {t("storyTitle")}
              </h2>
              <p className="mt-5 leading-relaxed text-midex-gray/85">{t("storyText1")}</p>
              <p className="mt-4 leading-relaxed text-midex-gray/85">{t("storyText2")}</p>
              <Link className="mx-btn mx-btn-primary mt-8 inline-flex" href="/solutions">
                {t("exploreSolutions")} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-section bg-midex-surface">
        <div className="mx-container">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-midex-navy sm:text-4xl">
              {t("expertiseTitle")}
            </h2>
            <p className="mt-4 text-midex-gray/80">{t("expertiseSubtitle")}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {expertiseKeys.map((key, index) => (
              <article
                key={key}
                className="mx-card flex gap-5 p-6 sm:p-7"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-midex-mint to-midex-blue text-lg font-bold text-white shadow-md">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-midex-navy">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-midex-gray/75">
                    {t(`${key}Text`)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-midex-navy mx-mesh-bg py-16 lg:py-20">
        <div className="mx-container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              {t("standardsTitle")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">{t("standardsText")}</p>
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

      <section className="mx-section bg-white">
        <div className="mx-container">
          <div className="overflow-hidden rounded-3xl border border-midex-mint/30 bg-gradient-to-br from-midex-surface to-white p-8 shadow-lg shadow-midex-navy/5 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold text-midex-navy">
                {t("ctaTitle")}
              </h2>
              <p className="mt-4 leading-relaxed text-midex-gray/80">{t("ctaText")}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
              <Link className="mx-btn mx-btn-primary" href="/contact">
                {t("contactUs")} →
              </Link>
              <Link
                className="mx-btn border border-midex-navy/15 bg-white text-midex-navy hover:bg-midex-surface"
                href={getQuoteUrl()}
              >
                {tc("requestQuote")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
