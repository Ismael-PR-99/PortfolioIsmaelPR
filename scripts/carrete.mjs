#!/usr/bin/env node
/**
 * Prepara fotos del export de Instagram para el carrete del portfolio.
 *
 *   node scripts/carrete.mjs <carpeta-del-export> [--limit 12] [--dry]
 *
 * Ejemplo:
 *   node scripts/carrete.mjs "C:/Users/ismae/Downloads/instagram-export" --limit 10
 *
 * Qué hace:
 *   - busca imágenes dentro del export (media/posts, media/other, etc.)
 *   - ordena por fecha de captura, las más recientes primero
 *   - redimensiona el lado largo a 1400 px como máximo
 *   - convierte a WebP con calidad 82
 *   - renombra a 01-…, 02-… para fijar el orden del carrete
 *   - escribe en public/images/carrete/
 *
 * Requiere sharp:  pnpm add -D sharp
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'images', 'carrete');

const MAX_EDGE = 1400;
const QUALITY = 82;
const IMAGE_RE = /\.(jpe?g|png|webp|heic)$/i;

// El export de Meta incluye fotos de conversaciones privadas junto a las
// publicaciones. Nunca deben acabar en una web pública, así que se excluyen
// carpetas enteras además de miniaturas y avatares.
const SKIP_RE =
  /[\\/](messages|inbox|threads|archived_threads|message_requests)[\\/]|thumbnail|profile_?pic|avatar|_thumb/i;

function parseArgs(argv) {
  const args = { source: null, limit: 12, dry: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--limit') args.limit = Number(argv[++i]);
    else if (a === '--dry') args.dry = true;
    else if (!a.startsWith('--')) args.source = a;
  }
  return args;
}

function walk(dir, found = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, found);
    else if (IMAGE_RE.test(e.name) && !SKIP_RE.test(full)) found.push(full);
  }
  return found;
}

function slug(file) {
  return path
    .basename(file, path.extname(file))
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'foto';
}

async function main() {
  const { source, limit, dry } = parseArgs(process.argv.slice(2));

  if (!source) {
    console.error('Falta la carpeta del export.\n');
    console.error('  node scripts/carrete.mjs <carpeta-del-export> [--limit 12] [--dry]');
    process.exit(1);
  }

  if (!fs.existsSync(source)) {
    console.error(`No existe la carpeta: ${source}`);
    process.exit(1);
  }

  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('Falta sharp. Instálalo con:\n\n  pnpm add -D sharp\n');
    process.exit(1);
  }

  const files = walk(source);
  if (files.length === 0) {
    console.error(`No se encontró ninguna imagen dentro de ${source}`);
    process.exit(1);
  }

  // Las más recientes primero, según la fecha de modificación del archivo
  const sorted = files
    .map((f) => ({ file: f, mtime: fs.statSync(f).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime)
    .slice(0, limit);

  console.log(`Encontradas ${files.length} imágenes. Procesando ${sorted.length}.\n`);

  if (dry) {
    sorted.forEach(({ file }, i) => {
      console.log(`  ${String(i + 1).padStart(2, '0')}-${slug(file)}.webp   <- ${file}`);
    });
    console.log('\nEnsayo, no se ha escrito nada. Quita --dry para generarlas.');
    return;
  }

  fs.mkdirSync(OUT, { recursive: true });

  let written = 0;
  let totalBytes = 0;

  for (const [i, { file }] of sorted.entries()) {
    const name = `${String(i + 1).padStart(2, '0')}-${slug(file)}.webp`;
    const dest = path.join(OUT, name);

    try {
      const buf = await sharp(file)
        .rotate() // respeta la orientación EXIF
        .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toBuffer();

      fs.writeFileSync(dest, buf);
      written++;
      totalBytes += buf.length;
      console.log(`  ${name}  ${(buf.length / 1024).toFixed(0)} KB`);
    } catch (err) {
      console.warn(`  omitida ${path.basename(file)}: ${err.message}`);
    }
  }

  console.log(`\n${written} fotos en public/images/carrete/ (${(totalBytes / 1024 / 1024).toFixed(1)} MB en total).`);

  // El export de Instagram nombra los archivos con números, y de ahí sale el
  // texto alternativo. "456790 5678" no le sirve de nada a un lector de
  // pantalla, así que avisamos de cuáles hay que renombrar.
  const numeric = fs
    .readdirSync(OUT)
    .filter((f) => f.endsWith('.webp'))
    .filter((f) => !/[a-z]{3}/i.test(f.replace(/^\d+-/, '').replace('.webp', '')));

  if (numeric.length > 0) {
    console.log(`\n  Aviso: ${numeric.length} archivo(s) con nombre numérico.`);
    console.log('  El texto alternativo sale del nombre, así que renómbralos');
    console.log('  describiendo la foto. Por ejemplo:');
    console.log(`    ${numeric[0]}  ->  ${numeric[0].slice(0, 3)}sevilla-atardecer.webp`);
  }

  console.log('\nRenombra los archivos para cambiar el orden (prefijo 01-, 02-…).');
  console.log('Luego: pnpm build');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
