// Gera o site estático em dist/client (pasta publicada). Sem dependências: `node build.mjs`.
import { mkdirSync, writeFileSync, cpSync, rmSync, copyFileSync } from 'node:fs';
import { site, publicacoes } from './src/conteudo.mjs';
import * as P from './src/paginas.mjs';

const OUT = 'dist/client';
rmSync('dist', { recursive: true, force: true });
const grava = (caminho, html) => {
  const arq = caminho.endsWith('.html') ? `${OUT}${caminho}` : `${OUT}${caminho}index.html`;
  mkdirSync(arq.slice(0, arq.lastIndexOf('/')), { recursive: true });
  writeFileSync(arq, html);
};

const paginas = [
  ['/', P.inicio(), '1.0'],
  ['/a-casa/', P.aCasa(), '0.8'],
  ['/fundamentos/', P.fundamentos(), '0.8'],
  ['/publicacoes/', P.reflexoes(), '0.8'],
  ['/acervo/', P.acervoPag(), '0.6'],
  ['/visite/', P.visite(), '0.9'],
  ...publicacoes.map(p => [`/publicacoes/${p.slug}/`, P.artigo(p), '0.6', p.data]),
];
paginas.forEach(([c, h]) => grava(c, h));
grava('/404.html', P.naoEncontrada());

cpSync('src/assets', `${OUT}/assets`, { recursive: true });
['favicon-32.png', 'apple-touch-icon.png'].forEach(f => copyFileSync(`src/${f}`, `${OUT}/${f}`));

const hoje = new Date().toISOString().slice(0, 10);
writeFileSync(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas.map(([c, , pr, d]) => `  <url><loc>${site.url}${c}</loc><lastmod>${d || hoje}</lastmod><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`);
writeFileSync(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
writeFileSync(`${OUT}/site.webmanifest`, JSON.stringify({
  name: site.nome, short_name: site.sigla, lang: 'pt-BR', start_url: '/', display: 'standalone',
  background_color: '#F5EEE3', theme_color: '#4C1A19',
  icons: [{ src: '/assets/img/marca/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 1));
console.log(`${paginas.length + 1} páginas em ${OUT}/`);
