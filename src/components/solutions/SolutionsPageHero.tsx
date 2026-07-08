import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { isValidImageSrc } from "@/lib/cms/images";
import type { PageHeroContent, SolutionGroup } from "@/lib/cms/types";

const FALLBACK_HERO_IMAGE = "/images/services/orbital-welding.png";

function SolutionsHeroMedia({
  image,
  groups,
  alt,
}: {
  image?: string;
  groups: SolutionGroup[];
  alt: string;
}) {
  const fromCms = image?.trim();
  const fromGroup = groups.find((group) => isValidImageSrc(group.image))?.image;
  const src = isValidImageSrc(fromCms)
    ? fromCms
    : isValidImageSrc(fromGroup)
      ? fromGroup
      : FALLBACK_HERO_IMAGE;

  return (
    <div className="relative aspect-[4/3] w-full max-h-[min(420px,52vh)] overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/25 lg:aspect-[5/6] lg:max-h-[min(480px,62vh)]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 380px"
        priority
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-midex-navy/35 via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );
}

type Props = {
  hero: Required<Pick<PageHeroContent, "title">> & PageHeroContent;
  groups: SolutionGroup[];
  groupsCount: number;
  servicesCount: number;
  groupsLabel: string;
  servicesLabel: string;
  eyebrowFallback: string;
  primaryCtaFallback: string;
  secondaryCtaFallback: string;
};

export function SolutionsPageHero({
  hero,
  groups,
  groupsCount,
  servicesCount,
  groupsLabel,
  servicesLabel,
  eyebrowFallback,
  primaryCtaFallback,
  secondaryCtaFallback,
}: Props) {
  const eyebrow = hero.eyebrow?.trim() || eyebrowFallback;
  const primaryCta = hero.primaryCta?.trim() || primaryCtaFallback;
  const secondaryCta = hero.secondaryCta?.trim() || secondaryCtaFallback;

  return (
    <PageHero
      eyebrow={eyebrow}
      title={hero.title}
      subtitle={hero.subtitle}
      compact
      hideMediaBelow="lg"
      media={
        <SolutionsHeroMedia image={hero.image} groups={groups} alt={hero.title} />
      }
    >
      <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70 sm:mt-7">
        <span>
          <strong className="font-semibold text-white">{groupsCount}</strong> {groupsLabel}
        </span>
        <span className="hidden text-white/30 sm:inline" aria-hidden>
          ·
        </span>
        <span>
          <strong className="font-semibold text-midex-mint">{servicesCount}</strong>{" "}
          {servicesLabel}
        </span>
      </p>

      <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
        <Link
          href={hero.primaryCtaHref || "/contact"}
          className="group mx-btn mx-btn-primary border-white/20 bg-white text-midex-navy hover:bg-midex-mint hover:text-midex-navy"
        >
          {primaryCta}
          <span className="mx-arrow">→</span>
        </Link>
        <Link
          href={hero.secondaryCtaHref || "#capabilities"}
          className="mx-btn border border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10"
        >
          {secondaryCta}
        </Link>
      </div>
    </PageHero>
  );
}
