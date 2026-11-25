import { classeBotao } from "./Botao";
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
    <a href={href} target="_blank" rel="noopener noreferrer" className={classeBotao(claro ? "claro" : "primario", `shrink-0 ${className}`)}>
      <IconeWhatsapp className="size-5 shrink-0" />
      <span>{children}</span>
      <span className="sr-only">(abre o WhatsApp em nova aba)</span>
    </a>
  );
}
