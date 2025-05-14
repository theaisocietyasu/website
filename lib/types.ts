import type { ReactNode } from "react"
import type { JSX } from "react"

// Navigation types
export interface NavItem {
  name: string
  link: string
  icon?: JSX.Element
}

// Team member types
export interface TeamMember {
  name: string
  position: string
  imageSrc: string
  email: string
}

// Workshop types
export interface WorkshopFile {
  name: string
  link: string
}

export interface Workshop {
  id: number
  title: string
  videoUrl: string
  files: WorkshopFile[]
  procedures: ReactNode
}

// AI Makerspace Project types
export interface AIProject {
  id: number
  title: string
  team: string
  description: string
  pdfUrl: string // Changed from slides array to a single PDF URL
  thumbnailUrl?: string // Optional thumbnail for the PDF
}

// Component props types
export interface ExecutiveMemberProps {
  name: string
  position: string
  imageSrc: string
  email: string
}

export interface VortexProps {
  children?: ReactNode
  className?: string
  containerClassName?: string
  particleCount?: number
  rangeY?: number
  baseHue?: number
  baseSpeed?: number
  rangeSpeed?: number
  baseRadius?: number
  rangeRadius?: number
  backgroundColor?: string
}

export interface WavyBackgroundProps {
  children?: ReactNode
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: "slow" | "fast"
  waveOpacity?: number
  [key: string]: any
}

export interface WobbleCardProps {
  children: ReactNode
  containerClassName?: string
  className?: string
}

export interface FloatingNavProps {
  navItems: NavItem[]
  className?: string
}

export interface WorkshopSidebarProps {
  workshops: Workshop[]
  selectedWorkshop: Workshop
  setSelectedWorkshop: (workshop: Workshop) => void
  bgColor: string
  backLink: string
  backLinkText: string
}

export interface WorkshopContentProps {
  workshop: Workshop
}
