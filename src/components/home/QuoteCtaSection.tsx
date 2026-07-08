import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageCtaCard } from "@/components/sections/PageCtaCard";
import { getSiteContact } from "@/lib/cms";
import type { PageCtaContent } from "@/lib/cms/types";

type Props = {
  content: PageCtaContent & { title: string; text: string };
};

export async function QuoteCtaSection({ content }: Props) {
  const th = await getTranslations("hero");
  const tc = await getTranslations("nav");
  const siteContact = await getSiteContact();

  return (
    <section className="mx-section">
      <div className="mx-container">
        <PageCtaCard>
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            <div className="text-center lg:text-start">
              <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
                {content.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 lg:mx-0 mx-auto">
                {content.text}
              </p>
              <div className="mt-7 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-3 lg:justify-start">
                <a
                  href={`mailto:${siteContact.email}`}
                  className="inline-flex items-center justify-center gap-2 font-medium text-midex-mint transition-colors hover:text-white lg:justify-start"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l9 6 9-6M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8a2 2 0 012-2h14a2 2 0 012 2" />
                  </svg>
                  {siteContact.email}
                </a>
                <span className="inline-flex items-center justify-center gap-2 text-white/65 lg:justify-start">
                  <svg className="h-4 w-4 text-midex-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h2.6a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.27 1.05L8.1 10.9a13 13 0 005 5l1.57-1.58a1 1 0 011.05-.27l3.6 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2A16 16 0 013 5z" />
                  </svg>
                  {siteContact.phones[0]}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:min-w-[240px] lg:flex-col">
              <Link
                className="group mx-btn mx-btn-mint justify-center"
                href={content.primaryCtaHref || "/contact"}
              >
                {content.primaryCta}
                <span className="mx-arrow">→</span>
              </Link>
              <Link
                className="mx-btn mx-btn-outline justify-center"
                href={content.secondaryCtaHref || "/products"}
              >
                {content.secondaryCta || th("viewProducts")}
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
        </PageCtaCard>
      </div>
    </section>
  );
}
