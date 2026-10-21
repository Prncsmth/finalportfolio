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
      'An Android app and web platform for emergency coordination in Cordova, Cebu. Citizens send an SOS with their location and report incidents, responders get live routes and are tracked in real time, and administrators run everything from a live-map dashboard.',
    note: 'Academic capstone project, not an officially adopted LGU system.',
    stack: ['TypeScript', 'React Native', 'Expo', 'Next.js', 'Express', 'PostgreSQL', 'Prisma', 'Socket.IO', 'Mapbox'],
    live: { label: 'cordova-riskq-website.vercel.app', href: 'https://cordova-riskq-website.vercel.app' },
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
      'An AI study companion. Students upload a lesson to get clear explanations and key concepts, generate quizzes with adjustable difficulty, and ask an AI tutor follow-up questions.',
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
      'Court booking for an outdoor pickleball venue in Cordova, Cebu. Players pick a slot on the Left or Right court, pay by cash or GCash, and track their booking, while the owner and staff confirm requests from a console that shares the same live schedule.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Neon'],
    live: { label: 'kramzzpickle.vercel.app', href: 'https://kramzzpickle.vercel.app' },
    moreLive: [{ label: 'Staff console', href: 'https://kramzpickle.vercel.app' }],
    image: '/images/work/kramz-booking',
  },
]
