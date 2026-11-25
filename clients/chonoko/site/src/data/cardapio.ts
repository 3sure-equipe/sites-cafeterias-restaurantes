/**
 * Cardápio da Chonoko.
 *
 * ⚠️ CONTEÚDO DEMONSTRATIVO. Nenhum item abaixo é oficial.
 * Os nomes são tipos comuns de produtos de cafeteria, usados apenas para
 * mostrar o layout. Todos estão marcados com `demo: true`, sem preço real
 * (`preco: null`) e sem foto (`foto: null`). Quando a cafeteria enviar o
 * cardápio, substitua os itens e remova `demo`.
 *
 * Como adicionar um item real:
 *   {
 *     id: "cappuccino",
 *     categoria: "cafes",
 *     nome: "Cappuccino",
 *     descricao: "Descrição aprovada pela cafeteria.",
 *     preco: 14.9,                       // em reais; null = "a confirmar"
 *     foto: "/cardapio/cappuccino.jpg",  // arquivo em public/cardapio; null = arte provisória
 *   }
 */

export type IconeCategoria = "cafe" | "bebida" | "torta" | "chocolate" | "doce" | "salgado";

export type Categoria = {
  id: string;
  nome: string;
  icone: IconeCategoria;
  chamada: string;
};

export type ItemCardapio = {
  id: string;
  categoria: Categoria["id"];
  nome: string;
  descricao: string;
  /** Preço em reais. `null` = preço ainda não informado. */
  preco: number | null;
  /** Caminho da foto real do produto. `null` = arte provisória da categoria. */
  foto: string | null;
  /** `true` enquanto o item for apenas demonstração de layout. */
  demo?: boolean;
  destaque?: boolean;
};

/** Novas categorias podem ser adicionadas aqui, em qualquer ordem. */
export const categorias: Categoria[] = [
  { id: "cafes", nome: "Cafés", icone: "cafe", chamada: "Da xícara curta ao café com leite cremoso." },
  { id: "bebidas", nome: "Bebidas", icone: "bebida", chamada: "Quentes ou geladas, para acompanhar a conversa." },
  { id: "tortas", nome: "Tortas e bolos", icone: "torta", chamada: "Direto da vitrine de tortas da casa." },
  { id: "chocolates", nome: "Chocolates", icone: "chocolate", chamada: "O coração da casa: chocolates artesanais." },
  { id: "doces", nome: "Doces", icone: "doce", chamada: "Pequenos mimos para adoçar o dia." },
  { id: "salgados", nome: "Salgados", icone: "salgado", chamada: "Para quando a fome pede algo a mais." },
];

const descricaoDemo = "Texto de exemplo: aqui entra a descrição oficial do item, com sabor, preparo e tamanho.";

function demo(categoria: string, nomes: string[]): ItemCardapio[] {
  return nomes.map((nome, i) => ({
    id: `${categoria}-exemplo-${i + 1}`,
    categoria,
    nome,
    descricao: descricaoDemo,
    preco: null,
    foto: null,
    demo: true,
    destaque: i === 0,
  }));
}

export const itens: ItemCardapio[] = [
  ...demo("cafes", ["Espresso", "Cappuccino", "Café com leite", "Mocha"]),
  ...demo("bebidas", ["Chocolate quente", "Chá", "Bebida gelada", "Suco"]),
  ...demo("tortas", ["Torta da vitrine", "Fatia de bolo", "Torta doce", "Bolo do dia"]),
  ...demo("chocolates", ["Bombom artesanal", "Barra de chocolate", "Trufa", "Caixa presenteável"]),
  ...demo("doces", ["Doce fino", "Brigadeiro", "Cookie", "Sobremesa"]),
  ...demo("salgados", ["Salgado assado", "Torrada", "Quiche", "Sanduíche"]),
];

export const cardapioEhDemonstrativo = itens.some((i) => i.demo);

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatarPreco(preco: number | null): string {
  return preco === null ? "R$ 00,00" : brl.format(preco);
}
