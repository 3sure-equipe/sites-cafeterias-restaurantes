import type { SVGProps } from "react";

/** Balão de conversa com telefone — reconhecível como WhatsApp sem reproduzir o logotipo. */
export function IconeWhatsapp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9.2 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.7l-.5.6c.6 1.2 1.5 2.1 2.7 2.7l.6-.5c.2-.2.5-.2.7-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.6.4-3-.3a8.4 8.4 0 0 1-3.8-3.8c-.7-1.4-.6-2.4-.3-3z" />
    </svg>
  );
}
