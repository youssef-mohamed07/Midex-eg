import type { SolutionGroupSlug } from "@/content/solutions";

export type SolutionGroupWorkflowStep = {
  id: string;
  title: string;
  text: string;
  image: string;
};

export type SolutionGroupWorkflowContent = {
  title: string;
  intro: string;
  steps: SolutionGroupWorkflowStep[];
};

const workflowImages = [
  "/images/hero/slide-1.png",
  "/images/services/orbital-welding.png",
  "/images/services/mechanical-polishing.png",
  "/images/services/spray-ball.png",
  "/images/services/welding-docs.png",
];

const solutionsWorkflowSteps: Omit<SolutionGroupWorkflowStep, "image">[] = [
  {
    id: "site-assessment",
    title: "Site Assessment",
    text: "Our engineers evaluate your current system to identify performance gaps and compliance risks.",
  },
  {
    id: "modification-design",
    title: "Modification Design",
    text: "We design a tailored upgrade plan addressing your specific operational and regulatory needs.",
  },
  {
    id: "execution",
    title: "Execution",
    text: "Our team carries out the modification with minimal disruption to your ongoing operations.",
  },
  {
    id: "testing-validation",
    title: "Testing & Validation",
    text: "Every upgraded system is tested and validated to confirm performance and compliance.",
  },
  {
    id: "handover-support",
    title: "Handover & Support",
    text: "We hand over full documentation and remain available for any follow-up support.",
  },
];

const weldingWorkflowSteps: Omit<SolutionGroupWorkflowStep, "image">[] = [
  {
    id: "site-scope-assessment",
    title: "Site & Scope Assessment",
    text: "We evaluate the piping layout, material, and access conditions to determine the right welding approach.",
  },
  {
    id: "welding-plan-procedure",
    title: "Welding Plan & Procedure",
    text: "We define the welding procedure, standards, and documentation requirements for the project.",
  },
  {
    id: "execution",
    title: "Execution",
    text: "Our certified welders carry out manual or automatic orbital welding to hygienic specifications.",
  },
  {
    id: "inspection-testing",
    title: "Inspection & Testing",
    text: "Every weld is inspected and tested — including boroscopic inspection where required — to confirm quality and compliance.",
  },
  {
    id: "documentation-handover",
    title: "Documentation & Handover",
    text: "We provide full weld maps and traceability documentation upon project handover.",
  },
];

const systemsWorkflowSteps: Omit<SolutionGroupWorkflowStep, "image">[] = [
  {
    id: "requirements-site-assessment",
    title: "Requirements & Site Assessment",
    text: "We assess your facility, process requirements, and compliance needs to define the right system.",
  },
  {
    id: "system-design",
    title: "System Design",
    text: "Our engineers design a system tailored to your capacity, layout, and regulatory requirements.",
  },
  {
    id: "fabrication-installation",
    title: "Fabrication & Installation",
    text: "We fabricate and install the system to hygienic standards, minimizing disruption to your operations.",
  },
  {
    id: "testing-validation",
    title: "Testing & Validation",
    text: "Every system is tested and validated to confirm performance, quality, and compliance before handover.",
  },
  {
    id: "documentation-support",
    title: "Documentation & Support",
    text: "We provide full documentation and remain available for ongoing support and maintenance.",
  },
];

const installationsWorkflowSteps: Omit<SolutionGroupWorkflowStep, "image">[] = [
  {
    id: "site-requirements-assessment",
    title: "Site & Requirements Assessment",
    text: "We assess your facility layout and process requirements to plan the right installation approach.",
  },
  {
    id: "design-routing",
    title: "Design & Routing",
    text: "Our engineers design the piping layout and routing to meet hygienic and operational requirements.",
  },
  {
    id: "installation",
    title: "Installation",
    text: "Our team installs the piping system to hygienic standards, minimizing disruption to your operations.",
  },
  {
    id: "testing-validation",
    title: "Testing & Validation",
    text: "Every installation is tested and validated to confirm performance and compliance before handover.",
  },
  {
    id: "documentation-support",
    title: "Documentation & Support",
    text: "We provide full documentation and remain available for ongoing support and maintenance.",
  },
];

export const solutionGroupWorkflowBase: Partial<
  Record<
    SolutionGroupSlug,
    Omit<SolutionGroupWorkflowContent, "steps"> & {
      steps: Omit<SolutionGroupWorkflowStep, "image">[];
    }
  >
> = {
  solutions: {
    title: "How We Work",
    intro: "A structured, step-by-step approach to every modification project.",
    steps: solutionsWorkflowSteps,
  },
  welding: {
    title: "How We Work",
    intro: "A structured, step-by-step approach to every welding project.",
    steps: weldingWorkflowSteps,
  },
  systems: {
    title: "How We Work",
    intro: "A structured, step-by-step approach to every system project.",
    steps: systemsWorkflowSteps,
  },
  installations: {
    title: "How We Work",
    intro: "A structured, step-by-step approach to every installation project.",
    steps: installationsWorkflowSteps,
  },
};

export function attachWorkflowImages(
  steps: Omit<SolutionGroupWorkflowStep, "image">[],
): SolutionGroupWorkflowStep[] {
  return steps.map((step, index) => ({
    ...step,
    image: workflowImages[index % workflowImages.length],
  }));
}
