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
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-gradient-to-br from-midex-surface via-white to-midex-surface">
        {study.image ? (
          <Image
            src={study.image}
            alt={study.client}
            fill
            className="object-contain p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] sm:p-8"
            sizes="(max-width: 768px) 280px, 380px"
          />
        ) : (
          <div className="absolute inset-0 bg-midex-surface" aria-hidden />
        )}

        <div className="absolute start-3 top-3 z-10 flex flex-wrap gap-1.5 sm:start-4 sm:top-4">
          {study.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-midex-line/80 bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-midex-navy shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="absolute end-3 top-3 z-10 rounded-lg border border-midex-line/80 bg-white/95 px-2.5 py-1.5 text-center shadow-sm sm:end-4 sm:top-4 sm:px-3">
          <p className="font-display text-lg font-bold leading-none text-midex-navy sm:text-xl">
            {study.statValue}
          </p>
          <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wider text-midex-gray/70">
            {study.statLabel}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-midex-navy p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-midex-mint sm:text-[11px]">
          {study.industry}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-bold leading-tight text-white sm:text-2xl">
          {study.client}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-white/75 sm:text-sm">
          {study.outcome}
        </p>
        <span className="mx-link-arrow mt-3 inline-flex text-xs font-semibold text-midex-mint sm:mt-4 sm:text-sm">
          {ctaLabel}
          <span className="mx-arrow">→</span>
        </span>
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

  // For the homepage slider, we can show up to 6 case studies
  const preview = studies.slice(0, 6);

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

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:gap-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
          {preview.map((study, index) => (
            <RevealOnScroll 
              key={study.slug} 
              delay={index * 90} 
              className="w-[280px] shrink-0 snap-center sm:w-[340px] md:w-[360px] lg:w-[380px]"
            >
              <FeaturedCaseStudy study={study} ctaLabel={t("caseStudiesRead")} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
