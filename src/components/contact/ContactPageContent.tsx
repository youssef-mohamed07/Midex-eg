import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { siteContact } from "@/content/site";

export async function ContactPageContent() {
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("intro")} />

      <div className="mx-container pb-20 pt-10">
        <div className="midex-contact-layout">
          <aside className="space-y-4">
            <div className="midex-contact-card">
              <h3 className="font-display text-lg font-bold text-midex-navy">
                {t("salesQuotes")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-midex-gray/85">
                <strong>{t("email")}:</strong>{" "}
                <a className="text-midex-blue hover:underline" href={`mailto:${siteContact.email}`}>
                  {siteContact.email}
                </a>
                <br />
                <strong>{t("phone")}:</strong> {siteContact.phones.join(" / ")}
              </p>
            </div>
            <div className="midex-contact-card">
              <h3 className="font-display text-lg font-bold text-midex-navy">{t("office")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-midex-gray/85">
                {siteContact.address}
              </p>
            </div>
          </aside>

          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </>
  );
}
