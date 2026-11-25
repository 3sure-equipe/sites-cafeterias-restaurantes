import {
  Armchair,
  CakeSlice,
  Candy,
  Coffee,
  Cookie,
  CupSoda,
  Sandwich,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { SVGProps } from "react";
import type { IconeCategoria } from "@/data/cardapio";

export const iconesCategoria: Record<IconeCategoria | "ambiente" | "especial", LucideIcon> = {
  cafe: Coffee,
  bebida: CupSoda,
  torta: CakeSlice,
  chocolate: Candy,
  doce: Cookie,
  salgado: Sandwich,
  ambiente: Armchair,
  especial: Sparkles,
};

/** Glifo simples do Instagram (a Lucide não inclui ícones de marcas). */
export function IconeInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Ornamento delicado: traço – losango – traço. */
export function Ornamento({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 10" className={className} aria-hidden="true" fill="none">
      <path d="M0 5h24M40 5h24" stroke="currentColor" strokeWidth="1" />
      <path d="M32 1l4 4-4 4-4-4z" fill="currentColor" />
    </svg>
  );
}
