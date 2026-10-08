/**
 * Content + links for the public site.
 * Officer/alumni rosters stay in `lib/constants.ts` (shared with /legacy).
 */

export const SITE = {
  name: "The AI Society",
  shortName: "AIS",
  legalName: "The AI Society at Arizona State University",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://theaisociety.asu.edu").replace(/\/$/, ""),
  description:
    "The AI Society is Arizona State University's student community for artificial intelligence: workshops, research paper reading, guest speakers, hackathons and hands-on projects, open to every major.",
  email: "theaisociety@asu.edu",
  location: "Tempe, Arizona",
} as const

export const LINKS = {
  sunDevilCentral: "https://sundevilcentral.eoss.asu.edu/AIS/club_signup",
  discord: "https://discord.gg/dCWm6xBGtM",
  instagram: "https://www.instagram.com/theaisociety.asu/",
  linkedin: "https://www.linkedin.com/company/theaisociety-asu/",
  github: "https://github.com/theaisocietyasu",
  youtube: "https://www.youtube.com/@TheAISocietyASU/",
  resumeBook: "https://theaisociety.notion.site/2858867868b480d9bd10e92d9f56fd6f?pvs=105",
  officerApplication:
    "https://docs.google.com/forms/d/1Qt3cjem9FvS_nFlnGlLP4aIYVDNAAlM2qK4udKxHa3E/viewform",
  googleCalendar: "https://calendar.google.com/calendar/u/0?cid=dGhlYWlzb2NpZXR5LmFzdUBnbWFpbC5jb20",
} as const

export const SOCIALS = [
  { label: "Instagram", href: LINKS.instagram },
  { label: "LinkedIn", href: LINKS.linkedin },
  { label: "GitHub", href: LINKS.github },
  { label: "YouTube", href: LINKS.youtube },
  { label: "Discord", href: LINKS.discord },
] as const

export const NAV = [
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Research", href: "/#research" },
  { label: "Team", href: "/team" },
  { label: "Events", href: "/events" },
] as const

export const STATS = [
  { value: "1000+", label: "General members" },
  { value: "30+", label: "Events per year" },
] as const

/** Photos from our events under public/photos. `caption` reads as a figure caption. */
export const PHOTOS = {
  kickoff: { src: "/photos/kickoff.webp", caption: "AI MakerSpace kickoff" },
  workshop: { src: "/photos/workshop.webp", caption: "Getting Started with Machine Learning" },
  speaker: { src: "/photos/guest-speaker.webp", caption: "guest speaker session" },
  networking: { src: "/photos/networking.webp", caption: "after the talk" },
  team: { src: "/photos/team.webp", caption: "officers and volunteers" },
} as const

export type PhotoKey = keyof typeof PHOTOS

export const PROGRAMS: { title: string; tag: string; description: string; photo?: PhotoKey }[] = [
  {
    title: "Workshops",
    tag: "learn",
    description:
      "From foundational AI concepts and Python basics to machine learning and advanced techniques.",
    photo: "workshop",
  },
  {
    title: "Research Paper Reading",
    tag: "read",
    description: "Sessions working through the latest AI research papers and breakthroughs.",
  },
  {
    title: "AI Flagship Initiative",
    tag: "build",
    description: "A club-wide, multidisciplinary project representing the spirit of AI.",
  },
  {
    title: "Guest Speakers & Recruiting",
    tag: "listen",
    description:
      "Industry and academic researchers sharing insight on AI trends and career paths.",
    photo: "speaker",
  },
  {
    title: "Network Expansion",
    tag: "connect",
    description: "Regular collaborations with organizations and industry across the field of AI.",
    photo: "networking",
  },
  {
    title: "Social & Special Events",
    tag: "gather",
    description:
      "Summits, hackathons, bootcamps, mountain hikes, movie nights and networking that build lasting friendships.",
    photo: "team",
  },
]

/** Folders in the ~/ais/projects console under Initiatives; initiatives with a matching `folder` sit inside. */
export const PROJECT_KINDS = [
  { dir: "internal-tools/" },
  { dir: "education/" },
  { dir: "agent-harnesses/" },
  { dir: "robotics/" },
] as const

