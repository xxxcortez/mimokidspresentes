---
name: Mimo Kids Presentes
description: Vitrine clássica de moda bebê e infantil montada num céu de papel recortado e aquarela, com bichinhos de papel e botões de papel pastel costurado, selecionado em papel rosa forte.
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
  price-card:
    fontFamily: "Fredoka Site, Arial Rounded MT Bold, system-ui, sans-serif"
    fontSize: "21px"
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
    backgroundColor: "{colors.ceu}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "6px 16px"
  chip-rosa:
    backgroundColor: "{colors.rosa-bebe}"
    textColor: "{colors.tinta}"
  chip-sol:
    backgroundColor: "{colors.sol}"
    textColor: "{colors.tinta}"
  chip-selected:
    backgroundColor: "{colors.rosa-papel}"
    textColor: "{colors.papel}"
  menu-item:
    backgroundColor: "{colors.ceu}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "8px 20px 8px 12px"
  menu-item-selected:
    backgroundColor: "{colors.rosa-papel}"
    textColor: "{colors.papel}"
  tamanho:
    backgroundColor: "{colors.ceu}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    padding: "9px 18px"
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
    height: "48px"
  botao-sacola:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    typography: "{typography.button}"
    rounded: "{rounded.pilula}"
    height: "52px"
  selo-novo:
    backgroundColor: "{colors.rosa-bebe}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pilula}"
    padding: "6px 13px"
  promo-pill:
    backgroundColor: "{colors.ceu}"
    textColor: "{colors.turquesa-escuro}"
    rounded: "{rounded.pilula}"
    padding: "3px 12px"
  voltar-topo:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.rosa-tinta}"
    rounded: "{rounded.pilula}"
    size: "52px"
  rodape-coluna:
    backgroundColor: "{colors.fundo}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.cartao}"
    padding: "22px 22px 20px"
---

# Design System: Mimo Kids Presentes

## Overview

**Creative North Star: "A Vitrine no Céu de Papel"**

O site é uma vitrine clássica de loja infantil (barra de aviso, cabeçalho com logo grande, busca e sacola, menu de categorias, banner de abertura, quadros de categoria, grade de peças, faixa de presente, fatos, rodapé completo) vestida de um mundo de papel recortado e aquarela. O céu pastel com nuvens de papel, arco-íris e estrelinhas douradas abre e fecha a página; bichinhos de papel (elefante, coelho, ovelha, urso) espiam pelas bordas das seções; cada cenário de categoria é um quadro ilustrado em rosa, azul, amarelo ou lilás. A alegria é lúdica, mas a estrutura é de loja: a foto da peça continua a protagonista e preço, tamanho e promoção ficam sempre legíveis.

Os materiais são papel de verdade, não metáfora plana: todo controle que se clica (menu de categorias, filtros de gênero e de tamanho, escolha de tamanho, busca, sacola, botões de ação) é um recorte de papel com costura tracejada, pastel em repouso (rosa-bebê, azul, amarelo) e papel rosa forte com letra branca quando selecionado ou quando é a ação principal. Ícones desses controles são pequenas peças de papel (`ic-*.webp`). As fotos de peça na abertura e nos quadros entram como fotos de papel com margem branca, levemente tortas. Tudo projeta sombra macia tingida de ameixa, como papel colado sobre papel. O que carrega informação (preço, "Novo", promoção) é texto simples, sem ilustração por trás.

Todas as ilustrações (`assets/arte/*.webp`) foram geradas por IA (OpenRouter, `meta/muse-image`) com prompt sem texto, sem letras, sem logotipos e sem pessoas; o fundo branco foi recortado por preenchimento a partir das bordas. Proveniência e prompts em `/opt/mimo-pipeline/docs/ARTE-SITE.md`. O logo oficial (`assets/logo.png`) nunca é redesenhado nem reinterpretado por IA: no topo e no rodapé ele só ganha enfeite de papel ao lado (nuvens, lua, balão em `enfeite-logo.webp`), nunca por trás.

