import { getTranslations } from "next-intl/server";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { StatsSection } from "@/components/home/StatsSection";
import { PageHero } from "@/components/layout/PageHero";
import { ProductsCatalogSection } from "@/components/products/ProductsCatalogSection";
import { ProductsCta } from "@/components/products/ProductsCta";
import { getProductCategories, getProducts, getStats } from "@/lib/cms";
import { getLocale } from "next-intl/server";
import { type Locale } from "@/i18n/routing";

type Props = {
  category?: string | null;
};

export async function ProductsPageContent({ category = null }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("products");
  const th = await getTranslations("home");
  const [productCategories, allProducts, stats] = await Promise.all([
    getProductCategories(locale),
    getProducts(locale),
    getStats(),
  ]);
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

      <PartnersSection title={th("partnersTitle")} subtitle={th("partnersSubtitle")} />

      <ProductsCatalogSection category={category} />

      <StatsSection
        title={th("statsTitle")}
        subtitle={th("statsSubtitle")}
        items={stats.map((stat) => ({
          value: stat.value,
          label: th(stat.labelKey),
          suffix: stat.suffix,
        }))}
      />

      <CaseStudiesSection />

      <FaqSection />

      <ProductsCta />
    </>
  );
}
