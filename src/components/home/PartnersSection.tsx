import Image from "next/image";
import { getPartners } from "@/lib/cms";
import type { Partner } from "@/lib/cms/types";

type Props = {
  title: string;
  subtitle: string;
  partners?: Partner[];
};

function PartnerMarquee({ partners }: { partners: Partner[] }) {
  const track = partners.filter((p) => p.image).flatMap((p) => [p, p]);

  if (track.length === 0) return null;

  return (
    <div className="mx-marquee-fade mx-marquee-fade--white">
      <div className="mx-marquee-track mx-marquee-track--partners gap-8 sm:gap-10 lg:gap-14">
        {track.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex h-14 w-36 shrink-0 items-center justify-center px-3 sm:h-[4.5rem] sm:w-44 sm:px-4"
          >
            <div className="mx-partner-logo">
              <Image
                src={partner.image}
                alt={partner.name}
                width={140}
                height={64}
                className="max-h-8 w-auto max-w-full object-contain sm:max-h-11"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function PartnersSection({ title, subtitle, partners: partnersProp }: Props) {
  const partners = partnersProp ?? (await getPartners());

  return (
    <section className="mx-section-band overflow-hidden">
      <div className="mx-container">
        <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-7">
          <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
          <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-midex-navy sm:mt-4 sm:text-2xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-midex-gray/70 sm:text-base">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden" dir="ltr">
        <PartnerMarquee partners={partners} />
      </div>
    </section>
  );
}
