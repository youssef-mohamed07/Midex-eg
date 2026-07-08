import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { PromoSectionContent } from "@/lib/cms/types";

const DEFAULT_IMAGE = "/images/products/product-1724113383.jpg";
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
    <section className="mx-section">
      <div className="mx-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <RevealOnScroll>
            <div>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-midex-navy sm:text-4xl lg:text-[2.35rem]">
                {content.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-midex-gray/80 sm:text-lg">
                {content.body}
              </p>

              {features.length > 0 && (
                <ul className="mt-8 space-y-5 sm:mt-10">
                  {features.map((feature) => (
                    <li key={feature.title} className="flex gap-4">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-midex-mint"
                        aria-hidden
                      />
                      <div>
                        <p className="font-display text-base font-bold text-midex-navy sm:text-[1.05rem]">
                          {feature.title}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-midex-gray/75 sm:text-[15px]">
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
                  className="group mx-btn mx-btn-primary mt-8 inline-flex sm:mt-10"
                >
                  {content.ctaLabel}
                  <span className="mx-arrow">→</span>
                </Link>
              )}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-midex-line/50 bg-midex-surface/40 shadow-[0_24px_64px_rgba(14,26,50,0.1)] sm:rounded-[1.75rem] lg:rounded-[2rem]">
              <div className="relative aspect-[4/3] min-h-[280px] sm:aspect-[5/4] sm:min-h-[360px] lg:aspect-[4/5] lg:min-h-[480px] xl:min-h-[540px]">
                <Image
                  src={content.image || DEFAULT_IMAGE}
                  alt={content.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-midex-navy/70 via-midex-navy/15 to-transparent"
                  aria-hidden
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <Image
                  src={content.secondaryImage || DEFAULT_LOGO}
                  alt="Truvia"
                  width={140}
                  height={56}
                  className="h-10 w-auto max-w-[140px] object-contain brightness-0 invert sm:h-12"
                />
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  ASME BPE
                </span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
