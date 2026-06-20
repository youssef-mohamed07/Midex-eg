import type { SolutionGroup } from "@/content/solutions";

export function getGroupLabel(
  group: SolutionGroup,
  tn: (key: "systems" | "modifications" | "welding" | "installations") => string,
) {
  if (group.slug === "systems") return tn("systems");
  if (group.slug === "solutions") return tn("modifications");
  if (group.slug === "welding") return tn("welding");
  if (group.slug === "installations") return tn("installations");
  return group.menuLabel ?? group.label;
}
