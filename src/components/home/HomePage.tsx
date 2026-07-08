import { getLocale, getTranslations } from "next-intl/server";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { EventsSection } from "@/components/home/EventsSection";
import { ExclusivePartnersSection } from "@/components/home/ExclusivePartnersSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturedQuoteSection } from "@/components/home/FeaturedQuoteSection";
import { HeroSlider } from "@/components/home/HeroSlider";
import { HomeQuoteFormSection } from "@/components/home/HomeQuoteFormSection";
import { EngineeringCapabilitiesSection } from "@/components/home/EngineeringCapabilitiesSection";
import { TruviaSection } from "@/components/home/TruviaSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ProductCategoriesSection } from "@/components/home/ProductCategoriesSection";
import { QuoteCtaSection } from "@/components/home/QuoteCtaSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { getHomePageData } from "@/lib/cms/home";
import { type Locale } from "@/i18n/routing";

export async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const home = await getHomePageData(locale);

  return (
    <>
      <HeroSlider collage={home.heroCollage} />

      <PartnersSection
        title={t("partnersTitle")}
        partners={home.partners}
      />

      <FeaturedQuoteSection />

      <EngineeringCapabilitiesSection />

      <EventsSection events={home.events} />

      <ProductCategoriesSection
        productCategories={home.productCategories}
        products={home.products}
      />

      <TruviaSection />

      <BeforeAfterSection />

      <StatsSection
        title={t("statsTitle")}
        subtitle={t("statsSubtitle")}
        items={home.stats.map((stat) => ({
          value: stat.value,
          label: t(stat.labelKey),
          suffix: "suffix" in stat ? stat.suffix : undefined,
        }))}
      />

      <CaseStudiesSection caseStudies={home.caseStudies} />

      <TestimonialsSection
        title={t("testimonialsTitle")}
        subtitle={t("testimonialsSubtitle")}
        testimonials={home.testimonials}
      />

      <ExclusivePartnersSection
        title={t("exclusiveTitle")}
        partners={home.exclusivePartners}
      />

      <HomeQuoteFormSection />

      <FaqSection />

      <QuoteCtaSection />
    </>
  );
}
