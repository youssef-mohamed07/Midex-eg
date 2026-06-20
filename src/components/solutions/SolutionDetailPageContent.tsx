import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionBreadcrumbs } from "@/components/solutions/SolutionBreadcrumbs";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import {
  getLocalizedSolution,
  getLocalizedSolutionGroup,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import { getQuoteUrl } from "@/content/products";

type Props = { slug: string };

export async function SolutionDetailPageContent({ slug }: Props) {
  const locale = (await getLocale()) as Locale;
  const solution = getLocalizedSolution(slug, locale);
  if (!solution) notFound();

  const group = getLocalizedSolutionGroup(solution.group, locale);
  const t = await getTranslations("solutions");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("products");
  const groupName = group ? getGroupLabel(group, tn) : solution.group;

  return (
    <>
      <PageHero
        badge={false}
        eyebrow={group ? groupName : undefined}
        title={solution.title}
        subtitle={solution.excerpt}
        breadcrumbs={
          <SolutionBreadcrumbs
            light
            items={[
              { label: t("title"), href: "/solutions" },
              ...(group
                ? [{ label: groupName, href: `/solutions/group/${group.slug}` }]
                : []),
              { label: solution.title },
            ]}
          />
        }
        media={
          solution.image ? (
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/20">
              <Image
                src={solution.image}
                alt={solution.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          ) : undefined
        }
      />

      <section className="mx-section bg-white">
        <div className="mx-container max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">
            {t("introduction")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-midex-gray/85">{solution.intro}</p>

          {solution.highlights && solution.highlights.length > 0 && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {solution.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-midex-navy/8 bg-midex-surface px-4 py-3 text-sm text-midex-gray/85"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-midex-mint" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link className="mx-btn mx-btn-primary" href={getQuoteUrl(solution.title)}>
              {tc("requestQuote")} →
            </Link>
            <Link className="mx-btn border border-midex-navy/15 bg-white text-midex-navy hover:bg-midex-surface" href="/solutions">
              {t("allGroups")} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
