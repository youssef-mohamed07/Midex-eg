import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { siteContact } from "@/content/site";

function MailIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-midex-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l9 6 9-6M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8a2 2 0 012-2h14a2 2 0 012 2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-midex-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h2.6a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.27 1.05L8.1 10.9a13 13 0 005 5l1.57-1.58a1 1 0 011.05-.27l3.6 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2A16 16 0 013 5z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-midex-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" strokeWidth={1.8} />
    </svg>
  );
}

export async function ContactPageContent() {
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("intro")} eyebrow="Midex" compact />

      <section className="mx-section bg-midex-surface">
        <div className="mx-container">
          <div className="grid gap-8 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-12 lg:items-start">
            <aside className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-midex-line bg-white shadow-md">
                <div className="border-b border-midex-line p-6 sm:p-7">
                  <h2 className="font-display text-lg font-bold text-midex-navy">
                    {t("salesQuotes")}
                  </h2>

                  <ul className="mt-5 space-y-4">
                    <li>
                      <a
                        href={`mailto:${siteContact.email}`}
                        className="group flex items-start gap-3 text-sm leading-relaxed text-midex-gray/80 no-underline transition-colors hover:text-midex-blue"
                      >
                        <MailIcon />
                        <span>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-midex-gray/55">
                            {t("email")}
                          </span>
                          <span className="font-medium text-midex-navy group-hover:text-midex-blue">
                            {siteContact.email}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li className="flex items-start gap-3 text-sm leading-relaxed text-midex-gray/80">
                      <PhoneIcon />
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-wider text-midex-gray/55">
                          {t("phone")}
                        </span>
                        <span className="font-medium text-midex-navy">
                          {siteContact.phones.join(" / ")}
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 sm:p-7">
                  <h2 className="font-display text-lg font-bold text-midex-navy">{t("office")}</h2>
                  <div className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-midex-gray/80">
                    <PinIcon />
                    <p>{siteContact.address}</p>
                  </div>
                </div>
              </div>
            </aside>

            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
