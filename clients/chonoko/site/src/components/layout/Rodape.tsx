import Image from "next/image";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/images/logo-selo.png";
import { navegacao, site, whatsappUrl } from "@/data/site";
import { IconeInstagram } from "@/components/ui/Icones";
import { Pendente } from "@/components/ui/Pendente";

export function Rodape() {
  const wa = whatsappUrl();
  return (
    <footer className="relative bg-madeira-escura text-creme/80" style={{ "--festone-cor": "var(--color-madeira-escura)" } as React.CSSProperties}>
      <div className="festone absolute inset-x-0 -top-4" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 pb-10 pt-20 sm:px-8 md:grid-cols-12 lg:px-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4">
            <Image src={logo} alt="" sizes="72px" className="size-[4.5rem] rounded-full ring-1 ring-creme/15" />
            <div>
              <p className="font-display text-4xl italic text-creme">Chonoko</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-rosa-claro">
                {site.assinatura} · {site.selo}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-sm leading-relaxed">
            Cafeteria e chocolates artesanais em {site.cidade}, {site.estado}. Um lugar para desacelerar, conversar e
            celebrar pequenos momentos.
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-rosa-claro">Navegue</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
            {navegacao.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="link-sublinhado transition-colors hover:text-creme">
                  {n.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-rosa-claro">Contato</h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-creme"
              >
                <IconeInstagram className="size-5 text-rosa-claro" />
                {site.instagram.usuario}
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
            <li className="flex flex-wrap items-center gap-3">
              <MessageCircle className="size-5 text-rosa-claro" aria-hidden="true" />
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-creme">
                  WhatsApp
                </a>
              ) : (
                <>
                  WhatsApp <Pendente tom="escuro" />
                </>
              )}
            </li>
            <li className="flex flex-wrap items-center gap-3">
              <MapPin className="size-5 text-rosa-claro" aria-hidden="true" />
              {site.endereco ?? (
                <>
                  {site.cidade}, {site.estado} <Pendente tom="escuro">Endereço a confirmar</Pendente>
                </>
              )}
            </li>
            {site.email && (
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-rosa-claro" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-creme">
                  {site.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-creme/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-5 py-6 pb-24 text-[0.8rem] text-creme/60 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-6 lg:px-12">
          <p>
            © {site.anoCopyright} {site.nome}. Todos os direitos reservados.
          </p>
          <p>Protótipo de apresentação — versão para avaliação</p>
        </div>
      </div>
    </footer>
  );
}
