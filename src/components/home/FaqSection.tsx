import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export async function FaqSection() {
  const t = await getTranslations("home");

  const items = [1, 2, 3, 4, 5, 6].map((index) => ({
    question: t(`faqQ${index}`),
    answer: t(`faqA${index}`),
  }));

  return (
    <section className="mx-section-band overflow-hidden">
      <div className="mx-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14 xl:gap-20">
          <RevealOnScroll>
            <div className="lg:sticky lg:top-28">
              <h2 className="mx-section-title">{t("faqTitle")}</h2>
              <p className="mx-section-subtitle mt-4 max-w-md">{t("faqSubtitle")}</p>
              <div className="mt-6 hidden h-px w-16 bg-gradient-to-r from-midex-mint to-midex-blue lg:block" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <FaqAccordion items={items} contactLabel={t("faqContact")} />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
