import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AsciiChip } from "@/components/site/ascii-chip"
import { EventPhoto, ProgramPhotos } from "@/components/site/photos"
import { PixelIcon } from "@/components/site/pixel-icons"
import { MemberCard } from "@/components/site/member-card"
import { Section } from "@/components/site/section"
import { EXECUTIVE_BOARD } from "@/lib/constants"
import { INITIATIVES, LABS, LINKS, MEMBERSHIP, PROGRAMS, PROJECT_KINDS, SITE, SOCIALS, STATS, type Initiative } from "@/lib/site"

const external = { target: "_blank", rel: "noopener noreferrer" } as const

const TICKER = [
  "workshops",
  "paper reading",
  "guest speakers",
  "hackathons",
  "flagship project",
  "summits",
  "movie nights",
  "mountain hikes",
]

// A research semester with a partner lab, as a CLI-style timeline.
const SEMESTER = String.raw`
  01  direction          first weeks
   │
   ▼
  02  research / build   most of the term
   │
   ▼
  03  paper?             end of term`.slice(1)

// The loop, as a CLI-style diagram. Kept under ~44 columns so it fits a phone.
const LOOP = String.raw`
  curiosity ──▶ workshops ──▶ projects
      ▲                          │
      │                          ▼
  community ◀── speakers ◀── research`.slice(1)

const CARD =
  "relative block border border-ink bg-paper p-4 font-body before:absolute before:-left-4 before:top-1/2 before:w-4 before:border-t before:border-dashed before:border-ink/40"

/** An initiative, filed under its folder in the ~/ais/projects listing. No `href` yet means "coming soon". */
function InitiativeCard({ item }: { item: Initiative }) {
  const body = (
    <>
      <span className="label">[{item.kind}]</span>
      <span className="mt-2 block font-display text-lg font-semibold leading-tight tracking-[-0.02em]">{item.name}</span>
    </>
  )
  if (!item.href) {
    return (
      <div className={`${CARD} border-dashed`}>
        {body}
        <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-haze-500">coming soon</span>
      </div>
    )
  }
  return (
    <a href={item.href} {...external} className={`group ${CARD} transition-colors hover:bg-haze-50`}>
      {body}
      <span className="mt-1.5 flex items-center justify-between gap-3 font-mono text-[11px] text-ink-mute">
        <span className="min-w-0 truncate">{new URL(item.href).hostname}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
        />
      </span>
    </a>
  )
}

