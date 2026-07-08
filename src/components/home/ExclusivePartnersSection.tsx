import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getExclusivePartners } from "@/lib/cms";
import { isValidImageSrc } from "@/lib/cms/images";
import type { Partner } from "@/lib/cms/types";

type Props = {
  title: string;
  partners?: Partner[];
};

export async function ExclusivePartnersSection({ title, partners: partnersProp }: Props) {
  const exclusivePartners = (partnersProp ?? (await getExclusivePartners())).filter(
    (p) => isValidImageSrc(p.image),
  );

  return (
    <section className="mx-section--tight">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-6 max-w-xl text-center sm:mb-10">
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-midex-navy sm:text-[1.75rem]">
              {title}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {exclusivePartners.map((partner, index) => (
            <RevealOnScroll key={partner.name} delay={index * 70}>
              <div className="flex h-16 items-center justify-center px-3 sm:h-20 sm:px-4">
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
