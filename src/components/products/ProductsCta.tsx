import { Link } from "@/i18n/navigation";
import { PageCtaCard } from "@/components/sections/PageCtaCard";
import { getQuoteUrl } from "@/lib/cms";
import type { PageCtaContent } from "@/lib/cms/types";

type Props = {
  content: PageCtaContent & { title: string; text: string };
};

export async function ProductsCta({ content }: Props) {
  return (
    <section className="mx-section--tight">
      <div className="mx-container">
        <PageCtaCard>
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-start">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                {content.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/70">{content.text}</p>
            </div>
            <Link
              className="group mx-btn mx-btn-mint shrink-0"
              href={content.primaryCtaHref || getQuoteUrl()}
            >
              {content.primaryCta}
              <span className="mx-arrow">→</span>
            </Link>
          </div>
        </PageCtaCard>
      </div>
    </section>
  );
}
