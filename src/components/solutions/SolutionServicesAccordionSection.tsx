import { getLocale, getTranslations } from "next-intl/server";
import { HomeSolutionsAccordion } from "@/components/home/HomeSolutionsAccordion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getLocalizedSolutionServiceCards } from "@/content/i18n";
import { type Locale } from "@/i18n/routing";

type Props = {
  groupSlug: string;
};

export async function SolutionServicesAccordionSection({ groupSlug }: Props) {
  const locale = (await getLocale()) as Locale;
  const cards = getLocalizedSolutionServiceCards(groupSlug, locale);

  if (cards.length === 0) return null;

  const t = await getTranslations("solutions");

  return (
    <section className="mx-section--tight">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
            <h2 className="mx-section-title mt-4">{t("groupServicesTitle")}</h2>
            <p className="mx-section-subtitle mx-auto mt-4">{t("groupServicesSubtitle")}</p>
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
