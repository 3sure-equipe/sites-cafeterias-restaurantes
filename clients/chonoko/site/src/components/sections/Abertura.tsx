import Image from "next/image";
import { fotos } from "@/data/conteudo";
import { site } from "@/data/site";
import { Botao } from "@/components/ui/Botao";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Selo } from "@/components/ui/Selo";

export function Abertura() {
  return (
    <section id="inicio" aria-labelledby="titulo-inicio" className="grao relative overflow-hidden bg-creme">
      {/* Arco decorativo de fundo, inspirado nas janelas e na moldura do salão */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 hidden h-[44rem] w-[44rem] rounded-full border border-rosa/20 lg:block"
      />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-20 pt-6 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-28 lg:pt-10">
        {/* Texto */}
        <div className="lg:col-span-6 xl:col-span-6">
          <div className="motion-safe:animate-[entrar_0.9s_var(--ease-suave)_both]">
            <Eyebrow>Cafeteria & chocolates artesanais · {site.cidade}</Eyebrow>
          </div>
          <h1
            id="titulo-inicio"
            className="mt-6 text-[3.1rem] leading-[0.98] text-bordo motion-safe:animate-[entrar_1s_var(--ease-suave)_120ms_both] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]"
          >
            {site.slogan.inicio}{" "}
            <em className="block font-medium text-rosa">{site.slogan.destaque}</em>
          </h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-taupe-ink motion-safe:animate-[entrar_1s_var(--ease-suave)_240ms_both] sm:text-xl">
            Chocolates e biscoitos artesanais feitos com ingredientes selecionados e receitas únicas. Puxe uma cadeira,
            escolha o seu preferido e fique à vontade.
          </p>
          <div className="mt-9 flex flex-col gap-3 motion-safe:animate-[entrar_1s_var(--ease-suave)_360ms_both] sm:flex-row">
            <Botao href="#cardapio">Conhecer o cardápio</Botao>
            <Botao href="#experiencia" variante="secundario">
              Conhecer a cafeteria
            </Botao>
          </div>
        </div>

        {/* Composição de fotos */}
        <div className="relative lg:col-span-6 xl:col-span-6">
          <div className="relative mx-auto max-w-[34rem] motion-safe:animate-[entrar_1.2s_var(--ease-suave)_200ms_both] lg:ml-auto lg:mr-0">
            {/* Foto principal em arco */}
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-[0_40px_80px_-40px_rgb(43_26_23/0.6)] ring-1 ring-bordo/10">
                <Image
                  src={fotos.ambiente.src}
                  alt={fotos.ambiente.alt}
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1024px) 34rem, 92vw"
                  className="object-cover object-[62%_50%] transition-transform duration-[2s] ease-suave hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-madeira-escura/35 via-transparent to-transparent"
                />
              </div>
              <figcaption className="absolute bottom-5 right-5 rounded-full bg-papel/90 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-bordo backdrop-blur">
                Nosso salão
              </figcaption>
            </figure>

            {/* Fachada em moldura menor, sobreposta */}
            <div className="absolute -left-3 top-[14%] w-[34%] rotate-[-4deg] rounded-[1.25rem] bg-papel p-1.5 shadow-[0_24px_50px_-24px_rgb(43_26_23/0.6)] transition-transform duration-500 ease-suave hover:rotate-0 sm:-left-10">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1rem]">
                <Image
                  src={fotos.fachada.src}
                  alt="Detalhe da fachada da Chonoko com o toldo listrado."
                  fill
                  sizes="(min-width: 1024px) 12rem, 34vw"
                  className="object-cover object-[32%_58%]"
                />
              </div>
            </div>

            {/* Selo girando */}
            <Selo className="absolute -bottom-10 -left-2 w-28 sm:-bottom-12 sm:-left-12 sm:w-40" />
          </div>
        </div>
      </div>

    </section>
  );
}
