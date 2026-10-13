'use strict';
/* Mimo Kids Presentes: catálogo lido de produtos.json (alimentado pelo bot do Instagram).
   Peça: {id, codigo, nome, categoria, genero, preco, promo:{qtd,total,grupo?}|null, descricao, criado,
          cores:[{nome, hex, fotos:[...], tamanhos:[...], esgotados:[...], ia?:[indices das fotos criadas por IA]}]}
   Os tamanhos são exatamente os que a loja digitou (ex.: "6 MESES A 1 ANO", "P", "2"). */

const $ = (s, r = document) => r.querySelector(s);
const BRL = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const limpaTexto = s => String(s || '').replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').replace(/\s{2,}/g, ' ').trim();
const corUtil = (p, nome) => (p.cores.length > 1 && nome && norm(nome) !== 'unica') ? nome : '';
const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function el(tag, props = {}, ...filhos) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k === 'style') e.style.cssText = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else if (k === 'text') e.textContent = v;
    else e.setAttribute(k, v === true ? '' : v);
  }
  e.append(...filhos.flat().filter(f => f !== null && f !== undefined && f !== false));
  return e;
}

const cod = p => p.codigo ? 'Cód. ' + String(p.codigo).toUpperCase() : '';
/* miniatura do cartão: o bot grava ao lado da foto grande uma versão "-m.jpg" (480px); se não existir, usa a grande */
const miniatura = f => String(f).replace(/\.jpg$/i, '-m.jpg');
const eNova = p => { const t = Date.parse(p.criado); return !isNaN(t) && (Date.now() - t) / 86400000 <= (Number(CFG.novoDias) || 14); };
const zap = texto => /^55\d{10,11}$/.test(CFG.whatsapp || '') ? 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(texto) : '#';
const avisarLeitor = t => { const n = $('#sr'); if (n) { n.textContent = ''; setTimeout(() => { n.textContent = t; }, 30); } };
/* devolve o foco ao botão equivalente depois de redesenhar uma lista (teclado e leitor de tela) */
const guardarFoco = () => { const a = document.activeElement; return a && a.dataset ? a.dataset.foco : ''; };
const devolverFoco = f => { if (f) { const n = [...document.querySelectorAll('[data-foco]')].find(x => x.dataset.foco === f && !x.disabled); if (n) n.focus({ preventScroll: true }); } };

let CFG = {}, PECAS = [], ERRO = false;
const filtro = { tam: '', cat: '', gen: '', busca: '', faixa: null, ate: 0 };
const ordem = { v: '' };
const temFiltro = () => Boolean(filtro.tam || filtro.cat || filtro.gen || filtro.busca.trim() || filtro.faixa || filtro.ate);
const GENEROS = { menina: 'Menina', menino: 'Menino', unissex: 'Unissex' };

/* ---------- tamanhos: lista fixa RN, P, M, G, 1, 2, 3, 4 ----------
   O catálogo guarda o que a loja digitou (ex.: "6 meses a 1 ano"); o site converte para a lista fixa ao carregar.
   Cada tamanho cobre uma faixa de idade em meses [de, até): RN 0-3, P 3-6, M 6-9, G 9-12, 1 = 12-24, 2 = 24-36, 3 = 36-48, 4 = 48-60.
   Uma faixa digitada vira todos os tamanhos que ela alcança ("6 meses a 1 ano" = M e G). Texto que não dá para converter segue como foi digitado. */
