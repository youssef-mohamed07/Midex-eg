import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getLocalizedNewsItems } from "@/content/i18n";
import { type Locale } from "@/i18n/routing";

type NewsItem = {
  title: string;
  date: string;
  excerpt: string;
  image: string;
};

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-midex-navy/8 bg-white shadow-sm transition-all duration-300 hover:border-midex-mint/35 hover:shadow-md">
      <div className="relative flex h-28 items-center justify-center bg-midex-surface/80 p-4 sm:h-32">
        <Image
          src={item.image}
          alt={item.title}
          width={240}
          height={120}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <time className="text-[10px] font-semibold uppercase tracking-wider text-midex-blue">
          {item.date}
        </time>
        <h3 className="mt-1.5 line-clamp-2 font-display text-sm font-bold leading-snug text-midex-navy sm:text-[15px]">
          {item.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-midex-gray/70">
          {item.excerpt}
        </p>
      </div>
    </article>
  );
}

type Props = {
  locale: Locale;
};

export async function NewsSection({ locale }: Props) {
  const t = await getTranslations("home");
  const newsItems = getLocalizedNewsItems(locale).slice(0, 6);

  if (newsItems.length === 0) return null;

  return (
    <section className="mx-section bg-midex-surface/50">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-8 text-center">
            <span className="mx-badge mb-3">Midex</span>
            <h2 className="mx-section-title text-midex-navy">{t("newsTitle")}</h2>
            <p className="mx-section-subtitle mx-auto mt-3 text-midex-gray/80">
              {t("newsSubtitle")}
            </p>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-midex-mint to-midex-blue" />
          </div>
        </RevealOnScroll>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <RevealOnScroll key={`${item.title}-${item.date}`}>
              <NewsCard item={item} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
