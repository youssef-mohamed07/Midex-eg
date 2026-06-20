import Image from "next/image";
import { clientLogos } from "@/content/site";

type Props = {
  title: string;
  subtitle: string;
};

function LogoMarquee({
  logos,
  reverse = false,
}: {
  logos: string[];
  reverse?: boolean;
}) {
  const track = [...logos, ...logos];

  return (
    <div className="mx-marquee-fade">
      <div className={`mx-marquee-track ${reverse ? "mx-marquee-track--reverse" : ""}`}>
        {track.map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="flex h-[72px] w-[148px] shrink-0 items-center justify-center rounded-xl border border-midex-navy/10 bg-white px-4 shadow-sm sm:h-20 sm:w-[168px]"
          >
            <Image
              src={logo}
              alt=""
              width={128}
              height={64}
              className="max-h-11 w-auto max-w-full object-contain sm:max-h-12"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientsSection({ title, subtitle }: Props) {
  const midpoint = Math.ceil(clientLogos.length / 2);
  const rowA = clientLogos.slice(0, midpoint);
  const rowB = clientLogos.slice(midpoint);

  return (
    <section className="overflow-hidden border-y border-midex-navy/8 bg-midex-surface/80 py-10 lg:py-12">
      <div className="mx-container">
        <div className="mb-6 text-center lg:mb-8">
          <span className="mx-badge mb-3">Midex</span>
          <h2 className="mx-section-title text-midex-navy">{title}</h2>
          <p className="mx-section-subtitle mx-auto mt-3 text-midex-gray/80">{subtitle}</p>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-midex-mint to-midex-blue" />
        </div>
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2 space-y-4" dir="ltr">
        <LogoMarquee logos={rowA} />
        <LogoMarquee logos={rowB} reverse />
      </div>
    </section>
  );
}
