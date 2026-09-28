import { useId } from "react"
import { A_BAR, BODY, DOTS, FRAME, LETTER_A, LETTER_I, RINGS, SOCIETY, TRACES } from "@/lib/chip-logo"

/**
 * The official AIS chip mark as SVG, in `currentColor`.
 * The frame and lettering are knocked out with a mask, so they show whatever sits behind the logo.
 * Traces and rings are drawn a little heavier than the source so they survive at icon sizes.
 */
export function ChipLogo({ className }: { className?: string }) {
  const mask = useId()
  return (
    <svg viewBox="36 76 766 736" className={className} aria-hidden="true">
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="36" y="76" width="766" height="736">
          <rect x="36" y="76" width="766" height="736" fill="white" />
          <g fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round">
            <rect x={FRAME.x} y={FRAME.y} width={FRAME.w} height={FRAME.h} rx={FRAME.r} strokeWidth="16" />
            <path d={LETTER_A} strokeWidth="36" />
            <path d={LETTER_I} strokeWidth="36" />
            <path d={A_BAR} strokeWidth="22" />
          </g>
          <text
            x={(SOCIETY.x0 + SOCIETY.x1) / 2}
            y={SOCIETY.y + 17}
            textAnchor="middle"
            textLength={SOCIETY.x1 - SOCIETY.x0}
            lengthAdjust="spacingAndGlyphs"
            fontFamily="var(--font-display), sans-serif"
            fontWeight="800"
            fontSize="46"
            fill="black"
          >
            SOCIETY
          </text>
        </mask>
      </defs>
      <g mask={`url(#${mask})`}>
        <path d={BODY} fill="currentColor" />
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {TRACES.map((d) => (
            <path key={d} d={d} strokeWidth="22" />
          ))}
          {RINGS.map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r - 5} strokeWidth="19" />
          ))}
        </g>
        {DOTS.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r + 3} fill="currentColor" />
        ))}
      </g>
    </svg>
  )
}
