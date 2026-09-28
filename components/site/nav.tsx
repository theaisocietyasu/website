import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { LINKS, NAV } from "@/lib/site"
import { ChipLogo } from "./logo"
import { MobileMenu } from "./mobile-menu"

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-paper-line bg-paper/85 backdrop-blur-md">
      <nav aria-label="Primary" className="wrap flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="The AI Society, home">
          <ChipLogo className="h-10 w-10 shrink-0" />
          <span className="font-display text-[13px] font-semibold uppercase tracking-[0.08em]">
            The AI Society
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-signal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={LINKS.sunDevilCentral} target="_blank" rel="noopener noreferrer" className="btn-solid !px-4 !py-2">
            Join <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>

        <MobileMenu />
      </nav>
    </header>
  )
}
