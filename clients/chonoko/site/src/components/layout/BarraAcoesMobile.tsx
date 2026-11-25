"use client";

import { BookOpen, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

/** Atalhos fixos no celular, que aparecem depois da abertura do site. */
export function BarraAcoesMobile() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => {
      const fim = document.documentElement.scrollHeight - window.innerHeight - 260;
      setVisivel(window.scrollY > window.innerHeight * 0.9 && window.scrollY < fim);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-30 transition-all duration-500 ease-suave sm:hidden ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      aria-hidden={!visivel}
    >
      <nav
        aria-label="Atalhos"
        className="flex gap-2 rounded-full bg-bordo/95 p-1.5 shadow-[0_16px_40px_-14px_rgb(43_26_23/0.8)] backdrop-blur"
      >
        <a
          href="#cardapio"
          tabIndex={visivel ? 0 : -1}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-creme text-[0.92rem] font-semibold text-bordo"
        >
          <BookOpen className="size-4" aria-hidden="true" /> Cardápio
        </a>
        <a
          href="#localizacao"
          tabIndex={visivel ? 0 : -1}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-[0.92rem] font-semibold text-creme"
        >
          <MapPin className="size-4" aria-hidden="true" /> Como chegar
        </a>
      </nav>
    </div>
  );
}
