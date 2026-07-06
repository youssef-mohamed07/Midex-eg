import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionBreadcrumbs } from "@/components/solutions/SolutionBreadcrumbs";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import { FaqSection } from "@/components/home/FaqSection";
import { HomeQuoteFormSection } from "@/components/home/HomeQuoteFormSection";
import {
  getLocalizedSolutionChild,
  getLocalizedSolutionChildPage,
  getLocalizedSolutionGroup,
  getLocalizedSolutionGroupFaq,
  getLocalizedSolutionGroupHighlights,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import { getQuoteUrl } from "@/content/products";
import { SolutionChildOverviewSection } from "@/components/solutions/SolutionChildOverviewSection";
import { SolutionChildRelatedSection } from "@/components/solutions/SolutionChildRelatedSection";
import { SolutionGroupFaqSection } from "@/components/solutions/SolutionGroupFaqSection";
import { SolutionGroupPrinciplesSection } from "@/components/solutions/SolutionGroupPrinciplesSection";
import { SolutionGroupWorkflowSection } from "@/components/solutions/SolutionGroupWorkflowSection";
import { SolutionPageTailSections } from "@/components/solutions/SolutionPageTailSections";

type Props = { slug: string; childSlug: string };

export async function SolutionChildPageContent({ slug, childSlug }: Props) {
  const locale = (await getLocale()) as Locale;
  const group = getLocalizedSolutionGroup(slug, locale);
  const child = getLocalizedSolutionChild(slug, childSlug, locale);
  if (!group || !child) notFound();

  const page = getLocalizedSolutionChildPage(slug, childSlug, locale);
  const t = await getTranslations("solutions");
  const tc = await getTranslations("products");
  const groupName = getGroupLabel(group);
  const related = group.children.filter((item) => item.slug !== child.slug);

  if (page) {
    return (
      <>
        <PageHero
          badge={false}
          eyebrow={groupName}
          title={page.heroTitle}
          subtitle={page.heroSubtitle}
          compact
          breadcrumbs={
            <SolutionBreadcrumbs
              light
              items={[
                { label: t("title"), href: "/solutions" },
                { label: groupName, href: `/solutions/group/${group.slug}` },
                { label: child.label },
              ]}
            />
          }
          media={
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/20 sm:aspect-[16/11]">
              <Image
                src={child.image}
                alt={child.label}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          }
        >
          <div className="mt-6">
            <Link
              className="group mx-btn mx-btn-primary border-white/20 bg-white text-midex-navy hover:bg-midex-mint hover:text-midex-navy"
              href={getQuoteUrl(child.label)}
            >
              {page.heroCtaLabel}
              <span className="mx-arrow">→</span>
            </Link>
          </div>
        </PageHero>

        <SolutionChildOverviewSection
          title={page.overviewTitle}
          intro={page.overviewIntro}
          items={page.overviewItems}
        />

        <SolutionGroupPrinciplesSection content={page.principles} />

        <SolutionGroupWorkflowSection content={page.workflow} />

        <SolutionChildRelatedSection
          title={page.relatedSectionTitle}
          groupSlug={group.slug}
          services={related}
        />

        <SolutionPageTailSections />

        <HomeQuoteFormSection />

        <SolutionGroupFaqSection content={page.faq} />
      </>
    );
  }

  const highlights = getLocalizedSolutionGroupHighlights(group.slug, locale);
  const faq = getLocalizedSolutionGroupFaq(group.slug, locale);

  return (
    <>
      <PageHero
        badge={false}
        eyebrow={groupName}
        title={child.label}
        subtitle={child.excerpt}
        compact
        breadcrumbs={
          <SolutionBreadcrumbs
            light
            items={[
              { label: t("title"), href: "/solutions" },
              { label: groupName, href: `/solutions/group/${group.slug}` },
              { label: child.label },
            ]}
          />
        }
        media={
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/20 sm:aspect-[16/11]">
            <Image
              src={child.image}
              alt={child.label}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        }
      />

      <section className="mx-section">
        <div className="mx-container grid gap-8 sm:gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">
              {t("introduction")}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-midex-gray/85 sm:text-lg">
              {t("childIntro", { service: child.label })}
            </p>

            {highlights.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display text-xl font-bold text-midex-navy">
                  {t("capabilities")}
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-midex-navy/8 bg-midex-surface px-4 py-3 text-sm text-midex-gray/85"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-midex-mint" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <Link className="mx-btn mx-btn-primary" href={getQuoteUrl(child.label)}>
                {tc("requestQuote")} →
              </Link>
              <Link
                className="mx-btn border border-midex-navy/15 bg-white text-midex-navy hover:bg-midex-surface"
                href="/contact"
              >
                {t("contactUs")}
              </Link>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-midex-navy/8 bg-midex-surface p-6">
              <h3 className="font-display text-lg font-bold text-midex-navy">
                {t("relatedServices")}
              </h3>
              <ul className="mt-4 space-y-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/solutions/group/${group.slug}/${item.slug}`}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-midex-gray/85 transition hover:bg-white hover:text-midex-blue"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-midex-mint/30 bg-gradient-to-br from-midex-mint/15 to-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-midex-blue">
                {t("groupLabel")}
              </p>
              <p className="mt-2 font-display text-xl font-bold text-midex-navy">
                {groupName}
              </p>
              <Link
                href={`/solutions/group/${group.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-midex-blue hover:underline"
              >
                {t("browseGroup")} →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <SolutionPageTailSections />

      <HomeQuoteFormSection />

      {faq ? <SolutionGroupFaqSection content={faq} /> : <FaqSection />}
    </>
  );
}
