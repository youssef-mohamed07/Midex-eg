import { getLocale, getTranslations } from "next-intl/server";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { StatsSection } from "@/components/home/StatsSection";
import { PageCtaSection } from "@/components/cms/PageCtaSection";
import { PageHero } from "@/components/layout/PageHero";
import { PageHeroImage } from "@/components/cms/PageHeroImage";
import { ProductsCatalogSection } from "@/components/products/ProductsCatalogSection";
import {
  getProductCategories,
  getProductCategory,
  getProducts,
  getProductsPageContent,
  getStats,
} from "@/lib/cms";
import {
  isSectionEnabled,
  pick,
  resolveFaq,
  resolvePageCta,
  resolvePageHero,
  resolveProductExplorerLabels,
  resolveSectionHeader,
} from "@/lib/cms/section-resolve";
import { type Locale } from "@/i18n/routing";

type Props = {
  category?: string | null;
};

export async function ProductsPageContent({ category = null }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("products");
  const th = await getTranslations("home");
  const [productCategories, allProducts, stats, page, categoryPage] = await Promise.all([
    getProductCategories(locale),
    getProducts(locale),
    getStats(locale),
    getProductsPageContent(locale),
    category ? getProductCategory(category, locale) : Promise.resolve(undefined),
  ]);
  const categoryEntries = Object.entries(productCategories);
  const filteredProducts = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts;

  const baseHero = resolvePageHero(page.hero, {
    title: t("title"),
    subtitle: t("subtitle"),
  });

  const hero = categoryPage
    ? resolvePageHero(categoryPage.hero, {
        title: categoryPage.label,
        subtitle: categoryPage.description,
        image: categoryPage.image,
      })
    : baseHero;

  const explorerLabels = resolveProductExplorerLabels(page.explorerLabels, {
    allCategories: t("allCategories"),
    viewDetails: t("viewDetails"),
    requestQuote: t("requestQuote"),
    quoteShort: t("quoteShort"),
    noResults: t("noProducts"),
    searchPlaceholder: t("catalogNav"),
    productsLabel: t("productsLabel"),
    categoriesLabel: t("categoriesLabel"),
    viewCategory: t("viewCategory"),
  });

  const statsHeader = resolveSectionHeader(page.statsSection, {
    title: th("statsTitle"),
    subtitle: th("statsSubtitle"),
  });

  const caseStudiesHeader = resolveSectionHeader(page.caseStudiesSection, {
    title: th("caseStudiesTitle"),
    subtitle: th("caseStudiesSubtitle"),
  });

  const faq = resolveFaq(page.faq, {
    title: th("faqTitle"),
    intro: th("faqSubtitle"),
    items: [1, 2, 3, 4, 5, 6].map((index) => ({
      question: th(`faqQ${index}`),
      answer: th(`faqA${index}`),
    })),
  });

  const catalogHeader = resolveSectionHeader(page.catalogSection, {
    title: categoryPage?.label ?? t("catalogHeading"),
    subtitle: categoryPage?.description ?? t("catalogSubtitle"),
    image: categoryPage?.image,
  });

  const cta = resolvePageCta(page.cta, {
    title: t("ctaTitle"),
    text: t("ctaText"),
    primaryCta: t("requestQuote"),
    primaryCtaHref: "/contact",
  });

  return (
    <>
      <PageHero
        title={hero.title}
        subtitle={hero.subtitle}
        compact
        media={<PageHeroImage src={hero.image} alt={hero.title} />}
      >
        <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
          {!category && (
            <>
              <span>
                <strong className="font-semibold text-white">{categoryEntries.length}</strong>{" "}
                {explorerLabels.categoriesLabel}
              </span>
              <span className="hidden text-white/30 sm:inline" aria-hidden>
                ·
              </span>
            </>
          )}
          <span>
            <strong className="font-semibold text-midex-mint">{filteredProducts.length}</strong>{" "}
            {explorerLabels.productsLabel}
          </span>
        </p>
      </PageHero>

      <PartnersSection title={th("partnersTitle")} />

      {isSectionEnabled(catalogHeader.enabled) && (
        <ProductsCatalogSection
          category={category}
          title={catalogHeader.title}
          subtitle={catalogHeader.subtitle}
          image={catalogHeader.image}
          explorerLabels={explorerLabels}
        />
      )}

      {isSectionEnabled(statsHeader.enabled) && (
        <StatsSection
          title={statsHeader.title}
          subtitle={statsHeader.subtitle}
          items={stats.map((stat) => ({
            value: stat.value,
            label: pick(stat.label, th(stat.labelKey)),
            suffix: stat.suffix,
          }))}
        />
      )}

      {isSectionEnabled(caseStudiesHeader.enabled) && (
        <CaseStudiesSection
          title={caseStudiesHeader.title}
          subtitle={caseStudiesHeader.subtitle}
        />
      )}

      {isSectionEnabled(faq.enabled) && (
        <FaqSection content={faq} contactLabel={th("faqContact")} />
      )}

      <PageCtaSection content={cta} />
    </>
  );
}
