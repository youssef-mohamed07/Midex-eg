import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TimelineTrack } from "@/components/about/TimelineTrack";

const expertiseKeys = ["expertise1", "expertise2", "expertise3", "expertise4"] as const;

export async function AboutTimeline() {
  const t = await getTranslations("about");

  const items = expertiseKeys.map((key, index) => ({
    key,
    step: String(index + 1).padStart(2, "0"),
    title: t(`${key}Title`),
    text: t(`${key}Text`),
  }));

  return (
    <section className="mx-section bg-midex-surface">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
            <h2 className="mx-section-title mt-4">{t("timelineTitle")}</h2>
            <p className="mx-section-subtitle mx-auto">{t("expertiseSubtitle")}</p>
          </div>
        </RevealOnScroll>

        <TimelineTrack items={items} />
      </div>
    </section>
  );
}
