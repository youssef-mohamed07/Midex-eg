export type ProductCategoryTranslation = {
  label: string;
  description: string;
};

export type ProductTranslation = {
  title: string;
  excerpt: string;
  description: string;
};

export type ServiceTranslation = {
  title: string;
  excerpt: string;
};

export type NewsTranslation = {
  title: string;
  excerpt: string;
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
};

export type SolutionGroupTranslation = {
  description: string;
  children: Record<string, SolutionChildTranslation>;
};

export type SolutionTranslation = {
  title: string;
  excerpt: string;
  intro: string;
  highlights: string[];
};

export type LocaleContent = {
  productCategories: Record<string, ProductCategoryTranslation>;
  products: Record<string, ProductTranslation>;
  services: ServiceTranslation[];
  newsItems: NewsTranslation[];
  events: Record<string, EventTranslation>;
  testimonials: TestimonialTranslation[];
  blogPosts: Record<string, BlogPostTranslation>;
  solutionGroups: Record<string, SolutionGroupTranslation>;
  solutionGroupHighlights: Record<string, string[]>;
  solutions: Record<string, SolutionTranslation>;
};
