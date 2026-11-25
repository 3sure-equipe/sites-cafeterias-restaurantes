/** Faixa discreta que deixa claro, para quem avalia, que este é um protótipo. */
export function BarraPrototipo() {
  return (
    <div className="bg-madeira-escura px-5 py-2 text-center text-[0.75rem] leading-snug text-creme/80">
      <strong className="font-semibold text-rosa-claro">Protótipo de apresentação.</strong>{" "}
      Itens marcados como <em>exemplo</em> ou <em>a confirmar</em> serão substituídos pelos dados oficiais da Chonoko.
    </div>
  );
}
