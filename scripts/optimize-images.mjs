import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';

const IMAGES = [
  { src: 'images/IsmaelFoto.png', name: 'IsmaelFoto' },
  { src: 'images/RefrigeraSpace.png', name: 'RefrigeraSpace' },
];

const outDir = 'public/images';
mkdirSync(outDir, { recursive: true });

for (const { src, name } of IMAGES) {
  if (!existsSync(src)) {
    console.warn(`Skipping ${src} — not found`);
    continue;
  }

  await sharp(src).webp({ quality: 82 }).toFile(`${outDir}/${name}.webp`);
  await sharp(src).avif({ quality: 55 }).toFile(`${outDir}/${name}.avif`);

  console.log(`✓ ${name}: WebP + AVIF → ${outDir}/`);
}
