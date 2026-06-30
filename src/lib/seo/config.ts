import type { Locale } from "@/i18n/routing";

export const siteConfig = {
  name: "Midex",
  legalName: "Midex for Integrated Projects and Contracting",
  defaultLocale: "en" as Locale,
  locales: ["en", "ar", "de"] as Locale[],
  email: "sales@midex-eg.com",
  phones: ["01026228403", "01006683803"],
  address: {
    street: "29 Al Mehwar Al Markazi, First 6th of October",
    city: "6th of October City (2)",
    region: "Giza Governorate",
    postalCode: "3225614",
    country: "EG",
  },
  social: {
    linkedIn: "https://www.linkedin.com/company/midex-eg",
    twitter: "https://x.com/midex_eg",
    whatsApp: "https://wa.me/201026228403",
  },
  brandIcon: "/images/brand/favicon.svg",
  defaultOgImage: "/images/hero/slide-1.png",
  twitterHandle: "@midex_eg",
  openGraphLocales: {
    en: "en_US",
    ar: "ar_EG",
    de: "de_DE",
  } as const,
};

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.midex-eg.com";
  return url.replace(/\/$/, "");
}

export function parseLocale(value: string): Locale {
  return siteConfig.locales.includes(value as Locale)
    ? (value as Locale)
    : siteConfig.defaultLocale;
}
