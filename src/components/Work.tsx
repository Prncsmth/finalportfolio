import { ArrowUpRight, Globe } from 'lucide-react'
import type { ReactNode } from 'react'
import { projects, type Project, type ProjectLink } from '../data/projects'
import { GitHubIcon } from './Icons'
import { ParallaxImage } from './motion/ParallaxImage'
import { Reveal } from './Reveal'
import { SectionHeading, headingAccent } from './SectionHeading'

/**
 * Browser-framed screenshot. On tablet and up it stretches to the height of the text beside it,
 * cropping from the top of the page so the site's hero always stays in view.
 */
function Preview({ project }: { project: Project }) {
  if (!project.image) {
    return (
      <div className="relative grid aspect-[1440/1100] h-full place-items-center overflow-hidden border border-line bg-surface md:aspect-auto md:min-h-72">
        <div aria-hidden="true" className="halftone mask-tr absolute inset-0 opacity-25" />
        <div className="relative text-center">
          <p className="text-3xl font-medium tracking-[-0.05em] md:text-4xl">{project.title}</p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-faint">Preview coming soon</p>
        </div>
      </div>
    )
  }

  const frame = (
    <>
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-line bg-surface px-3 text-[11px] text-faint">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
        </span>
        <span className="truncate px-3">{project.live?.label ?? project.title}</span>
        <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>
      <div className="relative aspect-[1440/1100] overflow-hidden bg-surface md:aspect-auto md:min-h-72 md:flex-1">
        <ParallaxImage
          src={`${project.image}-1440.webp`}
          alt={`Screenshot of the ${project.title} website`}
          sizes="(min-width: 1152px) 640px, (min-width: 768px) 58vw, 100vw"
          className="object-cover object-top transition-transform duration-[1.1s] ease-out-expo group-hover:scale-[1.03]"
        />
      </div>
    </>
  )

  const frameClass = 'group flex h-full flex-col overflow-hidden border border-line'

  return project.live ? (
    <a
      href={project.live.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open the ${project.title} live site in a new tab`}
      className={`${frameClass} transition-[border-color,box-shadow] duration-500 hover:border-faint hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)]`}
    >
      {frame}
    </a>
  ) : (
    <div className={frameClass}>{frame}</div>
  )
}

function LinkRow({ label, icon, links }: { label: string; icon: ReactNode; links: ProjectLink[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
      <span className="flex items-center gap-1.5 text-faint">
        {icon}
        {label}
      </span>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex min-h-8 items-center gap-1 py-1 text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
          {link.label}
          <ArrowUpRight className="size-3 opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ))}
    </div>
  )
}

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1

  return (
    <Reveal>
      <article aria-labelledby={`${project.slug}-title`} className="grid gap-7 border-t border-line py-12 md:grid-cols-12 md:gap-10 md:py-16">
        <div className={`md:col-span-7 ${flipped ? 'md:order-2' : ''}`}>
          <Preview project={project} />
        </div>

        <div className={`flex flex-col md:col-span-5 md:py-1 ${flipped ? 'md:order-1' : ''}`}>
          <p className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.12em] text-faint">
            <span className="flex items-center gap-3">
              <span className="size-1.5 bg-accent" aria-hidden="true" />
              {project.kind}
            </span>
            {project.year && <span>{project.year}</span>}
          </p>

          <h3 id={`${project.slug}-title`} className="mt-4 text-[clamp(1.6rem,2.6vw,2.1rem)] font-medium leading-[1.1] tracking-[-0.05em]">
            {project.title}
          </h3>

          {project.summary ? (
            <p className="mt-4 text-[14px] leading-relaxed text-muted">{project.summary}</p>
          ) : (
            <p className="mt-4 text-[13.5px] text-faint">Write-up coming soon.</p>
          )}

          {project.note && <p className="mt-3 text-[13px] italic leading-snug text-faint">{project.note}</p>}

          {project.stack.length > 0 && (
            <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li key={tech} className="border border-line px-2 py-0.5 text-[11px] text-muted">
                  {tech}
                </li>
              ))}
            </ul>
          )}

          {(project.live || project.source) && (
            <div className="mt-8 flex flex-col gap-3.5 md:mt-auto md:pt-8">
              {project.live && (
                <a
                  href={project.live.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-10 w-fit items-center gap-2 bg-ink px-4 text-[13px] text-paper transition-colors hover:bg-ink/80"
                >
                  <Globe className="size-3.5" aria-hidden="true" />
                  Visit live site
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {project.moreLive && <LinkRow label="Also live" icon={<Globe className="size-3.5" aria-hidden="true" />} links={project.moreLive} />}
              {project.source && <LinkRow label="Source" icon={<GitHubIcon className="size-3.5" />} links={project.source} />}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-32">
      <SectionHeading
        section="work"
        label="Selected work"
        id="work-title"
        title={['Projects built to be', { text: 'used,', className: headingAccent }, 'not just shown']}
        aside={
          <p className="max-w-xs text-[13px] leading-relaxed text-muted">
            Web and mobile apps I&apos;ve designed, built, and shipped.
          </p>
        }
      />

      <div className="border-b border-line">
        {projects.map((project, i) => (
          <ProjectEntry key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
