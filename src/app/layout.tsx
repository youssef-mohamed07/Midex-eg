import { headers } from "next/headers";
import localFont from "next/font/local";
import { routing, type Locale } from "@/i18n/routing";
import "./globals.css";

const SANITY_CDN = "https://cdn.sanity.io";
const GOOGLE_MAPS = "https://maps.google.com";

function localeDir(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

async function resolveLocale(): Promise<Locale> {
  const headerList = await headers();
  const headerLocale = headerList.get("x-midex-locale");
  if (headerLocale && routing.locales.includes(headerLocale as Locale)) {
    return headerLocale as Locale;
  }

  // Path-based fallback for RSC requests (never use a stale NEXT_LOCALE cookie).
  const invokePath = headerList.get("x-invoke-path") ?? headerList.get("next-url") ?? "";
  const pathMatch = invokePath.match(/^\/(en|ar|de)(\/|$)/);
  if (pathMatch) {
    return pathMatch[1] as Locale;
  }

  return routing.defaultLocale;
}

const alexandria = localFont({
  src: [
    {
      path: "../../public/branding/Font/Alexandria/Alexandria-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/branding/Font/Alexandria/Alexandria-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/branding/Font/Alexandria/Alexandria-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/branding/Font/Alexandria/Alexandria-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/branding/Font/Alexandria/Alexandria-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-alexandria",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveLocale();
  const dir = localeDir(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${alexandria.variable}`}
    >
      <head>
        <link rel="preconnect" href={SANITY_CDN} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={SANITY_CDN} />
        <link rel="preconnect" href={GOOGLE_MAPS} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={GOOGLE_MAPS} />
      </head>
      <body className="overflow-x-hidden bg-white font-body antialiased">{children}</body>
    </html>
  );
}
