import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CaseStudyDetailPageContent } from "@/components/case-studies/CaseStudyDetailPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { getAllCaseStudySlugs } from "@/lib/cms";
import { type Locale } from "@/i18n/routing";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getCaseStudySeoContext } from "@/lib/seo/page-context";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await getCaseStudySeoContext(slug, locale as Locale);
  if (!data) return {};

  return buildSeoMetadata({
    routeKey: "case-study",
    locale,
    params: { slug },
    context: data.context,
    slug,
  });
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const data = await getCaseStudySeoContext(slug, locale as Locale);
  if (!data) notFound();

  return (
    <>
      <SeoHead
        routeKey="case-study"
        locale={locale}
        params={{ slug }}
        context={data.context}
        slug={slug}
      />
      <CaseStudyDetailPageContent slug={slug} />
    </>
  );
}
