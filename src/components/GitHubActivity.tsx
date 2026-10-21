import { ArrowUpRight } from 'lucide-react'
import { site } from '../data/site'
import { getContributionCalendar } from '../lib/github'
import { ContributionGraph } from './ContributionGraph'
import { GitHubIcon } from './Icons'
import { CountUp } from './motion/CountUp'
import { Reveal } from './Reveal'
import { SectionHeading, headingAccent } from './SectionHeading'

export async function GitHubActivity() {
  const calendar = await getContributionCalendar(site.github.user)

  return (
    <section id="github" aria-labelledby="github-title" className="mx-auto max-w-6xl px-5 pt-24 md:px-8 md:pt-36">
      <SectionHeading
        section="github"
        label="GitHub"
        id="github-title"
        title={['A year of', { text: 'commits', className: headingAccent }]}
        aside={
          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-10 items-center gap-2 text-[13px] text-muted transition-colors hover:text-ink"
          >
            <GitHubIcon className="size-3.5" />@{site.github.user}
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        }
      />

      {calendar ? (
        <Reveal>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open @${site.github.user} on GitHub`}
            className="block border border-line bg-surface/40 p-4 transition-colors duration-300 hover:border-faint md:p-6"
          >
            <div className="-mx-1 overflow-x-auto px-1">
              <div className="min-w-[640px]">
                <ContributionGraph calendar={calendar} />
              </div>
            </div>
          </a>

          <dl className="mt-px grid border-x border-b border-line text-[13px] sm:grid-cols-3">
            <div className="border-b border-line p-5 sm:border-b-0 sm:border-r">
              <dt className="uppercase tracking-[0.12em] text-faint">Last 12 months</dt>
              <dd className="mt-2 text-[2.1rem] font-medium leading-none tracking-[-0.05em] text-ink">
                <CountUp value={calendar.total} />
                <span className="ml-2 text-[13px] text-muted">contributions</span>
              </dd>
            </div>
            <div className="border-b border-line p-5 sm:border-b-0 sm:border-r">
              <dt className="uppercase tracking-[0.12em] text-faint">Longest streak</dt>
              <dd className="mt-2 text-[2.1rem] font-medium leading-none tracking-[-0.05em] text-ink">
                <CountUp value={calendar.longestStreak} />
                <span className="ml-2 text-[13px] text-muted">days</span>
              </dd>
            </div>
            <div className="p-5">
              <dt className="uppercase tracking-[0.12em] text-faint">Busiest day</dt>
              <dd className="mt-2 text-[2.1rem] font-medium leading-none tracking-[-0.05em] text-ink">
                {calendar.busiestDay ? <CountUp value={calendar.busiestDay.count} /> : '—'}
                <span className="ml-2 text-[13px] text-muted">
                  {calendar.busiestDay
                    ? new Date(`${calendar.busiestDay.date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
                    : ''}
                </span>
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-[11px] text-faint">Pulled from my public GitHub profile and refreshed daily.</p>
        </Reveal>
      ) : (
        <Reveal>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between border border-line p-6 text-[13px] transition-colors hover:border-ink"
          >
            <span className="flex items-center gap-3">
              <GitHubIcon className="size-4" /> See my latest activity on GitHub
            </span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      )}
    </section>
  )
}
