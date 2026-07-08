import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServicesTimeline } from "@/components/home/ServicesTimeline";
import type { Service } from "@/lib/cms/types";

type Props = {
  title: string;
  subtitle?: string;
  services: Service[];
};

export function ServicesSection({ title, subtitle, services }: Props) {
  if (services.length === 0) return null;

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mx-section-title">{title}</h2>
            {subtitle ? (
              <p className="mx-section-subtitle mx-auto mt-4">{subtitle}</p>
            ) : null}
          </div>
        </RevealOnScroll>

        <ServicesTimeline services={services} />
      </div>
    </section>
  );
}
