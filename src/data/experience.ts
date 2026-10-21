export type Contribution = {
  area: string
  stack: string
  /** Non-merge commits authored by Smith, counted from the repository history. */
  commits: number
  solo?: boolean
  points: string[]
}

export type ExperienceItem = {
  period: string
  title: string
  org: string
  summary?: string
  contributions?: Contribution[]
  tags?: string[]
}

export const experience: ExperienceItem[] = [
  {
    period: 'Jul – Oct 2026',
    title: 'Web & Mobile Developer',
    org: 'CORDOVA RISKQ · Capstone project',
    summary:
      'Android app, real-time API, admin dashboard, and download site, built end to end.',
    contributions: [
      {
        area: 'Mobile app',
        stack: 'React Native · Expo',
        commits: 110,
        points: [
          'Live GPS tracking and routing',
          'SOS with emergency-call fallback',
          'Photo reports and alarms',
        ],
      },
      {
        area: 'Backend API',
        stack: 'Express · Prisma · PostgreSQL',
        commits: 54,
        points: [
          'Email OTP and password reset',
          'Auto-escalation after 2 minutes',
          'Real-time audit log',
        ],
      },
      {
        area: 'Admin dashboard',
        stack: 'Next.js · Socket.IO',
        commits: 40,
        points: [
          'Live incident map',
          'Responder assignment by barangay',
          'Notifications inbox',
        ],
      },
      {
        area: 'Download website',
        stack: 'Next.js · Tailwind CSS',
        commits: 17,
        solo: true,
        points: ['Designed and built solo', 'APK download with QR code', 'Video walkthroughs'],
      },
    ],
  },
  {
    period: 'Oct 2026',
    title: 'Enterprise Network Troubleshooting',
    org: 'Cordova Public College',
    summary:
      'Fixed configuration errors in a simulated enterprise network and verified IP and DNS connectivity.',
    tags: ['Cisco Packet Tracer', 'Networking', 'DNS'],
  },
  {
    period: '2026',
    title: 'Team Project Contributor',
    org: 'Skolarly · AI study companion',
    summary: 'Frontend and backend work on an AI study app.',
    tags: ['Next.js', 'Express', 'Prisma', 'Gemini API'],
  },
  {
    period: '2025 – Present',
    title: 'Web Developer',
    org: 'Freelance',
    summary: 'Websites and web apps, built independently.',
  },
  {
    period: '2023 – 2024',
    title: 'Student Web Projects',
    org: 'Cordova Public College',
    summary: 'React components, an e-commerce app, and Figma designs.',
    tags: ['React', 'JavaScript', 'Figma'],
  },
  {
    period: '2023',
    title: 'Wrote my first line of code',
    org: 'Cordova Public College',
  },
]

export const education = [
  { school: 'Cordova Public College', program: 'Bachelor of Science in Information Technology', period: '4th year · 2026 – 2027' },
  { school: 'Cordova National High School', program: 'Information and Communications Technology', period: '2016 – 2020' },
]
