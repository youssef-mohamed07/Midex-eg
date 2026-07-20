import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms";
import { getSiteUrl } from "@/lib/seo/config";

const DEFAULT_DISALLOW = ["/api/", "/studio", "/studio/"];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = getSiteUrl();
  const settings = await getSiteSettings();
  const fromCms = settings?.robotsDisallow?.filter(Boolean) ?? [];
  const disallow = Array.from(
    new Set([...DEFAULT_DISALLOW, ...fromCms]),
  );

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