**Key Characteristics:**
- Esqueleto de vitrine clássica, pele de papel recortado e aquarela.
- Céu pastel nas pontas (abertura e rodapé), papel creme quente no meio.
- Bichinhos e artes de papel decoram, nunca carregam informação.
- Controles são botões de papel pastel com costura tracejada; o rosa forte é só seleção e ação.
- Formas redondas: pílulas, cartões de 28px, fotos de papel inclinadas.
- Fredoka arredondada para títulos, botões, rótulos e preço; Ubuntu para texto corrido.
- Moldura do cartão de peça colorida pelo gênero.

## Colors

Pastéis de bebê em grandes áreas e nos botões em repouso, rosa da marca forte só na seleção, na ação e no texto de preço, tinta ameixa no lugar do preto.

### Primary
- **Rosa do Logo** (`rosa-logo`): o rosa puro da marca. Usado só na seleção de texto e na borda da miniatura ativa da galeria. Nunca carrega texto nem preenche bloco.
- **Rosa Papel** (`rosa-papel`): a base dos botões de ação e de tudo que está selecionado (categoria, gênero, tamanho, contador da sacola), sempre combinada à textura `papel-rosa.webp` sob um véu de 50% da própria cor. Leva texto branco.
- **Rosa Carimbo** (`rosa-tinta`): o rosa escurecido para texto: preço na grade (21px) e no diálogo (38px), total da sacola, "Grandes memórias." do título, links "Limpar filtros" e "Remover", mensagens de erro, números dos passos do rodapé, seta do botão de voltar ao topo, foco da busca.

### Secondary
- **Turquesa Fundo do Mar** (`turquesa-escuro`): exclusivo de promoção ("Leve 3 por R$ 99") e da linha de desconto da sacola, sempre sobre céu ou creme. O turquesa claro do logo vive só no logo.

### Tertiary
- **Céu** (`ceu`): moldura de peça de menino, fundo da galeria (sob a arte), pílula de promoção, cor do tema do navegador. É também o tom azul do papel dos controles (`papel-azulzinho.webp` sobre `#EEF8FB`).
- **Céu Aquarela** (`ceu-aquarela`): o tom do céu pintado; cor de espera atrás das artes da abertura e do rodapé e véu de leitura da faixa "Para presentear" no celular.
- **Rosa-bebê** (`rosa-bebe`): moldura de peça de menina, plaquinha "Novo", papel rosa dos controles (gênero Menina e itens alternados do menu), fato "WhatsApp", fundo dos números dos passos, borda do botão de voltar ao topo.
- **Sol** (`sol`): moldura de peça unissex, papel amarelo dos controles (gênero Unissex, "Tudo"), fato "Entrega", pontinhos da barra de aviso.
- **Lilás** (`lilas`): moldura de peça sem gênero e o quarto cenário de categoria.

### Neutral
- **Creme de Papel** (`fundo`): fundo da página, dos diálogos, do cabeçalho e do menu fixos.
- **Papel Branco** (`papel`): pílula do nome da categoria, margem das fotos de papel, botão de fechar, botão de voltar ao topo, textarea; véu de 72% sobre o papel rosinha na busca e na sacola.
- **Tinta Ameixa** (`tinta`): todo texto principal, barra de aviso, anel de foco, linha do total.
- **Tinta Suave** (`tinta-suave`): subtítulos, rótulos, meta da peça, notas.
- **Linha** (`linha`) e **Linha Suave** (`linha-suave`): bordas de campo e quantidade; separadores tracejados da sacola; botão desabilitado; hover do botão secundário.

**Cores de marca de terceiros (exceção fechada).** Os três ícones de rede do rodapé usam as cores originais de cada marca (Simple Icons, CC0): WhatsApp `#25D366`, Instagram em degradê oficial, TikTok `#000`; o ícone do Pix usa `#32BCAD`. Valem só para esses glifos e não entram na paleta.

