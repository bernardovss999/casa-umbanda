# Site da Casa de Umbanda de Xangô e Iemanjá

Site estático, multipágina, sem dependências de npm. Um script em Node gera o HTML de todas as páginas a partir de um arquivo de conteúdo.

```
site/
├── build.mjs              gera dist/client (a pasta publicada)
├── src/
│   ├── conteudo.mjs       TODO o texto do site (edite aqui)
│   ├── publicacoes.json   as 24 reflexões
│   ├── paginas.mjs        uma função por página
│   ├── modelo.mjs         <head> com SEO, cabeçalho, menus, rodapé
│   └── assets/            css/site.css · js/site.js · img/
├── ferramentas/
│   ├── preparar-imagens.py   gera os WebP a partir de ../artes e ../marca
│   └── capturas.py           capturas de tela para revisão (desktop e celular)
├── ESTRUTURA-E-SEO.md     o que vai em cada página e as métricas
└── .openai/hosting.json   publicação (pasta dist/client)
```

## Comandos

```sh
npm run build                      # gera dist/client
npm run dev                        # gera e abre em http://localhost:5173
python ferramentas/preparar-imagens.py   # quando as artes mudarem
```

Requer Node 18 ou mais novo. Python e Pillow são necessários só para preparar imagens.

## Tecnologia
- HTML gerado no build, CSS próprio e um único JS (`site.js`).
- GSAP + ScrollTrigger e Lenis via CDN, para animações e rolagem suave. Sem essas bibliotecas, o site continua funcionando sem animação.
- Fontes: Cinzel (títulos) e Manrope (texto), via Google Fonts.

## Atualizar conteúdo
- Textos, perguntas, marcos e acervo: `src/conteudo.mjs`.
- Reflexões: `src/publicacoes.json` (cada uma: `slug`, `image`, `id` do post, `category`, `title`, `excerpt`, `paragraphs`).
- Nova arte: coloque `nome-v1.png` em `../artes`, rode `preparar-imagens.py` e use o `nome` no conteúdo.

O site anterior (Next.js) está guardado no git, na tag `antes-da-remodelacao`.
