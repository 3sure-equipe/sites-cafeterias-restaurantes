/**
 * Modelo de dados da Chonoko.
 *
 * Estes tipos são o "contrato" entre o site público, o painel administrativo
 * e o armazenamento. Hoje o armazenamento é local (modo demonstração);
 * na versão oficial, as mesmas estruturas viram tabelas de um banco de dados
 * (ver `repositorio.ts`).
 */

export type IconeCategoria =
  | "biscoito"
  | "salgado"
  | "bombom"
  | "barra"
  | "presente"
  | "refrigerado"
  | "torta"
  | "cesta"
  | "cafe"
  | "docinho"
  | "gourmet"
  | "ganache"
  | "especial";

/** "loja": pronta entrega, preço por unidade/pacote. "encomenda": doces finos vendidos por cento. */
export type GrupoCardapio = "loja" | "encomenda";

export type Categoria = {
  id: string;
  nome: string;
  grupo: GrupoCardapio;
  icone: IconeCategoria;
  /** Texto curto exibido no topo da categoria. */
  descricao?: string;
  ordem: number;
};

/** Uma forma de venda do produto: tamanho, peso ou quantidade, com seu preço. */
export type Variacao = {
  /** Ex.: "50g", "150g", "100 unidades", "Grande". `null` quando há um único preço. */
  rotulo: string | null;
  /** Preço em reais. `null` = sob consulta. */
  preco: number | null;
};

export type Produto = {
  id: string;
  categoriaId: string;
  nome: string;
  descricao?: string;
  variacoes: Variacao[];
  /** Caminho da foto (ex.: "/cardapio/brigadeiro.jpg") ou imagem enviada pelo painel. */
  foto: string | null;
  disponivel: boolean;
  destaque?: boolean;
  /** Marcações curtas, ex.: "Sazonal". */
  selos?: string[];
  ordem: number;
};

export type TipoPublicacao = "promocao" | "novidade" | "especial";

export type Publicacao = {
  id: string;
  tipo: TipoPublicacao;
  titulo: string;
  descricao: string;
  foto: string | null;
  /** Preço "de" (opcional). */
  precoOriginal: number | null;
  /** Preço "por" (opcional). */
  precoPromocional: number | null;
  /** Datas no formato AAAA-MM-DD. `null` = sem limite. */
  inicio: string | null;
  fim: string | null;
  condicoes: string;
  ativo: boolean;
  /** Conteúdo de demonstração do protótipo — aparece com a etiqueta "Exemplo". */
  demo?: boolean;
  criadoEm: string;
};

export type DiaHorario = { dia: string; horario: string | null };

export type InfoLoja = {
  /** Só dígitos, formato internacional: 55 + DDD + número. */
  whatsapp: string;
  whatsappExibicao: string;
  whatsappMensagem: string;
  instagram: string;
  endereco: string | null;
  cidade: string;
  estado: string;
  horarios: DiaHorario[];
};

export type Dados = {
  versao: number;
  categorias: Categoria[];
  produtos: Produto[];
  publicacoes: Publicacao[];
  info: InfoLoja;
};
