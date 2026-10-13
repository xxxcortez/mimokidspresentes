---
name: Mimo Kids Presentes
description: Vitrine clássica de moda bebê e infantil montada num céu de papel recortado e aquarela, com bichinhos de papel, etiqueta de papel no preço e botões de papel rosa costurado.
colors:
  rosa-logo: "#E80088"
  rosa-papel: "#D6007E"
  rosa-tinta: "#BC006A"
  turquesa-escuro: "#17727F"
  ceu: "#CDEEF4"
  ceu-aquarela: "#DCEBF3"
  rosa-bebe: "#FFD6EA"
  sol: "#FFEDA8"
  lilas: "#E4DBFF"
  fundo: "#FFFDF8"
  papel: "#FFFFFF"
  tinta: "#33264A"
  tinta-suave: "#5E5275"
  linha: "#E8DFEF"
  linha-suave: "#F3EDF7"
typography:
  display:
    fontFamily: "Fredoka Site, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "clamp(42px, 6.2vw, 88px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Fredoka Site, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "clamp(32px, 4.6vw, 46px)"
    fontWeight: 600
    lineHeight: 1.05
  title:
    fontFamily: "Fredoka Site, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.15
  price:
    fontFamily: "Fredoka Site, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "38px"
    fontWeight: 600
    lineHeight: 1.1
  button:
    fontFamily: "Fredoka Site, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.1
  label:
    fontFamily: "Fredoka Site, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "Ubuntu Site, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  note:
    fontFamily: "Ubuntu Site, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  polaroid: "6px"
  campo: "16px"
  foto: "20px"
  cartao: "28px"
  faixa: "32px"
  pilula: "999px"
spacing:
  lado: "clamp(16px, 4.5vw, 56px)"
  chip-gap: "8px"
  grade-gap-celular: "30px 14px"
  grade-gap: "40px 24px"
  quadro-gap: "20px"
components:
  button-primary:
    backgroundColor: "{colors.rosa-papel}"
    textColor: "{colors.papel}"
    typography: "{typography.button}"
    rounded: "{rounded.pilula}"
    padding: "14px 32px"
  button-secondary:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    typography: "{typography.button}"
    rounded: "{rounded.pilula}"
    padding: "14px 32px"
  chip:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "6px 16px"
  chip-selected:
    backgroundColor: "{colors.rosa-papel}"
    textColor: "{colors.papel}"
  menu-item:
    backgroundColor: "{colors.fundo}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pilula}"
    padding: "8px 20px"
  menu-item-active:
    backgroundColor: "{colors.rosa-bebe}"
    textColor: "{colors.tinta}"
  card-peca-menina:
    backgroundColor: "{colors.rosa-bebe}"
    rounded: "{rounded.cartao}"
    padding: "10px"
  card-peca-menino:
    backgroundColor: "{colors.ceu}"
    rounded: "{rounded.cartao}"
    padding: "10px"
  card-peca-unissex:
    backgroundColor: "{colors.sol}"
    rounded: "{rounded.cartao}"
    padding: "10px"
  card-peca-sem-genero:
    backgroundColor: "{colors.lilas}"
    rounded: "{rounded.cartao}"
    padding: "10px"
  input-busca:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pilula}"
    height: "44px"
  promo-pill:
    backgroundColor: "{colors.ceu}"
    textColor: "{colors.turquesa-escuro}"
    rounded: "{rounded.pilula}"
    padding: "3px 12px"
---

# Design System: Mimo Kids Presentes

## Overview

**Creative North Star: "A Vitrine no Céu de Papel"**

O site é uma vitrine clássica de loja infantil (barra de aviso, cabeçalho com logo, busca e sacola, menu de categorias, banner de abertura, quadros de categoria, grade de peças, faixa de presente, fatos, rodapé) vestida de um mundo de papel recortado e aquarela. O céu pastel com nuvens de papel, arco-íris e estrelinhas douradas abre e fecha a página; bichinhos de papel (elefante, coelho, girafa, ovelha, urso) espiam pelas bordas das seções; cada cenário de categoria é um quadro ilustrado em rosa, azul, amarelo ou lilás. A alegria é lúdica, mas a estrutura é de loja: a foto da peça continua a protagonista e preço, tamanho e promoção ficam sempre legíveis.

