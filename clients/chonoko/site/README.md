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

## Cardápio

O cardápio é o **real**, transcrito dos dois PDFs da Chonoko: 83 produtos em 13 categorias, com as fotos dos próprios PDFs.
Ele se divide em dois grupos, **Na loja** (pronta entrega) e **Doces finos** (encomendas, preço por cento).
O registro da extração e os pontos a confirmar estão em `clients/chonoko/cardapio-extraido.md`.

## Painel da equipe (`/admin`)

As proprietárias podem atualizar o site sozinhas por estas telas:

| Tela | O que dá para fazer |
|---|---|
| Início | Resumo, atalhos e lista do que falta completar |
| Promoções | Criar, editar, excluir, ativar/desativar; foto, preço "de/por", início, término, condições; tipos Promoção, Novidade e Produto especial |
| Cardápio | Produtos: nome, categoria, descrição, tamanhos e preços, foto, mostrar/ocultar no site |
| Categorias | Criar, renomear, trocar ícone, reordenar, excluir |
| Contato e horários | WhatsApp e mensagem inicial, endereço e horários por dia |

O que estiver ativo e dentro do período aparece sozinho na seção de Novidades do site.

### Modo demonstração (hoje)

- Não há senha: a tela de acesso é demonstrativa.
- Os dados ficam no `localStorage` do navegador. O site aberto no mesmo navegador mostra as mudanças na hora, inclusive em outra aba.
- "Restaurar dados originais" volta ao cardápio dos PDFs.

### Caminho para a versão oficial

Tudo passa por `src/lib/dados/repositorio.ts`, então as telas não precisam mudar. Para a versão oficial falta:

1. Criar um `RepositorioRemoto` (por exemplo, Supabase/Postgres) com as tabelas `categorias`, `produtos`, `publicacoes` e `info_loja`, seguindo os tipos de `src/lib/dados/tipos.ts`.
2. Guardar as fotos num armazenamento de arquivos e salvar no banco só a URL.
3. Adicionar login das proprietárias e proteger `/admin` e as gravações com regras de acesso.
4. Gerar o site público no servidor a partir do banco, revalidando a cada alteração (mantém velocidade e SEO).

## Onde ficam os dados iniciais

| Arquivo | O que tem |
|---|---|
| `src/data/cardapio.ts` | Categorias, produtos e regras de encomenda (dos PDFs) |
| `src/data/site.ts` | Nome, Instagram, WhatsApp, ano de fundação (a confirmar), endereço e horários (a confirmar) |
| `src/data/conteudo.ts` | Fotos do espaço, galeria, publicações de exemplo e avaliações ilustrativas |
| `public/cardapio/` | Fotos dos produtos (recortadas dos PDFs) |

## Estrutura

```text
src/
  app/            layout (SEO, fontes), página, estilos globais, ícones e imagem de compartilhamento
  assets/images/  fotos reais da Chonoko (cópias tratadas de clients/chonoko/assets)
  components/
    layout/       cabeçalho + menu mobile, rodapé, barra de protótipo, atalhos mobile
    admin/        telas do painel da equipe
    sections/     abertura, experiência, cardápio, galeria, história, novidades, avaliações, localização
    ui/           botões, títulos, selo animado, fotos de produto, revelação ao rolar
  data/           dados iniciais
  lib/dados/      tipos, repositório (armazenamento) e estado compartilhado site ↔ painel
```

## O que ainda depende da Chonoko

- Endereço e horários de funcionamento.
- Confirmação do ano de fundação (1988, citado no Menu Loja).
- Cardápio de cafés e bebidas, que não está nos PDFs.
- Pontos do cardápio listados em `clients/chonoko/cardapio-extraido.md` (preço das tortas, "Lagar.H", "Brulle", cestas).
- História da marca com mais detalhes.
- Avaliações reais autorizadas: as atuais são **ilustrativas**.
- Promoções reais: as atuais são **exemplos**.
- Confirmação das cores e logo em vetor.
