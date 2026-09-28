"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn, useSession } from "next-auth/react"

const ERRORS: Record<string, string> = {
  AccessDenied: "That Discord account does not have the officer role in the AI Society server.",
}

export default function RelinkSignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { status } = useSession()
  const [pending, setPending] = useState(false)
  const errorParam = searchParams.get("error")
  const error = errorParam ? ERRORS[errorParam] ?? "Sign-in failed. Try again." : null

  useEffect(() => {
    if (status === "authenticated") router.replace("/relink/edit")
  }, [status, router])

  return (
    <div className="wrap flex min-h-[70vh] items-center justify-center py-20">
      <section className="window w-full max-w-md">
        <div className="window-bar">
          <span className="window-title">officers_only</span>
        </div>
        <div className="p-6 md:p-8">
          <p className="label">[relink] editor</p>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.03em]">Sign in</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Use the Discord account that holds the officer role in the AI Society server.
          </p>

          {error && (
            <p role="alert" className="mt-6 border border-signal bg-signal-soft/40 px-3 py-2.5 text-sm text-ink">
              {error}
            </p>
          )}

          <button
            type="button"
            className="btn-solid mt-8 w-full justify-center"
            disabled={pending || status === "loading"}
            onClick={() => {
              setPending(true)
              signIn("discord", { callbackUrl: "/relink/edit" })
            }}
          >
            {pending ? "Redirecting..." : "Continue with Discord"}
          </button>
        </div>
      </section>
    </div>
  )
}
