import "server-only";

import type { Locale } from "@/i18n/routing";
import { brandManifest } from "@/lib/branding/tokens";
import { resolveSiteContact, resolveSocialLinks } from "@/lib/cms/contact";
import { sanityFetch } from "@/lib/cms/fetch";
import { imageUrl, loc, locList, locOptional } from "@/lib/cms/fragments";
import { isValidImageSrc } from "@/lib/cms/images";
import type {
  CaseStudy,
  Certificate,
  CompanyValue,
  EventItem,
  Founder,
  HeroCollage,
  Milestone,
  NewsItem,
  Partner,
  Service,
  SiteContact,
  SiteSettings,
  Stat,
  Testimonial,
} from "@/lib/cms/types";

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  "name": coalesce(name, "Midex"),
  "legalName": coalesce(legalName, ""),
  "contact": {
    "email": coalesce(email, ""),
    "phones": coalesce(phones, []),
    "address": coalesce(address, ""),
    "mapsUrl": coalesce(mapsUrl, ""),
    "mapsEmbedUrl": coalesce(mapsEmbedUrl, "")
  },
  "addressParts": {
    "street": coalesce(addressStreet, ""),
    "city": coalesce(addressCity, ""),
    "region": coalesce(addressRegion, ""),
    "postalCode": coalesce(addressPostalCode, ""),
    "country": coalesce(addressCountry, "")
  },
  "social": {
    "linkedIn": linkedIn,
    "twitter": twitter,
    "whatsApp": whatsApp
  },
  "twitterHandle": twitterHandle,
  "manifest": {
    "description": coalesce(manifestDescription, ""),
    "backgroundColor": coalesce(manifestBackgroundColor, "${brandManifest.backgroundColor}"),
    "themeColor": coalesce(manifestThemeColor, "${brandManifest.themeColor}")
  },
  "robotsDisallow": coalesce(robotsDisallow, ["/api/"])
}`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const settings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });
  if (!settings) return null;
  return {
    ...settings,
    contact: resolveSiteContact(settings.contact),
    social: resolveSocialLinks(settings.social),
  };
}

export async function getBrandLogos(): Promise<{ logoWhite: string; logoDark: string }> {
  const logos = await sanityFetch<{ logoWhite: string; logoDark: string } | null>({
    query: `*[_type == "siteSettings"][0]{
      "logoWhite": ${imageUrl("logoWhite")},
      "logoDark": ${imageUrl("logoDark")}
    }`,
    tags: ["siteSettings"],
  });
  return {
    logoWhite: logos?.logoWhite || "/images/brand/logo-white.png",
    logoDark: logos?.logoDark || "/images/brand/logo-dark.png",
  };
}

export async function getSiteContact(): Promise<SiteContact> {
  const settings = await getSiteSettings();
  return resolveSiteContact(settings?.contact);
}

export async function getHeroCollage(): Promise<HeroCollage> {
  const collage = await sanityFetch<HeroCollage | null>({
    query: `*[_type == "homePage"][0]{
      "left": coalesce(heroCollageLeft[]{
        "src": ${imageUrl("image")},
        "className": coalesce(className, "")
      }, []),
      "right": coalesce(heroCollageRight[]{
        "src": ${imageUrl("image")},
        "className": coalesce(className, "")
      }, []),
      "mobileImage": coalesce(
        heroSlides[0].image.asset->url,
        heroSlides[0].image.sourcePath,
        ""
      )
    }`,
    tags: ["homePage"],
  });
  return collage ?? { left: [], right: [], mobileImage: "" };
}

export async function getFeaturedNavImage(): Promise<string> {
  const result = await sanityFetch<{ image: string } | null>({
    query: `*[_type == "homePage"][0]{ "image": ${imageUrl("featuredNavImage")} }`,
    tags: ["homePage"],
  });
  return result?.image || "/images/hero/slide-1.png";
}

export async function getServices(locale: Locale): Promise<Service[]> {
  return sanityFetch<Service[]>({
    query: `*[_type == "service"] | order(order asc) {
      "title": ${loc("title")},
      "excerpt": ${loc("excerpt")},
      "image": ${imageUrl("image")}
    }`,
    params: { locale },
    tags: ["service"],
  });
}

export async function getPartners(): Promise<Partner[]> {
  return sanityFetch<Partner[]>({
    query: `*[_type == "partner" && kind == "partner"] | order(order asc) {
      name,
      "image": ${imageUrl("image")}
    }`,
    tags: ["partner"],
  });
}

export async function getExclusivePartners(): Promise<Partner[]> {
  return sanityFetch<Partner[]>({
    query: `*[_type == "partner" && kind == "exclusive"] | order(order asc) {
      name,
      "image": ${imageUrl("image")},
      "href": coalesce(href, "")
    }`,
    tags: ["partner"],
  });
}

export async function getCertificates(locale: Locale): Promise<Certificate[]> {
  const items = await sanityFetch<Certificate[]>({
    query: `*[_type == "certificate" && (defined(image.asset) || defined(image.sourcePath))] | order(order asc) {
      "slug": slug.current,
      "image": ${imageUrl("image")},
      "alt": ${loc("image.alt")},
      "title": ${locOptional("title")},
      "description": ${locOptional("description")}
    }`,
    params: { locale },
    tags: ["certificate"],
  });

  return items.filter((cert) => isValidImageSrc(cert.image) && cert.slug);
}

export async function getStats(locale: Locale): Promise<Stat[]> {
  return sanityFetch<Stat[]>({
    query: `*[_type == "stat"] | order(order asc) {
      value,
      labelKey,
      "label": ${locOptional("label")},
      suffix
    }`,
    params: { locale },
    tags: ["stat"],
  });
}

export async function getAboutMilestones(locale: Locale): Promise<Milestone[]> {
  return sanityFetch<Milestone[]>({
    query: `*[_type == "milestone"] | order(order asc) {
      value,
      labelKey,
      "label": ${locOptional("label")},
      suffix
    }`,
    params: { locale },
    tags: ["milestone"],
  });
}

export async function getAboutFounders(locale: Locale): Promise<Founder[]> {
  return sanityFetch<Founder[]>({
    query: `*[_type == "founder"] | order(order asc) {
      "id": key,
      "image": ${imageUrl()},
      nameKey,
      roleKey,
      bioKey,
      "name": ${locOptional("name")},
      "role": ${locOptional("role")},
      "bio": ${locOptional("bio")}
    }`,
    params: { locale },
    tags: ["founder"],
  });
}

export async function getAboutStandards(
  locale: Locale,
): Promise<{ key: string; text: string; description?: string }[]> {
  const result = await sanityFetch<{
    standardsSection?: { items?: { key: string; text: string; description?: string }[] };
    standards?: string[];
  } | null>({
    query: `*[_type == "aboutPage"][0]{
      standardsSection{
        items[]{
          key,
          "text": ${loc("text")},
          "description": ${locOptional("description")}
        }
      },
      standards
    }`,
    params: { locale },
    tags: ["aboutPage"],
  });

  const cmsItems = (result?.standardsSection?.items ?? []).filter((item) => item.text?.trim());
  if (cmsItems.length > 0) return cmsItems;

  return (result?.standards ?? []).map((key) => ({ key, text: "" }));
}

export async function getCompanyValues(locale: Locale): Promise<CompanyValue[]> {
  const result = await sanityFetch<{
    valuesSection?: { items?: CompanyValue[] };
    values?: CompanyValue[];
  } | null>({
    query: `*[_type == "aboutPage"][0]{
      valuesSection{
        items[]{
          "id": key,
          "title": ${loc("title")},
          "text": ${loc("text")},
          "image": ${imageUrl("image")},
          "alt": ${loc("image.alt")}
        }
      },
      "values": coalesce(values[]{
        "id": key,
        "image": ${imageUrl("image")},
        "alt": ${loc("image.alt")}
      }, [])
    }`,
    params: { locale },
    tags: ["aboutPage"],
  });

  const cmsItems = result?.valuesSection?.items?.filter((item) => item.title || item.image);
  if (cmsItems?.length) return cmsItems;

  return result?.values ?? [];
}

export async function getTestimonials(locale: Locale): Promise<Testimonial[]> {
  return sanityFetch<Testimonial[]>({
    query: `*[_type == "testimonial"] | order(order asc) {
      "name": coalesce(name[$locale], name.en, name),
      "role": ${loc("role")},
      "quote": ${loc("quote")},
      "image": ${imageUrl("image")},
      "product": product->{
        "slug": slug.current,
        "title": ${loc("title")}
      }
    }`,
    params: { locale },
    tags: ["testimonial"],
  });
}

export async function getNewsItems(locale: Locale): Promise<NewsItem[]> {
  return sanityFetch<NewsItem[]>({
    query: `*[_type == "newsItem"] | order(order asc) {
      "title": ${loc("title")},
      "date": coalesce(date, ""),
      "excerpt": ${loc("excerpt")},
      "image": ${imageUrl()}
    }`,
    params: { locale },
    tags: ["newsItem"],
  });
}

export async function getCaseStudies(locale: Locale): Promise<CaseStudy[]> {
  return sanityFetch<CaseStudy[]>({
    query: `*[_type == "caseStudy"] | order(order asc) {
      "slug": slug.current,
      client,
      "image": ${imageUrl()},
      "gallery": gallery[].asset->url,
      "industry": ${loc("industry")},
      "scope": ${loc("scope")},
      "outcome": ${loc("outcome")},
      "statValue": coalesce(statValue, ""),
      "statLabel": ${loc("statLabel")},
      "tags": ${locList("tags")},
      "solutionGroup": solutionGroup->{
        "slug": slug.current,
        "label": ${loc("label")}
      }
    }`,
    params: { locale },
    tags: ["caseStudy"],
  });
}

export async function getCaseStudy(
  slug: string,
  locale: Locale,
): Promise<CaseStudy | undefined> {
  const study = await sanityFetch<CaseStudy | null>({
    query: `*[_type == "caseStudy" && slug.current == $slug][0] {
      "slug": slug.current,
      client,
      "image": ${imageUrl()},
      "gallery": gallery[].asset->url,
      "industry": ${loc("industry")},
      "scope": ${loc("scope")},
      "intro": ${locOptional("intro")},
      "challenge": ${locOptional("challenge")},
      "approach": ${locOptional("approach")},
      "highlights": ${locList("highlights")},
      "outcome": ${loc("outcome")},
      "statValue": coalesce(statValue, ""),
      "statLabel": ${loc("statLabel")},
      "tags": ${locList("tags")},
      "solutionGroup": solutionGroup->{
        "slug": slug.current,
        "label": ${loc("label")}
      }
    }`,
    params: { locale, slug },
    tags: ["caseStudy"],
  });
  return study ?? undefined;
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  const rows = await sanityFetch<{ slug: string }[]>({
    query: `*[_type == "caseStudy"] | order(order asc) { "slug": slug.current }`,
    tags: ["caseStudy"],
  });
  return rows.map((row) => row.slug);
}

export async function getEvents(locale: Locale): Promise<EventItem[]> {
  return sanityFetch<EventItem[]>({
    query: `*[_type == "eventItem"] | order(order asc) {
      "src": ${imageUrl()},
      "title": ${loc("title")},
      "subtitle": ${locOptional("subtitle")},
      date,
      featured,
      variant
    }`,
    params: { locale },
    tags: ["eventItem"],
  });
}

export async function getClientLogos(): Promise<string[]> {
  const logos = await sanityFetch<{ image: string }[]>({
    query: `*[_type == "clientLogo"] | order(order asc) { "image": ${imageUrl("image")} }`,
    tags: ["clientLogo"],
  });
  return logos.map((logo) => logo.image);
}
