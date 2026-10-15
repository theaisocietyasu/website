import type { Metadata } from "next"
import { existsSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { DemoBrowser, type DemoItem } from "@/components/site/demo-browser"
import LICENSES from "@/lib/licenses.json"
import { DEMOS } from "@/lib/site"

export const metadata: Metadata = {
  title: "Demos",
  description:
    "Interactive neural network demos from The AI Society at ASU: an MLP, CNNs and a toy language model, step by step. Run them right in your browser.",
  alternates: { canonical: "/demos" },
  openGraph: { url: "/demos" },
}

const DIR = path.join(process.cwd(), "public", "demos")

function formatSize(bytes: number) {
  const kb = bytes / 1024
  return kb < 1024 ? `${Math.round(kb)} KB` : `${(kb / 1024).toFixed(1)} MB`
}

/**
 * DEMOS plus what the files say: link, size, preview. Runs at build time; a missing file leaves its demo off,
 * and a file whose credit doesn't match its entry gets a warning.
 */
function loadDemos(): DemoItem[] {
  return DEMOS.flatMap((demo) => {
    const file = path.join(DIR, `${demo.slug}.html`)
    if (!existsSync(file)) {
      console.warn(`[demos] public/demos/${demo.slug}.html is missing, so "${demo.title}" is left off /demos.`)
      return []
    }
    const html = readFileSync(file, "utf8")
    const licenseUrl = LICENSES[demo.license].url
    const credited =
      html.includes(`<meta name="copyright" content="© ${demo.year} ${demo.author}">`) &&
      (licenseUrl ? html.includes(`<link rel="license" href="${licenseUrl}">`) : !html.includes(`<link rel="license"`))
    if (!credited) {
      console.warn(
        `[demos] public/demos/${demo.slug}.html isn't credited to match DEMOS. Run:\n` +
          `  node scripts/credit-demo.mjs public/demos/${demo.slug}.html "${demo.author}" "${demo.license}" ${demo.year}`,
      )
    }
    const preview = path.join(DIR, "previews", `${demo.slug}.webp`)
    const { author, year, license, ...shown } = demo
    return [
      {
        ...shown,
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
            Small neural networks you can take apart, one step at a time. Run one right here or open it full screen.
            Best on a computer.
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
