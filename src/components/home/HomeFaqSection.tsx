import { getLocale, getTranslations } from "next-intl/server";
import { FaqSection } from "@/components/home/FaqSection";
import { getHomePageSections } from "@/lib/cms";
import { isSectionEnabled, resolveFaq } from "@/lib/cms/section-resolve";
import type { Locale } from "@/i18n/routing";

/** Default homepage FAQ — used as fallback on solution/product pages. */
export async function HomeFaqSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const sections = await getHomePageSections(locale);

  const faq = resolveFaq(sections.faq, {
    title: t("faqTitle"),
    intro: t("faqSubtitle"),
    items: [1, 2, 3, 4, 5, 6].map((index) => ({
      question: t(`faqQ${index}`),
      answer: t(`faqA${index}`),
    })),
  });

  if (!isSectionEnabled(faq.enabled)) return null;

  return <FaqSection content={faq} contactLabel={t("faqContact")} />;
}
