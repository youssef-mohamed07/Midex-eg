import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.legalName,
    short_name: siteConfig.name,
    description:
      "Validated purified water, WFI, and hygienic process engineering for pharmaceutical, food, and cosmetics industries.",
    start_url: "/",
    display: "standalone",
    background_color: "#062a42",
    theme_color: "#093d5e",
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
