import Image from "next/image";
import { useId } from "react";
import logo from "@/assets/images/logo-selo.png";

type Props = { className?: string; frase?: string; tom?: "claro" | "escuro" };

/**
 * Selo da Chonoko com um anel de texto girando lentamente ao redor.
 * O giro para com movimento reduzido.
 */
export function Selo({ className = "", frase = "Pequenos momentos ✦ grandes sabores ✦ Chonoko ✦ ", tom = "claro" }: Props) {
  const id = `anel-${useId().replace(/:/g, "")}`;
  return (
    <div className={`${className.includes("absolute") ? "" : "relative"} aspect-square ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full motion-safe:animate-girar" aria-hidden="true">
        <defs>
          <path id={id} d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
        </defs>
        <text
          className={`font-display text-[14px] uppercase tracking-[0.2em] ${tom === "claro" ? "fill-bordo" : "fill-creme"}`}
        >
          <textPath href={`#${id}`} textLength="530" lengthAdjust="spacing">
            {frase}
          </textPath>
        </text>
      </svg>
      <Image
        src={logo}
        alt="Selo da Chonoko — Qualidade e Sabor, Chocolates Artesanais"
        className="absolute inset-[17%] size-[66%] rounded-full shadow-[0_18px_40px_-18px_rgb(43_26_23/0.7)]"
        sizes="160px"
      />
    </div>
  );
}
