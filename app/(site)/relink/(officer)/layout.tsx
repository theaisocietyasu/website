import type { Metadata } from "next"
import type React from "react"
import { Suspense } from "react"
import AuthSessionProvider from "@/components/providers/session-provider"

export const metadata: Metadata = {
  title: "Relink editor",
  robots: { index: false, follow: false },
}

export default function RelinkOfficerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthSessionProvider>
      <Suspense>{children}</Suspense>
    </AuthSessionProvider>
  )
}
