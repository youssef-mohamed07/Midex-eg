import { getTranslations } from "next-intl/server";
import { ClientsSection } from "@/components/home/ClientsSection";
import { StatsSection } from "@/components/home/StatsSection";
import { SolutionStepsSection } from "@/components/solutions/SolutionStepsSection";
import { SolutionTimelineSection } from "@/components/solutions/SolutionTimelineSection";
import { getStats } from "@/lib/cms";

export async function SolutionPageTailSections() {
  const th = await getTranslations("home");
  const stats = await getStats();

  return (
    <>
      <SolutionStepsSection />

      <SolutionTimelineSection />

      <ClientsSection title={th("clientsTitle")} subtitle={th("clientsSubtitle")} />

      <StatsSection
        title={th("statsTitle")}
        subtitle={th("statsSubtitle")}
        items={stats.map((stat) => ({
          value: stat.value,
          label: th(stat.labelKey),
          suffix: "suffix" in stat ? stat.suffix : undefined,
        }))}
      />
    </>
  );
}
