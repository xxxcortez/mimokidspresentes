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

let CFG = {}, PECAS = [];
const filtro = { tam: '', cat: '', gen: '', busca: '' };
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
  try {
    const r = await fetch('produtos.json', { cache: 'no-cache' });
    dados = await r.json();
  } catch { dados = { config: {}, produtos: [] }; }
  CFG = dados.config || {};
  PECAS = (dados.produtos || []).filter(p => p && p.cores && p.cores.length && p.cores[0].fotos && p.cores[0].fotos.length)
    .sort((a, b) => String(b.criado || '').localeCompare(String(a.criado || '')) || String(b.id).localeCompare(String(a.id)));
  PECAS.forEach(normalizarPeca);
  PECAS.forEach(p => porId.set(String(p.id), p));
  configurar();
  montarFiltros();
  desenhar();
  atualizarSacola();
}

function configurar() {
  const fmt = v => BRL(Number(v)).replace(',00', '');
  const avisos = [];
  if (CFG.freteGratisAcima) avisos.push(`Entrega grátis${CFG.freteGratisCidade ? ' em ' + CFG.freteGratisCidade : ''} acima de ${fmt(CFG.freteGratisAcima)} reais`);
  if (CFG.brinde) avisos.push(`Compras acima de ${fmt(CFG.brinde.acima)} ganham ${CFG.brinde.texto}`);
  const aviso = $('#aviso');
  if (avisos.length) { aviso.replaceChildren(...avisos.map(a => el('span', { text: a }))); aviso.hidden = false; }
  document.querySelectorAll('.frete-valor').forEach(n => n.textContent = fmt(CFG.freteGratisAcima || 30) + ' reais');
  document.querySelectorAll('.frete-cidade').forEach(n => n.textContent = CFG.freteGratisCidade ? ' em ' + CFG.freteGratisCidade : '');
  document.querySelectorAll('.parcelas-valor, #parcelas').forEach(n => n.textContent = CFG.parcelasCartao || 12);
  document.querySelectorAll('[data-rede]').forEach(n => { n.href = { whats: CFG.whatsapp && 'https://wa.me/' + CFG.whatsapp, insta: CFG.instagram && 'https://www.instagram.com/' + CFG.instagram + '/', tiktok: CFG.tiktok && 'https://www.tiktok.com/@' + CFG.tiktok }[n.dataset.rede] || '#'; });
  if (CFG.whatsapp) { $('#l-whats').href = 'https://wa.me/' + CFG.whatsapp; $('#l-whats-presente').href = 'https://wa.me/' + CFG.whatsapp; }
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
function chip(rotulo, ativo, aoClicar, { ic = null, tom = 'azul' } = {}) {
  return el('button', { class: 'chip', 'data-tom': tom, type: 'button', 'aria-pressed': String(ativo), onclick: aoClicar }, icone(ic), el('span', { text: rotulo }));
}
function montarFiltros() {
  const grupo = (id, valores, chave, rotular = v => v, nome = '', estilo = () => ({}), estiloTodos = {}) => {
    const box = $(id);
    box.replaceChildren();
    if (valores.length < 2) { box.hidden = true; return; }
    box.hidden = false;
    box.append(el('span', { class: 'grupo-rotulo', text: nome }), chip('Todos', !filtro[chave], () => { filtro[chave] = ''; montarFiltros(); desenhar(); }, estiloTodos),
      ...valores.map(v => chip(rotular(v), filtro[chave] === v, () => { filtro[chave] = filtro[chave] === v ? '' : v; montarFiltros(); desenhar(); }, estilo(v))));
  };
  const tams = [...new Set(PECAS.flatMap(todosTamanhos))].sort(comparaTam);
  grupo('#f-tam', tams, 'tam', t => 'Tam. ' + capitaliza(t), 'Tamanho');
  grupo('#f-gen', [...new Set(PECAS.map(p => p.genero).filter(Boolean))], 'gen', g => GENEROS[g] || g, 'Para', g => ({ ic: ICONE_GEN[g], tom: TOM_GEN[g] || 'azul' }), { ic: 'tudo', tom: 'sol' });
  $('#limpar').hidden = !Object.values(filtro).some(Boolean);
  $('#filtros').hidden = !['#f-tam', '#f-cat', '#f-gen'].some(id => !$(id).hidden) && !Object.values(filtro).some(Boolean);
}
$('#limpar').addEventListener('click', () => { Object.keys(filtro).forEach(k => filtro[k] = ''); $('#busca').value = ''; montarFiltros(); desenhar(); });
$('#busca').addEventListener('input', e => { filtro.busca = e.target.value; $('#limpar').hidden = !Object.values(filtro).some(Boolean); desenhar(); });

/* ---------- cartão da peça ---------- */
function cartao(p, { selo = false } = {}) {
  const foto = el('img', { src: capa(p), alt: p.nome, width: 720, height: 960, loading: 'lazy', decoding: 'async' });
  const abrir = el('button', { class: 'peca-foto', type: 'button', 'aria-label': 'Ver ' + p.nome, onclick: () => abrirPeca(p) },
    foto, selo ? el('span', { class: 'selo-novo', text: 'Novo' }) : null);
  const cores = p.cores.length > 1 ? el('div', { class: 'cores', role: 'group', 'aria-label': 'Cores de ' + p.nome },
    p.cores.map((c, i) => el('button', {
      class: 'cor', type: 'button', style: '--c:' + (c.hex || '#ccc'), 'aria-label': c.nome, title: c.nome, 'aria-pressed': String(i === 0),
      onclick: ev => { foto.src = capa(p, c); ev.currentTarget.parentElement.querySelectorAll('.cor').forEach(b => b.setAttribute('aria-pressed', String(b === ev.currentTarget))); }
    }))) : null;
  const tams = tamanhosDaPeca(p);
  /* atalho: peça com 1 cor e 1 tamanho entra direto na sacola; as demais abrem a página para escolher */
  const direto = p.cores.length === 1 && tams.length === 1;
  const add = el('button', { class: 'peca-add botao', type: 'button', 'aria-label': 'Adicionar ' + p.nome + ' à sacola', disabled: !tams.length, onclick: ev => {
    if (!direto) { abrirPeca(p); return; }
    adicionar(p, p.cores[0], tams[0], 1);
    const b = ev.currentTarget; b.textContent = 'Adicionada à sacola'; b.classList.add('feito');
    setTimeout(() => { b.textContent = 'Adicionar à sacola'; b.classList.remove('feito'); }, 1800);
  }, text: tams.length ? 'Adicionar à sacola' : 'Esgotado' });
  return el('article', { class: 'peca', 'data-genero': p.genero || '', onclick: ev => { if (ev.target.closest('.peca-nome,.peca-preco,.peca-meta,.peca-promo')) abrirPeca(p); } }, abrir, cores,
    el('h3', { class: 'peca-nome', text: p.nome }),
    el('p', { class: 'peca-preco', text: BRL(p.preco) }),
    el('p', { class: 'peca-meta', text: [p.codigo ? 'cod. ' + p.codigo.toLowerCase() : '', tams.length ? 'tam. ' + tams.map(capitaliza).join(' · ') : 'esgotado'].filter(Boolean).join(' · ') }),
    p.promo ? el('span', { class: 'peca-promo', text: `Leve ${p.promo.qtd} por ${BRL(p.promo.total)}` }) : null, add);
}

function desenharVitrine() {
  const cats = [...new Set(PECAS.map(p => p.categoria).filter(Boolean))];
  const temCats = cats.length >= 2;
  const menu = $('#menu');
  menu.hidden = !temCats;
  menu.replaceChildren(...(temCats ? [{ rotulo: 'Tudo', valor: '' }, ...cats.map(c => ({ rotulo: c, valor: c }))].map((x, i) =>
    el('button', { type: 'button', class: 'menu-item', 'data-tom': ['sol', 'rosa', 'azul', 'rosa'][i % 4], 'aria-pressed': String(filtro.cat === x.valor), onclick: () => irParaCategoria(x.valor) },
      icone(x.valor ? iconeCategoria(x.valor) : 'tudo'), el('span', { text: x.rotulo }))) : []));
  const cg = $('#cat-grade');
  $('#categorias').hidden = !temCats;
  cg.replaceChildren(...(temCats ? cats.slice(0, 4).map((c, i) => {
    const p = PECAS.find(x => x.categoria === c);
    return el('button', { type: 'button', class: 'cat-quadro cq' + (i % 4), onclick: () => irParaCategoria(c) },
      el('span', { class: 'cat-foto' }, el('img', { src: capa(p), alt: '', loading: 'lazy', width: 720, height: 960 })), el('span', { class: 'cat-nome', text: c }));
  }) : []));
  const ovos = $('#ovos');
  if (!ovos.childElementCount) ovos.replaceChildren(...PECAS.slice(0, 2).map((p, i) =>
    el('div', { class: 'foto-topo ft' + (i + 1) }, el('img', { src: capa(p), alt: '', width: 720, height: 960 }))));
}
function irParaCategoria(c) {
  filtro.cat = c; montarFiltros(); desenhar();
  $('#catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function filtrar() {
  const b = norm(filtro.busca.trim());
  return PECAS.filter(p => (!filtro.tam || todosTamanhos(p).includes(filtro.tam)) && (!filtro.cat || p.categoria === filtro.cat) &&
    (!filtro.gen || p.genero === filtro.gen) && (!b || norm(p.nome + ' ' + (p.codigo || '') + ' ' + p.cores.map(c => c.nome).join(' ')).includes(b)));
}

function desenhar() {
  const lista = filtrar();
  const filtrando = Object.values(filtro).some(Boolean);
  $('#grade').replaceChildren(...lista.map((p, i) => cartao(p, { selo: !filtrando && i < 3 })));
  $('#contagem').textContent = PECAS.length ? `${lista.length} ${lista.length === 1 ? 'peça' : 'peças'}` : '';
  desenharVitrine();
  const vazio = $('#vazio');
  vazio.hidden = lista.length > 0;
  if (!lista.length) {
    const zero = !PECAS.length;
    $('#vazio-titulo').textContent = zero ? 'Novidades chegando' : 'Nada por aqui ainda';
    $('#vazio-texto').textContent = zero ? 'Estamos preparando as primeiras peças. Acompanhe os lançamentos no Instagram ou peça pelo WhatsApp.' : 'Nenhuma peça combina com esses filtros. Que tal tirar um deles?';
    const acao = $('#vazio-acao');
    acao.textContent = zero ? 'Ver no Instagram' : 'Limpar filtros';
    acao.href = zero ? 'https://www.instagram.com/' + (CFG.instagram || '') + '/' : '#';
    acao.onclick = zero ? null : e => { e.preventDefault(); $('#limpar').click(); };
  }
}

/* ---------- página da peça ---------- */
const dlgPeca = $('#peca');
let atual = null, corSel = null, tamSel = '', qtdSel = 1;

function abrirPeca(p) {
  atual = p; corSel = p.cores[0]; tamSel = ''; qtdSel = 1;
  $('#peca-nome').textContent = p.nome;
  $('#p-codigo').textContent = p.codigo ? 'cod. ' + p.codigo.toLowerCase() : '';
  $('#p-preco').textContent = BRL(p.preco);
  const promo = $('#p-promo');
  promo.hidden = !p.promo;
  if (p.promo) promo.textContent = `Leve ${p.promo.qtd} por ${BRL(p.promo.total)}` + (p.promo.grupo ? ' (pode misturar modelos da mesma linha)' : '');
  $('#p-desc').textContent = limpaTexto(p.descricao);
  $('#p-cores-bloco').hidden = p.cores.length < 2;
  $('#p-erro').textContent = '';
  $('#q-valor').textContent = 1;
  desenharCor();
  dlgPeca.showModal();
  dlgPeca.scrollTop = 0;
}

function desenharCor() {
  const c = corSel, p = atual;
  const livres = c.tamanhos.filter(t => !(c.esgotados || []).includes(t));
  if (!tamSel && livres.length === 1) tamSel = livres[0];
  $('#p-cor-nome').textContent = c.nome || '';
  $('#p-cores').replaceChildren(...p.cores.map(x => el('button', {
    class: 'cor', type: 'button', style: '--c:' + (x.hex || '#ccc'), title: x.nome, 'aria-label': x.nome, 'aria-pressed': String(x === c),
    onclick: () => { corSel = x; if (!x.tamanhos.includes(tamSel) || (x.esgotados || []).includes(tamSel)) tamSel = ''; desenharCor(); }
  })));
  $('#p-tamanhos').replaceChildren(...[...c.tamanhos].sort(comparaTam).map(t => el('button', {
    class: 'tam', type: 'button', 'aria-pressed': String(t === tamSel), disabled: (c.esgotados || []).includes(t),
    title: (c.esgotados || []).includes(t) ? 'Esgotado' : null, text: capitaliza(t),
    onclick: () => { tamSel = t; $('#p-erro').textContent = ''; desenharCor(); }
  })));
  const dicas = c.tamanhos.filter(t => /^[A-Z]{1,2}$/.test(t) && dicaTamanho(t)).map(t => `${t}: ${dicaTamanho(t)}`);
  $('#tam-dica').textContent = dicas.length ? 'Tamanhos por idade: ' + dicas.join(' · ') : '';
  desenharGaleria(0);
}
let galIdx = 0;
function desenharGaleria(i) {
  galIdx = i;
  const fotos = corSel.fotos;
  const img = $('#g-foto');
  img.src = fotos[i]; img.alt = atual.nome + (corSel.nome ? ' ' + corSel.nome : '');
  $('#g-mini').replaceChildren(...(fotos.length > 1 ? fotos.map((f, k) => el('button', { type: 'button', 'aria-pressed': String(k === i), 'aria-label': 'Foto ' + (k + 1), onclick: () => desenharGaleria(k) }, el('img', { src: f, alt: '', loading: 'lazy' }))) : []));
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
dlgPeca.addEventListener('click', e => { if (e.target === dlgPeca) dlgPeca.close(); });

/* ---------- zoom da foto (tela cheia, ampliar, arrastar, trocar de foto) ---------- */
const dlgZoom = $('#zoom'), zImg = $('#zoom-img'), zPalco = $('#zoom-palco');
let zFotos = [], zIdx = 0, zEsc = 1, zx = 0, zy = 0;
const ZMAX = 4;
function zAplicar() {
  const w = zPalco.clientWidth, h = zPalco.clientHeight, fw = zImg.clientWidth, fh = zImg.clientHeight;
  const mx = Math.max(0, (fw * zEsc - w) / 2), my = Math.max(0, (fh * zEsc - h) / 2);
  zx = Math.min(mx, Math.max(-mx, zx)); zy = Math.min(my, Math.max(-my, zy));
  zImg.style.transform = `translate(${zx}px, ${zy}px) scale(${zEsc})`;
  zPalco.classList.toggle('ampliado', zEsc > 1.01);
  $('#zoom-nivel').textContent = Math.round(zEsc * 100) + '%';
  $('#zoom-menos').disabled = zEsc <= 1.01; $('#zoom-mais').disabled = zEsc >= ZMAX - 0.01;
}
function zZoom(novo, cx = 0, cy = 0) {
  novo = Math.min(ZMAX, Math.max(1, novo));
  zx = cx - (cx - zx) * (novo / zEsc); zy = cy - (cy - zy) * (novo / zEsc);
  zEsc = novo; if (zEsc <= 1.01) { zEsc = 1; zx = zy = 0; }
  zAplicar();
}
function zMostrar(i) {
  zIdx = (i + zFotos.length) % zFotos.length; zEsc = 1; zx = zy = 0;
  zImg.src = zFotos[zIdx]; zImg.alt = atual.nome + (corSel.nome ? ' ' + corSel.nome : '') + ', foto ' + (zIdx + 1);
  $('#zoom-leg').textContent = zFotos.length > 1 ? `${zIdx + 1} de ${zFotos.length}` : '';
  $('#zoom-ant').hidden = $('#zoom-prox').hidden = zFotos.length < 2;
  zAplicar();
}
function abrirZoom() {
  zFotos = corSel.fotos; if (!zFotos.length) return;
  dlgZoom.showModal(); zMostrar(galIdx);
}
$('#g-principal').addEventListener('click', abrirZoom);
$('#zoom-fechar').addEventListener('click', () => dlgZoom.close());
dlgZoom.addEventListener('close', () => { if (atual && dlgPeca.open) desenharGaleria(zIdx); });
$('#zoom-ant').addEventListener('click', () => zMostrar(zIdx - 1));
$('#zoom-prox').addEventListener('click', () => zMostrar(zIdx + 1));
$('#zoom-mais').addEventListener('click', () => zZoom(zEsc * 1.5));
$('#zoom-menos').addEventListener('click', () => zZoom(zEsc / 1.5));
dlgZoom.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') zMostrar(zIdx - 1); else if (e.key === 'ArrowRight') zMostrar(zIdx + 1);
  else if (e.key === '+' || e.key === '=') zZoom(zEsc * 1.5); else if (e.key === '-') zZoom(zEsc / 1.5);
});
const ptrs = new Map(); let arrasto = null, dist0 = 0, esc0 = 1;
const centro = ev => { const r = zPalco.getBoundingClientRect(); return [ev.clientX - r.left - r.width / 2, ev.clientY - r.top - r.height / 2]; };
zPalco.addEventListener('pointerdown', e => {
  zPalco.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, e);
  if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; dist0 = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); esc0 = zEsc; arrasto = null; }
  else arrasto = { x: e.clientX, y: e.clientY, zx, zy, mexeu: false };
});
zPalco.addEventListener('pointermove', e => {
  if (!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, e);
  if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; zZoom(esc0 * Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY) / dist0); return; }
  if (!arrasto) return;
  const dx = e.clientX - arrasto.x, dy = e.clientY - arrasto.y;
  if (Math.hypot(dx, dy) > 6) arrasto.mexeu = true;
  if (zEsc > 1.01) { zx = arrasto.zx + dx; zy = arrasto.zy + dy; zAplicar(); }
});
zPalco.addEventListener('pointerup', e => {
  const era = arrasto; ptrs.delete(e.pointerId); if (ptrs.size) return; arrasto = null;
  if (!era) return;
  const dx = e.clientX - era.x;
  if (zEsc <= 1.01 && Math.abs(dx) > 60 && zFotos.length > 1) { zMostrar(zIdx + (dx < 0 ? 1 : -1)); return; }   // deslizar troca de foto
  if (!era.mexeu) { const [cx, cy] = centro(e); zZoom(zEsc > 1.01 ? 1 : 2.5, cx, cy); }                             // toque alterna 100% / 250%
});
zPalco.addEventListener('pointercancel', e => { ptrs.delete(e.pointerId); arrasto = null; });
zPalco.addEventListener('wheel', e => { e.preventDefault(); const [cx, cy] = centro(e); zZoom(zEsc * (e.deltaY < 0 ? 1.2 : 1 / 1.2), cx, cy); }, { passive: false });
addEventListener('resize', () => { if (dlgZoom.open) zAplicar(); });

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
  let subtotal = 0, desconto = 0;
  const grupos = new Map();
  sacola.forEach(x => {
    const p = porId.get(x.id); if (!p) return;
    subtotal += x.qtd * p.preco;
    if (p.promo) { const k = p.promo.grupo || 'p' + p.id; const g = grupos.get(k) || { promo: p.promo, qtd: 0, valor: 0 }; g.qtd += x.qtd; g.valor += x.qtd * p.preco; grupos.set(k, g); }
  });
  grupos.forEach(g => { const unit = g.valor / g.qtd; const pago = Math.floor(g.qtd / g.promo.qtd) * g.promo.total + (g.qtd % g.promo.qtd) * unit; desconto += Math.max(0, g.valor - pago); });
  return { subtotal, desconto, total: subtotal - desconto };
}

