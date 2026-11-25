import { IconeWhatsapp } from "./IconeWhatsapp";

/** Botão que abre conversa no WhatsApp da Chonoko. */
export function BotaoWhatsapp({
  href,
  children,
  claro,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  claro?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-semibold transition-all duration-300 ease-suave ${
        claro ? "bg-creme text-bordo hover:bg-papel" : "bg-bordo text-creme shadow-[0_10px_30px_-12px_rgb(74_32_41/0.6)] hover:bg-bordo-escuro"
      } ${className}`}
    >
      <IconeWhatsapp className="size-5" />
      {children}
      <span className="sr-only">(abre o WhatsApp em nova aba)</span>
    </a>
  );
}
