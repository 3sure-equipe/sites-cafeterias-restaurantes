import { Info } from "lucide-react";

/** Etiqueta para dados ainda não confirmados pela cafeteria. */
export function Pendente({ children = "A confirmar", tom = "claro" }: { children?: React.ReactNode; tom?: "claro" | "escuro" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed px-2.5 py-0.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] ${
        tom === "claro" ? "border-rosa/60 bg-blush/40 text-rosa-ink" : "border-rosa-claro/50 text-rosa-claro"
      }`}
    >
      {children}
    </span>
  );
}

/** Aviso de seção com conteúdo demonstrativo. */
export function AvisoDemo({ children, tom = "claro" }: { children: React.ReactNode; tom?: "claro" | "escuro" }) {
  return (
    <div
      role="note"
      className={`flex items-start gap-3 rounded-2xl border border-dashed px-4 py-3 text-[0.9rem] leading-relaxed ${
        tom === "claro" ? "border-rosa/50 bg-papel/70 text-taupe-ink" : "border-rosa-claro/40 text-creme/80"
      }`}
    >
      <Info className={`mt-0.5 size-4 shrink-0 ${tom === "claro" ? "text-rosa-ink" : "text-rosa-claro"}`} aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
