import { getLocale, getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getGroupLabel } from "@/components/solutions/solution-labels";
import {
  getLocalizedSolutionGroupHighlights,
  getLocalizedSolutionGroups,
} from "@/content/i18n";
import { type Locale } from "@/i18n/routing";
import {
  HomeSolutionsAccordion,
  type HomeSolutionCard,
} from "@/components/home/HomeSolutionsAccordion";

export async function HomeSolutionsSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const ts = await getTranslations("solutions");
  const tn = await getTranslations("nav");
  const groups = getLocalizedSolutionGroups(locale);

  if (groups.length === 0) return null;

  const cards: HomeSolutionCard[] = groups.map((group) => ({
    slug: group.slug,
    label: getGroupLabel(group, tn),
    description: group.description,
    image: group.image,
    href: `/solutions/group/${group.slug}`,
    tags: getLocalizedSolutionGroupHighlights(group.slug, locale).slice(0, 2),
    serviceCount: group.children.length,
  }));

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="max-w-2xl">
            <span className="mx-eyebrow">Midex</span>
            <h2 className="mx-section-title mt-4">{t("solutionsTitle")}</h2>
            <p className="mx-section-subtitle">{t("solutionsSubtitle")}</p>
          </div>
        </RevealOnScroll>

        <HomeSolutionsAccordion
          cards={cards}
          exploreLabel={t("exploreSolution")}
          servicesLabel={ts("services")}
        />
      </div>
    </section>
  );
}
