import { ArrowRight, ArrowUpRight } from "lucide-react";

type Variante = "primario" | "secundario" | "claro" | "contorno-claro";

const estilos: Record<Variante, string> = {
  primario: "bg-bordo text-creme hover:bg-bordo-escuro shadow-[0_10px_30px_-12px_rgb(74_32_41/0.6)]",
  secundario: "border border-bordo/30 text-bordo hover:border-bordo hover:bg-bordo/5",
  claro: "bg-creme text-bordo hover:bg-papel",
  "contorno-claro": "border border-creme/40 text-creme hover:border-creme hover:bg-creme/10",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variante?: Variante;
  externo?: boolean;
  icone?: React.ReactNode;
  className?: string;
};

export function Botao({ href, children, variante = "primario", externo, icone, className = "" }: Props) {
  const Seta = externo ? ArrowUpRight : ArrowRight;
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-semibold tracking-wide transition-all duration-300 ease-suave ${estilos[variante]} ${className}`}
    >
      {icone}
      <span>{children}</span>
      <Seta
        className="size-4 transition-transform duration-300 ease-suave group-hover:translate-x-0.5 group-hover:-translate-y-px"
        aria-hidden="true"
      />
      {externo && <span className="sr-only">(abre em nova aba)</span>}
    </a>
  );
}
