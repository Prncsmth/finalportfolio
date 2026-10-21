import { Braces } from 'lucide-react'
import { stack } from '../data/stack'
import { BrandIcon } from './Icons'
import { Reveal } from './Reveal'
import { SectionHeading, headingAccent } from './SectionHeading'

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-36">
      <SectionHeading
        section="stack"
        label="Stack"
        id="stack-title"
        title={['One stack,', { text: 'web to mobile', className: headingAccent }]}
        aside={<p className="max-w-xs text-[13px] leading-relaxed text-muted">What I use, from screen to server.</p>}
      />

      <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-5">
        {stack.map((group, i) => (
          <Reveal key={group.title} delay={0.06 * i} className="border-b border-r border-line p-6">
            <h3 className="text-lg font-medium tracking-[-0.03em]">{group.title}</h3>
            <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-faint">{group.caption}</p>
            <ul className="mt-7 space-y-3.5">
              {group.items.map((item) => (
                <li key={item.name} className="group flex items-center gap-3 text-[14.5px]">
                  <span className="grid size-7 place-items-center border border-line text-muted transition-colors duration-300 group-hover:border-ink group-hover:text-ink">
                    {item.icon ? <BrandIcon icon={item.icon} className="size-3.5" /> : <Braces className="size-3.5" aria-hidden="true" />}
                  </span>
                  {item.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
