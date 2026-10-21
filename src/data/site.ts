import { certifications } from './certifications'

// Single source of truth for personal details. Update these values in one place.
export const site = {
  name: 'Smith Degamo',
  role: 'Web & Mobile Developer',
  location: 'Cebu, Philippines',
  timeZone: 'Asia/Manila',
  school: 'Cordova Public College',
  program: 'BS Information Technology',
  year: '4th year',
  // Vercel provides the production domain at build time, so links and share previews always point at the live site.
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000',
  // From the résumé. The old site also listed smithdegamo@ and smithdegamox@gmail.com.
  email: 'smithdegamox2@gmail.com',
  resume: '/Smith-Degamo-Resume.pdf',
  github: { user: 'Prncsmth' },
  socials: {
    github: 'https://github.com/Prncsmth',
    linkedin: 'https://www.linkedin.com/in/smith-degamo-384a3b392/',
  },
} as const

export type SectionId = 'work' | 'experience' | 'about' | 'stack' | 'github' | 'certifications' | 'contact'

const allSections: { id: SectionId; label: string }[] = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'github', label: 'GitHub' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

/** Sections in page order. Certifications only appears once there is at least one real entry. */
export const navLinks = allSections.filter((s) => s.id !== 'certifications' || certifications.length > 0)
