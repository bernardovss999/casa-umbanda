// Todo o texto do site mora aqui. Para atualizar, edite este arquivo e rode `npm run build`.
import { readFileSync } from 'node:fs';

export const site = {
  nome: 'Casa de Umbanda de Xangô e Iemanjá',
  sigla: 'CUXI',
  lema: 'Pedra e Mar, Lei e Amor',
  saudacao: 'Axé, caridade e luz',
  bairro: 'Méier, Rio de Janeiro',
  url: 'https://casa-xango-iemanja-meier.guipereira260803.chatgpt.site',
  instagram: 'https://www.instagram.com/casadeumbandaxangoeiemanja/',
  arroba: '@casadeumbandaxangoeiemanja',
};

export const post = id => `https://www.instagram.com/p/${id}/`;

// páginas principais: [rótulo, caminho, ícone da barra mobile]
export const nav = [
  ['Início', '/', 'casa'],
  ['A casa', '/a-casa/', 'brasao'],
  ['Fundamentos', '/fundamentos/', 'oxe'],
  ['Reflexões', '/publicacoes/', 'livro'],
  ['Acervo', '/acervo/', 'grade'],
  ['Visite', '/visite/', 'pin'],
];

// datas de publicação no Instagram (extraídas de posts.json)
export const datas = { 'Dd4VV-iiWZj': '2026-09-29', 'DdxuPZvABua': '2026-09-26', 'DdVHr5ZgoZD': '2026-09-15', 'DcRpvF0iWmk': '2026-08-20', 'Db03cmGuU2B': '2026-08-09', 'DbRWxLsJQiC': '2026-07-26', 'Daf8VcHC-FH': '2026-07-07', 'DaTBf9JA4XT': '2026-07-02', 'DaJTSbcibPQ': '2026-06-28', 'DZ-08StpyHm': '2026-06-24', 'DZr1fKUlSoZ': '2026-06-17', 'DZgscE7jCu9': '2026-06-12', 'DYSafI7pzqO': '2026-05-13', 'DYOKTLzsre7': '2026-05-11', 'DYKKB4mu8P8': '2026-05-10', 'DXd4s-igvvx': '2026-04-23', 'DXVFR4NiYB9': '2026-04-19', 'DVoFmPQADf8': '2026-03-08', 'DVAOiPEjZVY': '2026-02-20', 'DUQrHfPgACW': '2026-02-02', 'DT56ib5ifbP': '2026-01-24', 'DTyJ9bCicUo': '2026-01-21', 'DTvJmdmDuuR': '2026-01-20', 'DSi5VzXCd2U': '2025-12-21', 'DSXqaEEAI5t': '2025-12-17', 'DSAdVi7gFh5': '2025-12-08', 'DR96wajDgIi': '2025-12-07', 'DR2RpoVgDz_': '2025-12-04', 'DRF2FOVCe3Y': '2025-11-15', 'DQ0UG2pDHra': '2025-11-08' };

// as 30 artes do feed, na ordem do Instagram (mais recente primeiro)
export const acervo = [
  ['Dd4VV-iiWZj', 'verdades', 'Verdades ácidas e necessárias', 'Reflexões'],
  ['DdxuPZvABua', 'ere-ilustracao', 'Erês em festa', 'Linhas'],
  ['DdVHr5ZgoZD', 'dia-oga', 'Dia do Ogã', 'Datas'],
  ['DcRpvF0iWmk', 'encanto', 'O encanto no terreiro', 'Reflexões'],
  ['Db03cmGuU2B', 'pai-renato-homenagem', 'Com amor, ao nosso pai Renato', 'Casa'],
  ['DbRWxLsJQiC', 'nana', 'Salubá, Nanã', 'Orixás'],
  ['Daf8VcHC-FH', 'malandragem', 'Salve a malandragem', 'Linhas'],
  ['DaTBf9JA4XT', 'boiadeiro', 'Xetruá, ê boi!', 'Linhas'],
  ['DaJTSbcibPQ', 'orgulho', 'O orgulho de ser quem se é', 'Datas'],
  ['DZ-08StpyHm', 'xango', 'Xangô: justiça, força, proteção', 'Orixás'],
  ['DZr1fKUlSoZ', 'medium-entidade', 'Onde termina o médium?', 'Reflexões'],
  ['DZgscE7jCu9', 'santo-antonio', 'Salve Santo Antônio', 'Linhas'],
  ['DYSafI7pzqO', 'pretos-velhos', 'Eu adorei as almas', 'Linhas'],
  ['DYOKTLzsre7', 'pai-renato-plano-aberto', 'O axé que nos reúne', 'Casa'],
  ['DYKKB4mu8P8', 'dia-maes', 'Mãe é amor', 'Datas'],
  ['DXd4s-igvvx', 'ogum', 'Ogum, caminho aberto', 'Orixás'],
  ['DXVFR4NiYB9', 'povos-originarios', 'Povos originários', 'Datas'],
  ['DVoFmPQADf8', 'dia-mulher', 'Dia Internacional da Mulher', 'Datas'],
  ['DVAOiPEjZVY', 'vela-registro', 'A luz nos pequenos gestos', 'Casa'],
  ['DUQrHfPgACW', 'iemanja', 'Nas águas de Iemanjá', 'Orixás'],
  ['DT56ib5ifbP', 'altar-verde-registro', 'A primeira gira aberta', 'Casa'],
  ['DTyJ9bCicUo', 'intolerancia-religiosa', 'Combate à intolerância religiosa', 'Datas'],
  ['DTvJmdmDuuR', 'oxossi', 'Oxóssi, senhor da fartura', 'Orixás'],
  ['DSi5VzXCd2U', 'altar-registro', 'As primeiras sementes', 'Casa'],
  ['DSXqaEEAI5t', 'omulu', 'Omulu e o novo florescer', 'Orixás'],
  ['DSAdVi7gFh5', 'oxum', 'Oxum, o abraço que acalma', 'Orixás'],
  ['DR96wajDgIi', 'pai-renato-registro', 'A coroa de pai Renato', 'Casa'],
  ['DR2RpoVgDz_', 'iansa', 'Eparrey, Iansã', 'Orixás'],
  ['DRF2FOVCe3Y', 'dia-umbanda', 'Dia Nacional da Umbanda', 'Datas'],
  ['DQ0UG2pDHra', 'ervas-registro', 'Tá nascendo a casa', 'Casa'],
].map(([id, img, titulo, tema]) => ({ id, img, titulo, tema, data: datas[id] }));

