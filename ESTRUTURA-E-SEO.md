# Estrutura do site e SEO

O que vai em cada página, por quê, e as métricas que um site profissional precisa cumprir. Base: o Instagram da casa e a pesquisa em `../dados/pesquisa_seo/`. Nenhum dado foi inventado: o que a casa ainda não confirmou (endereço, telefone, horários) aparece como "a casa informa por mensagem".

## 1. Mapa do site

| Página | Endereço | Para quem | Busca que atende | Ação principal |
|---|---|---|---|---|
| Início | `/` | Quem acabou de conhecer a casa | "Casa de Umbanda de Xangô e Iemanjá", "terreiro no Méier", "CUXI" | Conhecer a casa / Como visitar |
| A casa | `/a-casa/` | Quem quer saber quem são | "história da CUXI", "pai Renato" | Ler a linha do tempo |
| Fundamentos | `/fundamentos/` | Quem quer entender a fé da casa | "Xangô e Iemanjá", "Pedra e Mar, Lei e Amor" | Ler as reflexões |
| Reflexões | `/publicacoes/` + 24 artigos | Leitores e médiuns em desenvolvimento | "desenvolvimento mediúnico", "médium e entidade", "intolerância religiosa" | Ler e compartilhar |
| Acervo | `/acervo/` | Quem chega pelo Instagram | Galeria das artes | Seguir no Instagram |
| Visite | `/visite/` | Quem quer ir pela primeira vez | "como visitar terreiro no Méier", "dias de gira" | Falar com a casa |

Os endereços `/publicacoes/<slug>/` do site anterior foram mantidos, para não perder links nem indexação.

## 2. O que vai em cada página

### Início
1. **Topo**: nome completo (H1), bairro, lema, foto real de pai Renato no altar, selo giratório. Dois botões: "Conheça a casa" e "Como visitar".
2. **A casa em uma frase** e os quatro valores (firmeza, acolhimento, desenvolvimento, comunidade).
3. **Explore a casa**: um card por página (a home funciona como índice).
4. **Pedra e Mar**: Xangô e Iemanjá lado a lado (no celular, um baralho que se arrasta).
5. **Voz da casa**: as reflexões em trilho automático.
6. **Citação** da própria casa, com link para a publicação.
7. **Chamada final** para visitar.

### A casa
Origem (08/11/2025) · linha do tempo com os 4 marcos documentados · pai Renato · "O que a casa diz de si" (cada frase com link para a fonte) · valores.

### Fundamentos
Xangô e Iemanjá · orixás homenageados · linhas e devoções · aviso de que os fundamentos se aprendem no terreiro. Texto cuidadoso: são **homenagens publicadas**, não uma lista das linhas de trabalho.

### Reflexões
Lista filtrável por tema. Cada artigo tem: título, olho, arte, texto, link para o post original, compartilhar, leitura relacionada e setas para a reflexão anterior e a próxima.

### Acervo
As 30 artes no formato do feed, com filtro por tema e visualizador em formato de stories.

### Visite
Três passos · onde / contato / agenda · perguntas frequentes · botão fixo "Falar com a casa" no celular.

## 3. Celular (feito à parte, não só encolhido)

- **Barra inferior estilo app** (Início, Reflexões, brasão, Acervo, Visite). Some ao descer e volta ao subir. A pílula da aba ativa desliza.
- **Brasão central abre uma gaveta** com todas as páginas. Fecha arrastando para baixo.
- **Topo da home reorganizado**: a foto em arco abre de um círculo, e o nome aparece empilhado.
- **Explore** vira carrossel com encaixe: o card do centro cresce e os pontos acompanham.
- **Valores** viram cards deslizáveis.
- **Pedra e Mar** vira baralho: arraste para o lado para trocar Xangô por Iemanjá.
- **Acervo em stories**: toque à direita avança, à esquerda volta, segurar pausa, arrastar para baixo fecha. Barras de progresso iguais às do Instagram.
- **Reflexões**: deslize para o lado para ir à próxima, e botão nativo de compartilhar.
- **Filtros** fixos no topo, com rolagem lateral.
- Vibração curta ao tocar (só no Android, onde o navegador permite).
- Áreas de toque com 44 px ou mais e respeito à área segura do iPhone.

## 4. Métricas de um site profissional

### Desempenho (Core Web Vitals, medir com PageSpeed Insights após publicar)
| Métrica | Meta | Como o site atende |
|---|---|---|
| LCP (maior elemento visível) | < 2,5 s | Foto do topo com `fetchpriority="high"`, WebP de 480/900 px |
| CLS (estabilidade) | < 0,1 | Toda imagem com `width`/`height`; fontes com `display=swap` |
| INP (resposta ao toque) | < 200 ms | JS leve, animações em `transform`/`opacity` |
| Peso da página inicial | < 1,5 MB | Imagens responsivas com `srcset` e `loading="lazy"` |
| Lighthouse | ≥ 90 em todas as categorias | HTML estático, sem framework no navegador |

### SEO técnico (já aplicado)
- Um `<h1>` por página; hierarquia H2/H3 sem pular níveis.
- `<title>` com 50–65 caracteres e `meta description` com 120–160, únicos por página.
- `canonical`, Open Graph e cartão do X/Twitter em todas as páginas.
- Dados estruturados (JSON-LD): `Organization` + `PlaceOfWorship`, `WebSite`, `BreadcrumbList`, `Article`, `FAQPage`, `ImageGallery`, `CollectionPage`.
- `sitemap.xml` (31 URLs), `robots.txt`, `404.html`, `site.webmanifest`, favicons.
- Texto alternativo descritivo em todas as imagens.
- Links internos entre páginas (Explore, Leia também, anterior/próxima).
- Acessibilidade: link "pular para o conteúdo", foco visível, `aria-*` nos menus, `prefers-reduced-motion` respeitado.

### Conteúdo e SEO local
- "Méier, Rio de Janeiro" aparece com naturalidade: topo, rodapé, Visite e dados estruturados. Nada de listas artificiais de bairros.
- Nome completo junto da sigla CUXI.
- Cada afirmação religiosa vem com link para a publicação da casa.

## 5. Pendências que dependem da casa
1. **Endereço público** (ou a decisão de não divulgar). Com ele: `streetAddress` no JSON-LD, mapa na página Visite e Perfil da Empresa no Google.
2. **Canal oficial** além do Instagram (WhatsApp ou e-mail), se houver.
3. **Agenda**: dias e horários fixos, se existirem, para a página Visite.
4. **Domínio próprio** (ex.: `cuxi.com.br`). Depois de configurar, trocar `site.url` em `src/conteudo.mjs` e rodar o build.
5. **Google Search Console**: enviar o `sitemap.xml` após publicar.
6. Revisão religiosa dos textos de Fundamentos por pai Renato.
