import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionBreadcrumbs } from "@/components/solutions/SolutionBreadcrumbs";
import { getCaseStudies, getCaseStudy, getQuoteUrl } from "@/lib/cms";
import { type Locale } from "@/i18n/routing";

type Props = { slug: string };

function ContentBlock({ title, children }: { title: string; children: string }) {
  return (
    <div className="border-t border-midex-line pt-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-lg font-bold text-midex-navy sm:text-xl">{title}</h2>
      <p className="mt-4 text-base leading-[1.8] text-midex-gray/82">{children}</p>
    </div>
  );
}

export async function CaseStudyDetailPageContent({ slug }: Props) {
  const locale = (await getLocale()) as Locale;
  const study = await getCaseStudy(slug, locale);
  if (!study) notFound();

  const t = await getTranslations("home");
  const related = (await getCaseStudies(locale))
    .filter((item) => item.slug !== study.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        title={study.client}
        subtitle={study.industry}
        compact
        breadcrumbs={
          <SolutionBreadcrumbs
            light
            items={[
              { label: t("caseStudiesTitle"), href: "/" },
              { label: study.client },
            ]}
          />
        }
        media={
          study.image ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/20 lg:aspect-[5/4]">
              <Image
                src={study.image}
                alt={study.client}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 340px"
                priority
              />
            </div>
          ) : undefined
        }
      >
        {study.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </PageHero>

      <section className="mx-section">
        <div className="mx-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
            <article className="min-w-0">
              {study.statValue && (
                <div className="flex items-center gap-5 rounded-2xl border border-midex-line bg-midex-surface/40 px-5 py-4 sm:px-6 sm:py-5">
                  <p className="font-display text-3xl font-bold leading-none text-midex-navy sm:text-4xl">
                    {study.statValue}
                  </p>
                  <div className="h-10 w-px bg-midex-line" aria-hidden />
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-midex-blue">
                    {study.statLabel}
                  </p>
                </div>
              )}

              {study.intro && (
                <p className="mt-8 text-lg leading-[1.8] text-midex-gray/85 sm:mt-10">
                  {study.intro}
                </p>
              )}

              <div className="mt-8 space-y-8 sm:mt-10">
                {study.challenge && (
                  <ContentBlock title={t("caseStudyChallengeLabel")}>
                    {study.challenge}
                  </ContentBlock>
                )}
                {study.approach && (
                  <ContentBlock title={t("caseStudyApproachLabel")}>{study.approach}</ContentBlock>
                )}
                <ContentBlock title={t("caseStudyScopeLabel")}>{study.scope}</ContentBlock>

                {study.highlights && study.highlights.length > 0 && (
                  <div className="border-t border-midex-line pt-8">
                    <h2 className="font-display text-lg font-bold text-midex-navy sm:text-xl">
                      {t("caseStudyHighlightsLabel")}
                    </h2>
                    <ul className="mt-4 space-y-3">
                      {study.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-base leading-relaxed text-midex-gray/82"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-midex-mint"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rounded-2xl border border-midex-mint/30 bg-midex-mint/8 px-5 py-6 sm:px-7 sm:py-7">
                  <h2 className="font-display text-lg font-bold text-midex-navy sm:text-xl">
                    {t("caseStudyOutcomeLabel")}
                  </h2>
                  <p className="mt-4 text-base leading-[1.8] text-midex-gray/85">{study.outcome}</p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3 border-t border-midex-line pt-8">
                <Link
                  className="group mx-btn mx-btn-primary"
                  href={getQuoteUrl(study.client)}
                >
                  {t("caseStudyDiscuss")}
                  <span className="mx-arrow">→</span>
                </Link>
                <Link className="mx-btn mx-btn-ghost" href="/">
                  {t("caseStudyBack")}
                </Link>
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-midex-line bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                  {study.industry}
                </p>
                <p className="mt-2 font-display text-lg font-bold text-midex-navy">{study.client}</p>
                {study.statValue && (
                  <div className="mt-4 border-t border-midex-line pt-4">
                    <p className="font-display text-2xl font-bold text-midex-navy">{study.statValue}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-midex-gray/60">
                      {study.statLabel}
                    </p>
                  </div>
                )}
                <Link
                  className="group mx-btn mx-btn-primary mt-5 w-full justify-center"
                  href={getQuoteUrl(study.client)}
                >
                  {t("caseStudyDiscuss")}
                  <span className="mx-arrow">→</span>
                </Link>
              </div>

              {related.length > 0 && (
                <div className="overflow-hidden rounded-2xl border border-midex-line bg-midex-surface/50">
                  <div className="border-b border-midex-line px-5 py-4">
                    <h2 className="font-display text-sm font-bold uppercase tracking-wider text-midex-navy">
                      {t("caseStudyRelated")}
                    </h2>
                  </div>
                  <ul className="divide-y divide-midex-line">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/case-studies/${item.slug}`}
                          className="block px-5 py-4 no-underline transition-colors hover:bg-white"
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-midex-blue">
                            {item.industry}
                          </p>
                          <p className="mt-1 text-sm font-semibold leading-snug text-midex-navy transition-colors hover:text-midex-blue">
                            {item.client}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
