import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getBlogPosts } from "@/lib/cms";
import type { BlogPost } from "@/lib/cms/types";
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
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-midex-gray/65">
      <span className="rounded-full bg-midex-surface px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-midex-blue">
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

function FeaturedPost({
  post,
  readLabel,
  readPostLabel,
}: {
  post: BlogPost;
  readLabel: string;
  readPostLabel: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl border border-midex-line bg-white shadow-md no-underline transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/45 hover:shadow-xl sm:rounded-2xl lg:rounded-3xl"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-card min-h-0 lg:aspect-auto lg:min-h-[340px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 640px"
            priority
          />
        </div>
        <div className="flex flex-col justify-center p-4 sm:p-8 lg:p-10">
          <PostMeta
            date={post.date}
            category={post.category}
            readTime={post.readTime}
            readLabel={readLabel}
          />
          <h3 className="mt-3 font-display text-lg font-bold leading-tight text-midex-navy transition-colors group-hover:text-midex-blue sm:mt-4 sm:text-3xl">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-midex-gray/75 sm:mt-4 sm:line-clamp-3 sm:text-base">
            {post.excerpt}
          </p>
          <span className="mx-link-arrow mt-4 text-sm sm:mt-6">
            {readPostLabel}
            <span className="mx-arrow">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function PostCard({
  post,
  readLabel,
}: {
  post: BlogPost;
  readLabel: string;
}) {
  return (
    <Link
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
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-6">
        <PostMeta
          date={post.date}
          category={post.category}
          readTime={post.readTime}
          readLabel={readLabel}
        />
        <h3 className="mt-2 font-display text-base font-bold leading-snug text-midex-navy transition-colors group-hover:text-midex-blue sm:mt-3 sm:text-lg">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-midex-gray/70">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

type Props = {
  locale: Locale;
  title?: string;
  subtitle?: string;
};

export async function NewsSection({ locale, title: titleProp, subtitle: subtitleProp }: Props) {
  const t = await getTranslations("home");
  const tb = await getTranslations("blog");
  const posts = (await getBlogPosts(locale)).slice(0, 4);

  if (posts.length === 0) return null;

  const title = titleProp?.trim() || t("blogTitle");
  const subtitle = subtitleProp?.trim() || t("blogSubtitle");

  const [featured, ...rest] = posts;

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-6 flex flex-col gap-4 sm:mb-10 sm:gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="mx-section-title">{title}</h2>
              <p className="mt-3 text-base leading-relaxed text-midex-gray/75">
                {subtitle}
              </p>
            </div>
            <Link href="/blog" className="mx-link-arrow shrink-0 text-sm">
              {t("viewAllArticles")}
              <span className="mx-arrow">→</span>
            </Link>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <FeaturedPost
            post={featured}
            readLabel={tb("minRead")}
            readPostLabel={tb("readPost")}
          />
        </RevealOnScroll>

        {rest.length > 0 && (
          <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {rest.map((post, index) => (
              <RevealOnScroll key={post.slug} delay={(index + 1) * 80}>
                <PostCard post={post} readLabel={tb("minRead")} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
