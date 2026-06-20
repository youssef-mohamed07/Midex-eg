import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionBreadcrumbs } from "@/components/solutions/SolutionBreadcrumbs";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import {
  getLocalizedSolutionGroup,
  getLocalizedSolutionGroups,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import { getQuoteUrl } from "@/content/products";

function ChevronRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

type Props = { slug: string };

export async function SolutionGroupPageContent({ slug }: Props) {
  const locale = (await getLocale()) as Locale;
  const group = getLocalizedSolutionGroup(slug, locale);
  if (!group) notFound();

  const t = await getTranslations("solutions");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("products");
  const label = getGroupLabel(group, tn);
  const otherGroups = getLocalizedSolutionGroups(locale).filter(
    (item) => item.slug !== group.slug,
  );

  return (
    <>
      <PageHero
        badge={`${group.children.length} ${t("services")}`}
        title={label}
        subtitle={group.description}
        breadcrumbs={
          <SolutionBreadcrumbs
            light
            items={[
              { label: t("title"), href: "/solutions" },
              { label },
            ]}
          />
        }
        media={
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/20 lg:block">
            <Image
              src={group.image}
              alt={label}
              fill
              className="object-cover"
              sizes="340px"
              priority
            />
          </div>
        }
      />

      <section className="mx-section bg-midex-surface">
        <div className="mx-container">
          <h2 className="font-display text-2xl font-bold text-midex-navy sm:text-3xl">
            {t("groupServicesTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-midex-gray/80">{t("groupServicesSubtitle")}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {group.children.map((child) => (
              <Link
                key={child.slug}
                href={`/solutions/group/${group.slug}/${child.slug}`}
                className="group mx-card overflow-hidden no-underline"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={child.image}
                    alt={child.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midex-navy/80 via-midex-navy/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                      {child.label}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <p className="text-sm leading-relaxed text-midex-gray/75">{child.excerpt}</p>
                  <ChevronRight className="h-5 w-5 shrink-0 text-midex-blue transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-section bg-white">
        <div className="mx-container">
          <h2 className="font-display text-2xl font-bold text-midex-navy">
            {t("otherGroups")}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {otherGroups.map((item) => (
              <Link
                key={item.slug}
                href={`/solutions/group/${item.slug}`}
                className="rounded-xl border border-midex-navy/8 bg-midex-surface p-5 no-underline transition hover:border-midex-mint/50 hover:shadow-md"
              >
                <p className="font-display font-bold text-midex-navy">
                  {getGroupLabel(item, tn)}
                </p>
                <p className="mt-2 text-sm text-midex-gray/70">
                  {item.children.length} {t("services")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-midex-navy mx-mesh-bg py-16">
        <div className="mx-container text-center">
          <h2 className="font-display text-3xl font-bold text-white">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">{t("ctaText")}</p>
          <Link className="mx-btn mx-btn-mint mt-8 inline-flex" href={getQuoteUrl(label)}>
            {tc("requestQuote")} →
          </Link>
        </div>
      </section>
    </>
  );
}
