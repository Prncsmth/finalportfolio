'use client'

import { motion, type Variants } from 'framer-motion'
import { Fragment } from 'react'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'

/** Parts are separated by a space unless `attach` is set (e.g. punctuation that hugs the previous word). */
export type TextPart = string | { text: string; className?: string; attach?: boolean } | { br: true }

type RevealTextProps = {
  parts: TextPart[]
  /** Animate as soon as the component mounts (hero) instead of when scrolled into view. */
  onMount?: boolean
  delay?: number
  stagger?: number
}

const ease = [0.16, 1, 0.3, 1] as const

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
})

const word: Variants = {
  hidden: { y: '108%' },
  show: { y: '0%', transition: { duration: 1, ease } },
}

/**
 * Editorial masked text reveal: each word rises out of its own clipped line.
 * Text stays real, selectable and readable by assistive tech; reduced-motion users get it static.
 */
export function RevealText({ parts, onMount = false, delay = 0, stagger = 0.055 }: RevealTextProps) {
  const reduce = useReducedMotionSafe()

  const nodes = parts.map((part, i) => {
    if (typeof part === 'object' && 'br' in part) return <br key={i} />
    const text = typeof part === 'string' ? part : part.text
    const className = typeof part === 'string' ? '' : (part.className ?? '')
    const words = text.split(/(\s+)/)
    const prev = parts[i - 1]
    const gap = i > 0 && !(typeof prev === 'object' && 'br' in prev) && !(typeof part === 'object' && part.attach)

    return (
      <Fragment key={i}>
        {gap && ' '}
        {words.map((w, j) =>
          /^\s+$/.test(w) || w === '' ? (
            w
          ) : (
            // The padding/negative-margin pair keeps descenders and italic overhangs inside the mask.
            <span key={j} className="mb-[-0.14em] mr-[-0.08em] inline-block overflow-hidden pb-[0.14em] pr-[0.08em] align-bottom">
              {reduce ? (
                <span className={`inline-block ${className}`}>{w}</span>
              ) : (
                <motion.span className={`inline-block ${className}`} variants={word}>
                  {w}
                </motion.span>
              )}
            </span>
          ),
        )}
      </Fragment>
    )
  })

  if (reduce) return <>{nodes}</>

  return (
    <motion.span
      className="block"
      variants={container(delay, stagger)}
      initial="hidden"
      {...(onMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } })}
    >
      {nodes}
    </motion.span>
  )
}
