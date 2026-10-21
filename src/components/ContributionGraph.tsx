'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'
import type { ContributionCalendar } from '../lib/github'

const CELL = 13
const RADII = [1, 2.1, 3, 3.9, 4.8]
const OPACITY = [0.18, 0.55, 0.72, 0.88, 1]
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const label = (count: number, date: string) => {
  const d = new Date(`${date}T00:00:00Z`)
  const when = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
  return `${count === 0 ? 'No' : count} contribution${count === 1 ? '' : 's'} on ${when}`
}

/**
 * GitHub's contribution calendar redrawn as a halftone: busier days print as larger dots.
 * Dots ripple in column by column the first time the graph scrolls into view (CSS-only, so it stays cheap).
 */
export function ContributionGraph({ calendar }: { calendar: ContributionCalendar }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const { weeks } = calendar
  const width = weeks.length * CELL
  const top = 16

  // Label a column when the month changes within its first week.
  const monthLabels = weeks.flatMap((week, col) => {
    const first = week.find(Boolean)
    if (!first) return []
    const d = new Date(`${first.date}T00:00:00Z`)
    return d.getUTCDate() <= 7 && col > 0 ? [{ col, text: MONTHS[d.getUTCMonth()] }] : []
  })

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${top + 7 * CELL}`}
      className={`contrib h-auto w-full ${inView ? 'is-visible' : ''}`}
      role="img"
      aria-label={`GitHub contribution graph: ${calendar.total} contributions in the last year`}
    >
      {monthLabels.map((m) => (
        <text key={m.col} x={m.col * CELL + 2} y={10} className="fill-faint text-[8px]">
          {m.text}
        </text>
      ))}
      {weeks.map((week, col) =>
        week.map((day, row) =>
          day ? (
            <circle
              key={day.date}
              cx={col * CELL + CELL / 2}
              cy={top + row * CELL + CELL / 2}
              r={RADII[day.level]}
              fill={day.level === 4 ? 'rgb(var(--accent))' : 'rgb(var(--ink))'}
              fillOpacity={OPACITY[day.level]}
              style={{ animationDelay: `${col * 14 + row * 18}ms` }}
            >
              <title>{label(day.count, day.date)}</title>
            </circle>
          ) : null,
        ),
      )}
    </svg>
  )
}
