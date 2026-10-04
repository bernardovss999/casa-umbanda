/* Casa de Umbanda de Xangô e Iemanjá · movimento e interações (todas as páginas) */
(() => {
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const movel = () => matchMedia('(max-width: 860px)').matches;
  const vibra = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} };
  window.CUXI = true;

  const cortina = $('#cortina');
  const temGsap = typeof gsap !== 'undefined';
  if (!temGsap || reduce) { root.classList.remove('js'); }
  if (temGsap) gsap.registerPlugin(ScrollTrigger);

  /* ---------- rolagem suave (só desktop com mouse) ---------- */
  let lenis = null;
  if (temGsap && !reduce && fine && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: .09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const irPara = (alvo, offset = -90) => {
    if (lenis) lenis.scrollTo(alvo, { offset, duration: 1.4 });
    else { const y = (typeof alvo === 'number' ? alvo : alvo.getBoundingClientRect().top + scrollY + offset); scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }); }
  };
  const travar = on => { document.body.style.overflow = on ? 'hidden' : ''; lenis && (on ? lenis.stop() : lenis.start()); };

  /* ---------- cabeçalho, barra mobile, botão fixo ---------- */
  const nav = $('#nav'), tabbar = $('#tabbar'), fixo = $('.fixo-mobile');
  let ultimoY = 0;
  const aoRolar = y => {
    nav.classList.toggle('is-solid', y > 30);
    const desce = y > ultimoY + 4, sobe = y < ultimoY - 4;
    if (desce && y > 420) { nav.classList.add('is-hidden'); tabbar && tabbar.classList.add('is-hidden'); }
    else if (sobe) { nav.classList.remove('is-hidden'); tabbar && tabbar.classList.remove('is-hidden'); }
    fixo && fixo.classList.toggle('is-on', y > 360);
    ultimoY = y;
  };
  if (lenis) lenis.on('scroll', ({ scroll }) => aoRolar(scroll)); else addEventListener('scroll', () => aoRolar(scrollY), { passive: true });
  const cta = $('.cta');
  if (fixo && cta) new IntersectionObserver(([e]) => fixo.classList.toggle('is-off', e.isIntersecting)).observe(cta);
  aoRolar(scrollY);

  // pílula da aba ativa
  if (tabbar) {
    const abas = $$('.tab', tabbar), ativa = abas.findIndex(t => t.classList.contains('is-on'));
    const pill = $('.tabbar__pill', tabbar);
    if (ativa < 0) pill.style.opacity = 0; else tabbar.style.setProperty('--tab-i', ativa);
    abas.forEach((t, i) => t.addEventListener('pointerdown', () => { vibra(6); if (t.tagName === 'A') { pill.style.opacity = 1; tabbar.style.setProperty('--tab-i', i); } }));
  }

  /* ---------- menu de tela cheia (desktop) ---------- */
  const menu = $('#menu'), menuBtn = $('#menuBtn');
  const setMenu = abre => {
    menu.classList.toggle('is-open', abre); menu.setAttribute('aria-hidden', !abre);
    menuBtn.setAttribute('aria-expanded', abre); menuBtn.setAttribute('aria-label', abre ? 'Fechar menu' : 'Abrir menu');
    travar(abre); nav.classList.remove('is-hidden');
    if (abre && temGsap && !reduce) {
      gsap.fromTo('.menu__lista span, .menu__lista em', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: .05, ease: 'expo.out', delay: .25 });
      gsap.fromTo('.menu__lado > *', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: .08, ease: 'expo.out', delay: .45 });
      gsap.fromTo('.menu__brasao', { rotate: -40, scale: .7 }, { rotate: 0, scale: 1, duration: 1.6, ease: 'expo.out', delay: .3 });
    }
  };
  menuBtn && menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));

  /* ---------- gaveta (celular): abre pelo brasão, fecha arrastando ---------- */
  const sheet = $('#sheet'), sheetBtn = $('#sheetBtn');
  const setSheet = abre => {
    sheet.classList.toggle('is-open', abre); sheet.setAttribute('aria-hidden', !abre);
    sheetBtn.setAttribute('aria-expanded', abre); sheet.style.setProperty('--arrasto', '0px');
    document.body.style.overflow = abre ? 'hidden' : ''; vibra(abre ? 10 : 6);
  };
  if (sheet) {
    sheetBtn.addEventListener('click', () => setSheet(!sheet.classList.contains('is-open')));
    $$('[data-fecha]', sheet).forEach(b => b.addEventListener('click', () => setSheet(false)));
    const painel = $('.sheet__painel', sheet); let y0 = null, dy = 0;
    painel.addEventListener('pointerdown', e => { if (e.target.closest('a,button')) return; y0 = e.clientY; dy = 0; sheet.classList.add('is-arrastando'); painel.setPointerCapture(e.pointerId); });
    painel.addEventListener('pointermove', e => { if (y0 === null) return; dy = Math.max(0, e.clientY - y0); sheet.style.setProperty('--arrasto', dy + 'px'); });
    const solta = () => { if (y0 === null) return; y0 = null; sheet.classList.remove('is-arrastando'); dy > 110 ? setSheet(false) : sheet.style.setProperty('--arrasto', '0px'); };
    painel.addEventListener('pointerup', solta); painel.addEventListener('pointercancel', solta);
  }

  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    menu && menu.classList.contains('is-open') && setMenu(false);
    sheet && sheet.classList.contains('is-open') && setSheet(false);
    fechaStory && fechaStory();
  });

  /* ---------- transição entre páginas (cortina com o brasão) ---------- */
  let saindo = false;
  // portal: a página seguinte nasce de um círculo aberto exatamente onde a pessoa tocou
  const raio = (x, y) => Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 20;
  const sair = (url, x = innerWidth / 2, y = innerHeight / 2) => {
    if (saindo) return; saindo = true;
    menu && menu.classList.contains('is-open') && setMenu(false);
    sheet && sheet.classList.contains('is-open') && setSheet(false);
    if (!temGsap || reduce) { location.href = url; return; }
    lenis && lenis.stop();
    sessionStorage.setItem('cuxi-portal', '1');
    gsap.set('.cortina__lema span', { opacity: 0 });
    gsap.timeline({ onComplete: () => location.href = url })
      .fromTo(cortina, { clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${raio(x, y)}px at ${x}px ${y}px)`, duration: .85, ease: 'expo.inOut' })
      .fromTo('.cortina__anel', { scale: 2.4, rotate: -90, opacity: 0 }, { scale: 1, rotate: 0, opacity: .8, duration: .8, ease: 'expo.out' }, .25)
      .fromTo('.cortina__brasao', { opacity: 0, scale: .5, rotate: -90 }, { opacity: 1, scale: 1, rotate: 0, duration: .7, ease: 'expo.out' }, .3)
      .to('main, .foot', { scale: .96, filter: 'blur(4px)', duration: .85, ease: 'expo.inOut' }, 0);
  };
  $$('a[href]').forEach(a => a.addEventListener('click', e => {
    const h = a.getAttribute('href');
    if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || /^(https?:|mailto:|tel:)/.test(h)) return;
    const url = new URL(h, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) {
      if (!url.hash) { e.preventDefault(); irPara(0, 0); return; }
      const alvo = url.hash === '#topo' ? 0 : $(url.hash); if (alvo === null) return;
      e.preventDefault(); irPara(alvo); return;
    }
    e.preventDefault(); sair(url.href, e.clientX || innerWidth / 2, e.clientY || innerHeight / 2);
  }));
  // pré-carrega a página ao passar o dedo ou o mouse
  const pre = new Set();
  $$('a[href^="/"]').forEach(a => ['pointerenter', 'touchstart'].forEach(ev => a.addEventListener(ev, () => {
    const u = a.getAttribute('href').split('#')[0]; if (!u || pre.has(u) || u === location.pathname) return;
    pre.add(u); const l = document.createElement('link'); l.rel = 'prefetch'; l.href = u; document.head.appendChild(l);
  }, { passive: true, once: true })));
  addEventListener('pageshow', e => { if (e.persisted && temGsap) { saindo = false; lenis && lenis.start(); gsap.set(cortina, { clipPath: 'circle(0% at 50% 50%)' }); gsap.set('main, .foot', { clearProps: 'all' }); } });

  /* ---------- medalhão: a janela abre do centro, os anéis se desenham, a conta acende ---------- */
  function medalhaoEntra(sel) {
    const f = typeof sel === 'string' ? $(sel) : sel, tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });
    if (!f) return tl;
    const jan = $('.arco__janela', f), im = $('img', jan);
    tl.fromTo(jan, { clipPath: 'ellipse(0% 0% at 50% 50%)' }, { clipPath: 'ellipse(50% 50% at 50% 50%)', duration: 1.5, clearProps: 'clipPath' }, 0)
      .fromTo(im, { scale: 1.45, rotate: -6 }, { scale: 1, rotate: 0, duration: 2.2, ease: 'expo.out' }, 0)
      .fromTo($('.anel--1', f), { strokeDasharray: '0 1', strokeDashoffset: -.25 }, { strokeDasharray: '1 0', strokeDashoffset: 0, duration: 1.8, ease: 'power3.inOut' }, .35)
      .fromTo($('.anel--2', f), { opacity: 0, scale: .9, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 1.6, ease: 'expo.out' }, .8)
      .fromTo($('.conta', f), { opacity: 0, scale: 0, transformOrigin: 'center' }, { opacity: 1, scale: 1, duration: .8, ease: 'back.out(3)' }, 1.6);
    return tl;
  }

  /* ---------- entrada da página ---------- */
  const intro = temGsap ? gsap.timeline({ defaults: { ease: 'expo.out' }, paused: true }) : null;
  if (temGsap && !reduce) {
    if ($('.hero')) {
      const m = movel();
      intro.from('.hero__topo span', { yPercent: 120, opacity: 0, duration: 1.2, stagger: .035 }, m ? .5 : .1)
        .add(medalhaoEntra('.hero__foto'), m ? 0 : .15)
        .from('.hero__nome .up', { yPercent: 110, duration: 1.3 }, m ? .7 : .45)
        .from('.selo', { scale: 0, rotate: -120, duration: 1.4 }, .9)
        .from('.hero__texto > *', { opacity: 0, y: 26, duration: 1, stagger: .08 }, .8)
        .from('.rolar', { opacity: 0, y: -20, duration: 1 }, 1.3);
    } else if ($('.phero')) {
      intro.from('.phero__titulo .up', { yPercent: 110, duration: 1.3, stagger: .1 }, 0)
        .from('.trilha, .phero .kicker, .phero__lede, .phero .hero__botoes', { opacity: 0, y: 20, duration: 1, stagger: .08 }, .2)
        .add(medalhaoEntra('.phero__arte'), .05)
        .from('.phero__marca', { opacity: 0, rotate: -25, scale: .9, duration: 2 }, 0);
    } else if ($('.artigo__topo')) {
      intro.from('.artigo__topo > *', { opacity: 0, y: 30, duration: 1.1, stagger: .07 }, 0);
    }
    intro.from('.nav__esq > *, .nav__dir > *', { opacity: 0, y: -16, duration: 1, stagger: .07, clearProps: 'opacity,transform' }, .2);
    if ($('.tabbar')) intro.from('.tabbar', { y: 100, duration: 1.1, clearProps: 'transform' }, .4);

    // abertura: um anel de ouro se desenha, o brasão aparece, o lema surge letra a letra
    // e o portal se fecha dentro do selo do cabeçalho, como se o site saísse do brasão
    const primeira = !sessionStorage.getItem('cuxi');
    sessionStorage.setItem('cuxi', '1');
    const selo = $('.nav__selo'), r = selo.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    gsap.set(cortina, { clipPath: `circle(${raio(cx, cy)}px at ${cx}px ${cy}px)` });
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (primeira) {
      tl.fromTo('.cortina__anel circle', { strokeDashoffset: 604 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: .15 })
        .fromTo('.cortina__brasao', { opacity: 0, scale: .82, filter: 'blur(8px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.3 }, .6)
        .to('.cortina__lema span', { opacity: 1, duration: .5, stagger: { each: .035, from: 'center' }, ease: 'power1.out' }, .9)
        .to('.cortina__anel', { rotate: 90, duration: 2.4, ease: 'power2.inOut' }, 0)
        .to({}, { duration: .35 });
    } else gsap.set(['.cortina__brasao', '.cortina__anel'], { opacity: 1 });
    tl.to('.cortina__lema span', { opacity: 0, duration: .3, stagger: { each: .01, from: 'edges' } })
      .to('.cortina__anel', { scale: .32, opacity: 0, duration: .9, ease: 'expo.inOut' }, '<')
      .to('.cortina__brasao', { scale: .4, opacity: 0, duration: .8, ease: 'expo.inOut' }, '<')
      .to(cortina, { clipPath: `circle(0px at ${cx}px ${cy}px)`, duration: 1.1, ease: 'expo.inOut' }, '<.05')
      .fromTo(selo, { rotate: -180, scale: .6 }, { rotate: 0, scale: 1, duration: 1.4, clearProps: 'transform' }, '-=.35')
      .add(() => intro.play(), '-=1.2');
  } else if (cortina) cortina.style.clipPath = 'circle(0% at 50% 50%)';

  /* ---------- setas laterais: navegam entre as seções ---------- */
  const lateral = $('#lateral'), secoes = $$('[data-sec]');
  if (lateral && secoes.length > 1) {
    const num = $('#latNum'), tot = $('#latTot'), nome = $('#latNome'), [cima, baixo] = $$('.lateral__seta', lateral);
    tot.textContent = String(secoes.length).padStart(2, '0');
    let atual = 0;
    const marca = () => {
      const meio = innerHeight * .45;
      let i = secoes.findIndex(s => s.getBoundingClientRect().bottom > meio); if (i < 0) i = secoes.length - 1;
      lateral.classList.toggle('is-on', scrollY > innerHeight * .5);
      if (i === atual && nome.textContent) return; atual = i;
      num.textContent = String(i + 1).padStart(2, '0');
      if (temGsap && !reduce) gsap.fromTo(nome, { opacity: 0, y: 10 }, { opacity: .75, y: 0, duration: .5 });
      nome.textContent = secoes[i].dataset.sec;
      cima.disabled = i === 0; baixo.disabled = i === secoes.length - 1;
    };
    if (lenis) lenis.on('scroll', marca); else addEventListener('scroll', marca, { passive: true });
    marca();
    $$('.lateral__seta', lateral).forEach(b => b.addEventListener('click', () => {
      const alvo = secoes[Math.max(0, Math.min(secoes.length - 1, atual + +b.dataset.dir))];
      irPara(alvo, alvo === secoes[0] ? 0 : -20);
    }));
  }

  /* ---------- marquee acelera com a rolagem ---------- */
  const trilhos = $$('.marquee__trilho');
  if (lenis && trilhos.length) lenis.on('scroll', ({ velocity }) => trilhos.forEach(t => {
    const a = t.getAnimations()[0]; if (a) a.playbackRate = (1 + Math.min(Math.abs(velocity) / 6, 5)) * (velocity < 0 ? -1 : 1);
  }));

  /* ---------- filtros (reflexões e acervo) ---------- */
  $$('.filtros').forEach(f => {
    const alvo = f.nextElementSibling;
    $$('button', f).forEach(b => b.addEventListener('click', () => {
      $$('button', f).forEach(x => x.classList.toggle('is-on', x === b)); vibra(5);
      const itens = $$('[data-c]', alvo);
      itens.forEach(i => i.classList.toggle('is-fora', b.dataset.f !== 'todos' && i.dataset.c !== b.dataset.f));
      temGsap && ScrollTrigger.refresh();
      if (temGsap && !reduce) gsap.fromTo(itens.filter(i => !i.classList.contains('is-fora')), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .8, stagger: .035, ease: 'expo.out' });
      if (movel()) b.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }));
  });

  /* ---------- explore (celular): o card do centro cresce, pontos acompanham ---------- */
  $$('[data-snap]').forEach(tr => {
    const cards = [...tr.children], pontos = $$('i', tr.nextElementSibling);
    const calc = () => {
      if (!movel()) { cards.forEach(c => c.style.removeProperty('--k')); return; }
      const c0 = tr.getBoundingClientRect().left + tr.clientWidth / 2; let melhor = 0, dmin = 1e9;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - c0);
        c.style.setProperty('--k', Math.max(0, 1 - d / r.width).toFixed(3));
        if (d < dmin) { dmin = d; melhor = i; }
      });
      pontos.forEach((p, i) => p.classList.toggle('is-on', i === melhor));
    };
    let raf = 0; tr.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(calc); }, { passive: true });
    addEventListener('resize', calc); calc();
  });

  /* ---------- pedra e mar (celular): baralho que se arrasta para o lado ---------- */
  $$('[data-deck]').forEach(deck => {
    let cartas = $$('.duo__p', deck);
    const arruma = () => cartas.forEach((c, i) => { c.classList.toggle('is-frente', i === 0); c.classList.toggle('is-tras', i > 0); c.style.transform = ''; });
    arruma();
    let x0 = null, y0 = 0, dx = 0, eixo = null;
    deck.addEventListener('pointerdown', e => { if (!movel() || e.target.closest('a')) return; x0 = e.clientX; y0 = e.clientY; dx = 0; eixo = null; });
    deck.addEventListener('pointermove', e => {
      if (x0 === null) return;
      dx = e.clientX - x0; const dy = e.clientY - y0;
      if (!eixo && Math.abs(dx) + Math.abs(dy) > 8) eixo = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (eixo !== 'x') return;
      const f = cartas[0]; f.style.transition = 'none'; f.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`;
    });
    const solta = () => {
      if (x0 === null) return; x0 = null; const f = cartas[0]; f.style.transition = '';
      if (eixo === 'x' && Math.abs(dx) > 70) {
        vibra(12);
        f.style.transform = `translateX(${Math.sign(dx) * 120}%) rotate(${Math.sign(dx) * 18}deg)`;
        setTimeout(() => { cartas.push(cartas.shift()); arruma(); }, 260);
      } else f.style.transform = '';
    };
    deck.addEventListener('pointerup', solta); deck.addEventListener('pointercancel', solta);
  });

  /* ---------- trilho automático e arrastável (desktop) ---------- */
  const rail = $('[data-rail]');
  if (rail && temGsap && !movel()) {
    const faixa = $('.trilho__faixa', rail); faixa.innerHTML += faixa.innerHTML;
    let x = 0, vel = reduce ? 0 : .5, alvo = vel, cur = vel, drag = null, metade = 0, moveu = false, vis = false, guiando = false;
    const mede = () => metade = faixa.scrollWidth / 2; mede(); addEventListener('resize', mede);
    rail.addEventListener('pointerenter', () => alvo = vel * .2);
    rail.addEventListener('pointerleave', () => { alvo = vel; drag = null; });
    rail.addEventListener('pointerdown', e => { drag = { x: e.clientX, s: x }; moveu = false; });
    rail.addEventListener('pointermove', e => { if (drag) { x = drag.s + (e.clientX - drag.x); if (Math.abs(e.clientX - drag.x) > 6) moveu = true; } });
    addEventListener('pointerup', () => drag = null);
    rail.addEventListener('click', e => { if (moveu) { e.preventDefault(); e.stopImmediatePropagation(); } }, true);
    new IntersectionObserver(([e]) => vis = e.isIntersecting).observe(rail);
    $$('[data-rail-dir]').forEach(b => b.addEventListener('click', () => {
      const passo = ($('.card', faixa).offsetWidth + 22) * +b.dataset.railDir, o = { v: x };
      guiando = true; alvo = 0; cur = 0;
      gsap.to(o, { v: x - passo, duration: 1, ease: 'expo.out', onUpdate: () => x = o.v, onComplete: () => { guiando = false; setTimeout(() => alvo = vel, 1600); } });
    }));
    gsap.ticker.add(() => {
      if (!vis) return; cur += (alvo - cur) * .06; if (!drag && !guiando) x -= cur;
      if (x <= -metade) x += metade; if (x > 0) x -= metade;
      faixa.style.transform = `translate3d(${x}px,0,0)`;
    });
  }

  if (rail && movel()) $$('[data-rail-dir]').forEach(b => b.addEventListener('click', () => { vibra(6); rail.scrollBy({ left: ($('.card', rail).offsetWidth + 22) * +b.dataset.railDir, behavior: 'smooth' }); }));

  /* ---------- acervo: visualizador em formato de stories ---------- */
  var fechaStory = null;
  const story = $('#story'), dados = $('#acervoDados');
  if (story && dados) {
    const lista = JSON.parse(dados.textContent), barras = $('.story__barras', story);
    barras.innerHTML = lista.map(() => '<i></i>').join('');
    const bs = $$('i', barras), im = $('#stImg'), DUR = 6000;
    let idx = 0, t0 = 0, pausa = false, gasto = 0, raf = 0, aberto = false, origem = null;
    const visiveis = () => $$('.feed__item:not(.is-fora) [data-story]').map(b => +b.dataset.story);
    const mostra = i => {
      const vs = visiveis(); if (!vs.length) return;
      const pos = vs.indexOf(i); idx = i;
      bs.forEach((b, k) => { const p = vs.indexOf(k); b.style.display = p < 0 ? 'none' : ''; b.style.setProperty('--p', p < 0 ? 0 : p < pos ? 1 : 0); });
      const d = lista[i]; im.src = d.s; im.alt = `Arte da casa: ${d.t}`; $('#stTitulo').textContent = d.t; $('#stData').textContent = d.d; $('#stLink').href = d.u;
      const prox = lista[vs[(pos + 1) % vs.length]]; if (prox) new Image().src = prox.s;
      if (temGsap && !reduce) gsap.fromTo(im, { scale: .94, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, ease: 'expo.out' });
      gasto = 0; t0 = performance.now();
    };
    const passo = dir => { const vs = visiveis(), pos = vs.indexOf(idx), n = pos + dir; if (n >= vs.length) return fecha(); mostra(vs[(n + vs.length) % vs.length]); vibra(5); };
    const tick = now => {
      if (!aberto) return;
      if (!pausa) { const p = Math.min(1, (gasto + now - t0) / DUR); bs[idx].style.setProperty('--p', p); if (p >= 1) passo(1); }
      raf = requestAnimationFrame(tick);
    };
    const abre = i => { origem = document.activeElement; aberto = true; story.classList.add('is-open'); story.setAttribute('aria-hidden', 'false'); travar(true); mostra(i); raf = requestAnimationFrame(tick); $('[data-fecha]', story).focus(); };
    const fecha = () => { if (!aberto) return; aberto = false; cancelAnimationFrame(raf); story.classList.remove('is-open'); story.setAttribute('aria-hidden', 'true'); travar(false); origem && origem.focus(); };
    fechaStory = fecha;
    $$('[data-story]').forEach(b => b.addEventListener('click', () => abre(+b.dataset.story)));
    $('[data-fecha]', story).addEventListener('click', fecha);
    $$('.story__lado', story).forEach(b => b.addEventListener('click', e => { e.stopPropagation(); passo(+b.dataset.dir); }));
    addEventListener('keydown', e => { if (!aberto) return; if (e.key === 'ArrowRight') passo(1); if (e.key === 'ArrowLeft') passo(-1); });
    // toque: esquerda volta, direita avança, segurar pausa, arrastar para baixo fecha
    const arte = $('.story__arte', story); let p0 = null;
    arte.addEventListener('pointerdown', e => { p0 = { x: e.clientX, y: e.clientY, t: performance.now() }; pausa = true; gasto += performance.now() - t0; });
    arte.addEventListener('pointermove', e => { if (p0 && e.clientY - p0.y > 0) story.style.transform = `translateY(${(e.clientY - p0.y) * .6}px)`; });
    arte.addEventListener('pointerup', e => {
      if (!p0) return; const dy = e.clientY - p0.y, dx = e.clientX - p0.x, dt = performance.now() - p0.t; p0 = null;
      story.style.transform = ''; pausa = false; t0 = performance.now();
      if (dy > 110) return fecha();
      if (Math.abs(dx) > 60) return passo(dx < 0 ? 1 : -1);
      if (dt < 250) passo(e.clientX < innerWidth / 3 ? -1 : 1);
    });
    story.addEventListener('mouseenter', () => { if (fine && aberto) { pausa = true; gasto += performance.now() - t0; } });
    story.addEventListener('mouseleave', () => { if (fine && aberto) { pausa = false; t0 = performance.now(); } });
  }

  /* ---------- reflexão: progresso, setas laterais, deslizar, compartilhar ---------- */
  const progresso = $('.progresso'), vizinhos = $('.vizinhos');
  if (progresso) {
    const at = () => {
      const t = root.scrollHeight - innerHeight; progresso.style.transform = `scaleX(${t > 0 ? scrollY / t : 0})`;
      vizinhos && vizinhos.classList.toggle('is-on', scrollY > innerHeight * .6);
    };
    if (lenis) lenis.on('scroll', at); else addEventListener('scroll', at, { passive: true }); at();
    const artigo = $('.artigo'); let s0 = null;
    artigo && artigo.addEventListener('touchstart', e => { s0 = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, { passive: true });
    artigo && artigo.addEventListener('touchend', e => {
      if (!s0) return; const t = e.changedTouches[0], dx = t.clientX - s0.x, dy = t.clientY - s0.y; s0 = null;
      if (Math.abs(dx) > 90 && Math.abs(dy) < 50) { vibra(12); sair($(dx < 0 ? '.vizinho--prox' : '.vizinho--ant').href); }
    }, { passive: true });
  }
  $$('[data-share]').forEach(b => b.addEventListener('click', async () => {
    const dadosShare = { title: document.title, url: location.href };
    try { if (navigator.share) await navigator.share(dadosShare); else { await navigator.clipboard.writeText(location.href); b.lastChild.textContent = ' Link copiado'; } } catch (e) {}
  }));
  $$('[data-copia]').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copia); vibra(10); b.lastChild.textContent = ' Copiado'; setTimeout(() => b.lastChild.textContent = ' Copiar @', 2000); } catch (e) {}
  }));

  if (!temGsap || reduce) return;

  /* ---------- animações de rolagem ---------- */
  const st = (trigger, start = 'top 86%') => ({ trigger, start });
  $$('main section:not(.hero):not(.phero) .h2').forEach(h => gsap.from($$('.up', h), { yPercent: 110, duration: 1.3, stagger: .1, ease: 'expo.out', scrollTrigger: st(h, 'top 88%') }));
  $$('main section:not(.hero):not(.phero) .kicker').forEach(k => gsap.from(k, { opacity: 0, x: -24, duration: 1, ease: 'expo.out', scrollTrigger: st(k, 'top 92%') }));
  $$('[data-words]').forEach(el => {
    const claro = el.closest('.citacao');
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
    gsap.fromTo($$('.w', el), { opacity: .18 }, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: claro ? 'bottom 55%' : 'bottom 65%', scrub: true } });
  });
  const sobe = (sel, trig, o = {}) => $(sel) && gsap.from(sel, Object.assign({ y: 60, opacity: 0, duration: 1.2, stagger: .08, ease: 'expo.out', scrollTrigger: st(trig || sel) }, o));
  sobe('.eixo', '.eixos'); sobe('.declara__lista li', '.declara__lista', { y: 80 }); sobe('.passos__lista li', '.passos__lista', { y: 80, rotate: 1.5 });
  sobe('.info', '.infos__grade'); sobe('.faq details', '.faq__lista', { y: 30 }); sobe('.cards3 .card', '.cards3', { y: 80 });
  sobe('.perfil > *', '.perfil', { y: 30 }); sobe('.filtros button', '.filtros', { y: 20, stagger: .04 });
  sobe('.cta__in > *:not(.cta__brasao)', '.cta__in', { y: 40 }); sobe('.fundo-nota__in > *', '.fundo-nota__in', { y: 40 });
  if (!movel()) { sobe('.explorar__card', '.explorar__trilho', { y: 120, stagger: .1, duration: 1.4 }); sobe('.duo__p', '.duo__deck', { y: 120, stagger: .14, duration: 1.4 }); sobe('.trilho', null, { x: 140, y: 0, duration: 1.6 }); }
  else { sobe('.explorar__trilho', null, { y: 70 }); sobe('.duo__deck', null, { y: 80, rotate: -3 }); }
  $$('.mosaico').forEach(m => gsap.from($$('.mosaico__item', m), { y: 90, opacity: 0, duration: 1.2, stagger: { each: .07, grid: 'auto', from: 'start' }, ease: 'expo.out', scrollTrigger: st(m) }));
  $$('.lista__item').forEach(l => gsap.from(l, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: st(l, 'top 94%') }));
  $$('.feed__item').forEach((f, i) => gsap.from(f, { y: 60, opacity: 0, scale: .96, duration: 1, delay: (i % 3) * .06, ease: 'expo.out', scrollTrigger: st(f, 'top 96%') }));
  $$('.marco').forEach(m => {
    gsap.from($('.marco__img', m), { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: st(m) });
    gsap.from($$('div > *', m), { y: 30, opacity: 0, duration: 1, stagger: .07, ease: 'expo.out', scrollTrigger: st(m) });
    gsap.from($('.marco__ponto', m), { scale: 0, rotate: 180, duration: 1, ease: 'back.out(2)', scrollTrigger: st(m, 'top 70%') });
  });
  if ($('.marcos')) gsap.fromTo('.marcos', { '--fio': 0 }, { '--fio': 1, ease: 'none', scrollTrigger: { trigger: '.marcos', start: 'top 70%', end: 'bottom 60%', scrub: true } });
  gsap.utils.toArray('.lideranca__foto').forEach(el => ScrollTrigger.create({ trigger: el, start: 'top 80%', once: true, onEnter: () => medalhaoEntra(el) }));
  gsap.utils.toArray('.lideranca__foto').forEach(el => gsap.set([$('.arco__janela', el)], { clipPath: 'ellipse(0% 0% at 50% 50%)' }));
  $$('.artigo__arte').forEach(el => gsap.from(el, { clipPath: 'inset(100% 0 0 0)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: st(el) }));
  $$('.lideranca__foto .arco__janela').forEach(img => gsap.fromTo(img.firstElementChild, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
  $$('.lideranca__texto > *').length && gsap.from('.lideranca__texto > *:not(.h2)', { y: 30, opacity: 0, duration: 1, stagger: .08, ease: 'expo.out', scrollTrigger: st('.lideranca__texto') });
  $$('.origem__texto > *:not(.lead)').length && gsap.from('.origem__texto > *:not(.lead)', { y: 30, opacity: 0, duration: 1, stagger: .1, ease: 'expo.out', scrollTrigger: st('.origem__texto') });

  // paralaxe do topo
  if ($('.hero')) {
    gsap.to('.hero__foto .arco__janela img', { yPercent: 8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__nome', { xPercent: movel() ? 0 : -6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__topo', { yPercent: -60, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }
  if ($('.phero__marca')) gsap.to('.phero__marca', { rotate: 40, yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.phero', start: 'top top', end: 'bottom top', scrub: true } });
  $$('.duo__p figure').forEach(f => gsap.fromTo(f, { y: 60 }, { y: -40, ease: 'none', scrollTrigger: { trigger: f.closest('.duo'), start: 'top bottom', end: 'bottom top', scrub: true } }));
  gsap.from('.foot__palavra', { yPercent: 50, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.foot', start: 'top 90%', end: 'bottom bottom', scrub: true } });

  // na rolagem, o anel tracejado gira e a foto respira dentro da janela
  $$('.arco').forEach(a => gsap.to($('.anel--2', a), { rotate: 120, transformOrigin: '50% 50%', ease: 'none', scrollTrigger: { trigger: a, start: 'top bottom', end: 'bottom top', scrub: 1 } }));

  /* ---------- micro-interações com mouse ---------- */
  if (fine) $$('.btn, .ico, .nav__menu, .lateral__seta, .explorar__seta, .chip').forEach(el => {
    const xT = gsap.quickTo(el, 'x', { duration: .6, ease: 'elastic.out(1,.45)' }), yT = gsap.quickTo(el, 'y', { duration: .6, ease: 'elastic.out(1,.45)' });
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); xT((e.clientX - r.left - r.width / 2) * .22); yT((e.clientY - r.top - r.height / 2) * .32); });
    el.addEventListener('pointerleave', () => { xT(0); yT(0); });
  });
  addEventListener('load', () => ScrollTrigger.refresh());
})();
