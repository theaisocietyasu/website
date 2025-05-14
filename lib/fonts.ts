import { Outfit, Space_Grotesk } from "next/font/google"

// Modern, tech-focused primary font
export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
})

// Secondary font for accents and headings
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})
