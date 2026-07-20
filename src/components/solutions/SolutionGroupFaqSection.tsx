import { getTranslations } from "next-intl/server";
import { FaqSection } from "@/components/home/FaqSection";
import type { SolutionGroupFaqContent } from "@/lib/cms/types";

type Props = {
  content: SolutionGroupFaqContent;
};

export async function SolutionGroupFaqSection({ content }: Props) {
  const t = await getTranslations("home");

  return (
    <FaqSection
      content={{
        title: content.title,
        intro: content.intro,
        image: content.image,
        items: content.items.map((item) => ({
          question: item.question,
          answer: item.answer,
        })),
      }}
      contactLabel={t("faqContact")}
    />
  );
}
