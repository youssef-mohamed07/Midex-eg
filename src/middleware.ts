import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
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

  applyGeoLocale(request);
  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
