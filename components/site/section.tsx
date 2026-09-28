import type { ReactNode } from "react"

/**
 * Lab-style section: a mono index in the left rail, content in the wide column.
 * `[01] About` reads like a paper's section numbering.
 */
export function Section({
  id,
  index,
  label,
  title,
  children,
  className = "",
}: {
  id?: string
  index: string
  label: string
  title?: ReactNode
  children: ReactNode
  className?: string
}) {
  const headingId = id ? `${id}-title` : undefined
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={`wrap py-20 md:py-28 ${className}`}>
      <div className="grid gap-10 border-t border-ink pt-6 md:grid-cols-12 md:gap-8">
        <p className="label md:col-span-3">
          <span className="text-signal">[{index}]</span> {label}
        </p>
        <div className="md:col-span-9">
          {title && (
            <h2
              id={headingId}
              className="mb-12 max-w-3xl text-balance font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
            >
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
