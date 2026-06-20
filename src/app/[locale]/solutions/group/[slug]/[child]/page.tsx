import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SolutionChildPageContent } from "@/components/solutions/SolutionChildPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { getAllSolutionChildParams } from "@/content/solutions";
import { type Locale } from "@/i18n/routing";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getSolutionChildSeoContext } from "@/lib/seo/page-context";

type Props = { params: Promise<{ locale: string; slug: string; child: string }> };

export function generateStaticParams() {
  return getAllSolutionChildParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, child } = await params;
  const data = await getSolutionChildSeoContext(slug, child, locale as Locale);
  if (!data) return {};

  return buildSeoMetadata({
    routeKey: "solution-child",
    locale,
    params: { slug, child },
    context: data.context,
    slug: child,
  });
}

export default async function SolutionGroupChildPage({ params }: Props) {
  const { locale, slug, child: childSlug } = await params;
  setRequestLocale(locale);

  const data = await getSolutionChildSeoContext(slug, childSlug, locale as Locale);
  if (!data) notFound();

  return (
    <>
      <SeoHead
        routeKey="solution-child"
        locale={locale}
        params={{ slug, child: childSlug }}
        context={data.context}
        slug={childSlug}
      />
      <SolutionChildPageContent slug={slug} childSlug={childSlug} />
    </>
  );
}
