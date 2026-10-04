// Uma função por página. Cada <section data-sec="..."> vira uma parada das setas laterais.
import { site, post, acervo, publicacoes, eixos, marcos, declaracoes, perguntas } from './conteudo.mjs';
import { pagina, esc, icone, img, foto, linhas, dataBR, trilha, brasao } from './modelo.mjs';

const href = slug => `/publicacoes/${slug}/`;
const porData = [...publicacoes].sort((a, b) => b.data.localeCompare(a.data));
const pub = slug => publicacoes.find(p => p.slug === slug);

// medalhão oval: janela da foto + anéis em SVG (desenhados na entrada) + conta dourada orbitando
const aneis = `<svg class="arco__aneis" viewBox="-10 -13 120 156" aria-hidden="true">
  <ellipse class="anel anel--1" cx="50" cy="65" rx="55" ry="71" pathLength="1"/>
  <ellipse class="anel anel--2" cx="50" cy="65" rx="59.5" ry="76.5" pathLength="1"/>
  <path id="orbita" class="anel--rota" d="M50,-6 a55,71 0 1,1 -0.01,0"/>
  <circle class="conta" r="1.6"><animateMotion dur="18s" repeatCount="indefinite"><mpath href="#orbita"/></animateMotion></circle>
</svg>`;
const medalhao = conteudo => `<span class="arco__janela">${conteudo}</span>${aneis}`;
const kicker = (t, cls = '') => `<p class="kicker ${cls}">${t}</p>`;
const btn = (t, h, cls = 'btn--ouro', ext = false) =>
  `<a class="btn ${cls}" href="${h}"${ext ? ' target="_blank" rel="noopener"' : ''}><span>${t}</span><b class="btn__seta">${icone(ext ? 'ig' : 'seta')}</b></a>`;
const linkSeta = (t, h, ext = false) => `<a class="link-seta" href="${h}"${ext ? ' target="_blank" rel="noopener"' : ''}>${t} ${icone('seta')}</a>`;
const fonte = id => `<a class="fonte" href="${post(id)}" target="_blank" rel="noopener">${icone('ig')} Publicação original · ${dataBR(acervo.find(a => a.id === id).data)}</a>`;

const marquee = (itens, cls = '') => `<div class="marquee ${cls}" aria-hidden="true"><div class="marquee__trilho">${
  [0, 1].map(() => itens.map(t => `<span>${t}</span><i>◇</i>`).join('')).join('')}</div></div>`;

const cardPub = (p, cls = 'card') => `<a class="${cls}" href="${href(p.slug)}">
  <span class="card__img">${img(p.image, `Arte da casa: ${p.title}`, { w: 480, sizes: '(max-width: 760px) 70vw, 22vw' })}</span>
  <span class="card__meta">${p.category} · ${dataBR(p.data)}</span>
  <span class="card__titulo">${esc(p.title)}</span>
  <span class="card__seta">${icone('seta')}</span></a>`;

const ctaVisita = (titulo = 'Toda caminhada começa|com um encontro.') => `<section class="cta" data-sec="Visite">
  <div class="cta__in">${brasao('cta__brasao')}
    ${kicker('Chegue mais perto', 'kicker--claro')}
    ${linhas(titulo, 'h2', 'h2 h2--claro')}
    <p>Para conhecer a casa, comece por uma mensagem. É por lá que a casa passa o endereço, a agenda e as orientações da primeira visita.</p>
    <div class="cta__botoes">${btn('Falar pelo Instagram', site.instagram, 'btn--ouro', true)}${btn('Como visitar', '/visite/', 'btn--linha')}</div>
  </div></section>`;

const phero = ({ trilhaHtml, kick, titulo, lede, arte }) => `<section class="phero" data-sec="Topo">
  <span class="phero__marca" aria-hidden="true"></span>
  <div class="phero__in">
    ${trilhaHtml}
    ${kicker(kick, 'kicker--claro')}
    ${linhas(titulo, 'h1', 'phero__titulo')}
    <p class="phero__lede">${lede}</p>
  </div>
  ${arte ? `<figure class="phero__arte arco">${medalhao(foto(arte[0], arte[1]))}</figure>` : ''}
  <a class="rolar" href="#s2" aria-label="Role para o conteúdo"><span>Role</span>${icone('seta-v')}</a>
</section>`;

