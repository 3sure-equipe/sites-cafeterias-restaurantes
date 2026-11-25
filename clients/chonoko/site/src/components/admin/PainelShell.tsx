"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ExternalLink, Info, LayoutDashboard, Lock, LogOut, Megaphone, Store, Tags } from "lucide-react";
import { useSyncExternalStore } from "react";
import logo from "@/assets/images/logo-selo.png";

const itens = [
  { href: "/admin", rotulo: "Início", Icone: LayoutDashboard },
  { href: "/admin/promocoes", rotulo: "Promoções", Icone: Megaphone },
  { href: "/admin/cardapio", rotulo: "Cardápio", Icone: BookOpen },
  { href: "/admin/categorias", rotulo: "Categorias", Icone: Tags },
  { href: "/admin/informacoes", rotulo: "Contato e horários", rotuloCurto: "Loja", Icone: Store },
] as const;

/* Sessão de demonstração: só guarda que a pessoa "entrou" nesta aba. */
const CHAVE = "chonoko:painel-demo";
const ouvintes = new Set<() => void>();
const lerSessao = () => {
  try {
    return sessionStorage.getItem(CHAVE) === "1";
  } catch {
    return false;
  }
};
const definirSessao = (v: boolean) => {
  try {
    if (v) sessionStorage.setItem(CHAVE, "1");
    else sessionStorage.removeItem(CHAVE);
  } catch {
    /* ignora */
  }
  ouvintes.forEach((o) => o());
};
const assinar = (o: () => void) => {
  ouvintes.add(o);
  return () => ouvintes.delete(o);
};

