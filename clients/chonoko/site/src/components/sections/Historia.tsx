import Image from "next/image";
import { site } from "@/data/site";
import { Ornamento } from "@/components/ui/Icones";
import { Pendente } from "@/components/ui/Pendente";
import { Reveal } from "@/components/ui/Reveal";
import { Selo } from "@/components/ui/Selo";
import { Titulo } from "@/components/ui/Titulo";

/** Valores tirados do próprio selo e do texto do cardápio da marca — não são alegações novas. */
const pilares = [
  { titulo: "Qualidade", texto: "A primeira palavra do nosso selo e o cuidado que guia cada escolha." },
  { titulo: "Sabor", texto: "O que faz a gente voltar: aquele gosto que vira lembrança." },
  { titulo: "Receitas únicas", texto: "Ingredientes selecionados e receitas próprias em toda a linha de produtos." },
];

export function Historia() {
  return (
    <section
      id="historia"
      aria-labelledby="titulo-historia"
      className="relative overflow-hidden bg-bordo text-creme"
      style={{ "--festone-cor": "var(--color-bordo)" } as React.CSSProperties}
    >
      <div className="festone absolute inset-x-0 -top-4" aria-hidden="true" />
      {/* Arco gráfico de fundo */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-24 hidden size-[40rem] rounded-full border border-creme/[0.06] lg:block" />

      <div className="secao relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Fotografias ---------- */}
          <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="relative ml-auto w-[84%] lg:w-[88%]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
                <Image
                  src="/cardapio/biscoito-mel-coberto.jpg"
                  alt="Pacote de biscoitos de mel cobertos com a etiqueta “Chonoko – Biscoitos artesanais”."
                  fill
                  sizes="(min-width: 1024px) 34vw, 80vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Foto menor sobreposta */}
            <div className="absolute -bottom-8 left-0 w-[42%] rotate-[-3deg] rounded-[1.25rem] bg-creme p-1.5 shadow-[0_24px_50px_-20px_rgb(0_0_0/0.55)]">
              <div className="relative aspect-square overflow-hidden rounded-[1rem]">
                <Image src="/cardapio/trufas-encomenda.jpg" alt="Trufa de chocolate da Chonoko." fill sizes="12rem" className="object-cover" />
              </div>
            </div>
            <Selo tom="escuro" frase={`${site.assinatura} ✦ ${site.selo} ✦ `} className="absolute -top-6 left-2 w-28 sm:w-32 lg:-left-4 lg:w-36" />
          </Reveal>

          {/* ---------- Texto ---------- */}
          <div className="lg:col-span-7 lg:pl-8">
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
              <div className="mt-8 max-w-2xl space-y-5 text-[1.08rem] leading-relaxed text-creme/85">
                <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.4rem] first-letter:leading-[0.8] first-letter:text-rosa-claro">
                  A Chonoko é especializada na fabricação de <strong className="font-semibold text-creme">chocolates e biscoitos artesanais</strong>.
                  São bombons, trufas, barras, biscoitos doces e salgados feitos com ingredientes selecionados e receitas únicas.
                </p>
                <p>
                  Fundada em {site.cidade}, oferece{" "}
                  {site.fundacao.confirmado ? (
                    <>desde {site.fundacao.ano} </>
                  ) : (
                    <span className="whitespace-nowrap">
                      desde {site.fundacao.ano}
                      <span className="ml-2 align-middle">
                        <Pendente tom="escuro">Ano a confirmar</Pendente>
                      </span>{" "}
                    </span>
                  )}
                  os melhores sabores em toda a linha de produtos.
                </p>
              </div>
            </Reveal>

            {/* Citação com a assinatura do selo */}
            <Reveal atraso={180}>
              <figure className="mt-10 flex items-center gap-5">
                <Ornamento className="h-3 w-14 shrink-0 text-rosa-claro" />
                <blockquote className="font-display text-[2rem] italic leading-tight text-creme sm:text-[2.4rem]">“{site.assinatura}.”</blockquote>
              </figure>
              <p className="mt-1 pl-[4.75rem] text-[0.8rem] text-creme/55">Do selo da Chonoko · Texto baseado na apresentação do cardápio oficial da loja.</p>
            </Reveal>
          </div>
        </div>

        {/* Pilares */}
        <ol className="mt-20 grid gap-y-8 border-t border-creme/15 pt-10 sm:grid-cols-3 sm:gap-x-10 lg:mt-24">
          {pilares.map((p, i) => (
            <li key={p.titulo}>
              <Reveal atraso={i * 100} className="group">
                <span className="font-display text-[1.1rem] italic text-rosa-claro">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="titulo-bloco mt-2 text-creme">{p.titulo}</h3>
                <span aria-hidden="true" className="mt-3 block h-px w-10 bg-rosa-claro/50 transition-all duration-500 ease-suave group-hover:w-16" />
                <p className="mt-3 max-w-xs text-creme/75">{p.texto}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
