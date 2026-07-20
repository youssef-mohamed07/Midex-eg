import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { PromoSectionContent } from "@/lib/cms/types";

const DEFAULT_IMAGE = "/images/exclusive/truvia-section.png";
const DEFAULT_LOGO = "/images/exclusive/truvia.png";

type Props = {
  content: PromoSectionContent & {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export async function TruviaSection({ content }: Props) {
  const features = content.features ?? [];

  return (
    <section className="mx-section--tight lg:mx-section">
      <div className="mx-container">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <RevealOnScroll className="order-2 lg:order-1">
            <div>
              <h2 className="font-display text-2xl font-bold leading-snug text-midex-navy sm:text-4xl lg:text-[2.35rem]">
                {content.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-midex-gray/80 sm:mt-4 sm:text-lg">
                {content.body}
              </p>

              {features.length > 0 && (
                <ul className="mt-6 space-y-4 sm:mt-8 sm:space-y-5 lg:mt-10">
                  {features.map((feature) => (
                    <li key={feature.title} className="flex gap-3 sm:gap-4">
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-midex-mint sm:mt-2"
                        aria-hidden
                      />
                      <div className="min-w-0">
                        <p className="font-display text-[15px] font-bold leading-snug text-midex-navy sm:text-base lg:text-[1.05rem]">
                          {feature.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-midex-gray/75 sm:mt-1.5 sm:text-[15px]">
                          {feature.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {content.ctaLabel && content.ctaHref && (
                <Link
                  href={content.ctaHref}
                  className="group mx-btn mx-btn-primary mt-6 w-full justify-center sm:mt-8 sm:w-auto lg:mt-10"
                >
                  {content.ctaLabel}
                  <span className="mx-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              )}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80} className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl border border-midex-line/50 bg-midex-surface/40 shadow-[0_16px_40px_rgba(14,26,50,0.08)] sm:rounded-[1.75rem] sm:shadow-[0_24px_64px_rgba(14,26,50,0.1)] lg:rounded-[2rem]">
              <div className="relative aspect-[16/10] sm:aspect-[5/4] lg:aspect-[4/5] lg:min-h-[480px] xl:min-h-[540px]">
                <Image
                  src={content.image || DEFAULT_IMAGE}
                  alt={content.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-midex-navy/70 via-midex-navy/15 to-transparent"
                  aria-hidden
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:gap-4 sm:p-6">
                <Image
                  src={content.secondaryImage || DEFAULT_LOGO}
                  alt="Truvia"
                  width={140}
                  height={56}
                  className="h-8 max-w-[120px] object-contain brightness-0 invert sm:h-12 sm:max-w-[140px]"
                  style={{ width: "auto" }}
                />
                {content.badge ? (
                  <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[9px] font-semibold text-white backdrop-blur-sm sm:px-3 sm:py-1 sm:text-[10px]">
                    {content.badge}
                  </span>
                ) : null}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
