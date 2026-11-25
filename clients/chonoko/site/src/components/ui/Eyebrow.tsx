import { Ornamento } from "./Icones";

type Props = { children: React.ReactNode; tom?: "claro" | "escuro"; centro?: boolean };

/** Pequena chamada acima dos títulos, em versalete espaçado. */
export function Eyebrow({ children, tom = "claro", centro = false }: Props) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.22em] ${
        tom === "claro" ? "text-rosa-ink" : "text-rosa-claro"
      } ${centro ? "justify-center" : ""}`}
    >
      <Ornamento className="h-2.5 w-10 shrink-0 opacity-80" />
      <span>{children}</span>
    </p>
  );
}
