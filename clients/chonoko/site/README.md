# Site Chonoko — protótipo de apresentação

Site institucional de página única da **Chonoko** (cafeteria e chocolates artesanais, Cachoeira do Sul – RS),
feito para apresentar a proposta aos responsáveis e colher opiniões antes da versão oficial.

> **Protótipo.** Tudo o que ainda não foi confirmado pela cafeteria aparece marcado como _exemplo_,
> _texto provisório_ ou _a confirmar_. O site está com `noindex` para não aparecer no Google até a versão final.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

Requer Node.js 20.9+.

## Tecnologias

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Lucide e `next/font`
(Cormorant Garamond nos títulos e Manrope nos textos). Não há backend nem integrações externas, a não ser o
mapa do Google, que só carrega quando o visitante clica.

## Onde atualizar o conteúdo

Todo o conteúdo fica separado do visual, em `src/data/`:

| Arquivo | O que tem |
|---|---|
| `src/data/site.ts` | Endereço, WhatsApp, horários, Instagram, link de avaliações e embed do mapa. Campos `null` aparecem como "a confirmar". |
| `src/data/cardapio.ts` | Categorias e itens do cardápio. **Hoje só tem itens de exemplo** (`demo: true`, sem preço e sem foto). |
| `src/data/conteudo.ts` | Fotos reais, galeria, novidades (exemplos) e avaliações (lista vazia de propósito). |

Quando os dados forem preenchidos, os avisos de "exemplo" e "a confirmar" somem sozinhos. Por exemplo:
- `whatsapp: "5551XXXXXXXXX"` ativa os botões de WhatsApp com mensagem pronta;
- quando nenhum item do cardápio tiver `demo: true`, o aviso de cardápio demonstrativo deixa de aparecer;
- adicionar avaliações reais em `avaliacoes` troca os cards vazios pelos depoimentos.

Fotos de produtos vão em `public/cardapio/` e são referenciadas no item (`foto: "/cardapio/nome.jpg"`).

## Estrutura

```text
src/
  app/            layout (SEO, fontes), página, estilos globais, ícones e imagem de compartilhamento
  assets/images/  fotos reais da Chonoko (cópias tratadas de clients/chonoko/assets)
  components/
    layout/       cabeçalho + menu mobile, rodapé, barra de protótipo, atalhos mobile
    sections/     abertura, experiência, cardápio, galeria, história, novidades, avaliações, localização
    ui/           botão, títulos, selo animado, artes provisórias, revelação ao rolar
  data/           conteúdo editável
```

## O que ainda depende da Chonoko

Ver a lista completa em `clients/chonoko/brand-guide.md`, seção 7. Em resumo: endereço, horários, WhatsApp
(e a finalidade dele), cardápio com preços, fotos dos produtos, a história da marca, promoções vigentes,
avaliações autorizadas (ou link do perfil no Google), confirmação das cores e o logo em vetor.
