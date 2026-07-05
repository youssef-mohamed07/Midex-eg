import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProductsPageContent } from "@/components/products/ProductsPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { buildSeoMetadata } from "@/lib/seo/metadata";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildSeoMetadata({ routeKey: "products", locale });
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SeoHead routeKey="products" locale={locale} />
      <ProductsPageContent category={null} />
    </>
  );
}
