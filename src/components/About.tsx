import { ArrowUpRight } from 'lucide-react'
import { site } from '../data/site'
import { CountUp } from './motion/CountUp'
import { DrawLine } from './motion/DrawLine'
import { Reveal } from './Reveal'
import { SectionHeading, headingAccent } from './SectionHeading'

const facts = [
  { label: 'Based in', value: site.location },
  { label: 'Education', value: `${site.program}, ${site.school}` },
  { label: 'Year', value: site.year },
  { label: 'Focus', value: 'Web & mobile apps' },
  { label: 'Languages', value: 'English, Filipino, Cebuano' },
]

const figures = [
  { value: 221, label: 'commits on our capstone', plus: true },
  { value: 4, label: 'codebases: mobile, API, admin, web' },
  { value: 2023, label: 'the year I wrote my first line of code', static: true },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-36">
      <SectionHeading
        section="about"
        label="About"
        id="about-title"
        title={['I like building things people', { text: 'carry with them', className: headingAccent }]}
      />

      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <Reveal className="space-y-5 text-[15px] leading-[1.75] text-muted md:col-span-7 md:text-base">
          <p className="text-ink">
            I&apos;m Smith Degamo, a fourth-year Bachelor of Science in Information Technology student with a strong interest in software
            and application development.
          </p>
          <p>
            Throughout my academic journey, I&apos;ve worked on projects that have allowed me to turn ideas into functional applications and
            explore how technology can solve real-world problems. One of my major academic experiences is developing CORDOVA RISKQ, a
            geolocation-based emergency and assistance coordination system.
          </p>
          <p>
            These experiences have helped me develop my problem-solving skills, attention to detail, and ability to learn through
            challenges. I enjoy exploring new ideas, improving my work, and understanding how things function beyond the surface.
          </p>
          <p>
            As I prepare to enter the professional world, I&apos;m currently looking for an internship where I can gain practical industry
            experience, learn from experienced developers, contribute to meaningful projects, and prepare myself for a career in
            technology.
          </p>
          <p>
            I&apos;m still growing, and I&apos;m excited about the opportunities ahead. I&apos;m ready to learn, willing to take on challenges,
            and committed to making the most of every experience.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
          <dl className="border-t border-line text-[13.5px]">
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-4">
                <dt className="uppercase tracking-[0.12em] text-faint">{fact.label}</dt>
                <dd className="text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="group mt-6 inline-flex items-center gap-2 text-[13.5px] underline decoration-line underline-offset-[6px] transition-colors hover:decoration-ink"
          >
            Read my résumé (PDF)
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>

      <div className="mt-16 md:mt-20">
        <DrawLine />
        <dl className="grid gap-px sm:grid-cols-3">
          {figures.map((f, i) => (
            <Reveal key={f.label} delay={0.08 * i} className="py-8 sm:pr-8">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block text-[clamp(2.75rem,5vw,4.25rem)] font-medium leading-none tracking-[-0.06em]">
                  {f.static ? f.value : <CountUp value={f.value} />}
                  {f.plus && <span className="text-muted">+</span>}
                </span>
                <span aria-hidden="true" className="mt-3 block text-[12.5px] text-muted">
                  {f.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
