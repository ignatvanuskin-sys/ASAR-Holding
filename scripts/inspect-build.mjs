// Разовая проверка собранного HTML: canonical, наличие input внутри <footer>, заголовки.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = '.next/server/app';
if (!existsSync(root)) {
  console.log('нет папки .next/server/app — сначала нужен npm run build');
  process.exit(0);
}

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (entry.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const files = walk(root).sort();
console.log('HTML-файлов:', files.length, '\n');

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const footer = html.match(/<footer[\s\S]*?<\/footer>/i);
  const inputsInFooter = footer ? (footer[0].match(/<input/gi) || []).length : 0;
  const labelsInFooter = footer ? (footer[0].match(/<label/gi) || []).length : 0;
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] ?? '—';
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? '—';
  const h1 = (html.match(/<h1[\s\S]*?<\/h1>/i) || [''])[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const ogUrl = (html.match(/<meta property="og:url" content="([^"]+)"/) || [])[1] ?? '—';

  console.log('── ' + file.replace(/\\/g, '/').replace('.next/server/app/', ''));
  console.log('   title     :', title);
  console.log('   h1        :', h1.slice(0, 70));
  console.log('   canonical :', canonical);
  console.log('   og:url    :', ogUrl);
  console.log('   footer    : input=' + inputsInFooter + ' label=' + labelsInFooter);
}
