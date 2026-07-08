import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ProductsExplorer } from "@/components/products/ProductsExplorer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getProductCategories, getProducts } from "@/lib/cms";
import { type Locale } from "@/i18n/routing";

import type { ProductExplorerLabels } from "@/lib/cms/types";

type Props = {
  category?: string | null;
  title?: string;
  subtitle?: string;
  image?: string;
  explorerLabels?: ProductExplorerLabels;
};

export async function ProductsCatalogSection({
  category = null,
  title: titleProp,
  subtitle: subtitleProp,
  image,
  explorerLabels: explorerLabelsProp,
}: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("products");
  const title = titleProp ?? t("catalogHeading");
  const subtitle = subtitleProp ?? t("catalogSubtitle");
  const labels = {
    all: explorerLabelsProp?.allCategories ?? t("allCategories"),
    viewDetails: explorerLabelsProp?.viewDetails ?? t("viewDetails"),
    requestQuote: explorerLabelsProp?.requestQuote ?? t("requestQuote"),
    quoteShort: explorerLabelsProp?.quoteShort ?? t("quoteShort"),
    productsLabel: t("productsLabel"),
    explore: t("viewCategory"),
  };
  const [productCategories, allProducts] = await Promise.all([
    getProductCategories(locale),
    getProducts(locale),
  ]);

  const explorerProducts = allProducts.map((product) => ({
    slug: product.slug,
    title: product.title,
    excerpt: product.excerpt,
    description: product.description,
    image: product.image,
    category: product.category,
    categoryLabel: productCategories[product.category]?.label ?? "",
  }));

  const categories = Object.entries(productCategories)
    .map(([slug, cat]) => {
      const count = allProducts.filter((p) => p.category === slug).length;
      if (count === 0) return null;
      return { slug, label: cat.label, count };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <section className="mx-section--tight bg-white" id="catalog">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-5 flex flex-col gap-2 sm:mb-8 sm:gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="mx-section-title mt-2 sm:mt-3">{title}</h2>
            </div>
            <div className="flex max-w-md flex-col items-start gap-4 lg:items-end">
              <p className="text-sm leading-relaxed text-midex-gray/75 sm:text-base lg:text-end">
                {subtitle}
              </p>
              {image && (
                <div className="relative hidden h-24 w-36 overflow-hidden rounded-xl border border-midex-line/60 shadow-sm lg:block">
                  <Image src={image} alt="" fill className="object-cover" sizes="144px" />
                </div>
              )}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={60}>
          <ProductsExplorer
            products={explorerProducts}
            categories={categories}
            initialCategory={category}
            labels={labels}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
