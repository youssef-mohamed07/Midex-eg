import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CaseStudyGallery } from "@/components/case-studies/CaseStudyGallery";
import { CaseStudyHero } from "@/components/case-studies/CaseStudyHero";
import { getCaseStudies, getCaseStudy, getCaseStudiesPageContent, getQuoteUrl } from "@/lib/cms";
import { getCaseStudyGalleryImages } from "@/lib/cms/helpers";
import { pick } from "@/lib/cms/section-resolve";
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
  const [relatedAll, page] = await Promise.all([
    getCaseStudies(locale),
    getCaseStudiesPageContent(locale),
  ]);
  const related = relatedAll.filter((item) => item.slug !== study.slug).slice(0, 3);
  const galleryImages = getCaseStudyGalleryImages(study);
  const labels = {
    challenge: pick(page.detailLabels?.challengeLabel, t("caseStudyChallengeLabel")),
    approach: pick(page.detailLabels?.approachLabel, t("caseStudyApproachLabel")),
    scope: pick(page.detailLabels?.scopeLabel, t("caseStudyScopeLabel")),
    highlights: pick(page.detailLabels?.highlightsLabel, t("caseStudyHighlightsLabel")),
    outcome: pick(page.detailLabels?.outcomeLabel, t("caseStudyOutcomeLabel")),
    discuss: pick(page.detailLabels?.discuss, t("caseStudyDiscuss")),
    related: pick(page.detailLabels?.related, t("caseStudyRelated")),
    back: pick(page.detailLabels?.back, t("caseStudyBack")),
    gallery: pick(page.detailLabels?.galleryTitle, t("caseStudyGalleryTitle")),
  };

  return (
    <>
      <CaseStudyHero
        study={study}
        breadcrumbParent={t("caseStudiesTitle")}
        heroImage={galleryImages[0]}
      />

      <CaseStudyGallery
        title={labels.gallery}
        images={galleryImages}
        alt={study.client}
      />

      <section className="mx-section">
        <div className="mx-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
            <article className="min-w-0">
              {study.intro ? (
                <p className="text-lg leading-[1.8] text-midex-gray/85">{study.intro}</p>
              ) : null}

              <div className={`space-y-8 ${study.intro ? "mt-8 sm:mt-10" : ""}`}>
                {study.challenge && (
                  <ContentBlock title={labels.challenge}>
                    {study.challenge}
                  </ContentBlock>
                )}
                {study.approach && (
                  <ContentBlock title={labels.approach}>{study.approach}</ContentBlock>
                )}
                <ContentBlock title={labels.scope}>{study.scope}</ContentBlock>

                {study.highlights && study.highlights.length > 0 && (
                  <div className="border-t border-midex-line pt-8">
                    <h2 className="font-display text-lg font-bold text-midex-navy sm:text-xl">
                      {labels.highlights}
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
                    {labels.outcome}
                  </h2>
                  <p className="mt-4 text-base leading-[1.8] text-midex-gray/85">{study.outcome}</p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3 border-t border-midex-line pt-8">
                <Link
                  className="group mx-btn mx-btn-primary"
                  href={getQuoteUrl(study.client)}
                >
                  {labels.discuss}
                  <span className="mx-arrow">→</span>
                </Link>
                <Link className="mx-btn mx-btn-ghost" href="/case-studies">
                  {labels.back}
                </Link>
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-midex-line bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                  {study.industry}
                </p>
                <p className="mt-2 font-display text-lg font-bold text-midex-navy">{study.client}</p>
                {study.solutionGroup?.slug ? (
                  <Link
                    href={`/solutions/group/${study.solutionGroup.slug}`}
                    className="mt-2 inline-block text-sm font-semibold text-midex-blue no-underline hover:underline"
                  >
                    {study.solutionGroup.label}
                  </Link>
                ) : null}
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
                  {labels.discuss}
                  <span className="mx-arrow">→</span>
                </Link>
              </div>

              {related.length > 0 && (
                <div className="overflow-hidden rounded-2xl border border-midex-line bg-midex-surface/50">
                  <div className="border-b border-midex-line px-5 py-4">
                    <h2 className="font-display text-sm font-bold uppercase tracking-wider text-midex-navy">
                      {labels.related}
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