const org = {
  '@type': ['Organization', 'PlaceOfWorship'], '@id': site.url + '/#casa', name: site.nome, alternateName: site.sigla,
  slogan: site.lema, url: site.url + '/', logo: site.url + '/assets/img/marca/icon-512.png', image: site.url + '/assets/img/og.jpg',
  description: 'Terreiro de Umbanda no Méier, Rio de Janeiro. Fé vivida com simplicidade, disciplina amorosa e acolhimento.',
  address: { '@type': 'PostalAddress', addressLocality: 'Rio de Janeiro', addressRegion: 'RJ', addressCountry: 'BR' },
  containedInPlace: { '@type': 'Place', name: 'Méier, Rio de Janeiro' }, sameAs: [site.instagram],
};

/* ---------------------------------------------------------------- INÍCIO */
export function inicio() {
  const destaques = ['xango-justica-equilibrio-e-fundamento', 'medium-entidade-e-responsabilidade', 'iemanja-acolhimento-e-amor', 'encanto-e-aprendizado-no-terreiro', 'pretos-velhos-sabedoria-e-caridade', 'acolhimento-diversidade-e-orgulho', 'oxossi-florestas-e-caminhos', 'desenvolvimento-mediunico-e-autoconhecimento'].map(pub);
  const explorar = [
    ['A casa', 'Nossa história, os marcos e quem conduz a caminhada.', '/a-casa/', 'altar-verde-registro'],
    ['Fundamentos', 'Pedra e Mar: Xangô, Iemanjá e as forças saudadas pela casa.', '/fundamentos/', 'xango'],
    ['Reflexões', 'Textos sobre mediunidade, acolhimento e vida no terreiro.', '/publicacoes/', 'medium-entidade'],
    ['Acervo', 'As 30 artes do nosso Instagram, em ordem de publicação.', '/acervo/', 'nana'],
    ['Visite', 'Como chegar à casa pela primeira vez, com tranquilidade.', '/visite/', 'vela-registro'],
  ];
  const corpo = `
<section class="hero" data-sec="Início">
  <span class="hero__padrao" aria-hidden="true"></span>
  <h1 class="sr-only">${site.nome}, terreiro de Umbanda no Méier, Rio de Janeiro</h1>
  <p class="hero__topo" aria-hidden="true">${[...'CASA DE UMBANDA'].map(c => `<span>${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</p>
  <div class="hero__meio">
    <div class="hero__texto">
      <p class="hero__kicker">Pedra e Mar,<br>Lei e Amor.</p>
      <span class="losango" aria-hidden="true"></span>
      <p class="hero__lede">Um terreiro no Méier, Rio de Janeiro, que vive a fé com simplicidade, disciplina amorosa e os pés no chão.</p>
      <div class="hero__botoes">${btn('Conheça a casa', '/a-casa/', 'btn--creme')}${linkSeta('Como visitar', '/visite/')}</div>
    </div>
    <figure class="hero__foto arco">
      ${medalhao(foto('pai-renato-plano-aberto', 'Pai Renato diante do altar da Casa de Umbanda de Xangô e Iemanjá'))}
      <span class="selo" aria-hidden="true">
        <svg viewBox="0 0 200 200"><defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs>
        <text><textPath href="#circ">AXÉ · CARIDADE · LUZ · MÉIER · RIO DE JANEIRO ·</textPath></text></svg>
        ${brasao('selo__brasao')}
      </span>
    </figure>
  </div>
  <p class="hero__nome" aria-hidden="true"><span class="mask"><span class="up">Xangô <i>&amp;</i> Iemanjá</span></span></p>
  <a class="rolar" href="#s2" aria-label="Role para o conteúdo"><span>Role</span>${icone('seta-v')}</a>
</section>
${marquee(['Pedra e Mar', 'Lei e Amor', 'Axé, caridade e luz', 'Méier · Rio de Janeiro'])}

<section class="sec intro" id="s2" data-sec="A casa">
  <div class="intro__cabeca">${kicker('01 · A casa')}${linhas('Fé de portas|abertas.')}<span class="seta-lateral">${icone('seta-v')}</span></div>
  <div class="intro__corpo">
    <p class="lead" data-words>A Casa de Umbanda de Xangô e Iemanjá nasceu de um chamado: viver a fé com simplicidade, carinho e disciplina amorosa. Um chão de acolhimento, aprendizado e responsabilidade, onde cada pessoa é recebida pelo nome e pela história que traz.</p>
    ${linkSeta('Conheça nossa história', '/a-casa/')}
  </div>
  <ul class="eixos">${eixos.map(([ic, t, d], i) => `<li class="eixo"><span class="eixo__ic">${icone(ic)}</span><em>0${i + 1}</em><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
</section>

<section class="sec explorar" data-sec="Explore">
  <div class="sec__cabeca">${kicker('02 · Explore')}${linhas('Explore a <em>casa</em>')}</div>
  <div class="explorar__trilho" data-snap>${explorar.map(([t, d, h, a], i) => `<a class="explorar__card" href="${h}">
    ${img(a, '', { w: 480, sizes: '(max-width: 760px) 74vw, 20vw' })}
    <span class="explorar__num">0${i + 1}</span>
    <span class="explorar__txt"><b>${t}</b><small>${d}</small></span>
    <span class="explorar__seta">${icone('seta')}</span></a>`).join('')}</div>
  <div class="pontos" aria-hidden="true">${explorar.map(() => '<i></i>').join('')}</div>
</section>

<section class="duo" data-sec="Pedra e Mar">
  <div class="duo__cabeca">${kicker('03 · Pedra e Mar', 'kicker--claro')}${linhas('Duas forças.|Uma caminhada.', 'h2', 'h2 h2--claro')}<p class="duo__dica">${icone('seta')} Arraste para trocar</p></div>
  <div class="duo__deck" data-deck>
    <article class="duo__p duo__p--xango">
      <span class="duo__ic">${icone('oxe')}</span>${kicker('Saravá, Xangô', 'kicker--claro')}
      <h3>A firmeza<br>que sustenta.</h3>
      <p>Fundamento, justiça, equilíbrio e força de decisão. Na nossa casa, Xangô lembra que toda construção pede base firme.</p>
      ${linkSeta('Leia sobre Xangô', href('xango-justica-equilibrio-e-fundamento'))}
      <figure>${img('xango', 'Arte da casa em reverência a Xangô: justiça, força, proteção', { w: 480, sizes: '(max-width: 760px) 60vw, 22vw' })}</figure>
    </article>
    <article class="duo__p duo__p--iemanja">
      <span class="duo__ic">${icone('ondas')}</span>${kicker('Odoyá, mãe Iemanjá', 'kicker--claro')}
      <h3>O acolhimento<br>que envolve.</h3>
      <p>Iemanjá rege nossa casa. Sua presença se expressa no acolhimento, no amor que fortalece e na energia que nos une.</p>
      ${linkSeta('Leia sobre Iemanjá', href('iemanja-acolhimento-e-amor'))}
      <figure>${img('iemanja', 'Arte da casa: Nas águas de Iemanjá, entrego minhas dores e renovo minha fé', { w: 480, sizes: '(max-width: 760px) 60vw, 22vw' })}</figure>
    </article>
  </div>
</section>



<section class="citacao" data-sec="Palavra">
  ${kicker('Nossa forma de caminhar', 'kicker--claro')}
  <blockquote><p data-words>“A espiritualidade não deve ser um lugar de medo ou exclusão, mas um espaço onde cada um possa desenvolver sua fé, sua mediunidade e sua essência com respeito, responsabilidade e amor.”</p></blockquote>
  ${fonte('DaJTSbcibPQ')}
</section>
<section class="sec reflexoes" data-sec="Reflexões">
  <div class="sec__cabeca sec__cabeca--linha">${kicker('04 · Voz da casa')}${linhas('Leituras|para a caminhada.')}${linkSeta('Todas as reflexões', '/publicacoes/')}</div>
  ${marquee(['Mediunidade', 'Acolhimento', 'Ancestralidade', 'Orixás', 'Vida no terreiro'], 'marquee--fino')}
  <div class="trilho-moldura">
  <button class="trilho__seta trilho__seta--ant" data-rail-dir="-1" aria-label="Reflexões anteriores">${icone('seta', 'vira')}</button>
  <div class="trilho" data-rail><div class="trilho__faixa">${destaques.map(p => cardPub(p)).join('')}</div></div>
  <button class="trilho__seta trilho__seta--prox" data-rail-dir="1" aria-label="Próximas reflexões">${icone('seta')}</button>
  </div>
</section>
${ctaVisita()}`;
  return pagina({
    caminho: '/', titulo: 'Casa de Umbanda de Xangô e Iemanjá | Terreiro no Méier, RJ',
    descricao: 'Terreiro de Umbanda no Méier, Rio de Janeiro. Pedra e Mar, Lei e Amor: conheça a história, os fundamentos e como visitar a Casa de Umbanda de Xangô e Iemanjá.',
    corpo, classe: 'p-inicio',
    schema: [{ '@type': 'WebSite', '@id': site.url + '/#site', url: site.url + '/', name: site.nome, inLanguage: 'pt-BR', publisher: { '@id': site.url + '/#casa' } }, org],
  });
}

/* ---------------------------------------------------------------- A CASA */
export function aCasa() {
  const t = trilha([['A casa']]);
  const corpo = `${phero({ trilhaHtml: t.html, kick: 'Nossa história', titulo: 'Uma casa|que nasce|do chamado.', lede: 'Do primeiro anúncio à primeira gira aberta: a caminhada da Casa de Umbanda de Xangô e Iemanjá, contada pelo que a própria casa publicou.', arte: ['altar-registro', 'Altar da casa no Méier, registrado na organização do espaço'] })}

<section class="sec origem" id="s2" data-sec="Origem">
  <div class="origem__grade">
    <div>${kicker('01 · Como começou')}${linhas('Simplicidade,|carinho e|pé no chão.')}</div>
    <div class="origem__texto">
      <p class="lead" data-words>Em novembro de 2025, a casa se apresentou ao mundo com uma frase simples: “Tá nascendo a Casa de Umbanda de Xangô e Iemanjá”.</p>
      <p>A apresentação, assinada por Renato, falava de um espaço de cuidado, responsabilidade e afeto. Uma Umbanda vivida com disciplina amorosa, sem perder a ternura, e com os pés firmados no chão.</p>
      <p>Xangô firma a verdade e o senso de justiça. Iemanjá inspira o acolhimento. Oxalá guia a luz do caminho. Esses sentidos acompanham a casa desde a primeira palavra.</p>
      ${fonte('DQ0UG2pDHra')}
    </div>
  </div>
</section>

<section class="sec linha" data-sec="Marcos">
  <div class="sec__cabeca">${kicker('02 · Linha do tempo')}${linhas('Cada passo,|uma semente.')}</div>
  <ol class="marcos">${marcos.map(([d, tt, tx, id, a], i) => `<li class="marco">
    <span class="marco__ponto" aria-hidden="true"></span>
    <figure class="marco__img">${img(a, `Arte da casa: ${tt}`, { w: 480, sizes: '(max-width: 760px) 40vw, 18vw' })}</figure>
    <div><time datetime="${acervo.find(x => x.id === id).data}">${d}</time><h3>${tt}</h3><p>${tx}</p>${linkSeta('Ver publicação', post(id), true)}</div>
  </li>`).join('')}</ol>
</section>

<section class="sec lideranca" data-sec="Pai Renato">
  <figure class="lideranca__foto arco">${medalhao(img('pai-renato-homenagem', 'Arte de homenagem da comunidade ao babalorixá pai Renato', { sizes: '(max-width: 760px) 86vw, 36vw' }))}</figure>
  <div class="lideranca__texto">
    ${kicker('03 · Quem conduz')}${linhas('Pai Renato.|Escuta e|fundamento.')}
    <p>Nas homenagens dos filhos da casa, pai Renato aparece como o babalorixá da escuta atenta, do estudo e da dedicação ao bem-estar da corrente.</p>
    <p>Ensina o fundamento com amor e firmeza, sem transformá-lo em fardo, e respeita o tempo de cada pessoa para aprender e amadurecer.</p>
    ${linkSeta('Leia a homenagem do Dia dos Pais', href('pai-renato-babalorixa-e-cuidado'))}
  </div>
</section>

<section class="sec declara" data-sec="Na voz da casa">
  <div class="sec__cabeca">${kicker('04 · Na voz da casa')}${linhas('O que a casa|diz de si.')}</div>
  <ul class="declara__lista">${declaracoes.map(([tt, tx, id]) => `<li><h3>${tt}</h3><p>${tx}</p>${fonte(id)}</li>`).join('')}</ul>
</section>

<section class="sec valores" data-sec="Valores">
  <div class="sec__cabeca">${kicker('05 · Valores')}${linhas('Firmeza para caminhar.|Acolhimento para pertencer.')}</div>
  <ul class="eixos">${eixos.map(([ic, tt, d], i) => `<li class="eixo"><span class="eixo__ic">${icone(ic)}</span><em>0${i + 1}</em><h3>${tt}</h3><p>${d}</p></li>`).join('')}</ul>
</section>
${ctaVisita()}`;
  return pagina({
    caminho: '/a-casa/', titulo: 'Nossa história | Casa de Umbanda de Xangô e Iemanjá, Méier',
    descricao: 'Como nasceu a Casa de Umbanda de Xangô e Iemanjá, no Méier: a apresentação, a coroa de pai Renato, a organização do espaço e a primeira gira aberta.',
    corpo, schema: [t.ld, { '@type': 'AboutPage', name: 'Nossa história', url: site.url + '/a-casa/', about: { '@id': site.url + '/#casa' } }, org],
  });
}

/* ---------------------------------------------------------------- FUNDAMENTOS */
export function fundamentos() {
  const t = trilha([['Fundamentos']]);
  const orixas = ['oxossi-florestas-e-caminhos', 'ogum-forca-e-protecao', 'oxum-forca-e-ternura', 'iansa-coragem-e-transformacao', 'nana-tempo-e-ancestralidade', 'omulu-ciclos-e-transformacao'].map(pub);
  const linhasCasa = ['povos-originarios-e-caboclos', 'pretos-velhos-sabedoria-e-caridade', 'boiadeiros-firmeza-e-coragem', 'malandragem-etica-e-sabedoria', 'ibeji-criancas-e-renovacao', 'santo-antonio-fe-e-caridade', 'oga-atabaque-e-pontos-cantados'].map(pub);
  const grade = lista => `<div class="mosaico${lista.length % 3 === 0 ? ' mosaico--3' : ''}">${lista.map((p, i) => `<a class="mosaico__item" href="${href(p.slug)}" style="--i:${i}">
    ${img(p.image, `Arte da casa: ${p.title}`, { w: 480, sizes: '(max-width: 760px) 46vw, 22vw' })}
    <span class="mosaico__txt"><small>${dataBR(p.data)}</small><b>${esc(p.title.split(':')[0])}</b></span><span class="mosaico__seta">${icone('seta')}</span></a>`).join('')}</div>`;
  const corpo = `${phero({ trilhaHtml: t.html, kick: 'Fundamentos', titulo: 'Pedra e Mar,|Lei e Amor.', lede: 'As forças que dão nome à casa e as homenagens que ela publica ao longo do ano. Os fundamentos de cada gira são ensinados dentro do terreiro, por quem conduz a casa.' })}

<section class="duo duo--pagina" id="s2" data-sec="Xangô e Iemanjá">
  <div class="duo__cabeca">${kicker('01 · O nome da casa', 'kicker--claro')}${linhas('Xangô firma.|Iemanjá acolhe.', 'h2', 'h2 h2--claro')}<p class="duo__dica">${icone('seta')} Arraste para trocar</p></div>
  <div class="duo__deck" data-deck>
    <article class="duo__p duo__p--xango"><span class="duo__ic">${icone('oxe')}</span>${kicker('Pedra e lei', 'kicker--claro')}<h3>Xangô</h3>
      <p>Fundamento, justiça, equilíbrio e força de decisão. A casa recorda também seu sincretismo com São João Batista, memória de resistência das tradições africanas no Brasil.</p>
      ${linkSeta('Ler a reflexão', href('xango-justica-equilibrio-e-fundamento'))}<figure>${img('xango', 'Arte da casa: Xangô', { w: 480 })}</figure></article>
    <article class="duo__p duo__p--iemanja"><span class="duo__ic">${icone('ondas')}</span>${kicker('Mar e amor', 'kicker--claro')}<h3>Iemanjá</h3>
      <p>A casa se declara regida por Iemanjá. Reverenciá-la é cultivar uma fé capaz de escutar, amparar e respeitar a história de quem chega.</p>
      ${linkSeta('Ler a reflexão', href('iemanja-acolhimento-e-amor'))}<figure>${img('iemanja', 'Arte da casa: Iemanjá', { w: 480 })}</figure></article>
  </div>
</section>

<section class="sec" data-sec="Orixás">
  <div class="sec__cabeca sec__cabeca--linha">${kicker('02 · Orixás')}${linhas('Os orixás|saudados pela casa.')}<p class="sec__nota">Homenagens publicadas no calendário da casa.</p></div>
  ${grade(orixas)}
</section>

<section class="sec sec--papel" data-sec="Linhas">
  <div class="sec__cabeca sec__cabeca--linha">${kicker('03 · Linhas e devoções')}${linhas('Caboclos, pretos-velhos|e quem mais chega.')}<p class="sec__nota">Saudações públicas da casa. Não são uma lista das linhas de trabalho.</p></div>
  ${grade(linhasCasa)}
</section>

<section class="sec fundo-nota" data-sec="Aprender">
  <div class="fundo-nota__in">${icone('vela', 'fundo-nota__ic')}
    ${linhas('O fundamento se|aprende no chão.')}
    <p>Estes textos apresentam o que a casa compartilha publicamente. Para aprofundar, o caminho é a convivência no terreiro, com a orientação de pai Renato e da corrente.</p>
    ${btn('Como visitar', '/visite/', 'btn--vinho')}
  </div>
</section>`;
  return pagina({
    caminho: '/fundamentos/', titulo: 'Fundamentos: Xangô, Iemanjá e as homenagens da casa | CUXI',
    descricao: 'Pedra e Mar, Lei e Amor: Xangô, Iemanjá, orixás, caboclos, pretos-velhos e as devoções saudadas pela Casa de Umbanda de Xangô e Iemanjá, no Méier.',
    corpo, schema: [t.ld, { '@type': 'CollectionPage', name: 'Fundamentos', url: site.url + '/fundamentos/' }],
  });
}

/* ---------------------------------------------------------------- REFLEXÕES */
export function reflexoes() {
  const t = trilha([['Reflexões']]);
  const cats = [...new Set(publicacoes.map(p => p.category))];
  const corpo = `${phero({ trilhaHtml: t.html, kick: 'Voz da casa', titulo: 'Palavras que|fazem caminho.', lede: 'Reflexões, homenagens e posicionamentos da casa, reescritos a partir das publicações do Instagram para ler com calma.' })}
<section class="sec" id="s2" data-sec="Reflexões">
  <div class="filtros" role="group" aria-label="Filtrar por tema"><button class="is-on" data-f="todos">Todos <em>${publicacoes.length}</em></button>${cats.map(c => `<button data-f="${c}">${c} <em>${publicacoes.filter(p => p.category === c).length}</em></button>`).join('')}</div>
  <div class="lista" id="lista">${porData.map(p => `<a class="lista__item" data-c="${p.category}" href="${href(p.slug)}">
    <span class="lista__img">${img(p.image, `Arte da casa: ${p.title}`, { w: 480, sizes: '(max-width: 760px) 28vw, 12vw' })}</span>
    <span class="lista__meta">${p.category}<br><time datetime="${p.data}">${dataBR(p.data)}</time></span>
    <span class="lista__titulo">${esc(p.title)}</span>
    <span class="lista__resumo">${esc(p.excerpt)}</span>
    <span class="lista__seta">${icone('seta')}</span></a>`).join('')}</div>
</section>`;
  return pagina({
    caminho: '/publicacoes/', titulo: 'Reflexões da casa: mediunidade, acolhimento e Umbanda | CUXI',
    descricao: 'Textos da Casa de Umbanda de Xangô e Iemanjá sobre desenvolvimento mediúnico, acolhimento, ancestralidade, orixás e vida no terreiro.',
    corpo, schema: [t.ld, { '@type': 'CollectionPage', name: 'Reflexões da casa', url: site.url + '/publicacoes/', hasPart: porData.map(p => ({ '@type': 'Article', headline: p.title, url: site.url + href(p.slug) })) }],
  });
}

export function artigo(p) {
  const i = porData.indexOf(p), ant = porData[i + 1] || porData[0], prox = porData[i - 1] || porData.at(-1);
  const rel = publicacoes.filter(x => x.category === p.category && x !== p).slice(0, 3);
  const t = trilha([['Reflexões', '/publicacoes/'], [p.title]]);
  const corpo = `<div class="progresso" aria-hidden="true"></div>
<article class="artigo">
  <header class="artigo__topo" data-sec="${esc(p.category)}">
    ${t.html}${kicker(`${p.category} · <time datetime="${p.data}">${dataBR(p.data)}</time>`)}
    <h1 class="artigo__titulo">${esc(p.title)}</h1>
    <p class="artigo__olho">${esc(p.excerpt)}</p>
    <div class="artigo__acoes"><button class="chip" data-share>${icone('share')} Compartilhar</button>${fonte(p.id)}</div>
  </header>
  <div class="artigo__grade" id="s2" data-sec="Leitura">
    <figure class="artigo__arte">${img(p.image, `Arte da Casa de Umbanda de Xangô e Iemanjá: ${p.title}`, { lazy: false, sizes: '(max-width: 760px) 92vw, 34vw' })}</figure>
    <div class="artigo__texto">${p.paragraphs.map((x, k) => `<p${k === 0 ? ' class="capitular"' : ''}>${esc(x)}</p>`).join('')}
      <p class="artigo__assina">${site.saudacao}.<br><span>${site.nome}</span></p></div>
  </div>
</article>
${rel.length ? `<section class="sec sec--papel" data-sec="Leia também"><div class="sec__cabeca">${kicker('Leia também')}${linhas(`Mais sobre|${p.category.toLowerCase()}.`)}</div><div class="cards3">${rel.map(x => cardPub(x)).join('')}</div></section>` : ''}
<nav class="vizinhos" aria-label="Outras reflexões">
  <a class="vizinho vizinho--ant" href="${href(ant.slug)}" rel="prev"><span class="vizinho__seta">${icone('seta', 'vira')}</span><span class="vizinho__txt"><small>Anterior</small>${esc(ant.title)}</span></a>
  <a class="vizinho vizinho--prox" href="${href(prox.slug)}" rel="next"><span class="vizinho__seta">${icone('seta')}</span><span class="vizinho__txt"><small>Próxima</small>${esc(prox.title)}</span></a>
</nav>
<p class="swipe-dica" aria-hidden="true">${icone('seta', 'vira')} deslize para trocar de reflexão ${icone('seta')}</p>`;
  return pagina({
    caminho: href(p.slug), titulo: `${p.title} | CUXI, Méier`, descricao: p.excerpt, tipo: 'article', classe: 'p-artigo',
    imagem: `/assets/img/artes/${p.image}-960.webp`, corpo,
    schema: [t.ld, { '@type': 'Article', headline: p.title, description: p.excerpt, inLanguage: 'pt-BR', datePublished: p.data, image: site.url + `/assets/img/artes/${p.image}-960.webp`, mainEntityOfPage: site.url + href(p.slug), author: { '@id': site.url + '/#casa', '@type': 'Organization', name: site.nome }, publisher: { '@type': 'Organization', name: site.nome, logo: { '@type': 'ImageObject', url: site.url + '/assets/img/marca/icon-512.png' } }, isBasedOn: post(p.id) }],
  });
}

/* ---------------------------------------------------------------- ACERVO */
export function acervoPag() {
  const t = trilha([['Acervo']]);
  const temas = [...new Set(acervo.map(a => a.tema))];
  const corpo = `${phero({ trilhaHtml: t.html, kick: 'Acervo do Instagram', titulo: 'Trinta artes,|uma caminhada.', lede: `Todo o feed de ${site.arroba}, repaginado em vinho e creme. Toque em uma arte para ver em tela cheia.` })}
<section class="sec acervo" id="s2" data-sec="Feed">
  <div class="perfil">
    <span class="avatar avatar--g"><img src="/assets/img/marca/brasao-192.webp" width="96" height="96" alt="Brasão CUXI, foto do perfil da casa no Instagram"></span>
    <div><b>${site.arroba.slice(1)}</b><p>${site.nome}<br>${site.lema} · ${site.saudacao} · Méier, RJ</p></div>
    ${btn('Seguir', site.instagram, 'btn--vinho', true)}
  </div>
  <div class="filtros" role="group" aria-label="Filtrar por tema"><button class="is-on" data-f="todos">Todas <em>${acervo.length}</em></button>${temas.map(c => `<button data-f="${c}">${c} <em>${acervo.filter(a => a.tema === c).length}</em></button>`).join('')}</div>
  <ul class="feed" id="feed">${acervo.map((a, i) => `<li class="feed__item" data-c="${a.tema}"><button data-story="${i}" aria-label="Abrir arte: ${esc(a.titulo)}">
    ${img(a.img, `Arte da casa: ${a.titulo}`, { w: 480, sizes: '(max-width: 760px) 33vw, 20vw' })}
    <span class="feed__info"><b>${esc(a.titulo)}</b><small>${dataBR(a.data)}</small></span></button></li>`).join('')}</ul>
</section>
<div class="story" id="story" aria-hidden="true" role="dialog" aria-label="Arte em tela cheia">
  <div class="story__barras"></div>
  <div class="story__topo"><span class="avatar"><img src="/assets/img/marca/brasao-192.webp" width="96" height="96" alt=""></span><b>${site.arroba.slice(1)}</b><small id="stData"></small><button class="ico" data-fecha aria-label="Fechar">${icone('x')}</button></div>
  <figure class="story__arte"><img id="stImg" alt=""></figure>
  <button class="story__lado story__lado--ant" data-dir="-1" aria-label="Arte anterior">${icone('seta', 'vira')}</button>
  <button class="story__lado story__lado--prox" data-dir="1" aria-label="Próxima arte">${icone('seta')}</button>
  <div class="story__base"><p id="stTitulo"></p><a class="btn btn--creme" id="stLink" target="_blank" rel="noopener"><span>Ver no Instagram</span><b class="btn__seta">${icone('ig')}</b></a></div>
</div>
<script type="application/json" id="acervoDados">${JSON.stringify(acervo.map(a => ({ s: `/assets/img/artes/${a.img}-960.webp`, t: a.titulo, d: dataBR(a.data), u: post(a.id) })))}</script>`;
  return pagina({
    caminho: '/acervo/', titulo: 'Acervo: as artes do Instagram da casa | Casa de Umbanda de Xangô e Iemanjá',
    descricao: 'As 30 publicações do Instagram da Casa de Umbanda de Xangô e Iemanjá, repaginadas: orixás, linhas, datas, reflexões e registros da casa no Méier.',
    corpo, schema: [t.ld, { '@type': 'ImageGallery', name: 'Acervo do Instagram', url: site.url + '/acervo/', image: acervo.map(a => ({ '@type': 'ImageObject', contentUrl: site.url + `/assets/img/artes/${a.img}-960.webp`, name: a.titulo, uploadDate: a.data })) }],
  });
}

/* ---------------------------------------------------------------- VISITE */
export function visite() {
  const t = trilha([['Visite']]);
  const passos = [
    ['ig', 'Mande uma mensagem', `Fale com a casa pelo Instagram ${site.arroba}. É o canal oficial.`],
    ['pin', 'Receba as orientações', 'A casa informa o endereço no Méier, o dia da gira e o que você precisa saber.'],
    ['vela', 'Chegue com calma', 'Chegue com antecedência, com respeito ao espaço e ao tempo da gira.'],
  ];
  const corpo = `${phero({ trilhaHtml: t.html, kick: 'Como visitar', titulo: 'Sua primeira|visita, com|tranquilidade.', lede: 'Se você nunca foi a um terreiro ou quer conhecer a nossa casa, este é o caminho.', arte: ['vela-registro', 'Vela acesa no altar da casa'] })}
<section class="sec passos" id="s2" data-sec="Passo a passo">
  <div class="sec__cabeca">${kicker('01 · Passo a passo')}${linhas('Três passos|até a gira.')}</div>
  <ol class="passos__lista">${passos.map(([ic, tt, d], i) => `<li><span class="passos__n">0${i + 1}</span><span class="passos__ic">${icone(ic)}</span><h3>${tt}</h3><p>${d}</p></li>`).join('')}</ol>
</section>

<section class="sec infos" data-sec="Informações">
  <div class="infos__grade">
    <div class="info info--escura">${icone('pin')}<h3>Onde</h3><p>${site.bairro}.<br>O endereço completo é enviado pela casa.</p></div>
    <div class="info">${icone('ig')}<h3>Contato</h3><p><a href="${site.instagram}" target="_blank" rel="noopener">${site.arroba}</a></p><button class="chip" data-copia="${site.arroba}">${icone('copiar')} Copiar @</button></div>
    <div class="info">${icone('estrela')}<h3>Agenda</h3><p>Publicada nos posts e stories do Instagram. Confirme antes de sair.</p></div>
  </div>
</section>

<section class="sec faq" data-sec="Dúvidas">
  <div class="sec__cabeca">${kicker('02 · Antes de chegar')}${linhas('Perguntas|frequentes.')}</div>
  <div class="faq__lista">${perguntas.map(([q, a]) => `<details><summary>${q}<span class="faq__mais" aria-hidden="true"></span></summary><p>${a}</p></details>`).join('')}</div>
</section>
${ctaVisita('Que essa casa seja|encontro e abraço.')}
<a class="fixo-mobile" href="${site.instagram}" target="_blank" rel="noopener">${icone('ig')} Falar com a casa</a>`;
  return pagina({
    caminho: '/visite/', titulo: 'Como visitar a Casa de Umbanda de Xangô e Iemanjá | Méier, RJ',
    descricao: 'Primeira visita a um terreiro no Méier? Veja como falar com a Casa de Umbanda de Xangô e Iemanjá, receber o endereço e conhecer a agenda das giras.',
    corpo, schema: [t.ld, { '@type': 'FAQPage', mainEntity: perguntas.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }, org],
  });
}

export function naoEncontrada() {
  const corpo = `<section class="phero phero--404" data-sec="404"><span class="phero__marca" aria-hidden="true"></span><div class="phero__in">
    ${kicker('Erro 404', 'kicker--claro')}${linhas('Esse caminho|não existe.', 'h1', 'phero__titulo')}
    <p class="phero__lede">A página pode ter mudado de lugar. Volte ao início ou escolha uma página no menu.</p>
    <div class="hero__botoes">${btn('Voltar ao início', '/', 'btn--creme')}</div></div></section>`;
  return pagina({ caminho: '/404.html', titulo: 'Página não encontrada | CUXI', descricao: 'Página não encontrada.', corpo, lateral: false });
}
