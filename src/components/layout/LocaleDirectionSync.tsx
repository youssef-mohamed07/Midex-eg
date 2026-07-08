"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";
import { routing, type Locale } from "@/i18n/routing";

function localeDir(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Keeps <html lang/dir> in sync when switching locales client-side. */
export function LocaleDirectionSync() {
  const locale = useLocale() as Locale;

  useEffect(() => {
    if (!routing.locales.includes(locale)) return;

    const root = document.documentElement;
    root.setAttribute("lang", locale);
    root.setAttribute("dir", localeDir(locale));
  }, [locale]);

  return null;
}
