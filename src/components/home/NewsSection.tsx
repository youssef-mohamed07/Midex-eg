import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getLocalizedBlogPosts } from "@/content/i18n";
import { type BlogPost } from "@/content/site";
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
      className="group block overflow-hidden rounded-3xl border border-midex-line bg-white shadow-md no-underline transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/45 hover:shadow-xl"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[16/10] min-h-[220px] lg:aspect-auto lg:min-h-[340px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 640px"
            priority
          />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-8 lg:p-10">
          <PostMeta
            date={post.date}
            category={post.category}
            readTime={post.readTime}
            readLabel={readLabel}
          />
          <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-midex-navy transition-colors group-hover:text-midex-blue sm:text-3xl">
            {post.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-base leading-relaxed text-midex-gray/75">
            {post.excerpt}
          </p>
          <span className="mx-link-arrow mt-6 text-sm">
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
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-midex-line bg-white no-underline shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-midex-mint/45 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-600 group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <PostMeta
          date={post.date}
          category={post.category}
          readTime={post.readTime}
          readLabel={readLabel}
        />
        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-midex-navy transition-colors group-hover:text-midex-blue">
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
};

export async function NewsSection({ locale }: Props) {
  const t = await getTranslations("home");
  const tb = await getTranslations("blog");
  const posts = getLocalizedBlogPosts(locale).slice(0, 4);

  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="mx-section bg-white">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="mx-eyebrow">Midex</span>
              <h2 className="mx-section-title mt-4">{t("blogTitle")}</h2>
              <p className="mt-3 text-base leading-relaxed text-midex-gray/75">
                {t("blogSubtitle")}
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
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
