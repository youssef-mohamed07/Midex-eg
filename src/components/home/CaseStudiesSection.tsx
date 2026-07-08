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
      className="group relative block h-full min-h-[320px] w-full overflow-hidden rounded-2xl border border-white/10 no-underline shadow-2xl sm:min-h-[420px] lg:min-h-0 lg:rounded-3xl"
    >
      {study.image ? (
        <Image
          src={study.image}
          alt={study.client}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      ) : (
        <div className="absolute inset-0 bg-midex-navy" aria-hidden />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-midex-navy via-midex-navy/55 to-midex-navy/10" />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 mx-case-study-glow"
        aria-hidden
      />

      <div className="absolute start-4 top-4 z-10 flex flex-wrap gap-2 sm:start-6 sm:top-6">
        {study.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm sm:text-[11px]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute end-4 top-4 z-10 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-center backdrop-blur-md sm:end-6 sm:top-6 sm:px-4 sm:py-3">
        <p className="font-display text-2xl font-bold leading-none text-white sm:text-3xl">{study.statValue}</p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-white/70 sm:text-[11px]">
          {study.statLabel}
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-7 lg:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-midex-mint sm:text-xs">
          {study.industry}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          {study.client}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-3 sm:text-base">
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
      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-midex-line/70 bg-white no-underline shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/40 hover:shadow-lg sm:rounded-2xl lg:flex-row lg:items-stretch"
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden lg:aspect-auto lg:h-auto lg:min-h-full lg:w-[40%] lg:self-stretch xl:w-[42%]">
        {study.image ? (
          <Image
            src={study.image}
            alt={study.client}
            fill
            className="object-cover object-center transition-transform duration-600 group-hover:scale-[1.05]"
            sizes="(max-width: 1024px) 100vw, 220px"
          />
        ) : (
          <div className="absolute inset-0 bg-midex-surface" aria-hidden />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-midex-navy/5 transition-colors group-hover:to-midex-navy/10" />
        <span className="absolute start-3 top-3 z-10 font-display text-2xl font-bold tabular-nums text-white drop-shadow-md sm:start-4 sm:top-4">
          {String(index + 2).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-midex-blue sm:text-[11px]">
          {study.industry}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-midex-navy transition-colors group-hover:text-midex-blue sm:text-xl">
          {study.client}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-midex-gray/75 sm:text-sm">
          {study.scope}
        </p>
        <div className="mt-3 flex items-end justify-between gap-3 border-t border-midex-line/70 pt-3 sm:mt-4">
          <div>
            <p className="font-display text-lg font-bold leading-none text-midex-navy">{study.statValue}</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-midex-gray/60">
              {study.statLabel}
            </p>
          </div>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-midex-line bg-midex-surface text-midex-navy transition-all duration-300 group-hover:border-midex-mint/50 group-hover:bg-midex-mint/10 group-hover:text-midex-blue">
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
}: {
  caseStudies?: CaseStudy[];
  title?: string;
  subtitle?: string;
} = {}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const studies = studiesProp ?? (await getCaseStudies(locale));
  const title = titleProp ?? t("caseStudiesTitle");
  const subtitle = subtitleProp ?? t("caseStudiesSubtitle");

  if (studies.length === 0) return null;

  const [featured, ...rest] = studies;

  return (
    <section className="mx-section overflow-hidden">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="mx-section-title mt-5">{title}</h2>
              <p className="mx-section-subtitle mt-4">{subtitle}</p>
            </div>
            <Link href="/contact" className="mx-link-arrow shrink-0 text-sm no-underline">
              {t("caseStudiesCta")}
              <span className="mx-arrow">→</span>
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:items-stretch lg:gap-6">
          <RevealOnScroll className="flex h-full w-full lg:col-span-7">
            <FeaturedCaseStudy study={featured} ctaLabel={t("caseStudiesRead")} />
          </RevealOnScroll>

          <div className="grid gap-4 sm:gap-5 lg:col-span-5 lg:grid-cols-1">
            {rest.map((study, index) => (
              <RevealOnScroll key={study.slug} delay={(index + 1) * 90} className="flex h-full w-full">
                <CaseStudyCard study={study} index={index} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
