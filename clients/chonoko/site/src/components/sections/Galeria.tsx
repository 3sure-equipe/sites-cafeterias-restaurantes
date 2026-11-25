import { galeria } from "@/data/conteudo";
import { Reveal } from "@/components/ui/Reveal";
import { Titulo } from "@/components/ui/Titulo";
import { GaleriaGrade } from "./GaleriaGrade";

export function Galeria() {
  return (
    <section id="galeria" aria-labelledby="titulo-galeria" className="secao bg-papel">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Titulo
              id="titulo-galeria"
              chamada="Galeria"
              titulo={
                <>
                  Um olhar pela <em className="text-rosa">Chonoko.</em>
                </>
              }
            />
          </Reveal>
          <Reveal atraso={100} className="max-w-sm">
            <p className="text-taupe-ink">
              O salão, a esquina e alguns dos produtos feitos na casa. Toque nas fotos para ampliar.
            </p>
          </Reveal>
        </div>
        <GaleriaGrade itens={galeria} />
      </div>
    </section>
  );
}
