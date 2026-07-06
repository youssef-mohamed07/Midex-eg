import { cookies, headers } from "next/headers";
import { Poppins, Sora } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import "./globals.css";

const SANITY_CDN = "https://cdn.sanity.io";
const GOOGLE_MAPS = "https://maps.google.com";

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

async function resolveLocale(): Promise<Locale> {
  const headerList = await headers();
  const headerLocale = headerList.get("x-midex-locale");
  if (headerLocale && routing.locales.includes(headerLocale as Locale)) {
    return headerLocale as Locale;
  }

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  if (cookieLocale && routing.locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  return routing.defaultLocale;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${poppins.variable} ${sora.variable}`}
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
