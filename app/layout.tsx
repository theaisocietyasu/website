import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { outfit, spaceGrotesk } from "@/lib/fonts"
import { ParticleBackground } from "@/components/ui/particle-background"
import AuthSessionProvider from "@/components/providers/session-provider"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "The AI Society | Arizona State University",
  description:
    "Arizona State University's premier AI club dedicated to nurturing knowledge and driving innovation in Artificial Intelligence. Join us in leading the 6th Tech Revolution.",
  keywords:
    "AI, artificial intelligence, ASU, Arizona State University, student club, machine learning, deep learning, AI education, tech revolution, innovation",
  authors: [{ name: "The AI Society at ASU" }],
  creator: "The AI Society at ASU",
  publisher: "The AI Society at ASU",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theaisociety.asu.edu",
    title: "The AI Society | Arizona State University",
    description:
      "Arizona State University's premier AI club dedicated to nurturing knowledge and driving innovation in Artificial Intelligence. Join us in leading the 6th Tech Revolution.",
    siteName: "The AI Society at ASU",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The AI Society at ASU - Arizona State University's Premier AI Club",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theaisocietyasu",
    creator: "@theaisocietyasu",
    title: "The AI Society | Arizona State University",
    description:
      "Arizona State University's premier AI club dedicated to nurturing knowledge and driving innovation in Artificial Intelligence. Join us in leading the 6th Tech Revolution.",
    images: {
      url: "/og-image.png",
      alt: "The AI Society at ASU - Arizona State University's Premier AI Club",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
  generator: "v0.dev",
}

export const viewport: Viewport = {
  themeColor: "#18181b",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Additional meta tags for better social media sharing */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <link rel="canonical" href="https://theaisociety.asu.edu" />
      </head>
      <body className="font-sans antialiased">
        <AuthSessionProvider>
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
            interactiveStrength={0.3}
            className="z-[-5]"
          />

          <Suspense>{children}</Suspense>
          <Analytics />
          <SpeedInsights />
        </AuthSessionProvider>
      </body>
    </html>
  )
}
