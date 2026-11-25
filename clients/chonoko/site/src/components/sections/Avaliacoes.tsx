import { Star } from "lucide-react";
import { avaliacoes } from "@/data/conteudo";
import { infoInicial, mapsBuscaUrl, site } from "@/data/site";
import { Botao } from "@/components/ui/Botao";
import { IconeInstagram, Ornamento } from "@/components/ui/Icones";
import { Reveal } from "@/components/ui/Reveal";
import { Titulo } from "@/components/ui/Titulo";

const iniciais = (nome: string) =>
  nome
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

/**
 * Avaliações: só depoimentos reais e autorizados.
 * Sem nenhum cadastrado, a seção convida a avaliar no Google — sem simular opiniões.
 */
export function Avaliacoes() {
  const linkAvaliar = site.avaliacoesUrl ?? mapsBuscaUrl(infoInicial);
  return (
    <section
      id="avaliacoes"
      aria-labelledby="titulo-avaliacoes"
      className="secao grao relative overflow-hidden bg-creme"
      style={{ "--festone-cor": "var(--color-creme)" } as React.CSSProperties}
    >
      <div className="festone absolute inset-x-0 -top-4" aria-hidden="true" />
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {avaliacoes.length === 0 ? (
          <div className="relative mx-auto max-w-3xl text-center">
            {/* Aspas tipográficas gigantes, puramente decorativas */}
            <span aria-hidden="true" className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-display text-[14rem] leading-none text-blush sm:-top-20 sm:text-[18rem]">
              “
            </span>
            <Reveal className="relative">
              <Titulo
                id="titulo-avaliacoes"
                centro
                chamada="Avaliações"
                titulo={
                  <>
                    Conte como foi o <em className="text-rosa">seu momento.</em>
                  </>
                }
                texto="Em breve, este espaço vai reunir depoimentos reais de quem visita a Chonoko, publicados com autorização. Já passou por aqui? Sua avaliação ajuda outras pessoas a nos conhecerem."
              />
            </Reveal>
            <Reveal atraso={120} className="relative">
              <div className="mt-8 flex justify-center gap-1.5 text-rosa" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-5" strokeWidth={1.4} />
                ))}
              </div>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Botao href={linkAvaliar} externo>
                  Avaliar no Google
                </Botao>
                <Botao href={site.instagram.url} externo variante="secundario" icone={<IconeInstagram className="size-5" />}>
                  Seguir no Instagram
                </Botao>
              </div>
              <p className="mt-6 flex items-center justify-center gap-3 text-[0.8rem] text-taupe-ink">
                <Ornamento className="h-2 w-8 text-rosa/60" />
                Nenhuma avaliação é exibida sem a autorização de quem a escreveu.
                <Ornamento className="h-2 w-8 text-rosa/60" />
              </p>
            </Reveal>
          </div>
        ) : (
          <>
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
            <ul className="sem-barra -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0">
              {avaliacoes.map((a, i) => (
                <li key={a.id} className="w-[84%] shrink-0 snap-center sm:w-[48%] lg:w-auto">
                  <Reveal atraso={i * 90} className="h-full">
                    <figure className="flex h-full flex-col rounded-[1.75rem] bg-papel p-8 ring-1 ring-bordo/10">
                      <div className="flex gap-0.5 text-rosa" role="img" aria-label={`Nota ${a.nota} de 5`}>
                        {Array.from({ length: 5 }, (_, s) => (
                          <Star key={s} className="size-4" fill={s < a.nota ? "currentColor" : "none"} strokeWidth={1.5} aria-hidden="true" />
                        ))}
                      </div>
                      <blockquote className="mt-5 flex-1 font-display text-[1.4rem] italic leading-snug text-bordo">“{a.texto}”</blockquote>
                      <figcaption className="mt-6 flex items-center gap-3 border-t border-bordo/10 pt-5">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blush font-display text-lg font-semibold text-bordo" aria-hidden="true">
                          {iniciais(a.autor)}
                        </span>
                        <span className="text-sm leading-tight">
                          <strong className="block font-semibold text-madeira">{a.autor}</strong>
                          <span className="text-taupe-ink">{a.contexto}</span>
                        </span>
                      </figcaption>
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
