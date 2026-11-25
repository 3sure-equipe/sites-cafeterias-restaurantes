"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { mapsEmbed, site } from "@/data/site";

/**
 * O mapa do Google só carrega quando a pessoa pede: mais leve e mais respeitoso
 * com a privacidade. Sem endereço confirmado, o mapa mostra uma BUSCA pelo nome.
 */
export function Mapa() {
  const [carregar, setCarregar] = useState(false);
  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-blush/50 ring-1 ring-bordo/10 sm:aspect-[16/8]">
        {carregar ? (
          <iframe
            src={mapsEmbed}
            title={`Mapa: ${site.nome}, ${site.cidade}`}
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
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-bordo text-creme shadow-lg">
                <MapPin className="size-6" aria-hidden="true" />
              </span>
              <button
                type="button"
                onClick={() => setCarregar(true)}
                className="min-h-12 rounded-full bg-papel px-6 text-[0.95rem] font-semibold text-bordo shadow-[0_10px_30px_-14px_rgb(43_26_23/0.6)] ring-1 ring-bordo/15 transition-colors hover:bg-creme"
              >
                Carregar mapa do Google
              </button>
            </div>
          </div>
        )}
      </div>
      {!site.endereco && (
        <p className="mt-3 text-[0.85rem] text-taupe-ink">
          Enquanto o endereço não é confirmado, o mapa mostra uma busca por “{site.nome} {site.cidade}”. Depois, será
          fixado no endereço oficial.
        </p>
      )}
    </div>
  );
}
