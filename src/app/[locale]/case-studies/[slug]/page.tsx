import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CaseStudyDetailPageContent } from "@/components/case-studies/CaseStudyDetailPageContent";
import { getAllCaseStudySlugs, getCaseStudy } from "@/lib/cms";
import { type Locale } from "@/i18n/routing";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = await getCaseStudy(slug, locale as Locale);
  if (!study) return {};

  return {
    title: `${study.client} | Case Study`,
    description: study.outcome,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const study = await getCaseStudy(slug, locale as Locale);
  if (!study) notFound();

  return <CaseStudyDetailPageContent slug={slug} />;
}
