import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/home/HomePage";
import { SeoHead } from "@/components/seo/SeoHead";
import { getHomePageSections } from "@/lib/cms";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/i18n/routing";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildSeoMetadata({ routeKey: "home", locale });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getHomePageSections(locale as Locale);
  const faq = (page.faq?.items ?? [])
    .map((item) => ({
      question: item.question?.trim() ?? "",
      answer: item.answer?.trim() ?? "",
    }))
    .filter((item) => item.question && item.answer);

  return (
    <>
      <SeoHead routeKey="home" locale={locale} faq={faq} />
      <HomePage />
    </>
  );
}
