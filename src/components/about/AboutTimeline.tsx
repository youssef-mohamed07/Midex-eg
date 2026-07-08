import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServicesTimeline } from "@/components/home/ServicesTimeline";

const expertiseKeys = ["expertise1", "expertise2", "expertise3", "expertise4"] as const;

const expertiseImages: Record<(typeof expertiseKeys)[number], string> = {
  expertise1: "/images/hero/slide-1.png",
  expertise2: "/images/services/orbital-welding.png",
  expertise3: "/images/services/spray-ball.png",
  expertise4: "/images/services/mechanical-polishing.png",
};

export async function AboutTimeline() {
  const t = await getTranslations("about");

  const services = expertiseKeys.map((key) => ({
    title: t(`${key}Title`),
    excerpt: t(`${key}Text`),
    image: expertiseImages[key],
  }));

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mx-section-title">{t("timelineTitle")}</h2>
            <p className="mx-section-subtitle mx-auto">{t("expertiseSubtitle")}</p>
          </div>
        </RevealOnScroll>

        <ServicesTimeline services={services} />
      </div>
    </section>
  );
}
