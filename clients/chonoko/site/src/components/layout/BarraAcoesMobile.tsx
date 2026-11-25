"use client";

import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { linkWhatsapp } from "@/data/site";
import { useDados } from "@/lib/dados/store";
import { IconeWhatsapp } from "@/components/ui/IconeWhatsapp";

/**
 * Celular: barra fixa com Cardápio + WhatsApp, depois da abertura do site.
 * Computador: botão redondo de WhatsApp no canto.
 */
export function BarraAcoesMobile() {
  const [visivel, setVisivel] = useState(false);
  const { info } = useDados();
  const wa = linkWhatsapp(info.whatsappMensagem, info.whatsapp);

  useEffect(() => {
    const aoRolar = () => {
      const fim = document.documentElement.scrollHeight - window.innerHeight - 260;
      setVisivel(window.scrollY > window.innerHeight * 0.6 && window.scrollY < fim);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  const classeVisivel = visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0";

  return (
    <>
      <div className={`fixed inset-x-3 bottom-3 z-30 transition-all duration-500 ease-suave sm:hidden ${classeVisivel}`} aria-hidden={!visivel}>
        <nav aria-label="Atalhos" className="flex gap-2 rounded-full bg-bordo/95 p-1.5 shadow-[0_16px_40px_-14px_rgb(43_26_23/0.8)] backdrop-blur">
          <a
            href="#cardapio"
            tabIndex={visivel ? 0 : -1}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-[0.92rem] font-semibold text-creme"
          >
            <BookOpen className="size-4" aria-hidden="true" /> Cardápio
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visivel ? 0 : -1}
            className="flex min-h-12 flex-[1.3] items-center justify-center gap-2 rounded-full bg-creme text-[0.92rem] font-semibold text-bordo"
          >
            <IconeWhatsapp className="size-5" /> WhatsApp
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </nav>
      </div>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visivel ? 0 : -1}
        aria-hidden={!visivel}
        className={`group fixed bottom-6 right-6 z-30 hidden items-center gap-3 rounded-full bg-bordo ring-1 ring-creme/25 py-3 pl-4 pr-5 font-semibold text-creme shadow-[0_18px_40px_-14px_rgb(43_26_23/0.8)] transition-all duration-500 ease-suave hover:bg-bordo-escuro sm:flex ${classeVisivel}`}
      >
        <IconeWhatsapp className="size-6" />
        <span className="text-[0.92rem]">Fale conosco</span>
        <span className="sr-only">no WhatsApp (abre em nova aba)</span>
      </a>
    </>
  );
}
