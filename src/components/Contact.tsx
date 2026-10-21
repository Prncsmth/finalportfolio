'use client'

import { ArrowUpRight, Check, Copy, FileText, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { GitHubIcon, LinkedInIcon } from './Icons'
import { DrawLine } from './motion/DrawLine'
import { RevealText } from './motion/RevealText'
import { Reveal } from './Reveal'

const channels = [
  { label: 'GitHub', handle: '@Prncsmth', href: site.socials.github, icon: GitHubIcon },
  { label: 'LinkedIn', handle: 'Smith Degamo', href: site.socials.linkedin, icon: LinkedInIcon },
  { label: 'Résumé', handle: 'PDF', href: site.resume, icon: FileText },
]

export function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(id)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative mx-auto max-w-6xl px-5 pb-24 pt-24 md:px-8 md:pb-32 md:pt-36">
      <DrawLine />
      <Reveal>
        <div className="flex items-center gap-3 pt-5 text-[11px] uppercase tracking-[0.12em] text-faint">
          <span className="size-1.5 bg-accent" aria-hidden="true" />
          <span>Contact</span>
        </div>
      </Reveal>

      <h2 id="contact-title" className="mt-10 max-w-5xl text-[clamp(2.25rem,6.4vw,5.5rem)] font-medium leading-[1] tracking-[-0.06em]">
        <RevealText
          stagger={0.07}
          parts={['Let’s build something', { text: 'useful', className: 'text-muted' }, 'together']}
        />
      </h2>

      <Reveal delay={0.2}>
        <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted">
          Hiring an intern or have a project in mind? Let&apos;s talk.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.12em] text-faint">Email</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 break-all text-[clamp(1.25rem,3vw,2rem)] font-medium tracking-tight"
            >
              <Mail className="size-6 shrink-0 text-ink" aria-hidden="true" />
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-bottom-left bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out-expo group-hover:bg-size-[100%_1px]">
                {site.email}
              </span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex h-9 items-center gap-2 border border-line px-3 text-[12.5px] text-muted transition-colors hover:border-ink hover:text-ink"
            >
              {copied ? <Check className="size-3.5 text-ink" /> : <Copy className="size-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <span aria-live="polite" className="sr-only">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent('Hello Smith')}`}
            className="group mt-8 inline-flex h-12 items-center gap-2 bg-ink px-6 text-[13.5px] text-paper transition-colors hover:bg-ink/80"
          >
            Send me an email
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <ul className="border-t border-line md:col-span-4 md:col-start-9">
          {channels.map(({ label, handle, href, icon: Icon }) => (
            <li key={label} className="border-b border-line">
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-4 text-[13.5px] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Icon className="size-4 text-muted transition-colors group-hover:text-ink" />
                  {label}
                </span>
                <span className="flex items-center gap-2 text-faint transition-colors group-hover:text-ink">
                  {handle}
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
