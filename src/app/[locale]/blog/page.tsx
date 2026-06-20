import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { buildSeoMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildSeoMetadata({ routeKey: "blog", locale });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SeoHead routeKey="blog" locale={locale} />
      <BlogPageContent />
    </>
  );
}
