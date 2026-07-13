import { getLocale, getTranslations } from "next-intl/server";
import { QuoteFormAside } from "@/components/home/QuoteFormAside";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MultiStepQuoteForm } from "@/components/home/MultiStepQuoteForm";
import { getHomePageSections } from "@/lib/cms";
import type { QuoteFormCopy } from "@/lib/cms/types";
import type { Locale } from "@/i18n/routing";

export async function HomeQuoteFormSection({
  title: titleProp,
  subtitle: subtitleProp,
  copy: copyProp,
}: {
  title?: string;
  subtitle?: string;
  copy?: QuoteFormCopy;
} = {}) {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const sections = copyProp ? null : await getHomePageSections(locale);
  const copy = copyProp ?? sections?.quoteFormCopy ?? {};
  const title = titleProp ?? t("quoteFormTitle");
  const subtitle = subtitleProp ?? t("quoteFormSubtitle");

  return (
    <section id="quote-form" className="mx-section scroll-mt-28">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-8 max-w-2xl lg:mb-10">
            <h2 className="mx-section-title mt-5">{title}</h2>
            <p className="mx-section-subtitle mt-4">{subtitle}</p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-8 lg:grid-cols-[minmax(280px,340px)_1fr] lg:items-start lg:gap-10 xl:gap-12">
          <QuoteFormAside />

          <RevealOnScroll delay={100}>
            <div className="midex-contact-form-card rounded-[1.5rem] p-6 shadow-xl shadow-midex-navy/8 sm:p-8 lg:p-10 xl:p-12">
              <MultiStepQuoteForm size="large" copy={copy} />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