export function PainelShell({ children }: { children: React.ReactNode }) {
  const entrou = useSyncExternalStore(assinar, lerSessao, () => false);
  const caminho = usePathname();

  if (!entrou) return <TelaAcesso onEntrar={() => definirSessao(true)} />;

  const ativo = (href: string) => (href === "/admin" ? caminho === "/admin" : caminho.startsWith(href));

  return (
    <div className="min-h-dvh bg-[#f6f1ea] lg:grid lg:grid-cols-[17rem_1fr]">
      {/* Lateral (computador) */}
      <aside className="sticky top-0 hidden h-dvh flex-col bg-bordo px-5 py-6 text-creme lg:flex">
        <Marca />
        <nav aria-label="Painel" className="mt-10 flex-1">
          <ul className="space-y-1">
            {itens.map(({ href, rotulo, Icone }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={ativo(href) ? "page" : undefined}
                  className={`flex min-h-12 items-center gap-3 rounded-xl px-4 text-[0.95rem] font-semibold transition-colors ${
                    ativo(href) ? "bg-creme text-bordo" : "text-creme/80 hover:bg-creme/10 hover:text-creme"
                  }`}
                >
                  <Icone className="size-[1.15rem]" strokeWidth={1.7} aria-hidden="true" />
                  {rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-1 border-t border-creme/15 pt-4">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 rounded-xl px-4 text-[0.9rem] text-creme/80 hover:bg-creme/10">
            <ExternalLink className="size-4" aria-hidden="true" /> Ver o site
            <span className="sr-only">(abre em nova aba)</span>
          </a>
          <button
            type="button"
            onClick={() => definirSessao(false)}
            className="flex min-h-11 w-full items-center gap-3 rounded-xl px-4 text-[0.9rem] text-creme/80 hover:bg-creme/10"
          >
            <LogOut className="size-4" aria-hidden="true" /> Sair
          </button>
        </div>
      </aside>

      <div className="flex min-h-dvh min-w-0 flex-col">
        {/* Topo (celular) */}
        <header className="sticky top-0 z-30 flex items-center justify-between bg-bordo px-4 py-3 text-creme lg:hidden">
          <Marca compacta />
          <div className="flex items-center gap-1">
            <a href="/" target="_blank" rel="noopener noreferrer" className="grid size-11 place-items-center rounded-full hover:bg-creme/10" aria-label="Ver o site (abre em nova aba)">
              <ExternalLink className="size-5" />
            </a>
            <button type="button" onClick={() => definirSessao(false)} className="grid size-11 place-items-center rounded-full hover:bg-creme/10" aria-label="Sair">
              <LogOut className="size-5" />
            </button>
          </div>
        </header>

        <div className="border-b border-dashed border-rosa/40 bg-blush/50 px-4 py-2.5 text-center text-[0.82rem] text-taupe-ink sm:px-8">
          <Info className="mr-1.5 inline size-4 align-[-3px] text-rosa-ink" aria-hidden="true" />
          <strong className="text-madeira">Modo demonstração:</strong> as alterações ficam salvas apenas neste navegador e
          aparecem no site aberto nele.
        </div>

        <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-8 sm:px-8 lg:pb-16 lg:pt-12">{children}</main>
      </div>

      {/* Navegação inferior (celular) */}
      <nav aria-label="Painel" className="fixed inset-x-0 bottom-0 z-40 border-t border-bordo/10 bg-papel/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <ul className="grid grid-cols-5">
          {itens.map((item) => {
            const { href, rotulo, Icone } = item;
            const curto = "rotuloCurto" in item ? item.rotuloCurto : rotulo;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={ativo(href) ? "page" : undefined}
                  className={`flex min-h-16 flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold ${
                    ativo(href) ? "text-bordo" : "text-taupe-ink"
                  }`}
                >
                  <span className={`grid h-7 w-12 place-items-center rounded-full transition-colors ${ativo(href) ? "bg-blush" : ""}`}>
                    <Icone className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  {curto}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function Marca({ compacta }: { compacta?: boolean }) {
  return (
    <Link href="/admin" className="flex items-center gap-3">
      <Image src={logo} alt="" sizes="44px" className={compacta ? "size-9 rounded-full" : "size-11 rounded-full"} />
      <span className="leading-none">
        <span className="block font-display text-2xl italic">Chonoko</span>
        <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-rosa-claro">Painel da equipe</span>
      </span>
    </Link>
  );
}

function TelaAcesso({ onEntrar }: { onEntrar: () => void }) {
  return (
    <div className="grid min-h-dvh place-items-center bg-bordo px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-papel shadow-2xl">
        <div className="toldo" aria-hidden="true" />
        <div className="px-7 pb-8 pt-6 sm:px-9">
          <Image src={logo} alt="Chonoko" sizes="72px" className="mx-auto size-[4.5rem] rounded-full" preload />
          <h1 className="mt-5 text-center text-4xl text-bordo">Painel da equipe</h1>
          <p className="mt-2 text-center text-taupe-ink">Atualize cardápio, preços, promoções e horários sem precisar de programador.</p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onEntrar();
            }}
          >
            <div>
              <label htmlFor="acesso-email" className="text-[0.9rem] font-semibold">
                E-mail
              </label>
              <input
                id="acesso-email"
                type="email"
                disabled
                placeholder="proprietaria@chonoko.com.br"
                className="mt-1.5 w-full rounded-xl border border-bordo/15 bg-creme/60 px-3.5 py-2.5 text-taupe-ink"
              />
            </div>
            <div>
              <label htmlFor="acesso-senha" className="text-[0.9rem] font-semibold">
                Senha
              </label>
              <input
                id="acesso-senha"
                type="password"
                disabled
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-bordo/15 bg-creme/60 px-3.5 py-2.5"
              />
            </div>
            <div className="flex gap-2.5 rounded-xl border border-dashed border-rosa/50 bg-blush/40 p-3 text-[0.85rem] text-taupe-ink">
              <Lock className="mt-0.5 size-4 shrink-0 text-rosa-ink" aria-hidden="true" />
              <p>
                <strong className="text-madeira">Demonstração.</strong> Na versão oficial, só as proprietárias entram, com e-mail e
                senha próprios. Neste protótipo não é preciso senha.
              </p>
            </div>
            <button type="submit" className="min-h-12 w-full rounded-full bg-bordo font-semibold text-creme transition-colors hover:bg-bordo-escuro">
              Entrar na demonstração
            </button>
          </form>
          <p className="mt-5 text-center text-[0.85rem]">
            <Link href="/" className="font-semibold text-bordo underline-offset-4 hover:underline">
              ← Voltar ao site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
