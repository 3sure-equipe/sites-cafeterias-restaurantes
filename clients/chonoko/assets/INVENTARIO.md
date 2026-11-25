# Inventário de imagens — Chonoko

Os originais ficam intactos em `assets/`. As versões tratadas ficam em `assets/tratadas/` e são as que o site deve usar.
Não há fotos melhores disponíveis por enquanto. Nenhum tratamento altera o conteúdo real das fotos: só recortes e remoção de fundo.

| Arquivo | Assunto | Tamanho / proporção | Uso sugerido |
|---|---|---|---|
| `fachada-chonoko.jpeg` (original) | Fachada de esquina: toldo listrado bordô e branco, letreiro cursivo, parede taupe | 1034×1039, ~1:1 | Seção "Visite-nos" / localização ou "Sobre". Sem texto sobreposto, pode ser usada como está. Ponto de foco: toldo e porta (centro-esquerda). Evitar recortes que destaquem a fiação no céu. |
| `ambiente-chonoko.jpeg` (original) | Print de Story do Instagram com texto, contador "8/9" e ícone de som por cima | 1170×1446 | **Não usar no site.** Mantido só como referência. |
| `tratadas/ambiente-chonoko-recorte.jpg` | Interior: parede rosa queimado, letreiro de madeira "Chonoko", geladeira "Tortas", mesa de madeira, prateleiras, balcão de chocolates | 1170×800, ~3:2 (paisagem) | Hero ou seção de ambiente/experiência. Recorte da faixa central do Story, sem nenhum texto ou ícone sobreposto. A parte de baixo ficou um pouco mais escura (gradiente original do Story). |
| `logo-chonoko.jpeg` (original) | Selo circular bordô, "Chonoko" cursivo, "Qualidade e Sabor" / "Chocolates Artesanais" | 1075×1060, fundo cinza claro | Referência. |
| `tratadas/logo-chonoko-transparente.png` | Mesmo selo, recortado em círculo | 974×974, fundo transparente | Logo do site (cabeçalho, rodapé, favicon). É uma imagem, não um vetor: bom até ~200 px de largura. Para tamanhos grandes, pedir o vetor à cafeteria se um dia ficar disponível. |

## Lacunas
- Não há fotos de produtos (cafés, chocolates, tortas, bebidas). O cardápio deve funcionar bem **sem fotos** até que existam, sem usar imagens de banco no lugar dos produtos reais.
- Com só duas fotos utilizáveis, a galeria fica pequena: considerar não criar uma seção de galeria separada e usar as duas fotos em hero/sobre/visite-nos.

## Como as versões tratadas foram feitas
- Ambiente: recorte retangular de y=160 a y=960 em toda a largura, salvo em JPEG qualidade 92.
- Logo: detecção automática do círculo escuro e máscara circular com antialiasing, salvo em PNG com transparência.
