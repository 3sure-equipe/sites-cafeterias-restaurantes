import { iconesCategoria } from "./Icones";
import type { IconeCategoria } from "@/data/cardapio";

type Props = {
  icone: IconeCategoria | "ambiente" | "especial";
  legenda?: string;
  className?: string;
  tamanho?: "p" | "m" | "g";
};

/**
 * Arte provisória exibida no lugar de fotos que ainda não existem.
 * Propositalmente gráfica — nunca uma foto de banco que pareça produto real.
 */
export function ArteProvisoria({ icone, legenda = "Foto em breve", className = "", tamanho = "m" }: Props) {
  const Icone = iconesCategoria[icone];
  const iconeCls = { p: "size-6", m: "size-9", g: "size-12" }[tamanho];
  return (
    <div
      className={`listras-suaves relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-blush/60 text-rosa-ink ${className}`}
      role="img"
      aria-label={`Espaço reservado: ${legenda}`}
    >
      <span className="absolute inset-2 rounded-[inherit] border border-rosa/25" aria-hidden="true" />
      <span className="grid place-items-center rounded-full bg-papel/80 p-3 shadow-sm ring-1 ring-rosa/20 transition-transform duration-500 ease-suave group-hover:scale-110 group-hover:-rotate-6">
        <Icone className={iconeCls} strokeWidth={1.35} aria-hidden="true" />
      </span>
      {tamanho !== "p" && (
        <span className="px-3 text-center text-[0.7rem] font-semibold uppercase tracking-[0.18em]">{legenda}</span>
      )}
    </div>
  );
}
