"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ItemGaleria } from "@/data/conteudo";
import { ArteProvisoria } from "@/components/ui/ArteProvisoria";
import { Reveal } from "@/components/ui/Reveal";

const formatos: Record<ItemGaleria["formato"], string> = {
  grande: "col-span-2 row-span-2",
  alta: "row-span-2",
  normal: "",
};

type Foto = Extract<ItemGaleria, { tipo: "foto" }>;

export function GaleriaGrade({ itens }: { itens: ItemGaleria[] }) {
  const fotos = itens.filter((i): i is Foto => i.tipo === "foto");
  const [indice, setIndice] = useState<number | null>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const origem = useRef<HTMLElement | null>(null);

  const abrir = (id: string, el: HTMLElement) => {
    origem.current = el;
    setIndice(fotos.findIndex((f) => f.id === id));
  };
  const total = fotos.length;
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

  const atual = indice !== null ? fotos[indice] : null;

  return (
    <>
      <ul className="mt-14 grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:auto-rows-[15rem] lg:grid-cols-4 lg:gap-5">
        {itens.map((item, i) => (
          <li key={item.id} className={formatos[item.formato]}>
            <Reveal atraso={(i % 4) * 80} className="h-full">
              {item.tipo === "foto" ? (
                <button
                  type="button"
                  onClick={(e) => abrir(item.id, e.currentTarget)}
                  className="group relative block size-full overflow-hidden rounded-[1.5rem] text-left"
                  aria-label={`Ampliar foto: ${item.titulo}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    placeholder="blur"
                    sizes={item.formato === "grande" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-[1.2s] ease-suave group-hover:scale-105"
                    style={{ objectPosition: item.posicao ?? "50% 50%" }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-madeira-escura/70 via-madeira-escura/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-creme">
                    <span className="font-display text-xl italic sm:text-2xl">{item.titulo}</span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-papel/20 backdrop-blur transition-all duration-500 group-hover:bg-papel group-hover:text-bordo">
                      <Maximize2 className="size-4" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              ) : (
                <div className="group size-full overflow-hidden rounded-[1.5rem]">
                  <ArteProvisoria icone={item.icone} legenda={`Em breve · ${item.titulo}`} className="rounded-[1.5rem]" />
                </div>
              )}
            </Reveal>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogo}
        onClose={fechar}
        onClick={(e) => e.target === e.currentTarget && fechar()}
        aria-label={atual ? `Foto ampliada: ${atual.titulo}` : "Foto ampliada"}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-madeira-escura/95 p-0 text-creme backdrop:bg-madeira-escura/60 backdrop:backdrop-blur-sm"
      >
        {atual && (
          <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && fechar()}>
            <div className="flex items-center justify-between px-4 py-3 sm:px-8">
              <p className="font-display text-2xl italic">{atual.titulo}</p>
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
            <figure className="relative mx-4 mb-4 flex-1 sm:mx-20">
              <Image
                key={atual.id}
                src={atual.src}
                alt={atual.alt}
                fill
                sizes="100vw"
                className="object-contain motion-safe:animate-[entrar_0.5s_var(--ease-suave)_both]"
              />
            </figure>
            <figcaption className="px-5 pb-4 text-center text-sm text-creme/70 sm:px-8">{atual.alt}</figcaption>
            {fotos.length > 1 && (
              <div className="flex items-center justify-center gap-4 pb-6">
                <button
                  type="button"
                  onClick={() => passo(-1)}
                  className="grid size-12 place-items-center rounded-full border border-creme/25 transition-colors hover:bg-creme/10"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="size-6" strokeWidth={1.6} />
                </button>
                <span className="min-w-14 text-center text-sm tabular-nums text-creme/70" aria-live="polite">
                  {(indice ?? 0) + 1} / {fotos.length}
                </span>
                <button
                  type="button"
                  onClick={() => passo(1)}
                  className="grid size-12 place-items-center rounded-full border border-creme/25 transition-colors hover:bg-creme/10"
                  aria-label="Próxima foto"
                >
                  <ChevronRight className="size-6" strokeWidth={1.6} />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
