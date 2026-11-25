"use client";

import { CalendarDays } from "lucide-react";
import { formatarPreco } from "@/data/cardapio";
import { linkWhatsapp } from "@/data/site";
import { statusPublicacao, useDados, useHoje } from "@/lib/dados/store";
import type { Publicacao } from "@/lib/dados/tipos";
import { LinkTexto } from "@/components/ui/Botao";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { FotoProduto } from "@/components/ui/FotoProduto";
import { Ornamento } from "@/components/ui/Icones";
import { AvisoDemo } from "@/components/ui/Pendente";
import { Reveal } from "@/components/ui/Reveal";

export const rotuloTipo: Record<Publicacao["tipo"], string> = {
  promocao: "Promoção",
  novidade: "Novidade",
  especial: "Produto especial",
};

export function formatarData(iso: string) {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

export function textoValidade(p: Publicacao) {
  if (p.inicio && p.fim) return `De ${formatarData(p.inicio)} a ${formatarData(p.fim)}`;
  if (p.fim) return `Válido até ${formatarData(p.fim)}`;
  if (p.inicio) return `A partir de ${formatarData(p.inicio)}`;
  return null;
}

const msgDe = (p: Publicacao) => `Olá! Vi no site da Chonoko: “${p.titulo}”. Gostaria de saber mais.`;

function Etiquetas({ p, claro }: { p: Publicacao; claro?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`rounded-full px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] ${
          claro ? "bg-papel/90 text-bordo" : "bg-bordo text-creme"
        }`}
      >
        {rotuloTipo[p.tipo]}
      </span>
      {p.demo && (
        <span
          className={`rounded-full border border-dashed px-2.5 py-0.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] ${
            claro ? "border-creme/60 text-creme" : "border-rosa/60 text-rosa-ink"
          }`}
        >
          Exemplo
        </span>
      )}
    </div>
  );
}

function Preco({ p, claro }: { p: Publicacao; claro?: boolean }) {
  if (p.precoOriginal === null && p.precoPromocional === null) return null;
  return (
    <p className="mt-3 flex items-baseline gap-2.5">
      {p.precoOriginal !== null && p.precoPromocional !== null && (
        <span className={`line-through ${claro ? "text-creme/70" : "text-taupe-ink"}`}>
          <span className="sr-only">De </span>
          {formatarPreco(p.precoOriginal)}
        </span>
      )}
      <span className={`font-display text-[1.9rem] font-semibold ${claro ? "text-creme" : "text-bordo"}`}>
        <span className="sr-only">Por </span>
        {formatarPreco(p.precoPromocional ?? p.precoOriginal)}
      </span>
    </p>
  );
}

function Validade({ p, claro }: { p: Publicacao; claro?: boolean }) {
  const v = textoValidade(p);
  if (!v) return null;
  return (
    <p className={`mt-3 flex items-center gap-2 text-sm font-medium ${claro ? "text-creme/85" : "text-taupe-ink"}`}>
      <CalendarDays className={`size-4 ${claro ? "text-rosa-claro" : "text-rosa-ink"}`} aria-hidden="true" />
      {v}
    </p>
  );
}

/** Lista pública: mostra só o que está ativo e dentro do período. */
export function NovidadesLista() {
  const { publicacoes, info } = useDados();
  const hoje = useHoje();
  const noAr = publicacoes.filter((p) => statusPublicacao(p, hoje) === "no-ar");
  const haDemo = noAr.some((p) => p.demo);

  if (noAr.length === 0) {
    return (
      <div className="mt-12 rounded-[2rem] border border-dashed border-bordo/20 bg-creme/60 px-6 py-14 text-center">
        <p className="font-display text-3xl italic text-bordo">Novidades a caminho.</p>
        <p className="mx-auto mt-2 max-w-md text-taupe-ink">Acompanhe a Chonoko no Instagram para não perder nenhum lançamento.</p>
      </div>
    );
  }

  const [destaque, ...demais] = noAr;
  return (
    <>
      {haDemo && (
        <div className="mt-8 max-w-2xl">
          <AvisoDemo>
            <strong className="font-semibold text-madeira">Conteúdo demonstrativo.</strong> Os cards marcados como “exemplo”
            mostram como as publicações feitas pelo painel aparecem aqui. Nenhuma promoção abaixo está vigente.
          </AvisoDemo>
        </div>
      )}

      <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:gap-6">
        {/* Destaque: foto em tela cheia com o texto sobre ela */}
        <Reveal className="lg:col-span-7">
          <article className="group relative flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-bordo text-creme sm:min-h-[34rem]">
            {destaque.foto ? (
              <>
                <div className="absolute inset-0 transition-transform duration-[1.6s] ease-suave group-hover:scale-[1.04]">
                  <FotoProduto foto={destaque.foto} alt="" icone="presente" sizes="(min-width: 1024px) 55vw, 100vw" />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-madeira-escura/90 via-madeira-escura/35 to-transparent" />
              </>
            ) : (
              <div aria-hidden="true" className="toldo absolute inset-x-0 top-0" />
            )}
            <div className="relative p-7 sm:p-10">
              <Etiquetas p={destaque} claro />
              <h3 className="mt-4 max-w-lg text-[2.2rem] leading-[1.05] sm:text-[2.8rem]">{destaque.titulo}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-creme/85">{destaque.descricao}</p>
              <Preco p={destaque} claro />
              <Validade p={destaque} claro />
              {destaque.condicoes && <p className="mt-2 max-w-md text-[0.85rem] italic text-creme/70">{destaque.condicoes}</p>}
              <BotaoWhatsapp href={linkWhatsapp(msgDe(destaque), info.whatsapp)} claro className="mt-7">
                Saber mais
              </BotaoWhatsapp>
            </div>
          </article>
        </Reveal>

        {/* Demais: carrossel no celular, coluna no computador */}
        {demais.length > 0 && (
          <div className="sem-barra -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
            {demais.map((p, i) => (
              <Reveal key={p.id} atraso={(i + 1) * 100} className="w-[80%] shrink-0 snap-center sm:w-[55%] lg:w-auto lg:flex-1">
                <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-creme ring-1 ring-bordo/10 transition-shadow duration-500 hover:shadow-[0_26px_50px_-34px_rgb(43_26_23/0.6)] lg:flex-row">
                  <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-bordo lg:aspect-auto lg:w-[42%]">
                    {p.foto ? (
                      <div className="absolute inset-0 transition-transform duration-[1.4s] ease-suave group-hover:scale-105">
                        <FotoProduto foto={p.foto} alt="" icone="presente" sizes="(min-width: 1024px) 18rem, 80vw" />
                      </div>
                    ) : (
                      <div aria-hidden="true" className="absolute inset-0">
                        <div className="toldo absolute inset-x-0 top-0" />
                        <div className="absolute inset-0 grid place-items-center pt-6">
                          <Ornamento className="h-2.5 w-12 text-rosa-claro" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <Etiquetas p={p} />
                    <h3 className="titulo-bloco mt-3 text-bordo">{p.titulo}</h3>
                    <p className="mt-2 line-clamp-3 text-[0.92rem] leading-relaxed text-taupe-ink">{p.descricao}</p>
                    <Preco p={p} />
                    <Validade p={p} />
                    <div className="mt-auto pt-4">
                      <LinkTexto href={linkWhatsapp(msgDe(p), info.whatsapp)} externo>
                        Saber mais no WhatsApp
                      </LinkTexto>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