function atualizarSacola() {
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
      el('img', { src: capa(p, cor), alt: p.nome, loading: 'lazy' }),
      el('div', {}, el('strong', { text: p.nome }), el('small', { text: [corUtil(p, x.cor), 'tam. ' + capitaliza(x.tam), p.codigo ? 'cod. ' + p.codigo.toLowerCase() : ''].filter(Boolean).join(' · ') }),
        el('div', { class: 'qtd' }, el('button', { type: 'button', 'aria-label': 'Diminuir', disabled: x.qtd <= 1, onclick: muda(-1), text: '−' }), el('output', { text: x.qtd }), el('button', { type: 'button', 'aria-label': 'Aumentar', disabled: x.qtd >= 20, onclick: muda(1), text: '+' }))),
      el('div', { class: 'item-fim' }, el('strong', { text: BRL(x.qtd * p.preco) }), el('br'), el('button', { class: 'remover', type: 'button', 'aria-label': 'Remover ' + p.nome, onclick: () => { sacola.splice(i, 1); atualizarSacola(); } }, icone('remover'), el('span', { text: 'Remover' }))));
  }));
  const { desconto, total } = calcular();
  $('#sacola-totais').hidden = n === 0;
  $('#sacola-desconto').hidden = desconto <= 0;
  $('#sacola-desconto').textContent = 'Promoção aplicada: −' + BRL(desconto);
  $('#sacola-total').textContent = BRL(total);
  const brinde = $('#sacola-brinde');
  if (CFG.brinde && n) {
    brinde.hidden = false;
    brinde.textContent = total >= CFG.brinde.acima ? `Você ganhou ${CFG.brinde.texto}!` : `Faltam ${BRL(CFG.brinde.acima - total)} para ganhar ${CFG.brinde.texto}.`;
  } else brinde.hidden = true;
  $('#obs-rotulo').hidden = n === 0;
  $('#pedido').hidden = n === 0;
  $('#previa').hidden = true;
}

