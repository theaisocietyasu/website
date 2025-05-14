// Aurora Gradient theme color palette
export const colors = {
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },
  secondary: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065",
  },
  accent: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724",
  },
  dark: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },
}

// Gradient definitions
export const gradients = {
  primaryToSecondary: "linear-gradient(to right, #6366f1, #7c3aed)",
  secondaryToAccent: "linear-gradient(to right, #7c3aed, #ec4899)",
  accentToPrimary: "linear-gradient(to right, #ec4899, #6366f1)",
  darkToSecondary: "linear-gradient(to right, #18181b, #7c3aed)",
  radialPrimary: "radial-gradient(circle at center, #6366f1, #1e1b4b)",
  radialSecondary: "radial-gradient(circle at center, #7c3aed, #2e1065)",
  heroGradient: "radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0) 50%)",
  cardGradient: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
}

// Shadows
export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  glow: "0 0 15px rgba(99, 102, 241, 0.5)",
  card: "0 4px 20px rgba(0, 0, 0, 0.15)",
  subtle: "0 2px 10px rgba(0, 0, 0, 0.08)",
}

// Animation durations
export const animations = {
  fast: "150ms",
  medium: "300ms",
  slow: "500ms",
  verySlow: "1000ms",
}
