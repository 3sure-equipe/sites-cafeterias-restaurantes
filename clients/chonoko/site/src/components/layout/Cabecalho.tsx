"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/images/logo-selo.png";
import { linkWhatsapp, navegacao, site } from "@/data/site";
import { useDados } from "@/lib/dados/store";
import { IconeWhatsapp } from "@/components/ui/IconeWhatsapp";
import { IconeInstagram } from "@/components/ui/Icones";

export function Cabecalho() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState<string>("#inicio");
  const botaoMenu = useRef<HTMLButtonElement>(null);
  const painel = useRef<HTMLDivElement>(null);
  const { info } = useDados();
  const wa = linkWhatsapp(info.whatsappMensagem, info.whatsapp);

  // Fundo do cabeçalho ao rolar
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Destaca no menu a seção visível
  useEffect(() => {
    const secoes = navegacao
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((s): s is HTMLElement => !!s);
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtivo(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secoes.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Menu mobile: trava a rolagem, fecha com Esc e mantém o foco dentro do painel
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focaveis = () => Array.from(painel.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focaveis()[0]?.focus();
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botaoMenu.current?.focus();
      }
      if (e.key === "Tab") {
        const f = focaveis();
        if (!f.length) return;
        const primeiro = f[0];
        const ultimo = f[f.length - 1];
        if (e.shiftKey && document.activeElement === primeiro) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primeiro.focus();
        }
      }
    };
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  return (
    <>
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ease-suave ${
        rolou ? "bg-papel/85 shadow-[0_1px_0_var(--color-linha)] backdrop-blur-md" : "bg-creme"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 transition-all duration-500 ease-suave sm:px-8 lg:px-12 ${
          rolou ? "h-16" : "h-[4.5rem] lg:h-24"
        }`}
      >
        <a href="#inicio" className="group flex items-center gap-3" aria-label="Chonoko — voltar ao início">
          <Image
            src={logo}
            alt=""
            sizes="48px"
            className={`rounded-full transition-all duration-500 ease-suave group-hover:rotate-[-8deg] ${
              rolou ? "size-10" : "size-11 lg:size-14"
            }`}
            preload
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.7rem] italic text-bordo">Chonoko</span>
            <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-taupe-ink">
              {site.cidade}
            </span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {navegacao.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={ativo === item.href ? "true" : undefined}
                  className={`link-sublinhado py-1 text-[0.92rem] font-medium transition-colors ${
                    ativo === item.href ? "text-bordo" : "text-madeira/80 hover:text-bordo"
                  }`}
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#cardapio"
            className="hidden min-h-11 items-center rounded-full border border-bordo/25 px-5 text-[0.9rem] font-semibold text-bordo transition-colors duration-300 hover:border-bordo hover:bg-bordo/5 xl:inline-flex"
          >
            Ver cardápio
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-12 items-center justify-center gap-2 rounded-full bg-bordo text-[0.9rem] font-semibold text-creme transition-colors duration-300 hover:bg-bordo-escuro sm:size-auto sm:min-h-11 sm:px-5"
            aria-label="Conversar no WhatsApp (abre em nova aba)"
          >
            <IconeWhatsapp className="size-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            ref={botaoMenu}
            type="button"
            onClick={() => setAberto(true)}
            className="grid size-12 place-items-center rounded-full text-bordo transition-colors hover:bg-bordo/5 lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
          >
            <Menu className="size-6" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </header>

      {/* Menu mobile em tela cheia (fora do <header>: o blur do cabeçalho prenderia o "fixed") */}
      <div
        id="menu-mobile"
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!aberto}
        className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-bordo text-creme lg:hidden"
      >
        <div className="toldo shrink-0" aria-hidden="true" />
        <div className="flex items-center justify-between px-5 pt-4 sm:px-8">
          <span className="font-display text-3xl italic">Chonoko</span>
          <button
            type="button"
            onClick={() => {
              setAberto(false);
              botaoMenu.current?.focus();
            }}
            className="grid size-12 place-items-center rounded-full border border-creme/25 transition-colors hover:bg-creme/10"
            aria-label="Fechar menu"
          >
            <X className="size-6" strokeWidth={1.6} />
          </button>
        </div>
        <nav aria-label="Principal (celular)" className="flex-1 px-5 pt-10 sm:px-8">
          <ul className="space-y-1">
            {navegacao.map((item, i) => (
              <li
                key={item.href}
                className="motion-safe:animate-[entrar_0.6s_var(--ease-suave)_both]"
                style={{ animationDelay: `${80 + i * 55}ms` }}
              >
                <a
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="flex items-baseline gap-4 border-b border-creme/10 py-4 font-display text-[2.1rem] leading-none transition-colors hover:text-rosa-claro"
                >
                  <span className="font-sans text-xs font-semibold tracking-[0.2em] text-rosa-claro">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-3 px-5 pb-8 pt-10 sm:px-8">
          <a
            href="#cardapio"
            onClick={() => setAberto(false)}
            className="flex min-h-13 items-center justify-center rounded-full bg-creme px-6 font-semibold text-bordo"
          >
            Ver cardápio
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-13 items-center justify-center gap-2 rounded-full border border-creme/30 px-6 font-semibold"
          >
            <IconeWhatsapp className="size-5" />
            WhatsApp {info.whatsappExibicao}
            <span className="sr-only">(abre em nova aba)</span>
          </a>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold text-creme/80"
          >
            <IconeInstagram className="size-5" />
            {site.instagram.usuario}
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>
      </div>
    </>
  );
}
