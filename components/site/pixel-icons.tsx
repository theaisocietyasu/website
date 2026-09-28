import { SOCIALS } from "@/lib/site"

type SocialLabel = (typeof SOCIALS)[number]["label"]

/**
 * 13×13 pixel-art social marks. `#` is a lit pixel; anything else is empty.
 * Drawn by hand to sit with the ASCII hero: rendered as crisp SVG squares in `currentColor`.
 */
const GLYPHS: Record<SocialLabel, string[]> = {
  Instagram: [
    "..#########..",
    ".#.........#.",
    "#.........#.#",
    "#...#####...#",
    "#..#.....#..#",
    "#..#.....#..#",
    "#..#.....#..#",
    "#..#.....#..#",
    "#..#.....#..#",
    "#...#####...#",
    "#...........#",
    ".#.........#.",
    "..#########..",
  ],
  LinkedIn: [
    ".###########.",
    "#############",
    "##..#########",
    "##..#########",
    "#############",
    "##..#.....###",
    "##..#..##..##",
    "##..#..##..##",
    "##..#..##..##",
    "##..#..##..##",
    "##..#..##..##",
    "#############",
    ".###########.",
  ],
  GitHub: [
    "....#####....",
    "..#########..",
    ".##.#####.##.",
    ".##.......##.",
    "##.........##",
    "##.........##",
    "##.........##",
    "###.......###",
    "#####...#####",
    ".#.##...####.",
    ".####...####.",
    "..###...###..",
    "....#...#....",
  ],
  YouTube: [
    ".............",
    ".............",
    ".###########.",
    "#############",
    "#####.#######",
    "#####..######",
    "#####...#####",
    "#####..######",
    "#####.#######",
    "#############",
    ".###########.",
    ".............",
    ".............",
  ],
  Discord: [
    ".............",
    "..##.....##..",
    ".###########.",
    ".###########.",
    "#############",
    "###..###..###",
    "###..###..###",
    "#############",
    "#############",
    ".###.....###.",
    "..#.......#..",
    ".............",
    ".............",
  ],
}

// One path per glyph: a 1×1 square for every lit pixel.
const PATHS = Object.fromEntries(
  Object.entries(GLYPHS).map(([label, rows]) => [
    label,
    rows
      .flatMap((row, y) => [...row].map((c, x) => (c === "#" ? `M${x} ${y}h1v1h-1z` : "")))
      .join(""),
  ]),
) as Record<SocialLabel, string>

export function PixelIcon({ name, className }: { name: SocialLabel; className?: string }) {
  return (
    <svg viewBox="0 0 13 13" shapeRendering="crispEdges" className={className} aria-hidden="true">
      <path d={PATHS[name]} fill="currentColor" />
    </svg>
  )
}