Os materiais são papel de verdade, não metáfora plana: a etiqueta do preço é uma tag de papel ilustrada, o "Novo" é uma roseta de papel, os botões de ação têm textura de papel rosa com costura tracejada, as fotos de peça na abertura e nos quadros entram como fotos de papel com margem branca, levemente tortas. Tudo projeta sombra macia tingida de ameixa, como papel colado sobre papel.

Todas as ilustrações (`assets/arte/*.webp`) foram geradas por IA (OpenRouter, `meta/muse-image`) com prompt sem texto, sem letras, sem logotipos e sem pessoas; o fundo branco foi recortado por preenchimento a partir das bordas. Proveniência e prompts em `/opt/mimo-pipeline/docs/ARTE-SITE.md`. O logo oficial (`assets/logo.png`) nunca é redesenhado nem reinterpretado por IA: ele só ganha um suporte (a nuvem de papel do rodapé).

**Key Characteristics:**
- Esqueleto de vitrine clássica, pele de papel recortado e aquarela.
- Céu pastel nas pontas (abertura e rodapé), papel creme quente no meio.
- Bichinhos e artes de papel decoram, nunca carregam informação.
- Formas redondas: pílulas, cartões de 28px, fotos de papel inclinadas.
- Fredoka arredondada para títulos, botões e rótulos; Ubuntu para texto corrido.
- Moldura do cartão de peça colorida pelo gênero.

## Colors

Pastéis de bebê em grandes áreas, rosa da marca forte só na ação e no preço, tinta ameixa no lugar do preto.

### Primary
- **Rosa do Logo** (`rosa-logo`): o rosa puro da marca. Usado só em bordas e realces: borda da busca em foco, borda de chip e tamanho no hover, miniatura ativa da galeria, seleção de texto.
- **Rosa Papel** (`rosa-papel`): a base dos botões de ação e dos chips/tamanhos selecionados, sempre combinada à textura `papel-rosa.webp` sob um véu de 50% da própria cor. Leva texto branco.
- **Rosa Carimbo** (`rosa-tinta`): o rosa escurecido para texto: preço grande, total da sacola, "Grandes memórias." do título, links "Limpar filtros" e "Remover", mensagens de erro, contador da sacola.

### Secondary
- **Turquesa Fundo do Mar** (`turquesa-escuro`): exclusivo de promoção ("3 por R$ 99") e da linha de desconto da sacola, sempre sobre céu ou creme. O turquesa claro do logo vive só no logo.

### Tertiary
- **Céu** (`ceu`): moldura de peça de menino, fundo da galeria, fato "Novidade", pílula de promoção, cor do tema do navegador.
- **Céu Aquarela** (`ceu-aquarela`): o tom do céu pintado; cor de espera atrás das artes da abertura e do rodapé e véu de leitura da faixa "Para presentear" no celular.
- **Rosa-bebê** (`rosa-bebe`): moldura de peça de menina, botão da sacola, item ativo do menu, fato "WhatsApp".
- **Sol** (`sol`): moldura de peça unissex, fato "Entrega", hover do botão da sacola, aviso de brinde, pontinhos da barra de aviso.
- **Lilás** (`lilas`): moldura de peça sem gênero e o quarto cenário de categoria.

### Neutral
- **Creme de Papel** (`fundo`): fundo da página, dos diálogos e das barras fixas.
- **Papel Branco** (`papel`): busca, chips, pílula do nome da categoria, margem das fotos de papel, botão de fechar.
- **Tinta Ameixa** (`tinta`): todo texto principal, barra de aviso, anel de foco, linha do total.
- **Tinta Suave** (`tinta-suave`): subtítulos, rótulos, meta da peça, notas.
- **Linha** (`linha`) e **Linha Suave** (`linha-suave`): bordas de chip, campo e quantidade; separadores tracejados da sacola; hover neutro.

