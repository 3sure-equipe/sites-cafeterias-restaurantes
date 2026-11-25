import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { novidades } from "@/data/conteudo";
import { Botao } from "@/components/ui/Botao";
import { AvisoDemo } from "@/components/ui/Pendente";
import { Reveal } from "@/components/ui/Reveal";
import { Titulo } from "@/components/ui/Titulo";
import { Ornamento } from "@/components/ui/Icones";

export function Novidades() {
  const haDemo = novidades.some((n) => n.demo);
  const [destaque, ...demais] = novidades;
  return (
    <section id="novidades" aria-labelledby="titulo-novidades" className="bg-papel py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Titulo
              id="titulo-novidades"
              chamada="Novidades & promoções"
              titulo={
                <>
                  Sempre tem algo <em className="text-rosa">novo na vitrine.</em>
                </>
              }
              texto="Lançamentos, edições especiais e campanhas da Chonoko, reunidos em um só lugar."
            />
          </Reveal>
          {haDemo && (
            <Reveal atraso={120} className="lg:max-w-sm">
              <AvisoDemo>
                <strong className="font-semibold text-madeira">Conteúdo demonstrativo.</strong> Nenhuma promoção abaixo
                está vigente. Os cards mostram como as novidades oficiais serão apresentadas.
              </AvisoDemo>
            </Reveal>
          )}
        </div>

        {destaque && (
          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <article className="group grid h-full overflow-hidden rounded-[2rem] bg-creme ring-1 ring-bordo/10 sm:grid-cols-2">
                <ImagemNovidade foto={destaque.foto} titulo={destaque.titulo} grande />
                <Conteudo n={destaque} />
              </article>
            </Reveal>
            <div className="grid gap-5 lg:col-span-5">
              {demais.map((n, i) => (
                <Reveal key={n.id} atraso={(i + 1) * 100}>
                  <article className="group grid h-full grid-cols-[7rem_1fr] overflow-hidden rounded-[2rem] bg-creme ring-1 ring-bordo/10 sm:grid-cols-[10rem_1fr]">
                    <ImagemNovidade foto={n.foto} titulo={n.titulo} />
                    <Conteudo n={n} compacto />
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

type N = (typeof novidades)[number];

function ImagemNovidade({ foto, titulo, grande }: { foto: N["foto"]; titulo: string; grande?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${grande ? "aspect-[4/3] sm:aspect-auto sm:min-h-[22rem]" : "min-h-full"}`}>
      {foto ? (
        <Image src={foto} alt={titulo} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      ) : (
        <div className="relative size-full bg-bordo" role="img" aria-label="Espaço reservado para a imagem da novidade">
          <div className="toldo absolute inset-x-0 top-0" />
          <div className="absolute inset-0 grid place-items-center pt-6 text-creme/90">
            <div className="text-center transition-transform duration-700 ease-suave group-hover:-translate-y-1">
              <Ornamento className="mx-auto h-2.5 w-12 text-rosa-claro" />
              {grande && <p className="mt-3 font-display text-3xl italic">Imagem em breve</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Conteudo({ n, compacto }: { n: N; compacto?: boolean }) {
  return (
    <div className={`flex flex-col ${compacto ? "p-5 sm:p-6" : "p-7 sm:p-9"}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-bordo px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-creme">
          {n.rotulo}
        </span>
        {n.demo && (
          <span className="rounded-full border border-dashed border-rosa/60 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rosa-ink">
            Exemplo
          </span>
        )}
      </div>
      <h3 className={`mt-4 text-bordo ${compacto ? "text-2xl" : "text-3xl sm:text-4xl"}`}>{n.titulo}</h3>
      <p className={`mt-3 text-taupe-ink ${compacto ? "text-[0.95rem]" : ""}`}>{n.descricao}</p>
      {n.validade && (
        <p className="mt-4 flex items-center gap-2 text-sm font-medium text-taupe-ink">
          <CalendarDays className="size-4 text-rosa-ink" aria-hidden="true" />
          {n.validade}
        </p>
      )}
      <div className={`mt-auto ${compacto ? "pt-4" : "pt-7"}`}>
        {compacto ? (
          <a
            href={n.acao.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-sublinhado text-[0.92rem] font-semibold text-bordo"
          >
            {n.acao.rotulo} →<span className="sr-only"> (abre em nova aba)</span>
          </a>
        ) : (
          <Botao href={n.acao.href} externo variante="secundario">
            {n.acao.rotulo}
          </Botao>
        )}
      </div>
    </div>
  );
}
