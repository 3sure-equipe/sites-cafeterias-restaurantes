import type { StaticImageData } from "next/image";
import ambiente from "@/assets/images/ambiente.jpg";
import fachada from "@/assets/images/fachada.jpg";
import type { IconeCategoria } from "./cardapio";

/* ------------------------------------------------------------------ */
/* Fotos reais fornecidas pela cafeteria                               */
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
/* Galeria                                                             */
/* ------------------------------------------------------------------ */

export type ItemGaleria =
  | { tipo: "foto"; id: string; titulo: string; src: StaticImageData; alt: string; posicao?: string; formato: "grande" | "alta" | "normal" }
  | { tipo: "espaco"; id: string; titulo: string; icone: IconeCategoria | "ambiente" | "especial"; formato: "grande" | "alta" | "normal" };

/**
 * Apenas duas fotos reais estão disponíveis. Os "espaços" mostram onde
 * entrarão as próximas fotos — não são imagens de banco.
 */
export const galeria: ItemGaleria[] = [
  { tipo: "foto", id: "ambiente", titulo: "Nosso salão", ...fotos.ambiente, formato: "grande" },
  { tipo: "foto", id: "fachada", titulo: "A esquina da Chonoko", ...fotos.fachada, posicao: "50% 75%", formato: "alta" },
  { tipo: "espaco", id: "cafes", titulo: "Cafés", icone: "cafe", formato: "normal" },
  { tipo: "espaco", id: "tortas", titulo: "Tortas", icone: "torta", formato: "normal" },
  { tipo: "espaco", id: "chocolates", titulo: "Chocolates", icone: "chocolate", formato: "normal" },
  { tipo: "espaco", id: "doces", titulo: "Doces", icone: "doce", formato: "normal" },
  { tipo: "espaco", id: "especiais", titulo: "Produtos especiais", icone: "especial", formato: "normal" },
  { tipo: "espaco", id: "ambiente-2", titulo: "Mais do ambiente", icone: "ambiente", formato: "normal" },
];

/* ------------------------------------------------------------------ */
/* Novidades e promoções — DEMONSTRATIVAS                              */
/* ------------------------------------------------------------------ */

export type Novidade = {
  id: string;
  rotulo: string;
  titulo: string;
  descricao: string;
  /** Data, período ou validade. `null` = não se aplica / a definir. */
  validade: string | null;
  acao: { rotulo: string; href: string };
  foto: StaticImageData | null;
  demo?: boolean;
};

const instagram = "https://www.instagram.com/chonokocachoeiradosul/";

export const novidades: Novidade[] = [
  {
    id: "lancamento",
    rotulo: "Lançamento",
    titulo: "Espaço para o próximo lançamento",
    descricao:
      "Exemplo de card para apresentar um produto novo ou sazonal, com foto, descrição e chamada. Conteúdo ilustrativo.",
    validade: "Período a definir",
    acao: { rotulo: "Acompanhar no Instagram", href: instagram },
    foto: null,
    demo: true,
  },
  {
    id: "promocao",
    rotulo: "Promoção",
    titulo: "Espaço para uma promoção vigente",
    descricao: "Aqui entram condições, validade e regras confirmadas pela Chonoko.",
    validade: "Validade a definir",
    acao: { rotulo: "Ver no Instagram", href: instagram },
    foto: null,
    demo: true,
  },
  {
    id: "datas",
    rotulo: "Data especial",
    titulo: "Espaço para encomendas de datas especiais",
    descricao: "Ideal para campanhas como Páscoa, Dia das Mães ou Natal, quando houver.",
    validade: null,
    acao: { rotulo: "Ver no Instagram", href: instagram },
    foto: null,
    demo: true,
  },
];

/* ------------------------------------------------------------------ */
/* Avaliações — somente reais e autorizadas                            */
/* ------------------------------------------------------------------ */

export type Avaliacao = {
  id: string;
  texto: string;
  autor: string;
  /** Origem identificável, ex.: "Google", "Instagram". */
  fonte: string;
  nota?: 1 | 2 | 3 | 4 | 5;
  data?: string;
};

/** Vazio de propósito: nenhuma avaliação será inventada. */
export const avaliacoes: Avaliacao[] = [];
