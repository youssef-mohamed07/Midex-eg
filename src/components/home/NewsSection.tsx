import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getBlogPosts, getNewsItems } from "@/lib/cms";
import type { BlogPost, NewsItem } from "@/lib/cms/types";
import { type Locale } from "@/i18n/routing";

type NewsCard = {
  key: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  href?: string;
  category?: string;
  readTime?: number;
};

function toNewsCardsFromItems(items: NewsItem[]): NewsCard[] {
  return items.map((item, index) => ({
    key: `news-${index}-${item.title}`,
    title: item.title,
    date: item.date,
    excerpt: item.excerpt,
    image: item.image,
  }));
}

function toNewsCardsFromPosts(posts: BlogPost[]): NewsCard[] {
  return posts.map((post) => ({
    key: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    image: post.image,
    href: `/blog/${post.slug}`,
    category: post.category,
    readTime: post.readTime,
  }));
}

function PostMeta({
  date,
  category,
  readTime,
  readLabel,
}: {
  date: string;
  category?: string;
  readTime?: number;
  readLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-midex-gray/65">
      {category ? (
        <span className="rounded-full bg-midex-surface px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-midex-blue">
          {category}
        </span>
      ) : null}
      {date ? <time>{date}</time> : null}
      {typeof readTime === "number" ? (
        <>
          <span aria-hidden>·</span>
          <span>
            {readTime} {readLabel}
          </span>
        </>
      ) : null}
    </div>
  );
}

function FeaturedCard({
  item,
  readLabel,
  readPostLabel,
}: {
  item: NewsCard;
  readLabel: string;
  readPostLabel: string;
}) {
  const inner = (
    <div className="grid lg:grid-cols-2">
      <div className="relative aspect-card min-h-0 lg:aspect-auto lg:min-h-[340px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 640px"
          priority
        />
      </div>
      <div className="flex flex-col justify-center p-4 sm:p-8 lg:p-10">
        <PostMeta
          date={item.date}
          category={item.category}
          readTime={item.readTime}
          readLabel={readLabel}
        />
        <h3 className="mt-3 font-display text-lg font-bold leading-tight text-midex-navy transition-colors group-hover:text-midex-blue sm:mt-4 sm:text-3xl">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-midex-gray/75 sm:mt-4 sm:line-clamp-3 sm:text-base">
          {item.excerpt}
        </p>
        {item.href ? (
          <span className="mx-link-arrow mt-4 text-sm sm:mt-6">
            {readPostLabel}
            <span className="mx-arrow">→</span>
          </span>
        ) : null}
      </div>
    </div>
  );

  const className =
    "group block overflow-hidden rounded-xl border border-midex-line bg-white shadow-md no-underline transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/45 hover:shadow-xl sm:rounded-2xl lg:rounded-3xl";

  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

function Card({ item, readLabel }: { item: NewsCard; readLabel: string }) {
  const inner = (
    <>
      <div className="relative aspect-card overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-600 group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-6">
        <PostMeta
          date={item.date}
          category={item.category}
          readTime={item.readTime}
          readLabel={readLabel}
        />
        <h3 className="mt-2 font-display text-base font-bold leading-snug text-midex-navy transition-colors group-hover:text-midex-blue sm:mt-3 sm:text-lg">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-midex-gray/70">
          {item.excerpt}
        </p>
      </div>
    </>
  );

  const className =
    "group flex h-full flex-col overflow-hidden rounded-xl border border-midex-line bg-white no-underline shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/45 hover:shadow-lg sm:rounded-2xl";

  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {inner}
      </Link>
    );
  }

  return <article className={className}>{inner}</article>;
}

type Props = {
  locale: Locale;
  title?: string;
  subtitle?: string;
  viewAllLabel?: string;
  minReadLabel?: string;
  readPostLabel?: string;
};

/**
 * Prefers Sanity `newsItem` documents. Falls back to latest blog posts when
 * the news collection is empty so the section still works in production.
 */
export async function NewsSection({
  locale,
  title: titleProp,
  subtitle: subtitleProp,
  viewAllLabel: viewAllProp,
  minReadLabel: minReadProp,
  readPostLabel: readPostProp,
}: Props) {
  const t = await getTranslations("home");
  const tb = await getTranslations("blog");
  const newsItems = await getNewsItems(locale);
  const cards =
    newsItems.length > 0
      ? toNewsCardsFromItems(newsItems).slice(0, 4)
      : toNewsCardsFromPosts((await getBlogPosts(locale)).slice(0, 4));

  if (cards.length === 0) return null;

  const title = titleProp?.trim() || t("blogTitle");
  const subtitle = subtitleProp?.trim() || t("blogSubtitle");
  const viewAllLabel = viewAllProp?.trim() || t("viewAllArticles");
  const minReadLabel = minReadProp?.trim() || tb("minRead");
  const readPostLabel = readPostProp?.trim() || tb("readPost");
  const usingBlogFallback = newsItems.length === 0;
  const [featured, ...rest] = cards;

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
            {usingBlogFallback ? (
              <Link href="/blog" className="mx-link-arrow shrink-0 text-sm">
                {viewAllLabel}
                <span className="mx-arrow">→</span>
              </Link>
            ) : null}
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <FeaturedCard
            item={featured}
            readLabel={minReadLabel}
            readPostLabel={readPostLabel}
          />
        </RevealOnScroll>

        {rest.length > 0 && (
          <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {rest.map((item, index) => (
              <RevealOnScroll key={item.key} delay={(index + 1) * 80}>
                <Card item={item} readLabel={minReadLabel} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
