"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Play } from "lucide-react"
import type { Demo } from "@/lib/site"

/** A DEMOS entry plus what the page found on disk. */
export type DemoItem = Demo & { href: string; size: string; preview?: string; licenseUrl?: string }

/** "© 2026 Joshua Tom · CC BY-NC-ND 4.0", the license linked to its terms. */
function Credit({ demo, className = "" }: { demo: DemoItem; className?: string }) {
  return (
    <p className={`font-mono text-[11px] text-ink-mute ${className}`}>
      © {demo.year} {demo.author} ·{" "}
      {demo.licenseUrl ? (
        <a href={demo.licenseUrl} target="_blank" rel="license noopener noreferrer" className="link relative z-10">
          {demo.license}
        </a>
      ) : (
        "all rights reserved"
      )}
    </p>
  )
}

const pad = (n: number) => String(n).padStart(2, "0")

function Preview({ demo, sizes, className = "" }: { demo: DemoItem; sizes: string; className?: string }) {
  if (demo.preview) {
    return <Image src={demo.preview} alt="" fill sizes={sizes} className={`object-cover ${className}`} />
  }
  return (
    <div className="dither absolute inset-0 flex items-center justify-center bg-haze-100">
      <span className="bg-paper-warm px-3 py-1 font-mono text-xs text-ink">{demo.slug}.html</span>
    </div>
  )
}

/**
 * The demo on screen (a preview until "Run it here" loads the real page), its blurb and a full-screen link,
 * then every demo as a card. /demos#<slug> opens on that demo, and the hash follows the selection.
 */
export function DemoBrowser({ demos }: { demos: DemoItem[] }) {
  const [index, setIndex] = useState(0)
  const [running, setRunning] = useState(false)
  const viewer = useRef<HTMLElement>(null)
  const demo = demos[index]

  useEffect(() => {
    const fromHash = () => {
      const i = demos.findIndex((d) => `#${d.slug}` === window.location.hash)
      if (i < 0) return
      setIndex(i)
      setRunning(false)
      viewer.current?.scrollIntoView({ block: "start" })
    }
    fromHash()
    window.addEventListener("hashchange", fromHash)
    return () => window.removeEventListener("hashchange", fromHash)
  }, [demos])

  const show = (i: number) => {
    if (i !== index) {
      setIndex(i)
      setRunning(false)
      history.replaceState(null, "", `#${demos[i].slug}`)
    }
    viewer.current?.scrollIntoView({ block: "start" })
  }

  return (
    <>
      <section ref={viewer} aria-labelledby="demo-title" className="wrap pt-16 md:pt-20">
        <div className="window">
          <div className="window-bar">
            <span className="window-title">{demo.slug}.html</span>
            {running && (
              <button
                type="button"
                onClick={() => setRunning(false)}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-paper-warm px-2 font-mono text-[10px] uppercase tracking-[0.12em] hover:text-signal"
              >
                ■ stop
              </button>
            )}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/10] lg:aspect-[16/9]">
            {running ? (
              <iframe
                key={demo.slug}
                src={demo.href}
                title={demo.title}
                allow="fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setRunning(true)}
                className="group absolute inset-0 block w-full"
                aria-label={`Run ${demo.title} here (${demo.size})`}
              >
                <Preview
                  demo={demo}
                  sizes="(min-width: 1240px) 1130px, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <span className="absolute inset-0 bg-ink/40 transition-colors duration-300 group-hover:bg-ink/25" />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-paper-warm bg-ink/40 px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper-warm backdrop-blur-sm transition-colors group-hover:border-signal group-hover:bg-signal">
                    <Play aria-hidden="true" className="h-3.5 w-3.5 fill-current" /> Run it here
                  </span>
                  <span className="font-mono text-[11px] text-paper-warm/80">{demo.size} · loads in this page</span>
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="label">
              <span className="text-signal">[{pad(index + 1)}]</span> {demo.tag} · {demo.size}
            </p>
            <h2
              id="demo-title"
              className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
            >
              {demo.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-snug text-ink-soft">{demo.blurb}</p>
            <Credit demo={demo} className="mt-4" />
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <a href={demo.href} target="_blank" rel="noopener" className="btn-solid">
              Full screen <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="all-demos-title" className="wrap pt-24">
        <div className="mb-8 flex items-baseline justify-between border-t border-ink pt-5">
          <h2 id="all-demos-title" className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
            All demos
          </h2>
          <span className="label">
            <span className="text-signal">[{pad(demos.length)}]</span> run in your browser
          </span>
        </div>
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((d, i) => {
            const on = i === index
            return (
              <li key={d.slug}>
                <article
                  className={`group relative flex h-full flex-col border bg-paper-warm transition-shadow duration-200 ${
                    on ? "border-signal shadow-[6px_6px_0_0_var(--signal)]" : "border-ink hover:shadow-[6px_6px_0_0_var(--ink)]"
                  }`}
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden border-b bg-ink ${on ? "border-signal" : "border-ink"}`}
                  >
                    <Preview
                      demo={d}
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="label">
                      <span className="text-signal">[{pad(i + 1)}]</span> {d.tag} · {d.size}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-[-0.02em]">
                      {/* Stretched over the whole card: clicking anywhere puts this demo on screen. */}
                      <button
                        type="button"
                        onClick={() => show(i)}
                        aria-current={on ? "true" : undefined}
                        className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-signal"
                      >
                        {d.title}
                      </button>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d.blurb}</p>
                    <Credit demo={d} className="mt-3" />
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <span className={`label ${on ? "!text-signal" : ""}`}>{on ? "● on screen" : "show ↑"}</span>
                      <a
                        href={d.href}
                        target="_blank"
                        rel="noopener"
                        className="relative z-10 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink hover:text-signal"
                      >
                        Full screen <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-ink-mute">
          Each demo belongs to its author and is shared under the license shown with it, not the site&apos;s own
          copyright. Data inside a demo keeps its own license.
        </p>
      </section>
    </>
  )
}
