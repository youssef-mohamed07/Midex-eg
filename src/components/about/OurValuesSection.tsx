import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getLocale } from "next-intl/server";
import { getCompanyValues } from "@/lib/cms";
import { pick } from "@/lib/cms/section-resolve";
import { resolveImageSrc } from "@/lib/cms/images";
import {
  OUR_STANDARDS_IMAGE_BY_KEY,
  resolveOurStandardsImage,
} from "@/lib/content/our-standards-images";
import type { CompanyValue } from "@/lib/cms/types";
import type { Locale } from "@/i18n/routing";

const valueKeys = ["value1", "value2", "value3", "value4", "value5", "value6"] as const;

const VALUE_IMAGE_FALLBACKS = OUR_STANDARDS_IMAGE_BY_KEY;

type Props = {
  title: string;
  subtitle: string;
  items?: CompanyValue[];
};

export async function OurValuesSection({ title, subtitle, items: itemsProp }: Props) {
  const t = await getTranslations("about");
  const locale = (await getLocale()) as Locale;
  const companyValues = itemsProp ?? (await getCompanyValues(locale));

  const sourceKeys =
    companyValues.length > 0
      ? companyValues.map((item, index) => item.id || valueKeys[index] || `value-${index + 1}`)
      : [...valueKeys];
  const values = sourceKeys.map((key, index) => {
    const cms = companyValues[index];
    const cmsId = (cms?.id ?? "").toLowerCase();
    const local =
      resolveOurStandardsImage(cmsId, index) ??
      resolveOurStandardsImage(key, index) ??
      VALUE_IMAGE_FALLBACKS[key];
    return {
      id: cms?.id ?? key,
      // Always prefer the shared Our Standards photography set.
      image: local ?? resolveImageSrc(cms?.image) ?? "/images/hero/slide-1.png",
      alt: cms?.alt ?? pick(cms?.title, valueKeys[index] ? t(`${valueKeys[index]}Title`) : ""),
      step: String(index + 1).padStart(2, "0"),
      title: pick(cms?.title, valueKeys[index] ? t(`${valueKeys[index]}Title`) : ""),
      text: pick(cms?.text, valueKeys[index] ? t(`${valueKeys[index]}Text`) : ""),
    };
  });

  return (
    <section className="mx-section--tight">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mb-6 flex flex-col gap-3 border-b border-midex-line/60 pb-6 sm:mb-8 sm:pb-7 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="max-w-lg">
              <h2 className="mx-section-title mt-3">{title}</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-midex-gray/75 sm:text-base lg:text-end">
              {subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {values.map((value, index) => (
            <RevealOnScroll key={value.id} delay={index * 35}>
              <article className="group relative min-h-[15.5rem] overflow-hidden rounded-2xl border border-midex-line/50 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-midex-mint/40 hover:shadow-lg sm:min-h-[16.5rem]">
                <Image
                  src={value.image}
                  alt={value.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-midex-navy/15" aria-hidden />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-midex-navy via-midex-navy/60 to-midex-navy/15"
                  aria-hidden
                />
                <span className="absolute start-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 font-display text-[11px] font-bold tabular-nums text-midex-navy shadow-sm backdrop-blur-sm sm:h-9 sm:w-9 sm:text-xs">
                  {value.step}
                </span>
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                  <h3 className="font-display text-base font-bold leading-snug text-white sm:text-lg">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/78">
                    {value.text}
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
