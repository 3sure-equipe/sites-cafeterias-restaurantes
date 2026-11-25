import Image from "next/image";
import { fotos } from "@/data/conteudo";
import { Reveal } from "@/components/ui/Reveal";
import { Titulo } from "@/components/ui/Titulo";

const momentos = [
  {
    titulo: "O ambiente",
    texto: "Parede rosa, madeira escura e luz quente. Um cantinho pensado para desacelerar.",
  },
  {
    titulo: "A pausa para o café",
    texto: "Uma xícara servida com calma, para conversar ou simplesmente ficar consigo mesmo.",
  },
  {
    titulo: "Chocolates artesanais",
    texto: "O coração da casa, como diz o nosso selo: qualidade e sabor em cada pedaço.",
  },
  {
    titulo: "Momentos compartilhados",
    texto: "Encontros, conversas e celebrações que ficam mais doces quando dividimos a mesa.",
  },
];

export function Experiencia() {
  return (
    <section id="experiencia" aria-labelledby="titulo-experiencia" className="relative overflow-hidden bg-papel py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1320px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        {/* Composição fotográfica */}
        <Reveal className="relative lg:col-span-6">
          <div className="relative mr-10 sm:mr-24 lg:mr-16">
            {/* Bloco rosa deslocado, como uma parede atrás da foto */}
            <div aria-hidden="true" className="absolute -bottom-6 -left-6 top-10 right-10 rounded-[2.5rem] bg-blush sm:-left-10" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] rounded-tr-[8rem] shadow-[0_40px_70px_-45px_rgb(43_26_23/0.7)]">
              <Image
                src={fotos.ambiente.src}
                alt="Luminárias pendentes de luz quente e prateleiras de madeira com xícaras e produtos da Chonoko."
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 34rem, 85vw"
                className="object-cover object-[8%_45%] transition-transform duration-[1.6s] ease-suave hover:scale-105"
              />
            </div>
          </div>
          {/* Detalhe em círculo: mesa e flores */}
          <div className="absolute -bottom-10 right-0 w-[46%] max-w-[15rem] rounded-full bg-papel p-2 shadow-[0_30px_60px_-30px_rgb(43_26_23/0.7)] sm:right-6 lg:-right-4">
            <div className="relative aspect-square overflow-hidden rounded-full">
              <Image
                src={fotos.ambiente.src}
                alt="Mesa redonda de madeira com vaso de flores, ao lado da geladeira de tortas."
                fill
                sizes="15rem"
                className="origin-[74%_82%] scale-[2.1] object-cover object-[74%_82%]"
              />
            </div>
          </div>
        </Reveal>

        {/* Texto */}
        <div className="lg:col-span-6 lg:pl-8 xl:pl-14">
          <Reveal>
            <Titulo
              id="titulo-experiencia"
              chamada="A experiência"
              titulo={
                <>
                  Um convite para <em className="text-rosa">desacelerar.</em>
                </>
              }
              texto="Entrar na Chonoko é trocar a pressa por um momento seu. Um café bem servido, um chocolate escolhido com carinho e uma mesa para ficar."
            />
          </Reveal>

          <ol className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {momentos.map((m, i) => (
              <li key={m.titulo}>
                <Reveal atraso={i * 90} className="group">
                  <span className="font-display text-[2.6rem] italic leading-none text-rosa/70 transition-colors duration-500 group-hover:text-rosa">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-3 block h-px w-12 bg-bordo/25 transition-all duration-500 ease-suave group-hover:w-20 group-hover:bg-bordo" />
                  <h3 className="mt-4 text-[1.65rem] text-bordo">{m.titulo}</h3>
                  <p className="mt-2 text-taupe-ink">{m.texto}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
