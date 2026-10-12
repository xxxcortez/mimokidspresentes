# Mimo Kids Presentes: site

Loja de moda bebê e infantil (RN ao tamanho 4). Site **estático** (sem build, sem framework), publicado no domínio
`mimokidspresentes.com.br` pelo GitHub Pages, a partir deste repositório (`main`). Não há checkout: o cliente monta a sacola e o botão
"Preparar pedido" abre o WhatsApp com a mensagem pronta (`config.whatsapp` em `produtos.json`).

## Arquivos
- `produtos.json`: **toda a vitrine**. `config` (WhatsApp, redes, frete grátis, brinde, parcelas) e `produtos` (lista). É alimentado pelo bot do Instagram
  (`/opt/mimo-pipeline`, na VM do hermes-agent): cada peça postada vira uma entrada aqui e as fotos vão para `assets/produtos/`.
- `index.html`, `style.css`, `app.js`: a página, o visual e a lógica (catálogo, filtros, cores, página da peça, sacola, mensagem do WhatsApp).
- `assets/logo.png` (logo oficial), `assets/fontes/` (Encode Sans Condensed, OFL; Ubuntu, Ubuntu Font Licence; woff2 só com latim).

## Modelo de dados de uma peça
`{id, codigo, nome, categoria, genero, preco, promo:{qtd,total,grupo?}|null, descricao, criado, ia?, cores:[{nome, hex, fotos[], tamanhos[], esgotados[]}]}`
- **Tamanhos**: exatamente o texto que a loja digitou ("6 MESES A 1 ANO", "P", "2"). Sem tabela de conversão. O filtro de tamanho é montado
  com o que existe no catálogo; a ordem é natural (RN, P, M, G, GG, depois por idade em meses; número puro = anos).
- **Cores**: várias cores por peça (bolinhas no cartão e na página). Cada cor tem as suas fotos e os seus tamanhos.
- **promo**: "leve N por R$ T". Sem `grupo`, vale por peça (soma de todas as cores e tamanhos); com `grupo`, mistura peças da mesma linha.
- **ia**: `true` mostra "Foto ilustrativa com modelo criado por inteligência artificial" na página da peça.
- Foto padrão: a do **cabide** (feed 3:4 do bot). Ordem da vitrine: `criado` mais recente primeiro; as 8 primeiras viram o trilho "Chegou agora".

## Visual (identidade do logo)
Rosa `#E80088`, turquesa `#50C0D0`, blush `#FDF1F6`, ameixa `#3A2A3A`. Títulos e preços em Encode Sans Condensed; texto em Ubuntu.
Elemento de marca: **etiqueta de preço** sobre a foto (formato de etiqueta de roupa). Sem peças cadastradas, aparece "Novidades chegando".

## Testar
`python3 -m http.server 8843` na raiz. Conferir em 1440 px e 390 px. Depois de publicar (`git push origin main`), o Pages leva ~1-2 min.
