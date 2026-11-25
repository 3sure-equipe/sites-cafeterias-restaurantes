"use client";

/* Peças de interface do painel: simples, grandes e com rótulos claros. */
import { ImagePlus, LoaderCircle, Trash, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { comprimirImagem } from "@/lib/imagem";
import { ErroLimiteArmazenamento } from "@/lib/dados/repositorio";

export function Campo({
  rotulo,
  ajuda,
  children,
  className = "",
}: {
  rotulo: string;
  ajuda?: string;
  children: (id: string) => React.ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.9rem] font-semibold text-madeira">
        {rotulo}
      </label>
      {ajuda && <p className="mt-0.5 text-[0.8rem] text-taupe-ink">{ajuda}</p>}
      <div className="mt-1.5">{children(id)}</div>
    </div>
  );
}

export const estiloEntrada =
  "w-full rounded-xl border border-bordo/15 bg-white px-3.5 py-2.5 text-[1rem] text-madeira outline-none transition-colors placeholder:text-taupe-ink/60 focus:border-bordo/60 focus:ring-2 focus:ring-rosa/20";

export function Interruptor({
  ligado,
  onMudar,
  rotulo,
  descricao,
}: {
  ligado: boolean;
  onMudar: (v: boolean) => void;
  rotulo: string;
  descricao?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ligado}
      onClick={() => onMudar(!ligado)}
      className="flex w-full items-center justify-between gap-4 rounded-xl px-1 py-1 text-left"
    >
      <span>
        <span className="block text-[0.9rem] font-semibold text-madeira">{rotulo}</span>
        {descricao && <span className="block text-[0.8rem] text-taupe-ink">{descricao}</span>}
      </span>
      <span
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${ligado ? "bg-bordo" : "bg-taupe/30"}`}
        aria-hidden="true"
      >
        <span
          className={`absolute top-1 size-5 rounded-full bg-white shadow transition-transform duration-300 ease-suave ${
            ligado ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </span>
    </button>
  );
}

type VarianteBotao = "primario" | "secundario" | "perigo" | "fantasma";
const estilosBotao: Record<VarianteBotao, string> = {
  primario: "bg-bordo text-creme hover:bg-bordo-escuro",
  secundario: "border border-bordo/20 bg-white text-bordo hover:border-bordo/50",
  perigo: "bg-[#9b2c2c] text-white hover:bg-[#7f2222]",
  fantasma: "text-bordo hover:bg-bordo/5",
};

