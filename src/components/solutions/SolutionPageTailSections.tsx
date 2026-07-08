import { getTranslations } from "next-intl/server";
import { StatsSection } from "@/components/home/StatsSection";
import { getStats } from "@/lib/cms";

export async function SolutionPageTailSections() {
  const th = await getTranslations("home");
  const stats = await getStats();

  return (
    <StatsSection
      title={th("statsTitle")}
      subtitle={th("statsSubtitle")}
      items={stats.map((stat) => ({
        value: stat.value,
        label: th(stat.labelKey),
        suffix: "suffix" in stat ? stat.suffix : undefined,
      }))}
    />
  );
}
