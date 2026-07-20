import Image from "next/image";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { resolveImageSrc } from "@/lib/cms/images";
import type { FaqSectionContent } from "@/lib/cms/types";

const FAQ_IMAGE_FALLBACK = "/images/about/values/reliability.webp";

type Props = {
  content: FaqSectionContent & {
    title: string;
    intro: string;
    items: { question: string; answer: string }[];
  };
  contactLabel: string;
};

export async function FaqSection({ content, contactLabel }: Props) {
  if (content.items.length === 0) return null;

  const image =
    resolveImageSrc(content.image) ?? FAQ_IMAGE_FALLBACK;

  return (
    <section className="mx-section-band">
      <div className="mx-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14 xl:gap-20">
          <RevealOnScroll>
            <div className="flex flex-col gap-6 lg:gap-8">
              <div>
                <h2 className="mx-section-title">{content.title}</h2>
                <p className="mx-section-subtitle mt-4 max-w-md">{content.intro}</p>
                <div className="mt-6 h-px w-16 bg-gradient-to-r from-midex-mint to-midex-blue" />
              </div>

              <figure className="relative overflow-hidden rounded-2xl bg-midex-surface">
                <Image
                  src={image}
                  alt=""
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="aspect-[4/5] h-auto w-full object-cover object-center sm:aspect-[5/6] lg:max-h-[28rem]"
                  decoding="async"
                />
              </figure>
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
