import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { PageHeroImage } from "@/components/cms/PageHeroImage";
import type { PageHeroContent } from "@/lib/cms/types";

type Props = {
  hero: Required<Pick<PageHeroContent, "title">> & PageHeroContent;
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
      mediaAlign="center"
      media={<PageHeroImage src={hero.image} alt={hero.title} />}
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
