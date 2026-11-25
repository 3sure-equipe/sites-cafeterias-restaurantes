"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { formatarPreco, type Categoria, type ItemCardapio } from "@/data/cardapio";
import { ArteProvisoria } from "@/components/ui/ArteProvisoria";
import { iconesCategoria } from "@/components/ui/Icones";

type Props = { categorias: Categoria[]; itens: ItemCardapio[] };

export function CardapioAbas({ categorias, itens }: Props) {
  const [atual, setAtual] = useState(categorias[0]?.id);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const categoria = categorias.find((c) => c.id === atual) ?? categorias[0];
  const lista = itens.filter((i) => i.categoria === categoria.id);

  // Navegação por setas entre as abas (padrão ARIA de tabs)
  function aoTeclar(e: React.KeyboardEvent, indice: number) {
    const total = categorias.length;
    let novo = -1;
    if (e.key === "ArrowRight") novo = (indice + 1) % total;
    if (e.key === "ArrowLeft") novo = (indice - 1 + total) % total;
    if (e.key === "Home") novo = 0;
    if (e.key === "End") novo = total - 1;
    if (novo < 0) return;
    e.preventDefault();
    setAtual(categorias[novo].id);
    abas.current[novo]?.focus();
  }

  return (
    <div className="mt-14">
      {/* Abas: rolam na horizontal no celular e ficam fixas ao rolar o cardápio */}
      <div className="sticky top-16 z-20 -mx-5 bg-creme/90 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <div
          role="tablist"
          aria-label="Categorias do cardápio"
          className="sem-barra -mx-1 flex snap-x gap-2 overflow-x-auto px-1 lg:flex-wrap lg:gap-3"
        >
          {categorias.map((c, i) => {
            const Icone = iconesCategoria[c.icone];
            const selecionada = c.id === categoria.id;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  abas.current[i] = el;
                }}
                role="tab"
                id={`aba-${c.id}`}
                aria-selected={selecionada}
                aria-controls="painel-cardapio"
                tabIndex={selecionada ? 0 : -1}
                onClick={() => setAtual(c.id)}
                onKeyDown={(e) => aoTeclar(e, i)}
                className={`flex min-h-12 shrink-0 snap-start items-center gap-2.5 rounded-full border px-5 text-[0.95rem] font-semibold transition-all duration-300 ease-suave ${
                  selecionada
                    ? "border-bordo bg-bordo text-creme shadow-[0_10px_24px_-14px_rgb(74_32_41/0.8)]"
                    : "border-bordo/15 bg-papel/70 text-madeira hover:border-bordo/40 hover:text-bordo"
                }`}
              >
                <Icone className="size-[1.1rem]" strokeWidth={1.6} aria-hidden="true" />
                {c.nome}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="painel-cardapio"
        role="tabpanel"
        aria-labelledby={`aba-${categoria.id}`}
        tabIndex={0}
        className="mt-10 focus-visible:outline-offset-8"
      >
        <div key={categoria.id} className="motion-safe:animate-[entrar_0.6s_var(--ease-suave)_both]">
          <div className="flex items-baseline gap-4 border-b border-bordo/15 pb-5">
            <h3 className="text-4xl text-bordo sm:text-5xl">{categoria.nome}</h3>
            <p className="hidden font-display text-xl italic text-taupe-ink sm:block">{categoria.chamada}</p>
          </div>

          {lista.length === 0 ? (
            <p className="py-16 text-center text-taupe-ink">Os itens desta categoria serão adicionados em breve.</p>
          ) : (
            <ul className="grid gap-x-12 lg:grid-cols-2">
              {lista.map((item, i) => (
                <li
                  key={item.id}
                  className="motion-safe:animate-[entrar_0.7s_var(--ease-suave)_both]"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <ItemCard item={item} categoria={categoria} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function ItemCard({ item, categoria }: { item: ItemCardapio; categoria: Categoria }) {
  return (
    <article className="group flex gap-5 border-b border-dashed border-bordo/15 py-6 sm:gap-6">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl rounded-tl-[2.5rem] shadow-[0_14px_30px_-18px_rgb(43_26_23/0.55)] sm:size-28">
        {item.foto ? (
          <Image
            src={item.foto}
            alt={item.nome}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-700 ease-suave group-hover:scale-110"
          />
        ) : (
          <ArteProvisoria icone={categoria.icone} tamanho="p" legenda={`foto de ${item.nome}`} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h4 className="font-display text-[1.6rem] font-medium leading-tight text-bordo transition-colors group-hover:text-rosa-ink">
            {item.nome}
          </h4>
          <span aria-hidden="true" className="mb-1.5 hidden flex-1 border-b border-dotted border-bordo/30 sm:block" />
          <p
            className={`ml-auto shrink-0 font-display text-xl font-semibold tabular-nums sm:ml-0 ${
              item.preco === null ? "text-taupe-ink/70" : "text-bordo"
            }`}
          >
            <span className="sr-only">Preço: </span>
            {item.preco === null ? <span title="Preço ilustrativo">
                {formatarPreco(null)}
                <span className="sr-only"> (ilustrativo)</span>
              </span> : formatarPreco(item.preco)}
          </p>
        </div>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-taupe-ink">{item.descricao}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-papel px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-taupe-ink ring-1 ring-bordo/10">
            {categoria.nome}
          </span>
          {item.demo && (
            <span className="rounded-full border border-dashed border-rosa/60 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rosa-ink">
              Exemplo
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
