import { ArrowUpRight, GraduationCap } from 'lucide-react'
import { education, experience, type ExperienceItem } from '../data/experience'
import { site } from '../data/site'
import { CountUp } from './motion/CountUp'
import { DrawLine } from './motion/DrawLine'
import { Reveal } from './Reveal'
import { SectionHeading, headingAccent } from './SectionHeading'

function Entry({ item, first }: { item: ExperienceItem; first: boolean }) {
  const total = item.contributions?.reduce((sum, c) => sum + c.commits, 0)

  return (
    <li>
      <DrawLine />
      <Reveal className="grid gap-3 py-8 sm:grid-cols-[8.5rem_1fr] sm:gap-6 md:py-10">
        <p className="flex items-center gap-2 self-start text-[12.5px] text-faint sm:pt-1.5">
          <span className={`size-1.5 shrink-0 ${first ? 'bg-accent' : 'bg-line'}`} aria-hidden="true" />
          {item.period}
        </p>

        <div>
          <h3 className="text-[1.3rem] font-medium leading-tight tracking-[-0.04em]">{item.title}</h3>
          <p className="mt-1 text-[13px] text-muted">{item.org}</p>
          {item.summary && <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-muted">{item.summary}</p>}

          {item.tags && (
            <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <li key={tag} className="border border-line px-2 py-0.5 text-[11px] text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {item.contributions && (
            <>
              <p className="mt-7 text-[11px] uppercase tracking-[0.12em] text-faint">
                What I built · <span className="text-ink">{total}</span> commits across {item.contributions.length} codebases
              </p>
              <ul className="mt-3 grid gap-px border border-line bg-line sm:grid-cols-2">
                {item.contributions.map((c) => (
                  <li key={c.area} className="group bg-paper p-5 transition-colors duration-300 hover:bg-surface">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium tracking-[-0.01em]">{c.area}</p>
                        <p className="mt-0.5 text-[11px] text-faint">{c.stack}</p>
                      </div>
                      <p className="text-right">
                        <span className="block text-[1.9rem] font-medium leading-none tracking-[-0.05em] text-ink">
                          <CountUp value={c.commits} />
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.12em] text-faint">{c.solo ? 'commits · solo' : 'commits'}</span>
                      </p>
                    </div>
                    <ul className="mt-4 space-y-1.5 text-[13px] leading-snug text-muted">
                      {c.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-[0.45em] size-1 shrink-0 bg-accent" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Reveal>
    </li>
  )
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-36">
      <SectionHeading
        section="experience"
        label="Experience"
        id="experience-title"
        title={['Where I’ve been', { text: 'building', className: headingAccent }]}
        aside={
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-[13px] text-muted underline decoration-line underline-offset-[6px] transition-colors hover:text-ink hover:decoration-ink"
          >
            Full résumé (PDF)
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        }
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <ol className="lg:col-span-8">
          {experience.map((item, i) => (
            <Entry key={`${item.period}-${item.title}`} item={item} first={i === 0} />
          ))}
        </ol>

        <aside aria-labelledby="education-title" className="lg:col-span-4">
          <div className="lg:sticky lg:top-10">
            <DrawLine />
            <Reveal>
              <h3 id="education-title" className="flex items-center gap-2 pt-5 text-[11px] uppercase tracking-[0.12em] text-faint">
                <GraduationCap className="size-3.5" aria-hidden="true" />
                Education
              </h3>
              <ul className="mt-6 space-y-6">
                {education.map((e) => (
                  <li key={e.school} className="border-l border-line pl-4">
                    <p className="font-medium leading-snug tracking-[-0.02em]">{e.school}</p>
                    <p className="mt-1 text-[14px] leading-snug text-muted">{e.program}</p>
                    <p className="mt-1.5 text-[11px] text-faint">{e.period}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </aside>
      </div>
    </section>
  )
}
