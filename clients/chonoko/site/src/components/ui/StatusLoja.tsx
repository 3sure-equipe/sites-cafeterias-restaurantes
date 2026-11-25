"use client";

import { useEffect, useState } from "react";
import { useDados } from "@/lib/dados/store";
import { statusAgora, type StatusLoja as Status } from "@/lib/horarios";

/**
 * "Aberto agora · até 12h" / "Fechado agora · abre às 14h".
 * Calculado no navegador de quem visita (relógio local), atualizado a cada minuto.
 * Antes de montar, reserva o espaço para não deslocar o layout.
 */
export function StatusLoja({ tom = "claro", className = "" }: { tom?: "claro" | "escuro"; className?: string }) {
  const { info } = useDados();
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const atualizar = () => setStatus(statusAgora(info.horarios, new Date()));
    atualizar();
    const t = setInterval(atualizar, 60_000);
    return () => clearInterval(t);
  }, [info.horarios]);

  const cor = tom === "claro" ? "text-madeira" : "text-creme";
  const suave = tom === "claro" ? "text-taupe-ink" : "text-creme/70";

  if (!status) return <span className={`inline-block h-6 ${className}`} aria-hidden="true" />;

  if (status.tipo === "sem-info") {
    return (
      <span className={`inline-flex items-center gap-2 text-[0.92rem] ${suave} ${className}`}>
        <span className="size-2 rounded-full bg-taupe/60" aria-hidden="true" />
        Hoje: horário não informado
      </span>
    );
  }

  const aberto = status.tipo === "aberto";
  return (
    <span className={`inline-flex flex-wrap items-center gap-x-2 text-[0.92rem] ${className}`} role="status">
      <span className="relative flex size-2.5" aria-hidden="true">
        {aberto && <span className="absolute inline-flex size-full rounded-full bg-[#6f9a6a] opacity-60 motion-safe:animate-ping" />}
        <span className={`relative inline-flex size-2.5 rounded-full ${aberto ? "bg-[#5f8a5b]" : "bg-rosa"}`} />
      </span>
      <strong className={`font-semibold ${cor}`}>{aberto ? "Aberto agora" : "Fechado agora"}</strong>
      <span className={suave}>
        {aberto
          ? `· até ${status.ate}`
          : status.abre
            ? `· abre ${status.quando === "amanha" ? "amanhã " : ""}às ${status.abre}`
            : ""}
      </span>
    </span>
  );
}
