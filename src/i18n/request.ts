import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "./routing";
import { deepMerge, getCmsMessages } from "@/lib/cms/messages";
import { projectId } from "@/sanity/env";

type Messages = Record<string, unknown>;

async function loadBundledMessages(locale: Locale): Promise<Messages> {
  return (await import(`../../messages/${locale}.json`)).default as Messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Bundled JSON is the baseline; Studio UI Messages override matching keys.
  const bundled = await loadBundledMessages(locale);

  let messages = bundled;
  if (projectId) {
    try {
      const cmsMessages = await getCmsMessages(locale);
      if (cmsMessages) {
        messages = deepMerge(bundled, cmsMessages);
      }
    } catch {
      // CMS unreachable — serve bundled messages rather than failing the request.
    }
  }

  return { locale, messages };
});
