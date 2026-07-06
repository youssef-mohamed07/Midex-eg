import { getLocale, getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HomeSolutionsAccordion } from "@/components/home/HomeSolutionsAccordion";
import { getSolutionGroupCards } from "@/lib/cms";
import type { HomeSolutionCard } from "@/components/home/HomeSolutionsAccordion";
import { type Locale } from "@/i18n/routing";

export async function EngineeringCapabilitiesSection({
  cards: cardsProp,
}: {
  cards?: HomeSolutionCard[];
} = {}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const ts = await getTranslations("solutions");
  const cards = cardsProp ?? (await getSolutionGroupCards(locale));

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-eyebrow mx-eyebrow--center">Midex</span>
            <h2 className="mx-section-title mt-4">{t("capabilitiesTitle")}</h2>
            <p className="mx-section-subtitle mx-auto mt-4">{t("capabilitiesSubtitle")}</p>
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
