import { getTranslations } from "next-intl/server";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const BEFORE_AFTER_MEDIA = {
  beforePoster: "/images/services/pickling-passivation.png",
  afterPoster: "/images/services/mirror-finish.png",
} as const;

const DURING_KEYS = [
  "processDuring1",
  "processDuring2",
  "processDuring3",
  "processDuring4",
  "processDuring5",
] as const;

const AFTER_KEYS = [
  "processAfter1",
  "processAfter2",
  "processAfter3",
  "processAfter4",
  "processAfter5",
] as const;

export async function BeforeAfterSection() {
  const t = await getTranslations("home");

  const duringKeywords = DURING_KEYS.map((key) => t(key));
  const afterKeywords = AFTER_KEYS.map((key) => t(key));

  return (
    <section className="mx-section overflow-hidden">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
          <h2 className="mx-section-title">{t("processPerformanceTitle")}</h2>
            <p className="mx-section-subtitle mx-auto mt-4">{t("beforeAfterTitle")}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="mt-8 sm:mt-10">
            <BeforeAfterSlider
              beforePoster={BEFORE_AFTER_MEDIA.beforePoster}
              afterPoster={BEFORE_AFTER_MEDIA.afterPoster}
              duringKeywords={duringKeywords}
              afterKeywords={afterKeywords}
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
