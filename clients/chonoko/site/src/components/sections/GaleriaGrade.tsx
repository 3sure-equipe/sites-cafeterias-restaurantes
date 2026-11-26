"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ItemGaleria } from "@/data/conteudo";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Composição editorial (computador, grade de 12 colunas).
 * Posições definidas por id; fotos novas sem posição entram ao final, em blocos regulares.
 */
const posicoes: Record<string, string> = {
  ambiente: "lg:col-[1/8] lg:row-[1/6]",
  fachada: "lg:col-[8/13] lg:row-[1/4]",
  torta: "lg:col-[1/5] lg:row-[6/10]",
  trufa: "lg:col-[5/9] lg:row-[6/8]",
  copinho: "lg:col-[5/9] lg:row-[8/10]",
  cacho: "lg:col-[9/13] lg:row-[6/10]",
  cesta: "lg:col-[1/6] lg:row-[10/13]",
  biscoitos: "lg:col-[6/9] lg:row-[10/13]",
  "te-amo": "lg:col-[9/13] lg:row-[10/13]",
};

/** Celular/tablet: duas colunas desencontradas com proporções alternadas. */
const proporcaoMobile = ["aspect-[3/4]", "aspect-square", "aspect-[3/4]", "aspect-square"];

export function GaleriaGrade({ itens }: { itens: ItemGaleria[] }) {
  const [indice, setIndice] = useState<number | null>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const origem = useRef<HTMLElement | null>(null);
  const toque = useRef<number | null>(null);
  const total = itens.length;

  const abrir = (i: number, el: HTMLElement) => {
    origem.current = el;
    setIndice(i);
  };
  const fechar = () => setIndice(null);
  const passo = (d: number) => setIndice((i) => (i === null ? i : (i + d + total) % total));

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (indice !== null && !d.open) d.showModal();
    if (indice === null && d.open) {
      d.close();
      origem.current?.focus();
    }
  }, [indice]);

  useEffect(() => {
    if (indice === null) return;
    const aoTeclar = (e: KeyboardEvent) => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (d) setIndice((i) => (i === null ? i : (i + d + total) % total));
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [indice, total]);

  const atual = indice !== null ? itens[indice] : null;
  const [principal, ...demais] = itens;
  const esquerda = demais.filter((_, i) => i % 2 === 0);
  const direita = demais.filter((_, i) => i % 2 === 1);

  const tile = (item: ItemGaleria, i: number, classe: string, sizes: string, legendaSempre = false) => (
    <button
      type="button"
      onClick={(e) => abrir(i, e.currentTarget)}
      className={`group relative block w-full overflow-hidden rounded-[1.25rem] bg-blush text-left sm:rounded-[1.5rem] ${classe}`}
      aria-label={`Ampliar foto: ${item.titulo}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        placeholder={typeof item.src === "string" ? "empty" : "blur"}
        sizes={sizes}
        className="object-cover transition-transform duration-[1.4s] ease-suave group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
        style={{ objectPosition: item.posicao ?? "50% 50%" }}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-madeira-escura/65 via-madeira-escura/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <span
        className={`absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-creme transition-all duration-500 ease-suave sm:inset-x-4 sm:bottom-4 ${
          legendaSempre ? "" : "lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100"
        }`}
      >
        <span className="font-display text-[1.05rem] italic leading-tight sm:text-xl lg:text-[1.6rem]">{item.titulo}</span>
        <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-papel/20 backdrop-blur sm:grid">
          <Maximize2 className="size-4" aria-hidden="true" />
        </span>
      </span>
    </button>
  );

  const blocoTexto = (
    <div className="flex h-full flex-col justify-center rounded-[1.5rem] bg-bordo px-6 py-7 text-creme lg:px-8">
      <p className="rotulo text-rosa-claro">{site.assinatura}</p>
      <p className="mt-2 font-display text-[1.45rem] italic leading-snug lg:text-[1.6rem]">Chocolates e biscoitos feitos à mão, em {site.cidade}.</p>
    </div>
  );

  return (
    <>
      {/* ---------- Computador: composição editorial ---------- */}
      <div className="mt-14 hidden auto-rows-[4.75rem] grid-cols-12 gap-4 lg:grid xl:auto-rows-[5.25rem] xl:gap-5">
        {itens.map((item, i) => (
          <Reveal key={item.id} atraso={(i % 3) * 90} className={posicoes[item.id] ?? "lg:col-span-4 lg:row-span-3"}>
            {tile(item, i, "h-full", i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 40vw, 50vw", i === 0)}
          </Reveal>
        ))}
        <Reveal className="lg:col-[8/13] lg:row-[4/6]" atraso={150}>
          {blocoTexto}
        </Reveal>
      </div>

      {/* ---------- Celular e tablet: duas colunas desencontradas ---------- */}
      <div className="mt-10 lg:hidden">
        <Reveal>{tile(principal, 0, "aspect-[4/3.3]", "100vw", true)}</Reveal>
        <div className="mt-3 sm:mt-4">{blocoTexto}</div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4">
          {[esquerda, direita].map((coluna, c) => (
            <div key={c} className={`flex flex-col gap-3 sm:gap-4 ${c === 1 ? "mt-10" : ""}`}>
              {coluna.map((item, k) => {
                const i = itens.indexOf(item);
                return (
                  <Reveal key={item.id} atraso={k * 60}>
                    {tile(item, i, proporcaoMobile[(k + c) % proporcaoMobile.length], "50vw", true)}
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Visualização ampliada ---------- */}
      <dialog
        ref={dialogo}
        onClose={fechar}
        onClick={(e) => e.target === e.currentTarget && fechar()}
        aria-label={atual ? `Foto ampliada: ${atual.titulo}` : "Foto ampliada"}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-madeira-escura/95 p-0 text-creme backdrop:bg-madeira-escura/60 backdrop:backdrop-blur-sm"
      >
        {atual && (
          <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && fechar()}>
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-8">
              <p className="font-display text-2xl italic">{atual.titulo}</p>
              <div className="flex items-center gap-3">
                <span className="text-sm tabular-nums text-creme/70" aria-live="polite">
                  {(indice ?? 0) + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={fechar}
                  autoFocus
                  className="grid size-12 place-items-center rounded-full border border-creme/25 transition-colors hover:bg-creme/10"
                  aria-label="Fechar"
                >
                  <X className="size-6" strokeWidth={1.6} />
                </button>
              </div>
            </div>

            <figure
              className="relative mx-2 flex-1 touch-pan-y sm:mx-20"
              onPointerDown={(e) => (toque.current = e.clientX)}
              onPointerUp={(e) => {
                if (toque.current === null) return;
                const dx = e.clientX - toque.current;
                toque.current = null;
                if (Math.abs(dx) > 50) passo(dx < 0 ? 1 : -1);
              }}
            >
              <Image
                key={atual.id}
                src={atual.src}
                alt={atual.alt}
                fill
                sizes="100vw"
                className="select-none object-contain motion-safe:animate-[entrar_0.5s_var(--ease-suave)_both]"
                draggable={false}
              />
              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => passo(-1)}
                    className="absolute left-0 top-1/2 hidden size-12 -translate-x-16 -translate-y-1/2 place-items-center rounded-full border border-creme/25 transition-colors hover:bg-creme/10 sm:grid"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="size-6" strokeWidth={1.6} />
                  </button>
                  <button
                    type="button"
                    onClick={() => passo(1)}
                    className="absolute right-0 top-1/2 hidden size-12 -translate-y-1/2 translate-x-16 place-items-center rounded-full border border-creme/25 transition-colors hover:bg-creme/10 sm:grid"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight className="size-6" strokeWidth={1.6} />
                  </button>
                </>
              )}
            </figure>
            <figcaption className="px-5 pt-3 text-center text-sm text-creme/70 sm:px-8">{atual.alt}</figcaption>

            {/* Miniaturas */}
            <div className="sem-barra mx-auto mt-3 flex max-w-full gap-2 overflow-x-auto px-4 pb-5">
              {itens.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndice(i)}
                  aria-label={`Ver foto: ${item.titulo}`}
                  aria-current={i === indice ? "true" : undefined}
                  className={`relative size-14 shrink-0 overflow-hidden rounded-xl transition-all duration-300 sm:size-16 ${
                    i === indice ? "ring-2 ring-creme" : "opacity-50 hover:opacity-90"
                  }`}
                >
                  <Image src={item.src} alt="" fill sizes="64px" className="object-cover" style={{ objectPosition: item.posicao ?? "50% 50%" }} />
                </button>
              ))}
            </div>
            <p className="pb-3 text-center text-[0.75rem] text-creme/50 sm:hidden">Deslize para o lado para ver outras fotos</p>
          </div>
        )}
      </dialog>
    </>
  );
}
