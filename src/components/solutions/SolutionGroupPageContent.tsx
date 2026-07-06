import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionBreadcrumbs } from "@/components/solutions/SolutionBreadcrumbs";
import {
  SolutionGroupCard,
} from "@/components/solutions/SolutionCards";
import { FaqSection } from "@/components/home/FaqSection";
import { HomeQuoteFormSection } from "@/components/home/HomeQuoteFormSection";
import { SolutionsCta } from "@/components/solutions/SolutionsCta";
import { SolutionGroupFaqSection } from "@/components/solutions/SolutionGroupFaqSection";
import { SolutionGroupPrinciplesSection } from "@/components/solutions/SolutionGroupPrinciplesSection";
import { SolutionGroupWorkflowSection } from "@/components/solutions/SolutionGroupWorkflowSection";
import { SolutionPageTailSections } from "@/components/solutions/SolutionPageTailSections";
import { SolutionServicesAccordionSection } from "@/components/solutions/SolutionServicesAccordionSection";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import {
  getLocalizedSolutionGroup,
  getLocalizedSolutionGroupFaq,
  getLocalizedSolutionGroupHighlights,
  getLocalizedSolutionGroupPrinciples,
  getLocalizedSolutionGroupWorkflow,
  getLocalizedSolutionGroups,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import { getQuoteUrl } from "@/content/products";

type Props = { slug: string };

export async function SolutionGroupPageContent({ slug }: Props) {
  const locale = (await getLocale()) as Locale;
  const group = getLocalizedSolutionGroup(slug, locale);
  if (!group) notFound();

  const t = await getTranslations("solutions");
  const tc = await getTranslations("products");
  const label = getGroupLabel(group);
  const highlights = getLocalizedSolutionGroupHighlights(group.slug, locale);
  const principles = getLocalizedSolutionGroupPrinciples(group.slug, locale);
  const workflow = getLocalizedSolutionGroupWorkflow(group.slug, locale);
  const faq = getLocalizedSolutionGroupFaq(group.slug, locale);
  const otherGroups = getLocalizedSolutionGroups(locale).filter(
    (item) => item.slug !== group.slug,
  );

  return (
    <>
      <PageHero
        eyebrow={`${group.children.length} ${t("services")}`}
        title={group.heroTitle ?? label}
        subtitle={group.description}
        compact
        breadcrumbs={
          <SolutionBreadcrumbs
            light
            items={[
              { label: t("title"), href: "/solutions" },
              { label },
            ]}
          />
        }
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="group mx-btn mx-btn-primary border-white/20 bg-white text-midex-navy hover:bg-midex-mint hover:text-midex-navy"
            href={getQuoteUrl(label)}
          >
            {tc("requestQuote")}
            <span className="mx-arrow">→</span>
          </Link>
          <Link
            className="mx-btn border border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10"
            href="/solutions"
          >
            {t("allGroups")}
          </Link>
        </div>
      </PageHero>

      {!principles && (
        <section className="mx-section">
          <div className="mx-container">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:items-center lg:gap-14">
              <div>
                <span className="mx-eyebrow">Midex</span>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-midex-navy sm:text-3xl">
                  {t("groupImportanceTitle")}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-midex-gray/80 sm:text-lg">
                  {group.intro}
                </p>

                {highlights.length > 0 && (
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-midex-navy/8 bg-midex-surface/60 px-4 py-3 text-sm leading-relaxed text-midex-gray/85"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-midex-mint" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="relative aspect-card-tall overflow-hidden rounded-xl border border-midex-line shadow-lg sm:rounded-2xl sm:aspect-[4/3]">
                <Image
                  src={group.image}
                  alt={label}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  priority
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-midex-navy/35 to-transparent"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <SolutionServicesAccordionSection groupSlug={slug} />

      {principles && <SolutionGroupPrinciplesSection content={principles} />}

      {workflow && <SolutionGroupWorkflowSection content={workflow} />}

      <SolutionPageTailSections />

      <HomeQuoteFormSection />

      {faq ? <SolutionGroupFaqSection content={faq} /> : <FaqSection />}

      {otherGroups.length > 0 && (
        <section className="mx-section--tight">
          <div className="mx-container">
            <div className="mb-8">
              <span className="mx-eyebrow">Midex</span>
              <h2 className="mt-3 font-display text-2xl font-bold text-midex-navy">
                {t("otherGroups")}
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherGroups.map((item, index) => (
                <SolutionGroupCard
                  key={item.slug}
                  href={`/solutions/group/${item.slug}`}
                  image={item.image}
                  label={getGroupLabel(item)}
                  description={item.description}
                  meta={`${item.children.length} ${t("services")}`}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <SolutionsCta quoteSubject={label} />
    </>
  );
}