### Named Rules
**The Pastel Rest Rule.** Em repouso, controle é papel pastel (azul, rosa-bebê, amarelo) com costura escura a 22%; rosa forte nunca preenche bloco ou controle em repouso, só controle selecionado, botão de ação e o contador da sacola.

**The Gender Frame Rule.** A moldura do cartão de peça é função do gênero no catálogo: menina rosa-bebê, menino céu, unissex sol, sem gênero lilás. Os quadros de categoria, ao contrário, ganham cor pela posição (rosa, azul, sol, lilás em ciclo), não pelo conteúdo. Os filtros de gênero seguem a mesma lógica (Menina rosa, Menino azul, Unissex e Todos amarelo).

**The Contrast Pink Rule.** Texto rosa é sempre Rosa Carimbo; texto branco só sobre Rosa Papel. O Rosa do Logo nunca carrega texto.

**The Turquoise Means Sale Rule.** Turquesa em texto significa promoção ou desconto; não vira decoração.

## Typography

**Display Font:** Fredoka (variável 300–700, servida localmente como "Fredoka Site", com Arial Rounded MT Bold de reserva)
**Body Font:** Ubuntu (400, 500, 700, servida localmente como "Ubuntu Site")

**Character:** Fredoka tem os cantos redondos do papel recortado e a voz alegre da vitrine; Ubuntu é calma e legível para condições de pagamento, descrições e notas.

### Hierarchy
- **Display** (600, clamp 42–88px, 1.02, tracking levemente negativo): só o título da abertura, com a segunda linha em Rosa Carimbo e quebra equilibrada.
- **Headline** (600, clamp 32–46px, 1.05): títulos de seção ("Nossas peças"), faixa "Para presentear" (até 52px), nome da peça no diálogo (até 40px), "Minha sacola" (34px).
- **Title** (600, 22–23px, 1.1–1.2): nome do quadro de categoria (21px), títulos dos fatos e das três colunas do rodapé.
- **Price** (600, 38px, Rosa Carimbo): preço no diálogo; o total da sacola usa 32px. Na grade o preço fica logo abaixo do nome, centralizado, em Fredoka 600, 21px (18px abaixo de 520px), Rosa Carimbo.
- **Button** (600, 20px): botões de ação; 18px no celular. "Minha sacola" no botão do cabeçalho: 600, 17px, Tinta Ameixa.
- **Label** (500, 16–18px): menu, filtros, tamanhos, rótulos de bloco, nome da peça no cartão (19px), placeholder "Buscar Mimos".
- **Body** (400, 16px/1.55 Ubuntu): texto corrido; descrição limitada a 62ch.
- **Note** (400, 13.5–14.5px Ubuntu, Tinta Suave): condições de entrega e pagamento, rodapé final.

### Named Rules
**The Round Voice Rule.** Tudo o que se clica ou se escaneia (título, botão, controle, menu, preço) fala em Fredoka; tudo o que se lê com calma fala em Ubuntu. Sem caixa-alta forçada e sem tracking aberto.

## Layout

Coluna única de vitrine, centralizada, com margens laterais fluidas (`lado`). Conteúdos largos param em 1300–1400px. A barra de aviso (só aparece se o catálogo configura frete grátis) fica acima de tudo.

