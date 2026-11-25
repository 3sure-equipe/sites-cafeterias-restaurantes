/**
 * Cardápio REAL da Chonoko, transcrito dos PDFs oficiais:
 *   - "Novo Menu Loja Chonoko" (11 páginas) → grupo "loja"
 *   - "Novo Menu Doces Finos Chonoko" (8 páginas) → grupo "encomenda"
 *
 * Nomes e preços foram mantidos como no original (apenas a caixa alta foi
 * convertida para leitura). As fotos vêm dos próprios PDFs.
 * Pontos com dúvida estão marcados com "CONFIRMAR" nos comentários.
 *
 * Estes são os dados iniciais. Depois, as proprietárias editam tudo pelo painel (/admin).
 */
import type { Categoria, Produto, Variacao } from "@/lib/dados/tipos";

export const categoriasIniciais: Categoria[] = [
  // ---------- Loja (pronta entrega) ----------
  { id: "biscoitos", grupo: "loja", nome: "Biscoitos doces", icone: "biscoito", ordem: 1, descricao: "Biscoitos artesanais em pacotes de diferentes tamanhos." },
  { id: "biscoitos-salgados", grupo: "loja", nome: "Biscoitos salgados", icone: "salgado", ordem: 2, descricao: "Para acompanhar um café ou presentear." },
  { id: "bombons", grupo: "loja", nome: "Bombons", icone: "bombom", ordem: 3, descricao: "Bombons, cachos e corações de chocolate, além de bolo e pão de mel." },
  { id: "barras", grupo: "loja", nome: "Barras", icone: "barra", ordem: 4 },
  { id: "especiais", grupo: "loja", nome: "Especiais", icone: "presente", ordem: 5, descricao: "Chocolates para presentear e dizer algo especial." },
  { id: "refrigerados", grupo: "loja", nome: "Refrigerados", icone: "refrigerado", ordem: 6, descricao: "Bombons e figos mantidos na refrigeração." },
  { id: "tortas", grupo: "loja", nome: "Tortas", icone: "torta", ordem: 7, descricao: "Tortas a pronta entrega." },
  { id: "cestas", grupo: "loja", nome: "Cestas", icone: "cesta", ordem: 8, descricao: "Sem tempo para escolher presentes? Temos cestas prontas para cada ocasião." },
  // CONFIRMAR: os PDFs não trazem cafés nem bebidas. A categoria fica visível, mas vazia, até receber o cardápio.
  { id: "cafes-bebidas", grupo: "loja", nome: "Cafés e bebidas", icone: "cafe", ordem: 9 },

  // ---------- Doces finos (encomenda, preço por 100 unidades) ----------
  { id: "docinhos-tradicionais", grupo: "encomenda", nome: "Docinhos tradicionais", icone: "docinho", ordem: 1 },
  { id: "docinhos-gourmet", grupo: "encomenda", nome: "Docinhos gourmet", icone: "gourmet", ordem: 2 },
  {
    id: "doces-ganache",
    grupo: "encomenda",
    nome: "Doces com ganache",
    icone: "ganache",
    ordem: 3,
    descricao:
      "Doces de chocolate ao leite ou branco recheado nos sabores café, avelã, maracujá, nozes, amêndoas, limão, amarula, cereja, morango, damasco ou frutas vermelhas.",
  },
  { id: "doces-especiais", grupo: "encomenda", nome: "Doces especiais", icone: "especial", ordem: 4 },
];

/** Regras de encomenda, conforme a primeira página do menu de doces finos. */
export const regrasEncomenda = [
  "Mínimo 20 unidades de cada sabor.",
  "Doces embalados em forminhas kraft ou brancas.",
  "Caixetas ou forminhas diferentes: favor solicitar orçamento.",
  "Doces feitos com chocolate nobre e produtos de alta qualidade, sempre fresquinhos. Procure encomendar com antecedência.",
];

// ---------------------------------------------------------------------------
// Atalhos para escrever os itens
// ---------------------------------------------------------------------------

