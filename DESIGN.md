---
name: Mimo Kids Presentes
description: Vitrine de moda bebê e infantil onde a foto da peça pendura limpa e o preço vem numa etiqueta de papel com furo e barbante.
colors:
  rosa-logo: "#E80088"
  rosa-tinta: "#BC006A"
  turquesa: "#50C0D0"
  turquesa-escuro: "#17727F"
  turquesa-claro: "#DDF3F6"
  bebe-rosa: "#FFD6EA"
  bebe-azul: "#CDEEF4"
  bebe-sol: "#FFEDA8"
  fundo: "#FFFBFD"
  papel: "#FFFFFF"
  tinta: "#2A1230"
  tinta-suave: "#5E4964"
  linha: "#EBD3E0"
  linha-suave: "#F5E6EE"
  amarelo-faixa: "#F7C928"
typography:
  display:
    fontFamily: "Encode Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(40px, 7.6vw, 88px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Encode Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(30px, 4.6vw, 46px)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Encode Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0"
  body:
    fontFamily: "Ubuntu Site, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Encode Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.01em"
rounded:
  sm: "3px"
  md: "4px"
  pill: "50%"
spacing:
  xs: "8px"
  sm: "14px"
  md: "22px"
  lg: "34px"
  xl: "46px"
  gutter: "clamp(16px, 4.5vw, 56px)"
components:
  button-primary:
    backgroundColor: "{colors.tinta}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.rosa-tinta}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.md}"
    padding: "14px 26px"
  chip-filtro:
    backgroundColor: "transparent"
    textColor: "{colors.tinta-suave}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  chip-filtro-ativo:
    backgroundColor: "{colors.rosa-tinta}"
    textColor: "#FFFFFF"
  etiqueta-unissex:
    backgroundColor: "{colors.bebe-sol}"
    textColor: "{colors.tinta}"
    padding: "24px 13px 10px"
  etiqueta-menina:
    backgroundColor: "{colors.bebe-rosa}"
    textColor: "{colors.tinta}"
  etiqueta-menino:
    backgroundColor: "{colors.bebe-azul}"
    textColor: "{colors.tinta}"
  tamanho:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.tinta}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  tamanho-ativo:
    backgroundColor: "{colors.rosa-tinta}"
    textColor: "#FFFFFF"
  promo:
    backgroundColor: "{colors.turquesa-claro}"
    textColor: "{colors.turquesa-escuro}"
    rounded: "{rounded.sm}"
    padding: "3px 9px"
---

# Design System: Mimo Kids Presentes

## Overview

**Creative North Star: "A Arara da Loja Fina"**

A vitrine é uma arara de loja delicada: a foto da peça fica pendurada, limpa e grande, e o preço vem numa etiqueta de papel com furo reforçado e barbante rosa, levemente inclinada. Tudo o mais recua. A interface fala baixo, em letras estreitas do logo, em minúsculas com peso médio, sobre branco rosado e tinta ameixa.

A cor entra em blocos de pastel de bebê, não em tinta forte. A abertura é rosa-bebê, a faixa "Chegou agora" e o rodapé são azul-bebê, e a etiqueta de cada peça toma a cor do gênero (menina rosa-bebê, menino azul-bebê, unissex amarelo-bebê). O rosa e o turquesa fortes do logo ficam para detalhes pequenos: barbante, furo, botão ativo, foco, promoção. Essa cor nos blocos veio por pedido do usuário depois da primeira direção, que era toda branca; a construção final a assume.

Densidade baixa, uma coluna de leitura por vez, sombras de papel suaves. Direção anterior (Armarinho: turquesa, cartelas, fita métrica) foi rejeitada pelo usuário e não deve voltar.

**Key Characteristics:**
- Foto 3:4 limpa como protagonista; o preço mora na etiqueta pendurada, nunca sobre a foto em caixa.
- Pastéis de bebê em áreas grandes, cores fortes do logo só em detalhes.
- Títulos estreitos (Encode Sans Condensed) semibold, texto corrido em Ubuntu.
- Etiqueta de papel com cantos superiores chanfrados, furo, barbante e inclinação de 3 graus.
- Formas de 3 a 4px; círculos apenas para amostras de cor, sacola e fechar.

## Colors

Pastéis de bebê em blocos, branco rosado como chão, tinta ameixa para texto, rosa e turquesa do logo em pequenos acentos.

