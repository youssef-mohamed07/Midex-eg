import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getAboutStandards } from "@/lib/cms";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

type StandardItem = {
  key: string;
  text: string;
  description?: string;
};

type Props = {
  title: string;
  subtitle: string;
  eyebrow?: string;
  footnote?: string;
  items?: StandardItem[];
};

function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"
      />
    </svg>
  );
}

function standardDescriptionFallback(key: string, t: (key: string) => string) {
  const match = key.match(/^standard(\d+)$/);
  if (!match) return "";
  return t(`cert${match[1]}Desc`);
}

function StandardCard({
  label,
  description,
  index,
}: {
  label: string;
  description: string;
  index: number;
}) {
  return (
    <RevealOnScroll delay={index * 50}>
      <article className="group flex h-full gap-4 rounded-2xl border border-midex-line/60 bg-white p-5 shadow-sm transition-shadow duration-300 hover:border-midex-mint/35 hover:shadow-md sm:gap-5 sm:p-6">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-midex-navy text-white shadow-sm sm:h-16 sm:w-16">
          <ShieldIcon className="mb-1 h-4 w-4 text-midex-mint" />
          <span className="px-1 text-center font-display text-[10px] font-bold leading-tight tracking-wide sm:text-[11px]">
            {label}
          </span>
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm leading-relaxed text-midex-gray/80 sm:text-[15px]">
            {description}
          </p>
        </div>
      </article>
    </RevealOnScroll>
  );
}

export async function AboutStandardsSection({
  title,
  subtitle,
  eyebrow,
  footnote,
  items: itemsProp,
}: Props) {
  const t = await getTranslations("about");
  const locale = (await getLocale()) as Locale;
  const cmsItems = itemsProp ?? (await getAboutStandards(locale));

  const standards = cmsItems.map((item) => {
    const label = item.text?.trim() ? item.text : t(item.key);
    const description =
      item.description?.trim() ||
      standardDescriptionFallback(item.key, t) ||
      t("standardsText");

    return { key: item.key, label, description };
  });

  if (standards.length === 0) return null;

  return (
    <section className="mx-section">
      <div className="mx-container">
        <RevealOnScroll>
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <p className="mx-eyebrow mx-auto">{eyebrow || t("standardsEyebrow")}</p>
            <h2 className="mx-section-title mt-4">{title}</h2>
            <p className="mx-section-subtitle mx-auto mt-4">{subtitle}</p>
          </div>
        </RevealOnScroll>

        <ul className="flex flex-wrap justify-center gap-4 lg:gap-5">
          {standards.map((standard, index) => (
            <li
              key={standard.key}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.625rem)]"
            >
              <StandardCard
                label={standard.label}
                description={standard.description}
                index={index}
              />
            </li>
          ))}
        </ul>

        <RevealOnScroll delay={120}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-midex-gray/70 sm:mt-10">
            {footnote || t("standardsText")}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
