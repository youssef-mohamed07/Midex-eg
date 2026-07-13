import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getCaseStudies } from "@/lib/cms";
import type { CaseStudy } from "@/lib/cms/types";
import { type Locale } from "@/i18n/routing";

function FeaturedCaseStudy({
  study,
  ctaLabel,
}: {
  study: CaseStudy;
  ctaLabel: string;
}) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-midex-line bg-white no-underline shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/40 hover:shadow-xl lg:rounded-3xl"
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-gradient-to-br from-midex-surface via-white to-midex-surface sm:aspect-[5/3]">
        {study.image ? (
          <Image
            src={study.image}
            alt={study.client}
            fill
            className="object-contain p-8 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] sm:p-10 lg:p-12"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        ) : (
          <div className="absolute inset-0 bg-midex-surface" aria-hidden />
        )}

        <div className="absolute start-4 top-4 z-10 flex flex-wrap gap-2 sm:start-5 sm:top-5">
          {study.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-midex-line/80 bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-midex-navy shadow-sm sm:text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="absolute end-4 top-4 z-10 rounded-xl border border-midex-line/80 bg-white/95 px-3 py-2 text-center shadow-sm sm:end-5 sm:top-5 sm:px-4">
          <p className="font-display text-xl font-bold leading-none text-midex-navy sm:text-2xl">
            {study.statValue}
          </p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-midex-gray/70">
            {study.statLabel}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-midex-navy p-5 sm:p-6 lg:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-midex-mint sm:text-xs">
          {study.industry}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
          {study.client}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-white/75 sm:mt-3 sm:text-base">
          {study.outcome}
        </p>
        <span className="mx-link-arrow mt-4 inline-flex text-sm text-midex-mint sm:mt-5">
          {ctaLabel}
          <span className="mx-arrow">→</span>
        </span>
      </div>
    </Link>
  );
}

function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full w-full overflow-hidden rounded-xl border border-midex-line/70 bg-white no-underline shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/40 hover:shadow-lg sm:rounded-2xl"
    >
      <div className="relative w-[38%] shrink-0 self-stretch overflow-hidden bg-gradient-to-br from-midex-surface via-white to-midex-surface sm:w-[40%]">
        {study.image ? (
          <Image
            src={study.image}
            alt={study.client}
            fill
            className="object-contain p-3 transition-transform duration-600 group-hover:scale-[1.03] sm:p-4"
            sizes="(max-width: 1024px) 40vw, 180px"
          />
        ) : (
          <div className="absolute inset-0 bg-midex-surface" aria-hidden />
        )}
        <span className="absolute start-2 top-2 z-10 rounded-full bg-midex-navy/85 px-2 py-0.5 font-display text-[10px] font-bold tabular-nums text-white sm:start-3 sm:top-3 sm:text-xs">
          {String(index + 2).padStart(2, "0")}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-4 lg:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-midex-blue sm:text-[11px]">
          {study.industry}
        </p>
        <h3 className="mt-1 font-display text-base font-bold leading-snug text-midex-navy transition-colors group-hover:text-midex-blue sm:text-lg">
          {study.client}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-[12px] leading-relaxed text-midex-gray/75 sm:text-[13px]">
          {study.scope}
        </p>
        <div className="mt-3 flex items-end justify-between gap-2 border-t border-midex-line/70 pt-3">
          <div className="min-w-0">
            <p className="font-display text-base font-bold leading-none text-midex-navy sm:text-lg">
              {study.statValue}
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-midex-gray/60">
              {study.statLabel}
            </p>
          </div>
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-midex-line bg-midex-surface text-midex-navy transition-all duration-300 group-hover:border-midex-mint/50 group-hover:bg-midex-mint/10 group-hover:text-midex-navy sm:h-9 sm:w-9">
            <span className="mx-arrow text-sm">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export async function CaseStudiesSection({
  caseStudies: studiesProp,
  title: titleProp,
  subtitle: subtitleProp,
  showViewAllCta = true,
}: {
  caseStudies?: CaseStudy[];
  title?: string;
  subtitle?: string;
  showViewAllCta?: boolean;
} = {}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const studies = studiesProp ?? (await getCaseStudies(locale));
  const title = titleProp ?? t("caseStudiesTitle");
  const subtitle = subtitleProp ?? t("caseStudiesSubtitle");

  if (studies.length === 0) return null;

  // Home teaser only — full list lives on /case-studies
  const preview = studies.slice(0, 4);
  const [featured, ...rest] = preview;

  return (
    <section className="mx-section overflow-hidden">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="mx-section-title">{title}</h2>
              <p className="mx-section-subtitle mt-4">{subtitle}</p>
            </div>
            {showViewAllCta ? (
              <Link href="/case-studies" className="mx-link-arrow shrink-0 text-sm no-underline">
                {t("caseStudiesCta")}
                <span className="mx-arrow">→</span>
              </Link>
            ) : null}
          </div>
        </RevealOnScroll>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:items-start lg:gap-6">
          <RevealOnScroll className="w-full lg:col-span-7">
            <FeaturedCaseStudy study={featured} ctaLabel={t("caseStudiesRead")} />
          </RevealOnScroll>

          <div className="grid gap-4 sm:gap-5 lg:col-span-5">
            {rest.map((study, index) => (
              <RevealOnScroll key={study.slug} delay={(index + 1) * 90} className="w-full">
                <CaseStudyCard study={study} index={index} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
