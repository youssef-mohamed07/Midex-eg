import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSocialButton } from "@/components/layout/FloatingSocialButton";
import { LocaleDirectionSync } from "@/components/layout/LocaleDirectionSync";
import { getSiteUrl, siteConfig } from "@/lib/seo/config";
import { buildSiteIcons } from "@/lib/seo/metadata";
import {
  getLayoutShellData,
} from "@/lib/cms/layout";
import { getProductCategoryImage } from "@/lib/cms/helpers";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(getSiteUrl()),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.legalName, url: getSiteUrl() }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    icons: buildSiteIcons(),
    manifest: "/manifest.webmanifest",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const shell = await getLayoutShellData(locale as Locale);

  const productCategoryEntries = Object.entries(shell.productCategories).map(
    ([slug, category]) => ({
      slug,
      label: category.label,
      description: category.description,
      image: getProductCategoryImage(slug, shell.products),
    }),
  );

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleDirectionSync />
      <div dir={dir} lang={locale} className="flex min-h-dvh flex-col">
      <Header
        productCategories={productCategoryEntries}
        solutionGroupsNav={shell.solutionGroupsNav}
        featuredImage={shell.featuredImage}
        logoWhite={shell.logos.logoWhite}
        logoDark={shell.logos.logoDark}
        siteName={shell.settings?.name}
        chrome={shell.chrome}
      />
      <main className="overflow-x-hidden bg-white">{children}</main>
      <Footer shell={shell} />
      <FloatingSocialButton
        social={shell.settings?.social ?? {}}
        email={shell.siteContact.email}
        labels={{
          open: shell.chrome.socialOpen,
          close: shell.chrome.socialClose,
          linkedIn: shell.chrome.socialLinkedIn,
          facebook: shell.chrome.socialFacebook,
          youtube: shell.chrome.socialYoutube,
          whatsapp: shell.chrome.socialWhatsapp,
          email: shell.chrome.socialEmail,
        }}
      />
      </div>
    </NextIntlClientProvider>
  );
}
