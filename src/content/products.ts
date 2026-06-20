export type Product = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  description: string;
  image: string;
};

export const productCategories: Record<
  string,
  { label: string; description: string }
> = {
  "piping-and-fitting": {
    label: "Piping and Fitting",
    description:
      "Stainless steel piping, fittings, and hygienic connections for process lines.",
  },
  valves: {
    label: "Valves",
    description:
      "Sanitary valves for flow control in pharmaceutical and food-grade systems.",
  },
  instruments: {
    label: "Instruments",
    description:
      "Process instrumentation for monitoring pressure, flow, and quality.",
  },
  pumps: {
    label: "Pumps",
    description:
      "Centrifugal and positive-displacement pumps for hygienic applications.",
  },
  "uv-units": {
    label: "UV Units",
    description: "UV sterilization units for purified water and WFI systems.",
  },
  filters: {
    label: "Filters",
    description:
      "Filtration housings and cartridges for process and utility streams.",
  },
  "stainless-steel-tanks": {
    label: "Stainless Steel Tanks",
    description:
      "Jacketed and storage tanks engineered for validated production.",
  },
  "hygienic-drains": {
    label: "Hygienic Drain Works",
    description:
      "Floor drains and drainage systems meeting hygienic design standards.",
  },
};

export const products: Product[] = [
  {
    slug: "automatic-orbital-welding",
    title: "Automatic Orbital welding",
    category: "piping-and-fitting",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1724113383.jpg",
  },
  {
    slug: "sanitary-centrifugal-self-priming-pump",
    title: "Sanitary Centrifugal Self-Priming Pump",
    category: "valves",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725277641.webp",
  },
  {
    slug: "sanitary-non-self-priming-pump",
    title: "Sanitary Non-Self Priming Pump",
    category: "instruments",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725277634.jpg",
  },
  {
    slug: "hygienic-uv-unit",
    title: "Hygienic UV Unit",
    category: "pumps",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725239313.jpeg",
  },
  {
    slug: "sanitary-vent-filter-housing",
    title: "Sanitary Vent Filter Housing",
    category: "uv-units",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725239365.jpg",
  },
  {
    slug: "reverse-osmosis-double-pass-station",
    title: "Reverse Osmosis (RO) double pass station",
    category: "filters",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725277406.webp",
  },
  {
    slug: "super-heated-water-sanitization",
    title: "Super-Heated Water Sanitization",
    category: "stainless-steel-tanks",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725277497.webp",
  },
  {
    slug: "sanitary-drain",
    title: "Sanitary Drain",
    category: "hygienic-drains",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725238681.webp",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category?: string) {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function getQuoteUrl(item?: string) {
  const base = "/contact";
  if (!item) return base;
  return `${base}?item=${encodeURIComponent(item)}`;
}
