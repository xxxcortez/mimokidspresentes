# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Site estático em HTML, CSS e JavaScript puros (sem build), publicado no GitHub Pages em `mimokidspresentes.com.br`. O catálogo vem de `produtos.json`, alimentado automaticamente por um bot do Telegram a cada peça postada no Instagram.

## Users

Mães e pais que compram para os próprios filhos e pessoas que presenteiam (avós, tias, amigas: nascimento, chá de bebê, aniversário), com peso parecido. Chegam principalmente pelo celular, vindos de Stories e do feed do Instagram (@mimokidspresentes) ou das lives no TikTok, escolhem peças e fecham o pedido pelo WhatsApp.

## Product Purpose

Vitrine online da loja Mimo Kids Presentes (moda bebê e infantil, do RN ao tamanho 4, mais presentes e acessórios). O site deixa ver as peças, escolher cor e tamanho, montar uma sacola e enviar o pedido pronto pelo WhatsApp. Sucesso: a cliente acha a peça rápido e manda o pedido sem dúvida sobre tamanho, cor, preço ou promoção.

## Positioning

Preço acessível (peças a partir de R$ 35, promoções por quantidade como "3 por R$ 99"), peças delicadas e presentes, atendimento próximo pelo WhatsApp e lives, e novidade toda semana: a vitrine se renova sozinha a cada peça postada no Instagram.

## Operating Context

- O pedido é sempre confirmado pelo WhatsApp (+55 67 98154-2208); não há checkout nem pagamento no site.
- Pagamento: Pix com o preço do site; cartão de crédito em até 12x com juros por conta do cliente.
- Entrega grátis acima de R$ 30; brinde (1 par de meias malucas) em compras acima de R$ 199. Prazo de entrega é combinado no WhatsApp.
- Fotos das peças são geradas pelo pipeline da loja: foto de cabide (padrão) e, às vezes, foto com criança fictícia criada por IA, sempre com aviso.
- Redes: Instagram e TikTok @mimokidspresentes (lives com horários avisados nos Stories).

## Capabilities and Constraints

- Catálogo em `produtos.json`: peça com código (V/C/B/P + número), nome, categoria, gênero, preço, promoção `{qtd,total}`, descrição, várias cores (cada uma com fotos e tamanhos) e fotos marcadas como IA.
- Tamanhos são exatamente o texto que a loja digita (ex.: "6 meses a 1 ano", "P", "2"); sem tabela de conversão. Filtros nascem do que existe no catálogo.
- O site não deve prometer prazo, frete além do combinado, checkout automático, nem mostrar preço ou estoque que não esteja no catálogo.
- Fotos com criança criada por IA mostram o aviso "Foto ilustrativa com modelo criado por inteligência artificial".
- Idioma: português do Brasil.

## Brand Commitments

Logo oficial (`assets/logo.png`): "M" com mãozinhas e o nome "MIMO KIDS PRESENTES", em rosa `#E80088` e turquesa `#50C0D0`, letras estreitas. Frase da marca já usada pela loja: "Pequenos looks. Grandes memórias."

## Evidence on Hand

Fotos reais de catálogo geradas pelo pipeline (feed 3:4), o logo oficial, o histórico de mais de 20 peças já postadas no Instagram e a primeira peça publicada no site (V01). Não há depoimentos, avaliações nem números de venda: não inventar.

## Product Principles

- A foto da peça é a protagonista; o resto da interface recua.
- Clareza antes de enfeite: tamanho, preço e promoção sempre legíveis, inclusive no celular.
- O catálogo vem do bot; o design aguenta de 1 a centenas de peças e nomes de tamanho livres.
- Honestidade: nada de estoque, prazo ou prova social inventados; aviso claro nas fotos com IA.
- Pedido por WhatsApp é o caminho principal, com o mínimo de passos.

## Accessibility & Inclusion

Uso majoritário em celular. Contraste legível, alvos de toque confortáveis, foco visível, respeito a movimento reduzido, texto em português do Brasil.
