import { About } from '../components/About'
import { Certifications } from '../components/Certifications'
import { Contact } from '../components/Contact'
import { Experience } from '../components/Experience'
import { Footer } from '../components/Footer'
import { GitHubActivity } from '../components/GitHubActivity'
import { GuideCursor } from '../components/GuideCursor'
import { Hero } from '../components/Hero'
import { Sidebar } from '../components/layout/Sidebar'
import { TopBar } from '../components/layout/TopBar'
import { Stack } from '../components/Stack'
import { Work } from '../components/Work'
import { site } from '../data/site'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  address: { '@type': 'PostalAddress', addressLocality: 'Cordova, Cebu', addressCountry: 'PH' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: site.school },
  knowsAbout: ['React', 'React Native', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Laravel'],
  sameAs: [site.socials.github, site.socials.linkedin],
}

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-60 focus:bg-ink focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-paper"
      >
        Skip to content
      </a>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="halftone mask-bl absolute bottom-0 left-0 h-[55vh] w-[50vw] opacity-[0.07]" />
      </div>

      <Sidebar />
      <TopBar />
      <GuideCursor />

      <div className="lg:pl-60">
        <main id="main">
          <Hero />
          <Work />
          <Experience />
          <About />
          <Stack />
          <GitHubActivity />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    </>
  )
}
