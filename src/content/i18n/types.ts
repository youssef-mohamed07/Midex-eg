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
  description: string;
  intro?: string;
  children: Record<string, SolutionChildTranslation>;
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
};
