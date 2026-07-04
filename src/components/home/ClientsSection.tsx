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
            className="group flex h-[60px] w-[120px] shrink-0 items-center justify-center px-2 sm:h-20 sm:w-[168px] sm:px-3"
          >
            <Image
              src={logo}
              alt=""
              width={128}
              height={64}
              className="max-h-9 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-12"
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
    <section className="mx-section-band overflow-hidden">
      <div className="mx-container">
        <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-8 lg:mb-10">
          <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
          <h2 className="mx-section-title mt-4">{title}</h2>
          <p className="mx-section-subtitle mx-auto">{subtitle}</p>
        </div>
      </div>

      <div className="w-full space-y-4 overflow-hidden" dir="ltr">
        <LogoMarquee logos={rowA} />
        <LogoMarquee logos={rowB} reverse />
      </div>
    </section>
  );
}
