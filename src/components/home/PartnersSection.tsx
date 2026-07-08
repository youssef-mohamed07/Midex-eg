import Image from "next/image";
import { getPartners } from "@/lib/cms";
import { isValidImageSrc } from "@/lib/cms/images";
import type { Partner } from "@/lib/cms/types";

type Props = {
  title: string;
  partners?: Partner[];
};

function uniquePartners(partners: Partner[]) {
  const seen = new Set<string>();
  return partners.filter((partner) => {
    if (!isValidImageSrc(partner.image) || seen.has(partner.name)) return false;
    seen.add(partner.name);
    return true;
  });
}

function PartnerMarquee({ partners }: { partners: Partner[] }) {
  // Two copies for a seamless infinite scroll loop (not visible as static duplicates).
  const track = [...partners, ...partners];

  return (
    <div className="mx-marquee-fade mx-marquee-fade--white">
      <div className="mx-marquee-track mx-marquee-track--partners gap-8 sm:gap-10 lg:gap-14">
        {track.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex h-14 w-36 shrink-0 items-center justify-center px-3 sm:h-[4.5rem] sm:w-44 sm:px-4"
          >
            <Image
              src={partner.image}
              alt={partner.name}
              width={140}
              height={64}
              className="max-h-8 w-auto max-w-full object-contain sm:max-h-11"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function PartnersSection({ title, partners: partnersProp }: Props) {
  const partners = uniquePartners(partnersProp ?? (await getPartners()));

  if (partners.length === 0) return null;

  return (
    <section className="mx-section-band overflow-hidden">
      <div className="mx-container">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <h2 className="font-display text-xl font-bold tracking-tight text-midex-navy sm:text-2xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="w-full overflow-hidden" dir="ltr">
        <PartnerMarquee partners={partners} />
      </div>
    </section>
  );
}
