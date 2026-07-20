import { getTranslations } from "next-intl/server";
import { ServicesTimeline } from "@/components/home/ServicesTimeline";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  deliveryStepImages,
  deliveryStepKeys,
  resolveDeliveryStepImage,
} from "@/components/solutions/solution-delivery-steps";
import type { TimelineStepContent } from "@/lib/cms/types";
import { pick } from "@/lib/cms/section-resolve";

export async function SolutionTimelineSection({
  title,
  subtitle,
  steps: cmsSteps,
}: {
  title: string;
  subtitle: string;
  steps?: TimelineStepContent[];
}) {
  const t = await getTranslations("solutions");

  const services = deliveryStepKeys.map((key) => {
    const cmsStep = cmsSteps?.find((step) => step.key === key);
    return {
      title: pick(cmsStep?.title, t(`${key}Title`)),
      excerpt: pick(cmsStep?.text, t(`${key}Text`)),
      image: resolveDeliveryStepImage(
        key,
        cmsStep?.image || deliveryStepImages[key],
        deliveryStepImages[key],
      ),
    };
  });

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mx-section-title">{title}</h2>
            <p className="mx-section-subtitle mx-auto">{subtitle}</p>
          </div>
        </RevealOnScroll>

        <ServicesTimeline services={services} />
      </div>
    </section>
  );
}
