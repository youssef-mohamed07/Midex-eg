import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { isValidImageSrc } from "@/lib/cms/images";
import { isSectionEnabled } from "@/lib/cms/section-resolve";
import type { PageCtaContent } from "@/lib/cms/types";

const CTA_LOGO = "/images/brand/logo-white.png";

type Props = {
  content: PageCtaContent & { title: string; text: string };
  /** Compact card for sidebars (e.g. blog post). */
  variant?: "band" | "card";
};

export function PageCtaSection({ content, variant = "band" }: Props) {
  if (!isSectionEnabled(content.enabled)) return null;
  if (!content.title?.trim()) return null;

  if (variant === "card") {
    return (
      <div className="rounded-2xl border border-midex-line bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold text-midex-navy">{content.title}</h2>
        {content.text ? (
          <p className="mt-2 text-sm leading-relaxed text-midex-gray/75">{content.text}</p>
        ) : null}
        {content.primaryCta && content.primaryCtaHref ? (
          <Link href={content.primaryCtaHref} className="mx-link-arrow mt-4 text-sm">
            {content.primaryCta}
            <span className="mx-arrow">→</span>
          </Link>
        ) : null}
      </div>
    );
  }

  const hasImage = isValidImageSrc(content.image);

  return (
    <section className="mx-section--tight">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="relative grid overflow-hidden rounded-2xl border border-midex-line/60 bg-midex-navy sm:rounded-[1.75rem] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
              <h2 className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-[2.1rem]">
                {content.title}
              </h2>
              {content.text ? (
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75 sm:mt-4 sm:text-base">
                  {content.text}
                </p>
              ) : null}
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                {content.primaryCta && content.primaryCtaHref ? (
                  <Link
                    href={content.primaryCtaHref}
                    className="group mx-btn mx-btn-primary w-full justify-center border-white/20 bg-white text-midex-navy hover:bg-midex-mint sm:w-auto"
                  >
                    {content.primaryCta}
                    <span className="mx-arrow" aria-hidden>
                      →
                    </span>
                  </Link>
                ) : null}
                {content.secondaryCta && content.secondaryCtaHref ? (
                  <Link
                    href={content.secondaryCtaHref}
                    className="mx-btn w-full justify-center border border-white/25 bg-white/10 text-white hover:bg-white/15 sm:w-auto"
                  >
                    {content.secondaryCta}
                  </Link>
                ) : null}
              </div>
            </div>

            {hasImage ? (
              <div className="relative min-h-[200px] sm:min-h-[240px] lg:min-h-full">
                <Image
                  src={content.image!}
                  alt={content.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-midex-navy/40 to-transparent lg:bg-gradient-to-l"
                  aria-hidden
                />
              </div>
            ) : (
              <div className="relative flex min-h-[140px] items-center justify-center px-8 py-10 sm:min-h-[180px] lg:min-h-full lg:justify-end lg:pe-12 xl:pe-16">
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(122,201,199,0.18),transparent_55%)]"
                  aria-hidden
                />
                <Image
                  src={CTA_LOGO}
                  alt="MIDEX"
                  width={280}
                  height={80}
                  className="relative h-10 w-auto max-w-[11rem] opacity-95 sm:h-12 sm:max-w-[13rem] lg:h-14 lg:max-w-[15rem]"
                  decoding="async"
                />
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