### Primary
- **Rosa do Logo** (#E80088): detalhes decorativos: faixa colorida da abertura, filete superior do rodapé, borda da miniatura selecionada, foco da busca, fundo de seleção de texto.
- **Rosa Carimbo** (#BC006A; token `rosa-tinta`): a versão escurecida do rosa que passa contraste para texto. Barbante e furo da etiqueta, ênfase "Grandes memórias." no título, filtro e tamanho ativos, contador da sacola, hover do botão, links de remover e mensagens de erro.

### Secondary
- **Turquesa do Logo** (#50C0D0): anel de foco (3px) e faixa da abertura. Nunca como fundo de bloco.
- **Turquesa Profundo** (#17727F) sobre **Turquesa Névoa** (#DDF3F6): selo de promoção ("Leve 3 por R$ 99"), linha de desconto e aviso de brinde na sacola. Turquesa significa promoção.

### Tertiary
- **Rosa-bebê** (#FFD6EA): fundo da abertura e etiqueta de peça de menina.
- **Azul-bebê** (#CDEEF4): fundo de "Chegou agora", do rodapé e etiqueta de peça de menino.
- **Amarelo-bebê** (#FFEDA8): etiqueta de peça unissex.
- **Amarelo da faixa** (#F7C928): só o terceiro trecho da faixa tricolor da abertura.

### Neutral
- **Branco Rosado** (#FFFBFD): chão da página, cabeçalho translúcido, diálogos.
- **Papel** (#FFFFFF): etiqueta neutra (base), selo "novo", campos.
- **Tinta Ameixa** (#2A1230): texto, botão primário, faixa de aviso, sublinhado da busca.
- **Ameixa Suave** (#5E4964): texto secundário, filtros inativos.
- **Fio Rosado** (#EBD3E0) e **Fio Rosado Suave** (#F5E6EE): divisórias, bordas de campo, fundo de carregamento da foto, hover.

### Named Rules
**The Pastel Block Rule.** Pastel de bebê preenche áreas grandes (abertura, faixa, rodapé, etiqueta); o rosa e o turquesa fortes do logo nunca preenchem bloco, só marcam detalhe.
**The Tag Color Rule.** A cor da etiqueta de preço é função do gênero da peça no catálogo: menina rosa-bebê, menino azul-bebê, unissex amarelo-bebê. Sem gênero, papel branco.
**The Turquoise Means Sale Rule.** Turquesa em texto ou selo significa promoção; fora disso só o anel de foco.
**The Contrast Pink Rule.** Texto e estados ativos usam o rosa escurecido (`rosa-tinta`), nunca o rosa puro do logo.

## Typography

**Display Font:** Encode Sans Condensed (Medium, SemiBold, Bold; com Arial Narrow, system-ui)
**Body Font:** Ubuntu (Regular, Medium, Bold; com system-ui)

**Character:** Letras estreitas e calmas, parentes das do logo, para tudo que nomeia e precifica; Ubuntu humaniza o texto corrido. Maiúsculas e minúsculas normais, sem caixa alta gritada.

### Hierarchy
- **Display** (600, clamp(40px, 7.6vw, 88px), 1.02): frase da marca na abertura, até 14ch, com `text-wrap: balance`.
- **Headline** (600, clamp(30px, 4.6vw, 46px), 1.05): títulos de seção ("Chegou agora", "Todas as peças"); título da peça no diálogo usa 32 a 44px.
- **Title** (600, 21px, 1.15): nome da peça no cartão; preço na etiqueta (600, 20px, 1); preço grande no diálogo (600, 38px).
- **Body** (400, 16px, 1.55): descrições limitadas a 62ch; notas em 13,5 a 14px.
- **Label** (500, 17px, 1.2, 0.01em): filtros, tamanhos, rótulos e botões (botão 600, 19px, 0.03em).

### Named Rules
**The Quiet Condensed Rule.** Títulos e preços em Encode Condensed minúsculo/misto; tracking positivo só em rótulos de até 19px.

## Layout

Margem lateral fluida `clamp(16px, 4.5vw, 56px)` em todas as seções. Abertura em grade: uma coluna no celular, frase à esquerda e dois fatos em texto simples à direita a partir de 880px. Catálogo em 2 colunas no celular, 3 a partir de 720px, 4 a partir de 1100px, com vão de 34 a 46px entre linhas e 14 a 22px entre colunas. "Chegou agora" é um trilho horizontal com encaixe, cartões de 220 a 290px. Cabeçalho (76px, 66px abaixo de 420px) e barra de filtros são fixos no topo. Detalhe da peça: duas colunas a partir de 900px; no celular ocupa a tela toda, com a barra de ação fixa embaixo. Sacola é gaveta lateral de 440px. Alvos de toque de 40 a 46px ou mais.

## Elevation & Depth

Plano, com sombra apenas de papel. A etiqueta usa duas sombras projetadas suaves (`drop-shadow(0 1px 1px rgba(42,18,48,.25)) drop-shadow(0 8px 8px rgba(42,18,48,.18))`), que respeitam o recorte chanfrado. O botão de fechar e a gaveta usam sombras difusas ameixa. Cartões de peça não têm sombra.

### Shadow Vocabulary
- **Papel** (`0 1px 2px rgba(42,18,48,.10), 0 10px 22px -10px rgba(42,18,48,.30)`): botão fechar.
- **Gaveta** (`-12px 0 30px -12px rgba(42,18,48,.35)`): sacola.

### Named Rules
**The Paper Shadow Rule.** Sombras são difusas, tingidas de ameixa e com desfoque; nunca sólidas, nunca deslocadas sem desfoque.

## Shapes

Quase retas: 3px nas fotos e selos, 4px em botões, campos, filtros e tamanhos, 6px no diálogo grande. Círculos só onde o objeto é redondo (amostra de cor, contador, fechar, furo da etiqueta). A forma assinatura é a etiqueta: retângulo com os dois cantos de cima cortados em 12px, furo circular de 11px com anel de 2px em rosa carimbo, barbante de 2px descendo do topo, inclinação de 3 graus (hover: -2 graus).

## Components

### Buttons
- **Shape:** cantos de 4px.
- **Primary:** fundo tinta ameixa, texto branco, 14px 26px, rótulo de 19px 600.
- **Hover / Focus:** fundo vira rosa carimbo em 150ms; foco com anel turquesa de 3px.
- **Secondary:** transparente com contorno interno de 1,5px em ameixa; hover em fio rosado suave.

### Chips (filtros e tamanhos)
- **Style:** filtros sem caixa, texto ameixa suave; hover ganha borda fina. Tamanhos com borda de 1,5px em fio rosado sobre branco.
- **State:** ativo em rosa carimbo com texto branco; tamanho indisponível tracejado e riscado.

### Cards / Containers
- **Corner Style:** foto com 3px. **Background:** fundo de carregamento fio rosado suave. **Shadow:** nenhuma no cartão; só na etiqueta. **Border:** nenhuma. Nome, meta e amostras de cor abaixo da foto, sem caixa.

### Inputs / Fields
- Busca só com sublinhado de 1,5px em ameixa que vira rosa no foco; campos de texto com borda de 1,5px em fio rosado e 4px de canto.

### Navigation
- Cabeçalho branco rosado translúcido com filete inferior: logo à esquerda, busca, sacola (ícone de linha de 1,7px). Contador em rosa carimbo.

### Etiqueta de preço (assinatura)
- Papel pendurado no canto superior direito da foto, com furo, barbante, chanfros e inclinação. Cor pelo gênero (Tag Color Rule). Carrega só o preço.

### Selo de promoção
- Pílula retangular de 3px, turquesa profundo sobre turquesa névoa (branco dentro de "Chegou agora").

## Do's and Don'ts

### Do:
- **Do** manter a foto 3:4 limpa; preço, só na etiqueta pendurada.
- **Do** usar pastel de bebê para blocos grandes e rosa/turquesa fortes só em detalhes.
- **Do** colorir a etiqueta pelo gênero do catálogo e manter ameixa como cor de texto.
- **Do** usar o rosa escurecido (`rosa-tinta`) para texto e estados ativos.
- **Do** manter sombras difusas e tingidas de ameixa, e respeitar `prefers-reduced-motion`.

### Don't:
- **Don't** voltar à direção Armarinho (turquesa em bloco, cartelas, fita métrica), rejeitada pelo usuário.
- **Don't** usar caixa alta gritada nem texto de interface em condensado preto pesado.
- **Don't** pôr o rosa ou o turquesa puros do logo como fundo de bloco.
- **Don't** inventar estoque, prazo ou prova social.