### Named Rules
**The Pastel Block Rule.** Pastéis (céu, rosa-bebê, sol, lilás) preenchem áreas: molduras, fatos, quadros, galeria. Rosa forte nunca preenche bloco, só botão, chip ativo e texto.

**The Gender Frame Rule.** A moldura do cartão de peça é função do gênero no catálogo: menina rosa-bebê, menino céu, unissex sol, sem gênero lilás. Os quadros de categoria, ao contrário, ganham cor pela posição (rosa, azul, sol, lilás em ciclo), não pelo conteúdo.

**The Contrast Pink Rule.** Texto rosa é sempre Rosa Carimbo; texto branco só sobre Rosa Papel ou mais escuro. O Rosa do Logo nunca carrega texto.

**The Turquoise Means Sale Rule.** Turquesa em texto significa promoção ou desconto; não vira decoração.

## Typography

**Display Font:** Fredoka (variável 300–700, servida localmente como "Fredoka Site", com Arial Rounded MT Bold de reserva)
**Body Font:** Ubuntu (400, 500, 700, servida localmente como "Ubuntu Site")

**Character:** Fredoka tem os cantos redondos do papel recortado e a voz alegre da vitrine; Ubuntu é calma e legível para condições de pagamento, descrições e notas.

### Hierarchy
- **Display** (600, clamp 42–88px, 1.02, tracking levemente negativo): só o título da abertura, com a segunda linha em Rosa Carimbo e quebra equilibrada.
- **Headline** (600, clamp 32–46px, 1.05): títulos de seção ("Nossas peças"), faixa "Para presentear" (até 52px), nome da peça no diálogo (até 40px), "Minha sacola".
- **Title** (600, 21–23px, 1.1–1.2): nome do quadro de categoria, títulos dos fatos e das colunas do rodapé.
- **Price** (600, 38px, Rosa Carimbo): preço no diálogo; o total da sacola usa 32px. Na grade o preço vai na etiqueta de papel (600, 18px; 14.5px no celular), em Tinta Ameixa.
- **Button** (600, 20px): botões de ação; 18px no celular.
- **Label** (500, 16–18px): menu, chips, tamanhos, rótulos de bloco, nome da peça no cartão (19px).
- **Body** (400, 16px/1.55 Ubuntu): texto corrido; descrição limitada a 62ch.
- **Note** (400, 13.5–14.5px Ubuntu, Tinta Suave): aviso de IA, condições de entrega e pagamento, rodapé final.

### Named Rules
**The Round Voice Rule.** Tudo o que se clica ou se escaneia (título, botão, chip, menu, preço) fala em Fredoka; tudo o que se lê com calma fala em Ubuntu. Sem caixa-alta forçada e sem tracking aberto.

## Layout

Coluna única de vitrine, centralizada, com margens laterais fluidas (`lado`). Conteúdos largos param em 1300–1400px. Cabeçalho (92px; 74px abaixo de 420px) e menu de categorias ficam fixos no topo, sobre o creme de papel; a barra de aviso fica acima deles.

- **Abertura:** arte de céu em cobertura total (16:9 a partir de 880px; vertical 3:4 no celular), texto à esquerda até 620px, duas fotos de papel das peças mais recentes inclinadas à direita (no celular, embaixo, sobre as nuvens). Um degradê de 90px funde o céu no creme.
- **Quadros de categoria:** grade automática de colunas mínimas de 240px, quadros 3:2.
- **Grade de peças:** 2 colunas no celular, 3 a partir de 720px, 4 a partir de 1100px; uma peça sozinha fica centrada em até 320px.
- **Diálogo da peça:** tela cheia no celular; a partir de 900px, cartão de até 1000px em duas colunas (galeria 1.05fr sobre o cenário azul, informação 1fr). A barra de ação fica presa ao pé no celular.
- **Sacola:** gaveta lateral à direita, até 440px.
- **Rodapé:** céu de papel com a nuvem do logo, três colunas a partir de 800px.
- **Divisor ilustrado** (fileira de nuvenzinhas e lua, até 460px) separa os blocos do meio da página.

