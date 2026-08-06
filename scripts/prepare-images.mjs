// Preparación única de assets derivados. Correr manualmente:
//   node scripts/prepare-images.mjs
//
// Genera:
//  - src/assets/photos/5-crop.jpg: de 5.jpg (spread de revista) conserva la
//    escena fotográfica (público bajo luces + tarjeta en mano) y descarta la
//    columna de texto de la derecha. El corte cae donde termina la foto, no
//    en la mitad geométrica, para no partir la tarjeta.
//  - public/og.png (1200×630): recorte de 9.jpg centrado en la máquina de
//    escribir y la lámpara, con "This is a poem." en Literata y VERSEWORKS
//    en Hanken Grotesk, ambos en blanco roto (#FAF7F1).
//
// El texto del og se compone vía SVG: Literata y Hanken Grotesk deben estar
// instaladas para fontconfig (ej.: convertir los woff2 de @fontsource a TTF
// y copiarlos a ~/.fonts && fc-cache -f).
import sharp from 'sharp';

// --- 1 · 5-crop.jpg -------------------------------------------------
await sharp('src/assets/photos/5.jpg')
  .extract({ left: 64, top: 48, width: 1386, height: 1448 })
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile('src/assets/photos/5-crop.jpg');
console.log('✓ src/assets/photos/5-crop.jpg');

// --- 2 · public/og.png ----------------------------------------------
const W = 1200;
const H = 630;

const base = await sharp('src/assets/photos/9.jpg')
  .extract({ left: 350, top: 285, width: 1620, height: 850 })
  .resize(W, H)
  .toBuffer();

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="64" y="80" font-family="Hanken Grotesk" font-size="19" font-weight="500"
        letter-spacing="6.2" fill="#FAF7F1">VERSEWORKS</text>
  <text x="60" y="566" font-family="Literata" font-size="64" font-weight="400"
        fill="#FAF7F1">This is a poem.</text>
</svg>`;

await sharp(base)
  .composite([{ input: Buffer.from(svg) }])
  .png()
  .toFile('public/og.png');
console.log('✓ public/og.png');
