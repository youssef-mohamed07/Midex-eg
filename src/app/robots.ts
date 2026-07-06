import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms";
import { getSiteUrl } from "@/lib/seo/config";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = getSiteUrl();
  const settings = await getSiteSettings();
  const disallow = settings?.robotsDisallow?.length
    ? settings.robotsDisallow
    : ["/api/"];

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
