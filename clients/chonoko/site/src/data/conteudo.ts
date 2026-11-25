import type { StaticImageData } from "next/image";
import ambiente from "@/assets/images/ambiente.jpg";
import fachada from "@/assets/images/fachada.jpg";
import type { Publicacao } from "@/lib/dados/tipos";

/* ------------------------------------------------------------------ */
/* Fotos reais do espaço                                               */
/* ------------------------------------------------------------------ */

export const fotos = {
  ambiente: {
    src: ambiente,
    alt: "Salão da Chonoko: parede rosa com letreiro de madeira, geladeira de tortas, mesa redonda de madeira com flores e luminárias pendentes de luz quente.",
  },
  fachada: {
    src: fachada,
    alt: "Fachada da Chonoko em uma esquina: parede cinza, toldo listrado bordô e branco e letreiro cursivo com o nome da cafeteria.",
  },
} satisfies Record<string, { src: StaticImageData; alt: string }>;

/* ------------------------------------------------------------------ */
/* Galeria — somente fotos reais (espaço + produtos dos cardápios)     */
/* ------------------------------------------------------------------ */

export type ItemGaleria = {
  id: string;
  titulo: string;
  src: StaticImageData | string;
  alt: string;
  posicao?: string;
  formato: "grande" | "alta" | "normal";
};

export const galeria: ItemGaleria[] = [
  { id: "ambiente", titulo: "Nosso salão", ...fotos.ambiente, formato: "grande" },
  { id: "fachada", titulo: "A esquina da Chonoko", ...fotos.fachada, posicao: "50% 75%", formato: "alta" },
  { id: "torta", titulo: "Torta de bolacha", src: "/cardapio/torta-bolacha.jpg", alt: "Torta de bolacha da Chonoko vista de cima, coberta com farofa dourada e um coração de chocolate.", formato: "normal" },
  { id: "trufa", titulo: "Trufas", src: "/cardapio/trufas-encomenda.jpg", alt: "Trufa de chocolate da Chonoko sobre bandeja espelhada.", formato: "normal" },
  { id: "cacho", titulo: "Cacho de chocolate", src: "/cardapio/cacho-chocolate-100.jpg", alt: "Cacho de bombons embrulhados em papel dourado.", formato: "alta" },
  { id: "cesta", titulo: "Cestas para presentear", src: "/cardapio/cestas-prontas.jpg", alt: "Cesta da Chonoko embrulhada em celofane com laço vermelho e branco.", formato: "normal" },
  { id: "copinho", titulo: "Copinho de café", src: "/cardapio/ganache-copinho-cafe.jpg", alt: "Doce em formato de xícara de chocolate com ganache de café.", formato: "normal" },
  { id: "biscoitos", titulo: "Biscoitos artesanais", src: "/cardapio/biscoito-mel-coberto.jpg", alt: "Pacote de biscoitos de mel cobertos com chocolate e etiqueta da Chonoko.", formato: "normal" },
  { id: "te-amo", titulo: "Te amo", src: "/cardapio/te-amo.jpg", alt: "Coração de chocolate com a escrita “te amo”.", formato: "normal" },
];

/* ------------------------------------------------------------------ */
/* Promoções e novidades — EXEMPLOS (editáveis pelo painel)            */
/* ------------------------------------------------------------------ */

/** Nenhuma destas publicações está vigente: todas são `demo: true`. */
export const publicacoesIniciais: Publicacao[] = [
  {
    id: "exemplo-cestas",
    tipo: "novidade",
    titulo: "Cestas para cada ocasião",
    descricao:
      "Sem tempo para escolher presentes? A Chonoko tem cestas prontas e também monta a sua com produtos selecionados.",
    foto: "/cardapio/cestas-prontas.jpg",
    precoOriginal: null,
    precoPromocional: null,
    inicio: null,
    fim: null,
    condicoes: "Valores e composição sob consulta pelo WhatsApp.",
    ativo: true,
    demo: true,
    criadoEm: "2026-11-25",
  },
  {
    id: "exemplo-promocao",
    tipo: "promocao",
    titulo: "Espaço para a próxima promoção",
    descricao:
      "Card ilustrativo: quando a Chonoko cadastrar uma promoção no painel, aqui aparecem a foto, o preço promocional, a validade e as condições.",
    foto: null,
    precoOriginal: null,
    precoPromocional: null,
    inicio: null,
    fim: null,
    condicoes: "Conteúdo ilustrativo. Nenhuma promoção vigente.",
    ativo: true,
    demo: true,
    criadoEm: "2026-11-25",
  },
  {
    id: "exemplo-sazonal",
    tipo: "especial",
    titulo: "Figo banhado no chocolate nobre",
    descricao: "Produto sazonal do cardápio de doces finos. Um exemplo de como destacar um produto especial da temporada.",
    foto: "/cardapio/figo-banhado-encomenda.jpg",
    precoOriginal: null,
    precoPromocional: null,
    inicio: null,
    fim: null,
    condicoes: "Disponibilidade conforme a época. Consulte antes de encomendar.",
    ativo: true,
    demo: true,
    criadoEm: "2026-11-25",
  },
  {
    id: "exemplo-inativa",
    tipo: "promocao",
    titulo: "Exemplo de campanha desativada",
    descricao: "Fica guardada no painel e não aparece no site enquanto estiver desativada.",
    foto: null,
    precoOriginal: null,
    precoPromocional: null,
    inicio: null,
    fim: null,
    condicoes: "",
    ativo: false,
    demo: true,
    criadoEm: "2026-11-25",
  },
];

/* ------------------------------------------------------------------ */
/* Avaliações — ILUSTRATIVAS                                           */
/* ------------------------------------------------------------------ */

export type Avaliacao = {
  id: string;
  texto: string;
  autor: string;
  /** Contexto da avaliação (nunca "Google" para depoimentos fictícios). */
  contexto: string;
  nota: 1 | 2 | 3 | 4 | 5;
  /** `true` = depoimento fictício, só para demonstrar o layout. */
  demo: boolean;
};

/**
 * Avaliações REAIS e autorizadas (com nome e origem identificável).
 * Vazio de propósito: depoimentos fictícios foram removidos na Etapa 02.
 */
export const avaliacoes: Avaliacao[] = [];
