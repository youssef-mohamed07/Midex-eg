import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getQuoteUrl } from "@/lib/cms";

type Props = {
  quoteSubject?: string;
};

export async function SolutionsCta({ quoteSubject }: Props) {
  const t = await getTranslations("solutions");
  const tc = await getTranslations("products");

  return (
    <section className="mx-section--tight">
      <div className="mx-container">
        <div className="relative overflow-hidden rounded-3xl bg-midex-navy px-8 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between">
          <div className="mx-grid-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="relative max-w-xl">
          <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/70">{t("ctaText")}</p>
          </div>
          <Link
            className="group relative mt-8 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-midex-navy no-underline transition hover:bg-midex-mint lg:mt-0"
            href={getQuoteUrl(quoteSubject)}
          >
            {tc("requestQuote")}
            <span className="mx-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
