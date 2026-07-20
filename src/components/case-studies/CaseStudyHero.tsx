import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionBreadcrumbs } from "@/components/solutions/SolutionBreadcrumbs";
import { isValidImageSrc } from "@/lib/cms/images";
import type { CaseStudy } from "@/lib/cms/types";

type Props = {
  study: CaseStudy;
  breadcrumbParent: string;
};

export function CaseStudyHero({ study, breadcrumbParent }: Props) {
  const logoSrc = isValidImageSrc(study.image) ? study.image : undefined;

  return (
    <PageHero
      compact
      eyebrow={study.industry}
      title={study.client}
      mediaFirstOnMobile
      breadcrumbs={
        <SolutionBreadcrumbs
          light
          items={[
            { label: breadcrumbParent, href: "/case-studies" },
            { label: study.client },
          ]}
        />
      }
      media={
        <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl shadow-black/30 lg:mx-0">
          <div className="relative aspect-[16/10] w-full">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={study.client}
                fill
                priority
                className="object-contain p-8 sm:p-10"
                sizes="(max-width: 1024px) 420px, 420px"
              />
            ) : study.statValue ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <p className="font-display text-4xl font-bold leading-none text-midex-navy sm:text-5xl">
                  {study.statValue}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-midex-gray/65">
                  {study.statLabel}
                </p>
              </div>
            ) : (
              <div className="absolute inset-0 bg-midex-surface" aria-hidden />
            )}
          </div>
        </div>
      }
    >
      {study.tags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {study.statValue && logoSrc ? (
        <div className="mt-5 inline-flex items-center gap-4 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-sm sm:mt-6 sm:px-5 sm:py-4">
          <p className="font-display text-2xl font-bold leading-none text-white sm:text-3xl">
            {study.statValue}
          </p>
          <div className="h-8 w-px bg-white/20" aria-hidden />
          <p className="max-w-[12rem] text-[11px] font-semibold uppercase leading-snug tracking-[0.12em] text-white/72 sm:text-xs">
            {study.statLabel}
          </p>
        </div>
      ) : null}
    </PageHero>
  );
}
