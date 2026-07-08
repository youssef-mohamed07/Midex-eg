import "server-only";

import { buildSolutionGroupNav } from "@/components/solutions/solution-group-cards";
import type { Locale } from "@/i18n/routing";
import { brandManifest } from "@/lib/branding/tokens";
import { sanityFetch } from "@/lib/cms/fetch";
import { imageUrl, loc, locOptional } from "@/lib/cms/fragments";
import type {
  Product,
  ProductCategoryInfo,
  SiteContact,
  SiteSettings,
} from "@/lib/cms/types";

type LayoutShellRaw = {
  settings: SiteSettings | null;
  logos: { logoWhite: string; logoDark: string } | null;
  featuredImage: string;
  productCategories: Array<{
    slug: string;
    label: string;
    description: string;
  }>;
  products: Array<{
    slug: string;
    category: string;
    image: string;
  }>;
  solutionGroups: Array<{
    slug: string;
    label: string;
    menuLabel?: string;
    description: string;
    image: string;
    children: Array<{ slug: string; label: string }>;
  }>;
};

export type LayoutShellData = {
  settings: SiteSettings | null;
  featuredImage: string;
  logos: { logoWhite: string; logoDark: string };
  productCategories: Record<string, ProductCategoryInfo>;
  products: Pick<Product, "slug" | "category" | "image">[];
  solutionGroupsNav: ReturnType<typeof buildSolutionGroupNav>;
  siteContact: SiteContact;
};

const siteSettingsProjection = `{
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

const logosProjection = `{
  "logoWhite": ${imageUrl("logoWhite")},
  "logoDark": ${imageUrl("logoDark")}
}`;

/** One round-trip for header, footer, and floating social button. */
export async function getLayoutShellData(locale: Locale): Promise<LayoutShellData> {
  const raw = await sanityFetch<LayoutShellRaw>({
    query: `{
      "settings": *[_type == "siteSettings"][0] ${siteSettingsProjection},
      "logos": *[_type == "siteSettings"][0] ${logosProjection},
      "featuredImage": *[_type == "homePage"][0]{ "url": ${imageUrl("featuredNavImage")} }.url,
      "productCategories": *[_type == "productCategory"] | order(order asc) {
        "slug": slug.current,
        "label": ${loc("label")},
        "description": ${loc("description")}
      },
      "products": *[_type == "product"] | order(order asc) {
        "slug": slug.current,
        "category": category->slug.current,
        "image": ${imageUrl("image")}
      },
      "solutionGroups": *[_type == "solutionGroup"] | order(order asc) {
        "slug": slug.current,
        "label": ${loc("label")},
        "menuLabel": ${locOptional("menuLabel")},
        "description": ${loc("description")},
        "image": ${imageUrl("image")},
        "children": *[_type == "solutionChild" && group._ref == ^._id] | order(order asc) {
          "slug": slug.current,
          "label": ${loc("label")}
        }
      }
    }`,
    params: { locale },
    tags: [
      "siteSettings",
      "homePage",
      "product",
      "productCategory",
      "solutionGroup",
      "solutionChild",
    ],
  });

  const settings = raw.settings;
  const logos = {
    logoWhite: raw.logos?.logoWhite || "/images/brand/logo-white.png",
    logoDark: raw.logos?.logoDark || "/images/brand/logo-dark.png",
  };

  const productCategories = Object.fromEntries(
    raw.productCategories.map((category) => [
      category.slug,
      { label: category.label, description: category.description },
    ]),
  );

  const solutionGroupsNav = buildSolutionGroupNav(
    raw.solutionGroups.map((group) => ({
      slug: group.slug,
      label: group.label,
      menuLabel: group.menuLabel,
      description: group.description,
      intro: "",
      image: group.image,
      children: group.children.map((child) => ({
        slug: child.slug,
        label: child.label,
        excerpt: "",
        intro: "",
        image: "",
      })),
    })),
  );

  return {
    settings,
    featuredImage: raw.featuredImage || "/images/hero/slide-1.png",
    logos,
    productCategories,
    products: raw.products,
    solutionGroupsNav,
    siteContact:
      settings?.contact ?? {
        email: "",
        phones: [],
        address: "",
        mapsUrl: "",
        mapsEmbedUrl: "",
      },
  };
}
