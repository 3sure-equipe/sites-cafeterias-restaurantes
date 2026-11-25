import Image from "next/image";
import { ArteProvisoria } from "./ArteProvisoria";
import type { IconeCategoria } from "@/lib/dados/tipos";

type Props = {
  foto: string | null;
  alt: string;
  icone: IconeCategoria;
  sizes: string;
  className?: string;
  preload?: boolean;
};

/**
 * Foto de produto. Aceita caminhos do site ("/cardapio/x.jpg") e imagens
 * enviadas pelo painel (data URL). Sem foto, mostra a arte provisória.
 */
export function FotoProduto({ foto, alt, icone, sizes, className = "" }: Props) {
  if (!foto) return <ArteProvisoria icone={icone} tamanho="p" legenda={`foto de ${alt}`} />;
  return (
    <Image
      src={foto}
      alt={alt}
      fill
      sizes={sizes}
      unoptimized={foto.startsWith("data:")}
      className={`object-cover ${className}`}
    />
  );
}
