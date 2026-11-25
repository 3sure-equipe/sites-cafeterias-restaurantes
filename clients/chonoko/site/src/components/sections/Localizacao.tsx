import Image from "next/image";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import { fotos } from "@/data/conteudo";
import { mapsBuscaUrl, site, whatsappUrl } from "@/data/site";
import { Botao } from "@/components/ui/Botao";
import { IconeInstagram } from "@/components/ui/Icones";
import { Pendente } from "@/components/ui/Pendente";
import { Reveal } from "@/components/ui/Reveal";
import { Titulo } from "@/components/ui/Titulo";
import { Mapa } from "./Mapa";

export function Localizacao() {
  const wa = whatsappUrl();
  const horariosConfirmados = site.horarios.some((h) => h.horario);

  return (
    <section id="localizacao" aria-labelledby="titulo-localizacao" className="bg-papel py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Foto da fachada */}
          <Reveal className="lg:col-span-5">
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-[0_40px_80px_-45px_rgb(43_26_23/0.7)]">
                <Image
                  src={fotos.fachada.src}
                  alt={fotos.fachada.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  className="object-cover object-[40%_80%] transition-transform duration-[1.6s] ease-suave hover:scale-105"
                />
              </div>
              <figcaption className="mt-4 flex items-center gap-2 text-sm text-taupe-ink">
                <span className="h-px w-8 bg-rosa" aria-hidden="true" />
                Procure pelo toldo listrado na esquina.
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <Titulo
                id="titulo-localizacao"
                chamada="Localização & contato"
                titulo={
                  <>
                    Venha nos <em className="text-rosa">visitar.</em>
                  </>
                }
                texto={`Estamos em ${site.cidade}, ${site.estado}. Puxe uma cadeira: a mesa está esperando por você.`}
              />
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {/* Endereço */}
              <Reveal className="rounded-[1.75rem] bg-creme p-6 ring-1 ring-bordo/10">
                <h3 className="flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-rosa-ink">
                  <MapPin className="size-4" aria-hidden="true" /> Endereço
                </h3>
                <address className="mt-4 not-italic">
                  {site.endereco ? (
                    <p className="text-lg text-madeira">{site.endereco}</p>
                  ) : (
                    <p className="flex flex-wrap items-center gap-2 text-lg text-madeira">
                      Rua e número <Pendente />
                    </p>
                  )}
                  <p className="mt-1 text-taupe-ink">
                    {site.cidade} – {site.estado}
                    {site.cep && ` · CEP ${site.cep}`}
                  </p>
                </address>
                <a
                  href={mapsBuscaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sublinhado mt-5 inline-block text-[0.92rem] font-semibold text-bordo"
                >
                  {site.endereco ? "Traçar rota no Google Maps →" : "Buscar no Google Maps →"}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </Reveal>

              {/* Horários */}
              <Reveal atraso={100} className="rounded-[1.75rem] bg-creme p-6 ring-1 ring-bordo/10">
                <h3 className="flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-rosa-ink">
                  <Clock className="size-4" aria-hidden="true" /> Horários
                </h3>
                {horariosConfirmados ? (
                  <dl className="mt-4 space-y-1.5 text-[0.95rem]">
                    {site.horarios.map((h) => (
                      <div key={h.dia} className="flex justify-between gap-4 border-b border-dotted border-bordo/15 pb-1.5">
                        <dt className="text-taupe-ink">{h.dia}</dt>
                        <dd className="font-semibold text-madeira">{h.horario ?? "Fechado"}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <>
                    <dl className="mt-4 space-y-1.5 text-[0.95rem]">
                      {[
                        ["Segunda a sexta", "—"],
                        ["Sábado", "—"],
                        ["Domingo", "—"],
                      ].map(([d, h]) => (
                        <div key={d} className="flex justify-between gap-4 border-b border-dotted border-bordo/15 pb-1.5">
                          <dt className="text-taupe-ink">{d}</dt>
                          <dd className="font-semibold text-taupe-ink">
                            {h}
                            <span className="sr-only">a confirmar</span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-4">
                      <Pendente>Horários a confirmar</Pendente>
                    </div>
                  </>
                )}
              </Reveal>
            </div>

            {/* Contatos */}
            <Reveal atraso={150} className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Botao href={site.instagram.url} externo icone={<IconeInstagram className="size-5" />}>
                {site.instagram.usuario}
              </Botao>
              {wa ? (
                <Botao href={wa} externo variante="secundario" icone={<MessageCircle className="size-5" aria-hidden="true" />}>
                  Falar no WhatsApp
                </Botao>
              ) : (
                <span
                  className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2.5 rounded-full border border-dashed border-bordo/25 px-6 text-[0.95rem] font-semibold text-taupe-ink"
                  aria-disabled="true"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  WhatsApp em breve
                  <span className="text-xs font-medium">(número a confirmar)</span>
                </span>
              )}
            </Reveal>

            <Reveal atraso={200} className="mt-10">
              <Mapa />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
