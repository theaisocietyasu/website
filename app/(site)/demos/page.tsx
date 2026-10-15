import type { Metadata } from "next"
import { existsSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { CnnGallery, type CnnItem } from "@/components/site/cnn-gallery"
import { DemoBrowser, type DemoItem } from "@/components/site/demo-browser"
import LICENSES from "@/lib/licenses.json"
import { DEMOS, DIFFERENT_CNNS, type DemoLicense } from "@/lib/site"

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
 * Build-time check of a demo file under public/demos: false (with a warning) when it's missing, and a warning when
 * the credit written into it doesn't match its entry in lib/site.ts.
 */
function checkFile(rel: string, label: string, credit: { author: string; year: number; license: DemoLicense }) {
  const file = path.join(DIR, rel)
  if (!existsSync(file)) {
    console.warn(`[demos] public/demos/${rel} is missing, so "${label}" is left off /demos.`)
    return false
  }
  const html = readFileSync(file, "utf8")
  const licenseUrl = LICENSES[credit.license].url
  const credited =
    html.includes(`<meta name="copyright" content="© ${credit.year} ${credit.author}">`) &&
    (licenseUrl ? html.includes(`<link rel="license" href="${licenseUrl}">`) : !html.includes(`<link rel="license"`))
  if (!credited) {
    console.warn(
      `[demos] public/demos/${rel} isn't credited to match lib/site.ts. Run:\n` +
        `  node scripts/credit-demo.mjs public/demos/${rel} "${credit.author}" "${credit.license}" ${credit.year}`,
    )
  }
  return true
}

/** DEMOS plus what the files say: link, size, preview. Runs at build time; a missing file leaves its demo off. */
function loadDemos(): DemoItem[] {
  return DEMOS.flatMap((demo) => {
    if (!checkFile(`${demo.slug}.html`, demo.title, demo)) return []
    const file = path.join(DIR, `${demo.slug}.html`)
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

/** DIFFERENT_CNNS whose files are there, with their links. */
function loadCnns(): CnnItem[] {
  return DIFFERENT_CNNS.flatMap((cnn) =>
    checkFile(`cnns/${cnn.slug}.html`, cnn.name, cnn)
      ? [{ slug: cnn.slug, name: cnn.name, href: `/demos/cnns/${cnn.slug}.html` }]
      : [],
  )
}

const pad = (n: number) => String(n).padStart(2, "0")

export default function DemosPage() {
  const demos = loadDemos()
  const cnns = loadCnns()

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

      {cnns.length > 0 && <CnnGallery cnns={cnns} />}
    </>
  )
}
