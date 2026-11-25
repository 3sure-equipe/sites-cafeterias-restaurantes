"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { enderecoCompleto, mapsEmbedUrl, site } from "@/data/site";
import type { InfoLoja } from "@/lib/dados/tipos";

/**
 * Mapa do Google pelo ENDEREÇO OFICIAL (sem coordenadas inventadas).
 * Só carrega quando a pessoa pede: mais leve e respeitoso com a privacidade.
 */
export function Mapa({ info }: { info: InfoLoja }) {
  const [carregar, setCarregar] = useState(false);
  const endereco = enderecoCompleto(info);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-blush/50 ring-1 ring-bordo/10 sm:aspect-[16/8]">
      {carregar ? (
        <iframe
          src={mapsEmbedUrl(info)}
          title={`Mapa: ${site.nome}, ${endereco ?? site.cidade}`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0">
          {/* Mapa estilizado (decorativo) */}
          <svg aria-hidden="true" className="absolute inset-0 size-full text-bordo/10" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 200">
            <g stroke="currentColor" strokeWidth="10" fill="none">
              <path d="M-20 70 L420 40" />
              <path d="M-20 150 L420 130" />
              <path d="M120 -20 L150 220" />
              <path d="M280 -20 L300 220" />
            </g>
            <g stroke="currentColor" strokeWidth="3" fill="none" opacity=".7">
              <path d="M-20 110 L420 88" />
              <path d="M60 -20 L70 220" />
              <path d="M210 -20 L225 220" />
              <path d="M350 -20 L360 220" />
            </g>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-bordo text-creme shadow-lg motion-safe:animate-[entrar_0.8s_var(--ease-suave)_both]">
              <MapPin className="size-6" aria-hidden="true" />
            </span>
            {endereco && <p className="max-w-xs rounded-full bg-papel/85 px-4 py-1.5 text-[0.85rem] font-semibold text-bordo backdrop-blur">{endereco.split(",").slice(0, 2).join(",")}</p>}
            <button
              type="button"
              onClick={() => setCarregar(true)}
              className="mt-1 min-h-12 rounded-full bg-papel px-6 text-[0.95rem] font-semibold text-bordo shadow-[0_10px_30px_-14px_rgb(43_26_23/0.6)] ring-1 ring-bordo/15 transition-colors hover:bg-creme"
            >
              Ver no mapa interativo
            </button>
            <p className="text-[0.75rem] text-taupe-ink">O mapa é fornecido pelo Google e só carrega após o clique.</p>
          </div>
        </div>
      )}
    </div>
  );
}
