export type Certification = {
  title: string
  issuer: string
  /** e.g. "2026" or "Mar 2026" */
  date?: string
  /** Public verification link, if the issuer provides one. */
  credentialUrl?: string
}

// Add real certifications here. The Certifications section and its nav link
// stay hidden until this list has at least one entry.
export const certifications: Certification[] = [
  // TODO: confirm the exact certificate title and add the date issued.
  { title: 'Web Design', issuer: 'TESDA' },
]
