import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { PageHeroImage } from "@/components/cms/PageHeroImage";
import { SolutionBreadcrumbs } from "@/components/solutions/SolutionBreadcrumbs";
import {
  SolutionGroupCard,
} from "@/components/solutions/SolutionCards";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { HomeQuoteFormSection } from "@/components/home/HomeQuoteFormSection";
import { SolutionsCta } from "@/components/solutions/SolutionsCta";
import { SolutionGroupFaqSection } from "@/components/solutions/SolutionGroupFaqSection";
import { SolutionGroupPrinciplesSection } from "@/components/solutions/SolutionGroupPrinciplesSection";
import { SolutionGroupWorkflowSection } from "@/components/solutions/SolutionGroupWorkflowSection";
import { SolutionPageTailSections } from "@/components/solutions/SolutionPageTailSections";
import { SolutionServicesAccordionSection } from "@/components/solutions/SolutionServicesAccordionSection";
import { SolutionTimelineSection } from "@/components/solutions/SolutionTimelineSection";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import {
  getQuoteUrl,
  getSolutionGroup,
  getSolutionGroupFaq,
  getSolutionGroupHighlights,
  getSolutionGroupPrinciples,
  getSolutionGroups,
  getSolutionGroupWorkflow,
  getSolutionsPageContent,
} from "@/lib/cms";
import { resolvePageCta, pick } from "@/lib/cms/section-resolve";
import { type Locale } from "@/i18n/routing";

type Props = { slug: string };

export async function SolutionGroupPageContent({ slug }: Props) {
  const locale = (await getLocale()) as Locale;
  const group = await getSolutionGroup(slug, locale);
  if (!group) notFound();

  const t = await getTranslations("solutions");
  const tc = await getTranslations("products");
  const label = getGroupLabel(group);
  const [highlights, principles, workflow, faq, allGroups, solutionsPage] = await Promise.all([
    getSolutionGroupHighlights(group.slug, locale),
    getSolutionGroupPrinciples(group.slug, locale),
    getSolutionGroupWorkflow(group.slug, locale),
    getSolutionGroupFaq(group.slug, locale),
    getSolutionGroups(locale),
    getSolutionsPageContent(locale),
  ]);
  const otherGroups = allGroups.filter((item) => item.slug !== group.slug);
  const cta = resolvePageCta(group.cta ?? solutionsPage.cta, {
    title: t("ctaTitle"),
    text: t("ctaText"),
    primaryCta: tc("requestQuote"),
    primaryCtaHref: getQuoteUrl(label),
  });

  const importanceTitle = pick(group.importanceTitle, t("groupImportanceTitle"));
  const otherGroupsTitle = pick(group.otherGroupsTitle, t("otherGroups"));
  const heroCtaLabel = pick(group.heroCtaLabel, tc("requestQuote"));

  return (
    <>
      <PageHero
        title={group.heroTitle ?? label}
        subtitle={group.description}
        compact
        media={<PageHeroImage src={group.image} alt={label} priority />}
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
        <div className="mt-6">
          <Link
            className="group mx-btn mx-btn-primary border-white/20 bg-white text-midex-navy hover:bg-midex-mint hover:text-midex-navy"
            href={getQuoteUrl(label)}
          >
            {heroCtaLabel}
            <span className="mx-arrow">→</span>
          </Link>
        </div>
      </PageHero>

      {!principles && (
        <section className="mx-section">
          <div className="mx-container">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:items-center lg:gap-14">
              <div>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-midex-navy sm:text-3xl">
                  {importanceTitle}
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

      {workflow ? (
        <SolutionGroupWorkflowSection content={workflow} />
      ) : (
        <SolutionTimelineSection
          title={t("stepsGridTitle")}
          subtitle={t("stepsGridSubtitle")}
          steps={solutionsPage.timelineSection?.steps}
        />
      )}

      <SolutionPageTailSections />

      {otherGroups.length > 0 && (
        <section className="mx-section--tight">
          <div className="mx-container">
            <div className="mb-8 max-w-2xl">
              <h2 className="mx-section-title">{otherGroupsTitle}</h2>
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

      <HomeQuoteFormSection />

      {faq ? <SolutionGroupFaqSection content={faq} /> : <HomeFaqSection />}

      <SolutionsCta content={cta} quoteSubject={label} />
    </>
  );
}
