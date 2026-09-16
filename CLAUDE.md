# Mimo Kids Presentes — site

Loja de roupas/presentes infantis. Site estático (sem build, sem framework)
publicado no domínio `mimokidspresentes.com.br` via GitHub Pages, a partir do
repositório privado `xxxcortez/mimokidspresentes` (branch `main`).

Não existe checkout de verdade: o cliente monta o carrinho no site e o botão
"Preparar pedido" gera uma mensagem pronta pra abrir no WhatsApp
(`WHATSAPP_NUMBER` em `shop.js`). Preço no Pix é fixo; no cartão parcela em
até 12x com juros por conta do cliente (ver `.detail-payment-note`).

## Arquivos

- `index.html` — toda a página (uma seção por bloco: header, faixa de lives,
  banner de promoção, coleções, filtro de tamanho, catálogo, modais).
- `app.js` — dados dos produtos (`items`) + catálogo (busca, filtros,
  renderização dos cards, modal de detalhe).
- `shop.js` — carrinho (localStorage), geração da mensagem do WhatsApp.
- `style.css` — um arquivo só, bem grande, com bastante histórico de ajustes
  acumulados (muitas regras redeclaradas depois na cascata — ver armadilha
  abaixo antes de mexer em `dialog[open]`).
- `assets/` — imagens dos produtos, logo, fotos de banner.
- Sem bundler/build: pra testar local, `python -m http.server` na raiz.

## Modelo de dados de produto (`items` em app.js)

Cada item tem: `id`, `code`, `gender`, `name`, `category`, `sizes`,
`collection`, `price`, `image`, `description`.

- **`code`**: convenção `V`/`C`/`P` (Vestidos/Conjuntos/Presentes) + número
  sequencial de 2 dígitos dentro da categoria (ex: `V07`). Serve pra dona da
  loja bater o produto do site com a etiqueta física no estoque. Exibido em
  minúsculas ("cod. v07") no card, modal, carrinho e mensagem do WhatsApp.
- **`gender`**: `menina` / `menino` / `unissex`. **Atribuído por mim com base
  no nome/estampa do produto, nunca confirmado pela dona da loja.** Hoje
  quase tudo é `menina` (catálogo é só vestido/conjunto floral). Revisar
  quando o catálogo real for cadastrado.
- **`sizes`**: hoje todo produto só tem `['1']` (placeholder). O filtro
  "Compre por tamanho" e os chips de tamanho no card/modal escondem
  automaticamente qualquer tamanho sem produto correspondente — ao cadastrar
  tamanhos reais e variados, os filtros passam a refletir sozinhos, sem
  precisar mexer no código.
- Tamanhos vão de RN a 4 (`ALL_SIZES` em app.js); a legenda de idade por
  tamanho (RN 0-3m, P 3-6m, M 6-9m, G 9-12m, 1-4 = 1-5 anos) é uma **tabela
  padrão genérica, não confirmada pela loja** — avisar se for ajustar.

## Armadilha de CSS: `dialog[open]` genérico

O site tem dois `<dialog>`: `#detail` (modal de produto) e `.bag-dialog`
(carrinho). Várias regras usam o seletor genérico `dialog[open]{...}`, que
afeta os dois ao mesmo tempo — já causou pelo menos dois bugs (altura do
modal de produto vazando pro carrinho e cortando o botão "Preparar pedido").
Ao mexer em altura/aspect-ratio/overflow de modal, prefira escopar
explicitamente (`dialog#detail[open]` ou `.bag-dialog`) em vez do seletor
genérico.

## Mobile: `100vh` não é confiável

Use `100dvh` com fallback `100vh` pra altura máxima de modais — `100vh` em
navegador mobile real (barra de endereço recolhendo/expandindo) não bate com
o headless de teste. Historicamente vários bugs de "corte" só apareciam no
celular real do dono, nunca no teste automatizado — sempre pedir confirmação
no site publicado quando a correção for sobre viewport mobile.

## Workflow de verificação usado nas sessões anteriores

1. Servidor local (`python -m http.server 8843` na raiz).
2. Microsoft Edge headless com `--remote-debugging-port` + script Node
   pequeno via CDP (`Page.navigate`, `Runtime.evaluate`, `Page.captureScreenshot`)
   pra clicar, preencher e printar telas — inclusive abrindo modais/carrinho
   programaticamente.
3. Testar em pelo menos duas larguras: desktop (1440px) e mobile (~390px).
4. Depois de publicar (`git push origin main`), o GitHub Pages demora
   ~30-90s pra atualizar — checar com `curl` fazendo poll no CSS/HTML antes
   de confirmar "está no ar" pro usuário.
5. Limpar todo arquivo `scratch_*` e processo `msedge.exe`/servidor antes de
   commitar (não versionar nada de teste).

## Contato / redes

- WhatsApp: `5567981542208` (confirmado pelo dono).
- Instagram: `@mimokidspresentes`.
- TikTok: `@mimokidspresentes` (lives com horário variável, avisado nos
  Stories do Instagram).
