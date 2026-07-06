import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { aboutStandards } from "@/content/site";

export async function AboutStandardsSection() {
  const t = await getTranslations("about");

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
            <h2 className="mx-section-title mt-4">{t("standardsTitle")}</h2>
            <p className="mx-section-subtitle mx-auto mt-4">{t("standardsSubtitle")}</p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {aboutStandards.map((key, index) => (
            <RevealOnScroll key={key} delay={index * 40}>
              <div className="flex min-h-[5.5rem] items-center justify-center rounded-2xl border border-midex-line/50 bg-white px-4 py-6 text-center shadow-sm sm:min-h-[6.5rem]">
                <span className="font-display text-lg font-bold tracking-wide text-midex-navy sm:text-xl">
                  {t(key)}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
