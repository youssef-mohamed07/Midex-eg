import type { Locale } from "@/i18n/routing";
import type { ProductCategoryPage } from "@/lib/cms/types";

export const EXCLUSIVE_BRAND_CATEGORY_SLUGS = [
  "sing-tao",
  "truvia",
  "eternal-water",
] as const;

export type ExclusiveBrandCategorySlug =
  (typeof EXCLUSIVE_BRAND_CATEGORY_SLUGS)[number];

type BrandCopy = {
  label: string;
  description: string;
  image: string;
};

const BRAND_COPY: Record<
  ExclusiveBrandCategorySlug,
  Record<Locale, BrandCopy>
> = {
  "sing-tao": {
    en: {
      label: "Sing-Tao",
      description: "Products from Sing-Tao, exclusively represented by MIDEX.",
      image: "/images/exclusive/sing-tao.png",
    },
    ar: {
      label: "سينغ-تاو",
      description: "منتجات سينغ-تاو، بتمثيل حصري من ميدكس.",
      image: "/images/exclusive/sing-tao.png",
    },
    de: {
      label: "Sing-Tao",
      description: "Produkte von Sing-Tao, exklusiv vertreten durch MIDEX.",
      image: "/images/exclusive/sing-tao.png",
    },
  },
  truvia: {
    en: {
      label: "Truvia",
      description: "Products from Truvia, exclusively represented by MIDEX.",
      image: "/images/exclusive/truvia.png",
    },
    ar: {
      label: "تروفيا",
      description: "منتجات تروفيا، بتمثيل حصري من ميدكس.",
      image: "/images/exclusive/truvia.png",
    },
    de: {
      label: "Truvia",
      description: "Produkte von Truvia, exklusiv vertreten durch MIDEX.",
      image: "/images/exclusive/truvia.png",
    },
  },
  "eternal-water": {
    en: {
      label: "Eternalwater",
      description: "Products from Eternalwater, exclusively represented by MIDEX.",
      image: "/images/exclusive/eternal-water.png",
    },
    ar: {
      label: "إيترنال ووتر",
      description: "منتجات إيترنال ووتر، بتمثيل حصري من ميدكس.",
      image: "/images/exclusive/eternal-water.png",
    },
    de: {
      label: "Eternalwater",
      description: "Produkte von Eternalwater, exklusiv vertreten durch MIDEX.",
      image: "/images/exclusive/eternal-water.png",
    },
  },
};

export function isExclusiveBrandCategory(
  slug: string,
): slug is ExclusiveBrandCategorySlug {
  return (EXCLUSIVE_BRAND_CATEGORY_SLUGS as readonly string[]).includes(slug);
}

export function getExclusiveBrandCategory(
  slug: string,
  locale: Locale,
): ProductCategoryPage | undefined {
  if (!isExclusiveBrandCategory(slug)) return undefined;
  return BRAND_COPY[slug][locale];
}
