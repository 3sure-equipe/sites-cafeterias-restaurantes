---
name: restaurant-cafe-web
description: Cria, planeja, implementa e aprimora sites profissionais para restaurantes, cafeterias e negócios gastronômicos. Use ao criar páginas institucionais, cardápios digitais, galerias, pedidos por WhatsApp, localização, avaliações, promoções ou ao revisar a experiência visual e técnica desses sites.
---

# Restaurant & Cafe Web

## Objetivo

Projetar e implementar sites gastronômicos elegantes, rápidos, acessíveis, responsivos e orientados à conversão. Trabalhar com a identidade real de cada estabelecimento; nunca aplicar um template genérico sem adaptação.

## Princípios obrigatórios

1. **Identidade antes do layout:** examinar logotipo, fotos, cardápios, embalagens, decoração, redes sociais e materiais fornecidos. Extrair uma paleta coerente desses materiais. Não inventar cores da marca.
2. **Conteúdo verdadeiro:** não inventar pratos, ingredientes, preços, horários, endereço, telefone, avaliações, prêmios, promoções ou alegações comerciais. Marcar dados ausentes como pendentes e perguntar o que for essencial.
3. **Fotografia real em primeiro lugar:** priorizar imagens fornecidas pelo estabelecimento. Não substituir fotos reais por imagens genéricas de banco quando o usuário já forneceu material adequado. Não alterar visualmente um prato de modo que prometa algo diferente do produto servido.
4. **Design editorial e detalhista:** construir hierarquia tipográfica, espaçamento consistente, composição intencional, imagens de qualidade e microinterações discretas. Evitar excesso de gradientes, sombras, cartões repetidos, ícones decorativos e efeitos que prejudiquem a leitura.
5. **Mobile-first:** a experiência em celular é prioritária. Testar navegação, cardápio, botões, mapas e WhatsApp em larguras pequenas.
6. **Acessibilidade e desempenho:** usar HTML semântico, contraste adequado, foco visível, textos alternativos, imagens otimizadas, carregamento eficiente e respeito a `prefers-reduced-motion`.
7. **Conversão sem atrito:** deixar cardápio, endereço, horário e ação principal fáceis de encontrar. O CTA principal deve refletir o fluxo real do negócio (WhatsApp, pedido online, reserva ou visita).
8. **Não presumir integrações:** não afirmar que pedidos, pagamentos, reservas ou avaliações estão conectados se isso não foi implementado e testado.

## Fluxo de trabalho

### Etapa 1 — Entender o estabelecimento

Antes de codificar, revisar os arquivos existentes e reunir:
- nome, cidade, endereço, telefone/WhatsApp, horário e links oficiais;
- público, posicionamento, personalidade e diferenciais;
- logotipo, paleta existente, tipografia e referências visuais;
- categorias do cardápio, nomes, descrições, preços, fotos e disponibilidade;
- objetivo principal do site e jornada desejada para o cliente;
- conteúdo de promoções, avaliações e redes sociais.

Consultar `references/project-brief-template.md`. Se houver informações essenciais faltando, fazer perguntas curtas e agrupadas. Não bloquear o início por detalhes não essenciais: usar placeholders claramente identificados.

### Etapa 2 — Auditar os materiais visuais

1. Listar e inspecionar os arquivos de imagem disponíveis no projeto.
2. Identificar quais imagens correspondem a fachada, ambiente, pratos, bebidas, sobremesas, equipe e marca.
3. Criar um inventário de imagens com nome do arquivo, assunto provável, proporção e uso sugerido.
4. Extrair cores dominantes do logotipo e das fotos como ponto de partida; confirmar com o usuário antes de tratar uma cor inferida como cor oficial.
5. Não usar imagens externas sem autorização/licença apropriada. Não hotlinkar imagens aleatórias.

### Etapa 3 — Planejar a experiência

Criar primeiro um mapa simples de páginas e seções. Estrutura sugerida:
- Início: proposta da marca, imagem de destaque, CTA e atalhos.
- Cardápio: categorias, produtos, descrições, preços, observações e filtros se necessários.
- Sobre: história, ambiente e diferenciais confirmados.
- Galeria: fotos reais organizadas com propósito.
- Avaliações: somente depoimentos reais autorizados ou links para plataformas externas.
- Novidades: promoções e eventos atuais, com datas e condições confirmadas.
- Visite-nos/Contato: endereço, horário, telefone, Instagram e mapa.

Não criar páginas sem conteúdo ou utilidade. Um site de uma página pode ser melhor que várias páginas vazias.

### Etapa 4 — Escolher a arquitetura

