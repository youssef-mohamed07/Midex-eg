import type { ReactNode } from "react";
import { Fragment } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { ClientLogosSection } from "@/components/home/ClientLogosSection";
import { EventsSection } from "@/components/home/EventsSection";
import { ExclusivePartnersSection } from "@/components/home/ExclusivePartnersSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturedQuoteSection } from "@/components/home/FeaturedQuoteSection";
import { HeroSlider } from "@/components/home/HeroSlider";
import { HomeQuoteFormSection } from "@/components/home/HomeQuoteFormSection";
import { EngineeringCapabilitiesSection } from "@/components/home/EngineeringCapabilitiesSection";
import { TruviaSection } from "@/components/home/TruviaSection";
import { NewsSection } from "@/components/home/NewsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ProductCategoriesSection } from "@/components/home/ProductCategoriesSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PageCtaSection } from "@/components/cms/PageCtaSection";
import { getHomePageData, getHomePageSections } from "@/lib/cms";
import { resolveHomeSectionOrder, type HomeSectionKey } from "@/lib/cms/section-driven";
import {
  isSectionEnabled,
  pick,
  resolveBeforeAfter,
  resolveFaq,
  resolvePageCta,
  resolvePromo,
  resolveQuoteBlock,
  resolveSectionHeader,
} from "@/lib/cms/section-resolve";
import { type Locale } from "@/i18n/routing";

