import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outline" | "gradient"
  padding?: "none" | "sm" | "md" | "lg"
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", children, ...props }, ref) => {
    const baseClasses = "rounded-xl" // Removed transition-all from previous steps

    const variants = {
      default: "bg-dark-900 border border-dark-800",
      // Added will-change for background-color and backdrop-filter
      glass: "bg-dark-900/[.70] backdrop-blur-md border-0" + " " + "will-change-[background-color,backdrop-filter]",
      outline: "bg-transparent border border-dark-700",
      gradient: "bg-gradient-to-br from-dark-900 to-dark-800 border border-dark-800/50",
    }

    const paddings = {
      none: "p-0",
      sm: "p-3",
      md: "p-5",
      lg: "p-7",
    }

    // Note: Tailwind JIT might not pick up arbitrary string concatenation for `will-change`
    // directly in the className string in some complex cases.
    // A more robust way if this doesn't work would be to apply it via the style prop
    // or ensure your tailwind.config.js safelists these specific will-change utilities if needed.
    // However, for common properties, Tailwind often generates these.
    // Let's test this direct approach first.

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variants[variant], paddings[padding], className)}
        // As a fallback, or more explicit way, you could use the style prop:
        // style={variant === 'glass' ? { willChange: 'background-color, backdrop-filter' } : {}}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = "Card"

export { Card }
