import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'Smith Degamo, Web & Mobile Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const portrait = await readFile(join(process.cwd(), 'assets-src/portrait/smith-degamo.jpg'))
const portraitSrc = `data:image/jpeg;base64,${portrait.toString('base64')}`

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#f7f6f2',
          color: '#111110',
          padding: 72,
          backgroundImage: 'radial-gradient(rgba(17,17,16,0.14) 1.2px, transparent 1.4px)',
          backgroundSize: '14px 14px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, background: '#f7f6f2', padding: '8px 40px 8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: '#666560', letterSpacing: 3, textTransform: 'uppercase' }}>
            <div style={{ width: 12, height: 12, background: '#e25026' }} />
            Web & Mobile Developer
          </div>
          <div style={{ display: 'flex', fontSize: 92, fontWeight: 600, lineHeight: 1, letterSpacing: -4, whiteSpace: 'nowrap' }}>Smith Degamo</div>
          <div style={{ display: 'flex', fontSize: 28, color: '#666560' }}>Web & mobile apps, from the database to the last pixel.</div>
        </div>
        <div style={{ display: 'flex', width: 360, height: 486, border: '1px solid #e2e0d8', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portraitSrc} width={360} height={486} alt="" style={{ objectFit: 'cover', filter: 'grayscale(1)' }} />
        </div>
      </div>
    ),
    size,
  )
}
