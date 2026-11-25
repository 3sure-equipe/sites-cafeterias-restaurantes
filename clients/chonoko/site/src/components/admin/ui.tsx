"use client";

/* Peças de interface do painel: simples, grandes e com rótulos claros. */
import { Check, ImagePlus, Info, LoaderCircle, Trash, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { comprimirImagem } from "@/lib/imagem";
import { ErroLimiteArmazenamento } from "@/lib/dados/repositorio";

export function Campo({
  rotulo,
  ajuda,
  erro,
  opcional,
  children,
  className = "",
}: {
  rotulo: string;
  ajuda?: string;
  /** Mensagem de erro exibida logo abaixo do campo. */
  erro?: string | null;
  opcional?: boolean;
  children: (id: string) => React.ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={className} data-invalido={erro ? "true" : undefined}>
      <label htmlFor={id} className="flex items-baseline gap-2 text-[0.9rem] font-semibold text-madeira">
        {rotulo}
        {opcional && <span className="text-[0.75rem] font-medium text-taupe-ink">(opcional)</span>}
      </label>
      {ajuda && <p className="mt-0.5 text-[0.8rem] leading-snug text-taupe-ink">{ajuda}</p>}
      <div className="mt-1.5">{children(id)}</div>
      {erro && (
        <p role="alert" className="mt-1.5 flex items-start gap-1.5 text-[0.83rem] font-semibold text-erro">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" /> {erro}
        </p>
      )}
    </div>
  );
}

/** Caixa de erro geral do formulário (quando não pertence a um campo só). */
export function ErroFormulario({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="flex items-start gap-2 rounded-xl border border-erro/25 bg-erro-fundo px-4 py-3 text-[0.9rem] font-semibold text-erro">
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {children}
    </p>
  );
}

export const estiloEntrada =
  "min-h-11 w-full rounded-xl border border-bordo/15 bg-white px-3.5 py-2.5 text-[1rem] text-madeira shadow-[inset_0_1px_2px_rgb(43_26_23/0.04)] outline-none transition-[border-color,box-shadow] placeholder:text-taupe-ink/60 hover:border-bordo/30 focus:border-bordo/60 focus:ring-3 focus:ring-rosa/20 disabled:cursor-not-allowed disabled:bg-creme/60 disabled:text-taupe-ink [[data-invalido]_&]:border-erro/60 [[data-invalido]_&]:ring-erro/15";

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
      className="flex min-h-11 w-full items-center justify-between gap-4 rounded-xl px-1 py-1 text-left"
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
  primario: "bg-bordo text-creme shadow-[0_8px_18px_-12px_rgb(74_32_41/0.8)] hover:bg-bordo-escuro",
  secundario: "border border-bordo/20 bg-white text-bordo hover:border-bordo/45 hover:bg-creme/50",
  perigo: "bg-erro text-white hover:bg-[#7f2222]",
  fantasma: "text-bordo hover:bg-bordo/[0.06]",
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
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[0.92rem] font-semibold transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:active:scale-100 motion-reduce:active:scale-100 ${estilosBotao[variante]} ${className}`}
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
            <h2 className="font-display text-[1.65rem] font-semibold text-bordo">{titulo}</h2>
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
  apenasAviso = false,
  perigosa = true,
  onConfirmar,
  onCancelar,
}: {
  aberta: boolean;
  titulo: string;
  texto: string;
  rotuloConfirmar?: string;
  /** Só informa (um botão, sem ação destrutiva). */
  apenasAviso?: boolean;
  /** Ação destrutiva (botão vermelho). */
  perigosa?: boolean;
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
        apenasAviso ? (
          <BotaoAdmin onClick={onConfirmar}>{rotuloConfirmar}</BotaoAdmin>
        ) : (
          <>
            <BotaoAdmin variante="secundario" onClick={onCancelar}>
              Cancelar
            </BotaoAdmin>
            <BotaoAdmin variante={perigosa ? "perigo" : "primario"} onClick={onConfirmar}>
              {perigosa && <Trash className="size-4" aria-hidden="true" />}
              {rotuloConfirmar}
            </BotaoAdmin>
          </>
        )
      }
    >
      <p className="leading-relaxed text-taupe-ink">{texto}</p>
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
      <p className="mt-0.5 text-[0.8rem] text-taupe-ink">JPG, PNG ou WEBP. A foto é reduzida automaticamente.</p>
      <div className="mt-2 flex items-center gap-4">
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
            <span className="absolute inset-0 grid place-items-center bg-papel/70" role="status">
              <LoaderCircle className="size-6 animate-spin text-bordo" aria-hidden="true" />
              <span className="sr-only">Preparando a foto…</span>
            </span>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <BotaoAdmin variante="secundario" disabled={carregando} onClick={() => entrada.current?.click()}>
            <ImagePlus className="size-4" aria-hidden="true" />
            {carregando ? "Preparando…" : foto ? "Trocar foto" : "Enviar foto"}
          </BotaoAdmin>
          {foto && (
            <button type="button" onClick={() => onMudar(null)} className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-2 text-[0.85rem] font-semibold text-erro hover:bg-erro-fundo">
              <Trash className="size-3.5" aria-hidden="true" /> Remover foto
            </button>
          )}
        </div>
        <input ref={entrada} type="file" accept="image/*" className="hidden" onChange={escolher} />
      </div>
      {erro && (
        <p role="alert" className="mt-2 text-[0.85rem] font-semibold text-erro">
          {erro}
        </p>
      )}
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
  const aviso = (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-4 lg:bottom-8">
      {msg && (
        <div
          role={msg.erro ? "alert" : "status"}
          className={`flex max-w-md items-center gap-2.5 rounded-full py-3 pl-3.5 pr-5 text-[0.92rem] font-semibold shadow-xl motion-safe:animate-[entrar_0.4s_var(--ease-suave)_both] ${
            msg.erro ? "bg-erro text-white" : "bg-madeira text-creme"
          }`}
        >
          <span className={`grid size-6 shrink-0 place-items-center rounded-full ${msg.erro ? "bg-white/20" : "bg-[#5f8a5b]"}`} aria-hidden="true">
            {msg.erro ? <Info className="size-3.5" /> : <Check className="size-3.5" strokeWidth={3} />}
          </span>
          {msg.texto}
        </div>
      )}
    </div>
  );

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
    <div className="flex flex-col gap-5 border-b border-bordo/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[2.25rem] leading-[1.05] text-bordo sm:text-[2.75rem]">{titulo}</h1>
        {texto && <p className="mt-2 max-w-2xl text-[0.98rem] leading-relaxed text-taupe-ink">{texto}</p>}
      </div>
      {acao && <div className="shrink-0">{acao}</div>}
    </div>
  );
}
