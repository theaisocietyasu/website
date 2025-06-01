import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outline" | "gradient"
  padding?: "none" | "sm" | "md" | "lg"
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", children, ...props }, ref) => {
    const baseClasses = "rounded-xl"

    const variants = {
      default: "bg-dark-900 border border-dark-800",
      // Restored backdrop-blur-md, removed will-change
      glass: "bg-dark-900/[.70] backdrop-blur-md border-0",
      outline: "bg-transparent border border-dark-700",
      gradient: "bg-gradient-to-br from-dark-900 to-dark-800 border border-dark-800/50",
    }

    const paddings = {
      none: "p-0",
      sm: "p-3",
      md: "p-5",
      lg: "p-7",
    }

    return (
      <div ref={ref} className={cn(baseClasses, variants[variant], paddings[padding], className)} {...props}>
        {children}
      </div>
    )
  },
)

Card.displayName = "Card"

export { Card }