- **Cabeçalho, celular (até 899px):** fixo no topo, em linha: logo à esquerda (76px; 64px abaixo de 420px; 56px abaixo de 380px), busca "Buscar Mimos" que cresce, sacola só com ícone e contador.
- **Cabeçalho, computador (900px+):** grade de três áreas, busca à esquerda (até 300px), logo centralizado e grande (150px de altura), sacola à direita com o texto "Minha sacola". A partir de 1200px, o enfeite de papel (nuvens, lua, balão) aparece dos dois lados do logo, o da direita espelhado. O cabeçalho rola com a página; só o menu de categorias fica fixo (`top: 0`).
- **Menu de categorias:** faixa fixa, centralizada no computador e rolável na horizontal no celular, sem barra de rolagem visível (primeiro e último item centralizam quando cabem).
- **Abertura:** arte de céu em cobertura total (16:9 a partir de 880px; vertical no celular), texto à esquerda até 620px, duas fotos de papel das peças mais recentes inclinadas à direita (no celular, embaixo, sobre as nuvens). Um degradê de 90px funde o céu no creme.
- **Quadros de categoria:** grade automática de colunas mínimas de 240px, quadros 3:2, até 4.
- **Filtros:** tamanho, categoria e gênero em linhas centralizadas e quebráveis; um grupo só existe se tem 2 ou mais valores.
- **Grade de peças:** 2 colunas no celular, 3 a partir de 720px, 4 a partir de 1100px; uma peça sozinha fica centrada em até 320px.
- **Diálogo da peça:** tela cheia no celular; a partir de 900px, cartão de até 1000px em duas colunas (galeria 1.05fr sobre o cenário azul, informação 1fr). A barra de ação fica presa ao pé no celular.
- **Sacola:** gaveta lateral à direita, até 440px.
- **Rodapé:** céu de papel com as nuvens, em grade de 1 coluna, 2 a partir de 760px e 4 a partir de 1100px (marca, Como comprar, Pagamento e entrega, Fale com a gente), até 1300px; abaixo das colunas vêm a faixa de selos, as duas pílulas de política e a linha final com o ©; o botão "Voltar ao topo" é uma pílula flutuante.
- **Voltar ao topo flutuante:** botão redondo fixo no canto inferior direito, só aparece depois de 700px de rolagem.
- **Divisor ilustrado** (fileira de nuvenzinhas e lua, até 460px) separa os blocos do meio da página.

## Elevation & Depth

Profundidade de papel colado: tudo o que é recorte projeta uma sombra curta e macia, tingida de ameixa, nunca preta e nunca deslocada sem desfoque. A arte já traz o relevo aquarelado; o CSS só acrescenta a sombra de contato.

### Shadow Vocabulary
- **Papel assentado** (`box-shadow: 0 2px 4px rgba(51,38,74,.08), 0 14px 26px -14px rgba(51,38,74,.35)`): cartões de peça, quadros de categoria, fatos, colunas do rodapé, faixa de presente, botão de fechar.
- **Foto de papel** (`box-shadow: 0 2px 3px rgba(51,38,74,.12), 0 22px 36px -14px rgba(51,38,74,.45)`): fotos com margem branca da abertura (versão de 16px nos quadros de categoria).
- **Botão de papel pastel** (`box-shadow: 0 4px 10px -6px rgba(51,38,74,.45)`; hover `0 8px 14px -8px rgba(51,38,74,.5)` com subida de 2px): menu, filtros e tamanhos. Busca e sacola: `0 5px 14px -8px rgba(51,38,74,.45)`.
- **Pílula solta** (`box-shadow: 0 4px 10px rgba(51,38,74,.18)`): nome da categoria sobre o cenário.
- **Plaquinha** (`box-shadow: 0 3px 8px rgba(51,38,74,.16)`): "Novo".
- **Brilho do botão** (`box-shadow: 0 10px 18px -8px rgba(188,0,106,.6)`): sombra rosada sob o botão de papel rosa.
- **Flutuante** (`box-shadow: 0 10px 22px -8px rgba(51,38,74,.5)`): botão de voltar ao topo.
- **Gaveta** (`box-shadow: -12px 0 30px -12px rgba(51,38,74,.4)`): borda da sacola.

### Named Rules
**The Paper Shadow Rule.** Sombra sempre difusa e tingida de ameixa (ou de rosa sob o botão rosa); sólida, preta ou deslocada sem desfoque não existe neste mundo.

## Shapes

