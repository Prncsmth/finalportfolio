export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  slug: string
  title: string
  kind: string
  summary: string | null
  year?: string
  note?: string
  stack: string[]
  /** Main deployed, publicly reachable URL. */
  live?: ProjectLink
  /** Other deployed surfaces of the same project (e.g. a staff console). */
  moreLive?: ProjectLink[]
  /** Public source repositories. */
  source?: ProjectLink[]
  /** Base path of an optimized screenshot in /public/images/work (without the -1440 suffix). */
  image?: string
}

export const projects: Project[] = [
  {
    slug: 'cordova-riskq',
    title: 'CORDOVA RISKQ',
    kind: 'Capstone project',
    year: '2026',
    summary:
      'Emergency coordination for Cordova, Cebu: citizens send an SOS, responders are tracked live, and admins manage it all on a map.',
    note: 'Academic project, not an adopted LGU system.',
    stack: ['TypeScript', 'React Native', 'Expo', 'Next.js', 'Express', 'PostgreSQL', 'Prisma', 'Socket.IO', 'Mapbox'],
    live: { label: 'cordovariskq.org', href: 'https://www.cordovariskq.org' },
    moreLive: [{ label: 'Admin dashboard', href: 'https://admin.cordovariskq.org' }],
    source: [
      { label: 'Mobile app', href: 'https://github.com/Prncsmth/CordovaRiskQ-Frontend' },
      { label: 'Backend API', href: 'https://github.com/Prncsmth/CordovaRiskQ-Bacnkend' },
      { label: 'Admin dashboard', href: 'https://github.com/Prncsmth/cordova-riskq-admin' },
      { label: 'Website', href: 'https://github.com/Prncsmth/CordovaRiskQ-Website' },
    ],
    image: '/images/work/cordova-riskq',
  },
  {
    slug: 'skolarly',
    title: 'Skolarly',
    kind: 'Team project',
    year: '2026',
    summary:
      'AI study companion that explains lessons, generates quizzes, and answers questions as a tutor.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Express', 'Prisma', 'PostgreSQL', 'Gemini API'],
    live: { label: 'skolarly-frontend.vercel.app', href: 'https://skolarly-frontend.vercel.app' },
    source: [
      { label: 'Frontend', href: 'https://github.com/MetzChai/Skolarly-Frontend' },
      { label: 'Backend', href: 'https://github.com/jessiecatubay/skolarly-backend' },
    ],
    image: '/images/work/skolarly',
  },
  {
    slug: 'kramz-paddleforge',
    title: 'KRAMZ PaddleForge',
    kind: 'Booking platform',
    year: 'Oct 2026',
    summary:
      'Pickleball court booking with cash or GCash payments and a live staff console.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Neon'],
    live: { label: 'kramzzpickle.vercel.app', href: 'https://kramzzpickle.vercel.app' },
    moreLive: [{ label: 'Staff console', href: 'https://kramzpickle.vercel.app' }],
    image: '/images/work/kramz-booking',
  },
]
