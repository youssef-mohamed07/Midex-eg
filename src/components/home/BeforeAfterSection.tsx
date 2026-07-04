import { getTranslations } from "next-intl/server";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const BEFORE_AFTER_MEDIA = {
  beforeVideo: "/videos/before-after/before.mp4",
  afterVideo: "/videos/before-after/after.mp4",
} as const;

export async function BeforeAfterSection() {
  const t = await getTranslations("home");

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-badge mx-auto mb-5 border-midex-line bg-midex-surface text-midex-navy">
              {t("beforeAfterBadge")}
            </span>
            <h2 className="mx-section-title">{t("beforeAfterTitle")}</h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="mt-8 sm:mt-10">
            <BeforeAfterSlider
              beforeLabel={t("beforeAfterBefore")}
              afterLabel={t("beforeAfterAfter")}
              beforeVideo={BEFORE_AFTER_MEDIA.beforeVideo}
              afterVideo={BEFORE_AFTER_MEDIA.afterVideo}
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
