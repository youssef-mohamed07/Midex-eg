import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { BlogPostPageContent } from "@/components/blog/BlogPostPageContent";
import { SeoHead } from "@/components/seo/SeoHead";
import { getAllBlogSlugs } from "@/lib/cms";
import { type Locale } from "@/i18n/routing";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getBlogPostSeoContext } from "@/lib/seo/page-context";

export const revalidate = 86400;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = await getBlogPostSeoContext(slug, locale as Locale);
  if (!data) return {};

  return buildSeoMetadata({
    routeKey: "blog-post",
    locale,
    params: { slug },
    context: data.context,
    slug,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const data = await getBlogPostSeoContext(slug, locale as Locale);
  if (!data) notFound();

  return (
    <>
      <SeoHead
        routeKey="blog-post"
        locale={locale}
        params={{ slug }}
        context={data.context}
        slug={slug}
        article={data.article}
      />
      <BlogPostPageContent slug={slug} />
    </>
  );
}
