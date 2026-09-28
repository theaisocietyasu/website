import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { LINKS } from "@/lib/site"

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming workshops, paper readings, guest speakers, hackathons and socials from The AI Society at Arizona State University.",
  alternates: { canonical: "/events" },
  openGraph: { url: "/events" },
}

// Live boards maintained by officers in Notion.
const BOARDS = [
  {
    title: "Events calendar",
    file: "calendar.notion",
    src: "https://theaisociety.notion.site/ebd/2678867868b4806e8ce0e81e94f95b99?v=2678867868b481f18a38000c715b632d",
  },
  {
    title: "More events",
    file: "more_events.notion",
    src: "https://theaisociety.notion.site/ebd/2798867868b480319245c67676e03700?v=2798867868b481529f75000c0d647244",
  },
]

export default function EventsPage() {
  return (
    <>
      <header className="sky">
        <div className="wrap pb-16 pt-16 md:pb-24 md:pt-24">
          <p className="label !text-ink/70">[schedule] 30+ events a year</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,10vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-paper-warm [text-shadow:0_1px_24px_var(--glow)]">
            Events
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-snug text-ink">
            Workshops, seminars, speakers and socials. Subscribe once and every event lands in your calendar.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={LINKS.googleCalendar} target="_blank" rel="noopener noreferrer" className="btn-solid">
              Add to Google Calendar <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
            <a href={LINKS.discord} target="_blank" rel="noopener noreferrer" className="btn bg-paper-warm/40">
              Announcements on Discord <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      <div className="wrap space-y-16 pt-20">
        {BOARDS.map((board) => (
          <section key={board.src} aria-label={board.title} className="window">
            <div className="window-bar">
              <span className="window-title">{board.file}</span>
            </div>
            <iframe
              src={board.src}
              title={board.title}
              loading="lazy"
              className="block h-[640px] w-full bg-white"
            />
          </section>
        ))}
      </div>
    </>
  )
}
