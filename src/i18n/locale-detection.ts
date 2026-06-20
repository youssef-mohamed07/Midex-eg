import type { NextRequest } from "next/server";
import type { Locale } from "./routing";
import { routing } from "./routing";

const ARAB_COUNTRIES = new Set([
  "EG",
  "SA",
  "AE",
  "KW",
  "QA",
  "BH",
  "OM",
  "JO",
  "LB",
  "SY",
  "IQ",
  "YE",
  "LY",
  "TN",
  "DZ",
  "MA",
  "SD",
  "PS",
]);

const GERMAN_COUNTRIES = new Set(["DE", "AT", "CH", "LI", "LU"]);

function readCountry(request: NextRequest): string | undefined {
  const geoCountry = (request as NextRequest & { geo?: { country?: string } }).geo?.country;

  return (
    geoCountry ??
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    undefined
  )?.toUpperCase();
}

export function detectLocaleFromGeo(request: NextRequest): Locale | undefined {
  const country = readCountry(request);
  if (!country || country === "XX") return undefined;

  if (ARAB_COUNTRIES.has(country)) return "ar";
  if (GERMAN_COUNTRIES.has(country)) return "de";
  return "en";
}

export function applyGeoLocale(request: NextRequest): void {
  const locale = detectLocaleFromGeo(request);
  if (locale && routing.locales.includes(locale)) {
    request.headers.set("accept-language", locale);
  }
}
