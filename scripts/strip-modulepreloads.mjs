import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.resolve('.output/public');
const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

for (const file of htmlFiles) {
  const full = path.join(publicDir, file);
  let html = fs.readFileSync(full, 'utf8');

  const entry = html.match(/<script type="module" src="\/_nuxt\/([^"]+\.js)"/)?.[1];
  if (!entry) continue;

  const entrySource = fs.readFileSync(path.join(publicDir, '_nuxt', entry), 'utf8');
  const keep = new Set([entry]);
  for (const m of entrySource.matchAll(/(?:from|import)"\.\/([\w-]+\.js)"/g)) {
    keep.add(m[1]);
  }

  let removed = 0;
  html = html.replace(/<link rel="modulepreload"[^>]*href="\/_nuxt\/([^"]+\.js)"[^>]*>/g, (tag, href) => {
    if (keep.has(href)) return tag;
    removed++;
    return '';
  });

  fs.writeFileSync(full, html);
  console.log(`${file}: entry=${entry}, kept=${keep.size}, removed=${removed}`);
}