## Elevation & Depth

Profundidade de papel colado: tudo o que é recorte projeta uma sombra curta e macia, tingida de ameixa, nunca preta e nunca deslocada sem desfoque. A arte já traz o relevo aquarelado; o CSS só acrescenta a sombra de contato.

### Shadow Vocabulary
- **Papel assentado** (`box-shadow: 0 2px 4px rgba(51,38,74,.08), 0 14px 26px -14px rgba(51,38,74,.35)`): cartões de peça, quadros de categoria, fatos, faixa de presente, botão de fechar.
- **Foto de papel** (`box-shadow: 0 2px 3px rgba(51,38,74,.12), 0 22px 36px -14px rgba(51,38,74,.45)`): fotos com margem branca da abertura (versão de 16px nos quadros de categoria).
- **Pílula solta** (`box-shadow: 0 4px 10px rgba(51,38,74,.18)`): nome da categoria sobre o cenário.
- **Recorte ilustrado** (`filter: drop-shadow(0 5px 6px rgba(51,38,74,.22))`): etiqueta de preço e roseta "Novo", que seguem o contorno da arte.
- **Brilho do botão** (`box-shadow: 0 10px 18px -8px rgba(188,0,106,.6)`): sombra rosada sob o botão de papel rosa.

### Named Rules
**The Paper Shadow Rule.** Sombra sempre difusa e tingida de ameixa (ou de rosa sob o botão rosa); sólida, preta ou deslocada sem desfoque não existe neste mundo.

## Shapes

Papel recortado com tesoura de ponta redonda. Ações, chips, menu, busca e selos são pílulas completas. Cartões de peça e quadros de categoria têm 28px; a foto dentro da moldura repete o canto com 20px. Faixa de presente e diálogo da peça têm 32px. Fotos de papel têm cantos quase retos (6px na margem, 3px na foto) e entram inclinadas de 3° a 5°, alternando o lado. A etiqueta de preço inclina 5° e a roseta "Novo" −10°. A costura tracejada (1.5px, recuada 6px para dentro) marca os botões de papel; o tracejado de 2px separa os itens da sacola; tamanho esgotado ganha borda tracejada e texto riscado.

## Components

### Buttons
Papel rosa costurado, alegre e firme.
- **Shape:** pílula (999px), padding 14px 32px; a versão "grande" ocupa a largura toda.
- **Primary:** Rosa Papel com a textura `papel-rosa.webp` (260px) sob véu de 50% da mesma cor, texto branco em Fredoka 600 com leve sombra rosa-escura, costura tracejada branca a 70%, brilho rosado embaixo.
- **Hover:** sobe 2px e escurece por `brightness(.93)`; transição de 0.15s.
- **Secondary:** papel creme (`papel-creme.webp`) com texto em Tinta Ameixa, contorno interno de 2px em tinta e costura em tinta a 35%.
- **Disabled:** Linha, sem sombra, cursor de bloqueio.

### Chips (filtros, tamanhos, menu)
- **Style:** pílula branca, borda de 2px em Linha, Fredoka 500 16–17px.
- **State:** hover troca a borda para Rosa do Logo; selecionado vira papel rosa (mesma textura do botão) com texto branco. Tamanho esgotado: borda tracejada, texto riscado. O menu de categorias usa pílulas sem borda; o item ativo fica em Rosa-bebê.

