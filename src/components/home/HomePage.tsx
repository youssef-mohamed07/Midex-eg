import { getLocale, getTranslations } from "next-intl/server";
import { ClientsSection } from "@/components/home/ClientsSection";
import { EventsSection } from "@/components/home/EventsSection";
import { ExclusivePartnersSection } from "@/components/home/ExclusivePartnersSection";
import { HeroSlider } from "@/components/home/HeroSlider";
import { NewsSection } from "@/components/home/NewsSection";
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
    <div className={center ? "mx-auto mb-14 max-w-2xl text-center" : "mb-12 max-w-3xl"}>
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

      <EventsSection />

      <PartnersSection title={t("partnersTitle")} subtitle={t("partnersSubtitle")} />

      {/* Services — alternating timeline */}
      <section className="mx-section bg-midex-surface">
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

      <StatsSection
        title={t("statsTitle")}
        subtitle={t("statsSubtitle")}
        items={stats.map((stat) => ({
          value: stat.value,
          label: t(stat.labelKey),
        }))}
      />

      <TestimonialsSection title={t("testimonialsTitle")} locale={locale} />

      <ExclusivePartnersSection title={t("exclusiveTitle")} />

      <NewsSection locale={locale} />

      <ClientsSection title={t("clientsTitle")} subtitle={t("clientsSubtitle")} />

      <QuoteCtaSection />
    </>
  );
}
