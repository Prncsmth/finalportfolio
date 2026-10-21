import { cacheLife } from 'next/cache'

export type ContributionDay = { date: string; level: number; count: number }

export type ContributionCalendar = {
  /** weeks[week][weekday], Sunday first, matching GitHub's own grid. */
  weeks: (ContributionDay | null)[][]
  total: number
  longestStreak: number
  busiestDay: ContributionDay | null
}

/**
 * Reads the public contribution calendar from the user's GitHub profile.
 * Cached for a day, so the graph stays current without hitting GitHub on every request.
 * Returns null if GitHub is unreachable or the markup changes, and the section falls back to a link.
 */
export async function getContributionCalendar(user: string): Promise<ContributionCalendar | null> {
  'use cache'
  cacheLife('days')

  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      headers: { 'User-Agent': 'smithdegamo-portfolio' },
    })
    if (!res.ok) return null
    const html = await res.text()

    const counts = new Map<string, number>()
    for (const m of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g)) {
      const n = /^(\d+) contribution/.exec(m[2].trim())
      counts.set(m[1], n ? Number(n[1]) : 0)
    }

    const weeks: (ContributionDay | null)[][] = []
    for (const m of html.matchAll(/<td\b[^>]*>/g)) {
      const tag = m[0]
      const date = /data-date="([\d-]+)"/.exec(tag)?.[1]
      const id = /\bid="contribution-day-component-(\d+)-(\d+)"/.exec(tag)
      const level = /data-level="(\d)"/.exec(tag)?.[1]
      if (!date || !id || level === undefined) continue
      const [weekday, week] = [Number(id[1]), Number(id[2])]
      weeks[week] ??= Array.from({ length: 7 }, () => null)
      weeks[week][weekday] = { date, level: Number(level), count: counts.get(`contribution-day-component-${id[1]}-${id[2]}`) ?? 0 }
    }
    if (weeks.length === 0) return null

    const days = weeks
      .flat()
      .filter((d): d is ContributionDay => d !== null)
      .sort((a, b) => a.date.localeCompare(b.date))

    let longestStreak = 0
    let streak = 0
    for (const d of days) {
      streak = d.count > 0 ? streak + 1 : 0
      longestStreak = Math.max(longestStreak, streak)
    }

    const busiestDay = days.reduce<ContributionDay | null>((best, d) => (!best || d.count > best.count ? d : best), null)

    return {
      weeks: Array.from(weeks, (w) => w ?? Array.from({ length: 7 }, () => null)),
      total: days.reduce((sum, d) => sum + d.count, 0),
      longestStreak,
      busiestDay: busiestDay && busiestDay.count > 0 ? busiestDay : null,
    }
  } catch {
    return null
  }
}
