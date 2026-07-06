import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  deliveryStepImages,
  deliveryStepKeys,
} from "@/components/solutions/solution-delivery-steps";

export async function SolutionStepsSection() {
  const t = await getTranslations("solutions");

  const steps = deliveryStepKeys.map((key) => ({
    key,
    title: t(`${key}Title`),
    text: t(`${key}Text`),
    image: deliveryStepImages[key],
  }));

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-6 flex flex-col gap-3 border-b border-midex-line/60 pb-6 sm:mb-8 sm:pb-7 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="max-w-lg">
              <span className="mx-eyebrow">Midex</span>
              <h2 className="mx-section-title mt-3">{t("stepsGridTitle")}</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-midex-gray/75 sm:text-base lg:text-end">
              {t("stepsGridSubtitle")}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {steps.map((item, index) => (
            <RevealOnScroll key={item.key} delay={index * 35}>
              <article className="group relative min-h-[15.5rem] overflow-hidden rounded-2xl border border-midex-line/50 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-midex-mint/40 hover:shadow-lg sm:min-h-[16.5rem]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-midex-navy/15" aria-hidden />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-midex-navy via-midex-navy/60 to-midex-navy/15"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                  <h3 className="font-display text-base font-bold leading-snug text-white sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/78">
                    {item.text}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
