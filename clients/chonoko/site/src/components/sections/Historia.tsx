import { site } from "@/data/site";
import { Pendente } from "@/components/ui/Pendente";
import { Reveal } from "@/components/ui/Reveal";
import { Selo } from "@/components/ui/Selo";
import { Titulo } from "@/components/ui/Titulo";

/** Valores tirados do próprio selo da marca — não são alegações novas. */
const pilares = [
  { titulo: "Qualidade", texto: "A primeira palavra do nosso selo e o cuidado que guia cada escolha." },
  { titulo: "Sabor", texto: "O que faz a gente voltar: aquele gosto que vira lembrança." },
  { titulo: "Receitas únicas", texto: "Ingredientes selecionados e receitas próprias em toda a linha de produtos." },
];

/** Marcos da trajetória. Só o ano vem do cardápio; os detalhes serão preenchidos com a Chonoko. */
const marcos = [
  { titulo: `${site.fundacao.ano}`, texto: `Fundação em ${site.cidade}`, pendente: !site.fundacao.confirmado },
  { titulo: "Chocolates e biscoitos", texto: "Linha artesanal de bombons, trufas, barras e biscoitos", pendente: false },
  { titulo: "Hoje", texto: "Loja, doces finos para festas e cestas para presentear", pendente: false },
];

export function Historia() {
  return (
    <section
      id="historia"
      aria-labelledby="titulo-historia"
      className="relative bg-bordo text-creme"
      style={{ "--festone-cor": "var(--color-bordo)" } as React.CSSProperties}
    >
      <div className="festone absolute inset-x-0 -top-4" aria-hidden="true" />

      <div className="secao relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="flex justify-center lg:col-span-5">
            <div className="relative w-52 sm:w-72 lg:w-[22rem]">
              <div aria-hidden="true" className="absolute inset-[-12%] rounded-full border border-dashed border-creme/15" />
              <Selo tom="escuro" frase={`${site.assinatura} ✦ ${site.selo} ✦ `} />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <Titulo
                id="titulo-historia"
                tom="escuro"
                chamada="Nossa história"
                titulo={
                  <>
                    Feito com cuidado, <em className="text-rosa-claro">servido com carinho.</em>
                  </>
                }
              />
            </Reveal>
            <Reveal atraso={120}>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-creme/85">
                <p>
                  A Chonoko é especializada na fabricação de <strong className="font-semibold text-creme">chocolates e biscoitos artesanais</strong>.
                  São bombons, trufas, barras, biscoitos doces e salgados feitos com ingredientes selecionados e receitas únicas.
                </p>
                <p>
                  Fundada em {site.cidade}, oferece{" "}
                  <span className="whitespace-nowrap">
                    desde {site.fundacao.ano}
                    {!site.fundacao.confirmado && (
                      <span className="ml-2 align-middle">
                        <Pendente tom="escuro">Ano a confirmar</Pendente>
                      </span>
                    )}
                  </span>{" "}
                  os melhores sabores em toda a linha de produtos.
                </p>
                <p className="text-[0.85rem] text-creme/55">Texto baseado na apresentação do cardápio oficial da loja.</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Pilares */}
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-creme/10 sm:grid-cols-3 lg:mt-20">
          {pilares.map((p, i) => (
            <li key={p.titulo} className="bg-bordo">
              <Reveal atraso={i * 100} className="group h-full p-6 transition-colors duration-500 hover:bg-bordo-escuro sm:p-8">
                <span className="font-display text-lg italic text-rosa-claro">✦</span>
                <h3 className="titulo-bloco mt-3 text-creme">{p.titulo}</h3>
                <p className="mt-2 text-creme/75">{p.texto}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Linha do tempo a preencher */}
        <div className="mt-12 lg:mt-16">
          <p className="rotulo text-rosa-claro">Nossa trajetória</p>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {marcos.map((m) => (
              <li key={m.titulo} className="relative border-t border-creme/20 pt-5">
                <span className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-rosa-claro" aria-hidden="true" />
                <p className="titulo-bloco font-display text-creme">{m.titulo}</p>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-creme/70">
                  {m.texto} {m.pendente && <Pendente tom="escuro">A confirmar</Pendente>}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
