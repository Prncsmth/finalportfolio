'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'

type RevealProps = HTMLMotionProps<'div'> & { delay?: number }

/** Fades and lifts content into view once. Motion is disabled globally for reduced-motion users. */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
