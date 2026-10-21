'use client'

import { useEffect, useRef } from 'react'

const SPACING = 14
const BASE_RADIUS = 0.9
const MAX_RADIUS = 3.4
const INFLUENCE = 150

function readRgb(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).join(',')
}

/**
 * A halftone dot grid that swells and warms toward the pointer.
 * Renders once (static) for reduced-motion users and pauses while offscreen.
 */
export function HalftoneField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    let colors = { dot: readRgb('--dot'), accent: readRgb('--accent') }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          // Fade the field out toward the bottom-left so it never competes with the text.
          const fade = Math.min(1, (x / width) * 1.4) * Math.min(1, (1 - y / height) * 1.6 + 0.2)
          const dist = Math.hypot(x - pointer.x, y - pointer.y)
          const t = Math.max(0, 1 - dist / INFLUENCE)
          const ease = t * t * (3 - 2 * t)
          const r = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * ease
          ctx.fillStyle = ease > 0.02 ? `rgba(${colors.accent},${(0.25 + 0.6 * ease) * fade})` : `rgba(${colors.dot},${0.16 * fade})`
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.12
      pointer.y += (pointer.ty - pointer.y) * 0.12
      draw()
      if (Math.abs(pointer.tx - pointer.x) > 0.5 || Math.abs(pointer.ty - pointer.y) > 0.5) {
        frame = requestAnimationFrame(loop)
      } else {
        frame = 0
      }
    }

    const kick = () => {
      if (!frame && visible) frame = requestAnimationFrame(loop)
    }

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = event.clientX - rect.left
      pointer.ty = event.clientY - rect.top
      if (pointer.x < -1000) {
        pointer.x = pointer.tx
        pointer.y = pointer.ty
      }
      kick()
    }

    const onLeave = () => {
      pointer.tx = pointer.ty = -9999
      pointer.x = pointer.y = -9999
      draw()
    }

    const themeObserver = new MutationObserver(() => {
      colors = { dot: readRgb('--dot'), accent: readRgb('--accent') }
      draw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    visibility.observe(canvas)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const host = canvas.parentElement
    if (!reduceMotion && host && window.matchMedia('(pointer: fine)').matches) {
      host.addEventListener('pointermove', onMove)
      host.addEventListener('pointerleave', onLeave)
    }

    // The tour's ghost cursor (see GuideCursor) drives the field the same way a real pointer does.
    const onGuideMove = (event: Event) => {
      const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail
      onMove({ clientX: x, clientY: y } as PointerEvent)
    }
    if (!reduceMotion) {
      window.addEventListener('guide:move', onGuideMove)
      window.addEventListener('guide:end', onLeave)
    }

    return () => {
      window.removeEventListener('guide:move', onGuideMove)
      window.removeEventListener('guide:end', onLeave)
      cancelAnimationFrame(frame)
      themeObserver.disconnect()
      visibility.disconnect()
      resizeObserver.disconnect()
      host?.removeEventListener('pointermove', onMove)
      host?.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />
}
