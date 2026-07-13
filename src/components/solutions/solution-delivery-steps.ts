export const deliveryStepKeys = [
  "step1",
  "step2",
  "step3",
  "step4",
  "step5",
] as const;

export const deliveryStepImages: Record<(typeof deliveryStepKeys)[number], string> = {
  step1: "/images/hero/slide-1.png",
  step2: "/images/services/welding-docs.png",
  step3: "/images/services/orbital-welding.png",
  step4: "/images/services/passivation-test.png",
  step5: "/images/services/mirror-finish.png",
};
