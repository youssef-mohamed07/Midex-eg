import { getLocale, getTranslations } from "next-intl/server";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { EngineeringCapabilitiesSection } from "@/components/home/EngineeringCapabilitiesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionsCta } from "@/components/solutions/SolutionsCta";
import { SolutionTimelineSection } from "@/components/solutions/SolutionTimelineSection";
import { getSolutionGroups, getStats } from "@/lib/cms";
import { type Locale } from "@/i18n/routing";

export async function SolutionsPageContent() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("solutions");
  const th = await getTranslations("home");
  const [solutionGroups, stats] = await Promise.all([
    getSolutionGroups(locale),
    getStats(),
  ]);
  const totalServices = solutionGroups.reduce(
    (sum, group) => sum + group.children.length,
    0,
  );

  return (
    <>
      <PageHero title={t("heroTitle")} subtitle={t("heroSubtitle")} compact>
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

      <PartnersSection title={th("partnersTitle")} />

      <EngineeringCapabilitiesSection />

      <BeforeAfterSection />

      <SolutionTimelineSection />

      <StatsSection
        title={th("statsTitle")}
        subtitle={th("statsSubtitle")}
        items={stats.map((stat) => ({
          value: stat.value,
          label: th(stat.labelKey),
          suffix: stat.suffix,
        }))}
      />

      <CaseStudiesSection />

      <TestimonialsSection
        title={th("testimonialsTitle")}
        subtitle={th("testimonialsSubtitle")}
      />

      <FaqSection />

      <SolutionsCta />
    </>
  );
}
