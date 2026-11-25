import { ArrowRight, ArrowUpRight } from "lucide-react";

export type VarianteBotao = "primario" | "secundario" | "claro" | "contorno-claro";

const estilos: Record<VarianteBotao, string> = {
  primario:
    "bg-bordo text-creme shadow-[0_10px_24px_-14px_rgb(74_32_41/0.7)] hover:bg-bordo-escuro hover:shadow-[0_14px_28px_-14px_rgb(74_32_41/0.8)]",
  secundario: "border border-bordo/25 bg-transparent text-bordo hover:border-bordo/60 hover:bg-bordo/[0.04]",
  claro: "bg-creme text-bordo hover:bg-papel",
  "contorno-claro": "border border-creme/40 text-creme hover:border-creme hover:bg-creme/10",
};

/** Classes de botão do site — usadas também pelo botão de WhatsApp. */
export function classeBotao(variante: VarianteBotao = "primario", extra = "") {
  return `group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-center text-[0.95rem] font-semibold tracking-[0.01em] transition-[background-color,border-color,box-shadow,transform,color] duration-300 ease-suave active:scale-[0.98] motion-reduce:active:scale-100 ${estilos[variante]} ${extra}`;
}

type Props = {
  href: string;
  children: React.ReactNode;
  variante?: VarianteBotao;
  externo?: boolean;
  icone?: React.ReactNode;
  className?: string;
};

export function Botao({ href, children, variante = "primario", externo, icone, className = "" }: Props) {
  const Seta = externo ? ArrowUpRight : ArrowRight;
  return (
    <a href={href} {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={classeBotao(variante, className)}>
      {icone}
      <span>{children}</span>
      <Seta
        className="size-4 shrink-0 transition-transform duration-300 ease-suave group-hover:translate-x-0.5 group-hover:-translate-y-px"
        aria-hidden="true"
      />
      {externo && <span className="sr-only">(abre em nova aba)</span>}
    </a>
  );
}

/** Link de texto com área de toque confortável (mín. 44px de altura). */
export function LinkTexto({
  href,
  children,
  externo,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  externo?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group -my-2 inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-[0.92rem] font-semibold text-bordo ${className}`}
    >
      <span className="link-sublinhado">{children}</span>
      <ArrowRight className="size-4 transition-transform duration-300 ease-suave group-hover:translate-x-0.5" aria-hidden="true" />
      {externo && <span className="sr-only">(abre em nova aba)</span>}
    </a>
  );
}
