import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SolutionDetailPageContent } from "@/components/solutions/SolutionDetailPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { solutions } from "@/content/solutions";
import { type Locale } from "@/i18n/routing";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getSolutionSeoContext } from "@/lib/seo/page-context";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await getSolutionSeoContext(slug, locale as Locale);
  if (!data) return {};

  return buildSeoMetadata({
    routeKey: "solution",
    locale,
    params: { slug },
    context: data.context,
    slug,
  });
}

export default async function SolutionDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const data = await getSolutionSeoContext(slug, locale as Locale);
  if (!data) notFound();

  return (
    <>
      <SeoHead
        routeKey="solution"
        locale={locale}
        params={{ slug }}
        context={data.context}
        slug={slug}
      />
      <SolutionDetailPageContent slug={slug} />
    </>
  );
}
