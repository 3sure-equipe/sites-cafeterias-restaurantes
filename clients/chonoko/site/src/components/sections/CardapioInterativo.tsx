"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, PartyPopper, Search, Store, X } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { formatarPreco, regrasEncomenda } from "@/data/cardapio";
import { linkWhatsapp } from "@/data/site";
import { useDados } from "@/lib/dados/store";
import type { Categoria, GrupoCardapio, Produto } from "@/lib/dados/tipos";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { FotoProduto } from "@/components/ui/FotoProduto";
import { iconesCategoria } from "@/components/ui/Icones";

const grupos: { id: GrupoCardapio; titulo: string; subtitulo: string; Icone: typeof Store }[] = [
  { id: "loja", titulo: "Na loja", subtitulo: "Pronta entrega", Icone: Store },
  { id: "encomenda", titulo: "Doces finos", subtitulo: "Encomendas para festas", Icone: PartyPopper },
];

const normalizar = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Resumo de preço para o card: preço único, "a partir de" (menor valor cadastrado) ou "sob consulta". */
function resumoPreco(p: Produto) {
  const precos = p.variacoes.map((v) => v.preco).filter((x): x is number => x !== null);
  if (precos.length === 0) return { valor: "Sob consulta", prefixo: null, extra: null };
  const menor = Math.min(...precos);
  const varias = p.variacoes.length > 1;
  const unidade = p.variacoes.length === 1 ? p.variacoes[0].rotulo : null;
  return {
    valor: formatarPreco(menor),
    prefixo: varias ? "a partir de" : null,
    extra: varias ? `${p.variacoes.length} opções` : unidade,
  };
}

