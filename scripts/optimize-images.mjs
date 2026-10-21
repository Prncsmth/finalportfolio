// Converts source images in assets-src/ into responsive WebP files (next/image serves smaller sizes) in public/images/.
// Run with: npm run images
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const jobs = [
  { dir: 'assets-src/work', out: 'public/images/work', widths: [1440], ratio: 1440 / 1100 },
  { dir: 'assets-src/portrait', out: 'public/images', widths: [960], ratio: 4 / 5 },
]

// Favicons from the whole portrait in black and white, matching the homepage treatment.
// The portrait is letterboxed onto a square filled with its own (greyscale) backdrop colour.
const portrait = path.join(root, 'assets-src/portrait/smith-degamo.jpg')
const { dominant } = await sharp(portrait).extract({ left: 0, top: 0, width: 40, height: 40 }).greyscale().stats()
const backdrop = { r: dominant.r, g: dominant.g, b: dominant.b, alpha: 1 }

const monochrome = (size) =>
  sharp(portrait).greyscale().linear(1.08, -6).resize(size, size, { fit: 'contain', background: backdrop })

for (const [file, size] of [['icon.png', 192], ['apple-icon.png', 180]]) {
  await monochrome(size).png().toFile(path.join(root, 'src/app', file))
  console.log('wrote', `src/app/${file}`)
}
// Small avatar used as the wordmark in the sidebar and top bar.
await monochrome(128).webp({ quality: 82 }).toFile(path.join(root, 'public/images/avatar-128.webp'))
console.log('wrote public/images/avatar-128.webp')

for (const job of jobs) {
  await mkdir(path.join(root, job.out), { recursive: true })
  const files = (await readdir(path.join(root, job.dir))).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
  for (const file of files) {
    const name = path.parse(file).name
    for (const width of job.widths) {
      const target = path.join(root, job.out, `${name}-${width}.webp`)
      await sharp(path.join(root, job.dir, file))
        .resize({ width, height: Math.round(width / job.ratio), fit: 'cover', position: 'top' })
        .webp({ quality: 78 })
        .toFile(target)
      console.log('wrote', path.relative(root, target))
    }
  }
}
