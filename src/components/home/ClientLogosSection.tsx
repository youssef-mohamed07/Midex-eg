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
                className="flex h-14 w-36 shrink-0 items-center justify-center px-3 sm:h-[4.5rem] sm:w-44 sm:px-4"
              >
                <Image
                  src={logo}
                  alt=""
                  width={140}
                  height={64}
                  className="max-h-8 w-auto max-w-full object-contain opacity-80 sm:max-h-11"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
