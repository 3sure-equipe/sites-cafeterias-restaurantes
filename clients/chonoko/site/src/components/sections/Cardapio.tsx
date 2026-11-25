import { cardapioEhDemonstrativo, categorias, itens } from "@/data/cardapio";
import { AvisoDemo } from "@/components/ui/Pendente";
import { Reveal } from "@/components/ui/Reveal";
import { Titulo } from "@/components/ui/Titulo";
import { CardapioAbas } from "./CardapioAbas";

export function Cardapio() {
  return (
    <section
      id="cardapio"
      aria-labelledby="titulo-cardapio"
      className="grao relative bg-creme pb-24 pt-24 lg:pb-32 lg:pt-32"
      style={{ "--festone-cor": "var(--color-creme)" } as React.CSSProperties}
    >
      <div className="festone absolute inset-x-0 -top-4" aria-hidden="true" />
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Titulo
              id="titulo-cardapio"
              chamada="Cardápio"
              titulo={
                <>
                  Para cada momento, <em className="text-rosa">um sabor.</em>
                </>
              }
              texto="Escolha uma categoria e descubra o que a Chonoko prepara para a sua pausa."
            />
          </Reveal>
          {cardapioEhDemonstrativo && (
            <Reveal atraso={120} className="lg:max-w-sm">
              <AvisoDemo>
                <strong className="font-semibold text-madeira">Cardápio demonstrativo.</strong> Os itens ilustram o
                layout. Nomes, descrições, fotos e preços oficiais entram assim que a Chonoko enviar o cardápio.
              </AvisoDemo>
            </Reveal>
          )}
        </div>

        <CardapioAbas categorias={categorias} itens={itens} />
      </div>
    </section>
  );
}
