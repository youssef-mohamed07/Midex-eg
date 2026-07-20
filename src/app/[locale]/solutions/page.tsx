import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SolutionsPageContent } from "@/components/solutions/SolutionsPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { getSolutionsPageContent } from "@/lib/cms";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/i18n/routing";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildSeoMetadata({ routeKey: "solutions", locale });
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getSolutionsPageContent(locale as Locale);
  const faq = (page.faq?.items ?? [])
    .map((item) => ({
      question: item.question?.trim() ?? "",
      answer: item.answer?.trim() ?? "",
    }))
    .filter((item) => item.question && item.answer);

  return (
    <>
      <SeoHead routeKey="solutions" locale={locale} faq={faq} />
      <SolutionsPageContent />
    </>
  );
}
