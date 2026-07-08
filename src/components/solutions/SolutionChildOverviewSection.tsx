import { SolutionSplitOverviewSection } from "@/components/solutions/SolutionSplitOverviewSection";

type Props = {
  title: string;
  intro: string;
  items: string[];
  image: string;
  imageAlt: string;
};

export function SolutionChildOverviewSection(props: Props) {
  return <SolutionSplitOverviewSection {...props} />;
}