export function BotaoAdmin({
  variante = "primario",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variante?: VarianteBotao }) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[0.92rem] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${estilosBotao[variante]} ${className}`}
    />
  );
}

/** Janela sobreposta (formulários). Fecha com Esc ou clicando fora. */
export function Janela({
  aberta,
  titulo,
  onFechar,
  children,
  rodape,
  largura = "max-w-2xl",
}: {
  aberta: boolean;
  titulo: string;
  onFechar: () => void;
  children: React.ReactNode;
  rodape?: React.ReactNode;
  largura?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (aberta && !d.open) d.showModal();
    if (!aberta && d.open) d.close();
  }, [aberta]);
  return (
    <dialog
      ref={ref}
      onClose={onFechar}
      onClick={(e) => e.target === e.currentTarget && onFechar()}
      aria-label={titulo}
      className={`m-auto w-[calc(100vw-1rem)] ${largura} max-h-[calc(100dvh-1rem)] overflow-hidden rounded-[1.5rem] bg-papel p-0 text-madeira shadow-2xl backdrop:bg-madeira-escura/50 backdrop:backdrop-blur-sm`}
    >
      {aberta && (
        <div className="flex max-h-[calc(100dvh-1rem)] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-bordo/10 px-5 py-4 sm:px-7">
            <h2 className="font-display text-2xl font-semibold text-bordo">{titulo}</h2>
            <button type="button" onClick={onFechar} className="grid size-10 place-items-center rounded-full hover:bg-creme" aria-label="Fechar">
              <X className="size-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">{children}</div>
          {rodape && <div className="flex flex-wrap justify-end gap-2 border-t border-bordo/10 bg-creme/50 px-5 py-4 sm:px-7">{rodape}</div>}
        </div>
      )}
    </dialog>
  );
}

/** Confirmação para ações que não podem ser desfeitas. */
export function Confirmacao({
  aberta,
  titulo,
  texto,
  rotuloConfirmar = "Excluir",
  onConfirmar,
  onCancelar,
}: {
  aberta: boolean;
  titulo: string;
  texto: string;
  rotuloConfirmar?: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}) {
  return (
    <Janela
      aberta={aberta}
      titulo={titulo}
      onFechar={onCancelar}
      largura="max-w-md"
      rodape={
        <>
          <BotaoAdmin variante="secundario" onClick={onCancelar}>
            Cancelar
          </BotaoAdmin>
          <BotaoAdmin variante="perigo" onClick={onConfirmar}>
            {rotuloConfirmar}
          </BotaoAdmin>
        </>
      }
    >
      <p className="text-taupe-ink">{texto}</p>
    </Janela>
  );
}

/** Envio de foto com pré-visualização. */
export function EnvioFoto({ foto, onMudar, rotulo = "Foto" }: { foto: string | null; onMudar: (f: string | null) => void; rotulo?: string }) {
  const entrada = useRef<HTMLInputElement>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function escolher(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    e.target.value = "";
    if (!arquivo) return;
    setErro(null);
    setCarregando(true);
    try {
      onMudar(await comprimirImagem(arquivo));
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível usar esta imagem.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <p className="text-[0.9rem] font-semibold text-madeira">{rotulo}</p>
      <div className="mt-1.5 flex items-center gap-4">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-blush ring-1 ring-bordo/10">
          {foto ? (
            // eslint-disable-next-line @next/next/no-img-element -- pré-visualização local (pode ser data URL)
            <img src={foto} alt="" className="size-full object-cover" />
          ) : (
            <span className="grid size-full place-items-center text-rosa-ink">
              <ImagePlus className="size-7" strokeWidth={1.4} aria-hidden="true" />
            </span>
          )}
          {carregando && (
            <span className="absolute inset-0 grid place-items-center bg-papel/70">
              <LoaderCircle className="size-6 animate-spin text-bordo" aria-label="Carregando" />
            </span>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <BotaoAdmin variante="secundario" onClick={() => entrada.current?.click()}>
            <ImagePlus className="size-4" aria-hidden="true" />
            {foto ? "Trocar foto" : "Enviar foto"}
          </BotaoAdmin>
          {foto && (
            <button type="button" onClick={() => onMudar(null)} className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-[#9b2c2c]">
              <Trash className="size-3.5" aria-hidden="true" /> Remover foto
            </button>
          )}
        </div>
        <input ref={entrada} type="file" accept="image/*" className="hidden" onChange={escolher} />
      </div>
      {erro && <p className="mt-2 text-[0.85rem] text-[#9b2c2c]">{erro}</p>}
    </div>
  );
}

/** Mensagem curta de "salvo" no canto da tela. */
export function useAviso() {
  const [msg, setMsg] = useState<{ texto: string; erro?: boolean } | null>(null);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 3200);
    return () => clearTimeout(t);
  }, [msg]);
  const aviso = msg ? (
    <div
      role="status"
      className={`fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 rounded-full px-5 py-3 text-[0.92rem] font-semibold shadow-xl motion-safe:animate-[entrar_0.4s_var(--ease-suave)_both] lg:bottom-8 ${
        msg.erro ? "bg-[#9b2c2c] text-white" : "bg-madeira text-creme"
      }`}
    >
      {msg.texto}
    </div>
  ) : null;

  /** Executa uma gravação e mostra o resultado. Devolve true se deu certo. */
  function salvar(acao: () => void, texto = "Alterações salvas") {
    try {
      acao();
      setMsg({ texto });
      return true;
    } catch (e) {
      setMsg({ texto: e instanceof ErroLimiteArmazenamento ? e.message : "Não foi possível salvar.", erro: true });
      return false;
    }
  }
  return { aviso, salvar };
}

export function CabecalhoPagina({ titulo, texto, acao }: { titulo: string; texto?: string; acao?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-4xl text-bordo sm:text-5xl">{titulo}</h1>
        {texto && <p className="mt-2 max-w-2xl text-taupe-ink">{texto}</p>}
      </div>
      {acao}
    </div>
  );
}
