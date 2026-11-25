/**
 * Reduz a foto escolhida no painel antes de guardar (modo demonstração).
 * Na versão oficial, a foto original seria enviada a um armazenamento de
 * arquivos e o site geraria as versões otimizadas automaticamente.
 */
export async function comprimirImagem(arquivo: File, tamanhoMax = 900, qualidade = 0.8): Promise<string> {
  if (!arquivo.type.startsWith("image/")) throw new Error("Escolha um arquivo de imagem (JPG, PNG ou WEBP).");
  const url = URL.createObjectURL(arquivo);
  try {
    const img = await new Promise<HTMLImageElement>((ok, erro) => {
      const i = new Image();
      i.onload = () => ok(i);
      i.onerror = () => erro(new Error("Não foi possível abrir esta imagem."));
      i.src = url;
    });
    const escala = Math.min(1, tamanhoMax / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * escala);
    canvas.height = Math.round(img.height * escala);
    canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", qualidade);
  } finally {
    URL.revokeObjectURL(url);
  }
}
