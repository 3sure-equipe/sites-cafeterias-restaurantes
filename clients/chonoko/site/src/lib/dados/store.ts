"use client";

/**
 * Estado compartilhado entre o site público e o painel.
 * Toda alteração feita no painel aparece na hora no site — inclusive em outra
 * aba aberta no mesmo navegador (evento "storage").
 */
import { useEffect, useState, useSyncExternalStore } from "react";
import { dadosIniciais, VERSAO_DADOS } from "./iniciais";
import { CHAVE_ARMAZENAMENTO, repositorioLocal, type Repositorio } from "./repositorio";
import type { Categoria, Dados, InfoLoja, Produto, Publicacao } from "./tipos";

const repo: Repositorio = repositorioLocal;
const ouvintes = new Set<() => void>();
let cache: Dados | null = null;

function ler(): Dados {
  if (cache) return cache;
  const salvo = repo.carregar();
  cache = salvo && salvo.versao === VERSAO_DADOS ? salvo : dadosIniciais;
  return cache;
}

function avisar() {
  ouvintes.forEach((o) => o());
}

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  const aoMudarEmOutraAba = (e: StorageEvent) => {
    if (e.key === CHAVE_ARMAZENAMENTO) {
      cache = null;
      ouvinte();
    }
  };
  window.addEventListener("storage", aoMudarEmOutraAba);
  return () => {
    ouvintes.delete(ouvinte);
    window.removeEventListener("storage", aoMudarEmOutraAba);
  };
}

/** Dados atuais. No servidor (e no primeiro desenho) usa os dados iniciais. */
export function useDados(): Dados {
  return useSyncExternalStore(assinar, ler, () => dadosIniciais);
}

function gravar(atualizar: (d: Dados) => Dados) {
  const novo = atualizar(ler());
  repo.salvar(novo); // pode lançar ErroLimiteArmazenamento
  cache = novo;
  avisar();
}

const novoId = (prefixo: string) => `${prefixo}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** Ações usadas pelo painel administrativo. */
export const acoes = {
  novoId,

  salvarProduto(produto: Produto) {
    gravar((d) => {
      const existe = d.produtos.some((p) => p.id === produto.id);
      return {
        ...d,
        produtos: existe ? d.produtos.map((p) => (p.id === produto.id ? produto : p)) : [...d.produtos, produto],
      };
    });
  },
  removerProduto(id: string) {
    gravar((d) => ({ ...d, produtos: d.produtos.filter((p) => p.id !== id) }));
  },

  salvarCategoria(categoria: Categoria) {
    gravar((d) => {
      const existe = d.categorias.some((c) => c.id === categoria.id);
      return {
        ...d,
        categorias: existe ? d.categorias.map((c) => (c.id === categoria.id ? categoria : c)) : [...d.categorias, categoria],
      };
    });
  },
  removerCategoria(id: string) {
    gravar((d) => ({ ...d, categorias: d.categorias.filter((c) => c.id !== id) }));
  },
  moverCategoria(id: string, direcao: -1 | 1) {
    gravar((d) => {
      const alvo = d.categorias.find((c) => c.id === id);
      if (!alvo) return d;
      const doGrupo = d.categorias.filter((c) => c.grupo === alvo.grupo).sort((a, b) => a.ordem - b.ordem);
      const i = doGrupo.findIndex((c) => c.id === id);
      const j = i + direcao;
      if (j < 0 || j >= doGrupo.length) return d;
      [doGrupo[i], doGrupo[j]] = [doGrupo[j], doGrupo[i]];
      const ordens = new Map(doGrupo.map((c, k) => [c.id, k + 1]));
      return { ...d, categorias: d.categorias.map((c) => (ordens.has(c.id) ? { ...c, ordem: ordens.get(c.id)! } : c)) };
    });
  },

  salvarPublicacao(pub: Publicacao) {
    gravar((d) => {
      const existe = d.publicacoes.some((p) => p.id === pub.id);
      return {
        ...d,
        publicacoes: existe ? d.publicacoes.map((p) => (p.id === pub.id ? pub : p)) : [pub, ...d.publicacoes],
      };
    });
  },
  removerPublicacao(id: string) {
    gravar((d) => ({ ...d, publicacoes: d.publicacoes.filter((p) => p.id !== id) }));
  },

  salvarInfo(info: InfoLoja) {
    gravar((d) => ({ ...d, info }));
  },

  restaurarExemplos() {
    repo.limpar();
    cache = dadosIniciais;
    avisar();
  },
};

/** Data de hoje (AAAA-MM-DD), conhecida só depois de montar no navegador. */
export function useHoje(): string | null {
  const [hoje, setHoje] = useState<string | null>(null);
  useEffect(() => {
    const d = new Date();
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data só existe no cliente
    setHoje(iso);
  }, []);
  return hoje;
}

export type StatusPublicacao = "no-ar" | "agendada" | "encerrada" | "desativada";

export function statusPublicacao(p: Publicacao, hoje: string | null): StatusPublicacao {
  if (!p.ativo) return "desativada";
  if (hoje && p.inicio && hoje < p.inicio) return "agendada";
  if (hoje && p.fim && hoje > p.fim) return "encerrada";
  return "no-ar";
}
