import { Reveal } from "@/components/ui/Reveal";
import { Titulo } from "@/components/ui/Titulo";
import { CardapioInterativo } from "./CardapioInterativo";

export function Cardapio() {
  return (
    <section
      id="cardapio"
      aria-labelledby="titulo-cardapio"
      className="secao grao relative bg-creme"
      style={{ "--festone-cor": "var(--color-creme)" } as React.CSSProperties}
    >
      <div className="festone absolute inset-x-0 -top-4" aria-hidden="true" />
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <Titulo
            id="titulo-cardapio"
            chamada="Cardápio"
            titulo={
              <>
                Feito à mão, <em className="text-rosa">escolhido com carinho.</em>
              </>
            }
            texto="Chocolates, biscoitos e tortas para levar hoje, e doces finos por encomenda para deixar a sua festa mais doce."
          />
        </Reveal>
        <CardapioInterativo />
      </div>
    </section>
  );
}
