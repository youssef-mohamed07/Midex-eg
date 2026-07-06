export type SolutionChild = {
  slug: string;
  label: string;
  excerpt: string;
  intro: string;
  image: string;
};

export type SolutionGroup = {
  slug: string;
  label: string;
  menuLabel?: string;
  heroTitle?: string;
  servicesSectionTitle?: string;
  servicesSectionIntro?: string;
  description: string;
  intro: string;
  image: string;
  children: SolutionChild[];
};

export const solutionGroupOrder = [
  "solutions",
  "welding",
  "systems",
  "installations",
] as const;

export type SolutionGroupSlug = (typeof solutionGroupOrder)[number];

export function orderSolutionGroups<T extends { slug: string }>(groups: T[]): T[] {
  return solutionGroupOrder
    .map((slug) => groups.find((group) => group.slug === slug))
    .filter((group): group is T => Boolean(group));
}

export const solutionGroupHighlights: Record<SolutionGroupSlug, string[]> = {
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
  systems: [
    "GMP-aligned system design",
    "Factory acceptance testing (FAT)",
    "IQ/OQ documentation packages",
    "Commissioning and handover support",
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
    slug: "solutions",
    label: "System Upgrades & Modifications",
    menuLabel: "Modifications",
    heroTitle: "Upgrade Without Rebuilding",
    servicesSectionTitle: "What We Modify",
    servicesSectionIntro:
      "Three focused modification services, each designed to extend the life and performance of your existing infrastructure.",
    description:
      "MIDEX extends the life and performance of your existing systems — modifying and upgrading purified water stations, distribution skids, and PW/WFI loops to meet today's demands.",
    intro:
      "Replacing a validated utility system mid-production is rarely practical — yet capacity, performance, and layout requirements change. Midex modifications extend existing PW and WFI infrastructure without invalidating your qualification: controlled change management, updated as-built documentation, and verified performance keep production running while the system evolves with your facility.",
    image: "/images/services/pickling-passivation.png",
    children: [
      {
        slug: "pw-station-modification",
        label: "Purified Water Station Modification",
        excerpt:
          "Enhancing existing purified water stations for improved capacity, compliance, and reliability — without the cost and downtime of a full rebuild.",
        intro:
          "When demand outgrows an existing PW train, replacement is costly and disruptive. Midex reconfigures and upgrades generation capacity — adding RO stages, EDI modules, or pretreatment — under controlled change protocols that protect your validated state.",
        image: "/images/news/news-1725287028.webp",
      },
      {
        slug: "distribution-skids-modification",
        label: "Distribution Skids Modification",
        excerpt:
          "Upgrading distribution skids to match evolving process demands, improving flow control and system performance across your facility.",
        intro:
          "New production lines and additional points of use require loop expansion without compromising water quality. Midex modifies distribution skids and loop headers with hygienic tie-ins, hydraulic rebalancing, and updated as-built documentation.",
        image: "/images/services/roughness-test.png",
      },
      {
        slug: "loop-design-modification",
        label: "PW / WFI Loop Design Modification",
        excerpt:
          "Redesigning and modifying purified water and Water-for-Injection loops to close compliance gaps and optimize circulation, temperature, and quality control.",
        intro:
          "Dead legs, insufficient velocity, and thermal losses compromise loop performance over time. Midex redesigns PW and WFI loops for optimal flow, minimum dead volume, and sanitization compatibility — validated through requalification testing and updated P&IDs.",
        image: "/images/services/mirror-finish.png",
      },
    ],
  },
  {
    slug: "welding",
    label: "Hygienic Welding Services",
    menuLabel: "Welding",
    heroTitle: "Welds You Can Trust, Systems You Can Rely On",
    servicesSectionTitle: "What We Offer",
    servicesSectionIntro:
      "Two welding disciplines, one uncompromising standard of quality.",
    description:
      "MIDEX delivers manual and automatic orbital welding to the strictest hygienic standards — ensuring integrity across every joint in your critical systems.",
    intro:
      "Hygienic process piping lives or fails at the weld. Midex provides certified manual and orbital welding with full WPS/PQR qualification, visual and borescope inspection, and complete traceability — meeting ASME BPE standards for pharmaceutical-grade installations.",
    image: "/images/services/orbital-welding.png",
    children: [
      {
        slug: "manual-welding",
        label: "Manual Welding",
        excerpt:
          "Skilled manual welding for complex geometries and site conditions where precision and adaptability matter most.",
        intro:
          "Complex geometries and tie-in points require skilled manual welders who understand hygienic standards. Midex certified welders work to qualified WPS procedures with visual and borescope inspection on every critical joint — full traceability from heat number to weld log.",
        image: "/images/services/welding-docs.png",
      },
      {
        slug: "automatic-orbital-welding",
        label: "Automatic Orbital Welding",
        excerpt:
          "Automated orbital welding delivering consistent, repeatable, contamination-free welds for critical hygienic piping systems.",
        intro:
          "Orbital welding delivers the consistency that manual techniques cannot match on straight runs and standard fittings. Midex orbital welding systems produce repeatable autogenous welds with parameter logging, in-process inspection, and complete weld documentation for regulatory review.",
        image: "/images/services/orbital-welding.png",
      },
    ],
  },
  {
    slug: "systems",
    label: "Process & Water Treatment Systems",
    menuLabel: "Systems",
    heroTitle: "Water Systems Engineered for Purity",
    servicesSectionTitle: "What We Deliver",
    servicesSectionIntro:
      "Four core systems that keep your process water clean, controlled, and compliant.",
    description:
      "MIDEX designs and installs complete process and water treatment systems — from CIP and SIP to purified water stations and distribution skids — built to hygienic and pharmaceutical-grade standards.",
    intro:
      "Validated utility systems are the backbone of pharmaceutical and food production. Midex delivers complete PW, WFI, CIP/SIP, and distribution packages — engineered for regulatory compliance, operational reliability, and long-term maintainability from commissioning through handover.",
    image: "/images/services/spray-ball.png",
    children: [
      {
        slug: "cleaning-in-place-system",
        label: "Cleaning-in-Place System (CIP)",
        excerpt:
          "Automated cleaning systems that maintain hygienic conditions across your process equipment without disassembly.",
        intro:
          "Manual cleaning introduces variability that GMP facilities cannot accept. Midex CIP skids automate circuit cleaning with validated recipes, flow and temperature control, and spray ball coverage verification — reducing downtime while producing the audit-ready records regulators expect.",
        image: "/images/services/spray-ball.png",
      },
      {
        slug: "sanitization-in-place-system",
        label: "Sanitization-in-Place System (SIP)",
        excerpt:
          "In-line sanitization systems designed to eliminate microbial risk and maintain sterility across critical process lines.",
        intro:
          "Sterile processing demands repeatable thermal or chemical sanitization without disassembly. Midex SIP systems deliver controlled sterilization cycles with full parameter logging, interlocks, and documentation packages aligned with your validation protocol.",
        image: "/images/services/passivation-test.png",
      },
      {
        slug: "purified-water-station",
        label: "Purified Water Station",
        excerpt:
          "Complete purified water generation systems built to consistently meet pharmaceutical-grade water quality standards.",
        intro:
          "Purified water generation is the critical first stage of any pharmaceutical utility train. Midex PW stations combine pretreatment, RO, and EDI in skid-mounted packages with online conductivity monitoring, data logging, and distribution-ready outlets — engineered and qualified to pharmacopoeia requirements.",
        image: "/images/news/news-1725286541.webp",
      },
      {
        slug: "distribution-skids",
        label: "Distribution Skids",
        excerpt:
          "Engineered distribution skids that deliver purified water reliably and efficiently across your facility.",
        intro:
          "Generated water only matters if it reaches the point of use at the right quality, pressure, and temperature. Midex distribution skids integrate hygienic pumps, valves, instrumentation, and loop controls — designed for continuous circulation, sanitization compatibility, and full traceability.",
        image: "/images/services/bore-scoping.png",
      },
    ],
  },
  {
    slug: "installations",
    label: "Hygienic Piping Installations",
    menuLabel: "Installations",
    heroTitle: "Piping Installations Built for Purity",
    servicesSectionTitle: "What We Install",
    servicesSectionIntro:
      "Four core installations that keep your process lines hygienic, compliant, and reliable.",
    description:
      "MIDEX installs hygienic piping systems — from purified water loops to compressed air lines — engineered to protect product integrity at every stage.",
    intro:
      "Engineering drawings only deliver value when installed correctly on site. Midex handles turnkey installation — hygienic slopes, support spacing, pressure testing, flushing, and as-built isometrics — so your validated systems perform as designed from day one.",
    image: "/images/services/bore-scoping.png",
    children: [
      {
        slug: "purified-loop-system",
        label: "Purified Water Loop System",
        excerpt:
          "Complete purified water loop installations engineered to maintain consistent quality and circulation throughout your facility.",
        intro:
          "A purified loop is only as reliable as its installation. Midex installs complete PW and WFI circulation systems with correct slopes, support spacing, expansion accommodation, and hygienic tie-ins — pressure tested, flushed, and handed over with as-built isometrics.",
        image: "/images/services/bore-scoping.png",
      },
      {
        slug: "preparation-pipe-line",
        label: "Preparation Pipeline",
        excerpt:
          "Hygienic preparation pipelines designed to safely transfer raw materials and ingredients through your process.",
        intro:
          "Preparation and process lines carry product-contact media that demand hygienic design. Midex installs stainless steel process piping with validated weld records, hygienic valve arrangements, and slope compliance for CIP drainage.",
        image: "/images/services/mirror-finish.png",
      },
      {
        slug: "sanitary-drain-pipeline",
        label: "Sanitary Drain Pipeline",
        excerpt:
          "Sanitary drainage pipelines built for easy cleaning, contamination control, and regulatory compliance.",
        intro:
          "Poor drainage creates contamination risk and cleaning failures. Midex designs and installs sanitary drain networks with correct falls, trap configurations, and cleanable connections — aligned with EHEDG hygienic design principles.",
        image: "/images/products/product-1725238681.webp",
      },
      {
        slug: "compressed-air-pipe-line-installation",
        label: "Compressed Air Pipeline Installation",
        excerpt:
          "Compressed air piping installed to hygienic standards, protecting critical processes from contamination.",
        intro:
          "Process and instrument air must be delivered clean, dry, and at stable pressure. Midex installs oil-free compressed air distribution networks with hygienic materials, proper filtration points, and slope for condensate removal.",
        image: "/images/services/mechanical-polishing.png",
      },
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

/** Maps legacy `/solutions/[slug]` URLs to the unified group/child routes. */
export function resolveLegacySolutionPath(slug: string): string | null {
  const group = getSolutionGroup(slug);
  if (group) {
    return `/solutions/group/${group.slug}`;
  }

  for (const item of solutionGroups) {
    const child = item.children.find((entry) => entry.slug === slug);
    if (child) {
      return `/solutions/group/${item.slug}/${child.slug}`;
    }
  }

  return null;
}