const PADRAO = [
  { k: 'RN', de: 0, ate: 3, dica: 'recém-nascido, até 3 meses' }, { k: 'P', de: 3, ate: 6, dica: '3 a 6 meses' },
  { k: 'M', de: 6, ate: 9, dica: '6 a 9 meses' }, { k: 'G', de: 9, ate: 12, dica: '9 a 12 meses' },
  { k: '1', de: 12, ate: 24, dica: '1 ano' }, { k: '2', de: 24, ate: 36, dica: '2 anos' },
  { k: '3', de: 36, ate: 48, dica: '3 anos' }, { k: '4', de: 48, ate: 60, dica: '4 anos' },
];
const ORDEM_PADRAO = PADRAO.map(s => s.k);
function paraPadrao(texto) {
  const u = norm(texto).trim().toUpperCase();
  if (ORDEM_PADRAO.includes(u) && !/^\d+$/.test(u)) return [u];                     // RN, P, M, G
  const toks = [...u.matchAll(/(\d+(?:[.,]\d+)?)(?:\s*(MESES|MES|ANOS|ANO)|(M)\b)?/g)].map(m => ({ v: parseFloat(m[1].replace(',', '.')), un: m[2] ? (m[2][0] === 'M' ? 'm' : 'a') : m[3] ? 'm' : '' }));
  const temRN = /\bRN\b|RECEM/.test(u);
  if (!toks.length && !temRN) return [texto];
  for (let i = toks.length - 1; i >= 0; i--) if (!toks[i].un) toks[i].un = toks[i + 1] ? toks[i + 1].un : (/MES/.test(u) ? 'm' : 'a');
  const meses = toks.map(t => t.un === 'm' ? t.v : t.v * 12);
  if (temRN) meses.unshift(0);
  const de = Math.min(...meses);
  let ate = Math.max(...meses);
  const ult = toks[toks.length - 1];
  if (toks.length > 1 && ult && ult.un === 'a' && ult.v >= 2) ate += 12;        // "2 a 4 anos" inclui o tamanho 4; "6 meses a 1 ano" termina no G
  const achados = de === ate ? PADRAO.filter(s => de >= s.de && de < s.ate) : PADRAO.filter(s => s.de < ate && s.ate > de);
  return achados.length ? achados.map(s => s.k) : [texto];
}
function chaveTamanho(t) {
  const u = String(t).toUpperCase().trim();
  const i = ORDEM_PADRAO.indexOf(u);
  if (i >= 0) return [0, i];
  return [1, 0];
}
const comparaTam = (a, b) => { const x = chaveTamanho(a), y = chaveTamanho(b); return x[0] - y[0] || x[1] - y[1] || String(a).localeCompare(b, 'pt-BR'); };
/* rótulo na tela: "1" vira "1 ano", "2" vira "2 anos"; RN, P, M, G ficam como são */
const capitaliza = t => /^\d+$/.test(String(t)) ? t + (Number(t) === 1 ? ' ano' : ' anos') : String(t);
const dicaTamanho = t => (PADRAO.find(s => s.k === t) || {}).dica || '';
function normalizarPeca(p) {
  for (const c of p.cores) {
    const origem = {};
    for (const t of c.tamanhos || []) for (const k of paraPadrao(t)) (origem[k] = origem[k] || []).push(t);
    const esg = new Set(c.esgotados || []);
    c.tamanhos = Object.keys(origem).sort(comparaTam);
    c.esgotados = c.tamanhos.filter(k => origem[k].every(t => esg.has(t)));
  }
}

const tamanhosDaPeca = p => [...new Set(p.cores.flatMap(c => c.tamanhos.filter(t => !(c.esgotados || []).includes(t))))].sort(comparaTam);
const todosTamanhos = p => [...new Set(p.cores.flatMap(c => c.tamanhos))].sort(comparaTam);
const capa = (p, cor = p.cores[0]) => cor.fotos[0];
const porId = new Map();

/* ---------- carga ---------- */
async function carregar() {
  let dados;
  ERRO = false;
  try {
    const r = await fetch('produtos.json', { cache: 'no-cache' });
    if (!r.ok) throw new Error(String(r.status));
    dados = await r.json();
  } catch { ERRO = true; dados = { config: CFG, produtos: [] }; }
  CFG = dados.config || {};
  PECAS = (dados.produtos || []).filter(p => p && p.cores && p.cores.length && p.cores[0].fotos && p.cores[0].fotos.length)
    .sort((a, b) => String(b.criado || '').localeCompare(String(a.criado || '')) || String(b.id).localeCompare(String(a.id)));
  PECAS.forEach(normalizarPeca);
  porId.clear();
  PECAS.forEach(p => porId.set(String(p.id), p));
  configurar();
  montarFiltros();
  desenharVitrine();
  desenhar();
  atualizarSacola();
  abrirPorHash();
}

function configurar() {
  const fmt = v => BRL(Number(v)).replace(',00', '');
  const avisos = [];
  if (CFG.freteGratisAcima) avisos.push(`Entrega grátis${CFG.freteGratisCidade ? ' em ' + CFG.freteGratisCidade : ''} acima de ${fmt(CFG.freteGratisAcima)}.`);
  const aviso = $('#aviso');
  if (avisos.length) { aviso.replaceChildren(...avisos.map(a => el('span', { text: a }))); aviso.hidden = false; }
  document.querySelectorAll('.frete-valor').forEach(n => n.textContent = fmt(CFG.freteGratisAcima || 30));
  document.querySelectorAll('.frete-cidade').forEach(n => n.textContent = CFG.freteGratisCidade ? ' em ' + CFG.freteGratisCidade : '');
  document.querySelectorAll('.parcelas-valor, #parcelas').forEach(n => n.textContent = CFG.parcelasCartao || 12);
  document.querySelectorAll('[data-rede]').forEach(n => { n.href = { whats: CFG.whatsapp && 'https://wa.me/' + CFG.whatsapp, insta: CFG.instagram && 'https://www.instagram.com/' + CFG.instagram + '/', tiktok: CFG.tiktok && 'https://www.tiktok.com/@' + CFG.tiktok }[n.dataset.rede] || '#'; });
  if (CFG.whatsapp) { $('#l-whats').href = 'https://wa.me/' + CFG.whatsapp; }
  const pres = $('#l-whats-presente');
  pres.href = zap('Olá, Mimo Kids Presentes! Quero ajuda para escolher um presente.');
  if (pres.href !== location.href + '#') { pres.target = '_blank'; pres.rel = 'noopener noreferrer'; }
  const live = $('#fato-live');
  live.hidden = !CFG.proximaLive;
  if (CFG.proximaLive) $('#live-texto').textContent = CFG.proximaLive;
  if (CFG.instagram) $('#l-insta').href = 'https://www.instagram.com/' + CFG.instagram + '/';
  if (CFG.tiktok) $('#l-tiktok').href = 'https://www.tiktok.com/@' + CFG.tiktok;
}

