import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteContact } from "@/lib/cms";

export async function QuoteCtaSection() {
  const t = await getTranslations("home");
  const th = await getTranslations("hero");
  const tc = await getTranslations("nav");
  const siteContact = await getSiteContact();

  return (
    <section className="mx-section">
      <div className="mx-container">
        <div className="relative overflow-hidden rounded-[1.25rem] bg-midex-navy px-4 py-8 shadow-2xl mx-mesh-bg sm:rounded-[2rem] sm:px-8 sm:py-12 lg:px-16 lg:py-16">
          <div className="mx-grid-overlay pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -end-16 -top-16 h-64 w-64 rounded-full bg-midex-mint/15 blur-3xl" />
            <div className="absolute -bottom-20 start-1/3 h-64 w-64 rounded-full bg-midex-blue/15 blur-3xl" />
          </div>

          <div className="relative grid gap-6 sm:gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            <div>
              <span className="mx-eyebrow mx-eyebrow--light">Midex</span>
              <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:mt-4 sm:text-4xl">
                {t("quoteTitle")}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                {t("quoteText")}
              </p>
              <div className="mt-7 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
                <a
                  href={`mailto:${siteContact.email}`}
                  className="inline-flex items-center gap-2 font-medium text-midex-mint transition-colors hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l9 6 9-6M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8a2 2 0 012-2h14a2 2 0 012 2" />
                  </svg>
                  {siteContact.email}
                </a>
                <span className="inline-flex items-center gap-2 text-white/70">
                  <svg className="h-4 w-4 text-midex-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h2.6a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.27 1.05L8.1 10.9a13 13 0 005 5l1.57-1.58a1 1 0 011.05-.27l3.6 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2A16 16 0 013 5z" />
                  </svg>
                  {siteContact.phones[0]}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:min-w-[240px] lg:flex-col">
              <Link className="group mx-btn mx-btn-mint justify-center" href="/contact">
                {t("quoteButton")}
                <span className="mx-arrow">→</span>
              </Link>
              <Link className="mx-btn mx-btn-outline justify-center" href="/products">
                {th("viewProducts")}
              </Link>
              <Link
                className="group inline-flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-midex-mint no-underline transition-colors hover:text-white"
                href="/solutions"
              >
                {tc("solutions")}
                <span className="mx-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
