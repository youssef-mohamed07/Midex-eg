import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { buildSeoMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildSeoMetadata({ routeKey: "about", locale });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SeoHead routeKey="about" locale={locale} />
      <AboutPageContent />
    </>
  );
}
