# Stack técnica recomendada

## Padrão para um site gastronômico moderno

| Camada | Recomendação | Motivo |
|---|---|---|
| Framework | Next.js (App Router) | React, roteamento, renderização e SEO |
| Linguagem | TypeScript | Segurança de tipos e manutenção |
| Estilo | Tailwind CSS | Consistência e velocidade de implementação |
| Componentes | Componentes próprios; shadcn/ui quando útil | Controle visual e acessibilidade |
| Ícones | Lucide | Conjunto consistente |
| Animação | CSS; Motion se necessário | Evitar peso e movimento excessivos |
| Conteúdo inicial | Arquivos TS/JSON tipados | Atualização simples sem backend |
| CMS futuro | Sanity, Payload ou outro após avaliar requisitos | Edição por equipe sem mexer no código |
| Hospedagem | Vercel ou hospedagem compatível | Fluxo simples para Next.js |
| Versionamento | Git | Histórico e colaboração |

## Quando escolher outra coisa
- Astro: site majoritariamente estático, com pouca interatividade.
- HTML/CSS/JS: landing page muito pequena e sem necessidade de framework.
- CMS: adotar quando a equipe realmente precisar editar cardápio, promoções e conteúdo com frequência sem desenvolvedor.
- Banco de dados/backend: somente quando houver pedidos próprios, login, gestão, pagamento ou fluxo transacional real.

## Regras
- Conferir documentação oficial e versões estáveis no início do projeto.
- Não fixar números de versão desatualizados sem verificar.
- Manter o lockfile no Git e usar o gerenciador já adotado pelo projeto.
- Não adicionar dependências por conveniência quando CSS/HTML nativo resolver.
- Não colocar segredos no repositório.
- Definir metadados, Open Graph, favicon e sitemap quando aplicável.
- Considerar SEO local com nome, endereço e telefone consistentes, sem inventar dados estruturados.

## Estrutura de projeto sugerida

```text
src/
  app/
    layout.tsx
    page.tsx
    cardapio/
      page.tsx
    sobre/
      page.tsx
    globals.css
  components/
    layout/
    sections/
    menu/
    ui/
  data/
    menu.ts
    site.ts
  lib/
    whatsapp.ts
public/
  images/
    brand/
    atmosphere/
    menu/
```

Adaptar à estrutura existente; não recriar um projeto inteiro sem necessidade.