Para projetos novos, usar como padrão recomendado:
- Next.js com App Router e TypeScript;
- React;
- Tailwind CSS para estilos;
- componentes acessíveis e reutilizáveis; shadcn/ui somente quando trouxer valor real;
- ícones Lucide;
- animações leves com CSS; usar Motion apenas quando a interação justificar;
- conteúdo estruturado em TypeScript/JSON enquanto não houver necessidade real de CMS;
- Git para versionamento;
- Vercel como opção simples de hospedagem para Next.js.

Confirmar versões estáveis e compatibilidade no momento da implementação. Não instalar bibliotecas desnecessárias. Para sites extremamente simples, considerar Astro ou HTML/CSS/JS se a necessidade de interatividade for pequena. Ver `references/tech-stack.md`.

### Etapa 5 — Implementar em incrementos

1. Inspecionar a estrutura atual do repositório antes de alterar arquivos.
2. Respeitar convenções, dependências e componentes existentes.
3. Propor a direção visual antes de expandir o site: paleta, tipografia, layout, fotografia e componentes.
4. Construir primeiro cabeçalho, hero, navegação e rodapé; depois cardápio, galeria, contato e demais recursos.
5. Separar conteúdo de apresentação para facilitar atualização de preços e produtos.
6. Criar componentes reutilizáveis sem transformar cada seção em um cartão genérico.
7. Manter links, botões e formulários funcionais. Não deixar CTA sem destino.
8. Não sobrescrever arquivos ou configurações importantes sem inspecioná-los e explicar o impacto.

### Etapa 6 — Recursos específicos

**Cardápio**
- Exibir nome, descrição, preço e imagem apenas quando disponíveis.
- Organizar por categorias claras.
- Permitir atualização fácil do conteúdo.
- Não inventar ingredientes, alergênicos, tamanhos ou disponibilidade.
- Preços devem ter formato monetário local (BRL) quando o negócio estiver no Brasil.

**WhatsApp**
- Usar número internacional no formato `55DDDNUMERO`, apenas após confirmação.
- Gerar link `https://wa.me/NUMERO` e, se útil, mensagem inicial codificada.
- Testar o link; não exibir um número fictício como se fosse real.
- Deixar claro se o WhatsApp serve para pedidos, dúvidas ou reservas.

**Mapa e localização**
- Usar endereço confirmado.
- Preferir link de rota do Google Maps ou embed oficial. Não inventar coordenadas.
- Oferecer endereço em texto para acessibilidade e cópia.

**Avaliações**
- Publicar apenas avaliações reais, com autorização e origem identificável.
- Não criar nomes, estrelas, depoimentos ou contagens fictícias.
- Se não houver autorização, adicionar link para a página pública de avaliações, se fornecida.

**Promoções e novidades**
- Incluir validade, condições e data quando aplicável.
- Remover ou sinalizar conteúdo expirado.
- Não apresentar preço promocional sem preço e regras confirmados.

**Galeria**
- Usar imagens reais, otimizadas e com `alt` útil.
- Evitar carrossel automático; preferir galeria navegável e acessível.
- Não usar a mesma foto repetidamente apenas para preencher espaço.

### Etapa 7 — Validar

Consultar `references/quality-checklist.md`. No mínimo:
- instalar dependências de forma consistente com o lockfile;
- executar lint, typecheck e build quando os scripts existirem;
- corrigir erros introduzidos;
- testar navegação, links, WhatsApp, mapa e CTAs;
- verificar layout em celular e desktop;
- conferir estados vazios, dados ausentes e imagens quebradas;
- revisar acessibilidade básica, metadados e compartilhamento social.

Relatar com transparência o que foi testado, o que passou e o que ainda depende de dados, credenciais ou validação do estabelecimento.

## Regras de comunicação

- Fazer perguntas apenas quando a resposta alterar uma decisão importante.
- Explicar decisões técnicas em linguagem simples.
- Não afirmar que o site está publicado sem efetuar e verificar o deploy.
- Não solicitar nem armazenar senhas, tokens ou credenciais no código. Usar variáveis de ambiente e `.env.local` ignorado pelo Git.
- Ao terminar uma etapa, resumir arquivos alterados, funcionalidades implementadas, testes executados e pendências.

## Referências internas

- Para levantar dados do cliente: `references/project-brief-template.md`.
- Para direção visual: `references/design-system.md`.
- Para arquitetura: `references/tech-stack.md`.
- Para integrações e conteúdo: `references/content-and-integrations.md`.
- Para revisão final: `references/quality-checklist.md`.
- Exemplo preenchido inicial: `examples/chonoko-project-brief.md`.
