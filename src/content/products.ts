export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  description: string;
  image: string;
  gallery?: string[];
};

export const categoryHighlights: Record<string, string[]> = {
  "piping-and-fitting": [
    "ASME BPE-compatible hygienic connections",
    "316L stainless steel with full material traceability",
    "Orbital and manual weld documentation available",
    "Suitable for PW, WFI, and utility distribution loops",
  ],
  valves: [
    "Sanitary design with drainable body geometry",
    "FDA-compliant elastomers and diaphragm options",
    "Manual or automated actuation configurations",
    "Validated for pharmaceutical and food-grade service",
  ],
  instruments: [
    "Hygienic process connections (tri-clamp, SMS, DIN)",
    "Calibration certificates and IQ/OQ support",
    "Suitable for PW, WFI, and CIP monitoring points",
    "Integration with DCS/PLC and data integrity requirements",
  ],
  pumps: [
    "316L wetted parts with electropolished surfaces",
    "CIP/SIP compatible hygienic pump design",
    "Self-priming and non-self-priming configurations",
    "Documentation packages for GMP qualification",
  ],
  "uv-units": [
    "Validated UV dose for microbial control",
    "Suitable for PW and WFI loop sanitization",
    "316L housing with hygienic connections",
    "Lamp life monitoring and alarm outputs",
  ],
  filters: [
    "Sanitary housings for cartridge and capsule filters",
    "Drainable design with minimal dead legs",
    "Multiple micron ratings and media options",
    "Suitable for utility and process filtration streams",
  ],
  "stainless-steel-tanks": [
    "Jacketed and non-jacketed storage configurations",
    "Internal surface finishes per ASME BPE guidelines",
    "Spray ball coverage and CIP integration",
    "Level, temperature, and pressure instrumentation ports",
  ],
  "hygienic-drains": [
    "EHEDG-aligned hygienic floor drain design",
    "Fully drainable with no stagnant zones",
    "304/316L construction with grating options",
    "Suitable for classified and wash-down areas",
  ],
};

export const categorySpecs: Record<string, ProductSpec[]> = {
  "piping-and-fitting": [
    { label: "Material", value: "316L stainless steel" },
    { label: "Finish", value: "Electropolished / mechanical polish" },
    { label: "Standards", value: "ASME BPE, GMP-aligned" },
    { label: "Documentation", value: "MTRs, weld maps, FAT records" },
  ],
  valves: [
    { label: "Material", value: "316L body / sanitary elastomers" },
    { label: "Connections", value: "Tri-clamp, weld, SMS" },
    { label: "Actuation", value: "Manual, pneumatic, automated" },
    { label: "Documentation", value: "Material certs, test records" },
  ],
  instruments: [
    { label: "Material", value: "316L wetted parts" },
    { label: "Output", value: "4–20 mA, digital, switch" },
    { label: "Calibration", value: "Factory and site calibration" },
    { label: "Documentation", value: "Calibration certificates" },
  ],
  pumps: [
    { label: "Material", value: "316L wetted components" },
    { label: "Design", value: "Sanitary centrifugal / PD" },
    { label: "Surface", value: "Ra ≤ 0.8 µm (electropolished)" },
    { label: "Documentation", value: "Performance curves, FAT" },
  ],
  "uv-units": [
    { label: "Material", value: "316L housing" },
    { label: "Control", value: "UV intensity monitoring" },
    { label: "Application", value: "PW / WFI loop sanitization" },
    { label: "Documentation", value: "Validation support data" },
  ],
  filters: [
    { label: "Material", value: "316L sanitary housing" },
    { label: "Ratings", value: "Multiple micron / media options" },
    { label: "Design", value: "Drainable, minimal hold-up" },
    { label: "Documentation", value: "Material and pressure certs" },
  ],
  "stainless-steel-tanks": [
    { label: "Material", value: "304L / 316L stainless steel" },
    { label: "Jacket", value: "Optional dimple or coil jacket" },
    { label: "Finish", value: "Internal Ra per ASME BPE" },
    { label: "Documentation", value: "As-built drawings, FAT/SAT" },
  ],
  "hygienic-drains": [
    { label: "Material", value: "304L / 316L stainless steel" },
    { label: "Design", value: "EHEDG hygienic geometry" },
    { label: "Load class", value: "Light to heavy-duty grating" },
    { label: "Documentation", value: "Installation and slope records" },
  ],
};

export function getProductCategoryDetails(category: string) {
  return {
    highlights: categoryHighlights[category] ?? [],
    specs: categorySpecs[category] ?? [],
  };
}

export function getProductImages(product: Pick<Product, "image" | "gallery">): string[] {
  if (product.gallery?.length) return product.gallery;
  return [product.image];
}

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
    gallery: [
      "/images/products/product-1724113383.jpg",
      "/images/services/orbital-welding.png",
      "/images/services/welding-docs.png",
      "/images/services/mechanical-polishing.png",
    ],
  },
  {
    slug: "sanitary-centrifugal-self-priming-pump",
    title: "Sanitary Centrifugal Self-Priming Pump",
    category: "valves",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725277641.webp",
    gallery: [
      "/images/products/product-1725277641.webp",
      "/images/services/spray-ball.png",
      "/images/services/passivation-test.png",
      "/images/services/roughness-test.png",
    ],
  },
  {
    slug: "sanitary-non-self-priming-pump",
    title: "Sanitary Non-Self Priming Pump",
    category: "instruments",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725277634.jpg",
    gallery: [
      "/images/products/product-1725277634.jpg",
      "/images/services/bore-scoping.png",
      "/images/services/mirror-finish.png",
      "/images/services/mechanical-polishing.png",
    ],
  },
  {
    slug: "hygienic-uv-unit",
    title: "Hygienic UV Unit",
    category: "pumps",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725239313.jpeg",
    gallery: [
      "/images/products/product-1725239313.jpeg",
      "/images/products/product-1725239365.jpg",
      "/images/services/spray-ball.png",
      "/images/services/passivation-test.png",
    ],
  },
  {
    slug: "sanitary-vent-filter-housing",
    title: "Sanitary Vent Filter Housing",
    category: "uv-units",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725239365.jpg",
    gallery: [
      "/images/products/product-1725239365.jpg",
      "/images/products/product-1725277406.webp",
      "/images/services/pickling-passivation.png",
      "/images/services/roughness-test.png",
    ],
  },
  {
    slug: "reverse-osmosis-double-pass-station",
    title: "Reverse Osmosis (RO) double pass station",
    category: "filters",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725277406.webp",
    gallery: [
      "/images/products/product-1725277406.webp",
      "/images/products/product-1725277497.webp",
      "/images/services/bore-scoping.png",
      "/images/services/spray-ball.png",
    ],
  },
  {
    slug: "super-heated-water-sanitization",
    title: "Super-Heated Water Sanitization",
    category: "stainless-steel-tanks",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725277497.webp",
    gallery: [
      "/images/products/product-1725277497.webp",
      "/images/products/product-1725239313.jpeg",
      "/images/services/spray-ball.png",
      "/images/services/passivation-test.png",
    ],
  },
  {
    slug: "sanitary-drain",
    title: "Sanitary Drain",
    category: "hygienic-drains",
    excerpt: "Engineered for reliability in demanding process environments.",
    description:
      "High-quality component engineered for hygienic process applications. Contact us for specifications and availability.",
    image: "/images/products/product-1725238681.webp",
    gallery: [
      "/images/products/product-1725238681.webp",
      "/images/services/mirror-finish.png",
      "/images/services/mechanical-polishing.png",
      "/images/services/pickling-passivation.png",
    ],
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
