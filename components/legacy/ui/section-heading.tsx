import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export function SectionHeading({ title, subtitle, className, titleClassName, subtitleClassName }: SectionHeadingProps) {
  return (
    <div className={cn("text-center mb-12 md:mb-16", className)}>
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-white to-primary-200 bg-clip-text text-transparent mb-4",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-lg md:text-xl text-dark-200 max-w-3xl mx-auto leading-relaxed", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
