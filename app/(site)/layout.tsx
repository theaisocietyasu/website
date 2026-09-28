import type { Metadata, Viewport } from "next"
import type React from "react"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SiteNav } from "@/components/site/nav"
import { SiteFooter } from "@/components/site/footer"
import { LINKS, SITE, SOCIALS } from "@/lib/site"
import { body, display, mono } from "./fonts"
import "./site.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "The AI Society at ASU",
    template: "%s · The AI Society at ASU",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "AI Society",
    "Arizona State University",
    "ASU AI club",
    "artificial intelligence",
    "machine learning",
    "student organization",
    "Tempe",
    "AI workshops",
    "hackathon",
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: { canonical: "/" },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE.legalName,
    title: "The AI Society at ASU",
    description: SITE.description,
    images: [{ url: "/og-image.png", width: 2428, height: 1712, alt: SITE.legalName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The AI Society at ASU",
    description: SITE.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
}

export const viewport: Viewport = {
  themeColor: "#f6f7f5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  alternateName: [SITE.name, SITE.shortName],
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  email: SITE.email,
  description: SITE.description,
  parentOrganization: { "@type": "CollegeOrUniversity", name: "Arizona State University" },
  address: { "@type": "PostalAddress", addressLocality: "Tempe", addressRegion: "AZ", addressCountry: "US" },
  sameAs: [...SOCIALS.map((s) => s.href), LINKS.sunDevilCentral],
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="site">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // JSON-LD must be raw; content is static and ours.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
