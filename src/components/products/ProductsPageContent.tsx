import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import {
  getLocalizedProductCategories,
  getLocalizedProductsByCategory,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import { getQuoteUrl } from "@/content/products";

type Props = {
  category?: string | null;
};

export async function ProductsPageContent({ category = null }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("products");
  const productCategories = getLocalizedProductCategories(locale);
  const list = getLocalizedProductsByCategory(category ?? undefined, locale);
  const activeCategory = category ?? null;

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <div className="mx-container pb-20 pt-10">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/products"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              !activeCategory
                ? "bg-midex-navy text-white"
                : "bg-midex-surface text-midex-navy hover:bg-midex-mint/30"
            }`}
          >
            {t("allCategories")}
          </Link>
          {Object.entries(productCategories).map(([slug, cat]) => (
            <Link
              key={slug}
              href={`/products?category=${slug}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCategory === slug
                  ? "bg-midex-navy text-white"
                  : "bg-midex-surface text-midex-navy hover:bg-midex-mint/30"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="mt-12 text-midex-gray/70">{t("noProducts")}</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((product) => (
              <article key={product.slug} className="mx-card">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={600}
                  height={400}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                    {productCategories[product.category]?.label}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-bold text-midex-navy">
                    {product.title}
                  </h2>
                  <p className="mt-2 text-sm text-midex-gray/80">{product.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      className="mx-btn mx-btn-primary !px-4 !py-2 !text-xs"
                      href={`/products/${product.slug}`}
                    >
                      {t("viewDetails")}
                    </Link>
                    <Link
                      className="mx-btn border border-midex-mint bg-midex-surface !px-4 !py-2 !text-xs text-midex-navy hover:bg-midex-mint"
                      href={getQuoteUrl(product.title)}
                    >
                      {t("requestQuote")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
