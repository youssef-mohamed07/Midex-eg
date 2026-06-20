import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteContact } from "@/content/site";

export async function QuoteCtaSection() {
  const t = await getTranslations("home");
  const th = await getTranslations("hero");
  const tc = await getTranslations("nav");

  return (
    <section className="border-t border-midex-navy/10 bg-white py-12 lg:py-14">
      <div className="mx-container">
        <div className="grid gap-8 rounded-2xl border border-midex-navy/8 bg-midex-surface/60 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:p-10">
          <div>
            <span className="mx-badge mb-3">Midex</span>
            <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">
              {t("quoteTitle")}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-midex-gray/80">
              {t("quoteText")}
            </p>
            <p className="mt-4 text-sm text-midex-gray/65">
              <a
                href={`mailto:${siteContact.email}`}
                className="font-medium text-midex-blue hover:underline"
              >
                {siteContact.email}
              </a>
              <span className="mx-2 text-midex-navy/20">·</span>
              {siteContact.phones[0]}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:min-w-[220px]">
            <Link className="mx-btn mx-btn-primary justify-center" href="/contact">
              {t("quoteButton")}
            </Link>
            <Link
              className="mx-btn justify-center border border-midex-navy/15 bg-white text-midex-navy hover:bg-white hover:shadow-md"
              href="/products"
            >
              {th("viewProducts")}
            </Link>
            <Link
              className="text-center text-sm font-semibold text-midex-blue no-underline hover:underline"
              href="/solutions"
            >
              {tc("solutions")} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
