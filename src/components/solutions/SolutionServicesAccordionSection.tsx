import { getLocale, getTranslations } from "next-intl/server";
import { HomeSolutionsAccordion } from "@/components/home/HomeSolutionsAccordion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getSolutionGroup, getSolutionServiceCards } from "@/lib/cms";
import { type Locale } from "@/i18n/routing";

type Props = {
  groupSlug: string;
};

export async function SolutionServicesAccordionSection({ groupSlug }: Props) {
  const locale = (await getLocale()) as Locale;
  const [group, cards] = await Promise.all([
    getSolutionGroup(groupSlug, locale),
    getSolutionServiceCards(groupSlug, locale),
  ]);

  if (!group || cards.length === 0) return null;

  const t = await getTranslations("solutions");
  const sectionTitle = group.servicesSectionTitle ?? t("groupServicesTitle");
  const sectionIntro = group.servicesSectionIntro ?? t("groupServicesSubtitle");

  return (
    <section className="mx-section--tight">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
          <h2 className="mx-section-title">{sectionTitle}</h2>
            <p className="mx-section-subtitle mx-auto mt-4">{sectionIntro}</p>
          </div>
        </RevealOnScroll>

        <HomeSolutionsAccordion
          cards={cards}
          exploreLabel={t("viewSolution")}
          servicesLabel={t("services")}
        />
      </div>
    </section>
  );
}
