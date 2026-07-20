import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { BeforeAfterContent } from "@/lib/cms/types";

const BEFORE_AFTER_MEDIA = {
  beforePoster: "/images/before-after/before.webp",
  afterPoster: "/images/before-after/after.webp",
} as const;

type Props = {
  content: BeforeAfterContent & {
    title: string;
    subtitle: string;
    beforeItems: string[];
    afterItems: string[];
  };
};

export async function BeforeAfterSection({ content }: Props) {
  const beforePoster = content.beforeImage || BEFORE_AFTER_MEDIA.beforePoster;
  const afterPoster = content.afterImage || BEFORE_AFTER_MEDIA.afterPoster;

  return (
    <section className="mx-section overflow-hidden">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mx-section-title">{content.title}</h2>
            <p className="mx-section-subtitle mx-auto mt-4">{content.subtitle}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="mt-8 sm:mt-10">
            <BeforeAfterSlider
              beforePoster={beforePoster}
              afterPoster={afterPoster}
              duringKeywords={content.beforeItems}
              afterKeywords={content.afterItems}
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
