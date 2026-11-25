/**
 * Camada de acesso aos dados.
 *
 * O site e o painel nunca leem o armazenamento diretamente: sempre passam por
 * um `Repositorio`. Assim, trocar o modo demonstração por um banco de dados
 * real não exige mexer nas telas.
 *
 * ┌───────────────────────────────┬──────────────────────────────────────────┐
 * │ Hoje (protótipo)              │ Versão oficial (proposta)                │
 * ├───────────────────────────────┼──────────────────────────────────────────┤
 * │ RepositorioLocal: salva no    │ RepositorioRemoto: API/BD (ex.: Supabase │
 * │ navegador (localStorage)      │ ou Postgres) com tabelas categorias,     │
 * │                               │ produtos, publicacoes e info_loja        │
 * │ Fotos como imagem comprimida  │ Fotos em armazenamento de arquivos       │
 * │ dentro dos dados              │ (bucket) e só a URL no banco             │
 * │ Sem senha (tela demonstrativa)│ Login das proprietárias + regras de      │
 * │                               │ acesso (só elas podem gravar)            │
 * │ Site lê os dados no navegador │ Site gerado no servidor e revalidado a   │
 * │                               │ cada alteração (sempre rápido e com SEO) │
 * └───────────────────────────────┴──────────────────────────────────────────┘
 */
import type { Dados } from "./tipos";

export interface Repositorio {
  carregar(): Dados | null;
  salvar(dados: Dados): void;
  limpar(): void;
}

export const CHAVE_ARMAZENAMENTO = "chonoko:dados-demo:v1";

export class ErroLimiteArmazenamento extends Error {}

/** Modo demonstração: os dados ficam somente neste navegador. */
export const repositorioLocal: Repositorio = {
  carregar() {
    try {
      const bruto = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
      return bruto ? (JSON.parse(bruto) as Dados) : null;
    } catch {
      return null;
    }
  },
  salvar(dados) {
    try {
      window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(dados));
    } catch (e) {
      if (e instanceof DOMException && e.name === "QuotaExceededError") {
        throw new ErroLimiteArmazenamento(
          "O modo demonstração atingiu o limite de armazenamento do navegador. Remova algumas fotos enviadas ou restaure os dados de exemplo.",
        );
      }
      throw e;
    }
  },
  limpar() {
    try {
      window.localStorage.removeItem(CHAVE_ARMAZENAMENTO);
    } catch {
      /* ignora */
    }
  },
};
