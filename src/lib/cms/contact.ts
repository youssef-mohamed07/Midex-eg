import { siteConfig } from "@/lib/seo/config";
import type { SiteContact, SiteSettings } from "@/lib/cms/types";

/** Split concatenated Egyptian mobiles (e.g. 0102622840301006683803 → two numbers). */
export function normalizePhones(phones: string[] | undefined | null): string[] {
  const flattened = (phones ?? []).flatMap((phone) => {
    const trimmed = phone?.trim();
    if (!trimmed) return [];

    const digits = trimmed.replace(/\D/g, "");
    const matches = digits.match(/01\d{9}/g);
    if (matches && matches.length > 0) return matches;

    return [trimmed];
  });

  return flattened.length > 0 ? flattened : [...siteConfig.phones];
}

export function resolveSiteContact(contact?: Partial<SiteContact> | null): SiteContact {
  return {
    email: contact?.email?.trim() || siteConfig.email,
    phones: normalizePhones(contact?.phones),
    address: contact?.address?.trim() || "",
    mapsUrl: contact?.mapsUrl?.trim() || "",
    mapsEmbedUrl: contact?.mapsEmbedUrl?.trim() || "",
  };
}

export function resolveSocialLinks(social?: SiteSettings["social"] | null) {
  return {
    linkedIn: social?.linkedIn?.trim() || siteConfig.social.linkedIn,
    facebook: social?.facebook?.trim() || siteConfig.social.facebook,
    youtube: social?.youtube?.trim() || siteConfig.social.youtube,
    whatsApp: social?.whatsApp?.trim() || siteConfig.social.whatsApp,
    // No X/Twitter presence — ignore any CMS leftover URL.
    twitter: undefined,
  };
}

export function phoneTelHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) return `tel:+${digits.slice(2)}`;
  if (digits.startsWith("0") && digits.length === 11) return `tel:+20${digits.slice(1)}`;
  if (digits.startsWith("20")) return `tel:+${digits}`;
  return `tel:${digits || phone}`;
}

export function mapsHref(contact: Pick<SiteContact, "mapsUrl" | "address">, fallbackAddress = "") {
  const mapsUrl = contact.mapsUrl?.trim();
  if (mapsUrl) return mapsUrl;

  const address = contact.address?.trim() || fallbackAddress.trim();
  if (!address) return "";

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
