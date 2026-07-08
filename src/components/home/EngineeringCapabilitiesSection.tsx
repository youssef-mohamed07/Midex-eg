import { getLocale, getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HomeSolutionsAccordion } from "@/components/home/HomeSolutionsAccordion";
import type { EngineeringCapabilityCardContent } from "@/lib/cms/types";
import { buildEngineeringCapabilityCards } from "@/lib/content/engineering-capabilities";
import { getSolutionGroups } from "@/lib/cms";
import { type Locale } from "@/i18n/routing";

export async function EngineeringCapabilitiesSection({
  title,
  subtitle,
  cards,
  id,
}: {
  title: string;
  subtitle: string;
  cards?: EngineeringCapabilityCardContent[];
  id?: string;
}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const ts = await getTranslations("solutions");
  const groups = await getSolutionGroups(locale);
  const capabilityCards = buildEngineeringCapabilityCards(t, groups, cards);

  return (
    <section className="mx-section" id={id}>
      <div className="mx-container">
        <RevealOnScroll>
          <div className="max-w-3xl">
            <h2 className="mx-section-title">{title}</h2>
            <p className="mx-section-subtitle mt-4">{subtitle}</p>
          </div>
        </RevealOnScroll>

        <HomeSolutionsAccordion
          cards={capabilityCards}
          exploreLabel={t("exploreSolution")}
          servicesLabel={ts("services")}
        />
      </div>
    </section>
  );
}