Papel recortado com tesoura de ponta redonda. Ações, controles, menu, busca, sacola, plaquinha e pílulas são formas completas (999px). Cartões de peça, quadros de categoria, fatos e colunas do rodapé têm 28px; a foto dentro da moldura repete o canto com 20px. Faixa de presente e diálogo da peça têm 32px. Fotos de papel têm cantos quase retos (6px na margem, 3px na foto) e entram inclinadas de 3° a 5°, alternando o lado. A costura tracejada (1.5px, recuada 5 a 6px para dentro) é o acabamento de todo botão de papel: branca a 70% sobre o rosa forte, tinta a 22% a 35% sobre o pastel, rosa a 35% na busca e na sacola. O tracejado de 2px separa os itens da sacola; tamanho esgotado ganha costura tracejada sem papel, texto riscado e sem sombra.

## Components

### Buttons
Papel rosa costurado, alegre e firme.
- **Shape:** pílula (999px), padding 14px 32px; a versão "grande" ocupa a largura toda.
- **Primary:** Rosa Papel com a textura `papel-rosa.webp` (260px) sob véu de 50% da mesma cor, texto branco em Fredoka 600 com leve sombra rosa-escura, costura tracejada branca a 70%, brilho rosado embaixo.
- **Hover:** sobe 2px e escurece por `brightness(.93)`; transição de 0.15s.
- **Secondary:** papel creme (`papel-creme.webp`) com texto em Tinta Ameixa, contorno interno de 2px em tinta e costura em tinta a 35%.
- **Disabled:** Linha, sem sombra, cursor de bloqueio.

### Botões de papel pastel (menu, filtros de gênero e tamanho, escolha de tamanho)
- **Style:** pílula de papel (`papel-azulzinho`, `papel-rosinha` ou `papel-amarelinho`, 220px, sobre base clara), sem borda, costura tracejada de 1.5px em tinta a 22%, sombra de botão de papel, Fredoka 500 16–18px em Tinta Ameixa. O tom vem de `data-tom` no elemento.
- **Ícones:** peças de papel `ic-*.webp` à esquerda (28px nos filtros, 36px no menu; 30px no menu abaixo de 520px). Categorias: vestido, conjunto, presente ou tudo; gêneros: menina, menino, unissex; "Todos" usa "tudo". Tamanhos não têm ícone. São decorativos (`aria-hidden`).
- **Tons:** filtros de tamanho em azul; gênero Menina rosa-bebê, Menino azul, Unissex e Todos amarelo; menu alterna amarelo (Tudo), rosa, azul, rosa em ciclo.
- **Hover:** sobe 2px e a sombra cresce.
- **Selecionado** (`aria-pressed="true"`): vira papel rosa forte (mesma receita do botão de ação), texto branco com leve sombra rosa-escura, costura branca a 70%.
- **Esgotado** (só tamanho): sem papel, costura tracejada, texto riscado.

### Cards / Containers
- **Cartão de peça:** moldura de 10px na cor do gênero (Gender Frame Rule), canto 28px, foto 3:4 com canto 20px, sombra "Papel assentado". No hover sobe 4px e gira −0.6°. Abaixo da foto, centralizados: nome em Fredoka 500 19px, preço em Rosa Carimbo (Fredoka 600 21px), meta em Tinta Suave (código e tamanhos), bolinhas de cor (22px, anel creme, área de toque ampliada) e pílula de promoção em céu. Não há etiqueta de preço sobre a foto.
- **Plaquinha "Novo":** pílula simples em rosa-bebê, texto Tinta Ameixa em Fredoka 600 14px (12.5px no celular), canto superior esquerdo da foto (14px; 10px no celular), nas três peças mais recentes quando não há filtro ativo.
- **Quadro de categoria:** cenário ilustrado 3:2 (rosa, azul, sol, lilás por posição), foto de papel da peça inclinada no centro (endireita e cresce 5% no hover), nome numa pílula branca embaixo.
- **Fato:** bloco pastel de 28px com borda branca de 2px, ícone ilustrado de papel à esquerda (84px; 70px no celular), título em Fredoka.
- **Faixa "Para presentear":** arte de presente em cobertura, canto 32px, coelhinho espiando por cima da borda.
- **Coluna do rodapé** (Como comprar, Pagamento e entrega, Fale com a gente): cartão de 28px em creme a 78% com borda branca de 2px e sombra "Papel assentado"; uma ilustração de papel (`ilus-comprar`, `ilus-pagamento`, `ilus-contato`, 92px) sai pela borda superior à direita; título em Fredoka 600 22px. Como comprar tem passos numerados em círculos rosa-bebê com número em Rosa Carimbo. Pagamento e entrega e Fale com a gente têm listas com ícone de 24–30px (Pix `#32BCAD`, cartão e entrega em traço de Tinta Ameixa, redes nas cores originais).

