import Image from "next/image";
import { getLocale } from "next-intl/server";
import { WordRevealText } from "@/components/ui/WordRevealText";
import { getAboutFounders } from "@/lib/cms";
import { isValidImageSrc } from "@/lib/cms/images";
import type { QuoteBlockContent } from "@/lib/cms/types";
import { type Locale } from "@/i18n/routing";

function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 36"
      fill="currentColor"
      aria-hidden
    >
      <path d="M10.8 36C7.6 36 5 34.9 3 32.7 1 30.4 0 27.5 0 24 0 20.1 1.1 16.2 3.3 12.3 5.6 8.3 8.9 4.2 13.2 0l7.5 4.8c-2.5 2.7-4.5 5.2-6 7.5-1.4 2.3-2.2 4.3-2.4 6 3 .3 5.4 1.4 7.2 3.3 1.8 1.8 2.7 4.1 2.7 6.9 0 2.2-.9 4-2.6 5.4-1.7 1.4-4 2.1-6.8 2.1Zm26.4 0c-3.2 0-5.8-1.1-7.8-3.3-2-2.3-3-5.2-3-8.7 0-3.9 1.1-7.8 3.3-11.7C31.9 8.3 35.3 4.2 39.6 0l7.5 4.8c-2.5 2.7-4.5 5.2-6 7.5-1.4 2.3-2.2 4.3-2.4 6 3 .3 5.4 1.4 7.2 3.3 1.8 1.8 2.7 4.1 2.7 6.9 0 2.2-.9 4-2.6 5.4-1.7 1.4-4 2.1-6.8 2.1Z" />
    </svg>
  );
}

type Props = {
  content: QuoteBlockContent & { quote: string; name: string; role: string };
};

async function resolveFounderImage(
  locale: Locale,
  quoteImage: string | undefined,
  quoteName: string,
): Promise<string | undefined> {
  if (isValidImageSrc(quoteImage)) return quoteImage;

  const founders = await getAboutFounders(locale);
  const normalizedName = quoteName.toLowerCase();

  const matched =
    founders.find((founder) => founder.nameKey === "founder2Name") ||
    founders.find((founder) => {
      const name = `${founder.name ?? ""} ${founder.nameKey ?? ""}`.toLowerCase();
      return name.includes("abdelrahman") || normalizedName.includes("abdelrahman");
    }) ||
    founders[0];

  return isValidImageSrc(matched?.image) ? matched.image : undefined;
}

export async function FeaturedQuoteSection({ content }: Props) {
  const locale = (await getLocale()) as Locale;
  const isLatin = locale !== "ar";
  const photo = await resolveFounderImage(locale, content.image, content.name);

  return (
    <section className="relative overflow-hidden mx-section">
      <div className="relative mx-container">
        <figure className="mx-auto max-w-3xl text-center">
          <QuoteMark className="mx-auto h-10 w-auto text-midex-blue/35 sm:h-12 lg:h-14" />

          <blockquote className="mt-8 sm:mt-10">
            <p className="text-balance font-display text-xl font-bold leading-[1.65] text-midex-navy sm:text-2xl sm:leading-[1.6] lg:text-[1.65rem]">
              <WordRevealText text={content.quote} />
            </p>
          </blockquote>

          <figcaption className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:gap-4">
            <span className="h-px w-10 bg-midex-blue/30" aria-hidden />

            {photo ? (
              <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-midex-surface shadow-md ring-2 ring-midex-mint/35 sm:h-16 sm:w-16">
                <Image
                  src={photo}
                  alt={content.name}
                  fill
                  className="object-cover object-top"
                  sizes="64px"
                />
              </div>
            ) : null}

            <cite
              className={`text-[11px] font-semibold not-italic sm:text-xs ${
                isLatin ? "uppercase tracking-[0.2em]" : "tracking-wide"
              }`}
            >
              <span className="text-midex-blue">{content.name}</span>
              <span className="text-midex-gray/45">, {content.role}</span>
            </cite>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
