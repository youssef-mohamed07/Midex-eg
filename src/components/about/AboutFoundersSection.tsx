import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getAboutFounders } from "@/lib/cms";
import { pick } from "@/lib/cms/section-resolve";
import { isValidImageSrc } from "@/lib/cms/images";
import type { Locale } from "@/i18n/routing";

type Props = {
  title: string;
};

export async function AboutFoundersSection({ title }: Props) {
  const t = await getTranslations("about");
  const locale = (await getLocale()) as Locale;
  const aboutFounders = await getAboutFounders(locale);

  return (
    <section className="mx-section--tight">
      <div className="mx-container">
        <div className="mx-auto w-full max-w-4xl lg:max-w-5xl">
          <RevealOnScroll>
            <div className="mb-6 border-b border-midex-line/60 pb-5 sm:mb-7 sm:pb-6">
              <h2 className="mx-section-title mt-3 max-w-2xl">{title}</h2>
            </div>
          </RevealOnScroll>

          <div className="grid auto-rows-fr gap-4 lg:grid-cols-2 lg:gap-5">
            {aboutFounders.map((founder, index) => {
              const name = pick(founder.name, t(founder.nameKey));
              const role = pick(founder.role, t(founder.roleKey));
              const bio = pick(founder.bio, t(founder.bioKey));

              return (
                <RevealOnScroll key={founder.id} delay={index * 70} className="h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-midex-line/60 bg-white shadow-[0_18px_48px_rgba(14,26,50,0.08)] sm:rounded-[1.75rem]">
                    <div className="relative aspect-[16/10] w-full shrink-0 bg-midex-surface/50 sm:aspect-[3/2]">
                      {isValidImageSrc(founder.image) ? (
                        <Image
                          src={founder.image}
                          alt={name}
                          fill
                          quality={92}
                          priority={index === 0}
                          className="object-cover object-center"
                          sizes="(max-width: 1024px) 100vw, 480px"
                        />
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="font-display text-3xl font-bold tabular-nums leading-none text-midex-navy/[0.08] sm:text-4xl">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="-mt-5 font-display text-lg font-bold text-midex-navy sm:text-xl">
                        {name}
                      </h3>
                      <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-midex-blue sm:text-xs">
                        {role}
                      </p>
                      <span className="mt-4 block h-px w-10 bg-midex-blue/70" aria-hidden />
                      <p className="mt-4 flex-1 text-sm leading-[1.75] text-midex-gray/82">
                        {bio}
                      </p>
                    </div>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
