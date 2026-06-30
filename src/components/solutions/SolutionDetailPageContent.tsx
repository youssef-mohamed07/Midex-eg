import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionBreadcrumbs } from "@/components/solutions/SolutionBreadcrumbs";
import { SolutionsCta } from "@/components/solutions/SolutionsCta";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import {
  getLocalizedSolution,
  getLocalizedSolutionGroup,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import { getQuoteUrl } from "@/content/products";

type Props = { slug: string };

export async function SolutionDetailPageContent({ slug }: Props) {
  const locale = (await getLocale()) as Locale;
  const solution = getLocalizedSolution(slug, locale);
  if (!solution) notFound();

  const group = getLocalizedSolutionGroup(solution.group, locale);
  const t = await getTranslations("solutions");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("products");
  const groupName = group ? getGroupLabel(group, tn) : solution.group;

  return (
    <>
      <PageHero
        badge={false}
        eyebrow={group ? groupName : undefined}
        title={solution.title}
        subtitle={solution.excerpt}
        compact
        breadcrumbs={
          <SolutionBreadcrumbs
            light
            items={[
              { label: t("title"), href: "/solutions" },
              ...(group
                ? [{ label: groupName, href: `/solutions/group/${group.slug}` }]
                : []),
              { label: solution.title },
            ]}
          />
        }
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="group mx-btn mx-btn-primary border-white/20 bg-white text-midex-navy hover:bg-midex-mint hover:text-midex-navy"
            href={getQuoteUrl(solution.title)}
          >
            {tc("requestQuote")}
            <span className="mx-arrow">→</span>
          </Link>
          <Link
            className="mx-btn border border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10"
            href="/solutions"
          >
            {t("allGroups")}
          </Link>
        </div>
      </PageHero>

      <section className="mx-section bg-white">
        <div className="mx-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start lg:gap-14">
            <aside className="order-1 space-y-6 lg:order-2 lg:col-start-2 lg:sticky lg:top-24 lg:self-start">
              {solution.image && (
                <div className="overflow-hidden rounded-2xl border border-midex-line bg-midex-surface/40">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 360px"
                      priority
                    />
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-midex-line bg-white p-5 shadow-sm">
                {group && (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                      {t("groupLabel")}
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-midex-navy">
                      {groupName}
                    </p>
                  </>
                )}
                <Link
                  className="group mx-btn mx-btn-primary mt-5 w-full justify-center"
                  href={getQuoteUrl(solution.title)}
                >
                  {tc("requestQuote")}
                  <span className="mx-arrow">→</span>
                </Link>
                {group && (
                  <Link
                    href={`/solutions/group/${group.slug}`}
                    className="mx-link-arrow mt-4 block text-center text-sm"
                  >
                    {t("browseGroup")}
                    <span className="mx-arrow">→</span>
                  </Link>
                )}
              </div>
            </aside>

            <div className="order-2 space-y-10 lg:order-1 lg:col-start-1 lg:row-start-1">
              <div>
                <span className="mx-eyebrow">Midex</span>
                <h2 className="mx-section-title mt-4">{t("introduction")}</h2>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-midex-gray/80 sm:text-lg">
                  {solution.intro}
                </p>
              </div>

              {solution.highlights && solution.highlights.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-bold text-midex-navy sm:text-xl">
                    {t("capabilities")}
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {solution.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-midex-navy/8 bg-midex-surface/60 px-4 py-3 text-sm leading-relaxed text-midex-gray/85"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-midex-mint" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <SolutionsCta quoteSubject={solution.title} />
    </>
  );
}
