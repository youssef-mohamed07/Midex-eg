import { getLocale, getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HomeSolutionsAccordion } from "@/components/home/HomeSolutionsAccordion";
import { buildEngineeringCapabilityCards } from "@/lib/content/engineering-capabilities";
import { getSolutionGroups } from "@/lib/cms";
import { type Locale } from "@/i18n/routing";

export async function EngineeringCapabilitiesSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const ts = await getTranslations("solutions");
  const groups = await getSolutionGroups(locale);
  const cards = buildEngineeringCapabilityCards(t, groups);

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="max-w-3xl">
            <h2 className="mx-section-title">{t("capabilitiesTitle")}</h2>
            <p className="mx-section-subtitle mt-4">{t("capabilitiesSubtitle")}</p>
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
