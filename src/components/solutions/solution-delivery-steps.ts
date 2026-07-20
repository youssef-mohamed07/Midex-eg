export const deliveryStepKeys = [
  "step1",
  "step2",
  "step3",
  "step4",
  "step5",
] as const;

export const DELIVERY_STEP5_IMAGE = "/images/process/step-5-documentation.png";

export const deliveryStepImages: Record<(typeof deliveryStepKeys)[number], string> = {
  step1: "/images/process/step-1-site-assessment.png",
  step2: "/images/process/step-2-plan-procedure.png",
  step3: "/images/process/step-3-execution.png",
  step4: "/images/process/step-4-inspection.png",
  step5: DELIVERY_STEP5_IMAGE,
};

/** Prefer the documentation desk photo for handover / documentation steps. */
export function resolveDeliveryStepImage(
  stepKey: string | undefined,
  image: string | undefined,
  fallback: string = DELIVERY_STEP5_IMAGE,
): string {
  const key = (stepKey ?? "").toLowerCase();
  const isDocumentationStep =
    key.includes("documentation") ||
    key.includes("handover") ||
    key === "step5";

  if (isDocumentationStep) return DELIVERY_STEP5_IMAGE;
  return image?.trim() || fallback;
}
