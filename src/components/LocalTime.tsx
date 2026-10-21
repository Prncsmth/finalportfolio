'use client'

import { useEffect, useState } from 'react'

/** Renders after mount only, so the prerendered shell never depends on the build machine's clock. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  if (!now) return <span className="text-faint">--:--</span>

  const time = new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' }).format(now)

  return <time dateTime={now.toISOString()}>{time} PHT</time>
}