### Inputs / Fields
- **Busca "Buscar Mimos":** pílula de 48px (44px no celular) em papel rosinha sob véu branco de 72%, sem borda, costura tracejada rosa a 35%; lupa de papel (`ic-lupa.webp`) inclinada −40° à esquerda; placeholder em Fredoka 500 Tinta Suave. Em foco, a costura vira contorno sólido de 2px em Rosa Carimbo.
- **Textarea (observações, mensagem do pedido):** borda de 2px em Linha, canto 16px, Ubuntu 15px.
- **Quantidade:** pílula com borda de 2px e botões de 42–44px nas pontas.
- **Erro:** texto em Rosa Carimbo, 14px, 500, logo abaixo dos tamanhos.

### Navigation
- **Aviso:** barra em Tinta Ameixa com textos em Fredoka 500 separados por pontinhos sol; mostra o frete grátis.
- **Cabeçalho:** ver Layout. Logo oficial sem moldura, enfeite de papel só a partir de 1200px.
- **Botão da sacola:** pílula de papel claro (mesma receita da busca, 52px; 48px e redonda no celular) com sacolinha ilustrada de papel (`ilus-comprar.webp`, 40px) à esquerda, texto "Minha sacola" (some abaixo de 900px, deixando só o ícone) e contador em papel rosa forte com número branco. O contador só aparece com itens e dá um pulinho (escala até 1.45 em 0.55s) ao adicionar.
- **Menu de categorias:** ver botões de papel pastel; fixo logo abaixo do cabeçalho (no celular) ou no topo da tela (no computador), rolável na horizontal.
- **Voltar ao topo:** botão redondo de 52px, papel branco, borda de 2px em rosa-bebê, seta em traço Rosa Carimbo; fixo no canto inferior direito, entra com fade e subida de 12px depois de 700px de rolagem; hover em rosa-bebê.

### Redes sociais (rodapé)
Três peças de papel de 52px, sem círculo, com a metáfora e a cor de cada rede (`ic-whatsapp` balão verde com telefone, `ic-instagram` câmera em degradê aquarela, `ic-tiktok` nota musical em papel grafite), sombra suave e subida de 3px com leve giro no hover. Aparecem sob o logo; as mesmas peças voltam em 34px na coluna Fale com a gente. O logo oficial de cada rede não é redesenhado: a arte é uma releitura de papel, não o glifo da marca.

### Rodapé: marca
Logo oficial (até 230px) com o enfeite de papel (nuvens, lua, balão) ao lado e levemente acima, sem nuvem por trás, sobre o céu de papel de `rodape.webp`. Abaixo: a frase da loja em Fredoka 19px (máx. 24 caracteres de largura), a cidade numa pílula de papel com o pino `ic-local` e as redes. "Como comprar" tem 5 passos (escolha, sacola, envio pelo WhatsApp, confirmação e pagamento, entrega).

### Faixa de selos (rodapé)
Quatro painéis em creme a 82% com borda branca de 2px e sombra "Papel assentado" (canto 20px), em grade que se ajusta à largura: **Site seguro** (cadeado), **Sem pagamento no site** (escudo com visto), **Pix ou cartão** (cartãozinho com moeda) e **Atendimento direto** (balão de conversa). Cada um tem a sua peça de papel (`ic-seguro`, `ic-escudo`, `ic-pix-cartao`, `ic-atendimento`, 46px; 42px no celular) com sombra suave, título em Fredoka e frase em Ubuntu. **Só selos verdadeiros**; nunca selos de terceiros (Reclame Aqui, Ebit, Google) sem cadastro real.

