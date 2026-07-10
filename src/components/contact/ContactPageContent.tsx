import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfoAside } from "@/components/contact/ContactInfoAside";
import { ContactMapSection } from "@/components/contact/ContactMapSection";
import { ContactMapPrefetch } from "@/components/contact/ContactMapPrefetch";
import { PageHero } from "@/components/layout/PageHero";
import { PageHeroImage } from "@/components/cms/PageHeroImage";
import { getContactPageContent, getSiteSettings } from "@/lib/cms";
import { pick, resolvePageHero } from "@/lib/cms/section-resolve";
import type { Locale } from "@/i18n/routing";

export async function ContactPageContent() {
  const t = await getTranslations("contact");
  const locale = (await getLocale()) as Locale;
  const [settings, page] = await Promise.all([
    getSiteSettings(),
    getContactPageContent(locale),
  ]);
  const siteContact = settings?.contact ?? {
    email: "",
    phones: [],
    address: "",
    mapsUrl: "",
    mapsEmbedUrl: "",
  };

  const hero = resolvePageHero(page.hero, {
    eyebrow: t("heroEyebrow"),
    title: t("title"),
    subtitle: t("intro"),
    badge: t("heroResponse"),
    primaryCta: t("heroSendMessage"),
    primaryCtaHref: "#contact-form",
  });

  const asideIntro = pick(page.aside?.intro, t("asideIntro"));
  const formTitle = pick(page.form?.title, t("sendMessage"));
  const formIntro = pick(page.form?.intro, t("formIntro"));
  const mapTitle = pick(page.map?.title, t("mapTitle"));
  const mapSubtitle = pick(page.map?.subtitle, t("mapSubtitle"));

  return (
    <>
      <ContactMapPrefetch embedUrl={siteContact.mapsEmbedUrl} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        compact
        media={<PageHeroImage src={hero.image} alt={hero.title} />}
      >
        {hero.badge && (
          <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-midex-mint sm:mt-8">
            <span className="h-1.5 w-1.5 rounded-full bg-midex-mint" aria-hidden />
            {hero.badge}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={hero.primaryCtaHref || "#contact-form"}
            className="group mx-btn mx-btn-primary border-white/20 bg-white text-midex-navy hover:bg-midex-mint hover:text-midex-navy"
          >
            {hero.primaryCta}
            <span className="mx-arrow">→</span>
          </Link>
          {siteContact.email && (
            <a
              href={`mailto:${siteContact.email}`}
              className="mx-btn border border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10"
            >
              {siteContact.email}
            </a>
          )}
        </div>
      </PageHero>

      <section className="mx-section">
        <div className="mx-container">
          <div id="contact-form" className="midex-contact-layout scroll-mt-28">
            <ContactInfoAside
              showOffice
              sticky
              siteContact={siteContact}
              settings={settings}
              intro={asideIntro}
            />

            <Suspense fallback={null}>
              <div className="min-w-0">
                <ContactForm
                  title={formTitle}
                  intro={formIntro}
                  copy={page.form?.copy}
                />
              </div>
            </Suspense>
          </div>
        </div>
      </section>

      <ContactMapSection
        siteContact={siteContact}
        title={mapTitle}
        subtitle={mapSubtitle}
      />
    </>
  );
}
