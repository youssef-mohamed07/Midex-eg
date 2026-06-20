import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { getLocalizedBlogPosts } from "@/content/i18n";
import { type Locale } from "@/i18n/routing";

function PostMeta({
  date,
  category,
  readTime,
  readLabel,
}: {
  date: string;
  category: string;
  readTime: number;
  readLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider">
      <span className="rounded-full bg-midex-mint/20 px-3 py-1 text-midex-navy">{category}</span>
      <span className="text-midex-blue">{date}</span>
      <span className="text-midex-gray/50">·</span>
      <span className="text-midex-gray/60">
        {readTime} {readLabel}
      </span>
    </div>
  );
}

export async function BlogPageContent() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("blog");
  const blogPosts = getLocalizedBlogPosts(locale);
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <section className="mx-section bg-midex-surface">
        <div className="mx-container">
          <p className="text-xs font-semibold uppercase tracking-wider text-midex-blue">
            {t("featured")}
          </p>

          <Link
            href={`/blog/${featured.slug}`}
            className="group mx-card mt-4 block overflow-hidden no-underline lg:grid lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[360px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <PostMeta
                date={featured.date}
                category={featured.category}
                readTime={featured.readTime}
                readLabel={t("minRead")}
              />
              <h2 className="mt-4 font-display text-2xl font-bold text-midex-navy transition group-hover:text-midex-blue lg:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 leading-relaxed text-midex-gray/80">{featured.excerpt}</p>
              <span className="mt-6 inline-flex text-sm font-semibold text-midex-blue">
                {t("readPost")} →
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-section bg-white">
        <div className="mx-container">
          <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">
            {t("latestPosts")}
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group mx-card block overflow-hidden no-underline"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <PostMeta
                    date={post.date}
                    category={post.category}
                    readTime={post.readTime}
                    readLabel={t("minRead")}
                  />
                  <h3 className="mt-3 font-display text-lg font-bold text-midex-navy transition group-hover:text-midex-blue">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-midex-gray/75">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-midex-navy mx-mesh-bg py-16">
        <div className="mx-container text-center">
          <h2 className="font-display text-3xl font-bold text-white">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">{t("ctaText")}</p>
          <Link className="mx-btn mx-btn-mint mt-8 inline-flex" href="/contact">
            {t("ctaButton")} →
          </Link>
        </div>
      </section>
    </>
  );
}
