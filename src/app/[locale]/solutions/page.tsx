import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SolutionsPageContent } from "@/components/solutions/SolutionsPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { buildSeoMetadata } from "@/lib/seo/metadata";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildSeoMetadata({ routeKey: "solutions", locale });
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SeoHead routeKey="solutions" locale={locale} />
      <SolutionsPageContent />
    </>
  );
}
