import { Reveal } from "@/components/ui/Reveal";
import { Titulo } from "@/components/ui/Titulo";
import { NovidadesLista } from "./NovidadesLista";

export function Novidades() {
  return (
    <section id="novidades" aria-labelledby="titulo-novidades" className="bg-papel py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <Titulo
            id="titulo-novidades"
            chamada="Novidades & promoções"
            titulo={
              <>
                Sempre tem algo <em className="text-rosa">novo na vitrine.</em>
              </>
            }
            texto="Lançamentos, produtos da temporada e campanhas da Chonoko, atualizados pela própria equipe."
          />
        </Reveal>
        <NovidadesLista />
      </div>
    </section>
  );
}
