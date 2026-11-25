import { categoriasIniciais, produtosIniciais } from "@/data/cardapio";
import { publicacoesIniciais } from "@/data/conteudo";
import { infoInicial } from "@/data/site";
import type { Dados } from "./tipos";

/** Aumente quando a estrutura dos dados mudar: dados antigos salvos no navegador são descartados. */
export const VERSAO_DADOS = 2; // v2: endereço e horários oficiais (Etapa 02)

export const dadosIniciais: Dados = {
  versao: VERSAO_DADOS,
  categorias: categoriasIniciais,
  produtos: produtosIniciais,
  publicacoes: publicacoesIniciais,
  info: infoInicial,
};
