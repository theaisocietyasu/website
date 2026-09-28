import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { MemberCard } from "@/components/site/member-card"
import {
  ACADEMIC_OFFICERS,
  AIS_ALUMNI,
  COLLABORATION_OFFICERS,
  EXECUTIVE_BOARD,
  OPERATIONS_OFFICERS,
  PROJECT_DEVELOPERS,
} from "@/lib/constants"
import { LINKS } from "@/lib/site"

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the officers who run The AI Society at Arizona State University: executive board, academic officers, project developers, collaboration and operations, plus our alumni.",
  alternates: { canonical: "/team" },
  openGraph: { url: "/team" },
}

const GROUPS = [
  { id: "executive", title: "Executive Board", members: EXECUTIVE_BOARD },
  { id: "academic", title: "Academic Officers", members: ACADEMIC_OFFICERS },
  { id: "projects", title: "Project Developers", members: PROJECT_DEVELOPERS },
  { id: "collaboration", title: "Collaboration Officers", members: COLLABORATION_OFFICERS },
  { id: "operations", title: "Operations Officers", members: OPERATIONS_OFFICERS },
].filter((group) => group.members.length > 0) // a role with no one in it this year simply isn't listed

const pad = (n: number) => String(n).padStart(2, "0")

export default function TeamPage() {
  const officerCount = GROUPS.reduce((sum, g) => sum + g.members.length, 0)

  return (
    <>
      <header className="sky">
        <div className="wrap pb-16 pt-16 md:pb-24 md:pt-24">
          <p className="label !text-ink/70">[roster] {pad(officerCount)} officers · {pad(AIS_ALUMNI.length)} alumni</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,10vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-paper-warm [text-shadow:0_1px_24px_var(--glow)]">
            The Team
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-snug text-ink">
            The students building a community for AI at ASU, and the alumni who built it before them.
          </p>
          <nav aria-label="Teams" className="mt-10 flex flex-wrap gap-2">
            {[...GROUPS, { id: "alumni", title: "Alumni" }].map((g) => (
              <a key={g.id} href={`#${g.id}`} className="btn bg-paper-warm/40 !px-3.5 !py-1.5 !text-[11px]">
                {g.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {GROUPS.map((group, gi) => (
        <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="wrap pt-20">
          <div className="mb-8 flex items-baseline justify-between border-t border-ink pt-5">
            <h2 id={`${group.id}-title`} className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
              {group.title}
            </h2>
            <span className="label">
              <span className="text-signal">[{pad(gi + 1)}]</span> {pad(group.members.length)}
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {group.members.map((member, i) => (
              <li key={member.name}>
                <MemberCard member={member} priority={gi === 0 && i < 5} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section id="alumni" aria-labelledby="alumni-title" className="wrap pt-24">
        <div className="mb-8 flex items-baseline justify-between border-t border-ink pt-5">
          <h2 id="alumni-title" className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
            Alumni
          </h2>
          <span className="label">
            <span className="text-signal">[{pad(GROUPS.length + 1)}]</span> {pad(AIS_ALUMNI.length)}
          </span>
        </div>
        <ul className="grid border-t border-paper-line sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
          {AIS_ALUMNI.map((member) => (
            <li key={member.name} className="group flex items-center gap-4 border-b border-paper-line py-3.5">
              <div className="portrait h-11 w-11 shrink-0 rounded-full border border-ink">
                <Image src={member.imageSrc} alt="" fill sizes="44px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium leading-tight">{member.name}</p>
                <p className="truncate text-sm text-ink-mute">{member.position}</p>
              </div>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="inline-flex items-center gap-0.5 font-mono text-xs text-ink-mute hover:text-signal"
                >
                  in <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap pt-24">
        <div className="window">
          <div className="window-bar">
            <span className="window-title">recruiting.txt</span>
          </div>
          <div className="flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-center md:p-8">
            <p className="font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">
              Want your name on this page? Officer applications are reviewed on a rolling basis.
            </p>
            <a href={LINKS.officerApplication} target="_blank" rel="noopener noreferrer" className="btn-solid shrink-0">
              Apply <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
