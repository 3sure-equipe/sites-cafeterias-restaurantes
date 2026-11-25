import { Quote, Star } from "lucide-react";
import { avaliacoes } from "@/data/conteudo";
import { site } from "@/data/site";
import { Botao } from "@/components/ui/Botao";
import { IconeInstagram } from "@/components/ui/Icones";
import { Reveal } from "@/components/ui/Reveal";
import { Titulo } from "@/components/ui/Titulo";

export function Avaliacoes() {
  const vazio = avaliacoes.length === 0;
  return (
    <section
      id="avaliacoes"
      aria-labelledby="titulo-avaliacoes"
      className="grao relative bg-creme py-24 lg:py-32"
      style={{ "--festone-cor": "var(--color-creme)" } as React.CSSProperties}
    >
      <div className="festone absolute inset-x-0 -top-4" aria-hidden="true" />
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <Titulo
            id="titulo-avaliacoes"
            centro
            chamada="Avaliações"
            titulo={
              <>
                O que dizem <em className="text-rosa">nossos clientes.</em>
              </>
            }
          />
        </Reveal>

        {vazio ? (
          <>
            <Reveal atraso={100}>
              <div className="mx-auto mt-12 max-w-2xl text-center">
                <Quote className="mx-auto size-10 text-rosa" strokeWidth={1.2} aria-hidden="true" />
                <p className="mt-5 font-display text-2xl italic leading-snug text-bordo sm:text-3xl">
                  Este espaço vai reunir depoimentos reais de quem visita a Chonoko.
                </p>
                <p className="mt-4 text-taupe-ink">
                  As avaliações serão publicadas somente com autorização dos clientes ou trazidas de uma plataforma
                  pública, como o Google, com a origem identificada. Nenhuma avaliação foi inventada para este protótipo.
                </p>
              </div>
            </Reveal>

            {/* Estrutura dos cards, sem conteúdo fictício */}
            <ul className="mt-14 grid gap-5 md:grid-cols-3" aria-label="Modelo de cards de avaliação (vazios)">
              {[0, 1, 2].map((i) => (
                <li key={i}>
                  <Reveal atraso={i * 100}>
                    <div
                      aria-hidden="true"
                      className="rounded-[1.75rem] border border-dashed border-bordo/20 bg-papel/60 p-7"
                    >
                      <div className="flex gap-1 text-rosa/40">
                        {[0, 1, 2, 3, 4].map((s) => (
                          <Star key={s} className="size-4" strokeWidth={1.5} />
                        ))}
                      </div>
                      <div className="mt-5 space-y-2.5">
                        <div className="h-2.5 w-full rounded-full bg-bordo/[0.07]" />
                        <div className="h-2.5 w-11/12 rounded-full bg-bordo/[0.07]" />
                        <div className="h-2.5 w-3/5 rounded-full bg-bordo/[0.07]" />
                      </div>
                      <div className="mt-7 flex items-center gap-3">
                        <div className="size-10 rounded-full bg-blush" />
                        <div className="space-y-1.5">
                          <div className="h-2.5 w-24 rounded-full bg-bordo/10" />
                          <div className="h-2 w-16 rounded-full bg-bordo/[0.07]" />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex justify-center">
              <Botao
                href={site.avaliacoesUrl ?? site.instagram.url}
                externo
                variante="secundario"
                icone={site.avaliacoesUrl ? undefined : <IconeInstagram className="size-5" />}
              >
                {site.avaliacoesUrl ? "Ver avaliações" : "Acompanhe a Chonoko no Instagram"}
              </Botao>
            </div>
          </>
        ) : (
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {avaliacoes.map((a, i) => (
              <li key={a.id}>
                <Reveal atraso={i * 100} className="h-full">
                  <figure className="flex h-full flex-col rounded-[1.75rem] bg-papel p-7 ring-1 ring-bordo/10">
                    {a.nota && (
                      <div className="flex gap-1 text-rosa" aria-label={`Nota ${a.nota} de 5`}>
                        {Array.from({ length: 5 }, (_, s) => (
                          <Star key={s} className="size-4" fill={s < a.nota! ? "currentColor" : "none"} aria-hidden="true" />
                        ))}
                      </div>
                    )}
                    <blockquote className="mt-4 flex-1 font-display text-xl italic text-bordo">“{a.texto}”</blockquote>
                    <figcaption className="mt-6 text-sm text-taupe-ink">
                      <strong className="text-madeira">{a.autor}</strong> · {a.fonte}
                      {a.data && ` · ${a.data}`}
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
