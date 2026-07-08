import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SolutionOverviewPanel } from "@/components/solutions/SolutionOverviewPanel";

type Props = {
  title: string;
  intro: string;
  items: string[];
  image: string;
  imageAlt: string;
};

export function SolutionSplitOverviewSection({
  title,
  intro,
  items,
  image,
  imageAlt,
}: Props) {
  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <SolutionOverviewPanel
            title={title}
            intro={intro}
            items={items}
            image={image}
            imageAlt={imageAlt}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
