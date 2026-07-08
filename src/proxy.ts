import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { resolveLegacySolutionPath } from "./lib/legacy-solution-redirects";
import { applyGeoLocale } from "./i18n/locale-detection";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Studio lives at /studio (no locale prefix). Redirect /en/studio → /studio.
  const localizedStudioMatch = pathname.match(/^\/(en|ar|de)\/studio(\/.*)?$/);
  if (localizedStudioMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/studio${localizedStudioMatch[2] ?? ""}`;
    return NextResponse.redirect(url, 308);
  }

  // Studio is outside locale routing — pass through untouched.
  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    const response = NextResponse.next();
    response.headers.set("x-midex-locale", "en");
    return response;
  }

  const category = request.nextUrl.searchParams.get("category");
  if (category) {
    const match = request.nextUrl.pathname.match(/^\/(en|ar|de)\/products\/?$/);
    if (match) {
      const url = request.nextUrl.clone();
      url.searchParams.delete("category");
      url.pathname = `/${match[1]}/products/category/${encodeURIComponent(category)}`;
      return NextResponse.redirect(url, 308);
    }
  }

  const legacySolutionMatch = request.nextUrl.pathname.match(
    /^\/(en|ar|de)\/solutions\/([^/]+)\/?$/,
  );
  if (legacySolutionMatch) {
    const [, locale, slug] = legacySolutionMatch;
    const redirectPath = resolveLegacySolutionPath(slug);
    if (redirectPath) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}${redirectPath}`;
      return NextResponse.redirect(url, 308);
    }
  }

  applyGeoLocale(request);
  const response = handleI18nRouting(request);

  const localeMatch = request.nextUrl.pathname.match(/^\/(en|ar|de)(\/|$)/);
  if (localeMatch) {
    response.headers.set("x-midex-locale", localeMatch[1]);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