// 24 reflexões (texto completo em publicacoes.json; URLs /publicacoes/<slug>/ mantidas)
export const publicacoes = JSON.parse(readFileSync(new URL('./publicacoes.json', import.meta.url)))
  .map(p => ({ ...p, data: datas[p.id] }));

// os quatro eixos da casa, a partir da apresentação e das reflexões publicadas
export const eixos = [
  ['oxe', 'Firmeza com consciência', 'A base de Xangô: verdade nas escolhas e responsabilidade nos gestos.'],
  ['ondas', 'Acolhimento com respeito', 'A presença de Iemanjá: escutar, amparar e respeitar a história de quem chega.'],
  ['folha', 'Desenvolvimento com humanidade', 'Desenvolver a mediunidade é também desenvolver a si mesmo.'],
  ['estrela', 'Comunidade com memória', 'Uma casa construída a muitas mãos, que não esquece quem veio antes.'],
];

// marcos documentados no próprio perfil da casa
export const marcos = [
  ['08 nov 2025', 'Tá nascendo a casa', 'A primeira publicação apresenta uma Umbanda vivida com simplicidade, disciplina amorosa e pé no chão.', 'DQ0UG2pDHra', 'ervas-registro'],
  ['07 dez 2025', 'A coroa de pai Renato', 'A casa celebra a coroa do seu babalorixá e agradece a quem sustentou a caminhada até ali.', 'DR96wajDgIi', 'pai-renato-registro'],
  ['21 dez 2025', 'As primeiras sementes', 'Filhos e filhas da casa organizam o espaço e anunciam os trabalhos abertos para janeiro.', 'DSi5VzXCd2U', 'altar-registro'],
  ['24 jan 2026', 'A primeira gira aberta', 'Uma gira de Oxóssi recebe filhos, assistência e amigos pela primeira vez.', 'DT56ib5ifbP', 'altar-verde-registro'],
];

// o que a casa declara em suas publicações (sempre com a fonte)
export const declaracoes = [
  ['Iemanjá rege nossa casa', 'Na homenagem de 2 de fevereiro, a casa se apresenta regida por Iemanjá: acolhimento, amor e união.', 'DUQrHfPgACW'],
  ['Xangô é fundamento', 'Justiça, equilíbrio e força de decisão. Toda construção pede base firme.', 'DZ-08StpyHm'],
  ['Salve seu Urubatão da Guia', 'Na saudação aos povos originários e aos caboclos, a casa saúda o caboclo que a rege.', 'DXVFR4NiYB9'],
  ['Oxalá guia a luz', 'A apresentação da casa reúne Xangô, Iemanjá e Oxalá nos primeiros passos da caminhada.', 'DQ0UG2pDHra'],
];

export const perguntas = [
  ['Nunca fui a um terreiro. Posso conhecer a casa?', 'Pode. A casa nasceu para acolher. Antes da primeira visita, mande uma mensagem pelo Instagram: assim você recebe as orientações de chegada e de participação direto de quem cuida da casa.'],
  ['Onde fica a casa?', 'No Méier, Zona Norte do Rio de Janeiro. O endereço completo é passado pela própria casa, por mensagem, junto com as orientações de acesso.'],
  ['Quais são os dias e horários das giras?', 'A programação é divulgada nas publicações e nos stories do Instagram. Confirme a data e o horário com a casa antes de sair, porque a agenda pode mudar.'],
  ['Preciso agendar ou levar alguma coisa?', 'Pergunte à casa ao combinar sua visita. Ela orienta sobre roupa, chegada e o que for necessário para cada encontro.'],
  ['Posso fotografar ou filmar?', 'Pergunte antes. A gira é um momento de fé, e a casa orienta o que pode ou não ser registrado.'],
];
