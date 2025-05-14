import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  alignment?: "left" | "center" | "right"
  titleClassName?: string
  subtitleClassName?: string
  decorative?: boolean
}

export function SectionHeading({
  title,
  subtitle,
  alignment = "center",
  titleClassName,
  subtitleClassName,
  decorative = true,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <div className={cn("max-w-3xl mb-16", alignmentClasses[alignment])}>
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 relative inline-block",
          titleClassName,
        )}
      >
        <span className="gradient-text">{title}</span>
        {decorative && (
          <span
            className="absolute -bottom-2 left-0 w-1/3 h-1 rounded-full"
            style={{
              background: "linear-gradient(to right, var(--primary-500), var(--secondary-600))",
            }}
          ></span>
        )}
      </h2>
      {subtitle && (
        <p className={cn("text-dark-200 text-lg md:text-xl max-w-2xl", alignmentClasses[alignment], subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