/* ---------- filtros ---------- */
/* ícones de papel (assets/arte/ic-*.webp) e tom do papel de cada botão */
const ICONE_GEN = { menina: 'menina', menino: 'menino', unissex: 'unissex' };
const TOM_GEN = { menina: 'rosa', menino: 'azul', unissex: 'sol' };
function iconeCategoria(c) {
  const n = norm(c);
  return /vestid/.test(n) ? 'vestido' : /conjunt/.test(n) ? 'conjunto' : /present|kit|mimo/.test(n) ? 'presente' : 'tudo';
}
const icone = nome => nome ? el('img', { class: 'ic', src: 'assets/arte/ic-' + nome + '.webp', alt: '', width: 96, height: 96, 'aria-hidden': 'true' }) : null;
function chip(rotulo, ativo, aoClicar, { ic = null, tom = 'azul', foco = '' } = {}) {
  return el('button', { class: 'chip', 'data-tom': tom, 'data-foco': foco, type: 'button', 'aria-pressed': String(ativo), onclick: aoClicar }, icone(ic), el('span', { text: rotulo }));
}
function montarFiltros() {
  const foco = guardarFoco();
  const aplicar = () => { montarFiltros(); desenhar(); };
  const grupo = (id, valores, chave, rotular = v => v, nome = '', estilo = () => ({}), estiloTodos = {}) => {
    const box = $(id);
    box.replaceChildren();
    if (valores.length < 2) { box.hidden = true; return; }
    box.hidden = false;
    box.append(el('span', { class: 'grupo-rotulo', text: nome }), chip('Todos', !filtro[chave], () => { filtro[chave] = ''; aplicar(); }, { ...estiloTodos, foco: chave + ':' }),
      ...valores.map(v => chip(rotular(v), filtro[chave] === v, () => { filtro[chave] = filtro[chave] === v ? '' : v; if (chave === 'tam') filtro.faixa = null; aplicar(); }, { ...estilo(v), foco: chave + ':' + v })));
  };
  const tams = [...new Set(PECAS.flatMap(tamanhosDaPeca))].sort(comparaTam);
  grupo('#f-tam', tams, 'tam', t => 'Tam. ' + capitaliza(t), 'Tamanho');
  grupo('#f-gen', [...new Set(PECAS.map(p => p.genero).filter(Boolean))], 'gen', g => GENEROS[g] || g, 'Para', g => ({ ic: ICONE_GEN[g], tom: TOM_GEN[g] || 'azul' }), { ic: 'tudo', tom: 'sol' });
  const lim = Number(CFG.precoAte) || 50;
  const boxP = $('#f-preco');
  boxP.replaceChildren();
  boxP.hidden = !(PECAS.some(p => p.preco <= lim) && PECAS.some(p => p.preco > lim));
  if (!boxP.hidden) boxP.append(chip('Até ' + BRL(lim).replace(',00', ''), filtro.ate === lim, () => { filtro.ate = filtro.ate === lim ? 0 : lim; aplicar(); }, { tom: 'rosa', foco: 'preco' }));
  $('#ordem').hidden = PECAS.length < 3;
  $('#limpar').hidden = !temFiltro();
  $('#filtros').hidden = !['#f-tam', '#f-cat', '#f-gen', '#f-preco'].some(id => !$(id).hidden) && !temFiltro() && PECAS.length < 3;
  devolverFoco(foco);
}
$('#limpar').addEventListener('click', () => {
  Object.assign(filtro, { tam: '', cat: '', gen: '', busca: '', faixa: null, ate: 0 }); $('#busca').value = ''; montarFiltros(); desenhar();
  const f = $('#busca'); if (document.activeElement === $('#limpar')) f.focus({ preventScroll: true });
});
let atrasoBusca;
$('#busca').addEventListener('input', e => {
  filtro.busca = e.target.value;
  $('#limpar').hidden = !temFiltro();
  clearTimeout(atrasoBusca);
  atrasoBusca = setTimeout(() => { desenhar(); rolarAoCatalogo(false); }, 140);
});
$('#ord').addEventListener('change', e => { ordem.v = e.target.value; desenhar(); });
document.querySelectorAll('[data-faixa]').forEach(b => b.addEventListener('click', () => {
  filtro.faixa = b.dataset.faixa.split(','); filtro.tam = ''; montarFiltros(); desenhar(); rolarAoCatalogo(true);
}));
/* leva a pessoa até as peças quando ela filtra ou digita lá no topo e o resultado estaria fora da tela */
function rolarAoCatalogo(sempre) {
  const g = $('#catalogo').getBoundingClientRect();
  if (sempre || g.top > innerHeight * 0.55 || g.bottom < 0) $('#catalogo').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}

