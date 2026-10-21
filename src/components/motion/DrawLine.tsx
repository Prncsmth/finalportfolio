'use client'

import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'

/** A hairline rule that draws itself from left to right when it scrolls into view. */
export function DrawLine({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotionSafe()

  if (reduce) return <div aria-hidden="true" className={`h-px bg-line ${className}`} />

  return (
    <motion.div
      aria-hidden="true"
      className={`h-px origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
    />
  )
}
