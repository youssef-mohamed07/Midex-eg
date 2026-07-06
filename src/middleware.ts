import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { resolveLegacySolutionPath } from "./content/solutions";
import { applyGeoLocale } from "./i18n/locale-detection";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
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
  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
