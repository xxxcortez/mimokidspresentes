# Mimo Kids Presentes: site

Loja de moda bebê e infantil (RN ao tamanho 4). Site **estático** (sem build, sem framework), publicado no domínio
`mimokidspresentes.com.br` pelo GitHub Pages, a partir deste repositório (`main`). Não há checkout: o cliente monta a sacola e o botão
"Preparar pedido" abre o WhatsApp com a mensagem pronta (`config.whatsapp` em `produtos.json`).

## Arquivos
- `produtos.json`: **toda a vitrine**. `config` (WhatsApp, redes, frete grátis, brinde, parcelas) e `produtos` (lista). É alimentado pelo bot do Instagram
  (`/opt/mimo-pipeline`, na VM do hermes-agent): cada peça postada vira uma entrada aqui e as fotos vão para `assets/produtos/`.
- `index.html`, `style.css`, `app.js`: a página, o visual e a lógica (catálogo, filtros, cores, página da peça, sacola, mensagem do WhatsApp).
- `assets/logo.png` (logo oficial), `assets/arte/` (ilustrações geradas por IA, ver `DESIGN.md` e `/opt/mimo-pipeline/docs/ARTE-SITE.md`), `assets/fontes/` (Fredoka, OFL; Ubuntu, Ubuntu Font Licence; woff2 só com latim).

## Modelo de dados de uma peça
`{id, codigo, nome, categoria, genero, preco, promo:{qtd,total,grupo?}|null, descricao, criado, cores:[{nome, hex, fotos[], tamanhos[], esgotados[], ia?[]}]}`
- **Tamanhos**: exatamente o texto que a loja digitou ("6 MESES A 1 ANO", "P", "2"). Sem tabela de conversão. O filtro de tamanho é montado
  com o que existe no catálogo; a ordem é natural (RN, P, M, G, GG, depois por idade em meses; número puro = anos).
- **Cores**: várias cores por peça (bolinhas no cartão e na página). Cada cor tem as suas fotos e os seus tamanhos.
- **promo**: "leve N por R$ T". Sem `grupo`, vale por peça (soma de todas as cores e tamanhos); com `grupo`, mistura peças da mesma linha.
- **ia** (dentro da cor): índices das fotos criadas por IA (criança fictícia). Ao ver uma delas, a página mostra "Foto ilustrativa com modelo criado por inteligência artificial".
- Foto padrão: a do **cabide** (feed 3:4 do bot). Ordem da vitrine: `criado` mais recente primeiro; as 8 primeiras viram o trilho "Chegou agora".

## Visual (a "vitrine no céu de papel")
Vitrine clássica (menu de categorias, banner, quadros de categoria, grade, faixa "Para presentear", fatos, rodapé) com acabamento de **papel recortado e aquarela**: ilustrações geradas por IA em `assets/arte/`
(origem e prompts em `/opt/mimo-pipeline/docs/ARTE-SITE.md`), sem texto e sem pessoas; o **logo oficial nunca é redesenhado**. Títulos, botões e preços em **Fredoka**; texto em Ubuntu.
Rosa do logo `#E80088` (botão de papel `#D6007E`, texto `#BC006A`), pastéis de bebê (céu `#CDEEF4`, rosa `#FFD6EA`, sol `#FFEDA8`, lilás `#E4DBFF`), tinta `#33264A`, fundo `#FFFDF8`.
Cartão da peça: moldura colorida pelo gênero, preço abaixo do nome. Botões clicáveis são papel pastel com costura tracejada; selecionado = papel rosa. Frete grátis só em Aparecida do Taboado-MS; sem brinde.
Sistema completo: `DESIGN.md`. Sem peças cadastradas, aparece "Novidades chegando".

## Testar
`python3 -m http.server 8843` na raiz. Conferir em 1440 px e 390 px. Depois de publicar (`git push origin main`), o Pages leva ~1-2 min.
