export type SolutionChild = {
  slug: string;
  label: string;
  excerpt: string;
  image: string;
};

export type SolutionGroup = {
  slug: string;
  label: string;
  menuLabel?: string;
  description: string;
  image: string;
  children: SolutionChild[];
};

export const solutionGroupHighlights: Record<string, string[]> = {
  systems: [
    "GMP-aligned system design",
    "Factory acceptance testing (FAT)",
    "IQ/OQ documentation packages",
    "Commissioning and handover support",
  ],
  solutions: [
    "Minimal disruption to production",
    "As-built documentation updates",
    "Validated change control",
    "Performance verification",
  ],
  welding: [
    "WPS / PQR qualification",
    "Visual and boroscope inspection",
    "Orbital and manual techniques",
    "Full weld traceability",
  ],
  installations: [
    "Turnkey site installation",
    "Hygienic slope and drainage design",
    "Pressure testing and flushing",
    "As-built isometric drawings",
  ],
};

export const solutionGroups: SolutionGroup[] = [
  {
    slug: "systems",
    label: "Systems",
    description:
      "Purified water, WFI, CIP/SIP, soft water, and distribution skids — designed, built, and validated to GMP standards.",
    image: "/images/services/spray-ball.png",
    children: [
      {
        slug: "soft-water-station",
        label: "Soft water station",
        excerpt: "Reliable softening and pretreatment for downstream purified water generation.",
        image: "/images/services/mechanical-polishing.png",
      },
      {
        slug: "cleaning-in-place-system",
        label: "Cleaning in Place system",
        excerpt: "Automated CIP skids with validated cycles and spray coverage verification.",
        image: "/images/services/spray-ball.png",
      },
      {
        slug: "sanitization-in-place-system",
        label: "Sanitization in place system",
        excerpt: "SIP systems for hygienic equipment sterilization with documented cycles.",
        image: "/images/services/passivation-test.png",
      },
      {
        slug: "purified-water-station",
        label: "Purified Water Station",
        excerpt: "RO/EDI purified water generation with monitoring and distribution readiness.",
        image: "/images/news/news-1725286541.webp",
      },
      {
        slug: "distribution-skids",
        label: "Distribution Skids",
        excerpt: "PW and WFI distribution loops with hygienic pumps, valves, and instrumentation.",
        image: "/images/services/bore-scoping.png",
      },
    ],
  },
  {
    slug: "solutions",
    label: "Solutions",
    menuLabel: "Modifications",
    description:
      "Upgrade and re-engineer existing PW, WFI, and distribution systems without disrupting validated production.",
    image: "/images/services/pickling-passivation.png",
    children: [
      {
        slug: "pw-station-modification",
        label: "Purified water station modification",
        excerpt: "Capacity upgrades and reconfiguration of existing PW generation trains.",
        image: "/images/news/news-1725287028.webp",
      },
      {
        slug: "distribution-skids-modification",
        label: "Distribution skids Modification",
        excerpt: "Loop expansion, pump upgrades, and point-of-use modifications.",
        image: "/images/services/roughness-test.png",
      },
      {
        slug: "loop-design-modification",
        label: "Loop Design Modification in PW/ WFI Systems",
        excerpt: "Hydraulic rebalancing and hygienic redesign of validated distribution loops.",
        image: "/images/services/mirror-finish.png",
      },
    ],
  },
  {
    slug: "welding",
    label: "Welding",
    description:
      "Manual and automatic orbital welding for hygienic piping with full WPS/PQR documentation and inspection.",
    image: "/images/services/orbital-welding.png",
    children: [
      {
        slug: "manual-welding",
        label: "Manual welding",
        excerpt: "Certified manual welders for hygienic stainless steel process piping.",
        image: "/images/services/welding-docs.png",
      },
      {
        slug: "automatic-orbital-welding",
        label: "Automatic Orbital welding",
        excerpt: "Repeatable orbital welds with full inspection and traceability records.",
        image: "/images/services/orbital-welding.png",
      },
    ],
  },
  {
    slug: "installations",
    label: "Installations",
    description:
      "Turnkey installation of purified loops, preparation lines, sanitary drains, and compressed air networks.",
    image: "/images/services/bore-scoping.png",
    children: [
      {
        slug: "purified-loop-system",
        label: "Purified loop system",
        excerpt: "Complete PW/WFI loop installation with supports, slopes, and testing.",
        image: "/images/services/bore-scoping.png",
      },
      {
        slug: "preparation-pipe-line",
        label: "Preparation pipe line",
        excerpt: "Process and preparation line piping for pharmaceutical production areas.",
        image: "/images/services/mirror-finish.png",
      },
      {
        slug: "sanitary-drain-pipeline",
        label: "Sanitary drain pipeline",
        excerpt: "Hygienic floor drains and drainage networks to EHEDG principles.",
        image: "/images/products/product-1725238681.webp",
      },
      {
        slug: "compressed-air-pipe-line-installation",
        label: "Compressed air pipe line installation",
        excerpt: "Oil-free compressed air distribution for process and instrument air.",
        image: "/images/services/mechanical-polishing.png",
      },
    ],
  },
];

export type Solution = {
  slug: string;
  title: string;
  group: string;
  excerpt: string;
  intro: string;
  image?: string;
  highlights?: string[];
};

export const solutions: Solution[] = [
  {
    slug: "integrated-cip-system",
    title: "Integrated CIP System",
    group: "systems",
    excerpt: "Validated cleaning-in-place for hygienic production lines.",
    intro:
      "Turnkey CIP systems designed for pharmaceutical and food-grade facilities with full documentation and commissioning support.",
    image: "/images/services/pickling-passivation.png",
    highlights: [
      "Multi-circuit CIP skids",
      "Spray ball coverage testing",
      "Validated cleaning recipes",
      "Full IQ/OQ documentation",
    ],
  },
];

export function getSolutionGroup(slug: string) {
  return solutionGroups.find((group) => group.slug === slug);
}

export function getSolutionChild(groupSlug: string, childSlug: string) {
  const group = getSolutionGroup(groupSlug);
  return group?.children.find((child) => child.slug === childSlug);
}

export function getAllSolutionChildParams() {
  return solutionGroups.flatMap((group) =>
    group.children.map((child) => ({
      slug: group.slug,
      child: child.slug,
    })),
  );
}

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export function getSolutionsByGroup(groupSlug: string) {
  return solutions.filter((s) => s.group === groupSlug);
}
