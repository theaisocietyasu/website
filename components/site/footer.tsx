import type { ReactNode } from "react"
import Link from "next/link"
import { INITIATIVES, LINKS, NAV, SITE, SOCIALS } from "@/lib/site"

const BANNER = String.raw`
 █████╗ ██╗███████╗
██╔══██╗██║██╔════╝
███████║██║███████╗
██╔══██║██║╚════██║
██║  ██║██║███████║
╚═╝  ╚═╝╚═╝╚══════╝`.slice(1)

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="label mb-4">{title}</h2>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  )
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-ink bg-paper-warm">
      <div className="wrap grid gap-14 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <pre aria-hidden="true" className="font-mono text-[9px] leading-[1.15] text-haze-500 sm:text-[11px]">
            {BANNER}
          </pre>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
            {SITE.legalName}. A student organization in {SITE.location}.
          </p>
          <a href={`mailto:${SITE.email}`} className="link mt-3 inline-block font-mono text-sm">
            {SITE.email}
          </a>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
          <Column title="Site">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link">
                  {item.label}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Initiatives">
            {INITIATIVES.filter((item) => item.href).map((item) => (
              <li key={item.name}>
                <a href={item.href} {...external} className="link">
                  {item.name}
                </a>
              </li>
            ))}
          </Column>
          <Column title="Elsewhere">
            {SOCIALS.map((item) => (
              <li key={item.href}>
                <a href={item.href} {...external} className="link">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={LINKS.sunDevilCentral} {...external} className="link">
                Sun Devil Central
              </a>
            </li>
          </Column>
        </nav>
      </div>

      <div className="border-t border-paper-line">
        <div className="wrap flex flex-col gap-2 py-5 font-mono text-[11px] text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}
          </p>
          <p className="flex gap-4">
            <span>33.4242° N, 111.9281° W</span>
            <Link href="/legacy" className="link">
              /legacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
