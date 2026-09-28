"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { LINKS, NAV } from "@/lib/site"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="font-mono text-[11px] uppercase tracking-[0.14em]"
      >
        {open ? "[ close ]" : "[ menu ]"}
      </button>
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-[var(--nav-h)] border-b border-ink bg-paper-warm shadow-[0_6px_0_0_var(--ink)]"
        >
          <ul className="wrap flex flex-col py-4">
            {NAV.map((item, i) => (
              <li key={item.href} className="border-b border-paper-line last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 font-display text-xl font-semibold"
                >
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <a href={LINKS.sunDevilCentral} target="_blank" rel="noopener noreferrer" className="btn-solid w-full justify-center">
                Join on Sun Devil Central <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
