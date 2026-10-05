// Moldura comum a todas as páginas: <head> com SEO, cabeçalho, menus, barra mobile e rodapé.
import { site, nav } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const icone = (n, cls = '') => `<svg class="i ${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
export const img = (nome, alt, { w = 960, lazy = true, cls = '', sizes = '(max-width: 760px) 90vw, 40vw' } = {}) =>
  `<img class="${cls}" src="/assets/img/artes/${nome}-960.webp" width="960" height="1200" alt="${esc(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;
export const foto = (nome, alt, lazy = false) =>
  `<img src="/assets/img/fotos/${nome}-900.webp" width="900" height="1200" alt="${esc(alt)}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'}>`;
// título com linhas mascaradas (animadas no scroll)
export const linhas = (txt, tag = 'h2', cls = 'h2') =>
  `<${tag} class="${cls}">${txt.split('|').map(l => `<span class="mask"><span class="up">${l}</span></span>`).join('')}</${tag}>`;
export const dataBR = iso => new Date(iso + 'T12:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '');

const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="i-casa" viewBox="0 0 24 24"><path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5M10 20v-5h4v5"/></symbol>
<symbol id="i-brasao" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><path d="M9.5 9.5l5 5M14.5 9.5l-5 5"/></symbol>
<symbol id="i-oxe" viewBox="0 0 24 24"><path d="M12 3v18M12 6.5C8 6 5.5 7.6 5.5 10.2S8 14 12 13.5M12 6.5c4-.5 6.5 1.1 6.5 3.7S16 14 12 13.5"/></symbol>
<symbol id="i-livro" viewBox="0 0 24 24"><path d="M12 6.5C10 5 7 4.6 3.5 5v13c3.5-.4 6.5 0 8.5 1.5 2-1.5 5-1.9 8.5-1.5V5C17 4.6 14 5 12 6.5Zm0 0v13"/></symbol>
<symbol id="i-grade" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9.3 4v16M14.7 4v16M4 9.3h16M4 14.7h16"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/></symbol>
<symbol id="i-seta" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></symbol>
<symbol id="i-seta-v" viewBox="0 0 24 24"><path d="M12 4v15M6 13l6 6 6-6"/></symbol>
<symbol id="i-ondas" viewBox="0 0 24 24"><path d="M3 8c1.5-1.4 3-1.4 4.5 0s3 1.4 4.5 0 3-1.4 4.5 0 3 1.4 4.5 0M3 12.5c1.5-1.4 3-1.4 4.5 0s3 1.4 4.5 0 3-1.4 4.5 0 3 1.4 4.5 0M3 17c1.5-1.4 3-1.4 4.5 0s3 1.4 4.5 0 3-1.4 4.5 0 3 1.4 4.5 0"/></symbol>
<symbol id="i-folha" viewBox="0 0 24 24"><path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Zm0 0 8-8"/></symbol>
<symbol id="i-estrela" viewBox="0 0 24 24"><path d="m12 3.5 2.5 5.3 5.7.7-4.2 4 1.1 5.7L12 16.4l-5.1 2.8L8 13.5l-4.2-4 5.7-.7Z"/></symbol>
<symbol id="i-raio" viewBox="0 0 24 24"><path d="M13.5 3 6 13.5h5.5L10 21l8-11h-5.5Z"/></symbol>
<symbol id="i-ig" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
<symbol id="i-share" viewBox="0 0 24 24"><path d="M12 15V4M8 8l4-4 4 4M5 13v6h14v-6"/></symbol>
<symbol id="i-copiar" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/></symbol>
<symbol id="i-vela" viewBox="0 0 24 24"><path d="M9 21V11h6v10M12 11V8.5M12 8.5c-1.6-1.3-1.6-3 0-5 1.6 2 1.6 3.7 0 5Z"/></symbol>
</defs></svg>`;

const brasao = (cls = '') => `<span class="brasao ${cls}" aria-hidden="true"></span>`;

function cabecalho(atual) {
  const lk = ([t, h]) => `<a href="${h}"${atual === h ? ' aria-current="page"' : ''}>${t}</a>`;
  return `<header class="nav" id="nav">
  <div class="nav__esq">
    <span class="nav__nome"><b>Xangô <i>&amp;</i> Iemanjá</b><small>Méier · RJ</small></span>
    <nav class="nav__links" aria-label="Principal, primeira parte">${nav.slice(0, 3).map(lk).join('')}</nav>
  </div>
  <a class="nav__selo" href="/" aria-label="${site.nome}, página inicial"><img src="/assets/img/marca/brasao-192.webp" width="96" height="96" alt=""></a>
  <div class="nav__dir">
    <nav class="nav__links" aria-label="Principal, segunda parte">${nav.slice(3).map(lk).join('')}</nav>
    <div class="nav__acoes">
      <a class="ico" href="${site.instagram}" target="_blank" rel="noopener" aria-label="Instagram da casa">${icone('ig')}</a>
      <button class="nav__menu" id="menuBtn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu"><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="menu" id="menu" aria-hidden="true">
  <div class="menu__in">
    <ol class="menu__lista">${nav.map(([t, h], i) => `<li><a href="${h}"${atual === h ? ' aria-current="page"' : ''}><em>0${i + 1}</em><span>${t}</span></a></li>`).join('')}</ol>
    <aside class="menu__lado">${brasao('menu__brasao')}
      <p><b>Onde</b>${site.bairro}</p>
      <p><b>Fale com a casa</b><a href="${site.instagram}" target="_blank" rel="noopener">${site.arroba}</a></p>
      <p class="menu__lema">${site.lema}.<br>${site.saudacao}.</p>
    </aside>
  </div>
</div>`;
}

// barra inferior do celular + gaveta arrastável (no lugar do menu de tela cheia)
function barraMobile(atual) {
  const item = ([t, h, ic]) => `<a href="${h}" class="tab${atual === h ? ' is-on' : ''}"${atual === h ? ' aria-current="page"' : ''}>${icone(ic)}<span>${t}</span></a>`;
  const [ini, , , refl, acv, vis] = nav;
  return `<nav class="tabbar" id="tabbar" aria-label="Navegação rápida">
  <span class="tabbar__pill" aria-hidden="true"></span>
  ${item(ini)}${item(refl)}
  <button class="tab tab--centro" id="sheetBtn" aria-controls="sheet" aria-expanded="false" aria-label="Todas as páginas"><span class="tab__brasao"><img src="/assets/img/marca/brasao-192.webp" width="96" height="96" alt=""></span></button>
  ${item(acv)}${item(vis)}
</nav>
<div class="sheet" id="sheet" aria-hidden="true" role="dialog" aria-label="Páginas do site">
  <div class="sheet__fundo" data-fecha></div>
  <div class="sheet__painel">
    <span class="sheet__alca" aria-hidden="true"></span>
    <p class="kicker">Explore a casa</p>
    <ul class="sheet__lista">${nav.map(([t, h, ic], i) => `<li><a href="${h}"${atual === h ? ' aria-current="page"' : ''}>${icone(ic)}<span>${t}</span><em>0${i + 1}</em></a></li>`).join('')}</ul>
    <a class="btn btn--vinho btn--bloco" href="${site.instagram}" target="_blank" rel="noopener">${icone('ig')}<span>Falar com a casa</span></a>
    <p class="sheet__lema">${site.lema}</p>
  </div>
</div>`;
}

function rodape() {
  return `<footer class="foot">
  <div class="foot__topo">
    <div class="foot__marca">${brasao('foot__brasao')}<p>${site.lema}.<br><em>${site.saudacao}.</em></p></div>
    <nav aria-label="Rodapé"><p class="kicker">Páginas</p>${nav.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</nav>
    <div><p class="kicker">Contato</p><p>${site.bairro}</p><a href="${site.instagram}" target="_blank" rel="noopener">${icone('ig')} ${site.arroba}</a><p class="foot__nota">O endereço e a agenda são informados pela casa, por mensagem.</p></div>
  </div>
  <p class="foot__palavra" aria-hidden="true">CUXI</p>
  <div class="foot__base"><span>© ${new Date().getFullYear()} ${site.nome}</span><a href="#topo" class="foot__topo-link">Voltar ao topo ${icone('seta-v', 'gira')}</a></div>
</footer>`;
}

export function pagina({ caminho, titulo, descricao, corpo, schema = [], tipo = 'website', imagem = '/assets/img/og.jpg', classe = '', lateral = true }) {
  const url = site.url + caminho;
  const ld = schema.length ? `<script type="application/ld+json">${JSON.stringify(schema.length === 1 ? schema[0] : { '@context': 'https://schema.org', '@graph': schema }).replace(/</g, '\\u003c')}</script>` : '';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#4C1A19">
<meta property="og:type" content="${tipo}"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="${site.nome}">
<meta property="og:title" content="${esc(titulo)}"><meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${site.url}${imagem}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon-32.png" sizes="32x32"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap"></noscript>
<link rel="stylesheet" href="/assets/css/site.css">
<script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.CUXI)document.documentElement.classList.remove('js')},4000)</script>
${ld}
</head>
<body class="${classe}" id="topo">
${sprite}
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="cortina" id="cortina" aria-hidden="true">
  <svg class="cortina__anel" viewBox="0 0 200 200"><circle cx="100" cy="100" r="96"/><circle cx="100" cy="100" r="88"/></svg>
  ${brasao('cortina__brasao')}
  <p class="cortina__lema">${[...'PEDRA E MAR · LEI E AMOR'].map(c => `<span>${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</p>
</div>
${cabecalho(caminho)}
<main id="conteudo">
${corpo}
</main>
${rodape()}

${barraMobile(caminho)}
<script src="/assets/js/vendor/gsap.min.js" defer></script>
<script src="/assets/js/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/vendor/lenis.min.js" defer></script>
<script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}

// trilha de navegação (visual + dados estruturados)
export function trilha(itens) {
  const html = `<nav class="trilha" aria-label="Você está em"><a href="/">Início</a>${itens.map(([t, h]) => `<span>/</span>${h ? `<a href="${h}">${t}</a>` : `<span aria-current="page">${t}</span>`}`).join('')}</nav>`;
  const ld = { '@type': 'BreadcrumbList', itemListElement: [['Início', '/'], ...itens].map(([t, h], i) => ({ '@type': 'ListItem', position: i + 1, name: t, ...(h ? { item: site.url + h } : {}) })) };
  return { html, ld };
}

export { brasao };