function Hero() {
  return (
    <section className="sky relative isolate overflow-hidden">
      <div className="wrap relative grid pb-10 pt-6 md:min-h-[min(calc(100svh-var(--nav-h)),940px)] md:grid-rows-[auto_1fr_auto] md:pt-12">
        <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-ink/70">
          <span>Arizona State University</span>
          <span className="hidden sm:inline">33.4242° N · 111.9281° W</span>
        </div>

        <div className="relative grid items-center gap-6 md:grid-cols-12">
          {/* Phones: wordmark → artwork → copy. Desktop: copy on the left, artwork floated right. */}
          <div className="relative z-10 flex flex-col pt-8 md:static md:col-span-7 md:block md:pt-0">
            <h1 className="relative z-10 font-display font-extrabold leading-[0.86] tracking-[-0.055em] text-paper-warm [text-shadow:0_1px_24px_var(--glow)]">
              <span className="mb-3 block font-mono text-sm font-normal uppercase tracking-[0.2em] text-ink/70 [text-shadow:none]">
                The
              </span>{" "}
              <span className="block text-[clamp(4.5rem,15vw,11rem)]">AI</span>{" "}
              <span className="block text-[clamp(2.6rem,8.4vw,6.4rem)]">Society</span>
            </h1>

            <div className="relative -mx-4 mt-2 aspect-square sm:-mx-8 md:absolute md:inset-y-0 md:right-[-7%] md:mx-0 md:mt-0 md:aspect-auto md:w-[64%]">
              <AsciiChip className="absolute inset-0 h-full w-full" />
            </div>

            <div className="relative z-10">
              <p className="mt-2 max-w-md text-lg font-medium leading-snug text-ink md:mt-8 md:text-xl">
                Arizona State University&apos;s student community for artificial intelligence.
              </p>
              <p className="mt-1 text-sm text-ink/70">Open to every major. {SITE.location}.</p>
              <div className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 md:mt-8">
                <a href={LINKS.sunDevilCentral} {...external} className="btn-solid justify-center !gap-1.5 !px-3 !text-[11px] !tracking-[0.06em] sm:!gap-2 sm:!px-5 sm:!text-xs sm:!tracking-[0.12em]">
                  Become a member <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
                <a
                  href={LINKS.discord}
                  {...external}
                  className="btn justify-center bg-paper-warm/40 !gap-1.5 !px-3 !text-[11px] !tracking-[0.06em] backdrop-blur-sm sm:!gap-2 sm:!px-5 sm:!text-xs sm:!tracking-[0.12em]"
                >
                  Join the Discord <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </div>
              <ul aria-label="The AI Society elsewhere" className="mt-7 flex items-center gap-5">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      {...external}
                      aria-label={social.label}
                      title={social.label}
                      className="block text-ink transition-[color,transform] duration-150 hover:-translate-y-px hover:text-paper-warm"
                    >
                      <PixelIcon name={social.label} className="h-[26px] w-[26px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8 hidden items-end justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-ink/70 md:flex">
          <span>Est. at ASU · Student-run</span>
          <a href="#about" className="inline-flex items-center gap-1.5 hover:text-signal">
            Scroll <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

function Ticker() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="overflow-hidden border-y border-ink bg-paper-warm py-3" aria-hidden="true">
      <div className="marquee-track flex w-max gap-8 font-mono text-xs uppercase tracking-[0.16em]">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {item}
            <span className="text-signal">✳</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />

      <Section
        id="about"
        index="01"
        label="About"
        aside={<EventPhoto photo="kickoff" fig={1} />}
        title="A community of lifelong learners, making AI education accessible to every ASU student."
      >
        <div className="grid gap-12 lg:grid-cols-9">
          <div className="space-y-5 text-lg leading-relaxed text-ink-soft lg:col-span-5">
            <p>
              We explore artificial intelligence through workshops, tutorials, research reading groups and hands-on
              projects, regardless of your background or major.
            </p>
            <p>
              Come for a workshop. Stay for the people building, reading, and shipping alongside you.
            </p>
            <dl className="grid grid-cols-2 gap-6 pt-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="border-t border-paper-line pt-4">
                  <dt className="label">{stat.label}</dt>
                  <dd className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em] text-ink md:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="window self-start lg:col-span-4">
            <div className="window-bar">
              <span className="window-title">how_it_works.txt</span>
            </div>
            <div className="overflow-x-auto p-5">
              <pre className="font-mono text-[11px] leading-relaxed text-ink sm:text-xs">{LOOP}</pre>
            </div>
            <figcaption className="border-t border-paper-line px-5 py-3 font-mono text-[11px] text-ink-mute">
              fig. 2: the loop we run every semester
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section
        id="programs"
        index="02"
        label="Programs"
        title="What we do, all year."
        aside={
          <ProgramPhotos
            sectionId="programs"
            photos={PROGRAMS.flatMap((p) => (p.photo ? [p.photo] : []))}
            fig={3}
          />
        }
      >
        <ol className="border-t border-paper-line">
          {PROGRAMS.map((program, i) => (
            <li
              key={program.title}
              data-photo={program.photo}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-b border-paper-line py-7 transition-colors hover:bg-haze-50/60 md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.3fr)_auto] md:items-baseline md:px-2"
            >
              <span className="font-mono text-xs text-ink-mute">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-lg font-semibold tracking-[-0.02em] md:text-xl">{program.title}</h3>
              <p className="col-start-2 leading-relaxed text-ink-soft md:col-start-auto">{program.description}</p>
              <span className="col-start-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal md:col-start-auto">
                [{program.tag}]
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-6 font-mono text-xs text-ink-mute">
          Every program is designed for different skill levels. No prerequisites to show up.
        </p>
      </Section>

      <Section id="initiatives" index="03" label="Initiatives" title="Bigger things we run.">
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Alongside our regular programs, we host flagship events for the wider community: Innovation Hacks, our
          hackathon, where students team up to build with AI, and the AI Summit, which brings students, researchers
          and industry together to talk about where the field is headed.
        </p>
        <ul className="mb-12 grid gap-px border border-ink bg-ink sm:grid-cols-2">
          {INITIATIVES.filter((item) => !item.folder).map((item) => (
            <li key={item.name} className="bg-paper-warm">
              <a
                href={item.href}
                {...external}
                className="group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden p-6 transition-colors hover:bg-haze-50"
              >
                {item.image ? (
                  <>
                    <span aria-hidden="true" className="portrait pointer-events-none !absolute inset-0">
                      <Image src={item.image} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper-warm via-paper-warm/60 to-transparent"
                    />
                  </>
                ) : (
                  <span className="dither pointer-events-none absolute right-0 top-0 h-20 w-20 opacity-60" />
                )}
                <span className="label relative self-start bg-paper-warm/85 px-1.5 py-0.5">[{item.kind}]</span>
                <span className="relative">
                  <span className="block font-display text-2xl font-semibold tracking-[-0.03em]">{item.name}</span>
                  {item.href && (
                    <span className="mt-2 flex items-center justify-between gap-3 font-mono text-xs text-ink-mute">
                      <span className="min-w-0 truncate">{new URL(item.href).hostname}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                      />
                    </span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="window">
          <div className="window-bar">
            <span className="window-title">~/ais/projects</span>
          </div>
          <div className="space-y-8 p-6 font-mono text-[13px] leading-relaxed md:p-8">
            <div>
              <p className="text-ink-mute">
                <span className="text-signal">$</span> cat README.md
              </p>
              <p className="mt-3 max-w-3xl text-ink">
                Beyond events, we build. Members and officers ship real projects together, from the internal tools
                that keep a student organization running to agentic harnesses and physical robots. Some grow into
                initiatives of their own.
              </p>
            </div>
            <div>
              <p className="text-ink-mute">
                <span className="text-signal">$</span> ls -l
              </p>
              <dl className="mt-3 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
                {PROJECT_KINDS.map((kind) => {
                  const inside = INITIATIVES.filter((item) => item.folder === kind.dir)
                  return (
                    <div key={kind.dir}>
                      <dt className="text-haze-500">{kind.dir}</dt>
                      {inside.length > 0 && (
                        <dd className="ml-1.5 mt-3 space-y-3 border-l border-dashed border-ink/40 pl-4">
                          {inside.map((item) => (
                            <InitiativeCard key={item.name} item={item} />
                          ))}
                        </dd>
                      )}
                    </div>
                  )
                })}
              </dl>
            </div>
          </div>
        </div>

      </Section>

      <Section id="research" index="04" label="Research" title="Real research, with ASU labs.">
        <div className="grid gap-10 lg:grid-cols-9">
          <p className="text-lg leading-relaxed text-ink-soft lg:col-span-5">
            Our academic officers volunteer with partner labs across ASU, working on state-of-the-art problems in AI
            where our interests overlap. One semester, one point of contact in the lab, and a real result at the end,
            ideally a paper.
          </p>
          <figure className="window self-start lg:col-span-4">
            <div className="window-bar">
              <span className="window-title">semester.plan</span>
            </div>
            <div className="overflow-x-auto p-5">
              <pre className="font-mono text-[11px] leading-relaxed text-ink sm:text-xs">{SEMESTER}</pre>
            </div>
          </figure>
        </div>

        <ul className="mt-12 grid gap-px border border-ink bg-ink sm:grid-cols-2">
          {LABS.map((lab) => (
            <li key={lab.href} className="bg-paper-warm">
              <a
                href={lab.href}
                {...external}
                className="group relative flex h-full min-h-[260px] flex-col justify-between gap-8 p-6 transition-colors hover:bg-haze-50 md:p-8"
              >
                <span className="dither pointer-events-none absolute right-0 top-0 h-24 w-24 opacity-60" />
                <span className="label relative">[partner lab]</span>
                <span>
                  <span className="block font-display text-3xl font-semibold tracking-[-0.03em]">{lab.name}</span>
                  <span className="mt-1 block text-ink-soft">{lab.fullName}, Arizona State University</span>
                  <span className="mt-5 flex flex-wrap gap-2">
                    {lab.focus.map((f) => (
                      <span
                        key={f}
                        className="border border-ink/25 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft"
                      >
                        {f}
                      </span>
                    ))}
                  </span>
                  <span className="mt-6 flex items-center justify-between gap-3 font-mono text-xs text-ink-mute">
                    <span className="min-w-0 truncate">{new URL(lab.href).hostname}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                    />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-xs text-ink-mute">
          Run a lab at ASU and want to collaborate?{" "}
          <a href={`mailto:${SITE.email}`} className="link">
            {SITE.email}
          </a>
        </p>
      </Section>

      <Section id="join" index="05" label="Membership" title="Three ways in.">
        <div className="window">
          <div className="window-bar">
            <span className="window-title">ais — zsh — 80×24</span>
          </div>
          <div className="grid divide-y divide-paper-line font-mono text-[13px] leading-relaxed md:grid-cols-3 md:divide-x md:divide-y-0">
            {MEMBERSHIP.map((m) => (
              <div key={m.role} className="flex flex-col p-6">
                <p className="text-ink-mute">
                  <span className="text-signal">$</span> ais join --as <span className="text-ink">{m.role}</span>
                </p>
                <dl className="mt-4 flex-1 space-y-3">
                  <div>
                    <dt className="text-haze-500">&gt; how</dt>
                    <dd className="text-ink">{m.how}</dd>
                  </div>
                  <div>
                    <dt className="text-haze-500">&gt; why</dt>
                    <dd className="text-ink">{m.why}</dd>
                  </div>
                </dl>
                <a
                  href={m.href}
                  {...(m.href.startsWith("http") ? external : {})}
                  className="mt-6 self-start border border-ink px-3 py-1.5 uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper"
                >
                  [ {m.cta} ]
                </a>
              </div>
            ))}
          </div>
          <p className="border-t border-paper-line px-6 py-3 font-mono text-[13px] text-ink-mute">
            <span className="text-signal">$</span> <span className="cursor" aria-hidden="true" />
          </p>
        </div>
      </Section>

      <Section id="team" index="06" label="Team" title="Run by students, for students.">
        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {EXECUTIVE_BOARD.map((member) => (
            <li key={member.name}>
              <MemberCard member={member} />
            </li>
          ))}
          <li className="flex">
            <Link
              href="/team"
              className="group flex aspect-[4/5] w-full flex-col justify-between border border-dashed border-ink p-5 transition-colors hover:border-solid hover:bg-ink hover:text-paper"
            >
              <span className="label group-hover:text-paper/70">[roster]</span>
              <span className="font-display text-xl font-semibold leading-tight">
                All officers &amp; alumni{" "}
                <ArrowRight aria-hidden="true" className="inline h-5 w-5 align-[-0.15em] text-signal" />
              </span>
            </Link>
          </li>
        </ul>
      </Section>

      <Section id="opportunities" index="07" label="Opportunities">
        <ul className="border-t border-ink">
          {[
            { href: LINKS.resumeBook, kicker: "resume book", text: "Submit your resume to be considered by our partners." },
            { href: LINKS.officerApplication, kicker: "leadership", text: "Apply to become an officer." },
            { href: LINKS.googleCalendar, kicker: "calendar", text: "Add every AIS event to your calendar." },
          ].map((row) => (
            <li key={row.href} className="border-b border-ink">
              <a
                href={row.href}
                {...external}
                className="group grid grid-cols-[1fr_auto] items-center gap-4 py-7 md:grid-cols-[12rem_1fr_auto]"
              >
                <span className="label hidden md:block">{row.kicker}</span>
                <span className="font-display text-[clamp(1.15rem,2.6vw,1.9rem)] font-semibold leading-tight tracking-[-0.03em] transition-colors group-hover:text-signal">
                  {row.text}
                </span>
                <ArrowUpRight aria-hidden="true" className="h-7 w-7 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <section aria-labelledby="cta-title" className="wrap">
        <div className="sky relative overflow-hidden border border-ink px-6 py-20 text-center md:py-28">
          <p className="label !text-ink/70">[08] Come aboard</p>
          <h2
            id="cta-title"
            className="mx-auto mt-6 max-w-4xl text-balance font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-paper-warm [text-shadow:0_1px_24px_var(--glow)]"
          >
            Build the future you were promised.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={LINKS.sunDevilCentral} {...external} className="btn-solid">
              Sun Devil Central <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
            <a href={LINKS.discord} {...external} className="btn bg-paper-warm/40">
              Discord <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
            <a href={`mailto:${SITE.email}`} className="btn bg-paper-warm/40">
              Email us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
