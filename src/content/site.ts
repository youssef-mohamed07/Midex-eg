export const heroSlides = [
  {
    image: "/images/hero/slide-1.png",
    titleKey: "slide1Title",
    textKey: "slide1Text",
    btn1Key: "aboutUs",
    btn1Href: "/about-us",
    btn2Key: "ourServices",
    btn2Href: "/products",
  },
  {
    image: "/images/hero/slide-2.png",
    titleKey: "slide2Title",
    textKey: "slide2Text",
    btn1Key: "aboutUs",
    btn1Href: "/about-us",
    btn2Key: "ourServices",
    btn2Href: "/solutions/group/systems",
  },
  {
    image: "/images/hero/slide-3.png",
    titleKey: "slide3Title",
    textKey: "slide3Text",
    btn1Key: "contactUs",
    btn1Href: "/contact",
    btn2Key: "viewProducts",
    btn2Href: "/products",
  },
] as const;

export const services = [
  {
    title: "Mechanical polishing",
    excerpt:
      "Refining stainless steel surfaces to achieve a smooth hygienic finish.",
    image: "/images/services/mechanical-polishing.png",
  },
  {
    title: "Mirror finish",
    excerpt:
      "Meticulous multi-step polishing for mirror-grade stainless steel.",
    image: "/images/services/mirror-finish.png",
  },
  {
    title: "Pickling and passivation",
    excerpt: "Remove contaminants and restore corrosion resistance.",
    image: "/images/services/pickling-passivation.png",
  },
  {
    title: "Bore scoping",
    excerpt: "Internal pipe inspection with flexible borescope technology.",
    image: "/images/services/bore-scoping.png",
  },
  {
    title: "Orbital Welding",
    excerpt: "Automated circular welding for validated hygienic systems.",
    image: "/images/services/orbital-welding.png",
  },
  {
    title: "Roughness test",
    excerpt: "Surface smoothness assessment against pharma standards.",
    image: "/images/services/roughness-test.png",
  },
  {
    title: "Spray Ball Coverage Test",
    excerpt: "CIP spray ball coverage verification inside tanks.",
    image: "/images/services/spray-ball.png",
  },
  {
    title: "Passivation Test",
    excerpt: "Chemical validation for corrosion protection.",
    image: "/images/services/passivation-test.png",
  },
  {
    title: "Welding documentation",
    excerpt: "WPS, PQR, and complete inspection records.",
    image: "/images/services/welding-docs.png",
  },
];

export const partners = [
  { name: "GEA", image: "/images/partners/partner-1755761833.png" },
  { name: "HRS", image: "/images/partners/partner-1755701549.png" },
  { name: "EVOGUARD", image: "/images/partners/partner-1755771798.png" },
  { name: "Burkert", image: "/images/partners/partner-1756043795.png" },
  { name: "Valex", image: "/images/partners/partner-1756043967.png" },
  { name: "SenTec", image: "/images/partners/partner-1756044128.jpeg" },
];

export const exclusivePartners = [
  { name: "SING TAO", image: "/images/exclusive/sing-tao.png" },
  { name: "Truvia", image: "/images/exclusive/truvia.png" },
  { name: "Eternal Water", image: "/images/exclusive/eternal-water.png" },
];

export const stats = [
  { value: 465, labelKey: "statProjects" },
  { value: 255, labelKey: "statClients" },
  { value: 363, labelKey: "statEngineers" },
  { value: 122, labelKey: "statYears" },
];

export const testimonials = [
  {
    name: "Sara Walid",
    role: "Technical Office Engineer",
    quote:
      "Proud to be part of a company that delivers innovative solutions with the highest standards of quality and reliability.",
  },
  {
    name: "Moataz Mohamed",
    role: "Purchasing Manager",
    quote:
      "We really appreciate the quality and professionalism of Midex, as they always strive to give the best to their clients.",
  },
  {
    name: "Mohamed Hossam",
    role: "Maintenance Engineer",
    quote:
      "They don't just supply products; they stand by us every step of the way until the project is completed to the highest standard.",
  },
  {
    name: "Bahaa",
    role: "Production Engineer",
    quote: "MIDEX brings real value to any project they are involved in.",
  },
];

