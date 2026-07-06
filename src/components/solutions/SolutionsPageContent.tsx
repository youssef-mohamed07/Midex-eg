import { getLocale, getTranslations } from "next-intl/server";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HomeSolutionsAccordion } from "@/components/home/HomeSolutionsAccordion";
import { PartnersSection } from "@/components/home/PartnersSection";
import { StatsSection } from "@/components/home/StatsSection";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionsCta } from "@/components/solutions/SolutionsCta";
import { SolutionTimelineSection } from "@/components/solutions/SolutionTimelineSection";
import { getLocalizedSolutionGroupCards, getLocalizedSolutionGroups } from "@/content/i18n";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { type Locale } from "@/i18n/routing";
import { stats } from "@/content/site";

export async function SolutionsPageContent() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("solutions");
  const th = await getTranslations("home");
  const solutionGroups = getLocalizedSolutionGroups(locale);
  const cards = getLocalizedSolutionGroupCards(locale);
  const totalServices = solutionGroups.reduce(
    (sum, group) => sum + group.children.length,
    0,
  );

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} eyebrow="Midex" compact>
        <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
          <span>
            <strong className="font-semibold text-white">{solutionGroups.length}</strong>{" "}
            {t("groups")}
          </span>
          <span className="hidden text-white/30 sm:inline" aria-hidden>
            ·
          </span>
          <span>
            <strong className="font-semibold text-midex-mint">{totalServices}</strong>{" "}
            {t("services")}
          </span>
        </p>
      </PageHero>

      <PartnersSection title={th("partnersTitle")} subtitle={th("partnersSubtitle")} />

      <section className="mx-section">
        <div className="mx-container">
          <RevealOnScroll>
            <div className="max-w-2xl">
              <span className="mx-eyebrow">Midex</span>
              <h2 className="mx-section-title mt-4">{t("allGroups")}</h2>
              <p className="mx-section-subtitle">{t("subtitle")}</p>
            </div>
          </RevealOnScroll>

          <HomeSolutionsAccordion
            cards={cards}
            exploreLabel={th("exploreSolution")}
            servicesLabel={t("services")}
          />
        </div>
      </section>

      <BeforeAfterSection />

      <SolutionTimelineSection />

      <StatsSection
        title={th("statsTitle")}
        subtitle={th("statsSubtitle")}
        items={stats.map((stat) => ({
          value: stat.value,
          label: th(stat.labelKey),
          suffix: "suffix" in stat ? stat.suffix : undefined,
        }))}
      />

      <FaqSection />

      <SolutionsCta />
    </>
  );
}
