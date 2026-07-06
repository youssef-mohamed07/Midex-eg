import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getProductCategories, getProducts } from "@/lib/cms";
import type { CaseStudy, Product, ProductCategoryInfo } from "@/lib/cms/types";
import { type Locale } from "@/i18n/routing";

const CATEGORY_ORDER = [
  "piping-and-fitting",
  "valves",
  "instruments",
  "uv-units",
  "stainless-steel-tanks",
  "pumps",
  "filters",
  "hygienic-drains",
] as const;

const LEFT_COLUMN_SLUGS = [
  "piping-and-fitting",
  "instruments",
  "uv-units",
  "stainless-steel-tanks",
] as const;

const RIGHT_COLUMN_SLUGS = ["valves", "pumps", "filters", "hygienic-drains"] as const;

type CategoryCard = {
  slug: string;
  label: string;
  description: string;
  image: string;
  count: number;
};

function CategoryImageCard({
  category,
  productsLabel,
}: {
  category: CategoryCard;
  productsLabel: string;
}) {
  return (
    <Link
      href={`/products/category/${category.slug}`}
      className="group relative block min-h-[5.5rem] w-full flex-1 overflow-hidden rounded-[1.35rem] border border-midex-line/50 no-underline shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-midex-mint/45 hover:shadow-lg sm:min-h-[6.25rem] sm:rounded-[1.5rem] lg:min-h-[6.75rem]"
    >
      {category.image ? (
        <Image
          src={category.image}
          alt={category.label}
          fill
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 18vw"
        />
      ) : (
        <div className="absolute inset-0 bg-midex-surface" aria-hidden />
      )}
      <div className="absolute inset-0 bg-midex-navy/15" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-midex-navy/92 via-midex-navy/45 to-midex-navy/5"
        aria-hidden
      />
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-midex-mint sm:text-[11px]">
          {category.count} {productsLabel}
        </p>
        <h3 className="mt-0.5 font-display text-sm font-bold leading-snug text-white sm:mt-1 sm:text-base">
          {category.label}
        </h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-white/75 sm:text-xs">
          {category.description}
        </p>
      </div>
    </Link>
  );
}

export async function ProductCategoriesSection({
  productCategories: categoriesProp,
  products: productsProp,
}: {
  productCategories?: Record<string, ProductCategoryInfo>;
  products?: Product[];
} = {}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("products");
  const [productCategories, allProducts] = categoriesProp && productsProp
    ? [categoriesProp, productsProp]
    : await Promise.all([getProductCategories(locale), getProducts(locale)]);

  const buildCategory = (slug: string): CategoryCard | null => {
    const products = allProducts.filter((item) => item.category === slug);
    const meta = productCategories[slug];
    const image = products[0]?.image;

    if (!meta || products.length === 0 || !image) {
      return null;
    }

    return {
      slug,
      label: meta.label,
      description: meta.description,
      image,
      count: products.length,
    };
  };

  const resolveColumn = (slugs: readonly string[]) =>
    slugs.map(buildCategory).filter((item): item is CategoryCard => item !== null);

  const leftColumn = resolveColumn(LEFT_COLUMN_SLUGS);
  const rightColumn = resolveColumn(RIGHT_COLUMN_SLUGS);
  const allCategories = CATEGORY_ORDER.map(buildCategory).filter(
    (item): item is CategoryCard => item !== null,
  );

  if (allCategories.length === 0) {
    return null;
  }

  const heroImage = allProducts[0]?.image ?? allCategories[0].image;

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
            <h2 className="mx-section-title mt-4">{t("title")}</h2>
            <p className="mx-section-subtitle mx-auto mt-4">{t("subtitle")}</p>
            <Link
              href="/products"
              className="mx-link-arrow mx-auto mt-6 inline-flex text-sm no-underline"
            >
              {t("allCategories")}
              <span className="mx-arrow">→</span>
            </Link>
          </div>
        </RevealOnScroll>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:items-stretch lg:gap-5">
          <RevealOnScroll className="h-full sm:col-span-2 lg:col-span-1">
            <Link
              href="/products"
              className="group relative block h-full min-h-[18rem] overflow-hidden rounded-[1.75rem] border border-midex-line/50 no-underline shadow-md transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/45 hover:shadow-xl sm:min-h-[20rem] lg:min-h-[29rem]"
            >
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={t("allCategories")}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-midex-surface" aria-hidden />
              )}
              <div className="absolute inset-0 bg-midex-navy/20" aria-hidden />
              <div
                className="absolute inset-0 bg-gradient-to-t from-midex-navy/95 via-midex-navy/50 to-midex-navy/15"
                aria-hidden
              />
              <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-midex-mint">
                  {allProducts.length} {t("productsLabel")}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                  {t("allCategories")}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">
                  {t("allProductsDescription")}
                </p>
              </div>
            </Link>
          </RevealOnScroll>

          <div className="flex flex-col gap-4 sm:col-span-1 lg:gap-5">
            {leftColumn.map((category, index) => (
              <RevealOnScroll key={category.slug} delay={index * 50} className="flex flex-1">
                <CategoryImageCard category={category} productsLabel={t("productsLabel")} />
              </RevealOnScroll>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:col-span-1 lg:gap-5">
            {rightColumn.map((category, index) => (
              <RevealOnScroll key={category.slug} delay={index * 50} className="flex flex-1">
                <CategoryImageCard category={category} productsLabel={t("productsLabel")} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
