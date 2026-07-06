import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { SolutionGroupFaqContent } from "@/lib/cms/types";

type Props = {
  content: SolutionGroupFaqContent;
};

export async function SolutionGroupFaqSection({ content }: Props) {
  const t = await getTranslations("home");

  const items = content.items.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  return (
    <section className="mx-section-band overflow-hidden">
      <div className="mx-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14 xl:gap-20">
          <RevealOnScroll>
            <div className="lg:sticky lg:top-28">
              <span className="mx-badge mb-5 border-midex-line bg-white text-midex-navy">
                {t("faqBadge")}
              </span>
              <h2 className="mx-section-title">{content.title}</h2>
              <p className="mx-section-subtitle mt-4 max-w-md">{content.intro}</p>
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
