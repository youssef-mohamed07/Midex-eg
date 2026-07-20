export const deliveryStepKeys = [
  "step1",
  "step2",
  "step3",
  "step4",
  "step5",
] as const;

export const deliveryStepImages: Record<(typeof deliveryStepKeys)[number], string> = {
  step1: "/images/process/step-1-site-assessment.png",
  step2: "/images/process/step-2-plan-procedure.png",
  step3: "/images/process/step-3-execution.png",
  step4: "/images/process/step-4-inspection.png",
  step5: "/images/process/step-5-documentation.png",
};
