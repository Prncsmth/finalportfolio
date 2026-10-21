'use client'

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { navLinks, site } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { GitHubIcon, LinkedInIcon } from '../Icons'
import { ThemeToggle } from './ThemeToggle'

const sectionIds = navLinks.map((link) => link.id)

/** Sticky top bar with a full-screen menu for phones and tablets. Large screens use <Sidebar />. */
export function TopBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    firstLink.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 lg:hidden ${
          scrolled || open ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="group flex items-center gap-2.5 font-mono text-[13px] tracking-tight" onClick={() => setOpen(false)}>
            <Image
              src="/images/avatar-128.webp"
              alt=""
              width={32}
              height={32}
              className="size-8 border border-line object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
            />
            <span className="font-medium">Smith Degamo</span>
          </a>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-9 place-items-center"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
        <motion.div aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent" style={{ scaleX: progress }} />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col justify-between overflow-y-auto bg-paper px-5 pb-10 pt-6 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <li key={link.id} className="overflow-hidden border-b border-line">
                  <motion.a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + 0.045 * i }}
                    className={`flex items-center justify-between py-4 text-[2rem] font-medium tracking-[-0.03em] ${
                      active === link.id ? 'text-ink' : 'text-muted'
                    }`}
                  >
                    {link.label}
                    <ArrowUpRight className="size-5 rotate-90 text-faint" aria-hidden="true" />
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-5 font-mono text-xs text-muted">
              <a href={site.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-ink">
                <GitHubIcon className="size-4" /> GitHub
              </a>
              <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-ink">
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