const v = (rotulo: string | null, preco: number | null): Variacao => ({ rotulo, preco });
const cento = (preco: number): Variacao[] => [v("100 unidades", preco)];

let ordem = 0;
function p(
  categoriaId: string,
  id: string,
  nome: string,
  variacoes: Variacao[],
  extra: Partial<Pick<Produto, "descricao" | "foto" | "selos" | "destaque">> = {},
): Produto {
  return {
    id,
    categoriaId,
    nome,
    variacoes,
    foto: extra.foto === undefined ? `/cardapio/${id}.jpg` : extra.foto,
    descricao: extra.descricao,
    selos: extra.selos,
    destaque: extra.destaque,
    disponivel: true,
    ordem: ordem++,
  };
}

export const produtosIniciais: Produto[] = [
  // ====================== MENU LOJA ======================
  // Biscoitos (págs. 3 a 5)
  p("biscoitos", "casadinho-biscoito", "Casadinho", [v("65g", 12), v("150g", 18)], { destaque: true }),
  p("biscoitos", "biscoito-limao", "Biscoito de limão", [v("50g", 10), v("150g", 18)]),
  p("biscoitos", "biscoito-amendoim-coberto", "Biscoito de amendoim ou nozes cobertos", [v("65g", 16), v("150g", 29)]),
  p("biscoitos", "biscoito-amendoim", "Biscoito de amendoim ou nozes", [v("50g", 10), v("150g", 18)]),
  p("biscoitos", "biscoito-coco-chocolate", "Biscoito de coco com chocolate", [v("50g", 12), v("150g", 20)]),
  p("biscoitos", "biscoito-coco", "Biscoito de coco", [v("50g", 10), v("150g", 18)]),
  p("biscoitos", "biscoito-mel-coberto", "Biscoito de mel coberto", [v("65g", 16), v("200g", 32)], { destaque: true }),
  p("biscoitos", "biscoito-goiabinha", "Biscoito de goiabinha", [v("50g", 10), v("150g", 18)]),
  p("biscoitos", "biscoito-laranja", "Biscoito de laranja", [v("50g", 10), v("150g", 18)]),
  p("biscoitos", "biscoito-amendoa", "Biscoito de amêndoa", [v("50g", 12)]),
  p("biscoitos", "biscoito-canela", "Biscoito de canela", [v("50g", 10), v("150g", 18)]),
  p("biscoitos", "cookie", "Cookie de chocolate ou integral", [v("75g", 14)]),
  // CONFIRMAR: nome exatamente como no PDF ("Biscoito Lagar.H"). A foto mostra uma garrafa ao lado dos biscoitos.
  p("biscoitos", "biscoito-lagar-h", "Biscoito Lagar.H", [v("50g", 14)]),

  // Biscoitos salgados (separados dos doces para facilitar a navegação)
  p("biscoitos-salgados", "biscoito-azeitona", "Biscoito de azeitona, orégano, cebola ou bacon", [v("50g", 10), v("100g", 18)]),
  p("biscoitos-salgados", "palito-queijo", "Palito de queijo ou cebola", [v("50g", 10), v("150g", 16)]),

  // Bombons (págs. 6 e 7)
  p("bombons", "bombons-flocos", "Bombons", [v(null, 4.8)], {
    descricao: "Com flocos, nozes, damasco, amendoim, castanha, 70% amargo, branco com flocos ou passas.",
    destaque: true,
  }),
  p("bombons", "bombons-macico", "Bombons maciços", [v(null, 5.8)], { descricao: "Meio amargo, branco ou ao leite." }),
  p("bombons", "cacho-chocolate", "Cacho de chocolate", [v("40g", 18), v("100g", 32)]),
  p("bombons", "coracao-chocolate", "Coração de chocolate", [v("15g", 4.8)]),
  p("bombons", "bolo-de-mel", "Bolo de mel com rum", [v(null, 8.5)]),
  p("bombons", "chocolate-crocante", "Chocolate crocante", [v("30g", 8.2)]),
  p("bombons", "pao-de-mel", "Pão de mel", [v(null, 8.5)]),

  // Barras (pág. 8)
  p("barras", "barrinha-frutas", "Barrinha de frutas e chocolate ao leite", [v(null, 6)]),
  p("barras", "pacoca-chocolate", "Paçoca com chocolate", [v(null, 11.8)]),

  // Especiais (pág. 9)
  p("especiais", "mix-frutas", "Mix de frutas cobertas", [v(null, 32)]),
  p("especiais", "te-amo", "Te amo", [v(null, 29)], { descricao: "Coração de chocolate com a mensagem “te amo”." }),
  p("especiais", "plaquinha", "Plaquinha", [v("Média", 21), v("Grande", 24)], {
    descricao: "Plaquinha de chocolate com mensagem (na foto, “Felicidades”).",
  }),
  p("especiais", "crispies", "Crispies", [v(null, 28.9)]),

  // Refrigerados (pág. 10)
  p("refrigerados", "figo-banhado", "Figo banhado", [v(null, 6.5)]),
  p("refrigerados", "bombom-lcc", "Bombom refrigerado", [v(null, 4.8)], {
    descricao: "Leite condensado cozido, brigadeiro, nozes, oreo, pistache, castanha, ameixa ou passas.",
  }),
  p("refrigerados", "bombom-licor", "Bombom de licor", [v(null, 4.8)], { descricao: "Licor de cereja, licor de damasco ou licor de Amarula." }),

  // Tortas (pág. 11)
  // CONFIRMAR: o PDF mostra as duas tortas e, abaixo, um único quadro de preços (Pequena/Média/Grande).
  // Entendemos que os tamanhos valem para as duas.
  p("tortas", "torta-bolacha", "Torta de bolacha", [v("Pequena", 22), v("Média", 58), v("Grande", 139)], { destaque: true }),
  p("tortas", "torta-mousse", "Torta mousse", [v("Pequena", 22), v("Média", 58), v("Grande", 139)]),

  // Cestas (pág. 2) — sem preço no PDF
  p("cestas", "cestas-prontas", "Cestas prontas", [v(null, null)], { descricao: "Cestas prontas para cada ocasião." }),
  p("cestas", "cesta-personalizada", "Cesta personalizada", [v(null, null)], {
    descricao: "Produtos selecionados para montar e personalizar a sua cesta.",
  }),

  // ====================== MENU DOCES FINOS (por cento) ======================
  // Docinhos tradicionais (pág. 2)
  p("docinhos-tradicionais", "brigadeiro", "Brigadeiro", cento(190), { destaque: true }),
  p("docinhos-tradicionais", "beijinho", "Beijinho", cento(190)),
  p("docinhos-tradicionais", "casadinho-doce", "Casadinho", cento(190)),
  p("docinhos-tradicionais", "branquinho", "Branquinho", cento(190)),
  p("docinhos-tradicionais", "olho-de-sogra", "Olho de sogra", cento(190)),
  p("docinhos-tradicionais", "napolitano", "Napolitano", cento(190)),
  p("docinhos-tradicionais", "coco-queimado", "Coco queimado", cento(190)),
  p("docinhos-tradicionais", "bicho-de-pe", "Bicho de pé", cento(190)),

  // Docinhos gourmet (págs. 3 e 4)
  p("docinhos-gourmet", "brigadeiro-gourmet", "Brigadeiro gourmet", cento(200)),
  p("docinhos-gourmet", "coco-queimado-lcc", "Coco queimado com topo de leite condensado cozido", cento(220)),
  p("docinhos-gourmet", "churros", "Churros", cento(200)),
  p("docinhos-gourmet", "nozes", "Nozes", cento(200)),
  p("docinhos-gourmet", "casadinho-cereja", "Casadinho com cereja", cento(200)),
  // CONFIRMAR grafia: o PDF escreve "Brulle".
  p("docinhos-gourmet", "brulle", "Brulle", cento(280)),
  p("docinhos-gourmet", "confete", "Confete", cento(200)),
  p("docinhos-gourmet", "branquinho-damasco", "Branquinho com damasco", cento(280)),
  p("docinhos-gourmet", "branquinho-lcc", "Branquinho com topo de leite condensado cozido", cento(200)),
  p("docinhos-gourmet", "mini-quindim", "Mini quindim", cento(190)),
  p("docinhos-gourmet", "branquinho-avela", "Branquinho com avelã", cento(220)),
  p("docinhos-gourmet", "brigadeiro-stickadinho", "Brigadeiro stickadinho", cento(220)),
  p("docinhos-gourmet", "trouxinha-nozes", "Trouxinha de nozes", cento(200)),

  // Doces com ganache (pág. 5)
  p("doces-ganache", "ganache-limao", "Ganache de limão siciliano", cento(440)),
  p("doces-ganache", "ganache-damasco", "Damasco", cento(440)),
  p("doces-ganache", "ganache-branco-cereja", "Branco com cereja", cento(440)),
  p("doces-ganache", "ganache-copinho-cafe", "Copinho de café", cento(440), { destaque: true }),
  p("doces-ganache", "ganache-trio-panelinha", "Trio na panelinha", cento(440)),
  p("doces-ganache", "ganache-frutas-vermelhas", "Ganache de frutas vermelhas", cento(440)),
  p("doces-ganache", "ganache-maracuja-coracao", "Ganache de maracujá ou limão siciliano no copinho de coração", cento(440)),

  // Doces especiais (págs. 6 a 8)
  p("doces-especiais", "olho-de-sogra-coco", "Olho de sogra com coco", cento(280)),
  p("doces-especiais", "sanduichinho", "Sanduichinho de limão siciliano ou maracujá", cento(440)),
  p("doces-especiais", "camafeu-dourado", "Camafeu dourado", cento(300)),
  p("doces-especiais", "camafeu-comum", "Camafeu comum", cento(260)),
  p("doces-especiais", "abacaxi-perolado", "Abacaxi perolado", cento(300)),
  p("doces-especiais", "alpino", "Alpino com uva ou morango", cento(280)),
  p("doces-especiais", "quadradinho-morango", "Quadradinho com morango", cento(380)),
  p("doces-especiais", "mini-brownie", "Mini brownie", cento(240)),
  p("doces-especiais", "copinho-coracao", "Copinho com coração", cento(380)),
  p("doces-especiais", "copinho-coracao-lcc", "Copinho de coração com leite condensado cozido", cento(380)),
  p("doces-especiais", "mini-pavlova", "Mini pavlova com leite condensado cozido", cento(200)),
  p("doces-especiais", "figo-banhado-encomenda", "Figo banhado no chocolate nobre", cento(500), { selos: ["Sazonal"] }),
  p("doces-especiais", "cestinha-nuts", "Cestinha de nuts", cento(360)),
  p("doces-especiais", "quadradinho-noivinhos", "Quadradinho com noivinhos", cento(500)),
  p("doces-especiais", "chokito", "Chokito", cento(320)),
  p("doces-especiais", "mirtilo", "Mirtilo", cento(440)),
  p("doces-especiais", "doce-nozes", "Doce de nozes, ameixa, damasco ou castanha", cento(420), {
    descricao: "Sabores: nozes, ameixa, damasco ou castanha.",
  }),
  p("doces-especiais", "bombom-encomenda", "Bombom", cento(420), {
    descricao:
      "Sabores: leite condensado cozido, maracujá, morango, galak, brigadeiro, nozes, castanha, ameixa, passas ou oreo com leite condensado cozido.",
  }),
  p("doces-especiais", "trufas-encomenda", "Trufas", cento(420), {
    descricao: "Sabores: tradicional, amarula, limão, maracujá, avelã, nozes ou branca.",
    destaque: true,
  }),
  p("doces-especiais", "mini-trufas", "Mini trufas", cento(280), { foto: null }),
];

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatarPreco(preco: number | null): string {
  return preco === null ? "Sob consulta" : brl.format(preco);
}
