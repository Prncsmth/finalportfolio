'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { Activity, ArrowUpRight, Award, Briefcase, FileText, Layers, LayoutGrid, Mail, MousePointer2, User, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { navLinks, site, type SectionId } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { GitHubIcon, LinkedInIcon } from '../Icons'
import { LocalTime } from '../LocalTime'
import { ThemeToggle } from './ThemeToggle'

export const sectionIcons: Record<SectionId, LucideIcon> = {
  work: LayoutGrid,
  experience: Briefcase,
  about: User,
  stack: Layers,
  github: Activity,
  certifications: Award,
  contact: Mail,
}

const sectionIds = navLinks.map((link) => link.id)

/** Fixed left sidebar for large screens. Smaller screens use <TopBar />. */
export function Sidebar() {
  const active = useActiveSection(sectionIds)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <aside
      data-guide="sidebar"
      aria-label="Site"
      className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-line bg-paper px-6 py-7 lg:flex"
    >
      <motion.div aria-hidden="true" className="absolute -right-px top-0 h-full w-px origin-top bg-accent" style={{ scaleY: progress }} />

      <a href="#top" className="group flex items-center justify-center gap-2.5">
        <Image
          src="/images/avatar-128.webp"
          alt=""
          width={36}
          height={36}
          className="size-9 border border-line object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
        />
        <span className="font-mono text-[13px] font-medium">Smith Degamo</span>
      </a>

      <nav aria-label="Primary" data-guide="nav" className="mt-12">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Index</p>
        <ul className="flex flex-col">
          {navLinks.map((link) => {
            const Icon = sectionIcons[link.id]
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative flex items-center gap-3 py-[7px] font-mono text-[12.5px] transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-6 top-1/2 h-4 w-0.5 -translate-y-1/2 bg-accent transition-transform duration-500 ease-out-expo ${
                      isActive ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />
                  <Icon className="size-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  <span className="flex-1 transition-transform duration-300 group-hover:translate-x-0.5">{link.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mt-10">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Elsewhere</p>
        <ul className="flex flex-col font-mono text-[12.5px] text-muted">
          {[
            { label: 'GitHub', href: site.socials.github, icon: GitHubIcon },
            { label: 'LinkedIn', href: site.socials.linkedin, icon: LinkedInIcon },
            { label: 'Résumé', href: site.resume, icon: FileText },
          ].map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 py-[7px] transition-colors hover:text-ink">
                <Icon className="size-3.5" />
                <span className="flex-1">{label}</span>
                <ArrowUpRight className="size-3 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto space-y-4 border-t border-line pt-5">
        <p className="flex items-center justify-between font-mono text-[11px] text-faint">
          <span>Cebu, PH</span>
          <LocalTime timeZone={site.timeZone} />
        </p>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('guide:replay'))}
            className="group inline-flex items-center gap-2 font-mono text-[11.5px] text-muted transition-colors hover:text-ink"
          >
            <MousePointer2 className="size-3.5 transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
            Take the tour
          </button>
          <ThemeToggle className="-mr-2" />
        </div>
      </div>
    </aside>
  )
}
