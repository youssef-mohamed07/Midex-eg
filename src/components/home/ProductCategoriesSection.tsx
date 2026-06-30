import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  getLocalizedProductCategories,
  getLocalizedProducts,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";

export async function ProductCategoriesSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("products");
  const productCategories = getLocalizedProductCategories(locale);
  const allProducts = getLocalizedProducts(locale);

  const categoryCards = Object.entries(productCategories)
    .map(([slug, cat]) => {
      const products = allProducts.filter((item) => item.category === slug);
      return {
        slug,
        label: cat.label,
        count: products.length,
        image: products[0]?.image,
      };
    })
    .filter((item) => item.count > 0 && item.image);

  if (categoryCards.length === 0) {
    return null;
  }

  return (
    <section className="mx-section--tight bg-white">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-5 flex flex-col gap-2 sm:mb-7 sm:gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mx-eyebrow">Midex</span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-midex-navy sm:text-[1.85rem]">
                {t("allCategories")}
              </h2>
            </div>
            <Link href="/products" className="mx-link-arrow shrink-0 text-sm no-underline">
              {t("title")}
              <span className="mx-arrow">→</span>
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {categoryCards.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative block aspect-card overflow-hidden rounded-xl border border-midex-line no-underline shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/45 hover:shadow-lg sm:rounded-2xl"
            >
              <Image
                src={cat.image!}
                alt={cat.label}
                fill
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-midex-navy/20" aria-hidden />
              <div
                className="absolute inset-0 bg-gradient-to-t from-midex-navy/95 via-midex-navy/45 to-midex-navy/10"
                aria-hidden
              />
              <span className="absolute start-3 top-3 z-10 font-display text-2xl font-bold tabular-nums text-white/20 sm:start-4 sm:top-4 sm:text-3xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-midex-mint sm:text-[11px]">
                  {cat.count} {t("productsLabel")}
                </p>
                <h3 className="mt-0.5 font-display text-base font-bold leading-snug text-white sm:mt-1 sm:text-lg">
                  {cat.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
