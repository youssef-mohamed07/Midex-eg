import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import {
  getLocalizedProductCategories,
  getLocalizedProducts,
  getLocalizedProductsByCategory,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import { getQuoteUrl, type Product } from "@/content/products";

type Props = {
  category?: string | null;
};

function ProductRow({
  product,
  categoryLabel,
  viewDetailsLabel,
  quoteLabel,
}: {
  product: Product;
  categoryLabel: string;
  viewDetailsLabel: string;
  quoteLabel: string;
}) {
  return (
    <article className="group mx-card grid overflow-hidden no-underline md:grid-cols-[minmax(140px,220px)_1fr] lg:grid-cols-[minmax(160px,260px)_1fr]">
      <Link
        href={`/products/${product.slug}`}
        className="relative flex aspect-card-tall items-center justify-center bg-midex-surface/80 p-4 md:aspect-auto md:min-h-[180px] sm:p-6"
      >
        <Image
          src={product.image}
          alt={product.title}
          width={220}
          height={180}
          className="max-h-full max-w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 220px"
        />
      </Link>

      <div className="flex flex-col justify-center border-t border-midex-line p-3.5 md:border-t-0 md:border-s md:p-6 lg:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-midex-blue sm:text-[11px]">
          {categoryLabel}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-1.5 font-display text-base font-bold leading-snug text-midex-navy no-underline transition-colors group-hover:text-midex-blue sm:mt-2 sm:text-xl"
        >
          {product.title}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-midex-gray/75 sm:text-base">
          {product.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5 sm:gap-4">
          <Link
            href={`/products/${product.slug}`}
            className="mx-link-arrow text-sm no-underline"
          >
            {viewDetailsLabel}
            <span className="mx-arrow">→</span>
          </Link>
          <Link
            href={getQuoteUrl(product.title)}
            className="text-sm font-medium text-midex-gray/60 no-underline transition-colors hover:text-midex-navy"
          >
            {quoteLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

export async function ProductsPageContent({ category = null }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("products");
  const tn = await getTranslations("nav");
  const productCategories = getLocalizedProductCategories(locale);
  const allProducts = getLocalizedProducts(locale);
  const list = getLocalizedProductsByCategory(category ?? undefined, locale);
  const activeCategory = category ?? null;
  const activeMeta = activeCategory ? productCategories[activeCategory] : null;
  const categoryEntries = Object.entries(productCategories);

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} eyebrow="Midex" compact>
        <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
          <span>
            <strong className="font-semibold text-white">{categoryEntries.length}</strong>{" "}
            {t("categoriesLabel")}
          </span>
          <span className="hidden text-white/30 sm:inline" aria-hidden>
            ·
          </span>
          <span>
            <strong className="font-semibold text-midex-mint">{allProducts.length}</strong>{" "}
            {t("productsLabel")}
          </span>
        </p>
      </PageHero>

      <section className="mx-section bg-midex-surface">
        <div className="mx-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(220px,260px)_1fr] lg:gap-14">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-midex-line bg-white shadow-sm">
                <div className="border-b border-midex-line px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                    Midex
                  </p>
                  <h2 className="mt-1 font-display text-base font-bold text-midex-navy">
                    {t("catalogNav")}
                  </h2>
                </div>

                <nav aria-label={t("allCategories")} className="p-2">
                  <Link
                    href="/products"
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium no-underline transition-colors ${
                      !activeCategory
                        ? "bg-midex-surface text-midex-navy"
                        : "text-midex-gray/75 hover:bg-midex-surface/70 hover:text-midex-blue"
                    }`}
                  >
                    <span>{t("allCategories")}</span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold tabular-nums text-midex-blue">
                      {allProducts.length}
                    </span>
                  </Link>

                  <ul className="mt-1 space-y-0.5">
                    {categoryEntries.map(([slug, cat]) => {
                      const count = allProducts.filter((p) => p.category === slug).length;
                      if (count === 0) return null;

                      return (
                        <li key={slug}>
                          <Link
                            href={`/products?category=${slug}`}
                            className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm no-underline transition-colors ${
                              activeCategory === slug
                                ? "bg-midex-navy font-semibold text-white"
                                : "font-medium text-midex-gray/75 hover:bg-white hover:text-midex-blue"
                            }`}
                          >
                            <span>{cat.label}</span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
                                activeCategory === slug
                                  ? "bg-white/15 text-midex-mint"
                                  : "bg-midex-surface text-midex-blue"
                              }`}
                            >
                              {count}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>

            <div>
              <div className="mb-8 flex flex-col gap-4 border-b border-midex-line pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <span className="mx-eyebrow">Midex</span>
                  <h2 className="mx-section-title mt-4">
                    {activeMeta?.label ?? t("catalogHeading")}
                  </h2>
                  {activeMeta?.description && (
                    <p className="mt-3 text-base leading-relaxed text-midex-gray/75">
                      {activeMeta.description}
                    </p>
                  )}
                </div>
                {activeCategory && (
                  <Link href="/products" className="mx-link-arrow shrink-0 text-sm">
                    {t("allCategories")}
                    <span className="mx-arrow">→</span>
                  </Link>
                )}
              </div>

              {list.length === 0 ? (
                <p className="rounded-2xl border border-midex-line bg-white px-6 py-12 text-center text-midex-gray/70">
                  {t("noProducts")}
                </p>
              ) : (
                <div className="space-y-5">
                  {list.map((product) => (
                    <ProductRow
                      key={product.slug}
                      product={product}
                      categoryLabel={productCategories[product.category]?.label ?? ""}
                      viewDetailsLabel={t("viewDetails")}
                      quoteLabel={t("requestQuote")}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-midex-line bg-white py-14 lg:py-16">
        <div className="mx-container">
          <div className="relative overflow-hidden rounded-3xl bg-midex-navy px-8 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between">
            <div className="mx-grid-overlay pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative max-w-xl">
              <span className="mx-eyebrow mx-eyebrow--light">Midex</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                {t("requestQuote")}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/70">{t("subtitle")}</p>
            </div>
            <Link
              className="group relative mt-8 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-midex-navy no-underline transition hover:bg-midex-mint lg:mt-0"
              href="/contact"
            >
              {tn("contactUs")}
              <span className="mx-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