const dlgSacola = $('#sacola');
function abrirSacola() { atualizarSacola(); dlgSacola.showModal(); }
$('#sacola-btn').addEventListener('click', abrirSacola);
$('#sacola-fechar').addEventListener('click', () => dlgSacola.close());
dlgSacola.addEventListener('click', e => { if (e.target === dlgSacola) dlgSacola.close(); });

function mensagem() {
  const { desconto, total } = calcular();
  const linhas = sacola.map(x => { const p = porId.get(x.id); return `• ${p.nome} (cod. ${(p.codigo || '').toLowerCase()})${corUtil(p, x.cor) ? ' | Cor: ' + corUtil(p, x.cor) : ''} | Tamanho: ${capitaliza(x.tam)} | Quantidade: ${x.qtd}`; });
  let m = 'Olá, Mimo Kids Presentes! Já escolhi os meus mimos pelo site.\n\nPedido:\n' + linhas.join('\n');
  if (desconto > 0) m += `\n\nPromoção aplicada: desconto de ${BRL(desconto)}.`;
  m += `\nTotal: ${BRL(total)}`;
  if (CFG.brinde && total >= CFG.brinde.acima) m += `\n\nPromoção: compras acima de ${BRL(CFG.brinde.acima).replace(',00', '')} ganham ${CFG.brinde.texto}.`;
  const obs = $('#obs').value.trim();
  if (obs) m += '\n\nObservações: ' + obs;
  return m + '\n\nPor favor, confirme a disponibilidade, tamanho e valor do meu pedido.';
}
$('#pedido').addEventListener('click', () => {
  const texto = mensagem();
  $('#pedido-texto').value = texto;
  $('#previa').hidden = false;
  const valido = /^55\d{10,11}$/.test(CFG.whatsapp || '');
  $('#whats').hidden = !valido;
  if (valido) $('#whats').href = 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(texto);
  $('#previa').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
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
