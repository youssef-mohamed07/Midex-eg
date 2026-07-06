import type { SolutionGroupSlug } from "@/content/solutions";

export type SolutionGroupFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type SolutionGroupFaqContent = {
  title: string;
  intro: string;
  items: SolutionGroupFaqItem[];
};

const solutionsFaqItems: SolutionGroupFaqItem[] = [
  {
    id: "replacement-vs-modification",
    question:
      "Do I need a full system replacement, or can my existing system be modified?",
    answer:
      "In most cases, modification is a faster and more cost-effective option than full replacement. Our engineers assess your system to recommend the right approach.",
  },
  {
    id: "project-timeline",
    question: "How long does a typical modification project take?",
    answer:
      "Timelines vary based on scope and system complexity. After our initial assessment, we provide a clear project timeline specific to your facility.",
  },
  {
    id: "shutdown",
    question: "Will my facility need to shut down during the modification?",
    answer:
      "We plan every project to minimize downtime, and in many cases can execute modifications with limited or no interruption to ongoing operations.",
  },
  {
    id: "compliance",
    question: "Are modified systems still compliant with pharmaceutical standards?",
    answer:
      "Yes. Every modification is designed and validated to meet the same hygienic and regulatory standards required for pharmaceutical-grade systems.",
  },
  {
    id: "other-provider",
    question: "Can MIDEX modify systems that were installed by another provider?",
    answer:
      "Yes, our engineers are experienced in assessing and upgrading systems regardless of the original installer.",
  },
];

const weldingFaqItems: SolutionGroupFaqItem[] = [
  {
    id: "manual-vs-orbital",
    question:
      "What's the difference between manual and automatic orbital welding?",
    answer:
      "Manual welding offers flexibility for complex or hard-to-reach geometries, while automatic orbital welding delivers highly consistent, repeatable welds ideal for standardized hygienic piping runs.",
  },
  {
    id: "inspection-documentation",
    question: "Are your welds inspected and documented?",
    answer:
      "Yes. Every weld is inspected and documented, with full traceability provided for audit and compliance purposes.",
  },
  {
    id: "standards",
    question: "What standards do your welding services comply with?",
    answer:
      "Our welding services are performed to hygienic and sanitary industry standards suited to pharmaceutical, food & beverage, and biotech applications.",
  },
  {
    id: "on-site",
    question: "Can MIDEX weld on-site at our facility?",
    answer:
      "Yes, our team performs both on-site and workshop welding depending on project requirements and site conditions.",
  },
  {
    id: "weld-maps",
    question: "Do you provide weld maps and quality certificates?",
    answer:
      "Yes, full weld documentation — including weld maps and quality certificates — is provided as part of every project handover.",
  },
];

const systemsFaqItems: SolutionGroupFaqItem[] = [
  {
    id: "cip-vs-sip",
    question: "What's the difference between CIP and SIP systems?",
    answer:
      "CIP systems clean process equipment in place without disassembly, while SIP systems sanitize equipment to eliminate microbial risk — both are often used together in hygienic process lines.",
  },
  {
    id: "pw-station-size",
    question: "How do I know what size purified water station my facility needs?",
    answer:
      "Our engineers assess your production capacity and water demand during the initial consultation to recommend the right system size.",
  },
  {
    id: "pharmaceutical-compliance",
    question: "Are these systems compliant with pharmaceutical industry standards?",
    answer:
      "Yes, all our process and water treatment systems are designed and validated to meet pharmaceutical-grade hygienic standards.",
  },
  {
    id: "integration",
    question: "Can MIDEX integrate these systems with our existing infrastructure?",
    answer:
      "Yes, our engineers assess your existing setup and design systems that integrate smoothly with it.",
  },
  {
    id: "maintenance",
    question: "What kind of maintenance do these systems require?",
    answer:
      "Maintenance needs vary by system, but we provide guidance and ongoing support to keep your systems performing reliably long-term.",
  },
];

const installationsFaqItems: SolutionGroupFaqItem[] = [
  {
    id: "hygienic-installation",
    question: 'What makes a piping installation "hygienic"?',
    answer:
      "Hygienic piping installations are designed and installed to eliminate contamination risk — using sanitary welding, proper slope for drainage, and materials that meet pharmaceutical-grade standards.",
  },
  {
    id: "minimal-disruption",
    question:
      "Can MIDEX install piping in an existing facility without disrupting operations?",
    answer:
      "Yes, we plan installations carefully to minimize disruption, and can often work around ongoing operations depending on the scope.",
  },
  {
    id: "pharmaceutical-compliance",
    question: "Are these installations compliant with pharmaceutical industry standards?",
    answer:
      "Yes, all our piping installations are designed and validated to meet pharmaceutical-grade hygienic standards.",
  },
  {
    id: "new-and-extensions",
    question:
      "Do you handle both new installations and extensions to existing pipelines?",
    answer:
      "Yes, our team handles both new installations and extensions or modifications to existing pipeline networks.",
  },
  {
    id: "documentation",
    question: "What documentation do we receive after installation?",
    answer:
      "You'll receive full installation documentation, including piping layouts and compliance records, upon project handover.",
  },
];

export const solutionGroupFaqBase: Partial<
  Record<SolutionGroupSlug, SolutionGroupFaqContent>
> = {
  solutions: {
    title: "Frequently Asked Questions",
    intro:
      "Answers to the questions we hear most about system upgrades and modifications.",
    items: solutionsFaqItems,
  },
  welding: {
    title: "Frequently Asked Questions",
    intro: "Answers to the questions we hear most about our welding services.",
    items: weldingFaqItems,
  },
  systems: {
    title: "Frequently Asked Questions",
    intro:
      "Answers to the questions we hear most about process and water treatment systems.",
    items: systemsFaqItems,
  },
  installations: {
    title: "Frequently Asked Questions",
    intro:
      "Answers to the questions we hear most about hygienic piping installations.",
    items: installationsFaqItems,
  },
};
