import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Instrument_Serif } from 'next/font/google'
import { MotionProvider } from '../components/MotionProvider'
import { site } from '../data/site'
import './globals.css'

const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

const description =
  'Smith Degamo is a web and mobile developer from Cebu, Philippines. A 4th-year BSIT student building web and mobile apps with React Native, React, Next.js, Node.js, and PostgreSQL.'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: ['Smith Degamo', 'web developer', 'mobile developer', 'app developer', 'React Native', 'Expo', 'React', 'Next.js', 'TypeScript', 'Laravel', 'Cebu', 'Philippines', 'portfolio'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: site.name,
    description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f6f2' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0c' },
  ],
}

// Applies the saved or system theme before first paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistMono.variable} ${instrumentSerif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh overflow-x-hidden">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
