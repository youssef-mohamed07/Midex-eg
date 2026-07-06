import "server-only";

import type { Locale } from "@/i18n/routing";
import { sanityFetch } from "@/lib/cms/fetch";
import { imageUrl, loc, locList, locOptional } from "@/lib/cms/fragments";
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
    "backgroundColor": coalesce(manifestBackgroundColor, "#062a42"),
    "themeColor": coalesce(manifestThemeColor, "#093d5e")
  },
  "robotsDisallow": coalesce(robotsDisallow, ["/api/"])
}`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });
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
  return (
    settings?.contact ?? {
      email: "",
      phones: [],
      address: "",
      mapsUrl: "",
      mapsEmbedUrl: "",
    }
  );
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

export async function getHeroSlideImages(): Promise<string[]> {
  const result = await sanityFetch<{ slides: string[] } | null>({
    query: `*[_type == "homePage"][0]{
      "slides": coalesce(heroSlides[].image.asset->url, [])
    }`,
    tags: ["homePage"],
  });
  return result?.slides ?? [];
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
      "image": ${imageUrl("image")}
    }`,
    tags: ["partner"],
  });
}

export async function getCertificates(locale: Locale): Promise<Certificate[]> {
  return sanityFetch<Certificate[]>({
    query: `*[_type == "certificate"] | order(order asc) {
      "slug": slug.current,
      "image": ${imageUrl()},
      "alt": ${loc("image.alt")}
    }`,
    params: { locale },
    tags: ["certificate"],
  });
}

export async function getStats(): Promise<Stat[]> {
  return sanityFetch<Stat[]>({
    query: `*[_type == "stat"] | order(order asc) { value, labelKey, suffix }`,
    tags: ["stat"],
  });
}

export async function getAboutMilestones(): Promise<Milestone[]> {
  return sanityFetch<Milestone[]>({
    query: `*[_type == "milestone"] | order(order asc) { value, labelKey, suffix }`,
    tags: ["milestone"],
  });
}

export async function getAboutFounders(): Promise<Founder[]> {
  return sanityFetch<Founder[]>({
    query: `*[_type == "founder"] | order(order asc) {
      "id": key,
      "image": ${imageUrl()},
      nameKey,
      roleKey,
      bioKey
    }`,
    tags: ["founder"],
  });
}

export async function getAboutStandards(): Promise<string[]> {
  const result = await sanityFetch<{ standards: string[] } | null>({
    query: `*[_type == "aboutPage"][0]{ "standards": coalesce(standards, []) }`,
    tags: ["aboutPage"],
  });
  return result?.standards ?? [];
}

export async function getCompanyValues(locale: Locale): Promise<CompanyValue[]> {
  const result = await sanityFetch<{ values: CompanyValue[] } | null>({
    query: `*[_type == "aboutPage"][0]{
      "values": coalesce(values[]{
        "id": key,
        "image": ${imageUrl("image")},
        "alt": ${loc("image.alt")}
      }, [])
    }`,
    params: { locale },
    tags: ["aboutPage"],
  });
  return result?.values ?? [];
}

export async function getTestimonials(locale: Locale): Promise<Testimonial[]> {
  return sanityFetch<Testimonial[]>({
    query: `*[_type == "testimonial"] | order(order asc) {
      name,
      "role": ${loc("role")},
      "quote": ${loc("quote")}
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
      "industry": ${loc("industry")},
      "scope": ${loc("scope")},
      "outcome": ${loc("outcome")},
      "statValue": coalesce(statValue, ""),
      "statLabel": ${loc("statLabel")},
      "tags": ${locList("tags")}
    }`,
    params: { locale },
    tags: ["caseStudy"],
  });
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
