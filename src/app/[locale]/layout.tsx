import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Poppins, Sora } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSocialButton } from "@/components/layout/FloatingSocialButton";
import { getSiteUrl, siteConfig } from "@/lib/seo/config";
import { buildSiteIcons } from "@/lib/seo/metadata";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

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

  return (
    <html lang={locale} dir={dir} className={`${poppins.variable} ${sora.variable}`}>
      <body className="overflow-x-hidden font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="overflow-x-hidden">{children}</main>
          <Footer />
          <FloatingSocialButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
