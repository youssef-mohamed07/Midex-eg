import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SolutionGroupPageContent } from "@/components/solutions/SolutionGroupPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { solutionGroupOrder } from "@/content/solutions";
import { type Locale } from "@/i18n/routing";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getSolutionGroupSeoContext } from "@/lib/seo/page-context";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return solutionGroupOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await getSolutionGroupSeoContext(slug, locale as Locale);
  if (!data) return {};

  return buildSeoMetadata({
    routeKey: "solution-group",
    locale,
    params: { slug },
    context: data.context,
    slug,
  });
}

export default async function SolutionGroupPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const data = await getSolutionGroupSeoContext(slug, locale as Locale);
  if (!data) notFound();

  return (
    <>
      <SeoHead
        routeKey="solution-group"
        locale={locale}
        params={{ slug }}
        context={data.context}
        slug={slug}
      />
      <SolutionGroupPageContent slug={slug} />
    </>
  );
}
