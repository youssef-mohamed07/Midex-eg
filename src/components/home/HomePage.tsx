import { getLocale, getTranslations } from "next-intl/server";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { EventsSection } from "@/components/home/EventsSection";
import { ExclusivePartnersSection } from "@/components/home/ExclusivePartnersSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturedQuoteSection } from "@/components/home/FeaturedQuoteSection";
import { HeroSlider } from "@/components/home/HeroSlider";
import { HomeQuoteFormSection } from "@/components/home/HomeQuoteFormSection";
import { EngineeringCapabilitiesSection } from "@/components/home/EngineeringCapabilitiesSection";
import { TruviaSection } from "@/components/home/TruviaSection";
import { StorySection } from "@/components/sections/StorySection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ProductCategoriesSection } from "@/components/home/ProductCategoriesSection";
import { QuoteCtaSection } from "@/components/home/QuoteCtaSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ServicesTimeline } from "@/components/home/ServicesTimeline";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getHomePageData } from "@/lib/cms/home";
import { type Locale } from "@/i18n/routing";

function SectionHeading({
  title,
  subtitle,
  eyebrow = "Midex",
  dark = false,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto mb-8 max-w-2xl text-center sm:mb-12 lg:mb-14" : "mb-8 max-w-3xl sm:mb-10 lg:mb-12"}>
      <span
        className={`mx-eyebrow ${center ? "mx-eyebrow--center" : ""} ${dark ? "mx-eyebrow--light" : ""}`}
      >
        {eyebrow}
      </span>
      <h2 className={`mx-section-title mt-4 ${dark ? "!text-white" : ""}`}>{title}</h2>
      {subtitle && (
        <p
          className={`mx-section-subtitle ${center ? "mx-auto" : ""} ${dark ? "!text-white/70" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const home = await getHomePageData(locale);

  return (
    <>
      <HeroSlider collage={home.heroCollage} />

      <PartnersSection
        title={t("partnersTitle")}
        subtitle={t("partnersSubtitle")}
        partners={home.partners}
      />

      <FeaturedQuoteSection />

      <EngineeringCapabilitiesSection cards={home.solutionCards} />

      <EventsSection events={home.events} />

      {/* Services — alternating timeline */}
      <section className="mx-section">
        <div className="mx-container">
          <RevealOnScroll>
            <SectionHeading
              title={t("servicesTitle")}
              subtitle={t("servicesSubtitle")}
              align="center"
            />
          </RevealOnScroll>

          <ServicesTimeline services={home.services} />
        </div>
      </section>

      <ProductCategoriesSection
        productCategories={home.productCategories}
        products={home.products}
      />

      <TruviaSection />

      <BeforeAfterSection />

      <StorySection />

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

      <ClientsSection
        title={t("clientsTitle")}
        subtitle={t("clientsSubtitle")}
        logos={home.clientLogos}
      />

      <FaqSection />

      <QuoteCtaSection />
    </>
  );
}
