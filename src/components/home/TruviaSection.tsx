import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const TRUVIA_FEATURES = [
  { titleKey: "truviaFeature1Title", textKey: "truviaFeature1Text" },
  { titleKey: "truviaFeature2Title", textKey: "truviaFeature2Text" },
  { titleKey: "truviaFeature3Title", textKey: "truviaFeature3Text" },
  { titleKey: "truviaFeature4Title", textKey: "truviaFeature4Text" },
] as const;

export async function TruviaSection() {
  const t = await getTranslations("home");

  return (
    <section className="mx-section">
      <div className="mx-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <RevealOnScroll>
            <div>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-midex-navy sm:text-4xl lg:text-[2.35rem]">
                {t("truviaTitle")}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-midex-gray/80 sm:text-lg">
                {t("truviaSubtitle")}
              </p>

              <ul className="mt-8 space-y-5 sm:mt-10">
                {TRUVIA_FEATURES.map((feature, index) => (
                  <li key={feature.titleKey} className="flex gap-4">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-midex-mint"
                      aria-hidden
                    />
                    <div>
                      <p className="font-display text-base font-bold text-midex-navy sm:text-[1.05rem]">
                        {t(feature.titleKey)}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-midex-gray/75 sm:text-[15px]">
                        {t(feature.textKey)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/products/category/piping-and-fitting"
                className="group mx-btn mx-btn-primary mt-8 inline-flex sm:mt-10"
              >
                {t("truviaDiscover")}
                <span className="mx-arrow">→</span>
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-midex-line/50 bg-midex-surface/40 shadow-[0_24px_64px_rgba(9,61,94,0.1)] sm:rounded-[1.75rem] lg:rounded-[2rem]">
              <div className="relative aspect-[4/3] min-h-[280px] sm:aspect-[5/4] sm:min-h-[360px] lg:aspect-[4/5] lg:min-h-[480px] xl:min-h-[540px]">
                <Image
                  src="/images/products/product-1724113383.jpg"
                  alt={t("truviaTitle")}
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
                  src="/images/exclusive/truvia.png"
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
