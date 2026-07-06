/**
 * App-facing content types. These mirror the shapes the UI components were
 * originally built against so the render layer stays unchanged.
 */

export type Service = {
  title: string;
  excerpt: string;
  image: string;
};

export type Partner = {
  name: string;
  image: string;
};

export type Certificate = {
  slug: string;
  image: string;
  alt: string;
};

export type Stat = {
  value: number;
  labelKey: string;
  suffix?: string;
};

export type Milestone = {
  value: number;
  labelKey: string;
  suffix?: string;
};

export type Founder = {
  id: string;
  image: string;
  nameKey: string;
  roleKey: string;
  bioKey: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type NewsItem = {
  title: string;
  date: string;
  excerpt: string;
  image: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  image: string;
  industry: string;
  scope: string;
  outcome: string;
  statValue: string;
  statLabel: string;
  tags: string[];
};

export type EventItem = {
  src: string;
  title: string;
  subtitle?: string;
  date?: string;
  featured?: boolean;
  variant?: "poster" | "photo";
};

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

export type CompanyValue = {
  id: string;
  image: string;
  alt: string;
};

export type SiteContact = {
  email: string;
  phones: string[];
  address: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
};

export type HeroCollageImage = {
  src: string;
  className: string;
};

export type HeroCollage = {
  left: HeroCollageImage[];
  right: HeroCollageImage[];
  /** Hero image shown on small screens (first hero slide). */
  mobileImage: string;
};

/* Products */

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

export type ProductCategoryInfo = {
  label: string;
  description: string;
};

export type ProductCategoryDetails = {
  highlights: string[];
  specs: ProductSpec[];
};

/* Solutions */

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

export type SolutionGroupPrinciple = {
  id: string;
  title: string;
  text: string;
  image: string;
};

export type SolutionGroupPrinciplesContent = {
  title: string;
  intro: string;
  items: SolutionGroupPrinciple[];
};

export type SolutionGroupWorkflowStep = {
  id: string;
  title: string;
  text: string;
  image: string;
};

export type SolutionGroupWorkflowContent = {
  title: string;
  intro: string;
  steps: SolutionGroupWorkflowStep[];
};

export type SolutionGroupFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type SolutionGroupFaqContent = {
  title: string;
  intro: string;
  items: SolutionGroupFaqItem[];
};

export type SolutionChildPageContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  overviewTitle: string;
  overviewIntro: string;
  overviewItems: string[];
  principles: SolutionGroupPrinciplesContent;
  workflow: SolutionGroupWorkflowContent;
  relatedSectionTitle: string;
  faq: SolutionGroupFaqContent;
};

/* Site settings */

export type SiteSettings = {
  name: string;
  legalName: string;
  contact: SiteContact;
  addressParts: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  social: {
    linkedIn?: string;
    twitter?: string;
    whatsApp?: string;
  };
  twitterHandle?: string;
  manifest: {
    description: string;
    backgroundColor: string;
    themeColor: string;
  };
  robotsDisallow: string[];
};
