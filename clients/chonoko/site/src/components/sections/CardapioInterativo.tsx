"use client";

import { Search, Store, PartyPopper, X } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { formatarPreco, regrasEncomenda } from "@/data/cardapio";
import { linkWhatsapp } from "@/data/site";
import { useDados } from "@/lib/dados/store";
import type { Categoria, GrupoCardapio, Produto } from "@/lib/dados/tipos";
import { FotoProduto } from "@/components/ui/FotoProduto";
import { iconesCategoria } from "@/components/ui/Icones";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";

const grupos: { id: GrupoCardapio; titulo: string; subtitulo: string; Icone: typeof Store }[] = [
  { id: "loja", titulo: "Na loja", subtitulo: "Pronta entrega", Icone: Store },
  { id: "encomenda", titulo: "Doces finos", subtitulo: "Encomendas para festas", Icone: PartyPopper },
];

const normalizar = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function CardapioInterativo() {
  const { categorias, produtos, info } = useDados();
  const [grupo, setGrupo] = useState<GrupoCardapio>("loja");
  const [categoriaId, setCategoriaId] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const termo = useDeferredValue(busca.trim());
  const [aberto, setAberto] = useState<Produto | null>(null);
  const topo = useRef<HTMLDivElement>(null);

  const catsDoGrupo = useMemo(
    () => categorias.filter((c) => c.grupo === grupo).sort((a, b) => a.ordem - b.ordem),
    [categorias, grupo],
  );
  const categoria = catsDoGrupo.find((c) => c.id === categoriaId) ?? catsDoGrupo[0];
  const catPorId = useMemo(() => new Map(categorias.map((c) => [c.id, c])), [categorias]);
  const visiveis = useMemo(() => produtos.filter((p) => p.disponivel).sort((a, b) => a.ordem - b.ordem), [produtos]);

  const contagem = (id: string) => visiveis.filter((p) => p.categoriaId === id).length;

  const resultados = useMemo(() => {
    if (!termo) return null;
    const t = normalizar(termo);
    return visiveis.filter((p) => normalizar(`${p.nome} ${p.descricao ?? ""} ${catPorId.get(p.categoriaId)?.nome ?? ""}`).includes(t));
  }, [termo, visiveis, catPorId]);

  const lista = resultados ?? visiveis.filter((p) => p.categoriaId === categoria?.id);

  function escolherGrupo(g: GrupoCardapio) {
    setGrupo(g);
    setCategoriaId(null);
    setBusca("");
  }

  return (
    <div className="mt-12" ref={topo}>
      {/* Loja x Encomendas */}
      <div role="tablist" aria-label="Tipo de cardápio" className="grid grid-cols-2 gap-2 rounded-[1.75rem] bg-papel/70 p-1.5 ring-1 ring-bordo/10 sm:inline-grid sm:min-w-[34rem]">
        {grupos.map(({ id, titulo, subtitulo, Icone }) => {
          const ativo = grupo === id && !resultados;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={ativo}
              onClick={() => escolherGrupo(id)}
              className={`flex items-center gap-3 rounded-[1.4rem] px-4 py-3 text-left transition-all duration-300 ease-suave sm:px-5 ${
                ativo ? "bg-bordo text-creme shadow-[0_12px_28px_-16px_rgb(74_32_41/0.9)]" : "text-madeira hover:bg-creme"
              }`}
            >
              <Icone className={`size-5 shrink-0 ${ativo ? "text-rosa-claro" : "text-rosa-ink"}`} strokeWidth={1.6} aria-hidden="true" />
              <span className="leading-tight">
                <span className="block font-display text-[1.35rem] font-semibold">{titulo}</span>
                <span className={`block text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${ativo ? "text-creme/75" : "text-taupe-ink"}`}>
                  {subtitulo}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Busca + categorias (fixas ao rolar no celular) */}
      <div className="sticky top-16 z-20 -mx-5 mt-6 bg-creme/92 px-5 pb-3 pt-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <label className="relative block">
          <span className="sr-only">Buscar no cardápio</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-[1.1rem] -translate-y-1/2 text-taupe-ink" aria-hidden="true" />
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar: trufa, biscoito, torta…"
            className="h-12 w-full rounded-full border border-bordo/15 bg-papel pl-11 pr-11 text-[1rem] text-madeira outline-none transition-colors placeholder:text-taupe-ink/80 focus:border-bordo/50 sm:max-w-md"
          />
          {busca && (
            <button
              type="button"
              onClick={() => setBusca("")}
              className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-taupe-ink hover:bg-creme sm:left-[calc(28rem-2.75rem)] sm:right-auto"
              aria-label="Limpar busca"
            >
              <X className="size-4" />
            </button>
          )}
        </label>

        {!resultados && (
          <div role="tablist" aria-label="Categorias" className="sem-barra -mx-1 mt-3 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
            {catsDoGrupo.map((c) => {
              const Icone = iconesCategoria[c.icone];
              const sel = c.id === categoria?.id;
              const n = contagem(c.id);
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={sel}
                  onClick={() => {
                    setCategoriaId(c.id);
                    if (topo.current && topo.current.getBoundingClientRect().top < 0) {
                      topo.current.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-4 text-[0.92rem] font-semibold transition-all duration-300 ease-suave ${
                    sel ? "border-bordo bg-bordo text-creme" : "border-bordo/15 bg-papel/80 text-madeira hover:border-bordo/40 hover:text-bordo"
                  }`}
                >
                  <Icone className="size-4" strokeWidth={1.6} aria-hidden="true" />
                  {c.nome}
                  <span className={`rounded-full px-1.5 text-[0.7rem] tabular-nums ${sel ? "bg-creme/15" : "bg-creme text-taupe-ink"}`}>{n}</span>
                </button>
              );
            })}
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
          categoria && <CabecalhoCategoria categoria={categoria} />
        )}

        {!resultados && grupo === "encomenda" && <RegrasEncomenda whatsapp={info.whatsapp} />}

        {lista.length > 0 ? (
          <ul key={resultados ? "busca" : categoria?.id} className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {lista.map((p, i) => (
              <li key={p.id} className="motion-safe:animate-[entrar_0.6s_var(--ease-suave)_both]" style={{ animationDelay: `${Math.min(i, 12) * 45}ms` }}>
                <CartaoProduto produto={p} categoria={catPorId.get(p.categoriaId)} mostrarCategoria={!!resultados} onAbrir={() => setAberto(p)} />
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
      <div className="mt-16 flex flex-col items-start justify-between gap-5 rounded-[2rem] bg-bordo px-7 py-8 text-creme sm:flex-row sm:items-center sm:px-10">
        <div>
          <p className="font-display text-3xl">Quer encomendar ou tirar uma dúvida?</p>
          <p className="mt-1 text-creme/75">Fale direto com a Chonoko pelo WhatsApp {info.whatsappExibicao}.</p>
        </div>
        <BotaoWhatsapp href={linkWhatsapp(info.whatsappMensagem, info.whatsapp)} claro>
          Chamar no WhatsApp
        </BotaoWhatsapp>
      </div>
      <p className="mt-4 text-[0.82rem] text-taupe-ink">
        Preços conforme os cardápios atuais da Chonoko, sujeitos a alteração. Fotos ilustram os produtos da casa.
      </p>

      <DetalheProduto
        produto={aberto}
        categoria={aberto ? catPorId.get(aberto.categoriaId) : undefined}
        whatsapp={info.whatsapp}
        onFechar={() => setAberto(null)}
      />
    </div>
  );
}

function CabecalhoCategoria({ categoria }: { categoria: Categoria }) {
  return (
    <div className="mb-8 flex flex-col gap-2 border-b border-bordo/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <h3 className="text-[2rem] text-bordo sm:text-[2.6rem]">{categoria.nome}</h3>
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

function Precos({ produto, compacto }: { produto: Produto; compacto?: boolean }) {
  const { variacoes } = produto;
  if (variacoes.length === 1 && !variacoes[0].rotulo) {
    return <p className="font-display text-xl font-semibold text-bordo">{formatarPreco(variacoes[0].preco)}</p>;
  }
  return (
    <dl className={compacto ? "space-y-0.5" : "space-y-2"}>
      {variacoes.map((v, i) => (
        <div key={i} className="flex items-baseline gap-2">
          <dt className={`shrink-0 text-taupe-ink ${compacto ? "text-[0.82rem]" : ""}`}>{v.rotulo}</dt>
          <span aria-hidden="true" className="mb-1 flex-1 border-b border-dotted border-bordo/25" />
          <dd className={`shrink-0 font-display font-semibold tabular-nums text-bordo ${compacto ? "text-[1.05rem]" : "text-xl"}`}>
            {formatarPreco(v.preco)}
          </dd>
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
  // O botão do nome se estende sobre o card inteiro: uma só área de toque e uma só parada no teclado.
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden rounded-[1.25rem] rounded-tl-[2.75rem] bg-blush shadow-[0_14px_30px_-22px_rgb(43_26_23/0.55)] ring-1 ring-bordo/[0.06] transition-[box-shadow,transform] duration-500 ease-suave group-hover:-translate-y-1 group-hover:shadow-[0_22px_40px_-24px_rgb(43_26_23/0.6)] motion-reduce:group-hover:translate-y-0">
        <FotoProduto
          foto={produto.foto}
          alt=""
          icone={categoria?.icone ?? "docinho"}
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 30vw, 46vw"
          className="transition-transform duration-700 ease-suave group-hover:scale-[1.05]"
        />
        {produto.selos?.map((s) => (
          <span key={s} className="absolute left-3 top-3 rounded-full bg-papel/90 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-bordo">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-3.5 flex flex-1 flex-col">
        {mostrarCategoria && categoria && <p className="rotulo !text-[0.68rem] text-rosa-ink">{categoria.nome}</p>}
        <h4 className="text-[1.3rem] font-semibold leading-[1.12] text-bordo transition-colors group-hover:text-rosa-ink sm:text-[1.45rem]">
          <button
            type="button"
            onClick={onAbrir}
            className="text-left after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-rosa-ink"
          >
            {produto.nome}
            <span className="sr-only"> — ver detalhes e preços</span>
          </button>
        </h4>
        {produto.descricao && <p className="mt-1.5 line-clamp-2 text-[0.88rem] leading-snug text-taupe-ink">{produto.descricao}</p>}
        <div className="mt-auto pt-3">
          <Precos produto={produto} compacto />
        </div>
      </div>
    </article>
  );
}

function DetalheProduto({
  produto,
  categoria,
  whatsapp,
  onFechar,
}: {
  produto: Produto | null;
  categoria?: Categoria;
  whatsapp: string;
  onFechar: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (produto && !d.open) d.showModal();
    if (!produto && d.open) d.close();
  }, [produto]);

  const encomenda = categoria?.grupo === "encomenda";
  const msg = produto
    ? encomenda
      ? `Olá! Vi no site da Chonoko e gostaria de encomendar: ${produto.nome}.`
      : `Olá! Vi no site da Chonoko e tenho interesse em: ${produto.nome}.`
    : "";

  return (
    <dialog
      ref={ref}
      onClose={onFechar}
      onClick={(e) => e.target === e.currentTarget && onFechar()}
      aria-label={produto?.nome ?? "Produto"}
      className="m-auto w-[min(56rem,calc(100vw-1.5rem))] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[2rem] bg-papel p-0 text-madeira shadow-2xl backdrop:bg-madeira-escura/60 backdrop:backdrop-blur-sm"
    >
      {produto && (
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-blush md:aspect-auto md:min-h-[30rem]">
            <FotoProduto foto={produto.foto} alt={produto.nome} icone={categoria?.icone ?? "docinho"} sizes="(min-width: 768px) 28rem, 100vw" />
          </div>
          <div className="flex flex-col p-6 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <p className="rotulo text-rosa-ink">
                {categoria?.nome}
                {encomenda && " · encomenda"}
              </p>
              <button
                type="button"
                onClick={onFechar}
                autoFocus
                className="-mr-2 -mt-2 grid size-11 shrink-0 place-items-center rounded-full text-bordo hover:bg-creme"
                aria-label="Fechar"
              >
                <X className="size-5" />
              </button>
            </div>
            <h3 className="mt-2 text-4xl text-bordo">{produto.nome}</h3>
            {produto.selos?.length ? (
              <p className="mt-3 flex gap-2">
                {produto.selos.map((s) => (
                  <span key={s} className="rounded-full bg-blush px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rosa-ink">
                    {s}
                  </span>
                ))}
              </p>
            ) : null}
            {produto.descricao && <p className="mt-4 text-lg leading-relaxed text-taupe-ink">{produto.descricao}</p>}
            <div className="mt-6 rounded-2xl bg-creme p-5">
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
