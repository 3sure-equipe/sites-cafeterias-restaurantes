# Cardápio da Chonoko: dados extraídos dos PDFs

Fontes: `Novo_Menu_Loja_Chonoko.pdf` (11 páginas) e `Novo_Menu_Doces_Finos_Chonoko.pdf` (8 páginas).
Todas as páginas foram lidas. O texto foi extraído direto do PDF (não por OCR) e conferido com a imagem de cada página.
As 85 fotos de produtos dos PDFs foram associadas ao item correspondente pela posição na página e conferidas uma a uma.
Elas estão em `site/public/cardapio/`. No site, os dados ficam em `site/src/data/cardapio.ts`.

## Menu Loja (pronta entrega)

**Apresentação (pág. 1):** "A Chonoko é especializada na fabricação de chocolates e biscoitos artesanais. São bombons, trufas,
barras, biscoitos doces e salgados feitos com ingredientes selecionados e receitas únicas. Fundada em Cachoeira do Sul, oferece,
desde 1988, os melhores sabores em toda linha de produtos."

| Categoria | Produto | Preços |
|---|---|---|
| Cestas | Cestas prontas / cesta personalizada | sem preço no PDF ("sob consulta") |
| Biscoitos | Casadinho | 65g R$ 12,00 · 150g R$ 18,00 |
| | Biscoito de limão | 50g R$ 10,00 · 150g R$ 18,00 |
| | Biscoito de amendoim ou nozes cobertos | 65g R$ 16,00 · 150g R$ 29,00 |
| | Biscoito de amendoim ou nozes | 50g R$ 10,00 · 150g R$ 18,00 |
| | Biscoito de coco com chocolate | 50g R$ 12,00 · 150g R$ 20,00 |
| | Biscoito de coco | 50g R$ 10,00 · 150g R$ 18,00 |
| | Biscoito de mel coberto | 65g R$ 16,00 · 200g R$ 32,00 |
| | Biscoito de azeitona, orégano, cebola ou bacon | 50g R$ 10,00 · 100g R$ 18,00 |
| | Biscoito de goiabinha | 50g R$ 10,00 · 150g R$ 18,00 |
| | Palito de queijo ou cebola | 50g R$ 10,00 · 150g R$ 16,00 |
| | Biscoito de laranja | 50g R$ 10,00 · 150g R$ 18,00 |
| | Biscoito de amêndoa | 50g R$ 12,00 |
| | Biscoito de canela | 50g R$ 10,00 · 150g R$ 18,00 |
| | Cookie de chocolate ou integral | 75g R$ 14,00 |
| | Biscoito Lagar.H | 50g R$ 14,00 |
| Bombons | Bombons com flocos, nozes, damasco, amendoim, castanha, 70% amargo, branco com flocos, passas | R$ 4,80 |
| | Bombons maciço meio amargo, branco, ao leite | R$ 5,80 |
| | Cacho de chocolate | 40g R$ 18,00 · 100g R$ 32,00 |
| | Coração de chocolate 15g | R$ 4,80 |
| | Bolo de mel com rum | R$ 8,50 |
| | Chocolate crocante 30g | R$ 8,20 |
| | Pão de mel | R$ 8,50 |
| Barras | Barrinha de frutas e chocolate ao leite | R$ 6,00 |
| | Paçoca com chocolate | R$ 11,80 |
| Especiais | Mix de frutas cobertas | R$ 32,00 |
| | Te amo | R$ 29,00 |
| | Plaquinha | Média R$ 21,00 · Grande R$ 24,00 |
| | Crispies | R$ 28,90 |
| Refrigerados | Figo banhado | R$ 6,50 |
| | Bombom leite condensado cozido, brigadeiro, nozes, oreo, pistache, castanha, ameixa ou passas | R$ 4,80 |
| | Bombom de licor de cereja, licor de damasco e licor de Amarula | R$ 4,80 |
| Tortas | Torta de bolacha / Torta mousse | Pequena R$ 22,00 · Média R$ 58,00 · Grande R$ 139,00 ("Tortas a pronta entrega") |

## Menu Doces Finos (encomenda, preço por 100 unidades)

**Regras (pág. 1):** mínimo 20 unidades de cada sabor; doces embalados em forminhas kraft ou brancas; caixetas ou forminhas
diferentes mediante orçamento; encomendar com antecedência.

