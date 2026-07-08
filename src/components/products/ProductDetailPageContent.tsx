import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProductGallery } from "@/components/products/ProductGallery";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionBreadcrumbs } from "@/components/solutions/SolutionBreadcrumbs";
import {
  getProduct,
  getProductCategories,
  getProductCategoryDetails,
  getProductImages,
  getProductsByCategory,
  getQuoteUrl,
} from "@/lib/cms";
import { type Locale } from "@/i18n/routing";

type Props = { slug: string };

export async function ProductDetailPageContent({ slug }: Props) {
  const locale = (await getLocale()) as Locale;
  const product = await getProduct(slug, locale);
  if (!product) notFound();

  const t = await getTranslations("products");
  const tn = await getTranslations("nav");
  const [productCategories, { highlights, specs }, categoryProducts] = await Promise.all([
    getProductCategories(locale),
    getProductCategoryDetails(product.category, locale),
    getProductsByCategory(product.category, locale),
  ]);
  const category = productCategories[product.category];
  const categoryLabel = category?.label;
  const related = categoryProducts
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);
  const galleryImages = getProductImages(product);

  return (
    <>
      <PageHero
        title={product.title}
        subtitle={product.excerpt}
        compact
        breadcrumbs={
          <SolutionBreadcrumbs
            light
            items={[
              { label: t("title"), href: "/products" },
              ...(categoryLabel && product.category
                ? [
                    {
                      label: categoryLabel,
                      href: `/products/category/${product.category}`,
                    },
                  ]
                : []),
              { label: product.title },
            ]}
          />
        }
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="group mx-btn mx-btn-primary border-white/20 bg-white text-midex-navy hover:bg-midex-mint hover:text-midex-navy"
            href={getQuoteUrl(product.title)}
          >
            {t("requestQuote")}
            <span className="mx-arrow">→</span>
          </Link>
          <Link
            className="mx-btn border border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10"
            href="/products"
          >
            {t("backToCatalog")}
          </Link>
        </div>
      </PageHero>

      <section className="mx-section">
        <div className="mx-container">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start lg:gap-14">
            <aside className="order-1 space-y-4 sm:space-y-6 lg:order-2 lg:col-start-2 lg:sticky lg:top-24 lg:self-start">
              <ProductGallery images={galleryImages} alt={product.title} />

              <div className="rounded-xl border border-midex-line bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                  {categoryLabel}
                </p>
                <p className="mt-1.5 font-display text-base font-bold text-midex-navy sm:mt-2 sm:text-lg">
                  {product.title}
                </p>
                <Link
                  className="group mx-btn mx-btn-primary mt-5 w-full justify-center"
                  href={getQuoteUrl(product.title)}
                >
                  {t("requestQuote")}
                  <span className="mx-arrow">→</span>
                </Link>
                <Link
                  className="mx-btn mx-btn-ghost mt-3 w-full justify-center"
                  href="/contact"
                >
                  {tn("contactUs")}
                </Link>
                {product.category && categoryLabel && (
                  <Link
                    className="mx-link-arrow mt-4 block text-center text-sm"
                    href={`/products/category/${product.category}`}
                  >
                    {categoryLabel}
                    <span className="mx-arrow">→</span>
                  </Link>
                )}
              </div>
            </aside>

            <div className="order-2 space-y-6 sm:space-y-10 lg:order-1 lg:col-start-1 lg:row-start-1">
              <div>
              <h2 className="mx-section-title">{t("overview")}</h2>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-midex-gray/80 sm:text-lg">
                  {product.description}
                </p>
              </div>

              {highlights.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-bold text-midex-navy sm:text-xl">
                    {t("featuresTitle")}
                  </h3>
                  <ul className="mt-4 space-y-3 border-t border-midex-line pt-4">
                    {highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-midex-gray/80 sm:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-midex-mint" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {specs.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-bold text-midex-navy sm:text-xl">
                    {t("specificationsTitle")}
                  </h3>
                  <div className="mt-4 overflow-x-auto rounded-xl border border-midex-line">
                    <table className="w-full min-w-[280px] text-sm">
                      <tbody className="divide-y divide-midex-line">
                        {specs.map((row) => (
                          <tr key={row.label}>
                            <th
                              scope="row"
                              className="w-[38%] min-w-[7rem] bg-midex-surface/60 px-4 py-3.5 text-start text-xs font-semibold uppercase tracking-wider text-midex-gray/65 sm:px-5"
                            >
                              {row.label}
                            </th>
                            <td className="px-4 py-3.5 font-medium text-midex-navy sm:px-5">
                              {row.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {category?.description && (
                <div>
                  <h3 className="font-display text-lg font-bold text-midex-navy sm:text-xl">
                    {t("applicationsTitle")}
                  </h3>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-midex-gray/80">
                    {category.description}
                  </p>
                </div>
              )}
            </div>

          </div>

          {related.length > 0 && (
            <div className="mt-10 border-t border-midex-line pt-8 sm:mt-16 sm:pt-14">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-xl font-bold text-midex-navy sm:text-2xl">
                  {t("relatedProductsTitle")}
                </h2>
                {product.category && categoryLabel && (
                  <Link
                    href={`/products/category/${product.category}`}
                    className="mx-link-arrow text-sm"
                  >
                    {categoryLabel}
                    <span className="mx-arrow">→</span>
                  </Link>
                )}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/products/${item.slug}`}
                    className="group flex items-center gap-2.5 rounded-lg border border-midex-line bg-midex-surface/40 p-3 no-underline transition-all hover:border-midex-mint/45 hover:bg-white hover:shadow-sm sm:gap-3 sm:rounded-xl sm:p-4"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white p-1 sm:h-14 sm:w-14 sm:rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
                    </div>
                    <span className="line-clamp-2 text-sm font-semibold leading-snug text-midex-navy transition-colors group-hover:text-midex-blue">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-section--tight">
        <div className="mx-container">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-midex-line bg-white p-8 text-center sm:p-10 lg:flex-row lg:justify-between lg:text-start">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">
                {t("requestQuote")}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-midex-gray/75">
                {t("subtitle")}
              </p>
            </div>
            <Link
              className="group mx-btn mx-btn-primary shrink-0"
              href={getQuoteUrl(product.title)}
            >
              {t("requestQuote")}
              <span className="mx-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}