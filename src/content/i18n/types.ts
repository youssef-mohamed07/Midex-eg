export type ProductCategoryTranslation = {
  label: string;
  description: string;
};

export type ProductTranslation = {
  title: string;
  excerpt: string;
  description: string;
};

export type ProductCategoryDetailsTranslation = {
  highlights: string[];
  specs: { label: string; value: string }[];
};

export type ServiceTranslation = {
  title: string;
  excerpt: string;
};

export type NewsTranslation = {
  title: string;
  excerpt: string;
};

export type CaseStudyTranslation = {
  industry: string;
  scope: string;
  outcome: string;
  statLabel: string;
  tags: string[];
};

export type EventTranslation = {
  title: string;
  subtitle?: string;
};

export type TestimonialTranslation = {
  role: string;
  quote: string;
};

export type BlogPostTranslation = {
  title: string;
  excerpt: string;
  category: string;
  body: string[];
};

export type SolutionChildTranslation = {
  label: string;
  excerpt: string;
  intro?: string;
};

export type SolutionGroupTranslation = {
  label?: string;
  heroTitle?: string;
  servicesSectionTitle?: string;
  servicesSectionIntro?: string;
  description: string;
  intro?: string;
  children: Record<string, SolutionChildTranslation>;
};

export type SolutionGroupPrincipleTranslation = {
  title: string;
  text: string;
};

export type SolutionGroupPrinciplesTranslation = {
  title: string;
  intro: string;
  items: Record<string, SolutionGroupPrincipleTranslation>;
};

export type SolutionGroupWorkflowStepTranslation = {
  title: string;
  text: string;
};

export type SolutionGroupWorkflowTranslation = {
  title: string;
  intro: string;
  steps: Record<string, SolutionGroupWorkflowStepTranslation>;
};

export type SolutionGroupFaqItemTranslation = {
  question: string;
  answer: string;
};

export type SolutionGroupFaqTranslation = {
  title: string;
  intro: string;
  items: Record<string, SolutionGroupFaqItemTranslation>;
};

export type SolutionChildPageTranslation = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaLabel?: string;
  overviewTitle?: string;
  overviewIntro?: string;
  overviewItems?: string[];
  relatedSectionTitle?: string;
  principles?: SolutionGroupPrinciplesTranslation;
  workflow?: SolutionGroupWorkflowTranslation;
  faq?: SolutionGroupFaqTranslation;
};

export type LocaleContent = {
  productCategories: Record<string, ProductCategoryTranslation>;
  products: Record<string, ProductTranslation>;
  productCategoryDetails?: Record<string, ProductCategoryDetailsTranslation>;
  services: ServiceTranslation[];
  newsItems: NewsTranslation[];
  caseStudies: CaseStudyTranslation[];
  events: Record<string, EventTranslation>;
  testimonials: TestimonialTranslation[];
  blogPosts: Record<string, BlogPostTranslation>;
  solutionGroups: Record<string, SolutionGroupTranslation>;
  solutionGroupHighlights: Record<string, string[]>;
  solutionGroupPrinciples?: Record<string, SolutionGroupPrinciplesTranslation>;
  solutionGroupWorkflow?: Record<string, SolutionGroupWorkflowTranslation>;
  solutionGroupFaq?: Record<string, SolutionGroupFaqTranslation>;
  solutionChildPages?: Record<string, SolutionChildPageTranslation>;
};
