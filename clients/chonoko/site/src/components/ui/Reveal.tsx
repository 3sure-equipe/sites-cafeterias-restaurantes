"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  atraso?: number;
  className?: string;
};

/**
 * Faz o conteúdo surgir suavemente quando entra na tela.
 * Com movimento reduzido (ou sem JS), o conteúdo aparece direto — ver globals.css.
 */
export function Reveal({ children, atraso = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          el.dataset.visivel = "true";
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`revelar ${className}`}
      style={{ "--atraso": `${atraso}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
