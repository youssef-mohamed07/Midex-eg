import Image from "next/image";
import { partners } from "@/content/site";

type Props = {
  title: string;
  subtitle: string;
};

function PartnerMarquee() {
  const track = [...partners, ...partners];

  return (
    <div className="mx-marquee-fade mx-marquee-fade--white">
      <div className="mx-marquee-track mx-marquee-track--partners">
        {track.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-midex-line/70 bg-white px-4 shadow-sm sm:h-[4.5rem] sm:w-40"
          >
            <Image
              src={partner.image}
              alt={partner.name}
              width={140}
              height={64}
              className="max-h-10 w-auto max-w-full object-contain sm:max-h-11"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PartnersSection({ title, subtitle }: Props) {
  return (
    <section className="overflow-hidden border-y border-midex-line bg-white py-8 lg:py-9">
      <div className="mx-container">
        <div className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mx-eyebrow">Midex</span>
            <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-midex-navy sm:text-2xl">
              {title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-midex-gray/70 sm:pb-0.5 sm:text-end">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden" dir="ltr">
        <PartnerMarquee />
      </div>
    </section>
  );
}
