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
      'Built an emergency coordination platform end to end: an Android app for citizens and responders, a real-time API, an admin dashboard, and a public download site.',
    contributions: [
      {
        area: 'Mobile app',
        stack: 'React Native · Expo',
        commits: 110,
        points: [
          'Live GPS tracking and routing for responders',
          'Slide-to-resolve, alarms and photo reports',
          'SOS failure handling with emergency-call fallback',
          'Step-by-step auth, Google onboarding, privacy consent',
        ],
      },
      {
        area: 'Backend API',
        stack: 'Express · Prisma · PostgreSQL',
        commits: 54,
        points: [
          'Email OTP sign-up and 6-digit password reset',
          'Barangay-scoped alerts, auto-escalation after 2 minutes',
          'Cloudinary uploads, push notifications, rate limiting',
          'Real-time audit log over Socket.IO',
        ],
      },
      {
        area: 'Admin dashboard',
        stack: 'Next.js · Socket.IO',
        commits: 40,
        points: [
          'Live map linked to incidents and nearby responders',
          'Assign responders by barangay',
          'Notifications inbox and announcement severity',
          'Security headers and a content security policy',
        ],
      },
      {
        area: 'Download website',
        stack: 'Next.js · Tailwind CSS',
        commits: 17,
        solo: true,
        points: ['Designed and built on my own', 'Scroll animations and video walkthroughs', 'APK download with QR, coverage map, reviews'],
      },
    ],
  },
  {
    period: 'Oct 2026',
    title: 'Enterprise Network Troubleshooting',
    org: 'Cordova Public College',
    summary:
      'Diagnosed and repaired configuration errors in a simulated enterprise network, configuring network devices and access, then verified IP and DNS connectivity between hosts.',
    tags: ['Cisco Packet Tracer', 'Networking', 'DNS'],
  },
  {
    period: '2026',
    title: 'Team Project Contributor',
    org: 'Skolarly · AI study companion',
    summary: 'Contributed to the Next.js frontend and the Express + Prisma backend of an AI-powered study app.',
    tags: ['Next.js', 'Express', 'Prisma', 'Gemini API'],
  },
  {
    period: '2025 – Present',
    title: 'Web Developer',
    org: 'Freelance',
    summary: 'Designing and building websites and web apps independently.',
  },
  {
    period: '2023 – 2024',
    title: 'Student Web Projects',
    org: 'Cordova Public College',
    summary: 'Reusable React components, an e-commerce app on the DummyJSON API, and profile page designs from Figma.',
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
