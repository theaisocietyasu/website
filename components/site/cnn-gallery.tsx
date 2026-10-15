"use client"

import { useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

/** A DIFFERENT_CNNS entry whose file is there. */
export type CnnItem = { slug: string; name: string; href: string }

const pad = (n: number) => String(n).padStart(2, "0")

/**
 * One network, live. A see-through cover sits over it until it's clicked, because the demo uses the mouse wheel
 * to zoom: without the cover, scrolling the page would stop at every network. Moving the mouse off puts it back.
 */
function CnnFrame({ cnn }: { cnn: CnnItem }) {
  const [active, setActive] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)

  return (
    <section id={`cnn-${cnn.slug}`} aria-label={cnn.name} className="window">
      <div className="window-bar">
        <h3 className="window-title">{cnn.name}</h3>
        <a
          href={cnn.href}
          target="_blank"
          rel="noopener"
          className="absolute right-2 top-1/2 z-10 inline-flex -translate-y-1/2 items-center gap-1 bg-paper-warm px-2 font-mono text-[10px] uppercase tracking-[0.12em] hover:text-signal"
        >
          full screen <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
        </a>
      </div>
      <div
        className="relative aspect-[4/3] bg-ink sm:aspect-[16/10] lg:aspect-[16/9]"
        onMouseLeave={() => setActive(false)}
      >
        <iframe
          ref={frame}
          src={cnn.href}
          title={cnn.name}
          loading="lazy"
          allow="fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
        {!active && (
          <button
            type="button"
            aria-label={`Use ${cnn.name}`}
            onClick={() => {
              setActive(true)
              frame.current?.focus()
            }}
            className="group absolute inset-0 flex cursor-pointer items-center justify-center"
          >
            <span className="rounded-full border border-paper-warm/60 bg-ink/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-paper-warm opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              click to use
            </span>
          </button>
        )}
      </div>
    </section>
  )
}

/** "Different CNNs": every network live, one under the other, with a row of names to jump between them. */
export function CnnGallery({ cnns }: { cnns: CnnItem[] }) {
  return (
    <section id="different-cnns" aria-labelledby="different-cnns-title" className="wrap pt-24">
      <div className="mb-6 flex items-baseline justify-between border-t border-ink pt-5">
        <h2 id="different-cnns-title" className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          Different CNNs
        </h2>
        <span className="label">
          <span className="text-signal">[{pad(cnns.length)}]</span> oldest first
        </span>
      </div>
      <nav aria-label="Jump to a network" className="mb-10 flex flex-wrap gap-2">
        {cnns.map((cnn) => (
          <a key={cnn.slug} href={`#cnn-${cnn.slug}`} className="btn !px-3.5 !py-1.5 !text-[11px]">
            {cnn.name}
          </a>
        ))}
      </nav>
      <div className="space-y-14">
        {cnns.map((cnn) => (
          <CnnFrame key={cnn.slug} cnn={cnn} />
        ))}
      </div>
    </section>
  )
}
