import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms";
import { brandManifest } from "@/lib/branding/tokens";
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
    background_color: settings?.manifest.backgroundColor || brandManifest.backgroundColor,
    theme_color: settings?.manifest.themeColor || brandManifest.themeColor,
    icons: [
      {
        src: "/images/brand/favicon.png",
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
      {
        src: siteConfig.brandIcon,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
