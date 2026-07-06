/**
 * Legacy `/solutions/[slug]` → `/solutions/group/[slug]/[child]` redirect map.
 *
 * This is URL-structure data (not editable content) kept static so the
 * middleware can redirect without a network round-trip. Slugs never change —
 * they are the site's permanent URL contract.
 */
const groupSlugs = ["solutions", "welding", "systems", "installations"] as const;

const childToGroup: Record<string, string> = {
  "pw-station-modification": "solutions",
  "distribution-skids-modification": "solutions",
  "loop-design-modification": "solutions",
  "manual-welding": "welding",
  "automatic-orbital-welding": "welding",
  "cleaning-in-place-system": "systems",
  "sanitization-in-place-system": "systems",
  "purified-water-station": "systems",
  "distribution-skids": "systems",
  "purified-loop-system": "installations",
  "preparation-pipe-line": "installations",
  "sanitary-drain-pipeline": "installations",
  "compressed-air-pipe-line-installation": "installations",
};

/** Maps legacy `/solutions/[slug]` URLs to the unified group/child routes. */
export function resolveLegacySolutionPath(slug: string): string | null {
  if ((groupSlugs as readonly string[]).includes(slug)) {
    return `/solutions/group/${slug}`;
  }

  const group = childToGroup[slug];
  if (group) return `/solutions/group/${group}/${slug}`;

  return null;
}
