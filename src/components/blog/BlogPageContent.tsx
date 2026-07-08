import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { getBlogPosts } from "@/lib/cms";
import { type Locale } from "@/i18n/routing";

function PostMeta({
  date,
  category,
  readTime,
  readLabel,
  light = false,
}: {
  date: string;
  category: string;
  readTime: number;
  readLabel: string;
  light?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium ${
        light ? "text-white/75" : "text-midex-gray/65"
      }`}
    >
      <span
        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
          light ? "bg-white/15 text-midex-mint" : "bg-midex-surface text-midex-blue"
        }`}
      >
        {category}
      </span>
      <time>{date}</time>
      <span aria-hidden>·</span>
      <span>
        {readTime} {readLabel}
      </span>
    </div>
  );
}

export async function BlogPageContent() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("blog");
  const blogPosts = await getBlogPosts(locale);

  if (blogPosts.length === 0) return null;

  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")}compact />

      <section className="mx-section">
        <div className="mx-container">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-midex-blue">
            {t("featured")}
          </p>

          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-4 block overflow-hidden rounded-xl border border-midex-line bg-white shadow-lg no-underline transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/40 hover:shadow-xl sm:mt-5 sm:rounded-2xl lg:mt-6 lg:rounded-3xl"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-card min-h-0 lg:aspect-auto lg:min-h-[380px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 640px"
                  priority
                />
              </div>

              <div className="flex flex-col justify-center p-4 sm:p-8 lg:p-10 xl:p-12">
                <PostMeta
                  date={featured.date}
                  category={featured.category}
                  readTime={featured.readTime}
                  readLabel={t("minRead")}
                />
                <h2 className="mt-3 font-display text-lg font-bold leading-tight text-midex-navy transition-colors group-hover:text-midex-blue sm:mt-4 sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-midex-gray/75 sm:mt-4 sm:line-clamp-3 sm:text-base">
                  {featured.excerpt}
                </p>
                <span className="mx-link-arrow mt-4 text-sm sm:mt-6">
                  {t("readPost")}
                  <span className="mx-arrow">→</span>
                </span>
              </div>
            </div>
          </Link>

          {rest.length > 0 && (
            <>
              <div className="mx-hairline my-14 lg:my-16" />

              <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">
                {t("latestPosts")}
              </h2>

              <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-midex-line bg-white no-underline shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/45 hover:shadow-lg sm:rounded-2xl"
                  >
                    <div className="relative aspect-card overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-600 group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-midex-navy/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="flex flex-1 flex-col p-3.5 sm:p-6">
                      <PostMeta
                        date={post.date}
                        category={post.category}
                        readTime={post.readTime}
                        readLabel={t("minRead")}
                      />
                      <h3 className="mt-2 font-display text-base font-bold leading-snug text-midex-navy transition-colors group-hover:text-midex-blue sm:mt-3 sm:text-lg">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-midex-gray/70">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mx-section--tight">
        <div className="mx-container">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-midex-line bg-white p-8 text-center shadow-sm sm:p-10 lg:flex-row lg:justify-between lg:text-start">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold text-midex-navy">{t("ctaTitle")}</h2>
              <p className="mt-3 text-base leading-relaxed text-midex-gray/75">{t("ctaText")}</p>
            </div>
            <Link className="group mx-btn mx-btn-primary shrink-0" href="/contact">
              {t("ctaButton")}
              <span className="mx-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
