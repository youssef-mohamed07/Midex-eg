import "server-only";

import {
  buildSolutionGroupCards,
} from "@/components/solutions/solution-group-cards";
import type { HomeSolutionCard } from "@/components/home/HomeSolutionsAccordion";
import type { Locale } from "@/i18n/routing";
import { sanityFetch } from "@/lib/cms/fetch";
import { imageUrl, loc, locList, locOptional } from "@/lib/cms/fragments";
import type {
  CaseStudy,
  EventItem,
  HeroCollage,
  Partner,
  Product,
  ProductCategoryInfo,
  Service,
  Stat,
  Testimonial,
} from "@/lib/cms/types";

export type HomePageData = {
  services: Service[];
  stats: Stat[];
  heroCollage: HeroCollage;
  events: EventItem[];
  partners: Partner[];
  exclusivePartners: Partner[];
  caseStudies: CaseStudy[];
  clientLogos: string[];
  testimonials: Testimonial[];
  solutionCards: HomeSolutionCard[];
  productCategories: Record<string, ProductCategoryInfo>;
  productCategoryOrder: string[];
  products: Product[];
};

type RawHomePageData = {
  services: Service[];
  stats: Stat[];
  heroCollage: HeroCollage;
  events: EventItem[];
  partners: Partner[];
  exclusivePartners: Partner[];
  caseStudies: CaseStudy[];
  clientLogos: string[];
  testimonials: Testimonial[];
  solutionGroups: Array<{
    slug: string;
    label: string;
    description: string;
    image: string;
    children: Array<{
      slug: string;
      label: string;
      excerpt: string;
      intro: string;
      image: string;
    }>;
  }>;
  solutionHighlights: Array<{ slug: string; highlights: string[] }>;
  productCategories: Array<{ slug: string; label: string; description: string }>;
  products: Product[];
};

/** Single GROQ request for the entire homepage. */
export async function getHomePageData(locale: Locale): Promise<HomePageData> {
  const data = await sanityFetch<RawHomePageData>({
    query: `{
      "services": *[_type == "service"] | order(order asc) {
        "title": ${loc("title")},
        "excerpt": ${loc("excerpt")},
        "image": ${imageUrl("image")}
      },
      "stats": *[_type == "stat"] | order(order asc) {
        value,
        labelKey,
        "label": ${locOptional("label")},
        suffix
      },
      "heroCollage": *[_type == "homePage"][0]{
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
      },
      "events": *[_type == "eventItem"] | order(order asc) {
        "src": ${imageUrl("image")},
        "title": ${loc("title")},
        "subtitle": ${locOptional("subtitle")},
        date,
        featured,
        variant
      },
      "partners": *[_type == "partner" && kind == "partner"] | order(order asc) {
        name,
        "image": ${imageUrl("image")}
      },
      "exclusivePartners": *[_type == "partner" && kind == "exclusive"] | order(order asc) {
        name,
        "image": ${imageUrl("image")}
      },
      "caseStudies": *[_type == "caseStudy"] | order(order asc) {
        "slug": slug.current,
        client,
        "image": ${imageUrl("image")},
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
      },
      "clientLogos": *[_type == "clientLogo"] | order(order asc) {
        "image": ${imageUrl("image")}
      }[].image,
      "testimonials": *[_type == "testimonial"] | order(order asc) {
        "name": coalesce(name[$locale], name.en, name),
        "role": ${loc("role")},
        "quote": ${loc("quote")},
        "image": ${imageUrl("image")},
        "product": product->{
          "slug": slug.current,
          "title": ${loc("title")}
        }
      },
      "solutionGroups": *[_type == "solutionGroup"] | order(order asc) {
        "slug": slug.current,
        "label": ${loc("label")},
        "description": ${loc("description")},
        "image": ${imageUrl("image")},
        "children": *[_type == "solutionChild" && group._ref == ^._id] | order(order asc) {
          "slug": slug.current,
          "label": ${loc("label")},
          "excerpt": ${loc("excerpt")},
          "intro": ${loc("intro")},
          "image": ${imageUrl("image")}
        }
      },
      "solutionHighlights": *[_type == "solutionGroup"] | order(order asc) {
        "slug": slug.current,
        "highlights": ${locList("highlights")}
      },
      "productCategories": *[_type == "productCategory"] | order(order asc) {
        "slug": slug.current,
        "label": ${loc("label")},
        "description": ${loc("description")}
      },
      "products": *[_type == "product"] | order(order asc) {
        "slug": slug.current,
        "title": ${loc("title")},
        "category": category->slug.current,
        "excerpt": ${loc("excerpt")},
        "description": ${loc("description")},
        "image": ${imageUrl("image")},
        "gallery": gallery[].asset->url
      }
    }`,
    params: { locale },
    tags: [
      "service",
      "stat",
      "homePage",
      "eventItem",
      "partner",
      "caseStudy",
      "clientLogo",
      "testimonial",
      "solutionGroup",
      "solutionChild",
      "product",
      "productCategory",
    ],
  });

  const highlightsByGroup = Object.fromEntries(
    (data.solutionHighlights ?? []).map((row) => [row.slug, row.highlights]),
  );

  const solutionCards = buildSolutionGroupCards(
    (data.solutionGroups ?? []).map((group) => ({
      slug: group.slug,
      label: group.label,
      menuLabel: undefined,
      heroTitle: undefined,
      servicesSectionTitle: undefined,
      servicesSectionIntro: undefined,
      description: group.description,
      intro: "",
      image: group.image,
      children: group.children,
    })),
    highlightsByGroup,
  );

  const productCategoryRows = data.productCategories ?? [];
  const productCategories = Object.fromEntries(
    productCategoryRows.map(({ slug, label, description }) => [
      slug,
      { label, description },
    ]),
  ) as Record<string, ProductCategoryInfo>;
  const productCategoryOrder = productCategoryRows.map((row) => row.slug);

  return {
    services: data.services ?? [],
    stats: data.stats ?? [],
    heroCollage: data.heroCollage ?? { left: [], right: [], mobileImage: "" },
    events: data.events ?? [],
    partners: data.partners ?? [],
    exclusivePartners: data.exclusivePartners ?? [],
    caseStudies: data.caseStudies ?? [],
    clientLogos: data.clientLogos ?? [],
    testimonials: data.testimonials ?? [],
    solutionCards,
    productCategories,
    productCategoryOrder,
    products: data.products ?? [],
  };
}