### Cards / Containers
- **Cartão de peça:** moldura de 10px na cor do gênero (Gender Frame Rule), canto 28px, foto 3:4 com canto 20px, sombra "Papel assentado". No hover sobe 4px e gira −0.6°. Nome centralizado abaixo em Fredoka, meta em Tinta Suave, bolinhas de cor (22px, anel creme, área de toque ampliada) e pílula de promoção em céu.
- **Quadro de categoria:** cenário ilustrado 3:2 (rosa, azul, sol, lilás por posição), foto de papel da peça inclinada no centro (endireita e cresce 5% no hover), nome numa pílula branca embaixo.
- **Fato:** bloco pastel de 28px com borda branca de 2px, ícone ilustrado de papel à esquerda (84px; 70px no celular), título em Fredoka.
- **Faixa "Para presentear":** arte de presente em cobertura, canto 32px, coelhinho espiando por cima da borda.

### Inputs / Fields
- **Busca:** pílula branca de 44px com borda de 2px em Linha e lupa em traço; em foco a borda vira Rosa do Logo.
- **Textarea (observações, mensagem do pedido):** borda de 2px em Linha, canto 16px, Ubuntu 15px.
- **Quantidade:** pílula com borda de 2px e botões de 42–44px nas pontas.
- **Erro:** texto em Rosa Carimbo, 14px, 500, logo abaixo dos tamanhos.

### Navigation
- Barra de aviso em Tinta Ameixa com textos em Fredoka 500 separados por pontinhos sol. Cabeçalho fixo com logo (76px de altura; 60px no celular estreito), busca e botão redondo da sacola em rosa-bebê (sol no hover) com contador em Rosa Carimbo. Menu de categorias fixo logo abaixo, rolável na horizontal no celular, sem barra de rolagem visível.

### Etiqueta de preço (assinatura)
Tag de papel ilustrada (`etiqueta.webp`, 120×83px; 94×65px no celular) presa no canto superior direito da foto, inclinada 5°, com o preço em Tinta Ameixa e Fredoka 600. No hover do cartão balança para −2°. Carrega só o preço.

### Roseta "Novo"
Roseta de papel (`selo.webp`, 64px; 46px no celular) no canto superior esquerdo da foto, inclinada −10°, com a palavra "Novo" em Fredoka 600.

### Aviso de foto com IA
Pílula branca translúcida (94%) no canto inferior esquerdo da foto, "Foto ilustrativa (IA)" em Ubuntu 12.5px; no diálogo vira nota completa. Obrigatória sempre que a foto estiver marcada como IA.

### Bichinhos e artes de apoio
Elefantinho e balões ao lado de "Nossas peças" (flutuando devagar, 7–8s), coelhinho sobre a faixa de presente, girafinha no rodapé, ursinho no estado vazio, ovelhinha na sacola vazia, nuvem de papel atrás do logo do rodapé. São decorativos (`aria-hidden`, sem clique) e encolhem ou somem no celular estreito.

## Do's and Don'ts

### Do:
- **Do** gerar novas artes no mesmo estilo de papel recortado e aquarela, sem texto, sem letras, sem logotipos e sem pessoas, e registrá-las em `docs/ARTE-SITE.md`.
- **Do** colorir a moldura de cada peça pelo gênero (menina rosa-bebê, menino céu, unissex sol, sem gênero lilás).
- **Do** usar Rosa Carimbo para preço e qualquer texto rosa; Rosa Papel com textura e costura para botões e seleção.
- **Do** manter o anel de foco de 3px em Tinta Ameixa, afastado 2px, em todo elemento interativo.
- **Do** usar a curva `cubic-bezier(.2,.8,.2,1)` para movimentos de papel e desligar animações com movimento reduzido.
- **Do** desenhar ícones de interface como SVG de traço (1.8–1.9px, pontas redondas) em Tinta Ameixa.

### Don't:
- **Don't** redesenhar, regerar com IA ou recolorir o logo oficial; ele só ganha suporte (a nuvem de papel).
- **Don't** pôr texto, preço ou informação dentro das ilustrações geradas; a informação é sempre HTML por cima.
- **Don't** usar Rosa do Logo como cor de texto ou como fundo de bloco.
- **Don't** usar sombra preta, sólida ou deslocada sem desfoque.
- **Don't** usar turquesa fora de promoção e desconto.
