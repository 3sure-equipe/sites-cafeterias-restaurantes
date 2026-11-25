"use client";

import { CalendarDays } from "lucide-react";
import { formatarPreco } from "@/data/cardapio";
import { linkWhatsapp } from "@/data/site";
import { statusPublicacao, useDados, useHoje } from "@/lib/dados/store";
import type { Publicacao } from "@/lib/dados/tipos";
import { LinkTexto } from "@/components/ui/Botao";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { FotoProduto } from "@/components/ui/FotoProduto";
import { AvisoDemo } from "@/components/ui/Pendente";
import { Ornamento } from "@/components/ui/Icones";

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
      <div className="mt-10 grid gap-5 lg:grid-cols-12">
        <article className="group grid overflow-hidden rounded-[2rem] bg-creme ring-1 ring-bordo/10 sm:grid-cols-2 lg:col-span-7">
          <Imagem p={destaque} grande />
          <Conteudo p={destaque} whatsapp={info.whatsapp} />
        </article>
        <div className="grid content-start gap-5 lg:col-span-5">
          {demais.map((p) => (
            <article
              key={p.id}
              className="group grid grid-cols-[7.5rem_1fr] overflow-hidden rounded-[2rem] bg-creme ring-1 ring-bordo/10 sm:grid-cols-[10rem_1fr]"
            >
              <Imagem p={p} />
              <Conteudo p={p} whatsapp={info.whatsapp} compacto />
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

function Imagem({ p, grande }: { p: Publicacao; grande?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${grande ? "aspect-[4/3] sm:aspect-auto sm:min-h-[24rem]" : "min-h-full"}`}>
      {p.foto ? (
        <div className="absolute inset-0 transition-transform duration-700 ease-suave group-hover:scale-105">
          <FotoProduto foto={p.foto} alt={p.titulo} icone="presente" sizes={grande ? "(min-width: 1024px) 30vw, 100vw" : "10rem"} />
        </div>
      ) : (
        <div className="relative size-full bg-bordo" aria-hidden="true">
          <div className="toldo absolute inset-x-0 top-0" />
          <div className="absolute inset-0 grid place-items-center pt-6">
            <Ornamento className="h-2.5 w-12 text-rosa-claro" />
          </div>
        </div>
      )}
      {p.precoPromocional !== null && (
        <span className="absolute right-3 top-3 rounded-full bg-bordo px-3 py-1 font-display text-lg font-semibold text-creme shadow-lg">
          {formatarPreco(p.precoPromocional)}
        </span>
      )}
    </div>
  );
}

function Conteudo({ p, whatsapp, compacto }: { p: Publicacao; whatsapp: string; compacto?: boolean }) {
  const validade = textoValidade(p);
  const msg = `Olá! Vi no site da Chonoko: “${p.titulo}”. Gostaria de saber mais.`;
  return (
    <div className={`flex flex-col ${compacto ? "p-5 sm:p-6" : "p-7 sm:p-9"}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-bordo px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-creme">
          {rotuloTipo[p.tipo]}
        </span>
        {p.demo && (
          <span className="rounded-full border border-dashed border-rosa/60 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-rosa-ink">
            Exemplo
          </span>
        )}
      </div>
      <h3 className={`mt-4 text-bordo ${compacto ? "titulo-bloco" : "text-[1.9rem] leading-[1.1] sm:text-[2.4rem]"}`}>{p.titulo}</h3>
      <p className={`mt-2.5 text-taupe-ink ${compacto ? "line-clamp-3 text-[0.92rem] leading-relaxed" : "leading-relaxed"}`}>{p.descricao}</p>
      {(p.precoOriginal !== null || p.precoPromocional !== null) && (
        <p className="mt-3 flex items-baseline gap-2">
          {p.precoOriginal !== null && p.precoPromocional !== null && (
            <span className="text-taupe-ink line-through">
              <span className="sr-only">De </span>
              {formatarPreco(p.precoOriginal)}
            </span>
          )}
          <span className="font-display text-2xl font-semibold text-bordo">
            <span className="sr-only">Por </span>
            {formatarPreco(p.precoPromocional ?? p.precoOriginal)}
          </span>
        </p>
      )}
      {validade && (
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-taupe-ink">
          <CalendarDays className="size-4 text-rosa-ink" aria-hidden="true" />
          {validade}
        </p>
      )}
      {p.condicoes && !compacto && <p className="mt-2 text-[0.85rem] italic text-taupe-ink">{p.condicoes}</p>}
      <div className={`mt-auto ${compacto ? "pt-4" : "pt-7"}`}>
        {compacto ? (
          <LinkTexto href={linkWhatsapp(msg, whatsapp)} externo>
            Saber mais no WhatsApp
          </LinkTexto>
        ) : (
          <BotaoWhatsapp href={linkWhatsapp(msg, whatsapp)}>Saber mais</BotaoWhatsapp>
        )}
      </div>
    </div>
  );
}
