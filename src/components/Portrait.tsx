'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Hero portrait. Fills its parent's height (the hero sizes it to the intro text) and opens with a
 * bottom-up curtain wipe while the photo settles from a slight zoom. Static for reduced-motion users.
 */
export function Portrait() {
  const reduce = useReducedMotionSafe()

  return (
    <motion.div
      data-guide="portrait"
      className="portrait relative h-full overflow-hidden border border-line bg-surface"
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.18 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease, delay: 0.2 }}
      >
        <Image
          src="/images/smith-degamo-960.webp"
          fill
          sizes="(min-width: 768px) 30rem, 90vw"
          alt="Portrait of Smith Degamo"
          preload
          className="object-cover object-[50%_22%]"
        />
      </motion.div>
    </motion.div>
  )
}
