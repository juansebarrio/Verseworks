// Preparación única de assets derivados. Correr manualmente:
//   node scripts/prepare-images.mjs
//
// Genera public/og.png (1200×630): recorte de projection-facade.jpg
// centrado en la banda de texto proyectado, con "This is a poem." en
// Literata itálica y VERSEWORKS en Hanken Grotesk con tracking amplio,
// ambos en blanco roto (#FAF7F1).
//
// El texto se compone vía SVG: Literata (con su itálica) y Hanken
// Grotesk deben estar instaladas para fontconfig (ej.: convertir los
// woff2 de @fontsource a TTF, copiarlos a ~/.fonts && fc-cache -f).
import sharp from 'sharp';

const W = 1200;
const H = 630;

const base = await sharp('src/assets/photos/projection-facade.jpg')
  .extract({ left: 0, top: 330, width: 2048, height: 1075 })
  .resize(W, H)
  .toBuffer();

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="64" y="80" font-family="Hanken Grotesk" font-size="19" font-weight="500"
        letter-spacing="6.2" fill="#FAF7F1">VERSEWORKS</text>
  <text x="60" y="566" font-family="Literata" font-style="italic" font-size="64"
        font-weight="400" fill="#FAF7F1">This is a poem.</text>
</svg>`;

await sharp(base)
  .composite([{ input: Buffer.from(svg) }])
  .png()
  .toFile('public/og.png');
console.log('✓ public/og.png');
