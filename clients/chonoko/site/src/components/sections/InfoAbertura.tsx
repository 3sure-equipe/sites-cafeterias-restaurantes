"use client";

import { MapPin } from "lucide-react";
import { mapsBuscaUrl } from "@/data/site";
import { useDados } from "@/lib/dados/store";
import { StatusLoja } from "@/components/ui/StatusLoja";

/** Faixa com endereço e situação de agora (dados da fonte central/painel). */
export function InfoAbertura() {
  const { info } = useDados();
  return (
    <div className="mt-10 grid gap-3 border-t border-bordo/15 pt-6 text-[0.92rem] motion-safe:animate-[entrar_1s_var(--ease-suave)_440ms_both] sm:grid-cols-2 sm:gap-6">
      {info.endereco && (
        <a
          href={mapsBuscaUrl(info)}
          target="_blank"
          rel="noopener noreferrer"
          className="group -my-1 flex min-h-11 items-start gap-2.5 text-madeira"
        >
          <MapPin className="mt-0.5 size-4 shrink-0 text-rosa-ink" aria-hidden="true" />
          <span className="leading-snug">
            <span className="link-sublinhado font-semibold">{info.endereco.split(" – ")[0]}</span>
            <span className="block text-taupe-ink">
              {info.endereco.split(" – ")[1] ?? info.cidade} · {info.cidade}
            </span>
          </span>
          <span className="sr-only">(abre o Google Maps em nova aba)</span>
        </a>
      )}
      <StatusLoja className="sm:pt-0.5" />
    </div>
  );
}
