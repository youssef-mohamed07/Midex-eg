import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { StatsSection } from "@/components/home/StatsSection";
import { PageHero } from "@/components/layout/PageHero";
import {
  SolutionGroupCard,
  SolutionServiceCard,
} from "@/components/solutions/SolutionCards";
import { SolutionsCta } from "@/components/solutions/SolutionsCta";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import { getLocalizedSolutionGroups } from "@/content/i18n";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { type Locale } from "@/i18n/routing";
import { stats } from "@/content/site";

export async function SolutionsPageContent() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("solutions");
  const th = await getTranslations("home");
  const tn = await getTranslations("nav");
  const solutionGroups = getLocalizedSolutionGroups(locale);
  const totalServices = solutionGroups.reduce(
    (sum, group) => sum + group.children.length,
    0,
  );

  const groupLabel = (group: (typeof solutionGroups)[number]) => getGroupLabel(group, tn);

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

      {/* Solution groups overview */}
      <section className="mx-section--tight bg-white">
        <div className="mx-container">
          <RevealOnScroll>
            <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="mx-eyebrow">Midex</span>
                <h2 className="mx-section-title mt-2 sm:mt-3">{t("allGroups")}</h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-midex-gray/75 sm:text-base lg:text-end">
                {t("subtitle")}
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {solutionGroups.map((group, index) => (
              <RevealOnScroll key={group.slug} delay={(index % 3) * 40}>
                <SolutionGroupCard
                  href={`/solutions/group/${group.slug}`}
                  image={group.image}
                  label={groupLabel(group)}
                  description={group.description}
                  meta={`${group.children.length} ${t("services")}`}
                  index={index}
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Per-group services */}
      <section className="mx-section bg-midex-surface/30">
        <div className="mx-container space-y-12 sm:space-y-16">
          {solutionGroups.map((group) => (
            <div key={group.slug} id={`group-${group.slug}`} className="scroll-mt-28">
              <div className="mb-5 flex flex-col gap-3 border-b border-midex-line/70 pb-5 sm:mb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-6">
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                    {group.children.length} {t("services")}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-midex-navy sm:text-2xl">
                    {groupLabel(group)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-midex-gray/75 sm:text-base">
                    {group.description}
                  </p>
                </div>
                <Link
                  href={`/solutions/group/${group.slug}`}
                  className="mx-link-arrow shrink-0 text-sm no-underline"
                >
                  {t("browseGroup")}
                  <span className="mx-arrow">→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {group.children.map((child, index) => (
                  <RevealOnScroll key={child.slug} delay={(index % 3) * 40}>
                    <SolutionServiceCard
                      href={`/solutions/group/${group.slug}/${child.slug}`}
                      image={child.image}
                      label={child.label}
                      excerpt={child.excerpt}
                      viewLabel={t("viewSolution")}
                    />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          ))}
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

      <CaseStudiesSection />

      <FaqSection />

      <SolutionsCta />
    </>
  );
}
