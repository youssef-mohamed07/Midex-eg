import { getLocale, getTranslations } from "next-intl/server";
import { StatsSection } from "@/components/home/StatsSection";
import { getStats } from "@/lib/cms";
import { pick } from "@/lib/cms/section-resolve";
import type { Locale } from "@/i18n/routing";

export async function SolutionPageTailSections() {
  const locale = (await getLocale()) as Locale;
  const th = await getTranslations("home");
  const stats = await getStats(locale);

  return (
    <StatsSection
      title={th("statsTitle")}
      subtitle={th("statsSubtitle")}
      items={stats.map((stat) => ({
        value: stat.value,
        label: pick(stat.label, th(stat.labelKey)),
        suffix: stat.suffix,
      }))}
    />
  );
}
