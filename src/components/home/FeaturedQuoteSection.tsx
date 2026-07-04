import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

function UserAvatar({ name }: { name: string }) {
  return (
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-midex-navy shadow-sm sm:h-[3.25rem] sm:w-[3.25rem]">
      <svg
        className="h-6 w-6 text-white/95"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M12 12a4 4 0 100-8 4 4 0 000 8z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6"
        />
      </svg>
      <span className="sr-only">{name}</span>
    </div>
  );
}

export async function FeaturedQuoteSection() {
  const t = await getTranslations("home");

  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-container">
        <RevealOnScroll>
          <figure className="mx-auto max-w-3xl text-center">
            <UserAvatar name={t("featuredQuoteAuthor")} />

            <blockquote className="mt-6 sm:mt-7">
              <p className="font-display text-lg font-medium leading-[1.7] text-midex-navy sm:text-xl sm:leading-[1.65] lg:text-[1.35rem]">
                {t("featuredQuoteText")}
              </p>
            </blockquote>

            <div className="mx-auto mt-6 h-0.5 w-10 rounded-full bg-midex-mint sm:mt-7" aria-hidden />

            <figcaption className="mt-5 sm:mt-6">
              <cite className="font-display text-sm font-bold not-italic text-midex-navy sm:text-base">
                {t("featuredQuoteAuthor")}
              </cite>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-midex-gray/55">
                {t("featuredQuoteRole")}
              </p>
            </figcaption>
          </figure>
        </RevealOnScroll>
      </div>
    </section>
  );
}
