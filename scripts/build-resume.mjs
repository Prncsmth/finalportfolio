// Renders resume/resume.html to public/Smith-Degamo-Resume.pdf with the locally installed Microsoft Edge.
// Run with: npm run resume
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright-core'

const root = path.resolve(import.meta.dirname, '..')
const source = pathToFileURL(path.join(root, 'resume/resume.html')).href
const target = path.join(root, 'public/Smith-Degamo-Resume.pdf')

const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage()
await page.goto(source, { waitUntil: 'load' })
await page.pdf({ path: target, format: 'Letter', printBackground: false, preferCSSPageSize: true, tagged: true, outline: false })
await browser.close()
console.log('wrote', path.relative(root, target))
