import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import {
  SolutionGroupCard,
  SolutionServiceCard,
} from "@/components/solutions/SolutionCards";
import { SolutionsCta } from "@/components/solutions/SolutionsCta";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import { getLocalizedSolutionGroups } from "@/content/i18n";
import { type Locale } from "@/i18n/routing";

export async function SolutionsPageContent() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("solutions");
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

      <section className="mx-section">
        <div className="mx-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(220px,260px)_1fr] lg:gap-14">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-midex-line bg-white shadow-sm">
                <div className="border-b border-midex-line px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                    Midex
                  </p>
                  <h2 className="mt-1 font-display text-base font-bold text-midex-navy">
                    {t("allGroups")}
                  </h2>
                </div>

                <nav aria-label={t("jumpToGroup")} className="p-2">
                  <ul className="space-y-0.5">
                    {solutionGroups.map((group) => (
                      <li key={group.slug}>
                        <a
                          href={`#group-${group.slug}`}
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-midex-gray/75 no-underline transition-colors hover:bg-midex-surface hover:text-midex-blue"
                        >
                          <span>{groupLabel(group)}</span>
                          <span className="rounded-full bg-midex-surface px-2 py-0.5 text-xs font-semibold tabular-nums text-midex-blue">
                            {group.children.length}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            <div className="space-y-14">
              <div>
                <span className="mx-eyebrow">Midex</span>
                <h2 className="mx-section-title mt-4">{t("allGroups")}</h2>
                <p className="mx-section-subtitle">{t("subtitle")}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {solutionGroups.map((group, index) => (
                  <SolutionGroupCard
                    key={group.slug}
                    href={`/solutions/group/${group.slug}`}
                    image={group.image}
                    label={groupLabel(group)}
                    description={group.description}
                    meta={`${group.children.length} ${t("services")}`}
                    index={index}
                  />
                ))}
              </div>

              {solutionGroups.map((group) => (
                <div key={group.slug} id={`group-${group.slug}`} className="scroll-mt-28">
                  <div className="mb-6 flex flex-col gap-3 border-b border-midex-line pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                      <h3 className="font-display text-xl font-bold text-midex-navy sm:text-2xl">
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

                  <div className="grid gap-4 sm:grid-cols-2">
                    {group.children.map((child) => (
                      <SolutionServiceCard
                        key={child.slug}
                        href={`/solutions/group/${group.slug}/${child.slug}`}
                        image={child.image}
                        label={child.label}
                        excerpt={child.excerpt}
                        viewLabel={t("viewSolution")}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SolutionsCta />
    </>
  );
}
