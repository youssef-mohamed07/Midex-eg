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

  // CMS fills in studio-managed copy; bundled JSON wins when both define the same key.
  const bundled = await loadBundledMessages(locale);

  let messages = bundled;
  if (projectId) {
    try {
      const cmsMessages = await getCmsMessages(locale);
      if (cmsMessages) {
        messages = deepMerge(cmsMessages, bundled);
      }
    } catch {
      // CMS unreachable — serve bundled messages rather than failing the request.
    }
  }

  return { locale, messages };
});
