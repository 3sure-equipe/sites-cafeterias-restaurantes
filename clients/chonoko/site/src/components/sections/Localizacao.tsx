import Image from "next/image";
import { fotos } from "@/data/conteudo";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Titulo } from "@/components/ui/Titulo";
import { LocalizacaoInfo } from "./LocalizacaoInfo";

export function Localizacao() {
  return (
    <section id="localizacao" aria-labelledby="titulo-localizacao" className="secao bg-papel">
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

            <LocalizacaoInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
