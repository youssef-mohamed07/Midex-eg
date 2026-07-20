/**
 * Canonical "Our Standards" card images (shared across About + Solutions pages).
 */
export const OUR_STANDARDS_IMAGES = [
  "/images/about/values/precision.webp",
  "/images/about/values/compliance.webp",
  "/images/about/values/reliability.webp",
  "/images/about/values/full-traceability.webp",
  "/images/about/values/contamination-control.webp",
  "/images/about/values/proven-expertise.webp",
] as const;

export const OUR_STANDARDS_IMAGE_BY_KEY: Record<string, string> = {
  precision: OUR_STANDARDS_IMAGES[0],
  compliance: OUR_STANDARDS_IMAGES[1],
  reliability: OUR_STANDARDS_IMAGES[2],
  "full-traceability": OUR_STANDARDS_IMAGES[3],
  "contamination-control": OUR_STANDARDS_IMAGES[4],
  "proven-expertise": OUR_STANDARDS_IMAGES[5],
  // About page legacy keys
  value1: OUR_STANDARDS_IMAGES[0],
  value2: OUR_STANDARDS_IMAGES[1],
  value3: OUR_STANDARDS_IMAGES[2],
  value4: OUR_STANDARDS_IMAGES[3],
  value5: OUR_STANDARDS_IMAGES[4],
  value6: OUR_STANDARDS_IMAGES[5],
};

export function resolveOurStandardsImage(
  key: string | undefined,
  index: number,
): string | undefined {
  const normalized = (key ?? "").toLowerCase();
  return (
    OUR_STANDARDS_IMAGE_BY_KEY[normalized] ?? OUR_STANDARDS_IMAGES[index] ?? undefined
  );
}
