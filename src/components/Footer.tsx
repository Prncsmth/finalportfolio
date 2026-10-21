import { ArrowUp } from 'lucide-react'
import { site } from '../data/site'
import { GitHubIcon, LinkedInIcon } from './Icons'

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 text-[12.5px] text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © 2026 {site.name}. Designed &amp; built by me.
        </p>

        <div className="flex items-center gap-5">
          <a href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-ink">
            <GitHubIcon className="size-4" />
          </a>
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-ink">
            <LinkedInIcon className="size-4" />
          </a>
          <span className="h-4 w-px bg-line" aria-hidden="true" />
          <a href="#top" className="group inline-flex items-center gap-2 transition-colors hover:text-ink">
            Back to top
            <span className="grid size-7 place-items-center border border-line transition-colors group-hover:border-ink">
              <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
