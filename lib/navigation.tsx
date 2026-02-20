import { IconHome, IconUsers, IconCalendar, IconCode } from "@tabler/icons-react"
import type { NavItem } from "@/lib/types"

/**
 * Shared navigation items used across all pages
 */
export const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-6 w-6" />,
  },
  {
    name: "Projects",
    link: "/projects",
    icon: <IconUsers className="h-6 w-6" />,
  },
  {
    name: "Software Corner",
    link: "/software-corner",
    icon: <IconCode className="h-6 w-6" />,
  },
  {
    name: "Events",
    link: "/events",
    icon: <IconCalendar className="h-6 w-6" />,
  },
  {
    name: "SDC",
    link: "https://sundevilcentral.eoss.asu.edu/AIS/club_signup",
    icon: <IconCalendar className="h-6 w-6" />,
  },
]

/**
 * Discord server invite link
 */
export const DISCORD_INVITE_URL = "https://discord.gg/dCWm6xBGtM"
