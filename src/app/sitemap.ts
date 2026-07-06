import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/site";
import { products } from "@/content/products";
import { orderSolutionGroups, solutionGroups } from "@/content/solutions";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo/paths";

const staticPaths = [
  "/",
  "/about-us",
  "/contact",
  "/products",
  "/solutions",
  "/blog",
];

function entry(path: string, locale: (typeof routing.locales)[number], priority = 0.7) {
  return {
    url: absoluteUrl(path, locale),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((lang) => [lang, absoluteUrl(path, lang)]),
      ),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of routing.locales) {
      urls.push(entry(path, locale, path === "/" ? 1 : 0.8));
    }
  }

  for (const locale of routing.locales) {
    for (const product of products) {
      urls.push(entry(`/products/${product.slug}`, locale, 0.7));
    }

    for (const group of orderSolutionGroups(solutionGroups)) {
      urls.push(entry(`/solutions/group/${group.slug}`, locale, 0.75));
      for (const child of group.children) {
        urls.push(entry(`/solutions/group/${group.slug}/${child.slug}`, locale, 0.65));
      }
    }

    for (const post of blogPosts) {
      urls.push(entry(`/blog/${post.slug}`, locale, 0.6));
    }
  }

  return urls;
}