- **Docinhos tradicionais (R$ 190,00):** brigadeiro, beijinho, casadinho, branquinho, olho de sogra, napolitano, coco queimado, bicho de pé.
- **Docinhos gourmet:**
  - R$ 190,00: mini quindim.
  - R$ 200,00: brigadeiro gourmet, churros, nozes, casadinho com cereja, confete, branquinho com topo de leite condensado cozido, trouxinha de nozes.
  - R$ 220,00: coco queimado com topo de leite condensado cozido, branquinho com avelã, brigadeiro stickadinho.
  - R$ 280,00: brulle, branquinho com damasco.
- **Doces com ganache (R$ 440,00):** ganache de limão siciliano, damasco, branco com cereja, copinho de café, trio na panelinha, ganache de frutas vermelhas, ganache de maracujá ou limão siciliano no copinho de coração.
  - Descrição da categoria: chocolate ao leite ou branco recheado nos sabores café, avelã, maracujá, nozes, amêndoas, limão, amarula, cereja, morango, damasco ou frutas vermelhas.
- **Doces especiais:**
  - Olho de sogra com coco: R$ 280,00.
  - Sanduichinho de limão siciliano ou maracujá: R$ 440,00.
  - Camafeu dourado: R$ 300,00.
  - Camafeu comum: R$ 260,00.
  - Abacaxi perolado: R$ 300,00.
  - Alpino com uva ou morango: R$ 280,00.
  - Quadradinho com morango: R$ 380,00.
  - Mini brownie: R$ 240,00.
  - Copinho com coração: R$ 380,00.
  - Copinho de coração com leite condensado cozido: R$ 380,00.
  - Mini pavlova com leite condensado cozido: R$ 200,00.
  - Figo banhado no chocolate nobre (sazonal): R$ 500,00.
  - Cestinha de nuts: R$ 360,00.
  - Quadradinho com noivinhos: R$ 500,00.
  - Chokito: R$ 320,00.
  - Mirtilo: R$ 440,00.
  - Doce de nozes, ameixa, damasco ou castanha: R$ 420,00.
  - Bombom (leite condensado cozido, maracujá, morango, galak, brigadeiro, nozes, castanha, ameixa, passas, oreo com leite condensado cozido): R$ 420,00.
  - Trufas (tradicional, amarula, limão, maracujá, avelã, nozes, branca): R$ 420,00.
  - Mini trufas: R$ 280,00.

## Itens repetidos nos dois PDFs (complementares, não duplicados)

- **Figo banhado:** R$ 6,50 a unidade na loja; R$ 500,00 o cento por encomenda (sazonal).
- **Bombom de leite condensado cozido e sabores:** R$ 4,80 a unidade na loja; R$ 420,00 o cento por encomenda.
- **Casadinho:** na loja é um *biscoito* (65g/150g); nos doces finos é um *docinho* (cento). São produtos diferentes.

## Pontos a confirmar com a Chonoko

1. **Tortas:** os preços Pequena/Média/Grande aparecem uma vez só, abaixo das duas tortas. Assumimos que valem para as duas. Também é preciso confirmar se a "Pequena" (R$ 22,00) é uma torta inteira ou uma fatia.
2. **"Biscoito Lagar.H":** nome mantido como no PDF. A foto mostra uma garrafa ao lado do pacote de biscoitos. Confirmar o nome e o que acompanha.
3. **"Brulle":** grafia mantida como no PDF (talvez "Brûlée").
4. **Ano de fundação (1988):** aparece no Menu Loja, mas ainda aguarda confirmação das proprietárias. No site, está marcado como "a confirmar".
5. **Cestas:** sem preço no PDF; no site aparecem como "sob consulta".
6. **Cafés e bebidas:** não constam em nenhum dos PDFs. A categoria existe no site, mas aparece vazia, com o aviso "em breve".
7. **Mini trufas:** sem foto própria no PDF.
8. **Unidade dos preços da loja:** para bombons e itens de preço único, entendemos o valor como preço por unidade, mas o PDF não diz isso explicitamente.
9. **Organização:** os biscoitos salgados (azeitona etc. e palito de queijo) foram separados dos doces, só para facilitar a navegação. Nenhum nome ou preço foi alterado.
