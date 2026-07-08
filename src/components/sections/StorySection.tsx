import type { ReactNode } from "react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { type Locale } from "@/i18n/routing";

const storyImage = "/images/events/event-1756814991.jpg";

type Props = {
  cta?: {
    href: string;
    label: ReactNode;
  };
};

export async function StorySection({ cta }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("about");
  const tc = await getTranslations("common");
  const textDir = locale === "ar" ? "rtl" : "ltr";

  const ctaLink = cta ?? {
    href: "/about-us",
    label: tc("learnMore"),
  };

  return (
    <section className="mx-section">
      <div className="mx-container">
        <div
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20"
          dir="ltr"
        >
          <RevealOnScroll>
            <div className="relative min-h-[16rem] overflow-hidden rounded-[1.5rem] border border-midex-line/50 shadow-[0_24px_64px_rgba(9,61,94,0.12)] sm:min-h-[20rem] sm:rounded-[1.75rem] lg:min-h-[32rem] lg:rounded-[2rem]">
              <Image
                src={storyImage}
                alt={t("storyTitle")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midex-navy/25 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <div className="text-start lg:py-4 lg:ps-2 xl:ps-6" dir={textDir}>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-midex-navy sm:mt-5 sm:text-4xl lg:text-[2.5rem]">
                {t("storyTitle")}
              </h2>
              <p className="mt-6 text-base leading-[1.85] text-midex-gray/85 sm:text-lg lg:mt-7">
                {t("storyText1")}
              </p>
              <p className="mt-4 text-base leading-[1.85] text-midex-gray/75 sm:text-lg">
                {t("storyText2")}
              </p>
              <Link
                href={ctaLink.href}
                className="group mx-btn mx-btn-primary mt-8 inline-flex sm:mt-10"
              >
                {ctaLink.label}
                <span className="mx-arrow">→</span>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
