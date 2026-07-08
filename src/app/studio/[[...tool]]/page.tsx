import type { Metadata, Viewport } from "next";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Midex CMS",
  robots: "noindex, nofollow",
};

export const viewport: Viewport = {
  themeColor: "#0E1A32",
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
