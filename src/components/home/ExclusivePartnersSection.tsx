import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { exclusivePartners } from "@/content/site";

type Props = {
  title: string;
};

export function ExclusivePartnersSection({ title }: Props) {
  return (
    <section className="mx-section--tight bg-midex-surface">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-6 max-w-xl text-center sm:mb-10">
            <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-midex-navy sm:text-[1.75rem]">
              {title}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {exclusivePartners.map((partner, index) => (
            <RevealOnScroll key={partner.name} delay={index * 70}>
              <div className="flex h-16 items-center justify-center rounded-lg border border-midex-line bg-white px-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-midex-mint/45 hover:shadow-md sm:h-20 sm:rounded-xl sm:px-5">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={160}
                  height={72}
                  className="max-h-10 w-auto max-w-full object-contain sm:max-h-14"
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
