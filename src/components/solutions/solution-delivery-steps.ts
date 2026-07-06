export const deliveryStepKeys = [
  "step1",
  "step2",
  "step3",
  "step4",
  "step5",
  "step6",
] as const;

export const deliveryStepImages: Record<(typeof deliveryStepKeys)[number], string> = {
  step1: "/images/hero/slide-1.png",
  step2: "/images/services/orbital-welding.png",
  step3: "/images/services/mechanical-polishing.png",
  step4: "/images/services/spray-ball.png",
  step5: "/images/services/welding-docs.png",
  step6: "/images/services/passivation-test.png",
};
