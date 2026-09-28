import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { RelinkMarkdown } from "@/components/site/relink/markdown"
import { getRelinkContent } from "@/lib/relink"
import type { RelinkBanner, RelinkLink } from "@/lib/types"

export const metadata: Metadata = {
  title: "Links",
  description: "Every current link for The AI Society at Arizona State University: sign-ups, forms, socials and announcements.",
  alternates: { canonical: "/relink" },
  openGraph: { url: "/relink" },
}

// Officers edit these in /relink/edit; always render the current set.
export const dynamic = "force-dynamic"

const pad = (n: number) => String(n).padStart(2, "0")

async function load(): Promise<{ links: RelinkLink[]; banners: RelinkBanner[] } | null> {
  try {
    return await getRelinkContent()
  } catch (error) {
    console.error("Error loading relink content:", error)
    return null
  }
}

export default async function RelinkPage() {
  const content = await load()
  const links = content?.links ?? []
  const banners = content?.banners ?? []

  return (
    <>
      <header className="sky">
        <div className="wrap pb-16 pt-16 md:pb-20 md:pt-24">
          <p className="label !text-ink/70">[links] {pad(links.length)} active</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,10vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-paper-warm [text-shadow:0_1px_24px_var(--glow)]">
            Links
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-snug text-ink">
            Sign-ups, forms and announcements, kept current by our officers.
          </p>
        </div>
      </header>

      <div className="wrap max-w-3xl pt-16">
        {banners.length > 0 && (
          <div className="mb-16 space-y-10">
            {banners.map((banner) => (
              <article key={banner._id} className="window">
                <div className="window-bar">
                  <span className="window-title">announcement.md</span>
                </div>
                {banner.imageUrl && (
                  // Banner images are officer uploads or arbitrary https hosts, so skip the optimizer.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={banner.imageUrl} alt="" className="block aspect-video w-full border-b border-ink object-cover" />
                )}
                <div className="p-6 md:p-8">
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em]">{banner.title}</h2>
                  <RelinkMarkdown className="mt-4">{banner.content}</RelinkMarkdown>
                </div>
              </article>
            ))}
          </div>
        )}

        {links.length > 0 ? (
          <ul className="border-t border-ink">
            {links.map((link, i) => (
              <li key={link._id} className="border-b border-ink">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6"
                >
                  <span className="label text-signal">{pad(i + 1)}</span>
                  <span>
                    <span className="block font-display text-[clamp(1.1rem,2.4vw,1.6rem)] font-semibold leading-tight tracking-[-0.03em] transition-colors group-hover:text-signal">
                      {link.title}
                    </span>
                    {link.description && <span className="mt-1 block text-sm text-ink-soft">{link.description}</span>}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-6 w-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="dither border border-dashed border-ink/40 px-6 py-16 text-center">
            <p className="label">{content ? "no links yet" : "links are unavailable right now"}</p>
          </div>
        )}
      </div>
    </>
  )
}
