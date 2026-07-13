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
  href?: string;
};

export type Certificate = {
  slug: string;
  image: string;
  alt: string;
  title?: string;
  description?: string;
};

export type Stat = {
  value: number;
  labelKey: string;
  label?: string;
  suffix?: string;
};

export type Milestone = {
  value: number;
  labelKey: string;
  label?: string;
  suffix?: string;
};

export type Founder = {
  id: string;
  image: string;
  nameKey: string;
  roleKey: string;
  bioKey: string;
  name?: string;
  role?: string;
  bio?: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image?: string;
  product?: {
    slug: string;
    title: string;
  };
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
  intro?: string;
  challenge?: string;
  approach?: string;
  highlights?: string[];
  outcome: string;
  statValue: string;
  statLabel: string;
  tags: string[];
  gallery?: string[];
  solutionGroup?: {
    slug: string;
    label: string;
  };
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
  author?: {
    name: string;
    role?: string;
    image?: string;
    bio?: string;
  };
};

export type CompanyValue = {
  id: string;
  image: string;
  alt: string;
  title?: string;
  text?: string;
};

/* Page section content (Sanity singletons) */

export type SectionHeaderContent = {
  enabled?: boolean;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  viewAllLabel?: string;
};

export type PageHeroContent = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  primaryCta?: string;
  primaryCtaHref?: string;
  secondaryCta?: string;
  secondaryCtaHref?: string;
  image?: string;
};

export type HomeHeroCopy = {
  slide1Title?: string;
  slide1Text?: string;
  requestQuote?: string;
  viewProducts?: string;
  viewProductsHref?: string;
  seeSolutions?: string;
};

export type QuoteBlockContent = {
  enabled?: boolean;
  quote?: string;
  name?: string;
  role?: string;
  image?: string;
};

export type PromoFeature = {
  title: string;
  text: string;
};

export type PromoSectionContent = {
  enabled?: boolean;
  eyebrow?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  secondaryImage?: string;
  features?: PromoFeature[];
};

export type BeforeAfterContent = {
  enabled?: boolean;
  title?: string;
  subtitle?: string;
  beforeTitle?: string;
  afterTitle?: string;
  beforeItems?: string[];
  afterItems?: string[];
  beforeImage?: string;
  afterImage?: string;
};

export type MissionVisionContent = {
  title?: string;
  visionLabel?: string;
  visionText?: string;
  missionLabel?: string;
  missionText?: string;
  visionImage?: string;
  missionImage?: string;
};

export type PageCtaContent = {
  enabled?: boolean;
  title?: string;
  text?: string;
  primaryCta?: string;
  primaryCtaHref?: string;
  secondaryCta?: string;
  secondaryCtaHref?: string;
  image?: string;
};

export type TimelineStepContent = {
  key?: string;
  title?: string;
  text?: string;
  image?: string;
};

export type TimelineSectionContent = {
  enabled?: boolean;
  title?: string;
  subtitle?: string;
  steps?: TimelineStepContent[];
};

export type FaqSectionContent = {
  enabled?: boolean;
  title?: string;
  intro?: string;
  items?: { id?: string; question: string; answer: string }[];
};

export type EngineeringCapabilityCardContent = {
  slug: string;
  title?: string;
  description?: string;
  items?: string[];
  href?: string;
};

export type EngineeringCapabilitiesSectionContent = {
  enabled?: boolean;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cards?: EngineeringCapabilityCardContent[];
};

export type HomePageSections = {
  /** Optional Sanity-driven section order (section-driven architecture). */
  sectionOrder?: string[];
  heroCopy?: HomeHeroCopy;
  partnersSection?: SectionHeaderContent;
  featuredQuote?: QuoteBlockContent;
  capabilitiesSection?: EngineeringCapabilitiesSectionContent;
  eventsSection?: SectionHeaderContent;
  productsSection?: SectionHeaderContent;
  truviaSection?: PromoSectionContent;
  beforeAfterSection?: BeforeAfterContent;
  statsSection?: SectionHeaderContent;
  caseStudiesSection?: SectionHeaderContent;
  testimonialsSection?: SectionHeaderContent;
  exclusiveSection?: SectionHeaderContent;
  servicesSection?: SectionHeaderContent;
  newsSection?: SectionHeaderContent;
  clientLogosSection?: SectionHeaderContent;
  quoteFormSection?: SectionHeaderContent;
  quoteFormCopy?: QuoteFormCopy;
  caseStudyLabels?: CaseStudyLabels;
  faq?: FaqSectionContent;
  quoteCta?: PageCtaContent;
};

export type AboutPageContent = {
  hero?: PageHeroContent;
  missionVision?: MissionVisionContent;
  milestonesSection?: SectionHeaderContent;
  foundersSection?: SectionHeaderContent;
  standardsSection?: {
    title?: string;
    subtitle?: string;
    items?: { key: string; text: string }[];
  };
  certificationsSection?: SectionHeaderContent;
  eventsSection?: SectionHeaderContent;
  valuesSection?: {
    title?: string;
    subtitle?: string;
    items?: CompanyValue[];
  };
  faq?: FaqSectionContent;
  cta?: PageCtaContent;
};

