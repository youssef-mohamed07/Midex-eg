import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import {
  getLocalizedProduct,
  getLocalizedProductCategories,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import { getQuoteUrl, products } from "@/content/products";

type Props = { slug: string };

export async function ProductDetailPageContent({ slug }: Props) {
  const locale = (await getLocale()) as Locale;
  const product = getLocalizedProduct(slug, locale);
  if (!product) notFound();

  const t = await getTranslations("products");
  const productCategories = getLocalizedProductCategories(locale);

  return (
    <>
      <PageHero
        badge={false}
        eyebrow={productCategories[product.category]?.label}
        title={product.title}
        subtitle={product.excerpt}
        breadcrumbs={
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
            <Link href="/products" className="font-medium text-midex-mint transition hover:text-white">
              {t("title")}
            </Link>
            <span className="text-white/30">/</span>
            <span className="font-medium text-white/75">{product.title}</span>
          </nav>
        }
        media={
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/20">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        }
      />

      <div className="mx-container pb-20 pt-10">
        <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">
          {t("overview")}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-midex-gray/85">
          {product.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="mx-btn mx-btn-primary" href={getQuoteUrl(product.title)}>
            {t("requestQuote")} →
          </Link>
          <Link
            className="mx-btn border border-midex-navy/15 bg-white text-midex-navy hover:bg-midex-surface"
            href="/products"
          >
            {t("backToCatalog")} →
          </Link>
        </div>
      </div>
    </>
  );
}

export function generateProductStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
