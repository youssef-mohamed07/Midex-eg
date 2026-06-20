import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  generateProductStaticParams,
  ProductDetailPageContent,
} from "@/components/products/ProductDetailPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { type Locale } from "@/i18n/routing";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getProductSeoContext } from "@/lib/seo/page-context";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return generateProductStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await getProductSeoContext(slug, locale as Locale);
  if (!data) return {};

  return buildSeoMetadata({
    routeKey: "product",
    locale,
    params: { slug },
    context: data.context,
    slug,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const data = await getProductSeoContext(slug, locale as Locale);
  if (!data) notFound();

  return (
    <>
      <SeoHead
        routeKey="product"
        locale={locale}
        params={{ slug }}
        context={data.context}
        slug={slug}
        product={data.product}
      />
      <ProductDetailPageContent slug={slug} />
    </>
  );
}
