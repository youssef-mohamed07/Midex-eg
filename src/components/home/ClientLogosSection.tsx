import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { isValidImageSrc } from "@/lib/cms/images";

type Props = {
  title: string;
  logos: string[];
};

export function ClientLogosSection({ title, logos }: Props) {
  const validLogos = logos.filter(isValidImageSrc);

  if (validLogos.length === 0) return null;

  const track = [...validLogos, ...validLogos];

  return (
    <section className="mx-section-band overflow-hidden">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <h2 className="font-display text-xl font-bold tracking-tight text-midex-navy sm:text-2xl">
              {title}
            </h2>
          </div>
        </RevealOnScroll>
      </div>

      <div className="w-full overflow-hidden" dir="ltr">
        <div className="mx-marquee-fade mx-marquee-fade--white">
          <div className="mx-marquee-track mx-marquee-track--partners gap-8 sm:gap-10 lg:gap-14">
            {track.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex h-16 w-32 shrink-0 items-center justify-center px-4 sm:h-20 sm:w-48 sm:px-6 lg:h-24 lg:w-56"
              >
                <Image
                  src={logo}
                  alt=""
                  width={224}
                  height={96}
                  className="h-full w-full object-contain opacity-70 transition-opacity hover:opacity-100 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
