import { ServicesTimeline } from "@/components/home/ServicesTimeline";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { SolutionGroupWorkflowContent } from "@/lib/cms/types";

type Props = {
  content: SolutionGroupWorkflowContent;
};

export function SolutionGroupWorkflowSection({ content }: Props) {
  const services = content.steps.map((step) => ({
    title: step.title,
    excerpt: step.text,
    image: step.image,
  }));

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
            <h2 className="mx-section-title mt-4">{content.title}</h2>
            <p className="mx-section-subtitle mx-auto">{content.intro}</p>
          </div>
        </RevealOnScroll>

        <ServicesTimeline services={services} />
      </div>
    </section>
  );
}
