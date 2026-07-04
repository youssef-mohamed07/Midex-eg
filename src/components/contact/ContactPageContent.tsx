import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfoAside } from "@/components/contact/ContactInfoAside";
import { ContactMapSection } from "@/components/contact/ContactMapSection";
import { PageHero } from "@/components/layout/PageHero";

export async function ContactPageContent() {
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("intro")} eyebrow="Midex" compact />

      <section className="mx-section bg-midex-surface/35">
        <div className="mx-container">
          <div className="midex-contact-layout">
            <ContactInfoAside showOffice sticky />

            <Suspense fallback={null}>
              <div className="min-w-0">
                <ContactForm />
              </div>
            </Suspense>
          </div>
        </div>
      </section>

      <ContactMapSection />
    </>
  );
}
