import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getAboutFounders } from "@/lib/cms";

export async function AboutFoundersSection() {
  const t = await getTranslations("about");
  const aboutFounders = await getAboutFounders();

  return (
    <section className="mx-section--tight">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-6 border-b border-midex-line/60 pb-5 sm:mb-7 sm:pb-6">
            <h2 className="mx-section-title mt-3 max-w-2xl">{t("foundersTitle")}</h2>
          </div>
        </RevealOnScroll>

        <div className="grid auto-rows-fr gap-4 lg:grid-cols-2 lg:gap-5">
          {aboutFounders.map((founder, index) => (
            <RevealOnScroll key={founder.id} delay={index * 70} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-midex-line/60 bg-white shadow-[0_18px_48px_rgba(9,61,94,0.08)] sm:rounded-[1.75rem]">
                <div className="relative aspect-[16/10] w-full shrink-0 bg-midex-surface/50 sm:aspect-[3/2]">
                  <Image
                    src={founder.image}
                    alt={t(founder.nameKey)}
                    fill
                    quality={92}
                    priority={index === 0}
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="font-display text-3xl font-bold tabular-nums leading-none text-midex-navy/[0.08] sm:text-4xl">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="-mt-5 font-display text-lg font-bold text-midex-navy sm:text-xl">
                    {t(founder.nameKey)}
                  </h3>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-midex-blue sm:text-xs">
                    {t(founder.roleKey)}
                  </p>
                  <span className="mt-4 block h-px w-10 bg-midex-blue/70" aria-hidden />
                  <p className="mt-4 flex-1 text-sm leading-[1.75] text-midex-gray/82">
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
