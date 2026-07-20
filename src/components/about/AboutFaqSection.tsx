import { FaqSection } from "@/components/home/FaqSection";
import type { FaqSectionContent } from "@/lib/cms/types";

type Props = {
  content: FaqSectionContent & {
    title: string;
    intro: string;
    items: { question: string; answer: string }[];
  };
  contactLabel: string;
};

/** About FAQ — same layout as site-wide FAQ (image + accordion). */
export async function AboutFaqSection({ content, contactLabel }: Props) {
  return <FaqSection content={content} contactLabel={contactLabel} />;
}
