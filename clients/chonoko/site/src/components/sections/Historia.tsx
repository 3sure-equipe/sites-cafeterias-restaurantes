import { site } from "@/data/site";
import { Pendente } from "@/components/ui/Pendente";
import { Reveal } from "@/components/ui/Reveal";
import { Selo } from "@/components/ui/Selo";
import { Titulo } from "@/components/ui/Titulo";

/** Valores tirados do próprio selo da marca — não são alegações novas. */
const pilares = [
  { titulo: "Qualidade", texto: "A primeira palavra do nosso selo e o cuidado que guia cada escolha." },
  { titulo: "Sabor", texto: "O que faz a gente voltar: aquele gosto que vira lembrança." },
  { titulo: "Feito à mão", texto: "Chocolates artesanais, como está escrito no nosso selo." },
];

/** Marcos da trajetória — a preencher com a Chonoko. */
const marcos = ["O começo", "A loja de esquina", "Hoje"];

export function Historia() {
  return (
    <section
      id="historia"
      aria-labelledby="titulo-historia"
      className="relative bg-bordo text-creme"
      style={{ "--festone-cor": "var(--color-bordo)" } as React.CSSProperties}
    >
      <div className="festone absolute inset-x-0 -top-4" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="flex justify-center lg:col-span-5">
            <div className="relative w-64 sm:w-80 lg:w-[24rem]">
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
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-creme/25 bg-creme/[0.04] p-6 sm:p-8">
                <Pendente tom="escuro">Texto provisório</Pendente>
                <div className="mt-5 space-y-4 text-lg leading-relaxed text-creme/85">
                  <p>
                    Este espaço vai contar a história real da Chonoko: como tudo começou, quem está por trás do balcão e o
                    que inspira cada receita.
                  </p>
                  <p className="text-creme/65">
                    Sugestões para a conversa com a cafeteria: o ano de abertura, a origem do nome, a relação com o
                    chocolate artesanal, a escolha da esquina e o que torna a Chonoko especial para quem a frequenta.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Pilares */}
        <ul className="mt-20 grid gap-px overflow-hidden rounded-[1.75rem] bg-creme/10 sm:grid-cols-3 lg:mt-28">
          {pilares.map((p, i) => (
            <li key={p.titulo} className="bg-bordo">
              <Reveal atraso={i * 100} className="group h-full p-7 transition-colors duration-500 hover:bg-bordo-escuro sm:p-9">
                <span className="font-display text-lg italic text-rosa-claro">✦</span>
                <h3 className="mt-3 text-3xl text-creme">{p.titulo}</h3>
                <p className="mt-2 text-creme/75">{p.texto}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Linha do tempo a preencher */}
        <div className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rosa-claro">Nossa trajetória</p>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {marcos.map((m, i) => (
              <li key={m} className="relative border-t border-creme/20 pt-5">
                <span className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-rosa-claro" aria-hidden="true" />
                <p className="font-display text-2xl text-creme">{m}</p>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-creme/65">
                  {i === 0 ? "Ano e detalhes" : "Detalhes"} <Pendente tom="escuro" />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
