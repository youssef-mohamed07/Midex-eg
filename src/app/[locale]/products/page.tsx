import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProductsPageContent } from "@/components/products/ProductsPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { type Locale } from "@/i18n/routing";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getProductCategorySeoContext } from "@/lib/seo/page-context";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { category } = await searchParams;

  if (category) {
    const data = await getProductCategorySeoContext(category, locale as Locale);
    if (data) {
      return buildSeoMetadata({
        routeKey: "product-category",
        locale,
        params: { slug: category },
        context: data.context,
        slug: category,
      });
    }
  }

  return buildSeoMetadata({ routeKey: "products", locale });
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);

  const categoryContext = category
    ? await getProductCategorySeoContext(category, locale as Locale)
    : null;

  return (
    <>
      {category && categoryContext ? (
        <SeoHead
          routeKey="product-category"
          locale={locale}
          params={{ slug: category }}
          context={categoryContext.context}
          slug={category}
        />
      ) : (
        <SeoHead routeKey="products" locale={locale} />
      )}
      <ProductsPageContent category={category ?? null} />
    </>
  );
}
