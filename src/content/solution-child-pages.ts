import {
  attachPrincipleImages,
  type SolutionGroupPrinciplesContent,
} from "@/content/solution-group-principles";
import {
  attachWorkflowImages,
  type SolutionGroupWorkflowContent,
} from "@/content/solution-group-workflow";
import type { SolutionGroupFaqContent } from "@/content/solution-group-faq";

export type SolutionChildPageKey = `${string}/${string}`;

type PrinciplesBase = Omit<SolutionGroupPrinciplesContent, "items"> & {
  items: Omit<SolutionGroupPrinciplesContent["items"][number], "image">[];
};

type WorkflowBase = Omit<SolutionGroupWorkflowContent, "steps"> & {
  steps: Omit<SolutionGroupWorkflowContent["steps"][number], "image">[];
};

export type SolutionChildPageContentBase = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  overviewTitle: string;
  overviewIntro: string;
  overviewItems: string[];
  principles: PrinciplesBase;
  workflow: WorkflowBase;
  relatedSectionTitle: string;
  faq: SolutionGroupFaqContent;
};

export type SolutionChildPageContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  overviewTitle: string;
  overviewIntro: string;
  overviewItems: string[];
  principles: SolutionGroupPrinciplesContent;
  workflow: SolutionGroupWorkflowContent;
  relatedSectionTitle: string;
  faq: SolutionGroupFaqContent;
};

export const solutionChildPagesBase: Partial<
  Record<SolutionChildPageKey, SolutionChildPageContentBase>
