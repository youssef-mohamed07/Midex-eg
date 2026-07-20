import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CaseStudiesPageContent } from "@/components/case-studies/CaseStudiesPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getCaseStudiesPageContent } from "@/lib/cms";
import type { Locale } from "@/i18n/routing";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [metadata, page] = await Promise.all([
    buildSeoMetadata({ routeKey: "case-studies", locale }),
    getCaseStudiesPageContent(locale as Locale),
  ]);
  return {
    ...metadata,
    title: page.hero?.title || metadata.title,
    description: page.hero?.subtitle || metadata.description,
  };
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SeoHead routeKey="case-studies" locale={locale} />
      <CaseStudiesPageContent />
    </>
  );
}
