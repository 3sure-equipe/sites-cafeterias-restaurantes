import { Quote, Star } from "lucide-react";
import { avaliacoes } from "@/data/conteudo";
import { site } from "@/data/site";
import { Botao } from "@/components/ui/Botao";
import { IconeInstagram } from "@/components/ui/Icones";
import { AvisoDemo } from "@/components/ui/Pendente";
import { Reveal } from "@/components/ui/Reveal";
import { Titulo } from "@/components/ui/Titulo";

const iniciais = (nome: string) =>
  nome
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

export function Avaliacoes() {
  const haDemo = avaliacoes.some((a) => a.demo);
  return (
    <section
      id="avaliacoes"
      aria-labelledby="titulo-avaliacoes"
      className="secao grao relative overflow-hidden bg-creme"
      style={{ "--festone-cor": "var(--color-creme)" } as React.CSSProperties}
    >
      <div className="festone absolute inset-x-0 -top-4" aria-hidden="true" />
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Titulo
              id="titulo-avaliacoes"
              chamada="Avaliações"
              titulo={
                <>
                  O que dizem <em className="text-rosa">nossos clientes.</em>
                </>
              }
            />
          </Reveal>
          {haDemo && (
            <Reveal atraso={100} className="lg:max-w-md">
              <AvisoDemo>
                <strong className="font-semibold text-madeira">Depoimentos ilustrativos.</strong> Nomes e textos são fictícios,
                criados só para mostrar o visual da seção. Não são avaliações do Google nem de clientes reais e serão substituídos
                por avaliações reais e autorizadas.
              </AvisoDemo>
            </Reveal>
          )}
        </div>

        {/* Faixa horizontal no celular, grade no computador */}
        <ul className="sem-barra -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0">
          {avaliacoes.map((a, i) => (
            <li key={a.id} className="w-[82%] shrink-0 snap-center sm:w-[46%] lg:w-auto">
              <Reveal atraso={i * 90} className="h-full">
                <figure className="group relative flex h-full flex-col rounded-[1.75rem] bg-papel p-7 ring-1 ring-bordo/10 transition-all duration-500 ease-suave hover:-translate-y-1 hover:shadow-[0_30px_50px_-34px_rgb(43_26_23/0.6)]">
                  <Quote className="absolute right-6 top-6 size-8 text-blush transition-colors group-hover:text-rosa/40" aria-hidden="true" />
                  <div className="flex gap-0.5 text-rosa" role="img" aria-label={`Nota ${a.nota} de 5`}>
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star key={s} className="size-4" fill={s < a.nota ? "currentColor" : "none"} strokeWidth={1.5} aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 font-display text-[1.35rem] italic leading-snug text-bordo">“{a.texto}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-bordo/10 pt-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blush font-display text-lg font-semibold text-bordo" aria-hidden="true">
                      {iniciais(a.autor)}
                    </span>
                    <span className="text-sm leading-tight">
                      <strong className="block font-semibold text-madeira">{a.autor}</strong>
                      <span className="text-taupe-ink">{a.contexto}</span>
                    </span>
                    {a.demo && (
                      <span className="ml-auto rounded-full border border-dashed border-rosa/60 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-rosa-ink">
                        Ilustrativo
                      </span>
                    )}
                  </figcaption>
                </figure>
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
            {site.avaliacoesUrl ? "Ver avaliações" : "Siga a Chonoko no Instagram"}
          </Botao>
        </div>
      </div>
    </section>
  );
}
