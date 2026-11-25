import Image from "next/image";
import logo from "@/assets/images/logo-selo.png";
import { navegacao, site } from "@/data/site";
import { RodapeContato, RodapeHorarios } from "./RodapeContato";

export function Rodape() {
  return (
    <footer className="relative bg-madeira-escura text-creme/80" style={{ "--festone-cor": "var(--color-madeira-escura)" } as React.CSSProperties}>
      <div className="festone absolute inset-x-0 -top-4" aria-hidden="true" />

      <div className="mx-auto max-w-[1320px] px-5 pt-20 sm:px-8 lg:px-12">
        {/* Assinatura */}
        <div className="flex flex-col gap-6 border-b border-creme/10 pb-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-display text-[2.2rem] leading-[1.05] text-creme sm:text-[2.8rem]">
            {site.slogan.inicio} <em className="text-rosa-claro">{site.slogan.destaque}</em>
          </p>
          <a
            href="#inicio"
            className="inline-flex min-h-11 items-center gap-2 self-start text-[0.9rem] font-semibold text-creme/80 transition-colors hover:text-creme sm:self-auto"
          >
            Voltar ao início <span aria-hidden="true">↑</span>
          </a>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Marca */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <Image src={logo} alt="" sizes="72px" className="size-16 rounded-full ring-1 ring-creme/15" />
              <div>
                <p className="font-display text-[2rem] italic leading-none text-creme">Chonoko</p>
                <p className="rotulo mt-2 !text-[0.66rem] text-rosa-claro">{site.selo}</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm leading-relaxed">
              Chocolates e biscoitos artesanais, doces finos para festas e cestas para presentear. Feitos com ingredientes
              selecionados e receitas únicas, em {site.cidade}.
            </p>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé" className="lg:col-span-2">
            <h2 className="rotulo text-rosa-claro">Navegue</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-1">
              {navegacao.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-flex min-h-10 items-center transition-colors hover:text-creme">
                    {n.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visite */}
          <div className="lg:col-span-3">
            <h2 className="rotulo text-rosa-claro">Visite & contato</h2>
            <RodapeContato />
          </div>

          {/* Horários */}
          <div className="lg:col-span-3">
            <h2 className="rotulo text-rosa-claro">Horários</h2>
            <RodapeHorarios />
          </div>
        </div>
      </div>

      <div className="border-t border-creme/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-1 px-5 py-6 pb-24 text-[0.8rem] text-creme/55 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-6 lg:px-12">
          <p>
            © {site.anoCopyright} {site.nome} · {site.assinatura} · {site.cidade} – {site.estado}
          </p>
          <p>
            Protótipo de apresentação ·{" "}
            <a href="/admin" className="inline-flex min-h-10 items-center underline-offset-4 hover:text-creme hover:underline">
              Área da equipe
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
