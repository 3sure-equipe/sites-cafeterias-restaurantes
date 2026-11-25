/** Converte o que a pessoa digitou ("12,50", "R$ 12,5", "12") em número. Vazio → null. */
export function lerPreco(texto: string): number | null {
  const limpo = texto.replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
  if (!limpo) return null;
  const n = Number(limpo);
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : null;
}

/** Número → texto para campo de preço ("12,50"). */
export function precoParaCampo(n: number | null): string {
  return n === null ? "" : n.toFixed(2).replace(".", ",");
}

export function slug(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

/** Só dígitos; aceita "(51) 99669-5981" e devolve "5551996695981". */
export function normalizarWhatsapp(texto: string) {
  const d = texto.replace(/\D/g, "");
  if (d.length === 10 || d.length === 11) return `55${d}`;
  return d;
}
