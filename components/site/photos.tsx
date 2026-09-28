import Image from "next/image"
import { PHOTOS, type PhotoKey } from "@/lib/site"

const SIZES = "(min-width: 768px) 22vw, 90vw"

/** One event photo in a window frame with a figure caption. */
export function EventPhoto({ photo, fig }: { photo: PhotoKey; fig: number }) {
  const { src, caption } = PHOTOS[photo]
  return (
    <figure className="window group">
      <div className="window-bar">
        <span className="window-title">{src.split("/").pop()}</span>
      </div>
      <div className="portrait aspect-[4/3]">
        <Image src={src} alt={caption} fill sizes={SIZES} className="object-cover" />
      </div>
      <figcaption className="border-t border-paper-line px-4 py-2.5 font-mono text-[11px] text-ink-mute">
        fig. {fig}: {caption}
      </figcaption>
    </figure>
  )
}

/**
 * Stacked photos for the Programs rail. The first is shown by default; hovering a program row
 * with a matching data-photo shows that one, in full colour. Pure CSS via :has().
 */
export function ProgramPhotos({ sectionId, photos, fig }: { sectionId: string; photos: PhotoKey[]; fig: number }) {
  const [first] = photos
  const rules = photos
    .map(
      (key) =>
        `#${sectionId}:has(li[data-photo="${key}"]:hover) .program-photo[data-photo="${key}"]{opacity:1}` +
        `#${sectionId}:has(li[data-photo="${key}"]:hover) .program-caption[data-photo="${key}"]{display:inline}`,
    )
    .join("")
  const hovering = `#${sectionId}:has(li[data-photo]:hover)`

  return (
    <figure className="window">
      <style>{`${hovering} .program-photo img{filter:none;mix-blend-mode:normal}${hovering} .program-photo[data-default]{opacity:0}${hovering} .program-caption[data-default]{display:none}${rules}`}</style>
      <div className="window-bar">
        <span className="window-title">programs/*.webp</span>
      </div>
      <div className="portrait aspect-[4/3]">
        {photos.map((key) => (
          <span
            key={key}
            data-photo={key}
            data-default={key === first ? "" : undefined}
            className={`program-photo absolute inset-0 transition-opacity duration-300 ${key === first ? "opacity-100" : "opacity-0"}`}
          >
            <Image src={PHOTOS[key].src} alt={PHOTOS[key].caption} fill sizes={SIZES} className="object-cover" />
          </span>
        ))}
      </div>
      <figcaption className="border-t border-paper-line px-4 py-2.5 font-mono text-[11px] text-ink-mute">
        fig. {fig}:{" "}
        {photos.map((key) => (
          <span
            key={key}
            data-photo={key}
            data-default={key === first ? "" : undefined}
            className={`program-caption ${key === first ? "inline" : "hidden"}`}
          >
            {PHOTOS[key].caption}
          </span>
        ))}
      </figcaption>
    </figure>
  )
}
