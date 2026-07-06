import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProductsPageContent } from "@/components/products/ProductsPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { getAllProductCategorySlugs } from "@/lib/cms";
import { type Locale, routing } from "@/i18n/routing";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getProductCategorySeoContext } from "@/lib/seo/page-context";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProductCategorySlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await getProductCategorySeoContext(slug, locale as Locale);

  if (data) {
    return buildSeoMetadata({
      routeKey: "product-category",
      locale,
      params: { slug },
      context: data.context,
      slug,
    });
  }

  return buildSeoMetadata({ routeKey: "products", locale });
}

export default async function ProductCategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const categoryContext = await getProductCategorySeoContext(slug, locale as Locale);

  return (
    <>
      {categoryContext ? (
        <SeoHead
          routeKey="product-category"
          locale={locale}
          params={{ slug }}
          context={categoryContext.context}
          slug={slug}
        />
      ) : (
        <SeoHead routeKey="products" locale={locale} />
      )}
      <ProductsPageContent category={slug} />
    </>
  );
}