/* ---------- cartão da peça ---------- */
function cartao(p, { selo = false } = {}) {
  let corAtual = p.cores[0];
  const foto = el('img', { src: miniatura(capa(p)), alt: p.nome, width: 480, height: 640, loading: 'lazy', decoding: 'async' });
  foto.addEventListener('error', () => { const orig = capa(p, corAtual); if (foto.getAttribute('src') !== orig) foto.src = orig; });
  const abrir = el('button', { class: 'peca-foto', type: 'button', 'aria-label': 'Ver ' + p.nome, onclick: () => abrirPeca(p, corAtual) },
    foto, selo ? el('span', { class: 'selo-novo', text: 'Novo' }) : null);
  const cores = p.cores.length > 1 ? el('div', { class: 'cores', role: 'group', 'aria-label': 'Cores de ' + p.nome },
    p.cores.map((c, i) => el('button', {
      class: 'cor', type: 'button', style: '--c:' + (c.hex || '#ccc'), 'aria-label': c.nome, title: c.nome, 'aria-pressed': String(i === 0),
      onclick: ev => { corAtual = c; foto.src = miniatura(capa(p, c)); ev.currentTarget.parentElement.querySelectorAll('.cor').forEach(b => b.setAttribute('aria-pressed', String(b === ev.currentTarget))); }
    }))) : null;
  const tams = tamanhosDaPeca(p);
  /* atalho: peça com 1 cor e 1 tamanho entra direto na sacola; as demais abrem a página para escolher */
  const direto = p.cores.length === 1 && tams.length === 1;
  const rotuloAdd = direto ? 'Adicionar à sacola' : 'Escolher tamanho';
  const add = !tams.length
    ? el('a', { class: 'peca-add botao secundario', href: zap(`Olá, Mimo Kids Presentes! Quero saber quando a peça ${p.nome}${p.codigo ? ' (' + cod(p) + ')' : ''} voltar ao estoque.`), target: '_blank', rel: 'noopener noreferrer', text: 'Avise-me quando chegar' })
    : el('button', { class: 'peca-add botao', type: 'button', 'aria-label': rotuloAdd + ': ' + p.nome, onclick: ev => {
      if (!direto) { abrirPeca(p, corAtual); return; }
      adicionar(p, p.cores[0], tams[0], 1);
      const b = ev.currentTarget; b.textContent = 'Adicionada à sacola'; b.classList.add('feito'); avisarLeitor(p.nome + ' adicionada à sacola.');
      setTimeout(() => { b.textContent = rotuloAdd; b.classList.remove('feito'); }, 1800);
    }, text: rotuloAdd });
  return el('article', { class: 'peca', 'data-genero': p.genero || '', onclick: ev => { if (ev.target.closest('.peca-nome,.peca-preco,.peca-meta,.peca-promo')) abrirPeca(p, corAtual); } }, abrir, cores,
    el('h3', { class: 'peca-nome', text: p.nome }),
    el('p', { class: 'peca-preco', text: BRL(p.preco) }),
    el('p', { class: 'peca-meta', text: [cod(p), tams.length ? 'tam. ' + tams.map(capitaliza).join(' · ') : 'esgotado'].filter(Boolean).join(' · ') }),
    p.promo ? el('span', { class: 'peca-promo', text: `Leve ${p.promo.qtd} por ${BRL(p.promo.total)}` }) : null, add);
}

