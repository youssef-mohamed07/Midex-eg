import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionBreadcrumbs } from "@/components/solutions/SolutionBreadcrumbs";
import { isValidImageSrc } from "@/lib/cms/images";
import type { CaseStudy } from "@/lib/cms/types";

type Props = {
  study: CaseStudy;
  breadcrumbParent: string;
  /** Project photo shown on the right of the hero. */
  heroImage?: string;
};

export function CaseStudyHero({ study, breadcrumbParent, heroImage }: Props) {
  const logoSrc = isValidImageSrc(study.image) ? study.image : undefined;
  const photoSrc = isValidImageSrc(heroImage)
    ? heroImage
    : isValidImageSrc(study.gallery?.[0])
      ? study.gallery![0]
      : "/images/services/orbital-welding.png";

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
        <div className="relative mx-auto w-full max-w-[380px] overflow-hidden rounded-2xl border border-white/15 bg-midex-navy shadow-2xl shadow-black/30 lg:mx-0">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={photoSrc}
              alt={study.client}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 380px, 380px"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-midex-navy/55 via-transparent to-midex-navy/20"
              aria-hidden
            />

            {logoSrc ? (
              <div className="absolute bottom-4 start-4 z-10">
                <div className="relative h-14 w-36 overflow-hidden rounded-xl border border-white/70 bg-white shadow-lg">
                  <Image
                    src={logoSrc}
                    alt=""
                    fill
                    className="object-contain p-2"
                    sizes="144px"
                  />
                </div>
              </div>
            ) : study.statValue ? (
              <div className="absolute bottom-4 start-4 z-10 rounded-xl border border-white/20 bg-white/95 px-3.5 py-2.5 shadow-lg sm:bottom-5 sm:start-5 sm:px-4 sm:py-3">
                <p className="font-display text-2xl font-bold leading-none text-midex-navy">
                  {study.statValue}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-midex-gray/65">
                  {study.statLabel}
                </p>
              </div>
            ) : null}
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
