/** Official MIDEX brand tokens — sourced from public/branding/Color palette. */
export const brandColors = {
  navy: "#0E1A32",
  navyDark: "#080f1f",
  teal: "#074367",
  gray: "#9D9E9E",
  grayText: "#5c5d5d",
  accent: "#00FF90",
  accentLight: "#80ffc8",
  blue: "#0551C8",
  surface: "#f3f5f8",
  ink: "#0E1A32",
  line: "#dde1e6",
} as const;

/** RGBA glow helpers for inline styles / canvas (matches globals.css tokens). */
export const brandEffects = {
  glowMint: "rgb(0 255 144 / 0.28)",
  glowMintRing: "rgb(0 255 144 / 0.25)",
  glowMintSoft: "rgb(0 255 144 / 0.1)",
  glowBlue: "rgb(5 81 200 / 0.14)",
  shadowNavy: "rgb(14 26 50 / 0.35)",
} as const;

export const brandManifest = {
  themeColor: brandColors.navy,
  backgroundColor: brandColors.navyDark,
} as const;

export const brandFontFamily = "Alexandria, ui-sans-serif, system-ui, sans-serif";