export const newsItems = [
  {
    title: "Delta Care Purified Water Station",
    date: "Jul 9, 2024",
    excerpt: "Design and execution of a Reverse Osmosis purified water station.",
    image: "/images/news/news-1725286541.webp",
  },
  {
    title: "VACSERA Upgraded RO-EDI Station",
    date: "Sep 2, 2024",
    excerpt: "Successfully upgraded the RO-EDI purified water station capacity.",
    image: "/images/news/news-1725287028.webp",
  },
  {
    title: "Future Pharma Installations Success",
    date: "Sep 2, 2024",
    excerpt: "Major success implementing compressed air and pure gas systems.",
    image: "/images/news/news-1725287019.webp",
  },
  {
    title: "MEVAC Five — Water & Steam Distribution",
    date: "Aug 21, 2025",
    excerpt: "Integrated water and steam piping in compliance with GMP standards.",
    image: "/images/news/news-1755767513.png",
  },
  {
    title: "MARS WRIGLEY Soft Water Line",
    date: "Aug 24, 2025",
    excerpt: "1,500 meters of stainless-steel soft water distribution installed.",
    image: "/images/news/news-1756042052.png",
  },
  {
    title: "SPIMACO Pharmaceutical Water Network",
    date: "Aug 26, 2025",
    excerpt:
      "Purified Water Station with 2.5 m³/h capacity and advanced monitoring.",
    image: "/images/news/news-1756207804.png",
  },
  {
    title: "Otsuka PW Piping Network",
    date: "Apr 22, 2026",
    excerpt:
      "Stainless steel piping works for a new production line within the PW network.",
    image: "/images/news/news-1776871937.png",
  },
];

export type EventItem = {
  src: string;
  title: string;
  subtitle?: string;
  date?: string;
  featured?: boolean;
  variant?: "poster" | "photo";
};

export const events: EventItem[] = [
  {
    src: "/images/events/event-1755506196.jpg",
    title: "Pharmaconex",
    subtitle: "International Exhibition Center · Booth K14",
    date: "Sep 1–3, 2025",
    featured: true,
    variant: "poster",
  },
  {
    src: "/images/events/event-1755759833.jpg",
    title: "CPHI & PMEC China",
    subtitle: "Shanghai · Global pharma platform",
    date: "Jun 24–26, 2025",
    variant: "poster",
  },
  {
    src: "/images/events/event-1755506209.jpg",
    title: "Exhibition Booth",
    subtitle: "Midex team at the trade fair",
    variant: "photo",
  },
  {
    src: "/images/events/event-1755506225.jpg",
    title: "Booth Highlights",
    subtitle: "Product demonstrations and meetings",
    variant: "photo",
  },
  {
    src: "/images/events/event-1755506266.jpg",
    title: "Industry Networking",
    subtitle: "VIP members and partners",
    variant: "photo",
  },
  {
    src: "/images/events/event-1755506276.jpg",
    title: "Facility Visit",
    subtitle: "Client and partner engagement",
    variant: "photo",
  },
  {
    src: "/images/events/event-1756814991.jpg",
    title: "Purified Water Project",
    subtitle: "On-site engineering showcase",
    variant: "photo",
  },
  {
    src: "/images/events/event-1756820572.png",
    title: "Project Commissioning",
    subtitle: "Validated system handover",
    variant: "photo",
  },
];

/** @deprecated Use `events` instead */
export const eventImages = events.map((event) => ({
  src: event.src,
  caption: event.title,
}));

