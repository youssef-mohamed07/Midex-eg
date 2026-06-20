"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const flags: Record<Locale, string> = {
  en: "🇬🇧",
  ar: "🇪🇬",
  de: "🇩🇪",
};

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("common");

  const langLabel = (lang: Locale) => {
    if (lang === "en") return t("langEn");
    if (lang === "ar") return t("langAr");
    return t("langDe");
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`} role="group" aria-label={t("language")}>
      {routing.locales.map((lang) => (
        <Link
          key={lang}
          href={pathname}
          locale={lang}
          aria-label={langLabel(lang)}
          aria-current={locale === lang ? "true" : undefined}
          title={langLabel(lang)}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-lg leading-none transition-colors ${
            locale === lang
              ? "border-midex-mint bg-midex-mint/20 shadow-sm"
              : "border-midex-navy/15 hover:border-midex-mint hover:bg-midex-mint/10"
          }`}
        >
          <span aria-hidden>{flags[lang]}</span>
        </Link>
      ))}
    </div>
  );
}
