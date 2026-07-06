import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SolutionServiceCard } from "@/components/solutions/SolutionCards";
import type { SolutionChild } from "@/lib/cms/types";

type Props = {
  title: string;
  groupSlug: string;
  services: SolutionChild[];
};

export async function SolutionChildRelatedSection({ title, groupSlug, services }: Props) {
  const t = await getTranslations("solutions");

  if (services.length === 0) return null;

  return (
    <section className="mx-section--tight">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-8">
            <span className="mx-eyebrow">Midex</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-midex-navy sm:text-3xl">
              {title}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <SolutionServiceCard
              key={service.slug}
              href={`/solutions/group/${groupSlug}/${service.slug}`}
              image={service.image}
              label={service.label}
              excerpt={service.excerpt}
              viewLabel={t("viewSolution")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
