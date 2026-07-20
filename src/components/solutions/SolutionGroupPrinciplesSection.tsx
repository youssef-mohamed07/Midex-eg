import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { SolutionGroupPrinciplesContent } from "@/lib/cms/types";
import { resolveOurStandardsImage } from "@/lib/content/our-standards-images";
import {
  getSolutionPrincipleHref,
  PRODUCT_LINKED_PRINCIPLE_IDS,
} from "@/lib/content/solution-principle-links";

type Props = {
  content: SolutionGroupPrinciplesContent;
};

function resolvePrincipleCardImage(
  item: SolutionGroupPrinciplesContent["items"][number],
  index: number,
  items: SolutionGroupPrinciplesContent["items"],
): string {
  // Keep product-technology cards (RO / EDI / sanitization, etc.) untouched.
  const isProductGrid = items.some((entry) =>
    PRODUCT_LINKED_PRINCIPLE_IDS.has(entry.id),
  );
  if (isProductGrid) return item.image;

  // Same Our Standards photography on every standards-style principles grid.
  return resolveOurStandardsImage(item.id, index) ?? item.image;
}

export async function SolutionGroupPrinciplesSection({ content }: Props) {
  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-6 flex flex-col gap-3 border-b border-midex-line/60 pb-6 sm:mb-8 sm:pb-7 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="max-w-lg">
              <h2 className="mx-section-title mt-3">{content.title}</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-midex-gray/75 sm:text-base lg:text-end">
              {content.intro}
            </p>
          </div>
        </RevealOnScroll>

        <div
          className={`grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 ${
            content.items.length >= 6 ? "lg:grid-cols-3" : ""
          }`}
        >
          {content.items.map((item, index) => {
            const href = item.href?.trim() || getSolutionPrincipleHref(item.id);
            const image = resolvePrincipleCardImage(item, index, content.items);
            const card = (
              <>
                <Image
                  src={image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  sizes={
                    content.items.length >= 6
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      : "(max-width: 640px) 100vw, 50vw"
                  }
                />
                <div className="absolute inset-0 bg-midex-navy/15" aria-hidden />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-midex-navy via-midex-navy/60 to-midex-navy/15"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                  <h3 className="font-display text-base font-bold leading-snug text-white sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-white/78">
                    {item.text}
                  </p>
                </div>
              </>
            );

            return (
              <RevealOnScroll key={item.id} delay={index * 35}>
                {href ? (
                  <Link
                    href={href}
                    className="group relative block min-h-[15.5rem] overflow-hidden rounded-2xl border border-midex-line/50 no-underline shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-midex-mint/40 hover:shadow-lg sm:min-h-[16.5rem]"
                  >
                    {card}
                  </Link>
                ) : (
                  <article className="group relative min-h-[15.5rem] overflow-hidden rounded-2xl border border-midex-line/50 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-midex-mint/40 hover:shadow-lg sm:min-h-[16.5rem]">
                    {card}
                  </article>
                )}
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
