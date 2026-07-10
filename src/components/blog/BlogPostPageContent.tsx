import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionBreadcrumbs } from "@/components/solutions/SolutionBreadcrumbs";
import { PageCtaSection } from "@/components/cms/PageCtaSection";
import { getBlogPageContent, getBlogPost, getBlogPosts } from "@/lib/cms";
import { resolvePageCta } from "@/lib/cms/section-resolve";
import { type Locale } from "@/i18n/routing";

type Props = { slug: string };

export async function BlogPostPageContent({ slug }: Props) {
  const locale = (await getLocale()) as Locale;
  const post = await getBlogPost(slug, locale);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const [relatedAll, page] = await Promise.all([
    getBlogPosts(locale),
    getBlogPageContent(locale),
  ]);
  const related = relatedAll.filter((item) => item.slug !== post.slug).slice(0, 3);
  const cta = resolvePageCta(page.cta, {
    title: t("ctaTitle"),
    text: t("ctaText"),
    primaryCta: t("ctaButton"),
    primaryCtaHref: "/contact",
  });

  return (
    <>
      <PageHero
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
      >
        <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider text-white/70 sm:mt-8">
          <time className="text-midex-mint">{post.date}</time>
          <span aria-hidden>·</span>
          <span>
            {post.readTime} {t("minRead")}
          </span>
        </p>
      </PageHero>

      <div className="relative -mt-6 lg:-mt-8">
        <div className="mx-container">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-midex-line shadow-lg sm:aspect-[3/1]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midex-navy/25 to-transparent" />
          </div>
        </div>
      </div>

      <section className="mx-section">
        <div className="mx-container">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
            <article>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider text-midex-gray/65">
                <time className="text-midex-blue">{post.date}</time>
                <span aria-hidden>·</span>
                <span>
                  {post.readTime} {t("minRead")}
                </span>
                <span aria-hidden>·</span>
                <span className="rounded-full bg-midex-surface px-2.5 py-0.5 text-midex-navy">
                  {post.category}
                </span>
              </div>

              <div className="prose-midex mt-8 border-t border-midex-line pt-8">
                {post.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3 border-t border-midex-line pt-8">
                <Link className="group mx-btn mx-btn-primary" href="/contact">
                  {t("ctaButton")}
                  <span className="mx-arrow">→</span>
                </Link>
                <Link className="mx-btn mx-btn-ghost" href="/blog">
                  {t("backToBlog")}
                </Link>
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {post.author?.name && (
                <div className="overflow-hidden rounded-2xl border border-midex-line bg-white shadow-sm">
                  <div className="flex items-center gap-4 p-5">
                    {post.author.image ? (
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={post.author.image}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                        {t("authorLabel")}
                      </p>
                      <p className="mt-1 font-display text-base font-bold text-midex-navy">
                        {post.author.name}
                      </p>
                      {post.author.role ? (
                        <p className="mt-0.5 text-sm text-midex-gray/70">{post.author.role}</p>
                      ) : null}
                    </div>
                  </div>
                  {post.author.bio ? (
                    <p className="border-t border-midex-line px-5 py-4 text-sm leading-relaxed text-midex-gray/75">
                      {post.author.bio}
                    </p>
                  ) : null}
                </div>
              )}

              {related.length > 0 && (
                <div className="overflow-hidden rounded-2xl border border-midex-line bg-midex-surface/50">
                  <div className="border-b border-midex-line px-5 py-4">
                    <h2 className="font-display text-sm font-bold uppercase tracking-wider text-midex-navy">
                      {t("relatedPosts")}
                    </h2>
                  </div>
                  <ul className="divide-y divide-midex-line">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/blog/${item.slug}`}
                          className="block px-5 py-4 no-underline transition-colors hover:bg-white"
                        >
                          <time className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
                            {item.date}
                          </time>
                          <p className="mt-1 text-sm font-semibold leading-snug text-midex-navy transition-colors hover:text-midex-blue">
                            {item.title}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <PageCtaSection content={cta} variant="card" />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}