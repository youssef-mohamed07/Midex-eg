export const deliveryStepKeys = [
  "step1",
  "step2",
  "step3",
  "step4",
  "step5",
] as const;

export const DELIVERY_STEP5_IMAGE = "/images/process/step-5-documentation.webp";

export const deliveryStepImages: Record<(typeof deliveryStepKeys)[number], string> = {
  step1: "/images/process/step-1-site-assessment.webp",
  step2: "/images/process/step-2-plan-procedure.webp",
  step3: "/images/process/step-3-execution.webp",
  step4: "/images/process/step-4-inspection.webp",
  step5: DELIVERY_STEP5_IMAGE,
};

/** Prefer compressed WebP for known local process assets. */
function preferLocalWebp(src: string): string {
  if (src.startsWith("/images/process/") && src.endsWith(".png")) {
    return src.replace(/\.png$/, ".webp");
  }
  return src;
}

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
  const resolved = image?.trim() || fallback;
  return preferLocalWebp(resolved);
}
