import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms";
import { siteConfig } from "@/lib/seo/config";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();

  return {
    name: settings?.legalName || siteConfig.legalName,
    short_name: settings?.name || siteConfig.name,
    description:
      settings?.manifest.description ||
      "Validated purified water, WFI, and hygienic process engineering for pharmaceutical, food, and cosmetics industries.",
    start_url: "/",
    display: "standalone",
    background_color: settings?.manifest.backgroundColor || "#062a42",
    theme_color: settings?.manifest.themeColor || "#093d5e",
    icons: [
      {
        src: siteConfig.brandIcon,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
