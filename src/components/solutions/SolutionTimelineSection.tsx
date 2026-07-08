import { getTranslations } from "next-intl/server";
import { ServicesTimeline } from "@/components/home/ServicesTimeline";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  deliveryStepImages,
  deliveryStepKeys,
} from "@/components/solutions/solution-delivery-steps";

export async function SolutionTimelineSection() {
  const t = await getTranslations("solutions");

  const services = deliveryStepKeys.map((key) => ({
    title: t(`${key}Title`),
    excerpt: t(`${key}Text`),
    image: deliveryStepImages[key],
  }));

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mx-section-title">{t("stepsGridTitle")}</h2>
            <p className="mx-section-subtitle mx-auto">{t("stepsGridSubtitle")}</p>
          </div>
        </RevealOnScroll>

        <ServicesTimeline services={services} />
      </div>
    </section>
  );
}
