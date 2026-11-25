# Diretrizes de design para gastronomia

## Direção de arte
Buscar uma aparência sofisticada, contemporânea e acolhedora, sem cair em um template genérico. O design deve nascer da marca, da arquitetura do espaço, das embalagens e das fotografias dos produtos.

## Processo de definição visual
1. Inspecionar logo, cardápio, fachada, interiores e redes sociais.
2. Registrar cores confirmadas separadamente de cores apenas sugeridas pelas fotos.
3. Definir uma paleta com: cor principal, cor secundária, fundo, superfície, texto e cor de destaque.
4. Verificar contraste de texto e botões.
5. Escolher no máximo duas famílias tipográficas principais (display e leitura), considerando legibilidade e licença.
6. Definir escala de espaçamento, raios, bordas, largura máxima e ritmo vertical.
7. Mostrar uma proposta visual inicial antes de replicar o sistema em todas as páginas.

## Fotografia
- Preferir fotos próprias, nítidas e bem iluminadas.
- Usar imagens de pratos em destaque com enquadramento coerente e proporção adequada.
- Não esticar, distorcer ou recortar elementos importantes.
- Aplicar `object-fit` conscientemente; fornecer `object-position` quando necessário.
- Usar imagens responsivas e formatos modernos quando suportados.
- Não usar imagens geradas para representar um produto real sem aprovação explícita.

## Composição
- Criar hierarquia clara entre título, texto, preço e ação.
- Alternar áreas de respiro com seções visuais fortes.
- Evitar excesso de caixas, bordas, sombras e efeitos.
- Manter consistência sem repetir o mesmo layout em todas as seções.
- Usar animações curtas e discretas; nunca sacrificar acessibilidade ou desempenho.

## Responsividade
- Projetar primeiro para celular.
- Garantir alvos de toque confortáveis.
- Evitar menus horizontais que transbordem.
- Verificar que textos e preços não sejam cortados.
- Não depender de hover para revelar informação essencial.

## Acessibilidade
- HTML semântico e ordem de títulos coerente.
- Contraste adequado.
- Foco de teclado visível.
- `alt` descritivo para imagens informativas; `alt=""` para decoração.
- Botões com nomes acessíveis.
- Respeitar `prefers-reduced-motion`.
