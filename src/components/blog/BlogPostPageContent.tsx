import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionBreadcrumbs } from "@/components/solutions/SolutionBreadcrumbs";
import { getLocalizedBlogPost, getLocalizedBlogPosts } from "@/content/i18n";
import { blogPosts } from "@/content/site";
import { type Locale } from "@/i18n/routing";

type Props = { slug: string };

export async function BlogPostPageContent({ slug }: Props) {
  const locale = (await getLocale()) as Locale;
  const post = getLocalizedBlogPost(slug, locale);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const related = getLocalizedBlogPosts(locale)
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        badge={false}
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
        compact
        breadcrumbs={
          <SolutionBreadcrumbs
            light
            items={[
              { label: t("title"), href: "/blog" },
              { label: post.title },
            ]}
          />
        }
      />

      <section className="mx-section bg-white">
        <div className="mx-container grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <article>
            <div className="flex flex-wrap items-center gap-3 text-sm text-midex-gray/70">
              <time className="font-semibold text-midex-blue">{post.date}</time>
              <span>·</span>
              <span>
                {post.readTime} {t("minRead")}
              </span>
            </div>

            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl shadow-lg shadow-midex-navy/10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
                priority
              />
            </div>

            <div className="prose-midex mt-8 space-y-5">
              {post.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-midex-gray/85">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3 border-t border-midex-navy/8 pt-8">
              <Link className="mx-btn mx-btn-primary" href="/contact">
                {t("ctaButton")} →
              </Link>
              <Link
                className="mx-btn border border-midex-navy/15 bg-white text-midex-navy hover:bg-midex-surface"
                href="/blog"
              >
                {t("backToBlog")} →
              </Link>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-midex-navy/8 bg-midex-surface p-6">
              <h2 className="font-display text-lg font-bold text-midex-navy">{t("relatedPosts")}</h2>
              <ul className="mt-4 space-y-4">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="group block no-underline"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                        {item.date}
                      </p>
                      <p className="mt-1 font-semibold text-midex-navy transition group-hover:text-midex-blue">
                        {item.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-midex-mint/30 bg-gradient-to-br from-midex-mint/15 to-white p-6">
              <h2 className="font-display text-lg font-bold text-midex-navy">{t("ctaTitle")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-midex-gray/75">{t("ctaText")}</p>
              <Link
                href="/contact"
                className="mt-4 inline-flex text-sm font-semibold text-midex-blue hover:underline"
              >
                {t("ctaButton")} →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export function generateBlogStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
