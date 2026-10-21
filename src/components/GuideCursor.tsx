'use client'

import { animate, motion, useMotionValue } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

type Step = { target: string; text: string; click?: boolean }

// The tour, in order. Steps whose target is missing or off screen are skipped.
const steps: Step[] = [
  { target: 'name', text: "Hi! I'm Smith. Welcome to my portfolio 👋" },
  { target: 'portrait', text: 'A 4th-year BSIT student from Cebu, Philippines.' },
  { target: 'cta-work', text: 'Start here to see the apps I’ve built.', click: true },
  { target: 'cta-github', text: 'All my code lives on GitHub.', click: true },
  { target: 'nav', text: 'Jump to any section from the sidebar.' },
  { target: 'cta-contact', text: 'Want to build something together? Say hi!', click: true },
]

// Devices with a real mouse and room for the tour (tablets in landscape and up).
const DEVICE = '(min-width: 768px) and (hover: hover) and (pointer: fine)'
const REDUCED = '(prefers-reduced-motion: reduce)'

class Cancelled extends Error {}

/**
 * A ghost cursor that tours the first screen whenever the page opens at the top: it glides to key
 * elements, "clicks" them, and types a short note. It only autoplays on mouse devices without a
 * reduced-motion preference (the sidebar's "Take the tour" plays it on request), and it steps aside
 * the moment the visitor scrolls, clicks or presses a key. Purely decorative, so it is hidden from
 * assistive tech; every message repeats content that is already on the page.
 */
export function GuideCursor() {
  const x = useMotionValue(-80)
  const y = useMotionValue(-80)
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')
  const [flip, setFlip] = useState(false)
  const [clickKey, setClickKey] = useState(0)
  const run = useRef(0)

  const stop = useCallback(() => {
    run.current++
    setVisible(false)
    setText('')
    document.querySelectorAll('.guide-target').forEach((el) => el.classList.remove('guide-target'))
    window.dispatchEvent(new Event('guide:end'))
  }, [])

  const start = useCallback(async () => {
    const id = ++run.current
    const alive = () => {
      if (run.current !== id) throw new Cancelled()
    }
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms)).then(alive)

    try {
      x.set(window.innerWidth * 0.62)
      y.set(window.innerHeight + 40)
      setVisible(true)

      for (const step of steps) {
        const el = document.querySelector<HTMLElement>(`[data-guide="${step.target}"]`)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight || rect.width === 0) continue

        // Aim a little inside the element rather than dead centre, like a real hand would.
        const tx = rect.left + Math.min(rect.width * 0.55, rect.width - 12)
        const ty = rect.top + Math.min(rect.height * 0.6, rect.height - 8)
        const distance = Math.hypot(tx - x.get(), ty - y.get())
        const duration = Math.min(1.2, 0.5 + distance / 1400)

        setText('')
        setFlip(tx > window.innerWidth - 320)
        await Promise.all([
          animate(x, tx, { duration, ease: [0.65, 0, 0.35, 1] }),
          animate(y, ty, { duration, ease: [0.65, 0, 0.35, 1] }),
        ])
        alive()

        el.classList.add('guide-target')
        if (step.click) {
          setClickKey((k) => k + 1)
          await sleep(220)
        }

        // Type the note out one character at a time.
        const chars = Array.from(step.text)
        for (let i = 1; i <= chars.length; i++) {
          setText(chars.slice(0, i).join(''))
          await sleep(26)
        }
        await sleep(1500)
        el.classList.remove('guide-target')
      }

      setText('')
      await Promise.all([
        animate(x, window.innerWidth + 60, { duration: 0.9, ease: [0.65, 0, 0.35, 1] }),
        animate(y, y.get() - 120, { duration: 0.9, ease: [0.65, 0, 0.35, 1] }),
      ])
      alive()
      stop()
    } catch (error) {
      if (!(error instanceof Cancelled)) throw error
    }
  }, [stop, x, y])

  // Share the ghost cursor's position so the hero's halftone field reacts to it.
  useEffect(() => {
    const emit = () => window.dispatchEvent(new CustomEvent('guide:move', { detail: { x: x.get(), y: y.get() } }))
    const offX = x.on('change', emit)
    const offY = y.on('change', emit)
    return () => {
      offX()
      offY()
    }
  }, [x, y])

  // Autoplay when the page opens at the top, and replay on request from the sidebar.
  useEffect(() => {
    const canAutoplay = window.matchMedia(DEVICE).matches && !window.matchMedia(REDUCED).matches
    const timer = canAutoplay && window.scrollY < 80 ? window.setTimeout(start, 1600) : undefined

    const onReplay = () => {
      if (!window.matchMedia(DEVICE).matches) return
      stop()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.setTimeout(start, 700)
    }
    window.addEventListener('guide:replay', onReplay)
    const runs = run
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('guide:replay', onReplay)
      runs.current++ // cancel any tour still in flight
    }
  }, [start, stop])

  // Any real interaction ends the tour.
  useEffect(() => {
    if (!visible) return
    const onInteract = () => stop()
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
    // Ignore the click that started a replay.
    const armTimer = window.setTimeout(() => events.forEach((e) => window.addEventListener(e, onInteract, { passive: true })), 300)
    return () => {
      window.clearTimeout(armTimer)
      events.forEach((e) => window.removeEventListener(e, onInteract))
    }
  }, [visible, stop])

  if (!visible) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-100"
      style={{ x, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* click ripple */}
      {clickKey > 0 && (
        <motion.span
          key={clickKey}
          className="absolute -left-5 -top-5 size-10 rounded-full border border-accent"
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      <motion.svg
        key={`cursor-${clickKey}`}
        width="22"
        height="22"
        viewBox="0 0 24 24"
        className="drop-shadow-[0_4px_8px_rgb(0_0_0/0.25)]"
        initial={{ scale: clickKey > 0 ? 0.8 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      >
        <path d="M4 2.5 20 11l-7.2 1.9L9.6 20 4 2.5Z" fill="rgb(var(--ink))" stroke="rgb(var(--paper))" strokeWidth="1.5" strokeLinejoin="round" />
      </motion.svg>

      <div className={`absolute top-5 flex flex-col gap-1.5 ${flip ? 'right-3 items-end' : 'left-4 items-start'}`}>
        <span className={`flex items-center gap-2 ${flip ? 'flex-row-reverse' : ''}`}>
          <span className="bg-accent px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white">Smith</span>
          <span className="whitespace-nowrap font-mono text-[9.5px] text-faint">any key to skip</span>
        </span>
        {text && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-max max-w-64 bg-ink px-3 py-2 font-mono text-[12px] leading-snug text-paper shadow-[0_12px_30px_-12px_rgb(0_0_0/0.45)]"
          >
            {text}
            <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 animate-pulse bg-accent" />
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}
