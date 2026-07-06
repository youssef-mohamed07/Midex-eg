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
import {
  getLocalizedServices,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import {
  stats,
} from "@/content/site";

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
  const services = getLocalizedServices(locale);

  return (
    <>
      <HeroSlider />

      <PartnersSection title={t("partnersTitle")} subtitle={t("partnersSubtitle")} />

      <FeaturedQuoteSection />

      <EngineeringCapabilitiesSection />

      <EventsSection />

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

          <ServicesTimeline services={services} />
        </div>
      </section>

      <ProductCategoriesSection />

      <TruviaSection />

      <BeforeAfterSection />

      <StorySection />

      <StatsSection
        title={t("statsTitle")}
        subtitle={t("statsSubtitle")}
        items={stats.map((stat) => ({
          value: stat.value,
          label: t(stat.labelKey),
          suffix: "suffix" in stat ? stat.suffix : undefined,
        }))}
      />

      <CaseStudiesSection />

      <TestimonialsSection
        title={t("testimonialsTitle")}
        subtitle={t("testimonialsSubtitle")}
        locale={locale}
      />

      <ExclusivePartnersSection title={t("exclusiveTitle")} />

      <HomeQuoteFormSection />

      <ClientsSection title={t("clientsTitle")} subtitle={t("clientsSubtitle")} />

      <FaqSection />

      <QuoteCtaSection />
    </>
  );
}
