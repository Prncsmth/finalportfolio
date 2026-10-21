import { ArrowUpRight, Award } from 'lucide-react'
import { certifications } from '../data/certifications'
import { Reveal } from './Reveal'
import { SectionHeading, headingAccent } from './SectionHeading'

/** Renders nothing until src/data/certifications.ts has at least one real entry. */
export function Certifications() {
  if (certifications.length === 0) return null

  return (
    <section id="certifications" aria-labelledby="certifications-title" className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-36">
      <SectionHeading
        section="certifications"
        label="Certifications"
        id="certifications-title"
        title={['Things I’ve', { text: 'proven', className: headingAccent }]}
      />
      <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <li key={cert.title} className="bg-paper">
            <Reveal delay={0.05 * i} className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-surface">
              <Award className="size-5 text-ink transition-transform duration-500 ease-out-expo group-hover:-rotate-12" aria-hidden="true" />
              <p className="mt-6 text-lg font-medium leading-snug tracking-[-0.03em]">{cert.title}</p>
              <p className="mt-1 text-[13px] text-muted">
                {cert.issuer}
                {cert.date && ` · ${cert.date}`}
              </p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] text-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink"
                >
                  Verify credential
                  <ArrowUpRight className="size-3" />
                </a>
              )}
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
