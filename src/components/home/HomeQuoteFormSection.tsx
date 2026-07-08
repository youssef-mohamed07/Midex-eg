import { getTranslations } from "next-intl/server";
import { MultiStepQuoteForm } from "@/components/home/MultiStepQuoteForm";
import { QuoteFormAside } from "@/components/home/QuoteFormAside";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export async function HomeQuoteFormSection() {
  const t = await getTranslations("home");

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-8 max-w-2xl lg:mb-10">
          <h2 className="mx-section-title mt-5">{t("quoteFormTitle")}</h2>
            <p className="mx-section-subtitle mt-4">{t("quoteFormSubtitle")}</p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-8 lg:grid-cols-[minmax(280px,340px)_1fr] lg:items-start lg:gap-10 xl:gap-12">
          <QuoteFormAside />

          <RevealOnScroll delay={100}>
            <div className="midex-contact-form-card rounded-[1.5rem] p-6 shadow-xl shadow-midex-navy/8 sm:p-8 lg:p-10 xl:p-12">
              <MultiStepQuoteForm size="large" />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
