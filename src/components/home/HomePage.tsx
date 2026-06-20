import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ClientsSection } from "@/components/home/ClientsSection";
import { EventsSection } from "@/components/home/EventsSection";
import { HeroSlider } from "@/components/home/HeroSlider";
import { NewsSection } from "@/components/home/NewsSection";
import { QuoteCtaSection } from "@/components/home/QuoteCtaSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  getLocalizedProducts,
  getLocalizedServices,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import {
  exclusivePartners,
  partners,
  stats,
} from "@/content/site";
import { getQuoteUrl } from "@/content/products";

function SectionHeading({
  title,
  subtitle,
  dark = false,
}: {
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-14 text-center">
      <span
        className={`mx-badge mb-4 ${dark ? "border-white/20 bg-white/10 text-white" : ""}`}
      >
        Midex
      </span>
      <h2
        className={`mx-section-title ${dark ? "text-white" : "text-midex-navy"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-section-subtitle mx-auto ${dark ? "text-white/70" : "text-midex-gray/80"}`}
        >
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-midex-mint to-midex-blue" />
    </div>
  );
}

export async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const tp = await getTranslations("products");
  const services = getLocalizedServices(locale);
  const featuredProducts = getLocalizedProducts(locale).slice(0, 8);

  return (
    <>
      <HeroSlider />

      <EventsSection />

      <section className="mx-section bg-midex-surface">
        <div className="mx-container">
          <RevealOnScroll>
            <SectionHeading title={t("servicesTitle")} subtitle={t("servicesSubtitle")} />
          </RevealOnScroll>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <RevealOnScroll key={service.title}>
                <article className="mx-card">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-midex-navy">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-midex-gray/80">{service.excerpt}</p>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-section bg-midex-navy mx-mesh-bg">
        <div className="mx-container">
          <RevealOnScroll>
            <SectionHeading
              title={t("newProducts")}
              subtitle={t("newProductsSubtitle")}
              dark
            />
          </RevealOnScroll>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <RevealOnScroll key={product.slug}>
                <article className="group mx-card flex h-full flex-col">
                  <div className="flex aspect-[4/3] items-center justify-center bg-midex-surface p-5">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={320}
                      height={240}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-bold leading-snug text-midex-navy line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-midex-gray/75">
                      {product.excerpt}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      <Link
                        className="mx-btn mx-btn-primary !px-4 !py-2 !text-xs"
                        href={`/products/${product.slug}`}
                      >
                        {tp("viewDetails")}
                      </Link>
                      <Link
                        className="mx-btn border border-midex-navy/15 bg-white !px-4 !py-2 !text-xs text-midex-navy hover:bg-midex-surface"
                        href={getQuoteUrl(product.title)}
                      >
                        {t("request")}
                      </Link>
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link className="mx-btn mx-btn-outline" href="/products">
              {tp("title")} →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-section bg-white">
        <div className="mx-container">
          <RevealOnScroll>
            <SectionHeading title={t("partnersTitle")} subtitle={t("partnersSubtitle")} />
          </RevealOnScroll>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-24 w-40 items-center justify-center rounded-xl border border-midex-navy/5 bg-white px-6 shadow-sm"
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="max-h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm font-semibold uppercase tracking-widest text-midex-gray/60">
            {t("exclusiveTitle")}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            {exclusivePartners.map((partner) => (
              <div key={partner.name} className="text-center">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={140}
                  height={80}
                  className="mx-auto h-16 w-auto object-contain"
                />
                <p className="mt-2 text-sm font-medium text-midex-navy">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection
        title={t("statsTitle")}
        subtitle={t("statsSubtitle")}
        items={stats.map((stat) => ({
          value: stat.value,
          label: t(stat.labelKey),
        }))}
      />

      <TestimonialsSection title={t("testimonialsTitle")} locale={locale} />

      <NewsSection locale={locale} />

      <ClientsSection title={t("clientsTitle")} subtitle={t("clientsSubtitle")} />

      <QuoteCtaSection />
    </>
  );
}
