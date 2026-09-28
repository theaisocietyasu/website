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

export const PROGRAMS = [
  {
    title: "Workshops",
    tag: "learn",
    description:
      "From foundational AI concepts and Python basics to machine learning and advanced techniques.",
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
  },
  {
    title: "Network Expansion",
    tag: "connect",
    description: "Regular collaborations with organizations and industry across the field of AI.",
  },
  {
    title: "Social & Special Events",
    tag: "gather",
    description:
      "Summits, hackathons, bootcamps, mountain hikes, movie nights and networking that build lasting friendships.",
  },
] as const

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
  /** Background photo or artwork under public/initiatives, shown duotone and in full colour on hover. */
  image?: string
  /** "contain" for logos that must not be cropped; photos default to cover. */
  imageFit?: "cover" | "contain"
}

export const INITIATIVES: Initiative[] = [
  {
    name: "Innovation Hacks",
    kind: "hackathon",
    href: "https://innovationhacks.dev",
    image: "/initiatives/innovation-hacks.webp",
  },
  { name: "AI Summit", kind: "summit", href: "https://ai-summit.ais-asu.com/", image: "/initiatives/ai-summit.webp" },
  { name: "Bedrock", kind: "tool", folder: "internal-tools/" },
  { name: "Godfather", kind: "compute", folder: "internal-tools/", href: "https://pypi.org/project/godfather-cli/" },
  {
    name: "AI-pedia",
    kind: "reference",
    folder: "education/",
    href: "https://ai-pedia.ais-asu.com/",
    image: "/initiatives/ai-pedia.webp",
  },
  {
    name: "SparkyAI",
    kind: "assistant",
    folder: "agent-harnesses/",
    href: "https://sparkyai.lol",
    image: "/initiatives/sparkyai.webp",
    imageFit: "contain",
  },
  { name: "Sir Beeps a Lot", kind: "robot", folder: "robotics/" },
]


/** Partner labs where our academic officers join real research projects. */
export const LABS = [
  {
    name: "MPS Lab",
    fullName: "Make Programming Simple Lab",
    focus: ["intelligent transportation", "AI compilers", "ML for science"],
    href: "https://mpslab-asu.github.io/",
  },
  {
    name: "RISE Lab",
    fullName: "Robotics & Intelligent Systems Lab",
    focus: ["soft robotics", "aerial robots / UAVs", "human-robot interaction"],
    href: "https://home.riselab.info/",
  },
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
