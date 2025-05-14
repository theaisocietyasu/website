import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { outfit, spaceGrotesk } from "@/lib/fonts"
import { ParticleBackground } from "@/components/ui/particle-background"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "The AI Society | Arizona State University",
  description:
    "Arizona State University's premier AI club dedicated to nurturing knowledge and driving innovation in Artificial Intelligence.",
  keywords:
    "AI, artificial intelligence, ASU, Arizona State University, student club, machine learning, deep learning, AI education",
  authors: [{ name: "The AI Society at ASU" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theaisociety.asu.edu",
    title: "The AI Society | Arizona State University",
    description:
      "Arizona State University's premier AI club dedicated to nurturing knowledge and driving innovation in Artificial Intelligence.",
    siteName: "The AI Society at ASU",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The AI Society at ASU",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The AI Society | Arizona State University",
    description:
      "Arizona State University's premier AI club dedicated to nurturing knowledge and driving innovation in Artificial Intelligence.",
    images: ["/og-image.jpg"],
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#18181b",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        {/* Background elements */}
        <ParticleBackground
          particleCount={50}
          particleSize={[1, 2]}
          particleSpeed={[0.05, 0.2]}
          particleColor={["#6366f1", "#8b5cf6", "#ec4899"]}
          particleOpacity={[0.2, 0.5]}
          connectParticles={true}
          connectDistance={150}
          connectWidth={0.5}
          connectOpacity={0.1}
          interactive={true}
          interactiveDistance={150}
          interactiveStrength={5}
        />

        <Suspense>{children}</Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
