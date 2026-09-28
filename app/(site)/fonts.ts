import { Inter, JetBrains_Mono, Unbounded } from "next/font/google"

// Wide, soft-cornered display face: the "LUNA" poster energy.
export const display = Unbounded({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
  variable: "--font-display",
})

export const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
})
