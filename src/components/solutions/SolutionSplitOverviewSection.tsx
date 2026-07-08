import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SolutionOverviewItemRows } from "@/components/solutions/SolutionOverviewItemRows";

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
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-12 xl:gap-16">
          <RevealOnScroll className="order-2 lg:order-1">
            <div className="relative min-h-[320px] overflow-hidden rounded-[1.75rem] border border-midex-line/60 shadow-[0_24px_64px_rgba(14,26,50,0.12)] sm:min-h-[400px] lg:min-h-[560px] lg:rounded-[2rem] xl:min-h-[620px]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-midex-navy/30 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </RevealOnScroll>

          <div className="order-1 flex flex-col justify-center lg:order-2">
            <RevealOnScroll>
              <h2 className="mx-section-title text-balance">{title}</h2>
              <p className="mx-section-subtitle mt-4 max-w-none text-balance">{intro}</p>
            </RevealOnScroll>

            {items.length > 0 && <SolutionOverviewItemRows items={items} />}
          </div>
        </div>
      </div>
    </section>
  );
}
