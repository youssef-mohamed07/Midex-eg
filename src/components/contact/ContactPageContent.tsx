import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfoAside } from "@/components/contact/ContactInfoAside";
import { ContactMapSection } from "@/components/contact/ContactMapSection";
import { ContactMapPrefetch } from "@/components/contact/ContactMapPrefetch";
import { PageHero } from "@/components/layout/PageHero";
import { getSiteSettings } from "@/lib/cms";

export async function ContactPageContent() {
  const t = await getTranslations("contact");
  const settings = await getSiteSettings();
  const siteContact = settings?.contact ?? {
    email: "",
    phones: [],
    address: "",
    mapsUrl: "",
    mapsEmbedUrl: "",
  };

  return (
    <>
      <ContactMapPrefetch embedUrl={siteContact.mapsEmbedUrl} />
      <PageHero title={t("title")} subtitle={t("intro")}compact />

      <section className="mx-section">
        <div className="mx-container">
          <div className="midex-contact-layout">
            <ContactInfoAside
              showOffice
              sticky
              siteContact={siteContact}
              settings={settings}
            />

            <Suspense fallback={null}>
              <div className="min-w-0">
                <ContactForm />
              </div>
            </Suspense>
          </div>
        </div>
      </section>

      <ContactMapSection siteContact={siteContact} />
    </>
  );
}
