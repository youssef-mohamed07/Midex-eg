import { companyValues } from "@/content/site";
import type { SolutionGroupSlug } from "@/content/solutions";

export type SolutionGroupPrinciple = {
  id: string;
  title: string;
  text: string;
  image: string;
};

export type SolutionGroupPrinciplesContent = {
  title: string;
  intro: string;
  items: SolutionGroupPrinciple[];
};

const principleImages = companyValues.map((value) => value.image);

const solutionsPrincipleItems: Omit<SolutionGroupPrinciple, "image">[] = [
  {
    id: "precision",
    title: "Precision",
    text: "Every modification is engineered to exact specifications — no shortcuts, no guesswork.",
  },
  {
    id: "compliance",
    title: "Compliance",
    text: "All upgrades are designed to meet and maintain pharmaceutical-grade hygienic standards.",
  },
  {
    id: "minimal-downtime",
    title: "Minimal Downtime",
    text: "We plan and execute modifications to keep disruption to your operations as low as possible.",
  },
  {
    id: "proven-expertise",
    title: "Proven Expertise",
    text: "15+ years of hands-on experience upgrading critical hygienic systems across the region.",
  },
  {
    id: "tailored-solutions",
    title: "Tailored Solutions",
    text: "No two facilities are alike — every modification is designed around your specific process and constraints.",
  },
  {
    id: "long-term-reliability",
    title: "Long-Term Reliability",
    text: "Our upgrades are built to perform reliably well beyond handover, not just pass initial testing.",
  },
];

const weldingPrincipleItems: Omit<SolutionGroupPrinciple, "image">[] = [
  {
    id: "precision",
    title: "Precision",
    text: "Every weld is executed to exact specifications, with zero tolerance for defects.",
  },
  {
    id: "certified-welders",
    title: "Certified Welders",
    text: "Our team is trained and certified to hygienic and sanitary welding standards.",
  },
  {
    id: "consistency",
    title: "Consistency",
    text: "Automatic orbital welding ensures repeatable quality across every joint, batch after batch.",
  },
  {
    id: "full-traceability",
    title: "Full Traceability",
    text: "Every weld is documented and traceable, supporting audit and compliance requirements.",
  },
  {
    id: "contamination-control",
    title: "Contamination Control",
    text: "Welding processes are designed to eliminate contamination risk in purified water and process lines.",
  },
  {
    id: "proven-reliability",
    title: "Proven Reliability",
    text: "15+ years of hygienic welding experience across pharmaceutical, food & beverage, and biotech facilities.",
  },
];

const systemsPrincipleItems: Omit<SolutionGroupPrinciple, "image">[] = [
  {
    id: "precision",
    title: "Precision",
    text: "Every system is engineered to exact specifications, with no margin for compliance risk.",
  },
  {
    id: "compliance",
    title: "Compliance",
    text: "All systems are designed to meet pharmaceutical-grade hygienic and regulatory standards.",
  },
  {
    id: "reliability",
    title: "Reliability",
    text: "Built for continuous operation, our systems are engineered to perform consistently under demanding conditions.",
  },
  {
    id: "full-traceability",
    title: "Full Traceability",
    text: "Every system comes with complete documentation, supporting audit and validation requirements.",
  },
  {
    id: "contamination-control",
    title: "Contamination Control",
    text: "Systems are designed from the ground up to eliminate contamination risk at every stage.",
  },
  {
    id: "proven-expertise",
    title: "Proven Expertise",
    text: "15+ years of experience delivering process and water treatment systems across pharmaceutical and hygienic industries.",
  },
];

const installationsPrincipleItems: Omit<SolutionGroupPrinciple, "image">[] = [
  {
    id: "precision",
    title: "Precision",
    text: "Every installation is executed to exact specifications, with no room for error.",
  },
  {
    id: "compliance",
    title: "Compliance",
    text: "All installations are designed to meet pharmaceutical-grade hygienic and regulatory standards.",
  },
  {
    id: "reliability",
    title: "Reliability",
    text: "Built to perform consistently under continuous operation and demanding process conditions.",
  },
  {
    id: "full-traceability",
    title: "Full Traceability",
    text: "Every installation is documented, supporting audit and validation requirements.",
  },
  {
    id: "contamination-control",
    title: "Contamination Control",
    text: "Piping systems are designed and installed to eliminate contamination risk at every joint and junction.",
  },
  {
    id: "proven-expertise",
    title: "Proven Expertise",
    text: "15+ years of experience installing hygienic piping systems across pharmaceutical and hygienic industries.",
  },
];

export const solutionGroupPrinciplesBase: Partial<
  Record<SolutionGroupSlug, Omit<SolutionGroupPrinciplesContent, "items"> & { items: Omit<SolutionGroupPrinciple, "image">[] }>
> = {
  solutions: {
    title: "Why It Matters",
    intro: "The principles that guide every modification project we take on.",
    items: solutionsPrincipleItems,
  },
  welding: {
    title: "Our Standards",
    intro: "The principles behind every weld we make.",
    items: weldingPrincipleItems,
  },
  systems: {
    title: "Our Standards",
    intro: "The principles behind every system we design and install.",
    items: systemsPrincipleItems,
  },
  installations: {
    title: "Our Standards",
    intro: "The principles behind every installation we complete.",
    items: installationsPrincipleItems,
  },
};

export function attachPrincipleImages(
  items: Omit<SolutionGroupPrinciple, "image">[],
): SolutionGroupPrinciple[] {
  return items.map((item, index) => ({
    ...item,
    image: principleImages[index % principleImages.length],
  }));
}
