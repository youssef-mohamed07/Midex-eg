import type { MetadataRoute } from "next";
import {
  getAllBlogSlugs,
  getAllCaseStudySlugs,
  getAllProductCategorySlugs,
  getAllProductSlugs,
  getSolutionGroups,
} from "@/lib/cms";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo/paths";

const staticPaths = [
  "/",
  "/about-us",
  "/contact",
  "/products",
  "/solutions",
  "/blog",
  "/case-studies",
];

function entry(path: string, locale: (typeof routing.locales)[number], priority = 0.7) {
  return {
    url: absoluteUrl(path, locale),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
    alternates: {
      languages: {
        ...Object.fromEntries(
          routing.locales.map((lang) => [lang, absoluteUrl(path, lang)]),
        ),
        "x-default": absoluteUrl(path, routing.defaultLocale),
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, categorySlugs, blogSlugs, caseStudySlugs, solutionGroups] = await Promise.all([
    getAllProductSlugs(),
    getAllProductCategorySlugs(),
    getAllBlogSlugs(),
    getAllCaseStudySlugs(),
    getSolutionGroups("en"),
  ]);

  const urls: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of routing.locales) {
      urls.push(entry(path, locale, path === "/" ? 1 : 0.8));
    }
  }

  for (const locale of routing.locales) {
    for (const slug of categorySlugs) {
      urls.push(entry(`/products/category/${slug}`, locale, 0.75));
    }

    for (const slug of productSlugs) {
      urls.push(entry(`/products/${slug}`, locale, 0.7));
    }

    for (const group of solutionGroups) {
      urls.push(entry(`/solutions/group/${group.slug}`, locale, 0.75));
      for (const child of group.children) {
        urls.push(entry(`/solutions/group/${group.slug}/${child.slug}`, locale, 0.65));
      }
    }

    for (const slug of blogSlugs) {
      urls.push(entry(`/blog/${slug}`, locale, 0.6));
    }

    for (const slug of caseStudySlugs) {
      urls.push(entry(`/case-studies/${slug}`, locale, 0.6));
    }
  }

  return urls;
}
