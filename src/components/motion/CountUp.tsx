'use client'

import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'

/**
 * Counts up to `value` the first time it scrolls into view.
 * Server-renders the final number, so crawlers, no-JS visitors and reduced-motion users always see the real value.
 */
export function CountUp({ value, duration = 1.6 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotionSafe()
  const [display, setDisplay] = useState(value)
  const armed = useRef(false)

  // Only reset to zero when the number starts below the fold, so it never visibly jumps.
  useEffect(() => {
    if (reduce || !ref.current) return
    if (ref.current.getBoundingClientRect().top > window.innerHeight) {
      armed.current = true
      setDisplay(0)
    }
  }, [reduce])

  useEffect(() => {
    if (!inView || !armed.current) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  )
}
