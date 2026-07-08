import "server-only";

import type { Locale } from "@/i18n/routing";
import { sanityFetch } from "@/lib/cms/fetch";
import { imageUrl, loc, locList, locOptional } from "@/lib/cms/fragments";
import type { BlogPost } from "@/lib/cms/types";

const postProjection = `{
  "slug": slug.current,
  "title": ${loc("title")},
  "excerpt": ${loc("excerpt")},
  "date": coalesce(date, ""),
  "image": ${imageUrl()},
  "category": ${loc("category")},
  "readTime": coalesce(readTime, 0),
  "body": ${locList("body")},
  "author": authorRef->{
    "name": coalesce(name, ""),
    "role": ${locOptional("role")},
    "image": ${imageUrl("image")},
    "bio": ${locOptional("bio")}
  }
}`;

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>({
    query: `*[_type == "blogPost"] | order(order asc) ${postProjection}`,
    params: { locale },
    tags: ["blogPost"],
  });
}

export async function getBlogPost(
  slug: string,
  locale: Locale,
): Promise<BlogPost | undefined> {
  const post = await sanityFetch<BlogPost | null>({
    query: `*[_type == "blogPost" && slug.current == $slug][0] ${postProjection}`,
    params: { locale, slug },
    tags: ["blogPost"],
  });
  return post ?? undefined;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const rows = await sanityFetch<{ slug: string }[]>({
    query: `*[_type == "blogPost"] | order(order asc) { "slug": slug.current }`,
    tags: ["blogPost"],
  });
  return rows.map((row) => row.slug);
}
