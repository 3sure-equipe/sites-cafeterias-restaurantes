import { site } from "@/data/site";

const palavras = ["Bombons", "Trufas", "Biscoitos artesanais", "Tortas", "Doces finos", "Cestas", site.assinatura, site.cidade];

/** Toldo listrado + faixa em movimento lento. Estática com movimento reduzido. */
export function Faixa() {
  const linha = [...palavras, ...palavras];
  return (
    <div aria-hidden="true" className="relative bg-bordo">
      <div className="toldo" />
      <div className="overflow-hidden pb-6 pt-3 text-creme">
        <div className="flex w-max motion-safe:animate-marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {linha.map((p, i) => (
                <span key={`${k}-${i}`} className="flex items-center">
                  <span className="px-6 font-display text-2xl italic sm:text-3xl">{p}</span>
                  <span className="text-rosa-claro">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
