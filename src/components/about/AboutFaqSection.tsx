import { FaqAccordion } from "@/components/home/FaqAccordion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { FaqSectionContent } from "@/lib/cms/types";

type Props = {
  content: FaqSectionContent & {
    title: string;
    intro: string;
    items: { question: string; answer: string }[];
  };
  contactLabel: string;
};

export async function AboutFaqSection({ content, contactLabel }: Props) {
  if (content.items.length === 0) return null;

  return (
    <section className="mx-section-band overflow-hidden">
      <div className="mx-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14 xl:gap-20">
          <RevealOnScroll>
            <div className="lg:sticky lg:top-28">
              <h2 className="mx-section-title">{content.title}</h2>
              <p className="mx-section-subtitle mt-4 max-w-md">{content.intro}</p>
              <div className="mt-6 hidden h-px w-16 bg-gradient-to-r from-midex-mint to-midex-blue lg:block" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <FaqAccordion items={content.items} contactLabel={contactLabel} />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