### Pílulas de política e ©
`Trocas e devoluções` e `Política de privacidade` são pílulas de papel (mesma receita dos selos, 999px) com peça de papel de 34px à esquerda (`ic-trocas`, `ic-privacidade`), centralizadas sob os selos; o `© 2026 Mimo Kids Presentes.` leva o coraçãozinho de papel `ic-coracao` (28px). As mesmas pílulas e o © repetem-se no pé das páginas `trocas-e-devolucoes.html` e `privacidade.html`.

### Páginas de política
Cartão creme de até 780px (canto 32px) sobre o céu de papel, logo à esquerda e botão "Voltar para a loja" no topo. A ilustração da página (`ic-trocas` ou `ic-privacidade`, até 104px, girada 6°) fica pendurada na quina superior direita do cartão e o título reserva espaço para ela.

### Ícones das listas do rodapé
Cartão de crédito (`ic-pix-cartao`), cartões aceitos (`ic-cartao`), entrega (`ic-van`) e e-mail (`ic-email`) usam peças de papel de 34px com saturação levemente reforçada. Pix e as redes sociais mantêm o glifo oficial (marca de terceiro). As bandeiras (Visa, Mastercard, Elo, American Express) seguem como glifos oficiais.

### Bichinhos e artes de apoio
Elefantinho e balões ao lado de "Nossas peças" (flutuando devagar, 7–8s), coelhinho sobre a faixa de presente, ursinho no estado vazio, ovelhinha na sacola vazia. São decorativos (`aria-hidden`, sem clique) e encolhem ou somem no celular estreito.

## Do's and Don'ts

### Do:
- **Do** gerar novas artes no mesmo estilo de papel recortado e aquarela, sem texto, sem letras, sem logotipos e sem pessoas, e registrá-las em `docs/ARTE-SITE.md`.
- **Do** colorir a moldura de cada peça pelo gênero (menina rosa-bebê, menino céu, unissex sol, sem gênero lilás).
- **Do** usar Rosa Carimbo para preço e qualquer texto rosa; Rosa Papel com textura e costura para botões de ação e seleção.
- **Do** fazer todo novo controle clicável como botão de papel pastel com costura tracejada, e só o selecionado em papel rosa forte.
- **Do** manter o anel de foco de 3px em Tinta Ameixa, afastado 2 a 3px, em todo elemento interativo (vence a costura).
- **Do** usar a curva `cubic-bezier(.2,.8,.2,1)` para movimentos de papel e desligar animações com movimento reduzido.
- **Do** dar a todo painel, selo ou link de rodapé uma peça de papel própria (mesma família `ic-*`), para o site inteiro ficar homogêneo; usar SVG de traço só onde não há arte (ex.: seta de voltar ao topo) e desenhar esses ícones como SVG de traço (1.7–2.2px, pontas redondas) em Tinta Ameixa ou Rosa Carimbo, e usar glifos oficiais nas cores originais para marcas de terceiros.
- **Do** manter o frete grátis como regra do catálogo (`freteGratisAcima`, `freteGratisCidade`), só na cidade configurada, sem brinde.

### Don't:
- **Don't** redesenhar, regerar com IA ou recolorir o logo oficial; ele só ganha enfeite ao lado, nunca por trás.
- **Don't** pôr texto, preço ou informação dentro das ilustrações geradas; a informação é sempre HTML por cima. O preço fica em texto abaixo do nome, sem etiqueta.
- **Don't** usar Rosa do Logo como cor de texto ou como fundo de bloco.
- **Don't** usar sombra preta, sólida ou deslocada sem desfoque.
- **Don't** usar turquesa fora de promoção e desconto.
- **Don't** pintar controle em repouso de rosa forte; reservado a seleção e ação.
