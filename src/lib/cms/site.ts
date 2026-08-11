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
    "facebook": facebook,
    "youtube": youtube,
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
  return result?.image || "/images/hero/slide-1.webp";
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

const FOUNDER_IMAGES = {
  abdelrahman: "/images/about/founders/abdelrahman.webp",
  mohamed: "/images/about/founders/mohamed.webp",
} as const;

export async function getAboutFounders(locale: Locale): Promise<Founder[]> {
  let founders: Founder[] = [];
  try {
    founders = await sanityFetch<Founder[]>({
      query: `*[_type == "founder"] | order(order asc) {
        "id": key,
        "image": ${imageUrl()},
        nameKey,
        roleKey,
        bioKey,
        "quoteKey": coalesce(quoteKey, "quoteKey_fallback"),
        "name": coalesce(name[$locale], name.en, name),
        "role": coalesce(role[$locale], role.en, role),
        "bio": coalesce(bio[$locale], bio.en, bio),
        "quote": coalesce(quote[$locale], quote.en, quote)
      }`,
      params: { locale },
      tags: ["founder"],
    });
  } catch (error) {
    console.warn("[founders] Sanity unavailable — using local portraits", error);
  }

  const abdelrahman = founders.find(
    (f) =>
      f.nameKey === "founder2Name" ||
      f.id === "abdelrahman-fouad" ||
      f.id?.includes("abdelrahman"),
  );
  const mohamed = founders.find(
    (f) =>
      f.nameKey === "founder1Name" ||
      f.id === "mohamed-samir" ||
      f.id?.includes("mohamed"),
  );

  // Always Abdelrahman left / Mohamed right with local portraits (ignore Sanity assets).
  return [
    {
      id: abdelrahman?.id ?? "abdelrahman-fouad",
      nameKey: "founder2Name",
      roleKey: abdelrahman?.roleKey ?? "founder2Role",
      bioKey: abdelrahman?.bioKey ?? "founder2Bio",
      quoteKey: "founder2Quote",
      name: abdelrahman?.name,
      role: abdelrahman?.role,
      bio: abdelrahman?.bio,
      quote: abdelrahman?.quote,
      image: FOUNDER_IMAGES.abdelrahman,
    },
    {
      id: mohamed?.id ?? "mohamed-samir",
      nameKey: "founder1Name",
      roleKey: mohamed?.roleKey ?? "founder1Role",
      bioKey: mohamed?.bioKey ?? "founder1Bio",
      quoteKey: "founder1Quote",
      name: mohamed?.name,
      role: mohamed?.role,
      bio: mohamed?.bio,
      quote: mohamed?.quote,
      image: FOUNDER_IMAGES.mohamed,
    },
  ];
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
  const caseStudies = await sanityFetch<CaseStudy[]>({
    query: `*[_type == "caseStudy"] | order(order asc) {
      "slug": slug.current,
      client,
      "image": ${imageUrl()},
      "gallery": gallery[]{"url": coalesce(asset->url, sourcePath)}[].url,
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

  // HOTFIX: Sanity API mutations are blocked by policy (403), so we filter out 
  // the old duplicated "Cons Korra" case studies and inject the consolidated one locally.
  const filtered = caseStudies.filter((cs) => cs.client !== "Cons Korra");

  const korraImage = caseStudies.find((cs) => cs.client === "Cons Korra")?.image ?? "";

  const korraConsolidated: CaseStudy = {
    slug: "cons-korra-portfolio",
    client: "Cons Korra",
    image: korraImage,
    industry: locale === "ar" ? "الصيدلانية" : locale === "de" ? "Pharmazeutisch" : "Pharmaceutical",
    scope: locale === "ar" 
      ? "شراكة مستمرة كمقاول من الباطن ضمن نطاق المقاولات العامة، تمتد عبر عدة منشآت من بينها VBC ومصر للمستحضرات ومينا فارم — وتشمل شبكات أنابيب من الستانلس ستيل، وحلقات مياه منقاة ومياه حقن، وشبكات هواء مضغوط وغازات نظيفة، وتطوير محطات المياه وتوريد قطع الغيار."
      : locale === "de"
      ? "Laufende Generalunternehmer-Partnerschaft für mehrere Anlagen, darunter VBC, Misr Company For Pharmaceuticals und Mina Pharm - einschließlich Edelstahl-Rohrleitungsnetze, gereinigtes Wasser und WFI-Kreisläufe, Druckluft- und Reingasnetze sowie Modernisierung von Wasserstationen und Ersatzteillieferung."
      : "Ongoing general-contracting partnership spanning multiple facilities, including VBC, Misr Company For Pharmaceuticals, and Mina Pharm — covering stainless-steel piping networks, purified water and WFI loops, compressed air and clean gases networks, and water station upgrades and spare parts supply.",
    intro: locale === "ar"
      ? "Cons Korra مقاول عام تتعاون معه ميدكس عبر عدة منشآت صيدلانية — من بينها VBC، ومصر للمستحضرات (Misr Company For Pharmaceuticals)، ومينا فارم — حيث تقدّم ميدكس أنابيب صحية وشبكات مرافق وأنظمة مياه منقاة مصممة خصيصًا لكل موقع."
      : locale === "de"
      ? "Cons Korra ist ein Generalunternehmer, mit dem MIDEX in verschiedenen pharmazeutischen Anlagen - darunter VBC, Misr Company For Pharmaceuticals und Mina Pharm - zusammengearbeitet hat, um hygienische Rohrleitungen, Versorgungsnetze und Systeme für gereinigtes Wasser maßgeschneidert für jeden Standort zu liefern."
      : "Cons Korra is a general contractor MIDEX has partnered with across multiple pharmaceutical facilities — including VBC, Misr Company For Pharmaceuticals, and Mina Pharm — delivering hygienic piping, utility networks, and purified water systems tailored to each site.",
    challenge: locale === "ar"
      ? "بصفتها المقاول العام لمشاريع صيدلانية كبرى، احتاجت Cons Korra إلى مقاول من الباطن متخصص في الهندسة الصحية، قادر على تقديم أنظمة متوافقة ومتسقة عبر محفظة من منشآت العملاء المختلفة — لكل منها تخطيطها وجدولها الزمني ومتطلباتها الفنية الخاصة."
      : locale === "de"
      ? "Als Generalunternehmer für große Pharmabauten benötigte Cons Korra einen spezialisierten Subunternehmer für Hygiene-Engineering, der in der Lage ist, konsistente, konforme Systeme für ein Portfolio verschiedener Endkundenanlagen zu liefern - jede mit ihrem eigenen Layout, Zeitplan und technischen Anforderungen."
      : "As general contractor on large pharmaceutical builds, Cons Korra needed a specialized hygienic-engineering subcontractor capable of delivering consistent, compliant systems across a portfolio of different end-client facilities — each with its own layout, timeline, and technical requirements.",
    approach: locale === "ar"
      ? "تعمل ميدكس كشريك هندسي صحي لـCons Korra مشروعًا بمشروع، وتُكيّف تصميمات أنابيب الستانلس ستيل وأنظمة المياه وشبكات المرافق مع كل منشأة، مع الالتزام بنفس معايير GMP في كل تركيب."
      : locale === "de"
      ? "MIDEX arbeitet als Cons Korras Partner für hygienisches Engineering Projekt für Projekt und passt die Designs für Edelstahlrohrleitungen, Wassersysteme und Versorgungsnetze an jede Anlage an, wobei jede Installation an den gleichen GMP-ausgerichteten Standard gehalten wird."
      : "MIDEX works as Cons Korra's hygienic engineering partner project by project, adapting stainless-steel piping, water systems, and utility network designs to each facility while holding every installation to the same GMP-aligned standard.",
    highlights: locale === "ar"
      ? [
          "شبكات أنابيب من الستانلس ستيل عبر عدة منشآت",
          "تركيب حلقات مياه منقاة (PW) ومياه حقن (WFI)",
          "شبكات هواء مضغوط وغازات نظيفة",
          "تطوير محطات المياه وتعديلاتها وتوريد قطع الغيار"
        ]
      : locale === "de"
      ? [
          "Edelstahl-Rohrleitungsnetze in mehreren Anlagen",
          "Installationen von gereinigtem Wasser (PW) und WFI-Kreisläufen",
          "Druckluft- und Reingasnetze",
          "Modernisierung und Anpassung von Wasserstationen sowie Ersatzteillieferung"
        ]
      : [
          "Stainless-steel piping networks across multiple facilities",
          "Purified water (PW) and WFI loop installations",
          "Compressed air and clean gases networks",
          "Water station upgrades, modifications, and spare parts supply"
        ],
    outcome: locale === "ar"
      ? "تواصل Cons Korra الاعتماد على ميدكس كمقاول الهندسة الصحية المفضّل لديها عبر محفظة مشاريعها الصيدلانية، بمعيار امتثال ثابت من موقع لآخر."
      : locale === "de"
      ? "Cons Korra verlässt sich weiterhin auf MIDEX als Subunternehmer für Hygiene-Engineering für sein gesamtes Portfolio an Pharmaprojekten, mit einem konsistenten Compliance-Standard von Standort zu Standort."
      : "Cons Korra continues to rely on MIDEX as its go-to hygienic engineering subcontractor across its portfolio of pharmaceutical projects, with a consistent standard of compliance delivered site to site.",
    statValue: "",
    statLabel: "",
    tags: locale === "ar" ? ["الفولاذ المقاوم للصدأ", "الأنظمة"] : locale === "de" ? ["Edelstahl", "Systeme"] : ["Stainless Steel", "Systems"],
  };

  return [korraConsolidated, ...filtered];
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
      "gallery": gallery[]{"url": coalesce(asset->url, sourcePath)}[].url,
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
