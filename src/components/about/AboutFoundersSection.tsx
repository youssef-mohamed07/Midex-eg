import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { aboutFounders } from "@/content/site";

export async function AboutFoundersSection() {
  const t = await getTranslations("about");

  return (
    <section className="mx-section--tight">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
            <h2 className="mx-section-title mt-4">{t("foundersTitle")}</h2>
          </div>
        </RevealOnScroll>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {aboutFounders.map((founder, index) => (
            <RevealOnScroll key={founder.id} delay={index * 60}>
              <article className="overflow-hidden rounded-2xl border border-midex-line/50 bg-white shadow-sm">
                <div className="relative aspect-[16/9] overflow-hidden bg-midex-surface/40">
                  <Image
                    src={founder.image}
                    alt={t(founder.nameKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-midex-navy/70 via-midex-navy/10 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-xl font-bold text-midex-navy sm:text-2xl">
                    {t(founder.nameKey)}
                  </h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-midex-blue">
                    {t(founder.roleKey)}
                  </p>
                  <p className="mt-4 text-base leading-[1.85] text-midex-gray/80">
                    {t(founder.bioKey)}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
