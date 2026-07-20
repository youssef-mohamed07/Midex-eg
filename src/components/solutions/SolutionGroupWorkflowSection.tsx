import { ServicesTimeline } from "@/components/home/ServicesTimeline";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { resolveDeliveryStepImage } from "@/components/solutions/solution-delivery-steps";
import type { SolutionGroupWorkflowContent } from "@/lib/cms/types";

type Props = {
  content: SolutionGroupWorkflowContent;
};

export function SolutionGroupWorkflowSection({ content }: Props) {
  const services = content.steps.map((step) => ({
    title: step.title,
    excerpt: step.text,
    image: resolveDeliveryStepImage(step.id, step.image),
  }));

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="mx-section-title">{content.title}</h2>
            <p className="mx-section-subtitle mx-auto">{content.intro}</p>
          </div>
        </RevealOnScroll>

        <ServicesTimeline services={services} />
      </div>
    </section>
  );
}