> = {
  "solutions/pw-station-modification": {
    heroTitle: "Upgrade Your Water Station Without Rebuilding It",
    heroSubtitle:
      "MIDEX enhances existing purified water stations for improved capacity, compliance, and reliability — without the cost and downtime of a full rebuild.",
    heroCtaLabel: "Request a Modification Assessment",
    overviewTitle: "More Capacity, More Compliance, Less Disruption",
    overviewIntro:
      "Every modification is designed to extend the life of your station while closing performance and compliance gaps.",
    overviewItems: [
      "Capacity upgrades to meet growing production demand without a full system replacement",
      "Compliance improvements to bring existing stations up to current pharmaceutical-grade standards",
      "Reliability enhancements that reduce downtime and unplanned maintenance",
      "Cost-effective alternative to a complete station rebuild",
    ],
    principles: {
      title: "Our Standards",
      intro: "The principles that guide every modification project we take on.",
      items: [
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
          text: "15+ years of hands-on experience upgrading critical purified water systems across the region.",
        },
        {
          id: "tailored-solutions",
          title: "Tailored Solutions",
          text: "No two stations are alike — every modification is designed around your specific process and constraints.",
        },
        {
          id: "long-term-reliability",
          title: "Long-Term Reliability",
          text: "Our upgrades are built to perform reliably well beyond handover, not just pass initial testing.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every modification project.",
      steps: [
        {
          id: "site-assessment",
          title: "Site Assessment",
          text: "Our engineers evaluate your current station to identify capacity, compliance, and reliability gaps.",
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
          text: "The upgraded station is tested and validated to confirm capacity, performance, and compliance.",
        },
        {
          id: "handover-support",
          title: "Handover & Support",
          text: "We hand over full documentation and remain available for any follow-up support.",
        },
      ],
    },
    relatedSectionTitle: "Explore More Modifications",
    faq: {
      title: "Frequently Asked Questions",
      intro:
        "Answers to the questions we hear most about purified water station modifications.",
      items: [
        {
          id: "modification-vs-replacement",
          question:
            "How do I know if my station needs a modification or a full replacement?",
          answer:
            "In most cases, modification is a faster and more cost-effective option than full replacement. Our engineers assess your station to recommend the right approach.",
        },
        {
          id: "capacity-upgrade",
          question: "Can a modification increase my station's capacity?",
          answer:
            "Yes, capacity upgrades are one of the most common reasons clients request a purified water station modification.",
        },
        {
          id: "shutdown",
          question: "Will my facility need to shut down during the modification?",
          answer:
            "We plan every project to minimize downtime, and in many cases can execute modifications with limited or no interruption to ongoing operations.",
        },
        {
          id: "compliance",
          question:
            "Will the modified station still be compliant with pharmaceutical standards?",
          answer:
            "Yes, every modification is designed and validated to meet pharmaceutical-grade hygienic and regulatory standards.",
        },
        {
          id: "other-provider",
          question: "Can MIDEX modify a station that was installed by another provider?",
          answer:
            "Yes, our engineers are experienced in assessing and upgrading stations regardless of the original installer.",
        },
      ],
    },
  },
  "solutions/distribution-skids-modification": {
    heroTitle: "Upgrade Your Sanitization Capability, Without the Rebuild",
    heroSubtitle:
      "MIDEX modifies distribution skids for production networks and water systems (WFI, PW) using premium materials and advanced welding techniques — fully compliant with pharmaceutical industry practices.",
    heroCtaLabel: "Request a Modification Assessment",
    overviewTitle: "Built On Compliance, Backed By Validation",
    overviewIntro:
      "Every modification follows a proven path from inspection to full documentation, ensuring your skid meets global pharmaceutical standards.",
    overviewItems: [
      "Bore Scoping Inspection to verify internal weld quality on every modification",
      "Passivation performed to secure corrosion resistance and maintain water purity",
      "Complete Documentation & Validation Packages demonstrating full adherence to GMP requirements",
      "Modifications available for both Hot Water Sanitization skids (circulating water at 65–80°C) and Super-Heated Water Sanitization skids (elevated temperature and pressure, ideal for aseptic filling)",
    ],
    principles: {
      title: "Our Standards",
      intro: "The principles behind every skid modification we carry out.",
      items: [
        {
          id: "precision",
          title: "Precision",
          text: "Every modification is executed to exact specifications using state-of-the-art welding techniques.",
        },
        {
          id: "compliance",
          title: "Compliance",
          text: "All upgrades are designed and documented to meet GMP requirements and pharmaceutical industry practices.",
        },
        {
          id: "verified-quality",
          title: "Verified Quality",
          text: "Bore Scoping Inspection confirms internal weld quality on every modification before handover.",
        },
        {
          id: "corrosion-resistance",
          title: "Corrosion Resistance",
          text: "Passivation is performed to protect system integrity and maintain long-term water purity.",
        },
        {
          id: "full-traceability",
          title: "Full Traceability",
          text: "Complete Documentation & Validation Packages are provided to support audit and compliance needs.",
        },
        {
          id: "proven-expertise",
          title: "Proven Expertise",
          text: "15+ years of experience modifying distribution skids across pharmaceutical and hygienic industries.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every distribution skid modification.",
      steps: [
        {
          id: "requirements-site-assessment",
          title: "Requirements & Site Assessment",
          text: "We assess your current skid, production line, and compliance requirements to define the right modification.",
        },
        {
          id: "modification-design",
          title: "Modification Design",
          text: "Our engineers design the upgrade — whether Hot Water or Super-Heated Water Sanitization — matched to your process.",
        },
        {
          id: "execution",
          title: "Execution",
          text: "We carry out the modification using premium materials and advanced welding techniques, minimizing disruption to your operations.",
        },
        {
          id: "bore-scoping-passivation-testing",
          title: "Bore Scoping, Passivation & Testing",
          text: "Every weld is bore scope-inspected, the system is passivated for corrosion resistance, and full testing confirms performance.",
        },
        {
          id: "documentation-validation",
          title: "Documentation & Validation",
          text: "We deliver complete Documentation & Validation Packages in compliance with GMP requirements.",
        },
      ],
    },
    relatedSectionTitle: "Explore More Upgrades",
    faq: {
      title: "Frequently Asked Questions",
      intro:
        "Answers to the questions we hear most about distribution skid modifications.",
      items: [
        {
          id: "hot-vs-super-heated",
          question:
            "What's the difference between Hot Water and Super-Heated Water Sanitization skids?",
          answer:
            "Hot Water Sanitization circulates water at around 65–80°C, while Super-Heated Water Sanitization uses elevated temperature and pressure to sterilize equipment even against heat-resistant microorganisms like spores — commonly used in aseptic filling environments.",
        },
        {
          id: "bore-scoping",
          question: "Why is Bore Scoping Inspection part of every modification?",
          answer:
            "It allows us to visually verify the internal quality of every weld, confirming there are no defects that could compromise sanitization performance or water purity.",
        },
        {
          id: "passivation",
          question: "What role does passivation play in the modification?",
          answer:
            "Passivation protects the stainless steel surface from corrosion, helping maintain water purity and extend the system's operational life.",
        },
        {
          id: "gmp-documentation",
          question: "Will the modification come with GMP-compliant documentation?",
          answer:
            "Yes, every modification includes a complete Documentation & Validation Package demonstrating full adherence to GMP requirements.",
        },
        {
          id: "production-line-integration",
          question:
            "Can these skid modifications be integrated into our existing production line?",
          answer:
            "Yes, both skid types are modified with the additions or adjustments needed for smooth integration into your existing manufacturing sequence.",
        },
      ],
    },
  },
  "solutions/loop-design-modification": {
    heroTitle: "Loop Design That Never Stops Circulating",
    heroSubtitle:
      "MIDEX enhances WFI and PW distribution systems with premium materials and precision orbital welding — backed by borescope inspection, surface passivation, and full GMP-compliant documentation.",
    heroCtaLabel: "Request a Modification Assessment",
    overviewTitle: "Engineered for Continuous, Uniform Water Quality",
    overviewIntro:
      "A well-designed loop is the backbone of pharmaceutical water infrastructure — here's what an optimized redesign delivers.",
    overviewItems: [
      "Continuous, uniform delivery of high-quality PW/WFI throughout your facility",
      "Minimization of microbial risk and biofilm formation across the entire loop",
      "Improved operational efficiency and reduced energy consumption",
      "Easier maintenance, validation, and regulatory compliance",
    ],
    principles: {
      title: "What Goes Into Every Loop Redesign",
      intro: "Six critical design aspects, engineered to meet ASME BPE and FDA requirements.",
      items: [
        {
          id: "valve-selection",
          title: "Valve Selection and Placement",
          text: "Choosing hygienic valves (such as diaphragm valves) to prevent dead legs, with block valves, sampling ports, and drain points strategically placed to facilitate maintenance and validation.",
        },
        {
          id: "flow-velocity",
          title: "Flow Velocity and Branch Design",
          text: "Maintaining a minimum flow velocity (typically ≥1.0 m/s) to prevent stagnation and biofilm formation, limiting branch length to ASME BPE's max 1.5D, and using proper outlet angles (45°–60°) for effective drainage.",
        },
        {
          id: "temperature-control",
          title: "Temperature Control",
          text: "Maintaining WFI loops at 80–85°C to inhibit microbial growth, incorporating point-of-use cooling (20–25°C) without creating dead zones, and using heat exchangers to stabilize temperature across seasonal variations.",
        },
        {
          id: "piping-materials",
          title: "Piping Materials and Surface Finish",
          text: "Using 316L stainless steel with low sulfur content, polishing and electropolishing to achieve smooth surfaces (Ra ≤ 0.4 µm), and passivating after installation or maintenance to restore the protective chromium oxide layer.",
        },
        {
          id: "loop-configuration",
          title: "Loop Configuration and Redundancy",
          text: "Designing symmetrical loops for even flow distribution, providing parallel or redundant paths for critical areas, and avoiding sharp bends or complex fittings that trap water or compromise cleanability.",
        },
        {
          id: "monitoring-validation",
          title: "Monitoring and Validation",
          text: "Installing sampling points, flow meters, and conductivity sensors for continuous monitoring, performing regular microbiological and TOC testing, and documenting all changes for GMP compliance.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every loop design modification.",
      steps: [
        {
          id: "requirements-site-assessment",
          title: "Requirements & Site Assessment",
          text: "We assess your current loop design, capacity, and compliance gaps against ASME BPE and FDA requirements.",
        },
        {
          id: "loop-redesign",
          title: "Loop Redesign",
          text: "Our engineers redesign valve placement, flow velocity, temperature control, and loop configuration to close identified gaps.",
        },
        {
          id: "execution",
          title: "Execution",
          text: "We carry out the modification using premium materials and precision orbital welding, minimizing disruption to your operations.",
        },
        {
          id: "inspection-passivation-testing",
          title: "Inspection, Passivation & Testing",
          text: "Every weld is borescope-inspected, the system is passivated for corrosion resistance, and monitoring points are validated.",
        },
        {
          id: "documentation-validation",
          title: "Documentation & Validation",
          text: "We deliver complete documentation and validation packages in compliance with GMP standards.",
        },
      ],
    },
    relatedSectionTitle: "Explore More Upgrades",
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to the questions we hear most about PW/WFI loop design modifications.",
      items: [
        {
          id: "why-loop-design",
          question: "Why does loop design matter so much for PW and WFI systems?",
          answer:
            "A well-designed loop ensures continuous circulation, microbial control, and uniform water quality — directly impacting product safety and regulatory compliance.",
        },
        {
          id: "flow-velocity",
          question: "What flow velocity is required to prevent stagnation?",
          answer:
            "Loops are typically designed to maintain a minimum flow velocity of ≥1.0 m/s, which helps prevent stagnation and biofilm formation.",
        },
        {
          id: "wfi-temperature",
          question: "What temperature are WFI loops maintained at?",
          answer:
            "WFI loops are typically maintained at 80–85°C to inhibit microbial growth, with point-of-use cooling available for sensitive equipment.",
        },
        {
          id: "corrosion-resistance",
          question: "How is corrosion resistance maintained after modification?",
          answer:
            "Passivation is performed after installation or maintenance to restore the protective chromium oxide layer on 316L stainless steel surfaces.",
        },
        {
          id: "ongoing-monitoring",
          question: "How is the loop monitored for ongoing compliance?",
          answer:
            "We install sampling points, flow meters, and conductivity sensors for continuous monitoring, backed by regular microbiological and TOC testing.",
        },
      ],
    },
  },
  "welding/manual-welding": {
    heroTitle: "Precision Welding, Joint by Joint",
    heroSubtitle:
      "MIDEX performs manual argon (TIG/GTAW) welding of stainless steel — delivering clean, precise, contamination-free welds for the most demanding hygienic piping systems.",
    heroCtaLabel: "Request a Welding Consultation",
    overviewTitle: "Skilled Hands, Uncompromising Quality",
    overviewIntro:
      "Manual TIG welding gives our team the control and adaptability needed for complex geometries and site conditions where precision matters most.",
    overviewItems: [
      "TIG (GTAW) welding process using an argon shielding gas to protect the weld from contamination",
      "Precise heat control for clean, smooth welds on stainless steel piping and fittings",
      "Ideal for complex geometries, tight spaces, and site conditions automation can't reach",
      "Performed by certified welders trained to hygienic and sanitary welding standards",
    ],
    principles: {
      title: "Our Standards",
      intro: "The principles behind every manual weld we make.",
      items: [
        {
          id: "precision",
          title: "Precision",
          text: "Every weld is executed with careful heat and filler control for a clean, defect-free joint.",
        },
        {
          id: "certified-welders",
          title: "Certified Welders",
          text: "Our team is trained and certified in TIG/GTAW welding to hygienic and sanitary standards.",
        },
        {
          id: "adaptability",
          title: "Adaptability",
          text: "Manual welding allows us to handle complex geometries and site conditions that automated systems can't reach.",
        },
        {
          id: "contamination-control",
          title: "Contamination Control",
          text: "Argon shielding gas protects the weld pool, preventing oxidation and contamination during welding.",
        },
        {
          id: "full-traceability",
          title: "Full Traceability",
          text: "Every weld is documented and traceable, supporting audit and compliance requirements.",
        },
        {
          id: "proven-reliability",
          title: "Proven Reliability",
          text: "15+ years of hygienic welding experience across pharmaceutical, food & beverage, and biotech facilities.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every manual welding project.",
      steps: [
        {
          id: "site-scope-assessment",
          title: "Site & Scope Assessment",
          text: "We evaluate the piping layout, material, and access conditions to confirm manual welding is the right approach.",
        },
        {
          id: "welding-plan-procedure",
          title: "Welding Plan & Procedure",
          text: "We define the welding procedure, filler material, and documentation requirements for the project.",
        },
        {
          id: "execution",
          title: "Execution",
          text: "Our certified welders perform manual TIG welding to hygienic specifications, joint by joint.",
        },
        {
          id: "inspection-testing",
          title: "Inspection & Testing",
          text: "Every weld is inspected and tested to confirm quality and compliance.",
        },
        {
          id: "documentation-handover",
          title: "Documentation & Handover",
          text: "We provide full weld maps and traceability documentation upon project handover.",
        },
      ],
    },
    relatedSectionTitle: "Explore More Services",
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to the questions we hear most about manual welding.",
      items: [
        {
          id: "what-is-manual-argon",
          question: "What is manual argon welding?",
          answer:
            "Manual argon welding, also known as TIG or GTAW welding, uses a tungsten electrode and an argon shielding gas to produce precise, clean welds on stainless steel.",
        },
        {
          id: "manual-vs-orbital",
          question: "When is manual welding preferred over automatic orbital welding?",
          answer:
            "Manual welding is preferred for complex geometries, tight spaces, and site conditions where an automated system can't easily maneuver.",
        },
        {
          id: "inspection-documentation",
          question: "Are manual welds inspected and documented?",
          answer:
            "Yes, every weld is inspected and documented, with full traceability provided for audit and compliance purposes.",
        },
        {
          id: "welding-standards",
          question: "What standards do your manual welders follow?",
          answer:
            "Our welders are certified to hygienic and sanitary welding standards suited to pharmaceutical, food & beverage, and biotech applications.",
        },
        {
          id: "on-site-welding",
          question: "Can MIDEX weld on-site at our facility?",
          answer:
            "Yes, our team performs manual welding both on-site and in workshop settings, depending on project requirements.",
        },
      ],
    },
  },
  "welding/automatic-orbital-welding": {
    heroTitle: "Consistency, Engineered Into Every Weld",
    heroSubtitle:
      "MIDEX performs automatic orbital welding — an advanced, machine-controlled process that delivers precise, repeatable welds without continuous manual intervention.",
    heroCtaLabel: "Request a Welding Consultation",
    overviewTitle: "Precision Without the Guesswork",
    overviewIntro:
      "Automatic orbital welding puts control in the hands of an advanced welding machine, delivering the consistency hygienic piping systems demand.",
    overviewItems: [
      "Fully automated welding machine that executes operations without continuous manual intervention",
      "Precise control over wire feed rate and rotational movement around the tube",
      "Consistent, repeatable weld quality across every joint, batch after batch",
      "Ideal for standardized hygienic piping runs requiring high-volume, high-precision welding",
    ],
    principles: {
      title: "Our Standards",
      intro: "The principles behind every orbital weld we make.",
      items: [
        {
          id: "precision",
          title: "Precision",
          text: "The welding machine controls wire feed rate and movement speed with high accuracy for a consistent weld.",
        },
        {
          id: "consistency",
          title: "Consistency",
          text: "Automated control ensures repeatable weld quality across every joint, batch after batch.",
        },
        {
          id: "certified-operators",
          title: "Certified Operators",
          text: "Our team is trained to set up, monitor, and validate every orbital welding cycle.",
        },
        {
          id: "contamination-control",
          title: "Contamination Control",
          text: "Automated, controlled welding minimizes contamination risk compared to manual intervention.",
        },
        {
          id: "full-traceability",
          title: "Full Traceability",
          text: "Every weld is documented and traceable, supporting audit and compliance requirements.",
        },
        {
          id: "proven-reliability",
          title: "Proven Reliability",
          text: "15+ years of hygienic welding experience across pharmaceutical, food & beverage, and biotech facilities.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every orbital welding project.",
      steps: [
        {
          id: "site-scope-assessment",
          title: "Site & Scope Assessment",
          text: "We evaluate the piping layout, material, and volume to confirm orbital welding is the right approach.",
        },
        {
          id: "welding-plan-machine-setup",
          title: "Welding Plan & Machine Setup",
          text: "We define the welding procedure and configure the machine's wire feed rate and movement speed for your specifications.",
        },
        {
          id: "execution",
          title: "Execution",
          text: "The welding machine performs precise, automated welds around each tube or pipe joint.",
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
      ],
    },
    relatedSectionTitle: "Explore More Services",
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to the questions we hear most about automatic orbital welding.",
      items: [
        {
          id: "what-is-orbital",
          question: "What is automatic orbital welding?",
          answer:
            "It's a welding process where an advanced machine automatically controls wire feed rate and movement speed around a tube or metal piece, executing precise welds without continuous manual intervention.",
        },
        {
          id: "orbital-vs-manual",
          question: "When is orbital welding preferred over manual welding?",
          answer:
            "Orbital welding is ideal for standardized, high-volume hygienic piping runs where consistent, repeatable weld quality is essential.",
        },
        {
          id: "inspection-documentation",
          question: "Are orbital welds inspected and documented?",
          answer:
            "Yes, every weld is inspected and documented, with full traceability provided for audit and compliance purposes.",
        },
        {
          id: "welding-standards",
          question: "What standards does your orbital welding comply with?",
          answer:
            "Our orbital welding is performed to hygienic and sanitary industry standards suited to pharmaceutical, food & beverage, and biotech applications.",
        },
        {
          id: "on-site-welding",
          question: "Can MIDEX perform orbital welding on-site at our facility?",
          answer:
            "Yes, our team performs orbital welding both on-site and in workshop settings, depending on project requirements.",
        },
      ],
    },
  },
  "systems/cleaning-in-place-system": {
    heroTitle: "Clean Equipment Without Missing a Beat",
    heroSubtitle:
      "MIDEX designs and installs automated Cleaning-in-Place systems that clean tanks, pipelines, and process equipment in place — no disassembly, no downtime lost to manual cleaning.",
    heroCtaLabel: "Request a System Consultation",
    overviewTitle: "Automated Cleaning, Built Into Your Process",
    overviewIntro:
      "Every CIP system we install is designed to clean thoroughly and get your equipment back into production faster.",
    overviewItems: [
      "Automated cleaning solution circulation through tanks, pipelines, and process equipment",
      "No disassembly required — equipment stays in place throughout the cleaning cycle",
      "Built-in rinse cycle to fully remove residual cleaning solution after each wash",
      "Designed to leave equipment contaminant-free and ready for the next production run",
    ],
    principles: {
      title: "Our Standards",
      intro: "The principles behind every CIP system we design and install.",
      items: [
        {
          id: "precision",
          title: "Precision",
          text: "Every system is engineered to circulate cleaning solution consistently across all equipment surfaces.",
        },
        {
          id: "compliance",
          title: "Compliance",
          text: "Systems are designed to meet the hygienic standards required for pharmaceutical and process manufacturing.",
        },
        {
          id: "efficiency",
          title: "Efficiency",
          text: "Automated cleaning cycles reduce downtime compared to manual disassembly and cleaning.",
        },
        {
          id: "thorough-rinsing",
          title: "Thorough Rinsing",
          text: "Every cycle includes a rinse phase to ensure no cleaning solution residue remains.",
        },
        {
          id: "contamination-control",
          title: "Contamination Control",
          text: "Systems are designed to leave equipment fully free of contaminants before the next production cycle.",
        },
        {
          id: "reliability",
          title: "Reliability",
          text: "Built for repeatable, consistent performance cycle after cycle.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every CIP system project.",
      steps: [
        {
          id: "requirements-site-assessment",
          title: "Requirements & Site Assessment",
          text: "We assess your equipment, process flow, and cleaning requirements to define the right CIP system.",
        },
        {
          id: "system-design",
          title: "System Design",
          text: "Our engineers design the CIP system, including cleaning solution circulation and rinse cycle parameters.",
        },
        {
          id: "installation",
          title: "Installation",
          text: "We install the CIP system, integrating it with your existing tanks, pipelines, and process equipment.",
        },
        {
          id: "testing-validation",
          title: "Testing & Validation",
          text: "The system is tested and validated to confirm cleaning effectiveness and rinse performance before handover.",
        },
        {
          id: "documentation-support",
          title: "Documentation & Support",
          text: "We provide full documentation and remain available for ongoing support and maintenance.",
        },
      ],
    },
    relatedSectionTitle: "Explore More Systems",
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to the questions we hear most about Cleaning-in-Place systems.",
      items: [
        {
          id: "what-equipment",
          question: "What equipment can a CIP system clean?",
          answer:
            "CIP systems are designed to clean tanks, pipelines, and other process equipment automatically, without the need for disassembly.",
        },
        {
          id: "disassembly",
          question: "Do I still need to disassemble equipment for cleaning?",
          answer:
            "No — that's the core benefit of a CIP system. Equipment stays in place throughout the entire cleaning cycle.",
        },
        {
          id: "rinse-cycle",
          question: "What happens during the rinse cycle?",
          answer:
            "After the cleaning phase, the rinse cycle removes any remaining cleaning solution, ensuring no residue is left behind.",
        },
        {
          id: "production-ready",
          question: "How does a CIP system ensure equipment is ready for production?",
          answer:
            "The combination of thorough cleaning and rinsing ensures all equipment is free of contaminants and ready for the next production process.",
        },
        {
          id: "integration",
          question: "Can a CIP system be integrated with our existing equipment?",
          answer:
            "Yes, our engineers design each CIP system to integrate with your existing tanks, pipelines, and process equipment.",
        },
      ],
    },
  },
  "systems/sanitization-in-place-system": {
    heroTitle: "Sterility Built Into Every Cycle",
    heroSubtitle:
      "MIDEX designs and installs Sanitization-in-Place systems that eliminate microorganisms from your equipment — protecting product integrity without disassembly or downtime.",
    heroCtaLabel: "Request a System Consultation",
    overviewTitle: "Engineered to Eliminate Microbial Risk",
    overviewIntro:
      "Every SIP system we install is designed to sterilize thoroughly, keeping your equipment free of contamination between production cycles.",
    overviewItems: [
      "Sterilizing agents such as vaporized hydrogen peroxide, ozone, or superheated water vapor, matched to your process",
      "Hot water, chemical, or combined sterilization methods selected based on your equipment and product requirements",
      "Operates in-place, without the need to disassemble tanks, pipelines, or process equipment",
      "Effective against bacteria, viruses, spores, and fungi on all contact surfaces",
    ],
    principles: {
      title: "Our Standards",
      intro: "The principles behind every SIP system we design and install.",
      items: [
        {
          id: "precision",
          title: "Precision",
          text: "Every system is engineered to deliver consistent sterilizing agent exposure across all equipment surfaces.",
        },
        {
          id: "compliance",
          title: "Compliance",
          text: "Systems are designed to meet the sterility standards required for pharmaceutical and process manufacturing.",
        },
        {
          id: "microbial-control",
          title: "Microbial Control",
          text: "Sterilizing agents are selected and applied to eliminate bacteria, viruses, spores, and fungi effectively.",
        },
        {
          id: "efficiency",
          title: "Efficiency",
          text: "In-place sterilization reduces downtime compared to manual disassembly and sterilization.",
        },
        {
          id: "contamination-control",
          title: "Contamination Control",
          text: "Systems are designed to leave equipment fully sterile and ready for the next production cycle.",
        },
        {
          id: "reliability",
          title: "Reliability",
          text: "Built for repeatable, consistent sterilization performance cycle after cycle.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every SIP system project.",
      steps: [
        {
          id: "requirements-site-assessment",
          title: "Requirements & Site Assessment",
          text: "We assess your equipment, product requirements, and microbial control needs to define the right SIP system.",
        },
        {
          id: "system-design",
          title: "System Design",
          text: "Our engineers design the SIP system, selecting the appropriate sterilizing agent and cycle parameters.",
        },
        {
          id: "installation",
          title: "Installation",
          text: "We install the SIP system, integrating it with your existing tanks, pipelines, and process equipment.",
        },
        {
          id: "testing-validation",
          title: "Testing & Validation",
          text: "The system is tested and validated to confirm sterilization effectiveness before handover.",
        },
        {
          id: "documentation-support",
          title: "Documentation & Support",
          text: "We provide full documentation and remain available for ongoing support and maintenance.",
        },
      ],
    },
    relatedSectionTitle: "Explore More Systems",
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to the questions we hear most about Sanitization-in-Place systems.",
      items: [
        {
          id: "sip-vs-cip",
          question: "How is an SIP system different from a CIP system?",
          answer:
            "CIP systems focus on cleaning equipment to remove residual product, while SIP systems go a step further — sterilizing equipment to eliminate microorganisms like bacteria, viruses, spores, and fungi.",
        },
        {
          id: "sterilizing-agents",
          question: "What sterilizing agents are used in an SIP system?",
          answer:
            "Depending on your process, we use hot water, chemicals, or agents like vaporized hydrogen peroxide, ozone, or superheated water vapor.",
        },
        {
          id: "disassembly",
          question: "Do I need to disassemble equipment for sterilization?",
          answer:
            "No — SIP systems operate in place, sterilizing equipment without the need for disassembly.",
        },
        {
          id: "microorganisms",
          question: "What microorganisms does an SIP system eliminate?",
          answer:
            "SIP systems are designed to eliminate bacteria, viruses, spores, and fungi from equipment surfaces.",
        },
        {
          id: "integration",
          question: "Can an SIP system be integrated with our existing equipment?",
          answer:
            "Yes, our engineers design each SIP system to integrate with your existing tanks, pipelines, and process equipment.",
        },
      ],
    },
  },
  "systems/purified-water-station": {
    heroTitle: "Pharmaceutical-Grade Water, Consistently Delivered",
    heroSubtitle:
      "MIDEX designs and installs purified water stations engineered to consistently meet pharmaceutical-grade water quality standards — built around the technology your process demands.",
    heroCtaLabel: "Request a System Consultation",
    overviewTitle: "Complete Purified Water Generation",
    overviewIntro:
      "Every purified water station we install combines pretreatment, purification, and monitoring in a skid-mounted package — engineered and qualified to pharmacopoeia requirements.",
    overviewItems: [
      "Skid-mounted packages with pretreatment, RO, and EDI configured for your capacity",
      "Online conductivity monitoring and data logging for continuous quality assurance",
      "Distribution-ready outlets designed for integration with your facility loop",
      "Engineered and qualified to pharmaceutical-grade water quality standards",
    ],
    principles: {
      title: "Built Around Your Process",
      intro: "Every facility has different water quality needs — we design and install the technology that fits yours.",
      items: [
        {
          id: "reverse-osmosis",
          title: "Reverse Osmosis (RO)",
          text: "High-efficiency filtration that removes dissolved solids, contaminants, and impurities to produce consistently pure water.",
        },
        {
          id: "electrodeionization",
          title: "Electrodeionization (EDI)",
          text: "A chemical-free polishing step that removes remaining ions after RO, delivering ultra-pure water for the most demanding applications.",
        },
        {
          id: "ultrafiltration",
          title: "Ultrafiltration (UF)",
          text: "Membrane filtration that removes bacteria, particulates, and larger contaminants ahead of further purification stages.",
        },
        {
          id: "distillation",
          title: "Distillation",
          text: "Thermal purification that vaporizes and recondenses water, removing impurities for applications requiring the highest purity levels.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every purified water station project.",
      steps: [
        {
          id: "requirements-site-assessment",
          title: "Requirements & Site Assessment",
          text: "We assess your water quality needs, production capacity, and facility layout to define the right purified water station.",
        },
        {
          id: "system-design",
          title: "System Design",
          text: "Our engineers design the station — selecting RO, EDI, UF, or distillation technology and sizing each stage for your process.",
        },
        {
          id: "installation",
          title: "Installation",
          text: "We install the purified water station, integrating pretreatment, purification, monitoring, and distribution outlets on site.",
        },
        {
          id: "testing-validation",
          title: "Testing & Validation",
          text: "The system is tested and validated to confirm water quality, monitoring performance, and compliance before handover.",
        },
        {
          id: "documentation-support",
          title: "Documentation & Support",
          text: "We provide full documentation and remain available for ongoing support and maintenance.",
        },
      ],
    },
    relatedSectionTitle: "Explore More Systems",
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to the questions we hear most about purified water stations.",
      items: [
        {
          id: "purification-technologies",
          question: "What purification technologies are available?",
          answer:
            "Depending on your process and quality requirements, we design stations using reverse osmosis (RO), electrodeionization (EDI), ultrafiltration (UF), distillation, or a combination matched to your needs.",
        },
        {
          id: "station-size",
          question: "How do I know what size purified water station my facility needs?",
          answer:
            "Our engineers assess your production capacity and water demand during the initial consultation to recommend the right system size and configuration.",
        },
        {
          id: "pharmaceutical-compliance",
          question: "Are purified water stations compliant with pharmaceutical industry standards?",
          answer:
            "Yes, all our purified water stations are designed and validated to meet pharmaceutical-grade water quality standards and pharmacopoeia requirements.",
        },
        {
          id: "distribution-integration",
          question: "Can the station integrate with our existing distribution system?",
          answer:
            "Yes, our engineers design each station with distribution-ready outlets and integration points for your facility loop or distribution skid.",
        },
        {
          id: "validation-documentation",
          question: "Does MIDEX provide validation documentation?",
          answer:
            "Yes, we deliver full documentation and validation packages to support your compliance and audit requirements.",
        },
      ],
    },
  },
  "systems/distribution-skids": {
    heroTitle: "Sanitized Distribution, Engineered for Compliance",
    heroSubtitle:
      "MIDEX designs and installs distribution skids that keep pharmaceutical-grade water systems free of contamination — with sanitization technology matched to your process requirements.",
    heroCtaLabel: "Request a System Consultation",
    overviewTitle: "Reliable Delivery Across Your Facility",
    overviewIntro:
      "Generated water only matters if it reaches the point of use at the right quality, pressure, and temperature — every distribution skid we install is built to deliver exactly that.",
    overviewItems: [
      "Hygienic pumps, valves, and instrumentation integrated into a skid-mounted package",
      "Continuous circulation designed to maintain water quality throughout your facility",
      "Sanitization-compatible design with automated cycles matched to your process",
      "Full traceability and monitoring for regulatory compliance and audit readiness",
    ],
    principles: {
      title: "Sanitization Technology Matched to Your Process",
      intro: "We select and configure the sanitization approach that fits your facility's requirements and regulatory obligations.",
      items: [
        {
          id: "hot-water-sanitization",
          title: "Hot Water Sanitization",
          text: "Uses heated water, circulated at around 65–80°C through tanks, pipes, and process lines, to reduce microbial contamination and remove organic residue. Fully automated and easy to integrate into any production sequence.",
        },
        {
          id: "super-heated-water-sanitization",
          title: "Super-Heated Water Sanitization",
          text: "Takes thermal sanitization further, circulating water at elevated temperature and pressure for a higher level of microbial kill — built for facilities needing an added margin of sanitization assurance.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every distribution skid project.",
      steps: [
        {
          id: "requirements-site-assessment",
          title: "Requirements & Site Assessment",
          text: "We assess your water system, production layout, and sanitization requirements to define the right distribution skid.",
        },
        {
          id: "system-design",
          title: "System Design",
          text: "Our engineers design the skid — selecting Hot Water or Super-Heated Water Sanitization and configuring pumps, valves, and control systems.",
        },
        {
          id: "installation",
          title: "Installation",
          text: "We install the distribution skid, integrating it with your purified water generation system and facility loop.",
        },
        {
          id: "testing-validation",
          title: "Testing & Validation",
          text: "The system is tested and validated to confirm distribution performance and sanitization effectiveness before handover.",
        },
        {
          id: "documentation-support",
          title: "Documentation & Support",
          text: "We provide full documentation and remain available for ongoing support and maintenance.",
        },
      ],
    },
    relatedSectionTitle: "Explore More Systems",
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to the questions we hear most about distribution skids.",
      items: [
        {
          id: "hot-vs-super-heated",
          question:
            "What's the difference between Hot Water Sanitization and Super-Heated Water Sanitization?",
          answer:
            "Hot Water Sanitization circulates water at around 65–80°C, while Super-Heated Water Sanitization operates at higher temperatures and pressure for an added level of microbial control — ideal for facilities with stricter sanitization requirements.",
        },
        {
          id: "sanitization-frequency",
          question: "How often does a distribution skid need to run a sanitization cycle?",
          answer:
            "Sanitization frequency depends on your product, regulatory requirements, and system usage — our engineers help define the right schedule during the design phase.",
        },
        {
          id: "production-line-integration",
          question: "Can a distribution skid be integrated into an existing production line?",
          answer:
            "Yes, both skid types are designed to be fully automated and easy to integrate into any existing production or manufacturing sequence.",
        },
        {
          id: "hot-water-skid-components",
          question: "What does a Hot Water Sanitization Skid consist of?",
          answer:
            "It typically includes a control panel, pump, tank, and heating unit, working together to circulate heated water through equipment and piping at controlled temperature, pressure, and flow rates.",
        },
        {
          id: "regulatory-compliance",
          question: "Are distribution skids compliant with pharmaceutical regulatory standards?",
          answer:
            "Yes, our distribution skids are designed to meet the sanitization standards mandated by regulatory agencies for pharmaceutical manufacturing.",
        },
      ],
    },
  },
  "installations/purified-loop-system": {
    heroTitle: "A Constant Supply of High-Purity Water, Engineered to Last",
    heroSubtitle:
      "MIDEX designs and installs recirculating purified water loop systems that maintain consistent flow, pressure, and purity — built for laboratories, manufacturing, and every application in between.",
    heroCtaLabel: "Request an Installation Consultation",
    overviewTitle: "Built to Circulate, Engineered to Purify",
    overviewIntro:
      "Every loop we install is designed around one goal — a constant, reliable supply of high-purity water, with minimal risk of contamination.",
    overviewItems: [
      "Stainless steel construction and materials selected for long-term hygienic performance",
      "A central purification unit engineered to maintain consistent water quality",
      "Continuous loop design that keeps flow and pressure stable throughout the system",
      "UV sterilizers, filters, and deionizers integrated to protect water purity at every stage",
    ],
    principles: {
      title: "Our Standards",
      intro: "The principles behind every purified water loop we install.",
      items: [
        {
          id: "precision",
          title: "Precision",
          text: "Every loop is engineered to exact flow, pressure, and material specifications.",
        },
        {
          id: "compliance",
          title: "Compliance",
          text: "Systems are designed to meet pharmaceutical-grade hygienic and water quality standards.",
        },
        {
          id: "contamination-control",
          title: "Contamination Control",
          text: "Valves, sensors, and material selection work together to minimize contamination risk.",
        },
        {
          id: "continuous-monitoring",
          title: "Continuous Monitoring",
          text: "Properly placed sensors allow real-time monitoring and control of water quality and system performance.",
        },
        {
          id: "reliability",
          title: "Reliability",
          text: "Designed for constant flow and pressure, ensuring an uninterrupted supply of purified water.",
        },
        {
          id: "long-term-performance",
          title: "Long-Term Performance",
          text: "Regular maintenance guidance helps prevent biofilm formation and extends system longevity.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every loop system installation.",
      steps: [
        {
          id: "requirements-site-assessment",
          title: "Requirements & Site Assessment",
          text: "We assess your application, capacity needs, and facility layout to define the right loop design.",
        },
        {
          id: "system-design",
          title: "System Design",
          text: "Our engineers design the loop, selecting materials, components, and layout for consistent flow and purity.",
        },
        {
          id: "installation",
          title: "Installation",
          text: "We install the central purification unit, loop piping, and components to hygienic standards.",
        },
        {
          id: "testing-validation",
          title: "Testing & Validation",
          text: "The system is tested and validated to confirm flow, pressure, and water quality before handover.",
        },
        {
          id: "documentation-maintenance",
          title: "Documentation & Maintenance Guidance",
          text: "We provide full documentation along with maintenance guidance to prevent biofilm formation and ensure longevity.",
        },
      ],
    },
    relatedSectionTitle: "Explore More Installations",
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to the questions we hear most about purified water loop systems.",
      items: [
        {
          id: "system-components",
          question: "What components are typically included in a purified water loop system?",
          answer:
            "Depending on your application, a loop system may include a central purification unit, UV sterilizers, filters, deionizers, valves, and sensors — all working together to maintain water quality.",
        },
        {
          id: "contamination-prevention",
          question: "How does MIDEX prevent contamination in the loop?",
          answer:
            "We use hygienic materials like stainless steel, design the loop to maintain constant flow and pressure, and place valves and sensors strategically to monitor and control contamination risk.",
        },
        {
          id: "maintenance",
          question: "What maintenance does a purified water loop require?",
          answer:
            "Regular maintenance is essential to prevent biofilm formation and ensure long-term system performance — we provide maintenance guidance as part of every installation.",
        },
        {
          id: "customization",
          question:
            "Can a purified water loop system be customized for laboratory use versus manufacturing?",
          answer:
            "Yes, we design each loop system around your specific application, whether it's laboratory-grade purity or large-scale manufacturing demands.",
        },
        {
          id: "water-quality-monitoring",
          question: "How is water quality monitored in the system?",
          answer:
            "Sensors are placed at key points throughout the loop to continuously monitor water quality, flow, and pressure, allowing for real-time control and adjustment.",
        },
      ],
    },
  },
  "installations/preparation-pipe-line": {
    heroTitle: "Hygienic Transport, From First Drop to Last",
    heroSubtitle:
      "MIDEX designs and installs sanitary preparation pipelines that ensure hygienic fluid transport across food, pharmaceutical, and biotechnology processes — engineered for purity at every joint.",
    heroCtaLabel: "Request an Installation Consultation",
    overviewTitle: "Engineered for Clean, Contamination-Free Transport",
    overviewIntro:
      "Every preparation pipeline we install is built to move fluids safely, without compromising hygiene at any stage.",
    overviewItems: [
      "Stainless steel and hygienic materials selected to prevent contamination",
      "Precision orbital welding for smooth, crevice-free interiors",
      "Sanitary valves, fittings, and seals designed to maintain hygiene throughout",
      "Proper slope and drainage design to prevent stagnation and biofilm risk",
    ],
    principles: {
      title: "Our Standards",
      intro: "The principles behind every preparation pipeline we install.",
      items: [
        {
          id: "precision",
          title: "Precision",
          text: "Every pipeline is engineered and welded to exact hygienic specifications.",
        },
        {
          id: "compliance",
          title: "Compliance",
          text: "Systems are designed to meet sanitary standards required across food, pharma, and biotech industries.",
        },
        {
          id: "contamination-control",
          title: "Contamination Control",
          text: "Cleaned and sanitized components, combined with crevice-free welding, minimize contamination risk.",
        },
        {
          id: "smooth-interiors",
          title: "Smooth Interiors",
          text: "Orbital welding techniques ensure smooth, crevice-free interior surfaces throughout the pipeline.",
        },
        {
          id: "proper-drainage",
          title: "Proper Drainage",
          text: "Slope and drainage are engineered into every pipeline to prevent stagnation.",
        },
        {
          id: "rigorous-testing",
          title: "Rigorous Testing",
          text: "Every pipeline undergoes pressure testing and microbial inspection before it's approved for operation.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every preparation pipeline installation.",
      steps: [
        {
          id: "requirements-site-assessment",
          title: "Requirements & Site Assessment",
          text: "We assess your process requirements and facility layout to define the right pipeline design.",
        },
        {
          id: "material-selection-design",
          title: "Material Selection & Design",
          text: "We select hygienic materials and design the pipeline route, slope, and drainage for optimal performance.",
        },
        {
          id: "cleaning-installation",
          title: "Cleaning & Installation",
          text: "Components are cleaned and sanitized, then installed using precision orbital welding techniques.",
        },
        {
          id: "testing-inspection",
          title: "Testing & Inspection",
          text: "The pipeline undergoes pressure testing and microbial inspection to confirm it meets sanitary standards.",
        },
        {
          id: "documentation-handover",
          title: "Documentation & Handover",
          text: "We provide full documentation and testing records as part of every project handover.",
        },
      ],
    },
    relatedSectionTitle: "Explore More Installations",
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to the questions we hear most about preparation pipeline installations.",
      items: [
        {
          id: "materials",
          question: "What materials are used for preparation pipelines?",
          answer:
            "We typically use stainless steel and other hygienic materials selected to prevent contamination and meet sanitary standards for your industry.",
        },
        {
          id: "orbital-welding",
          question: "Why is orbital welding used for these pipelines?",
          answer:
            "Orbital welding produces smooth, crevice-free interior surfaces, minimizing the risk of contamination and bacterial buildup compared to manual welding.",
        },
        {
          id: "stagnation-prevention",
          question: "How is stagnation prevented in the pipeline design?",
          answer:
            "We engineer proper slope and drainage into every pipeline to ensure fluids flow freely and don't pool or stagnate.",
        },
        {
          id: "post-installation-testing",
          question: "What kind of testing is done after installation?",
          answer:
            "Every pipeline undergoes pressure testing and microbial inspection to confirm it operates safely and meets sanitary standards.",
        },
        {
          id: "industry-customization",
          question: "Can preparation pipelines be customized for different industries?",
          answer:
            "Yes, we design each pipeline around your specific industry requirements, whether food, pharmaceutical, or biotechnology.",
        },
      ],
    },
  },
  "installations/sanitary-drain-pipeline": {
    heroTitle: "Drainage Engineered for Hygiene and Reliability",
    heroSubtitle:
      "MIDEX designs and installs sanitary drain pipelines for hospitals, food processing plants, and laboratories — built to remove waste efficiently while protecting hygiene and safety.",
    heroCtaLabel: "Request an Installation Consultation",
    overviewTitle: "Built to Drain Clean, Stay Compliant",
    overviewIntro:
      "Every drain pipeline we install is engineered to move waste efficiently while eliminating the conditions that let bacteria take hold.",
    overviewItems: [
      "Corrosion-resistant materials, including PVC and stainless steel, selected to prevent leaks and contamination",
      "Proper slope design to ensure efficient drainage and prevent standing water",
      "Sanitary fittings, traps, and cleanouts built in to maintain hygiene and ease of maintenance",
      "Secure joining methods — solvent welding for PVC, precision welding for metal pipes",
    ],
    principles: {
      title: "Our Standards",
      intro: "The principles behind every drain pipeline we install.",
      items: [
        {
          id: "precision",
          title: "Precision",
          text: "Every pipeline is laid out and joined to exact specifications, with no shortcuts on slope or sealing.",
        },
        {
          id: "compliance",
          title: "Compliance",
          text: "Systems are designed to meet health and safety standards required in hospitals, food processing, and labs.",
        },
        {
          id: "contamination-control",
          title: "Contamination Control",
          text: "Corrosion-resistant materials and sanitary fittings minimize the risk of leaks and bacterial buildup.",
        },
        {
          id: "proper-drainage",
          title: "Proper Drainage",
          text: "Precise slope engineering prevents standing water, one of the biggest risks for bacterial growth.",
        },
        {
          id: "ease-of-maintenance",
          title: "Ease of Maintenance",
          text: "Traps and cleanouts are positioned to make ongoing maintenance simple and effective.",
        },
        {
          id: "rigorous-testing",
          title: "Rigorous Testing",
          text: "Every system is tested for leaks and functionality before being approved for operation.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every drain pipeline installation.",
      steps: [
        {
          id: "requirements-site-assessment",
          title: "Requirements & Site Assessment",
          text: "We assess your facility's waste disposal needs and layout to define the right drainage design.",
        },
        {
          id: "material-selection-design",
          title: "Material Selection & Design",
          text: "We select corrosion-resistant materials and design the pipeline slope and layout for efficient drainage.",
        },
        {
          id: "installation",
          title: "Installation",
          text: "We install pipes, sanitary fittings, traps, and cleanouts, securely joining them with the appropriate welding method.",
        },
        {
          id: "testing-inspection",
          title: "Testing & Inspection",
          text: "The system is tested for leaks and functionality to confirm it meets health and safety standards.",
        },
        {
          id: "documentation-handover",
          title: "Documentation & Handover",
          text: "We provide full documentation and testing records as part of every project handover.",
        },
      ],
    },
    relatedSectionTitle: "Explore More Installations",
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to the questions we hear most about sanitary drain pipeline installations.",
      items: [
        {
          id: "materials",
          question: "What materials are used for sanitary drain pipelines?",
          answer:
            "We typically use corrosion-resistant materials such as PVC or stainless steel, selected based on your facility's specific requirements.",
        },
        {
          id: "standing-water",
          question: "How is standing water prevented in the drainage system?",
          answer:
            "We engineer precise slope into every pipeline layout to ensure efficient drainage and prevent water from pooling.",
        },
        {
          id: "sanitary-components",
          question: "What sanitary components are included in the installation?",
          answer:
            "Installations include sanitary fittings, traps, and cleanouts designed to maintain hygiene and make maintenance straightforward.",
        },
        {
          id: "pipe-joining",
          question: "How are the pipes joined together?",
          answer:
            "We use solvent welding for PVC pipes and precision welding for metal pipes, ensuring secure, leak-free joints.",
        },
        {
          id: "post-installation-testing",
          question: "What testing is done after installation?",
          answer:
            "Every system is tested for leaks and functionality to confirm it meets health and safety standards before it's put into use.",
        },
      ],
    },
  },
  "installations/compressed-air-pipe-line-installation": {
    heroTitle: "Clean Air, Delivered Reliably",
    heroSubtitle:
      "MIDEX designs and installs compressed air piping systems engineered to transport air efficiently — protecting purity, minimizing pressure loss, and built for long-term reliability.",
    heroCtaLabel: "Request an Installation Consultation",
    overviewTitle: "Engineered for Efficiency, Built for Purity",
    overviewIntro:
      "Every compressed air system we install is designed to deliver clean, consistent air with minimal loss and maximum reliability.",
    overviewItems: [
      "Corrosion-resistant materials, including aluminum and stainless steel, selected to maintain air quality",
      "Loop system layouts designed to minimize pressure drops and moisture buildup",
      "Airtight fittings ensuring secure, leak-free connections throughout the system",
      "Filters, regulators, and dryers integrated to protect air purity at every stage",
    ],
    principles: {
      title: "Our Standards",
      intro: "The principles behind every compressed air system we install.",
      items: [
        {
          id: "precision",
          title: "Precision",
          text: "Every system is designed and installed to exact specifications, minimizing pressure drops across the network.",
        },
        {
          id: "compliance",
          title: "Compliance",
          text: "Systems are designed to maintain the air quality standards required by your industry.",
        },
        {
          id: "contamination-control",
          title: "Contamination Control",
          text: "Filters, regulators, and dryers work together to keep compressed air clean and moisture-free.",
        },
        {
          id: "airtight-reliability",
          title: "Airtight Reliability",
          text: "Secure, airtight fittings ensure no leaks and consistent system performance.",
        },
        {
          id: "efficient-design",
          title: "Efficient Design",
          text: "Loop layouts are engineered to minimize pressure loss and maximize delivery efficiency.",
        },
        {
          id: "rigorous-testing",
          title: "Rigorous Testing",
          text: "Every system undergoes pressure testing for leaks and functionality before it's approved for operation.",
        },
      ],
    },
    workflow: {
      title: "How We Work",
      intro: "A structured, step-by-step approach to every compressed air pipeline installation.",
      steps: [
        {
          id: "requirements-site-assessment",
          title: "Requirements & Site Assessment",
          text: "We assess your facility's air demand, layout, and quality requirements to define the right system design.",
        },
        {
          id: "design-layout",
          title: "Design & Layout",
          text: "We design the piping layout — often as a loop system — to minimize pressure drops and moisture buildup.",
        },
        {
          id: "installation",
          title: "Installation",
          text: "We install pipes and airtight fittings, integrating filters, regulators, and dryers to protect air purity.",
        },
        {
          id: "testing-inspection",
          title: "Testing & Inspection",
          text: "The system undergoes rigorous pressure testing to confirm it's leak-free and fully functional.",
        },
        {
          id: "documentation-handover",
          title: "Documentation & Handover",
          text: "We provide full documentation and testing records as part of every project handover.",
        },
      ],
    },
    relatedSectionTitle: "Explore More Installations",
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to the questions we hear most about compressed air pipeline installations.",
      items: [
        {
          id: "materials",
          question: "What materials are used for compressed air piping?",
          answer:
            "We typically use corrosion-resistant materials such as aluminum or stainless steel, selected to maintain air quality and system longevity.",
        },
        {
          id: "loop-system",
          question: "Why is a loop system used for compressed air piping?",
          answer:
            "A loop layout helps minimize pressure drops and moisture buildup, ensuring more consistent air delivery across your facility.",
        },
        {
          id: "air-purity-components",
          question: "What components are integrated to maintain air purity?",
          answer:
            "Filters, regulators, and dryers are integrated into the system to keep compressed air clean, dry, and at the right pressure.",
        },
        {
          id: "leak-prevention",
          question: "How are leaks prevented in the system?",
          answer:
            "We use airtight fittings and secure connections throughout, and every system is pressure tested to confirm there are no leaks.",
        },
        {
          id: "maintenance",
          question: "What maintenance does a compressed air system require?",
          answer:
            "Regular maintenance is important for reliable operation and longevity — we provide maintenance guidance as part of every installation.",
        },
      ],
    },
  },
};

export function getSolutionChildPageKey(groupSlug: string, childSlug: string): SolutionChildPageKey {
  return `${groupSlug}/${childSlug}`;
}

export function buildSolutionChildPageContent(
  base: SolutionChildPageContentBase,
): SolutionChildPageContent {
  return {
    ...base,
    principles: {
      title: base.principles.title,
      intro: base.principles.intro,
      items: attachPrincipleImages(base.principles.items),
    },
    workflow: {
      title: base.workflow.title,
      intro: base.workflow.intro,
      steps: attachWorkflowImages(base.workflow.steps),
    },
  };
}
