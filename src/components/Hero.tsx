'use client'

import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { site } from '../data/site'
import { HalftoneField } from './HalftoneField'
import { GitHubIcon } from './Icons'
import { LocalTime } from './LocalTime'
import { RevealText } from './motion/RevealText'
import { Portrait } from './Portrait'

const ease = [0.16, 1, 0.3, 1] as const

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
})

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 md:pt-36 lg:pt-24">
      <HalftoneField className="absolute inset-0 h-full w-full" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-16 md:grid-cols-12 md:gap-8 md:px-8 md:pb-24">
        <div className="@container md:col-span-7">
          <motion.p {...rise(0)} className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.12em] text-muted">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            {site.role}
          </motion.p>

          <h1
            id="hero-title"
            data-guide="name"
            className="mt-6 w-fit whitespace-nowrap font-serif text-[clamp(2.5rem,18.5cqw,7.75rem)] font-normal leading-[0.95] tracking-tight"
          >
            <RevealText
              onMount
              delay={0.15}
              stagger={0.12}
              parts={['Smith', 'Degamo']}
            />
          </h1>

          <motion.p
            {...rise(0.45)}
            className="mt-8 max-w-lg text-[clamp(1.2rem,1.9vw,1.5rem)] font-medium leading-[1.25] tracking-[-0.04em]"
          >
            I build Web and Mobile Applications
          </motion.p>

          <motion.p {...rise(0.55)} className="mt-6 max-w-xl text-[14px] leading-[1.75] text-muted md:text-[15px]">
            Fourth-year BSIT student from Cebu, Philippines, looking for an internship where I can learn from a team and build things
            people use.
          </motion.p>

          <motion.div {...rise(0.65)} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              data-guide="cta-work"
              className="group inline-flex h-11 items-center gap-2 bg-ink px-5 text-[13.5px] text-paper transition-colors hover:bg-ink/80"
            >
              View my work
              <ArrowDown className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              data-guide="cta-github"
              className="group inline-flex h-11 items-center gap-2 border border-line bg-surface/60 px-5 text-[13.5px] transition-colors hover:border-ink"
            >
              <GitHubIcon className="size-3.5" />
              GitHub
              <ArrowUpRight className="size-3.5 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
            </a>
            <a
              href="#contact"
              data-guide="cta-contact"
              className="inline-flex h-11 items-center px-3 text-[13.5px] text-muted underline decoration-line underline-offset-[6px] transition-colors hover:text-ink hover:decoration-ink"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* On tablet and up the frame takes the height of the intro text and its width follows the photo's own 4:5 shape,
            so the whole picture is always visible. */}
        <figure className="mb-8 flex flex-col md:col-span-5 md:mb-0 md:items-end">
          <div className="relative mx-auto aspect-4/5 w-full max-w-sm md:mx-0 md:h-full md:w-auto md:max-w-none">
            <div className="absolute inset-0">
              <Portrait />
            </div>
            <motion.figcaption
              {...rise(1)}
              className="absolute inset-x-0 top-full mt-3 flex justify-between text-[11px] uppercase tracking-[0.1em] text-faint"
            >
              <span>Fig. 01</span>
              <span>Cebu, PH</span>
            </motion.figcaption>
          </div>
        </figure>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <motion.dl {...rise(0.8)} className="grid grid-cols-2 border-t border-line text-[12.5px] md:grid-cols-4">
          {[
            ['Based in', site.location],
            ['Local time', <LocalTime key="t" timeZone={site.timeZone} />],
            ['Studying', `BSIT, ${site.year}`],
            ['Focus', 'Web & mobile apps'],
          ].map(([label, value], i) => (
            <div key={i} className={`py-5 ${i % 2 === 1 ? 'pl-5 md:pl-0' : ''} ${i > 1 ? 'border-t border-line md:border-t-0' : ''}`}>
              <dt className="uppercase tracking-[0.1em] text-faint">{label}</dt>
              <dd className="mt-1.5 text-ink">{value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
