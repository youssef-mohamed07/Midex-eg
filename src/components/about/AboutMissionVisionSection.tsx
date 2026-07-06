import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export async function AboutMissionVisionSection() {
  const t = await getTranslations("about");

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
            <h2 className="mx-section-title mt-4">{t("missionVisionTitle")}</h2>
          </div>
        </RevealOnScroll>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <RevealOnScroll delay={40}>
            <article className="rounded-2xl border border-midex-line/50 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="font-display text-lg font-bold text-midex-blue sm:text-xl">
                {t("visionLabel")}
              </h3>
              <p className="mt-4 text-base leading-[1.85] text-midex-gray/80">{t("visionText")}</p>
            </article>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <article className="rounded-2xl border border-midex-line/50 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="font-display text-lg font-bold text-midex-blue sm:text-xl">
                {t("missionLabel")}
              </h3>
              <p className="mt-4 text-base leading-[1.85] text-midex-gray/80">{t("missionText")}</p>
            </article>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
