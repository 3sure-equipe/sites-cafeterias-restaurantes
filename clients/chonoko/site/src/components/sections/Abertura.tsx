import Image from "next/image";
import { fotos } from "@/data/conteudo";
import { site } from "@/data/site";
import { Botao } from "@/components/ui/Botao";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Selo } from "@/components/ui/Selo";
import { InfoAbertura } from "./InfoAbertura";

/**
 * Abertura editorial.
 * Celular: foto em destaque no topo e o texto "sobe" sobre ela como uma folha de papel.
 * Computador: texto à esquerda, foto ocupando a metade direita de ponta a ponta.
 */
export function Abertura() {
  return (
    <section id="inicio" aria-labelledby="titulo-inicio" className="grao relative overflow-hidden bg-creme">
      <div className="grid lg:min-h-[min(calc(100svh-8rem),58rem)] lg:grid-cols-12">
        {/* ---------- Fotografia ---------- */}
        <div className="relative lg:order-2 lg:col-span-6 xl:col-span-6">
          <div className="relative h-[60svh] max-h-[34rem] min-h-[24rem] overflow-hidden rounded-b-[2.5rem] sm:max-h-[40rem] lg:absolute lg:inset-0 lg:h-auto lg:max-h-none lg:rounded-b-none lg:rounded-bl-[14rem]">
            <Image
              src={fotos.ambiente.src}
              alt={fotos.ambiente.alt}
              fill
              loading="eager"
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[64%_50%] motion-safe:animate-[aproximar_2.6s_var(--ease-suave)_both] lg:object-[58%_50%]"
            />
            {/* Véu suave para integrar a foto ao papel creme */}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-madeira-escura/30 via-transparent to-madeira-escura/10 lg:bg-gradient-to-r lg:from-madeira-escura/15 lg:via-transparent lg:to-transparent" />
            <p className="absolute bottom-14 right-5 hidden rounded-full bg-papel/90 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-bordo backdrop-blur sm:block lg:bottom-8 lg:right-8">
              Nosso salão
            </p>
          </div>

          {/* Fachada em moldura (computador) */}
          <div className="absolute bottom-14 left-[18%] z-10 hidden w-40 rotate-[-4deg] rounded-[1.25rem] bg-papel p-1.5 shadow-[0_24px_50px_-24px_rgb(43_26_23/0.65)] transition-transform duration-500 ease-suave hover:rotate-0 motion-safe:animate-[entrar_1.2s_var(--ease-suave)_600ms_both] lg:block xl:w-48">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1rem]">
              <Image
                src={fotos.fachada.src}
                alt="Detalhe da fachada da Chonoko, com o toldo listrado bordô e branco."
                fill
                sizes="13rem"
                className="object-cover object-[32%_60%]"
              />
            </div>
            <p className="px-2 pb-1 pt-2 text-center font-display text-[1.05rem] italic text-bordo">A esquina da Chonoko</p>
          </div>

          {/* Selo girando */}
          <Selo className="absolute -bottom-9 right-5 z-20 w-24 sm:w-28 lg:-left-14 lg:bottom-auto lg:right-auto lg:top-14 lg:w-36" />
        </div>

        {/* ---------- Texto ---------- */}
        <div className="relative z-10 -mt-10 flex flex-col justify-center rounded-t-[2.25rem] bg-creme px-5 pb-16 pt-10 sm:px-8 lg:order-1 lg:col-span-6 lg:mt-0 lg:rounded-none lg:bg-transparent lg:py-20 lg:pl-[max(3rem,calc((100vw-1320px)/2+3rem))] lg:pr-14 xl:pr-20">
          <div className="motion-safe:animate-[entrar_0.9s_var(--ease-suave)_both]">
            <Eyebrow>Chocolates & biscoitos artesanais</Eyebrow>
          </div>
          <h1
            id="titulo-inicio"
            className="mt-5 text-[3.2rem] leading-[0.96] text-bordo motion-safe:animate-[entrar_1s_var(--ease-suave)_120ms_both] sm:text-[4.4rem] lg:text-[4.5rem] xl:text-[5.4rem]"
          >
            {site.slogan.inicio}{" "}
            <em className="block whitespace-nowrap font-medium text-rosa">{site.slogan.destaque}</em>
          </h1>
          <span aria-hidden="true" className="mt-7 block h-px w-16 bg-rosa/60 motion-safe:animate-[entrar_1s_var(--ease-suave)_200ms_both]" />
          <p className="texto-destaque mt-6 max-w-md text-taupe-ink motion-safe:animate-[entrar_1s_var(--ease-suave)_240ms_both]">
            Bombons, trufas e biscoitos feitos com ingredientes selecionados e receitas únicas, em {site.cidade}. Puxe uma
            cadeira, escolha o seu preferido e fique à vontade.
          </p>
          <div className="mt-8 flex flex-col gap-3 motion-safe:animate-[entrar_1s_var(--ease-suave)_340ms_both] sm:flex-row">
            <Botao href="#cardapio">Conhecer o cardápio</Botao>
            <Botao href="#experiencia" variante="secundario">
              Conhecer a cafeteria
            </Botao>
          </div>
          <InfoAbertura />
        </div>
      </div>
    </section>
  );
}
