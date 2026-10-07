// Genera los assets de marca a partir de los paths del isotipo.
// Uso: node scripts/generate-brand-assets.mjs
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const CORAL = '#FF6467'
const SUN =
  'M166.583 0C104.175 0 53.5835 50.6658 53.5835 113.165C53.5835 125.711 55.6222 137.781 59.3859 149.059L104.857 65.3068L166.583 169L227.315 65.3068L274.581 146.566C277.833 136.009 279.583 124.792 279.583 113.165C279.583 50.6658 228.992 0 166.583 0Z'
const MOUNTAIN =
  'M333.404 239.604H324.597L227.714 71.8091L130.838 239.604H79.2627L105.684 193.842L127.07 230.884L140.279 208.005L105.68 148.08L52.8408 239.604H35.2256L105.68 117.571L149.088 192.749L162.296 169.872L105.677 71.8081L8.80176 239.604H0L105.685 56.5542L166.701 162.243L227.721 56.5542L333.404 239.604ZM298.173 239.604H280.557L227.712 148.08L174.873 239.604H157.257L227.712 117.571L298.173 239.604ZM254.138 239.604H201.296L227.717 193.842L254.138 239.604Z'

const logo = (fill) =>
  `<svg width="334" height="240" viewBox="0 0 334 240" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="${SUN}" fill="${CORAL}"/>\n<path d="${MOUNTAIN}" fill="${fill}"/>\n</svg>\n`

// Logo adaptable al tema (hereda color del texto) y versión blanca
await writeFile('public/assets/isovalpoAndino.svg', logo('currentColor'))
await writeFile('public/assets/isovalpoAndinoWhite.svg', logo('white'))

// Favicon SVG cuadrado: la montaña cambia según el tema del navegador
const squareBox = '-20 -67 374 374'
const faviconSvg = (fill, bg = '') =>
  `<svg viewBox="${squareBox}" xmlns="http://www.w3.org/2000/svg">${
    bg ? `<rect x="-20" y="-67" width="374" height="374" rx="70" fill="${bg}"/>` : ''
  }<path d="${SUN}" fill="${CORAL}"/><path d="${MOUNTAIN}" fill="${fill}"/></svg>`

await writeFile(
  'public/favicon.svg',
  `<svg viewBox="${squareBox}" xmlns="http://www.w3.org/2000/svg"><style>.m{fill:#18181b}@media (prefers-color-scheme:dark){.m{fill:#fff}}</style><path d="${SUN}" fill="${CORAL}"/><path class="m" d="${MOUNTAIN}"/></svg>\n`,
)

// PNG con fondo blanco (visible en cualquier pestaña / pantalla de inicio)
const png = (size, file) =>
  sharp(Buffer.from(faviconSvg('#18181b', '#ffffff')))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(file)

await png(48, 'public/favicon.png')
await png(180, 'public/apple-touch-icon.png')
await png(192, 'public/icon-192.png')
await png(512, 'public/icon-512.png')

// favicon.ico (32x32, payload PNG)
const ico32 = await sharp(Buffer.from(faviconSvg('#18181b', '#ffffff')))
  .resize(32, 32)
  .png()
  .toBuffer()
const header = Buffer.alloc(22)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(1, 4)
header.writeUInt8(32, 6)
header.writeUInt8(32, 7)
header.writeUInt16LE(1, 10)
header.writeUInt16LE(32, 12)
header.writeUInt32LE(ico32.length, 14)
header.writeUInt32LE(22, 18)
await writeFile('public/favicon.ico', Buffer.concat([header, ico32]))

console.log('Assets de marca generados')
