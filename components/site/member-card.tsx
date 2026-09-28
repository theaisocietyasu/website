import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { TeamMember } from "@/lib/types"

export function MemberCard({ member, priority = false }: { member: TeamMember; priority?: boolean }) {
  return (
    <article className="group">
      <div className="portrait aspect-[4/5] border border-ink">
        {member.imageSrc && (
          <Image
            src={member.imageSrc}
            alt={`Portrait of ${member.name}`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
            className="object-cover"
          />
        )}
      </div>
      <h3 className="mt-3 font-display text-[15px] font-semibold leading-tight tracking-[-0.01em]">{member.name}</h3>
      <p className="mt-1 text-sm text-ink-soft">{member.position}</p>
      <p className="mt-2 flex gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
        {member.email && (
          <a href={`mailto:${member.email}`} className="hover:text-signal" aria-label={`Email ${member.name}`}>
            email
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 hover:text-signal"
            aria-label={`${member.name} on LinkedIn`}
          >
            linkedin <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
          </a>
        )}
      </p>
    </article>
  )
}