export const clientLogos = Array.from({ length: 33 }, (_, i) => {
  const ids = [
    "1755511118", "1756049725", "1755511147", "1755511156", "1755511167",
    "1755511180", "1756119223", "1755511200", "1756118643", "1756049392",
    "1755511232", "1755511246", "1756118448", "1755511268", "1755511293",
    "1755511306", "1755511317", "1756118962", "1755511351", "1755511375",
    "1756732187", "1755511396", "1756049157", "1756118072", "1755511438",
    "1755511452", "1755511458", "1755511465", "1755511472", "1756732411",
    "1755511497", "1755511503", "1755511508",
  ];
  return `/images/clients/client-${ids[i]}.png`;
});

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  readTime: number;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "hygienic-engineering-trends",
    title: "Hygienic Engineering Trends in 2026",
    excerpt: "How GMP requirements are shaping process system design across the region.",
    date: "Mar 12, 2026",
    image: "/images/blog/blog-1776352479.jpg",
    category: "Industry Insights",
    readTime: 6,
    body: [
      "Pharmaceutical and food manufacturers across Egypt and the wider region are tightening hygienic design standards. Regulators and internal QA teams now expect process systems to be designed for cleanability, traceability, and validated performance from day one.",
      "We are seeing increased demand for skid-based utility systems — purified water, WFI distribution, and CIP/SIP — engineered as integrated packages rather than site-assembled collections of components. This reduces installation time and improves documentation consistency.",
      "Digital monitoring and data integrity are also moving front and centre. Clients want clear audit trails for critical parameters: conductivity, TOC, loop temperature, and sanitization cycles. Systems must be designed with instrumentation and documentation packages that support IQ/OQ from the start.",
      "At Midex, our project approach aligns engineering design with FAT, SAT, and handover documentation so facilities can move from installation to qualified operation without rework.",
    ],
  },
  {
    slug: "purified-water-validation",
    title: "Purified Water System Validation Best Practices",
    excerpt: "Key steps for commissioning and documenting PW stations.",
    date: "Feb 4, 2026",
    image: "/images/blog/blog-1776958775.png",
    category: "Validation",
    readTime: 5,
    body: [
      "Purified water systems are among the most heavily scrutinized utilities in GMP facilities. Validation is not a final step — it begins during design, when loop sizing, dead legs, and sanitization strategy are defined.",
      "A robust commissioning plan covers mechanical completion, pressure testing, flushing, and performance qualification. Each phase should produce traceable records: isometric drawings, weld logs, instrument calibration certificates, and trend data from trial runs.",
      "Common pitfalls include undersized storage capacity, inadequate loop velocity, and missing sample points for microbiological monitoring. Addressing these during engineering prevents costly modifications after go-live.",
      "Midex supports clients through design review, FAT witness, site installation, and SAT documentation — ensuring PW stations meet both operational and regulatory expectations.",
    ],
  },
  {
    slug: "orbital-welding-quality",
    title: "Quality Assurance in Orbital Welding",
    excerpt: "Documentation, inspection, and traceability for hygienic piping.",
    date: "Jan 18, 2026",
    image: "/images/blog/blog-1756631510.jpeg",
    category: "Welding",
    readTime: 4,
    body: [
      "Orbital welding is the backbone of hygienic piping in pharmaceutical and biotech facilities. Repeatable heat input, consistent purge gas coverage, and qualified procedures are essential for ASME BPE compliance.",
      "Every project should maintain WPS/PQR documentation, welder qualifications, and visual plus boroscope inspection records for critical joints. Traceability from heat number to isometric drawing gives QA teams confidence during audits.",
      "Automatic orbital welding reduces variability compared to manual techniques, especially on repetitive loop installations. For tie-ins and complex geometry, certified manual welders remain essential — the quality system must cover both.",
      "Midex welding teams work to documented procedures with full inspection records, supporting client turnover packages and ongoing maintenance traceability.",
    ],
  },
  {
    slug: "cip-system-design",
    title: "CIP System Design Considerations",
    excerpt: "Balancing coverage, cycle time, and chemical consumption.",
    date: "Dec 2, 2025",
    image: "/images/blog/blog-1756302842.jpeg",
    category: "Systems",
    readTime: 5,
    body: [
      "Cleaning-in-place systems must deliver verified coverage without excessive cycle time or chemical use. Design starts with understanding vessel geometry, spray device selection, and drainability of all product-contact surfaces.",
      "Spray ball coverage testing is a critical validation step. Riboflavin or equivalent tests confirm that all internal surfaces receive cleaning solution — a requirement that must be planned before tanks are released for production.",
      "CIP skids should be sized for flow and pressure requirements across multiple circuits, with clear segregation between caustic, acid, and rinse phases. Automation and recipe management reduce operator error and support batch record integration.",
      "Midex designs and commissions CIP systems with documented cycles, coverage verification, and operator training — aligned with hygienic design principles and client SOPs.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export const siteContact = {
  email: "sales@midex-eg.com",
  phones: ["01026228403", "01006683803"],
  address:
    "29 Al Mehwar Al Markazi, First 6th of October, 6th of October City (2), Giza Governorate 3225614",
};
