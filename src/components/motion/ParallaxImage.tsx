'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'

type ParallaxImageProps = {
  src: string
  alt: string
  sizes: string
  className?: string
}

const ease = [0.16, 1, 0.3, 1] as const

/**
 * A screenshot that wipes open from the bottom when it enters view, then drifts slightly
 * against the scroll for depth. Both effects are skipped for reduced-motion users.
 */
export function ParallaxImage({ src, alt, sizes, className = '' }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  if (reduce) {
    return (
      <div ref={ref} className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes={sizes} className={className} />
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.2, ease }}
    >
      <motion.div className="absolute -inset-y-[6%] inset-x-0" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1.6, ease }}
        >
          <Image src={src} alt={alt} fill sizes={sizes} className={className} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