export function CardapioInterativo() {
  const { categorias, produtos, info } = useDados();
  const [grupo, setGrupo] = useState<GrupoCardapio>("loja");
  const [categoriaId, setCategoriaId] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const termo = useDeferredValue(busca.trim());
  const [abertoId, setAbertoId] = useState<string | null>(null);
  const topo = useRef<HTMLDivElement>(null);

  const catsDoGrupo = useMemo(() => categorias.filter((c) => c.grupo === grupo).sort((a, b) => a.ordem - b.ordem), [categorias, grupo]);
  const categoria = catsDoGrupo.find((c) => c.id === categoriaId) ?? catsDoGrupo[0];
  const catPorId = useMemo(() => new Map(categorias.map((c) => [c.id, c])), [categorias]);
  const visiveis = useMemo(() => produtos.filter((p) => p.disponivel).sort((a, b) => a.ordem - b.ordem), [produtos]);

  /** Foto que representa cada categoria na navegação (primeiro produto com foto). */
  const capa = (id: string) => visiveis.find((p) => p.categoriaId === id && p.foto)?.foto ?? null;
  const contagem = (id: string) => visiveis.filter((p) => p.categoriaId === id).length;

  const resultados = useMemo(() => {
    if (!termo) return null;
    const t = normalizar(termo);
    return visiveis.filter((p) => normalizar(`${p.nome} ${p.descricao ?? ""} ${catPorId.get(p.categoriaId)?.nome ?? ""}`).includes(t));
  }, [termo, visiveis, catPorId]);

  const lista = resultados ?? visiveis.filter((p) => p.categoriaId === categoria?.id);
  const indiceAberto = lista.findIndex((p) => p.id === abertoId);
  const aberto = indiceAberto >= 0 ? lista[indiceAberto] : null;

  function escolherGrupo(g: GrupoCardapio) {
    setGrupo(g);
    setCategoriaId(null);
    setBusca("");
  }

  function escolherCategoria(id: string) {
    setCategoriaId(id);
    // Se a pessoa já rolou para dentro da lista, volta ao início dela
    if (topo.current && topo.current.getBoundingClientRect().top < 0) {
      topo.current.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }

  return (
    <div className="mt-12 scroll-mt-20" ref={topo}>
      {/* Loja x Encomendas */}
      <div
        role="tablist"
        aria-label="Tipo de cardápio"
        className="relative grid grid-cols-2 rounded-full bg-papel/80 p-1.5 ring-1 ring-bordo/10 sm:inline-grid sm:min-w-[30rem]"
      >
        {/* Indicador deslizante da seleção */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-bordo shadow-[0_10px_24px_-14px_rgb(74_32_41/0.9)] transition-transform duration-500 ease-suave ${
            resultados ? "opacity-0" : ""
          } ${grupo === "encomenda" ? "translate-x-full" : ""}`}
        />
        {grupos.map(({ id, titulo, subtitulo, Icone }) => {
          const ativo = grupo === id && !resultados;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={ativo}
              onClick={() => escolherGrupo(id)}
              className={`relative z-10 flex min-h-14 items-center justify-center gap-2.5 rounded-full px-3 transition-colors duration-500 sm:justify-start sm:px-5 ${
                ativo ? "text-creme" : "text-madeira hover:text-bordo"
              }`}
            >
              <Icone className={`hidden size-5 shrink-0 sm:block ${ativo ? "text-rosa-claro" : "text-rosa-ink"}`} strokeWidth={1.6} aria-hidden="true" />
              <span className="text-left leading-tight">
                <span className="block font-display text-[1.25rem] font-semibold sm:text-[1.35rem]">{titulo}</span>
                <span className={`block text-[0.66rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.7rem] ${ativo ? "text-creme/75" : "text-taupe-ink"}`}>
                  {subtitulo}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Busca + categorias (fixas ao rolar) */}
      <div className="sticky top-16 z-20 -mx-5 mt-6 bg-creme/90 px-5 pb-3 pt-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <label className="relative block sm:max-w-md">
          <span className="sr-only">Buscar no cardápio</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-[1.1rem] -translate-y-1/2 text-taupe-ink" aria-hidden="true" />
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar: trufa, biscoito, torta…"
            className="h-12 w-full rounded-full border border-bordo/15 bg-papel pl-11 pr-12 text-[1rem] text-madeira outline-none transition-[border-color,box-shadow] placeholder:text-taupe-ink/80 focus:border-bordo/50 focus:shadow-[0_0_0_4px_rgb(184_117_120/0.15)] [&::-webkit-search-cancel-button]:hidden"
          />
          {busca && (
            <button
              type="button"
              onClick={() => setBusca("")}
              className="absolute right-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-taupe-ink hover:bg-creme"
              aria-label="Limpar busca"
            >
              <X className="size-4" />
            </button>
          )}
        </label>

        {!resultados && (
          <div className="relative mt-3">
            <div role="tablist" aria-label="Categorias" className="sem-barra -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
              {catsDoGrupo.map((c) => {
                const Icone = iconesCategoria[c.icone];
                const sel = c.id === categoria?.id;
                const foto = capa(c.id);
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={sel}
                    onClick={() => escolherCategoria(c.id)}
                    className={`group/cat flex min-h-12 shrink-0 snap-start items-center gap-2.5 rounded-full py-1 pl-1 pr-4 text-[0.9rem] font-semibold transition-all duration-300 ease-suave ${
                      sel
                        ? "bg-bordo text-creme shadow-[0_10px_22px_-14px_rgb(74_32_41/0.9)]"
                        : "bg-papel/90 text-madeira ring-1 ring-bordo/10 hover:text-bordo hover:ring-bordo/30"
                    }`}
                  >
                    <span
                      className={`relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full ${
                        sel ? "ring-2 ring-creme/40" : "bg-blush text-rosa-ink"
                      }`}
                    >
                      {foto ? (
                        <Image
                          src={foto}
                          alt=""
                          fill
                          sizes="40px"
                          unoptimized={foto.startsWith("data:")}
                          className="object-cover transition-transform duration-500 group-hover/cat:scale-110"
                        />
                      ) : (
                        <Icone className="size-[1.1rem]" strokeWidth={1.6} aria-hidden="true" />
                      )}
                    </span>
                    {c.nome}
                    <span className={`text-[0.72rem] tabular-nums ${sel ? "text-creme/70" : "text-taupe-ink"}`}>{contagem(c.id)}</span>
                  </button>
                );
              })}
            </div>
            {/* Indica que há mais categorias ao deslizar */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-creme to-transparent lg:hidden" />
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="mt-8" aria-live="polite">
        {resultados ? (
          <p className="mb-6 text-taupe-ink">
            {resultados.length === 0
              ? `Nenhum produto encontrado para “${termo}”.`
              : `${resultados.length} ${resultados.length === 1 ? "produto encontrado" : "produtos encontrados"} para “${termo}”.`}
          </p>
        ) : (
          categoria && <CabecalhoCategoria key={`cabecalho-${categoria.id}`} categoria={categoria} total={lista.length} />
        )}

        {!resultados && grupo === "encomenda" && <RegrasEncomenda whatsapp={info.whatsapp} />}

        {lista.length > 0 ? (
          <ul key={resultados ? "lista-busca" : `lista-${categoria?.id}`} className="grid grid-cols-2 gap-x-3.5 gap-y-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-12">
            {lista.map((p, i) => (
              <li key={p.id} className="motion-safe:animate-[entrar_0.6s_var(--ease-suave)_both]" style={{ animationDelay: `${Math.min(i, 12) * 45}ms` }}>
                <CartaoProduto produto={p} categoria={catPorId.get(p.categoriaId)} mostrarCategoria={!!resultados} onAbrir={() => setAbertoId(p.id)} />
              </li>
            ))}
          </ul>
        ) : (
          !resultados && (
            <div className="rounded-[1.75rem] border border-dashed border-bordo/20 bg-papel/60 px-6 py-12 text-center">
              <p className="font-display text-2xl italic text-bordo">Em breve por aqui.</p>
              <p className="mx-auto mt-2 max-w-md text-taupe-ink">
                Os itens desta categoria ainda estão sendo atualizados. Enquanto isso, fale com a gente pelo WhatsApp.
              </p>
              <BotaoWhatsapp
                className="mt-6"
                href={linkWhatsapp(`Olá! Vi no site da Chonoko e gostaria de saber sobre ${categoria?.nome.toLowerCase()}.`, info.whatsapp)}
              >
                Perguntar pelo WhatsApp
              </BotaoWhatsapp>
            </div>
          )
        )}
      </div>

      {/* Chamada final */}
      <div className="relative mt-20 overflow-hidden rounded-[2rem] bg-bordo px-7 py-9 text-creme sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div aria-hidden="true" className="toldo absolute inset-x-0 top-0 opacity-90" />
        <div className="relative pt-6">
          <p className="font-display text-[2rem] leading-tight">Quer encomendar ou tirar uma dúvida?</p>
          <p className="mt-2 text-creme/75">Fale direto com a Chonoko pelo WhatsApp {info.whatsappExibicao}.</p>
        </div>
        <BotaoWhatsapp href={linkWhatsapp(info.whatsappMensagem, info.whatsapp)} claro className="relative mt-6 lg:mt-6">
          Chamar no WhatsApp
        </BotaoWhatsapp>
      </div>
      <p className="mt-4 text-[0.82rem] text-taupe-ink">Preços conforme os cardápios atuais da Chonoko, sujeitos a alteração. Fotos dos produtos da casa.</p>

      <DetalheProduto
        produto={aberto}
        categoria={aberto ? catPorId.get(aberto.categoriaId) : undefined}
        whatsapp={info.whatsapp}
        posicao={aberto ? { atual: indiceAberto + 1, total: lista.length } : null}
        onNavegar={(d) => setAbertoId(lista[(indiceAberto + d + lista.length) % lista.length].id)}
        onFechar={() => setAbertoId(null)}
      />
    </div>
  );
}

function CabecalhoCategoria({ categoria, total }: { categoria: Categoria; total: number }) {
  return (
    <div className="mb-9 flex flex-col gap-2 border-b border-bordo/15 pb-5 motion-safe:animate-[entrar_0.5s_var(--ease-suave)_both] sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-baseline gap-3">
        <h3 className="text-[2rem] text-bordo sm:text-[2.6rem]">{categoria.nome}</h3>
        <span className="rotulo !tracking-[0.14em] text-taupe-ink">
          {total} {total === 1 ? "item" : "itens"}
        </span>
      </div>
      {categoria.descricao && <p className="max-w-xl font-display text-lg italic leading-snug text-taupe-ink sm:text-right sm:text-xl">{categoria.descricao}</p>}
    </div>
  );
}

function RegrasEncomenda({ whatsapp }: { whatsapp: string }) {
  return (
    <div className="mb-10 grid gap-5 rounded-[1.75rem] bg-papel p-6 ring-1 ring-bordo/10 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <p className="rotulo text-rosa-ink">Como encomendar</p>
        <ul className="mt-3 grid gap-x-8 gap-y-2 text-[0.95rem] text-madeira sm:grid-cols-2">
          {regrasEncomenda.map((r) => (
            <li key={r} className="flex gap-2.5">
              <span className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-rosa" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[0.85rem] text-taupe-ink">Preços por 100 unidades de cada sabor.</p>
      </div>
      <BotaoWhatsapp href={linkWhatsapp("Olá! Vi o cardápio de doces finos no site da Chonoko e gostaria de fazer uma encomenda.", whatsapp)}>
        Encomendar
      </BotaoWhatsapp>
    </div>
  );
}

function Precos({ produto }: { produto: Produto }) {
  const { variacoes } = produto;
  if (variacoes.length === 1 && !variacoes[0].rotulo) {
    return <p className="font-display text-[1.75rem] font-semibold text-bordo">{formatarPreco(variacoes[0].preco)}</p>;
  }
  return (
    <dl className="divide-y divide-bordo/10">
      {variacoes.map((v, i) => (
        <div key={i} className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
          <dt className="text-taupe-ink">{v.rotulo}</dt>
          <dd className="font-display text-[1.3rem] font-semibold tabular-nums text-bordo">{formatarPreco(v.preco)}</dd>
        </div>
      ))}
    </dl>
  );
}

function CartaoProduto({
  produto,
  categoria,
  mostrarCategoria,
  onAbrir,
}: {
  produto: Produto;
  categoria?: Categoria;
  mostrarCategoria: boolean;
  onAbrir: () => void;
}) {
  const preco = resumoPreco(produto);
  // O botão do nome se estende sobre o card inteiro: uma só área de toque e uma só parada no teclado.
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] rounded-tl-[3rem] bg-blush shadow-[0_14px_30px_-22px_rgb(43_26_23/0.55)] ring-1 ring-bordo/[0.06] transition-[box-shadow,transform] duration-500 ease-suave group-hover:-translate-y-1 group-hover:shadow-[0_24px_44px_-26px_rgb(43_26_23/0.65)] motion-reduce:group-hover:translate-y-0">
        <FotoProduto
          foto={produto.foto}
          alt=""
          icone={categoria?.icone ?? "docinho"}
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 30vw, 46vw"
          className="transition-transform duration-700 ease-suave group-hover:scale-[1.06]"
        />
        {produto.selos?.map((s) => (
          <span key={s} className="absolute left-3 top-3 rounded-full bg-papel/90 px-2.5 py-0.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-bordo">
            {s}
          </span>
        ))}
        {/* "Ver detalhes" aparece ao passar o mouse (computador) */}
        <span
          aria-hidden="true"
          className="absolute inset-x-3 bottom-3 hidden translate-y-2 items-center justify-center rounded-full bg-papel/92 py-2 text-[0.78rem] font-semibold text-bordo opacity-0 backdrop-blur transition-all duration-500 ease-suave group-hover:translate-y-0 group-hover:opacity-100 md:flex"
        >
          Ver detalhes
        </span>
      </div>
      <div className="mt-3.5 flex flex-1 flex-col px-0.5">
        {mostrarCategoria && categoria && <p className="rotulo !text-[0.66rem] text-rosa-ink">{categoria.nome}</p>}
        <h4 className="text-[1.25rem] font-semibold leading-[1.12] text-bordo transition-colors group-hover:text-rosa-ink sm:text-[1.4rem]">
          <button
            type="button"
            onClick={onAbrir}
            className="text-left after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-rosa-ink"
          >
            {produto.nome}
            <span className="sr-only"> — ver detalhes e preços</span>
          </button>
        </h4>
        {produto.descricao && <p className="mt-1.5 line-clamp-2 text-[0.86rem] leading-snug text-taupe-ink">{produto.descricao}</p>}
        <div className="mt-auto flex flex-wrap items-baseline gap-x-1.5 pt-3">
          {preco.prefixo && <span className="text-[0.78rem] text-taupe-ink">{preco.prefixo}</span>}
          <span className="font-display text-[1.3rem] font-semibold tabular-nums text-bordo">{preco.valor}</span>
          {preco.extra && <span className="hidden text-[0.78rem] text-taupe-ink sm:inline">· {preco.extra}</span>}
        </div>
      </div>
    </article>
  );
}

/**
 * Visualização ampliada do produto.
 * Celular: painel que sobe da parte de baixo. Computador: janela centralizada.
 * Setas (ou ← →) navegam pelos produtos da mesma lista.
 */
function DetalheProduto({
  produto,
  categoria,
  whatsapp,
  posicao,
  onNavegar,
  onFechar,
}: {
  produto: Produto | null;
  categoria?: Categoria;
  whatsapp: string;
  posicao: { atual: number; total: number } | null;
  onNavegar: (d: number) => void;
  onFechar: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (produto && !d.open) d.showModal();
    if (!produto && d.open) d.close();
  }, [produto]);

  useEffect(() => {
    if (!produto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNavegar(1);
      if (e.key === "ArrowLeft") onNavegar(-1);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [produto, onNavegar]);

  const encomenda = categoria?.grupo === "encomenda";
  const msg = produto
    ? encomenda
      ? `Olá! Vi no site da Chonoko e gostaria de encomendar: ${produto.nome}.`
      : `Olá! Vi no site da Chonoko e tenho interesse em: ${produto.nome}.`
    : "";
  const multiplos = (posicao?.total ?? 0) > 1;

  return (
    <dialog
      ref={ref}
      onClose={onFechar}
      onClick={(e) => e.target === e.currentTarget && onFechar()}
      aria-label={produto?.nome ?? "Produto"}
      className="m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-[2rem] bg-papel p-0 text-madeira shadow-2xl backdrop:bg-madeira-escura/60 backdrop:backdrop-blur-sm motion-safe:animate-[subir_0.45s_var(--ease-suave)_both] md:m-auto md:max-h-[calc(100dvh-2rem)] md:w-[min(60rem,calc(100vw-3rem))] md:rounded-[2rem] md:motion-safe:animate-[entrar_0.4s_var(--ease-suave)_both]"
    >
      {produto && (
        <div key={produto.id} className="grid md:grid-cols-[1.05fr_1fr]">
          <div className="relative aspect-[4/3.4] bg-blush md:aspect-auto md:min-h-[34rem]">
            <FotoProduto foto={produto.foto} alt={produto.nome} icone={categoria?.icone ?? "docinho"} sizes="(min-width: 768px) 30rem, 100vw" />
            {/* Alça (celular) */}
            <span aria-hidden="true" className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-papel/80 md:hidden" />
            {multiplos && (
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onNavegar(-1)}
                  className="grid size-11 place-items-center rounded-full bg-papel/90 text-bordo shadow backdrop-blur transition-colors hover:bg-papel"
                  aria-label="Produto anterior"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <span className="rounded-full bg-papel/85 px-3 py-1 text-[0.78rem] font-semibold tabular-nums text-bordo backdrop-blur" aria-live="polite">
                  {posicao?.atual} de {posicao?.total}
                </span>
                <button
                  type="button"
                  onClick={() => onNavegar(1)}
                  className="grid size-11 place-items-center rounded-full bg-papel/90 text-bordo shadow backdrop-blur transition-colors hover:bg-papel"
                  aria-label="Próximo produto"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col p-6 pb-8 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <p className="rotulo text-rosa-ink">
                {categoria?.nome}
                {encomenda && " · encomenda"}
              </p>
              <button
                type="button"
                onClick={onFechar}
                autoFocus
                className="-mr-2 -mt-2 grid size-11 shrink-0 place-items-center rounded-full text-bordo transition-colors hover:bg-creme"
                aria-label="Fechar"
              >
                <X className="size-5" />
              </button>
            </div>
            <h3 className="mt-2 text-[2.2rem] leading-[1.05] text-bordo sm:text-[2.6rem]">{produto.nome}</h3>
            {produto.selos?.length ? (
              <p className="mt-3 flex gap-2">
                {produto.selos.map((s) => (
                  <span key={s} className="rounded-full bg-blush px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rosa-ink">
                    {s}
                  </span>
                ))}
              </p>
            ) : null}
            {produto.descricao && <p className="mt-4 text-[1.05rem] leading-relaxed text-taupe-ink">{produto.descricao}</p>}
            <div className="mt-6 rounded-2xl bg-creme px-5 py-4">
              <p className="rotulo mb-3 !text-[0.68rem] text-taupe-ink">{produto.variacoes.length > 1 ? "Tamanhos e preços" : "Preço"}</p>
              <Precos produto={produto} />
            </div>
            {encomenda && <p className="mt-3 text-[0.85rem] text-taupe-ink">Mínimo 20 unidades de cada sabor. Encomende com antecedência.</p>}
            <div className="mt-auto pt-7">
              <BotaoWhatsapp href={linkWhatsapp(msg, whatsapp)} className="w-full">
                {encomenda ? "Encomendar pelo WhatsApp" : "Pedir pelo WhatsApp"}
              </BotaoWhatsapp>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