function desenharVitrine() {
  const cats = [...new Set(PECAS.map(p => p.categoria).filter(Boolean))];
  const temCats = cats.length >= 2;
  const menu = $('#menu');
  menu.hidden = !temCats;
  menu.replaceChildren(...(temCats ? [{ rotulo: 'Tudo', valor: '' }, ...cats.map(c => ({ rotulo: c, valor: c }))].map((x, i) =>
    el('button', { type: 'button', class: 'menu-item', 'data-tom': ['sol', 'rosa', 'azul', 'rosa'][i % 4], 'data-cat': x.valor, 'aria-pressed': String(filtro.cat === x.valor), onclick: () => irParaCategoria(x.valor) },
      icone(x.valor ? iconeCategoria(x.valor) : 'tudo'), el('span', { text: x.rotulo }))) : []));
  const cg = $('#cat-grade');
  $('#categorias').hidden = !temCats;
  cg.replaceChildren(...(temCats ? cats.slice(0, 4).map((c, i) => {
    const p = PECAS.find(x => x.categoria === c);
    return el('button', { type: 'button', class: 'cat-quadro cq' + (i % 4), onclick: () => irParaCategoria(c) },
      el('span', { class: 'cat-foto' }, el('img', { src: miniatura(capa(p)), alt: '', loading: 'lazy', width: 480, height: 640, onerror: ev => { if (ev.target.getAttribute('src') !== capa(p)) ev.target.src = capa(p); } })), el('span', { class: 'cat-nome', text: c }));
  }) : []));
  const ovos = $('#ovos');
  ovos.replaceChildren(...PECAS.slice(0, 2).map((p, i) =>
    el('button', { class: 'foto-topo ft' + (i + 1), type: 'button', 'aria-label': 'Ver ' + p.nome, onclick: () => abrirPeca(p) }, el('img', { src: miniatura(capa(p)), alt: '', width: 480, height: 640, onerror: ev => { if (ev.target.getAttribute('src') !== capa(p)) ev.target.src = capa(p); } }))));
}
function irParaCategoria(c) {
  filtro.cat = c; montarFiltros(); desenhar();
  $('#catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function filtrar() {
  const b = norm(filtro.busca.trim());
  const lista = PECAS.filter(p => {
    const livres = tamanhosDaPeca(p);
    return (!filtro.tam || livres.includes(filtro.tam)) && (!filtro.faixa || filtro.faixa.some(t => livres.includes(t))) &&
      (!filtro.cat || p.categoria === filtro.cat) && (!filtro.gen || p.genero === filtro.gen || p.genero === 'unissex') &&
      (!filtro.ate || p.preco <= filtro.ate) && (!b || norm(p.nome + ' ' + (p.codigo || '') + ' ' + p.cores.map(c => c.nome).join(' ')).includes(b));
  });
  const por = { menor: (x, y) => x.preco - y.preco, maior: (x, y) => y.preco - x.preco }[ordem.v];
  /* peças esgotadas vão para o fim; dentro de cada grupo vale a ordem escolhida (ou a mais nova primeiro) */
  return lista.map((p, i) => [p, i]).sort(([x, i], [y, j]) => (tamanhosDaPeca(x).length ? 0 : 1) - (tamanhosDaPeca(y).length ? 0 : 1) || (por ? por(x, y) : 0) || i - j).map(a => a[0]);
}

const PAGINA = 24;
let limite = PAGINA, jaDesenhou = false;
function desenhar({ manterLimite = false } = {}) {
  if (!manterLimite) limite = PAGINA;
  const lista = filtrar();
  const filtrando = temFiltro();
  const grade = $('#grade');
  grade.replaceChildren(...lista.slice(0, limite).map(p => cartao(p, { selo: !filtrando && eNova(p) })));
  /* depois da primeira vez os cartões já nascem visíveis: sem piscar a cada letra da busca */
  if (jaDesenhou) grade.querySelectorAll('.peca').forEach(n => { n.classList.add('visto'); n.dataset.obs = '1'; });
  jaDesenhou = true;
  document.querySelectorAll('.menu-item').forEach(b => b.setAttribute('aria-pressed', String((b.dataset.cat || '') === filtro.cat)));
  const mais = $('#mais');
  mais.hidden = lista.length <= limite;
  mais.textContent = `Ver mais peças (${lista.length - limite})`;
  $('#contagem').textContent = PECAS.length ? `${lista.length} ${lista.length === 1 ? 'peça' : 'peças'}` + (filtro.faixa ? ` · tamanhos ${filtro.faixa.join(' e ')}` : '') : '';
  const vazio = $('#vazio');
  vazio.hidden = lista.length > 0;
  if (!lista.length) {
    const zero = !PECAS.length;
    const acao = $('#vazio-acao');
    if (ERRO) {
      $('#vazio-titulo').textContent = 'Não conseguimos carregar as peças agora';
      $('#vazio-texto').textContent = 'Confira a sua conexão e tente de novo. Se preferir, é só chamar a gente no WhatsApp.';
      acao.textContent = 'Tentar de novo'; acao.removeAttribute('target'); acao.href = '#';
      acao.onclick = e => { e.preventDefault(); carregar(); };
    } else {
      $('#vazio-titulo').textContent = zero ? 'Novidades chegando' : 'Nada por aqui ainda';
      $('#vazio-texto').textContent = zero ? 'Estamos preparando as primeiras peças. Acompanhe os lançamentos no Instagram ou peça pelo WhatsApp.' : 'Nenhuma peça combina com esses filtros. Que tal tirar um deles?';
      acao.textContent = zero ? 'Ver no Instagram' : 'Limpar filtros';
      acao.href = zero ? 'https://www.instagram.com/' + (CFG.instagram || '') + '/' : '#';
      if (zero) { acao.target = '_blank'; } else acao.removeAttribute('target');
      acao.onclick = zero ? null : e => { e.preventDefault(); $('#limpar').click(); };
    }
  }
}
$('#mais').addEventListener('click', () => {
  const antes = limite; limite += PAGINA; desenhar({ manterLimite: true });
  const novo = $('#grade').querySelectorAll('.peca-foto')[antes]; if (novo) novo.focus({ preventScroll: true });
});

/* ---------- diálogos: o botão Voltar do celular fecha a peça/sacola em vez de sair do site ---------- */
const dlgPeca = $('#peca');
const dlgSacola = $('#sacola');
let histAberto = false;
function abrirDlg(d, hash) {
  if (!d.open) d.showModal();
  if (histAberto) history.replaceState({ mimo: 1 }, '', hash);
  else { history.pushState({ mimo: 1 }, '', hash); histAberto = true; }
}
[dlgPeca, dlgSacola].forEach(d => d.addEventListener('close', () => {
  if (histAberto && !dlgPeca.open && !dlgSacola.open) { histAberto = false; history.back(); }
}));
addEventListener('popstate', () => {
  const abertos = [dlgPeca, dlgSacola].filter(d => d.open);
  if (abertos.length) { histAberto = false; abertos.forEach(d => d.close()); }
});
/* toque fora da caixa (no fundo escuro) fecha; toque numa área vazia dentro do diálogo não */
const foraDe = (d, e) => { const r = d.getBoundingClientRect(); return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom; };
[dlgPeca, dlgSacola].forEach(d => d.addEventListener('click', e => { if (e.target === d && foraDe(d, e)) d.close(); }));

/* ---------- página da peça ---------- */
let atual = null, corSel = null, tamSel = '', qtdSel = 1;
const idCurto = p => String(p.codigo || p.id).toLowerCase();
const urlPeca = p => location.origin + '/p/' + idCurto(p) + '.html';

function abrirPeca(p, cor) {
  atual = p; corSel = cor && p.cores.includes(cor) ? cor : p.cores[0]; tamSel = ''; qtdSel = 1;
  $('#peca-nome').textContent = p.nome;
  $('#p-codigo').textContent = cod(p);
  $('#p-preco').textContent = BRL(p.preco);
  const promo = $('#p-promo');
  promo.hidden = !p.promo;
  if (p.promo) promo.textContent = `Leve ${p.promo.qtd} por ${BRL(p.promo.total)}` + (p.promo.grupo ? ' (pode misturar modelos da mesma linha)' : '');
  $('#p-desc').textContent = limpaTexto(p.descricao);
  $('#p-cores-bloco').hidden = p.cores.length < 2;
  $('#p-erro').textContent = '';
  $('#p-aviso').textContent = '';
  $('#q-valor').textContent = 1;
  desenharCor(true);
  abrirDlg(dlgPeca, '#' + idCurto(p));
  dlgPeca.scrollTop = 0;
}
/* link direto: /#v01 abre a peça (quem recebe o link do WhatsApp cai direto nela) */
function abrirPorHash() {
  const h = decodeURIComponent(location.hash.slice(1)).toLowerCase();
  if (!h || h === 'catalogo' || h === 'sacola') return;
  const p = PECAS.find(x => String(x.id).toLowerCase() === h || String(x.codigo || '').toLowerCase() === h);
  if (p && !dlgPeca.open) { history.replaceState(null, '', location.pathname + location.search); abrirPeca(p); }
}

function desenharCor(resetGaleria) {
  const foco = guardarFoco();
  const c = corSel, p = atual;
  const livres = c.tamanhos.filter(t => !(c.esgotados || []).includes(t));
  if (!tamSel && livres.length === 1) tamSel = livres[0];
  $('#p-cor-nome').textContent = c.nome || '';
  $('#p-cores').replaceChildren(...p.cores.map((x, i) => el('button', {
    class: 'cor', type: 'button', style: '--c:' + (x.hex || '#ccc'), title: x.nome, 'aria-label': x.nome, 'aria-pressed': String(x === c), 'data-foco': 'peca-cor:' + i,
    onclick: () => { corSel = x; if (!x.tamanhos.includes(tamSel) || (x.esgotados || []).includes(tamSel)) tamSel = ''; desenharCor(true); }
  })));
  $('#p-tamanhos').replaceChildren(...[...c.tamanhos].sort(comparaTam).map(t => el('button', {
    class: 'tam', type: 'button', 'aria-pressed': String(t === tamSel), disabled: (c.esgotados || []).includes(t), 'data-foco': 'peca-tam:' + t,
    title: (c.esgotados || []).includes(t) ? 'Esgotado' : null, text: capitaliza(t),
    onclick: () => { tamSel = t; $('#p-erro').textContent = ''; desenharCor(false); }
  })));
  const dicas = c.tamanhos.filter(t => /^[A-Z]{1,2}$/.test(t) && dicaTamanho(t)).map(t => `${t}: ${dicaTamanho(t)}`);
  $('#tam-dica').textContent = dicas.length ? 'Tamanhos por idade: ' + dicas.join(' · ') : '';
  if (resetGaleria) desenharGaleria(0);
  devolverFoco(foco);
}
function desenharGaleria(i) {
  const fotos = corSel.fotos;
  const img = $('#g-foto');
  img.src = fotos[i]; img.alt = atual.nome + (corSel.nome ? ' ' + corSel.nome : '');
  $('#g-mini').replaceChildren(...(fotos.length > 1 ? fotos.map((f, k) => el('button', { type: 'button', 'aria-pressed': String(k === i), 'aria-label': 'Foto ' + (k + 1), onclick: () => desenharGaleria(k) }, el('img', { src: miniatura(f), alt: '', loading: 'lazy', onerror: ev => { if (ev.target.getAttribute('src') !== f) ev.target.src = f; } }))) : []));
}
$('#q-menos').addEventListener('click', () => { qtdSel = Math.max(1, qtdSel - 1); $('#q-valor').textContent = qtdSel; });
$('#q-mais').addEventListener('click', () => { qtdSel = Math.min(20, qtdSel + 1); $('#q-valor').textContent = qtdSel; });
$('#p-add').addEventListener('click', () => {
  if (!tamSel) { $('#p-erro').textContent = 'Escolha um tamanho para continuar.'; return; }
  adicionar(atual, corSel, tamSel, qtdSel);
  dlgPeca.close();
  abrirSacola();
});
$('#peca-fechar').addEventListener('click', () => dlgPeca.close());
$('#p-compartilhar').addEventListener('click', async () => {
  const url = urlPeca(atual), texto = `${atual.nome}, ${BRL(atual.preco)} | Mimo Kids Presentes`;
  if (navigator.share) {
    try { await navigator.share({ title: atual.nome, text: texto, url }); return; } catch (e) { if (e && e.name === 'AbortError') return; }
  }
  try { await navigator.clipboard.writeText(url); $('#p-aviso').textContent = 'Link copiado. É só colar na conversa.'; }
  catch { window.prompt('Copie o link da peça:', url); }
});

/* ---------- sacola ---------- */
let sacola = [];
try { sacola = JSON.parse(localStorage.getItem('mimo-sacola-v2') || '[]'); if (!Array.isArray(sacola)) sacola = []; } catch { sacola = []; }
const salvar = () => { try { localStorage.setItem('mimo-sacola-v2', JSON.stringify(sacola)); } catch { /* sem armazenamento: segue em memória */ } };

function adicionar(p, cor, tam, qtd) {
  const ex = sacola.find(x => x.id === String(p.id) && x.cor === cor.nome && x.tam === tam);
  if (ex) ex.qtd = Math.min(20, ex.qtd + qtd); else sacola.push({ id: String(p.id), cor: cor.nome, tam, qtd });
  atualizarSacola();
}

function calcular() {
  let subtotal = 0, desconto = 0, falta = null;
  const grupos = new Map();
  sacola.forEach(x => {
    const p = porId.get(x.id); if (!p) return;
    subtotal += x.qtd * p.preco;
    if (p.promo) { const k = p.promo.grupo || 'p' + p.id; const g = grupos.get(k) || { promo: p.promo, qtd: 0, valor: 0 }; g.qtd += x.qtd; g.valor += x.qtd * p.preco; grupos.set(k, g); }
  });
  grupos.forEach(g => {
    const unit = g.valor / g.qtd; const pago = Math.floor(g.qtd / g.promo.qtd) * g.promo.total + (g.qtd % g.promo.qtd) * unit; desconto += Math.max(0, g.valor - pago);
    if (!falta && g.qtd % g.promo.qtd !== 0) falta = { n: g.promo.qtd - (g.qtd % g.promo.qtd), promo: g.promo };
  });
  return { subtotal, desconto, total: subtotal - desconto, falta };
}

function atualizarSacola() {
  const foco = guardarFoco();
  sacola = sacola.filter(x => porId.has(x.id));
  salvar();
  const n = sacola.reduce((s, x) => s + x.qtd, 0);
  const qtdEl = $('#sacola-qtd');
  if (String(n) !== qtdEl.textContent && n > Number(qtdEl.textContent || 0)) { qtdEl.classList.remove('pula'); void qtdEl.offsetWidth; qtdEl.classList.add('pula'); }
  qtdEl.textContent = n;
  $('#sacola-qtd').hidden = n === 0;
  $('#sacola-btn').setAttribute('aria-label', `Abrir sacola, ${n} ${n === 1 ? 'item' : 'itens'}`);
  $('#sacola-vazia').hidden = n > 0;
  $('#sacola-itens').replaceChildren(...sacola.map((x, i) => {
    const p = porId.get(x.id); const cor = p.cores.find(c => c.nome === x.cor) || p.cores[0];
    const muda = d => () => { x.qtd = Math.min(20, Math.max(1, x.qtd + d)); atualizarSacola(); };
    return el('div', { class: 'item' },
      el('img', { src: miniatura(capa(p, cor)), alt: '', loading: 'lazy', onerror: ev => { if (ev.target.getAttribute('src') !== capa(p, cor)) ev.target.src = capa(p, cor); } }),
      el('div', {}, el('strong', { text: p.nome }), el('small', { text: [corUtil(p, x.cor), 'tam. ' + capitaliza(x.tam), cod(p)].filter(Boolean).join(' · ') }),
        el('div', { class: 'qtd' }, el('button', { type: 'button', 'data-foco': 'menos:' + i, 'aria-label': 'Diminuir quantidade de ' + p.nome, disabled: x.qtd <= 1, onclick: muda(-1), text: '−' }), el('output', { text: x.qtd }), el('button', { type: 'button', 'data-foco': 'mais:' + i, 'aria-label': 'Aumentar quantidade de ' + p.nome, disabled: x.qtd >= 20, onclick: muda(1), text: '+' }))),
      el('div', { class: 'item-fim' }, el('strong', { text: BRL(x.qtd * p.preco) }), el('br'), el('button', { class: 'remover', type: 'button', 'aria-label': 'Remover ' + p.nome, onclick: () => { sacola.splice(i, 1); atualizarSacola(); if (!sacola.length) $('#sacola-fechar').focus(); } }, icone('remover'), el('span', { text: 'Remover' }))));
  }));
  const { desconto, total, falta } = calcular();
  $('#sacola-rodape').hidden = n === 0;
  $('#sacola-desconto').hidden = desconto <= 0;
  $('#sacola-desconto').textContent = 'Promoção aplicada: −' + BRL(desconto);
  $('#sacola-total').textContent = BRL(total);
  $('#sacola-extras').hidden = n === 0;
  /* dicas que ajudam a fechar: falta pouco para a promoção ou para a entrega grátis (só vale para a cidade da loja) */
  const dicaPromo = $('#dica-promo');
  dicaPromo.hidden = !falta;
  if (falta) dicaPromo.textContent = `Falta${falta.n > 1 ? 'm' : ''} ${falta.n} para a promoção: leve ${falta.promo.qtd} por ${BRL(falta.promo.total)}.`;
  const dicaFrete = $('#dica-frete');
  dicaFrete.hidden = !CFG.freteGratisAcima || n === 0;
  if (CFG.freteGratisAcima) {
    const cidade = CFG.freteGratisCidade ? ' em ' + CFG.freteGratisCidade : '';
    dicaFrete.textContent = (total >= CFG.freteGratisAcima ? `Entrega grátis${cidade}!` : `Faltam ${BRL(CFG.freteGratisAcima - total)} para a entrega grátis${cidade}.`) + ' Em outras cidades, combinamos o frete pelo WhatsApp.';
  }
  atualizarPedido();
  devolverFoco(foco);
}

function abrirSacola() { atualizarSacola(); abrirDlg(dlgSacola, '#sacola'); }
$('#sacola-btn').addEventListener('click', abrirSacola);
$('#sacola-fechar').addEventListener('click', () => dlgSacola.close());

function mensagem() {
  const { desconto, total } = calcular();
  const linhas = sacola.map(x => { const p = porId.get(x.id); return `• ${p.nome}${p.codigo ? ' (' + cod(p).replace('Cód.', 'cód.') + ')' : ''}${corUtil(p, x.cor) ? ' | Cor: ' + corUtil(p, x.cor) : ''} | Tamanho: ${capitaliza(x.tam)} | Quantidade: ${x.qtd}`; });
  let m = 'Olá, Mimo Kids Presentes! Já escolhi os meus mimos pelo site.\n\nPedido:\n' + linhas.join('\n');
  if (desconto > 0) m += `\n\nPromoção aplicada: desconto de ${BRL(desconto)}.`;
  m += `\nTotal: ${BRL(total)}`;
  const cidade = $('#cidade').value.trim();
  if (cidade) m += '\n\nCidade e bairro: ' + cidade;
  const obs = $('#obs').value.trim();
  if (obs) m += '\n\nObservações: ' + obs;
  return m + '\n\nPor favor, confirme a disponibilidade, tamanho e valor do meu pedido.';
}
/* o botão do WhatsApp já nasce com a mensagem pronta e acompanha cada mudança na sacola, na cidade e nas observações */
function atualizarPedido() {
  if (!sacola.length) return;
  const texto = mensagem();
  $('#pedido-texto').value = texto;
  const valido = /^55\d{10,11}$/.test(CFG.whatsapp || '');
  $('#whats').hidden = !valido;
  if (valido) $('#whats').href = zap(texto);
}
$('#obs').addEventListener('input', atualizarPedido);
$('#cidade').addEventListener('input', atualizarPedido);
$('#copiar').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('#pedido-texto').value); $('#previa-nota').textContent = 'Mensagem copiada.'; }
  catch { $('#pedido-texto').select(); $('#previa-nota').textContent = 'Selecione e copie o texto acima.'; }
});

/* entrada suave dos cartões ao rolar (conteúdo visível por padrão; só anima se o navegador permitir) */
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('anima');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  new MutationObserver(() => document.querySelectorAll('.peca:not([data-obs]),.cat-quadro:not([data-obs]),.fato:not([data-obs])').forEach(n => { n.dataset.obs = '1'; io.observe(n); }))
    .observe(document.body, { childList: true, subtree: true });
}
/* botão flutuante de voltar ao topo: aparece depois de rolar */
const vt = $('#voltar-topo');
addEventListener('scroll', () => vt.classList.toggle('mostra', scrollY > 700), { passive: true });
vt.addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); });
carregar();
