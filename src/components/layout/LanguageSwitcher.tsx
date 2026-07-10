"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const localeCodes: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
  de: "DE",
};

type LanguageSwitcherProps = {
  className?: string;
  overlay?: boolean;
  labels?: {
    langEn?: string;
    langAr?: string;
    langDe?: string;
    language?: string;
  };
};

function pickLabel(cms: string | undefined, fallback: string): string {
  const value = cms?.trim();
  return value || fallback;
}

export function LanguageSwitcher({
  className = "",
  overlay = false,
  labels = {},
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("common");

  const langLabel = (lang: Locale) => {
    if (lang === "en") return pickLabel(labels.langEn, t("langEn"));
    if (lang === "ar") return pickLabel(labels.langAr, t("langAr"));
    return pickLabel(labels.langDe, t("langDe"));
  };

  const shellClass = overlay
    ? "border-white/20 bg-white/5"
    : "border-midex-line/60 bg-white/80";

  const activeClass = overlay
    ? "bg-white text-midex-navy shadow-sm"
    : "bg-midex-navy text-white shadow-sm";

  const inactiveClass = overlay
    ? "text-white/80 hover:bg-white/10 hover:text-white"
    : "text-midex-gray hover:bg-midex-surface hover:text-midex-navy";

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border p-0.5 ${shellClass} ${className}`}
      role="group"
      aria-label={pickLabel(labels.language, t("language"))}
    >
      {routing.locales.map((lang) => {
        const isActive = locale === lang;

        return (
          <Link
            key={lang}
            href={pathname}
            locale={lang}
            aria-label={langLabel(lang)}
            aria-current={isActive ? "true" : undefined}
            title={langLabel(lang)}
            className={`min-w-[2.125rem] rounded-full px-2 py-1 text-center text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors no-underline sm:min-w-[2.375rem] sm:px-2.5 ${
              isActive ? activeClass : inactiveClass
            }`}
          >
            {localeCodes[lang]}
          </Link>
        );
      })}
    </div>
  );
}
