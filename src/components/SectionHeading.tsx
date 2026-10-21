import type { ReactNode } from 'react'
import type { SectionId } from '../data/site'
import { DrawLine } from './motion/DrawLine'
import { RevealText, type TextPart } from './motion/RevealText'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  section: SectionId
  label: string
  id: string
  title: TextPart[]
  aside?: ReactNode
}

/** Section header: a self-drawing rule, a mono label, and a headline that rises in word by word. */
export function SectionHeading({ section, label, id, title, aside }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16" data-section={section}>
      <DrawLine />
      <Reveal className="flex items-center gap-3 pt-5 text-[11px] uppercase tracking-[0.12em] text-faint">
        <span className="size-1.5 bg-accent" aria-hidden="true" />
        <span>{label}</span>
      </Reveal>
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id={id} className="max-w-3xl text-[clamp(1.85rem,3.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.05em]">
          <RevealText parts={title} />
        </h2>
        {aside && <Reveal delay={0.15}>{aside}</Reveal>}
      </div>
    </div>
  )
}

/** Softer second half of a section headline. */
export const headingAccent = 'text-muted'
