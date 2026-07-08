import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { MissionVisionContent } from "@/lib/cms/types";
import { pick } from "@/lib/cms/section-resolve";
import { isValidImageSrc } from "@/lib/cms/images";

type Props = {
  content?: MissionVisionContent;
};

export async function AboutMissionVisionSection({ content }: Props) {
  const t = await getTranslations("about");

  const title = pick(content?.title, t("missionVisionTitle"));
  const visionLabel = pick(content?.visionLabel, t("visionLabel"));
  const visionText = pick(content?.visionText, t("visionText"));
  const missionLabel = pick(content?.missionLabel, t("missionLabel"));
  const missionText = pick(content?.missionText, t("missionText"));

  return (
    <section className="mx-section overflow-hidden">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-8 border-b border-midex-line/60 pb-6 sm:mb-10 sm:pb-7">
            <h2 className="mx-section-title mt-3 max-w-2xl">{title}</h2>
          </div>
        </RevealOnScroll>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <RevealOnScroll>
            <article className="relative flex min-h-[280px] flex-col overflow-hidden rounded-[1.75rem] bg-midex-navy p-7 shadow-[0_24px_64px_rgba(14,26,50,0.22)] sm:min-h-[320px] sm:p-9 lg:rounded-[2rem] lg:p-10">
              {isValidImageSrc(content?.visionImage) && (
                <Image
                  src={content.visionImage}
                  alt=""
                  fill
                  className="object-cover opacity-20"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
              <div className="mx-grid-overlay pointer-events-none absolute inset-0 opacity-35" aria-hidden />
              <div
                className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full bg-midex-mint/15 blur-3xl"
                aria-hidden
              />

              <span className="relative font-display text-5xl font-bold tabular-nums leading-none text-white/10 sm:text-6xl">
                01
              </span>
              <h3 className="relative mt-5 font-display text-2xl font-bold text-white sm:text-[1.65rem]">
                {visionLabel}
              </h3>
              <span className="relative mt-4 block h-px w-12 bg-midex-mint" aria-hidden />
              <p className="relative mt-6 max-w-prose flex-1 text-[15px] leading-[1.85] text-white/78 sm:text-base">
                {visionText}
              </p>
            </article>
          </RevealOnScroll>

          <RevealOnScroll delay={70}>
            <article className="relative flex min-h-[280px] flex-col overflow-hidden rounded-[1.75rem] border border-midex-line/60 bg-gradient-to-br from-white via-midex-surface/40 to-midex-mint/15 p-7 shadow-[0_18px_48px_rgba(14,26,50,0.08)] sm:min-h-[320px] sm:p-9 lg:rounded-[2rem] lg:p-10">
              {isValidImageSrc(content?.missionImage) && (
                <Image
                  src={content.missionImage}
                  alt=""
                  fill
                  className="object-cover opacity-15"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
              <div
                className="pointer-events-none absolute -bottom-20 -start-10 h-52 w-52 rounded-full bg-midex-blue/8 blur-3xl"
                aria-hidden
              />

              <span className="relative font-display text-5xl font-bold tabular-nums leading-none text-midex-navy/[0.07] sm:text-6xl">
                02
              </span>
              <h3 className="relative mt-5 font-display text-2xl font-bold text-midex-navy sm:text-[1.65rem]">
                {missionLabel}
              </h3>
              <span className="relative mt-4 block h-px w-12 bg-midex-blue/70" aria-hidden />
              <p className="relative mt-6 max-w-prose flex-1 text-[15px] leading-[1.85] text-midex-gray/80 sm:text-base">
                {missionText}
              </p>
            </article>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
