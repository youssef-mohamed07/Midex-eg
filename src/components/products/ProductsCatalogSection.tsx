import { getLocale, getTranslations } from "next-intl/server";
import { ProductsExplorer } from "@/components/products/ProductsExplorer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  getLocalizedProductCategories,
  getLocalizedProducts,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";

type Props = {
  category?: string | null;
};

export async function ProductsCatalogSection({ category = null }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("products");
  const productCategories = getLocalizedProductCategories(locale);
  const allProducts = getLocalizedProducts(locale);

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
              <span className="mx-eyebrow">Midex</span>
              <h2 className="mx-section-title mt-2 sm:mt-3">{t("catalogHeading")}</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-midex-gray/75 sm:text-base lg:text-end">
              {t("catalogSubtitle")}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={60}>
          <ProductsExplorer
            products={explorerProducts}
            categories={categories}
            initialCategory={category}
            labels={{
              all: t("allCategories"),
              viewDetails: t("viewDetails"),
              requestQuote: t("requestQuote"),
              quoteShort: t("quoteShort"),
              productsLabel: t("productsLabel"),
              explore: t("viewCategory"),
            }}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
