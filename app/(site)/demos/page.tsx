import type { Metadata } from "next"
import { existsSync, statSync } from "node:fs"
import path from "node:path"
import { DemoBrowser, type DemoItem } from "@/components/site/demo-browser"
import { DEMOS } from "@/lib/site"

export const metadata: Metadata = {
  title: "Demos",
  description:
    "Interactive neural network demos from The AI Society at ASU: an MLP, a CNN and a toy language model, step by step. Run them in the browser or download them to use offline.",
  alternates: { canonical: "/demos" },
  openGraph: { url: "/demos" },
}

const DIR = path.join(process.cwd(), "public", "demos")

function formatSize(bytes: number) {
  const kb = bytes / 1024
  return kb < 1024 ? `${Math.round(kb)} KB` : `${(kb / 1024).toFixed(1)} MB`
}

/** DEMOS plus what the files say: link, size, preview. Runs at build time; a missing file leaves its demo off. */
function loadDemos(): DemoItem[] {
  return DEMOS.flatMap((demo) => {
    const file = path.join(DIR, `${demo.slug}.html`)
    if (!existsSync(file)) {
      console.warn(`[demos] public/demos/${demo.slug}.html is missing, so "${demo.title}" is left off /demos.`)
      return []
    }
    const preview = path.join(DIR, "previews", `${demo.slug}.webp`)
    return [
      {
        ...demo,
        href: `/demos/${demo.slug}.html`,
        size: formatSize(statSync(file).size),
        preview: existsSync(preview) ? `/demos/previews/${demo.slug}.webp` : undefined,
      },
    ]
  })
}

const pad = (n: number) => String(n).padStart(2, "0")

export default function DemosPage() {
  const demos = loadDemos()

  return (
    <>
      <header className="sky">
        <div className="wrap pb-16 pt-16 md:pb-24 md:pt-24">
          <p className="label !text-ink/70">[lab] {pad(demos.length)} interactive demos</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,10vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-paper-warm [text-shadow:0_1px_24px_var(--glow)]">
            Demos
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-snug text-ink">
            Small neural networks you can take apart, one step at a time. Each is a single HTML file: run it here, or
            download it and it works offline. Best on a computer.
          </p>
        </div>
      </header>

      {demos.length > 0 ? (
        <DemoBrowser demos={demos} />
      ) : (
        <p className="wrap pt-20 text-ink-soft">No demos yet. Check back soon.</p>
      )}
    </>
  )
}