export async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const th = await getTranslations("hero");
  const tp = await getTranslations("products");
  const [home, sections] = await Promise.all([
    getHomePageData(locale),
    getHomePageSections(locale),
  ]);

  const partners = resolveSectionHeader(sections.partnersSection, {
    title: t("partnersTitle"),
  });
  const capabilities = {
    enabled: sections.capabilitiesSection?.enabled,
    title: pick(sections.capabilitiesSection?.title, t("capabilitiesTitle")),
    subtitle: pick(sections.capabilitiesSection?.subtitle, t("capabilitiesSubtitle")),
    cards: sections.capabilitiesSection?.cards,
  };
  const events = resolveSectionHeader(sections.eventsSection, {
    title: t("ourEvents"),
    subtitle: t("eventsSubtitle"),
  });
  const statsHeader = resolveSectionHeader(sections.statsSection, {
    title: t("statsTitle"),
    subtitle: t("statsSubtitle"),
  });
  const caseStudiesHeader = resolveSectionHeader(sections.caseStudiesSection, {
    title: t("caseStudiesTitle"),
    subtitle: t("caseStudiesSubtitle"),
  });
  const testimonialsHeader = resolveSectionHeader(sections.testimonialsSection, {
    title: t("testimonialsTitle"),
    subtitle: t("testimonialsSubtitle"),
  });
  const exclusive = resolveSectionHeader(sections.exclusiveSection, {
    title: t("exclusiveTitle"),
  });
  const quoteFormHeader = resolveSectionHeader(sections.quoteFormSection, {
    title: t("quoteFormTitle"),
    subtitle: t("quoteFormSubtitle"),
  });
  const servicesHeader = resolveSectionHeader(sections.servicesSection, {
    title: t("servicesTitle"),
    subtitle: t("servicesSubtitle"),
  });
  const newsHeader = resolveSectionHeader(sections.newsSection, {
    title: t("blogTitle"),
    subtitle: t("blogSubtitle"),
    viewAllLabel: t("viewAllArticles"),
  });
  const clientLogosHeader = resolveSectionHeader(sections.clientLogosSection, {
    title: t("clientsTitle"),
  });
  const productsHeader = resolveSectionHeader(sections.productsSection, {
    title: tp("title"),
    subtitle: tp("subtitle"),
  });

  const heroCopy = {
    slide1Title: pick(sections.heroCopy?.slide1Title, th("slide1Title")),
    slide1Text: pick(sections.heroCopy?.slide1Text, th("slide1Text")),
    requestQuote: pick(sections.heroCopy?.requestQuote, th("requestQuote")),
    viewProducts: pick(sections.heroCopy?.viewProducts, th("viewProducts")),
    viewProductsHref: sections.heroCopy?.viewProductsHref || "/products",
    seeSolutions: pick(sections.heroCopy?.seeSolutions, th("seeSolutions")),
  };

  const featuredQuote = resolveQuoteBlock(sections.featuredQuote, {
    quote: t("featuredQuoteText"),
    name: t("featuredQuoteName"),
    role: t("featuredQuoteRole"),
  });

  const truvia = resolvePromo(sections.truviaSection, {
    title: t("truviaTitle"),
    body: t("truviaSubtitle"),
    ctaLabel: t("truviaDiscover"),
    ctaHref: "/products/category/piping-and-fitting",
    features: [
      { title: t("truviaFeature1Title"), text: t("truviaFeature1Text") },
      { title: t("truviaFeature2Title"), text: t("truviaFeature2Text") },
      { title: t("truviaFeature3Title"), text: t("truviaFeature3Text") },
      { title: t("truviaFeature4Title"), text: t("truviaFeature4Text") },
    ],
  });

  const beforeAfter = resolveBeforeAfter(sections.beforeAfterSection, {
    title: t("processPerformanceTitle"),
    subtitle: t("beforeAfterTitle"),
    beforeItems: [
      t("processDuring1"),
      t("processDuring2"),
      t("processDuring3"),
      t("processDuring4"),
      t("processDuring5"),
    ],
    afterItems: [
      t("processAfter1"),
      t("processAfter2"),
      t("processAfter3"),
      t("processAfter4"),
      t("processAfter5"),
    ],
  });

  const faq = resolveFaq(sections.faq, {
    title: t("faqTitle"),
    intro: t("faqSubtitle"),
    items: [1, 2, 3, 4, 5, 6].map((index) => ({
      question: t(`faqQ${index}`),
      answer: t(`faqA${index}`),
    })),
  });

  const quoteCta = resolvePageCta(sections.quoteCta, {
    title: t("quoteTitle"),
    text: t("quoteText"),
    primaryCta: t("quoteButton"),
    primaryCtaHref: "/contact",
  });

  const sectionNodes: Record<HomeSectionKey, ReactNode> = {
    partners: isSectionEnabled(partners.enabled) ? (
      <PartnersSection title={partners.title} partners={home.partners} />
    ) : null,
    featuredQuote: isSectionEnabled(featuredQuote.enabled) ? (
      <FeaturedQuoteSection content={featuredQuote} />
    ) : null,
    capabilities: isSectionEnabled(capabilities.enabled) ? (
      <EngineeringCapabilitiesSection
        title={capabilities.title}
        subtitle={capabilities.subtitle}
        cards={capabilities.cards}
      />
    ) : null,
    stats: isSectionEnabled(statsHeader.enabled) ? (
      <StatsSection
        title={statsHeader.title}
        subtitle={statsHeader.subtitle}
        items={home.stats.map((stat) => ({
          value: stat.value,
          label: pick(stat.label, t(stat.labelKey)),
          suffix: stat.suffix,
        }))}
      />
    ) : null,
    truvia: isSectionEnabled(truvia.enabled) ? <TruviaSection content={truvia} /> : null,
    events: isSectionEnabled(events.enabled) ? (
      <EventsSection events={home.events} title={events.title} subtitle={events.subtitle} />
    ) : null,
    beforeAfter: isSectionEnabled(beforeAfter.enabled) ? (
      <BeforeAfterSection content={beforeAfter} />
    ) : null,
    products: isSectionEnabled(productsHeader.enabled) ? (
      <ProductCategoriesSection
        title={productsHeader.title}
        subtitle={productsHeader.subtitle}
        productCategories={home.productCategories}
        products={home.products}
        categoryOrder={home.productCategoryOrder}
      />
    ) : null,
    caseStudies: isSectionEnabled(caseStudiesHeader.enabled) ? (
      <CaseStudiesSection
        caseStudies={home.caseStudies}
        title={caseStudiesHeader.title}
        subtitle={caseStudiesHeader.subtitle}
      />
    ) : null,
    testimonials: isSectionEnabled(testimonialsHeader.enabled) ? (
      <TestimonialsSection
        title={testimonialsHeader.title}
        subtitle={testimonialsHeader.subtitle}
        testimonials={home.testimonials}
      />
    ) : null,
    exclusive: isSectionEnabled(exclusive.enabled) ? (
      <ExclusivePartnersSection title={exclusive.title} partners={home.exclusivePartners} />
    ) : null,
    quoteForm: isSectionEnabled(quoteFormHeader.enabled) ? (
      <HomeQuoteFormSection
        title={quoteFormHeader.title}
        subtitle={quoteFormHeader.subtitle}
        copy={sections.quoteFormCopy}
      />
    ) : null,
    services: isSectionEnabled(servicesHeader.enabled, false) ? (
      <ServicesSection
        title={servicesHeader.title}
        subtitle={servicesHeader.subtitle}
        services={home.services}
      />
    ) : null,
    clientLogos: isSectionEnabled(clientLogosHeader.enabled, false) ? (
      <ClientLogosSection title={clientLogosHeader.title} logos={home.clientLogos} />
    ) : null,
    news: isSectionEnabled(newsHeader.enabled, false) ? (
      <NewsSection
        locale={locale}
        title={newsHeader.title}
        subtitle={newsHeader.subtitle}
        viewAllLabel={newsHeader.viewAllLabel}
      />
    ) : null,
    faq: isSectionEnabled(faq.enabled) ? (
      <FaqSection content={faq} contactLabel={t("faqContact")} />
    ) : null,
    quoteCta: <PageCtaSection content={quoteCta} />,
  };

  const order = resolveHomeSectionOrder(sections.sectionOrder);

  return (
    <>
      <HeroSlider collage={home.heroCollage} heroCopy={heroCopy} />
      {order.map((key) => {
        const node = sectionNodes[key];
        return node ? <Fragment key={key}>{node}</Fragment> : null;
      })}
    </>
  );
}
