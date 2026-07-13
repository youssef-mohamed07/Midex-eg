import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CaseStudiesPageContent } from "@/components/case-studies/CaseStudiesPageContent";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("caseStudiesTitle"),
    description: t("caseStudiesSubtitle"),
  };
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CaseStudiesPageContent />;
}
