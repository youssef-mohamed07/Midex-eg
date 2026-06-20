import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import {
  getLocalizedSolutionGroups,
  getLocalizedSolutions,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import { getQuoteUrl } from "@/content/products";

function ChevronRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export async function SolutionsPageContent() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("solutions");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("products");
  const solutionGroups = getLocalizedSolutionGroups(locale);
  const solutions = getLocalizedSolutions(locale);
  const totalServices = solutionGroups.reduce(
    (sum, group) => sum + group.children.length,
    0,
  );

  const groupLabel = (group: (typeof solutionGroups)[number]) => getGroupLabel(group, tn);

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")}>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
            {solutionGroups.length} {t("groups")}
          </span>
          <span className="rounded-full border border-midex-mint/30 bg-midex-mint/15 px-4 py-2 text-sm font-semibold text-midex-navy">
            {totalServices} {t("services")}
          </span>
        </div>
      </PageHero>

      <nav
        className="sticky top-[72px] z-30 border-b border-midex-navy/8 bg-white/95 backdrop-blur-md"
        aria-label={t("jumpToGroup")}
      >
        <div className="mx-container flex gap-2 overflow-x-auto py-4">
          {solutionGroups.map((group) => (
            <a
              key={group.slug}
              href={`#${group.slug}`}
              className="shrink-0 rounded-full border border-midex-navy/10 bg-midex-surface px-4 py-2 text-sm font-semibold text-midex-navy transition hover:border-midex-mint hover:bg-midex-mint/20"
            >
              {groupLabel(group)}
            </a>
          ))}
        </div>
      </nav>

      <section className="mx-section bg-midex-surface">
        <div className="mx-container space-y-20 lg:space-y-24">
          {solutionGroups.map((group, index) => (
            <article
              key={group.slug}
              id={group.slug}
              className="scroll-mt-36"
            >
              <div
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link
                  href={`/solutions/group/${group.slug}`}
                  className="group relative block overflow-hidden rounded-2xl shadow-lg shadow-midex-navy/10"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={group.image}
                      alt={groupLabel(group)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midex-navy/70 via-midex-navy/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-midex-mint">
                        {group.children.length} {t("services")}
                      </p>
                      <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                        {groupLabel(group)}
                      </h2>
                    </div>
                  </div>
                </Link>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                    {t("groupLabel")} {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold text-midex-navy">
                    {groupLabel(group)}
                  </h2>
                  <p className="mt-4 leading-relaxed text-midex-gray/80">
                    {group.description}
                  </p>

                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {group.children.map((child) => (
                      <li key={child.slug}>
                        <Link
                          href={`/solutions/group/${group.slug}/${child.slug}`}
                          className="group/link flex items-center gap-2 rounded-xl border border-midex-navy/8 bg-white px-4 py-3 text-sm font-medium text-midex-navy no-underline shadow-sm transition hover:border-midex-mint/50 hover:shadow-md"
                        >
                          <ChevronRight className="h-4 w-4 shrink-0 text-midex-blue transition group-hover/link:translate-x-0.5" />
                          <span className="line-clamp-2">{child.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/solutions/group/${group.slug}`}
                    className="mx-btn mx-btn-primary mt-6 inline-flex !px-5 !py-2.5 !text-sm"
                  >
                    {t("browseGroup")} →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-section bg-white">
        <div className="mx-container">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-midex-navy sm:text-4xl">
              {t("allServices")}
            </h2>
            <p className="mx-section-subtitle mx-auto mt-4 text-midex-gray/80">
              {t("allServicesSubtitle")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutionGroups.flatMap((group) =>
              group.children.map((child) => (
                <Link
                  key={`${group.slug}-${child.slug}`}
                  href={`/solutions/group/${group.slug}/${child.slug}`}
                  className="group mx-card flex items-start gap-4 p-5 no-underline"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-midex-mint/20 text-midex-blue">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                      {groupLabel(group)}
                    </span>
                    <span className="mt-1 block font-display text-base font-bold text-midex-navy group-hover:text-midex-blue">
                      {child.label}
                    </span>
                  </span>
                </Link>
              )),
            )}
          </div>
        </div>
      </section>

      {solutions.length > 0 && (
        <section className="mx-section bg-midex-surface">
          <div className="mx-container">
            <h2 className="font-display text-3xl font-bold text-midex-navy">
              {t("featuredTitle")}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {solutions.map((solution) => (
                <Link
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="mx-card block overflow-hidden no-underline"
                >
                  {solution.image && (
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      width={600}
                      height={360}
                      className="aspect-[16/10] w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-midex-navy">
                      {solution.title}
                    </h3>
                    <p className="mt-2 text-sm text-midex-gray/80">{solution.excerpt}</p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-midex-blue">
                      {t("viewSolution")} →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-midex-navy mx-mesh-bg py-16 lg:py-20">
        <div className="mx-container text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">{t("ctaText")}</p>
          <Link
            className="mx-btn mx-btn-mint mt-8 inline-flex"
            href={getQuoteUrl()}
          >
            {tc("requestQuote")} →
          </Link>
        </div>
      </section>
    </>
  );
}