export type ContactPageContent = {
  hero?: PageHeroContent;
  aside?: { title?: string; intro?: string };
  form?: { title?: string; intro?: string; copy?: ContactFormCopy };
  map?: { title?: string; subtitle?: string };
};

export type ProductsPageContent = {
  hero?: PageHeroContent;
  catalogSection?: SectionHeaderContent;
  explorerLabels?: ProductExplorerLabels;
  detailLabels?: ProductDetailLabels;
  detailCta?: PageCtaContent;
  statsSection?: SectionHeaderContent;
  caseStudiesSection?: SectionHeaderContent;
  faq?: FaqSectionContent;
  cta?: PageCtaContent;
};

export type ProductExplorerLabels = {
  allCategories?: string;
  viewDetails?: string;
  requestQuote?: string;
  quoteShort?: string;
  noResults?: string;
  searchPlaceholder?: string;
  productsLabel?: string;
  categoriesLabel?: string;
  viewCategory?: string;
};

export type ProductDetailLabels = {
  overviewTitle?: string;
  featuresTitle?: string;
  specificationsTitle?: string;
  applicationsTitle?: string;
  relatedProductsTitle?: string;
  backToCatalog?: string;
  requestQuote?: string;
  relatedSolutionTitle?: string;
};

export type SolutionsPageContent = {
  hero?: PageHeroContent;
  capabilitiesSection?: SectionHeaderContent;
  beforeAfterSection?: BeforeAfterContent;
  timelineSection?: TimelineSectionContent;
  statsSection?: SectionHeaderContent;
  caseStudiesSection?: SectionHeaderContent;
  testimonialsSection?: SectionHeaderContent;
  faq?: FaqSectionContent;
  cta?: PageCtaContent;
};

export type BlogPageContent = {
  hero?: PageHeroContent;
  listing?: {
    featuredLabel?: string;
    latestLabel?: string;
    readPost?: string;
    postsLabel?: string;
    minRead?: string;
    viewAllArticles?: string;
  };
  cta?: PageCtaContent;
};

export type LayoutChrome = {
  home?: string;
  products?: string;
  solutions?: string;
  blog?: string;
  aboutUs?: string;
  contactUs?: string;
  allSolutions?: string;
  allCategories?: string;
  menu?: string;
  close?: string;
  capabilitiesTitle?: string;
  capabilitiesSubtitle?: string;
  servicesLabel?: string;
  footerTagline?: string;
  footerServices?: string;
  footerUsefulLinks?: string;
  footerContactUs?: string;
  footerRights?: string;
  footerAddressFallback?: string;
  socialOpen?: string;
  socialClose?: string;
  socialLinkedIn?: string;
  socialWhatsapp?: string;
  socialEmail?: string;
  socialTwitter?: string;
  langEn?: string;
  langAr?: string;
  langDe?: string;
  language?: string;
};

export type ContactFormCopy = {
  title?: string;
  intro?: string;
  quoteFor?: string;
  fullName?: string;
  emailLabel?: string;
  phoneLabel?: string;
  company?: string;
  subject?: string;
  productProject?: string;
  productPlaceholder?: string;
  message?: string;
  messagePlaceholder?: string;
  submit?: string;
  subjectQuote?: string;
  subjectProduct?: string;
  subjectGeneral?: string;
  success?: string;
  error?: string;
  validationName?: string;
  validationEmail?: string;
  validationMessage?: string;
};

export type QuoteFormCopy = {
  badge?: string;
  step1?: string;
  step2?: string;
  step3?: string;
  step4?: string;
  step1Question?: string;
  step2Question?: string;
  step3Question?: string;
  step4Question?: string;
  step1Hint?: string;
  step2Hint?: string;
  step3Hint?: string;
  step4Hint?: string;
  projectTypes?: string[];
  industries?: string[];
  location?: string;
  timeline?: string;
  description?: string;
  locationPlaceholder?: string;
  timelinePlaceholder?: string;
  descriptionPlaceholder?: string;
  next?: string;
  back?: string;
  submit?: string;
  success?: string;
  again?: string;
  progress?: string;
  validationProjectType?: string;
  validationIndustry?: string;
  validationDescription?: string;
};

export type CaseStudyLabels = {
  scopeLabel?: string;
  challengeLabel?: string;
  approachLabel?: string;
  highlightsLabel?: string;
  outcomeLabel?: string;
  discuss?: string;
  related?: string;
  back?: string;
  galleryTitle?: string;
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
  highlights?: string[];
  specs?: ProductSpec[];
  relatedSolution?: {
    slug: string;
    label: string;
    groupSlug: string;
  };
};

export type ProductCategoryInfo = {
  label: string;
  description: string;
  image?: string;
};

export type ProductCategoryPage = ProductCategoryInfo & {
  hero?: PageHeroContent;
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
  highlights?: string[];
  labels?: SolutionChildLabels;
};

export type SolutionChildLabels = {
  introductionTitle?: string;
  capabilitiesTitle?: string;
  relatedServicesTitle?: string;
  heroCtaLabel?: string;
  browseGroupLabel?: string;
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
  importanceTitle?: string;
  otherGroupsTitle?: string;
  heroCtaLabel?: string;
  cta?: PageCtaContent;
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
  chrome?: LayoutChrome;
  manifest: {
    description: string;
    backgroundColor: string;
    themeColor: string;
  };
  robotsDisallow: string[];
};