export type Initiative = {
  name: string
  kind: string
  /**
   * One of the PROJECT_KINDS directories: the initiative is shown under it in the ~/ais/projects console.
   * Leave it out for flagship events, which get their own tile above the console instead.
   */
  folder?: (typeof PROJECT_KINDS)[number]["dir"]
  /** Omit while it isn't public yet; the card then reads "coming soon". */
  href?: string
  /** Flagship tile background under public/initiatives, shown duotone and in full colour on hover. */
  image?: string
}

export const INITIATIVES: Initiative[] = [
  {
    name: "Innovation Hacks",
    kind: "hackathon",
    href: "https://innovationhacks.dev",
    image: "/initiatives/innovation-hacks.webp",
  },
  { name: "AI Summit", kind: "summit", href: "https://ai-summit.ais-asu.com/", image: "/initiatives/ai-summit.webp" },
  { name: "Bedrock", kind: "tool", folder: "internal-tools/", href: "https://platform.ais-asu.com/" },
  { name: "Godfather", kind: "compute", folder: "internal-tools/", href: "https://pypi.org/project/godfather-cli/" },
  { name: "AI-pedia", kind: "reference", folder: "education/", href: "https://pedia.ais-asu.com/" },
  { name: "SparkyAI", kind: "assistant", folder: "agent-harnesses/", href: "https://sparkyai.lol" },
  { name: "Sir Beeps a Lot", kind: "robot", folder: "robotics/" },
]


export type ResearchPartner = {
  name: string
  /** Shown under the name, e.g. the lab's full name. */
  detail: string
  kind: "lab" | "industry"
  focus: readonly string[]
  /** Omit while the collaboration isn't public; the card then has no link. */
  href?: string
}

/** Labs and companies our officers do research or build products with. Sponsors are listed separately. */
export const RESEARCH_PARTNERS: ResearchPartner[] = [
  {
    name: "MPS Lab",
    detail: "Make Programming Simple Lab, Arizona State University",
    kind: "lab",
    focus: ["intelligent transportation", "AI compilers", "ML for science"],
    href: "https://mpslab-asu.github.io/",
  },
  {
    name: "RISE Lab",
    detail: "Robotics & Intelligent Systems Lab, Arizona State University",
    kind: "lab",
    focus: ["soft robotics", "aerial robots / UAVs", "human-robot interaction"],
    href: "https://home.riselab.info/",
  },
  {
    name: "NewWave Behavioral",
    detail: "Applied behavior analysis practice in Fairfax, VA, serving children and adults with autism and developmental delays",
    kind: "industry",
    focus: ["clinician assistant", "synthetic data", "paper + product"],
    href: "https://www.newwaveaba.com/",
  },
]

/** Event sponsors, shown as a logo row under Membership. Logos live in public/sponsors (transparent PNG or SVG). */
export const SPONSORS = [
  { name: "ReliaQuest", logo: "/sponsors/reliaquest.png", width: 291, height: 71, href: "https://www.reliaquest.com/" },
  { name: "AntonRx", logo: "/sponsors/antonrx.png", width: 790, height: 210, href: "https://www.antonrx.com/" },
] as const

export const MEMBERSHIP = [
  {
    role: "member",
    how: "Join on Sun Devil Central and our Discord.",
    why: "Workshops, events, and a spot in the resume book with participation.",
    href: LINKS.sunDevilCentral,
    cta: "join",
  },
  {
    role: "officer",
    how: "Apply online. Applications are reviewed on a rolling basis.",
    why: "Funding, the alumni network, and opportunities with partner research labs.",
    href: LINKS.officerApplication,
    cta: "apply",
  },
  {
    role: "sponsor",
    how: `Email ${SITE.email}.`,
    why: "Community visibility, exclusive events, and a curated talent resume book.",
    href: `mailto:${SITE.email}`,
    cta: "contact",
  },
] as const
