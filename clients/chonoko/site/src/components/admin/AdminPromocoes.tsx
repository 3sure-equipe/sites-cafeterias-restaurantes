"use client";

import { CalendarDays, Eye, EyeOff, Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { formatarPreco } from "@/data/cardapio";
import { acoes, statusPublicacao, useDados, useHoje, type StatusPublicacao } from "@/lib/dados/store";
import type { Publicacao, TipoPublicacao } from "@/lib/dados/tipos";
import { lerPreco, precoParaCampo } from "@/lib/formatos";
import { rotuloTipo, textoValidade } from "@/components/sections/NovidadesLista";
import { BotaoAdmin, CabecalhoPagina, Campo, Confirmacao, EnvioFoto, estiloEntrada, Interruptor, Janela, useAviso } from "./ui";

export const estiloStatus: Record<StatusPublicacao, { rotulo: string; classe: string }> = {
  "no-ar": { rotulo: "No ar", classe: "bg-[#e3efe2] text-[#2f5d2c]" },
  agendada: { rotulo: "Agendada", classe: "bg-[#f4ead2] text-[#7a5a12]" },
  encerrada: { rotulo: "Encerrada", classe: "bg-taupe/15 text-taupe-ink" },
  desativada: { rotulo: "Desativada", classe: "bg-taupe/15 text-taupe-ink" },
};

const filtros: { id: StatusPublicacao | "todas"; rotulo: string }[] = [
  { id: "todas", rotulo: "Todas" },
  { id: "no-ar", rotulo: "No ar" },
  { id: "agendada", rotulo: "Agendadas" },
  { id: "encerrada", rotulo: "Encerradas" },
  { id: "desativada", rotulo: "Desativadas" },
];

function nova(): Publicacao {
  return {
    id: acoes.novoId("pub"),
    tipo: "promocao",
    titulo: "",
    descricao: "",
    foto: null,
    precoOriginal: null,
    precoPromocional: null,
    inicio: null,
    fim: null,
    condicoes: "",
    ativo: true,
    criadoEm: new Date().toISOString().slice(0, 10),
  };
}

export function AdminPromocoes() {
  const { publicacoes } = useDados();
  const hoje = useHoje();
  const [filtro, setFiltro] = useState<(typeof filtros)[number]["id"]>("todas");
  const [editando, setEditando] = useState<Publicacao | null>(null);
  const [excluindo, setExcluindo] = useState<Publicacao | null>(null);
  const { aviso, salvar } = useAviso();

  const lista = publicacoes.filter((p) => filtro === "todas" || statusPublicacao(p, hoje) === filtro);

  return (
    <>
      <CabecalhoPagina
        titulo="Promoções e novidades"
        texto="Cadastre promoções, lançamentos e produtos especiais. O que estiver ativo e dentro do período aparece sozinho no site."
        acao={
          <BotaoAdmin onClick={() => setEditando(nova())}>
            <Plus className="size-4" aria-hidden="true" /> Nova publicação
          </BotaoAdmin>
        }
      />

      <div role="tablist" aria-label="Filtrar publicações" className="sem-barra -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {filtros.map((f) => {
          const n = publicacoes.filter((p) => f.id === "todas" || statusPublicacao(p, hoje) === f.id).length;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={filtro === f.id}
              onClick={() => setFiltro(f.id)}
              className={`min-h-10 shrink-0 rounded-full px-4 text-[0.88rem] font-semibold transition-colors ${
                filtro === f.id ? "bg-bordo text-creme" : "bg-white text-madeira ring-1 ring-bordo/10 hover:ring-bordo/30"
              }`}
            >
              {f.rotulo} <span className="opacity-70">({n})</span>
            </button>
          );
        })}
      </div>

      {lista.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-bordo/20 bg-white px-6 py-12 text-center text-taupe-ink">
          Nenhuma publicação neste filtro.
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {lista.map((p) => {
            const st = estiloStatus[statusPublicacao(p, hoje)];
            const validade = textoValidade(p);
            return (
              <li key={p.id} className="flex overflow-hidden rounded-2xl bg-white ring-1 ring-bordo/10">
                <div className="relative w-28 shrink-0 bg-blush sm:w-36">
                  {p.foto && (
                    // eslint-disable-next-line @next/next/no-img-element -- miniatura do painel (pode ser data URL)
                    <img src={p.foto} alt="" className="absolute inset-0 size-full object-cover" />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-[0.72rem] font-bold ${st.classe}`}>{st.rotulo}</span>
                    <span className="rounded-full bg-creme px-2.5 py-0.5 text-[0.72rem] font-semibold text-madeira">{rotuloTipo[p.tipo]}</span>
                    {p.demo && (
                      <span className="rounded-full border border-dashed border-rosa/60 px-2 py-0.5 text-[0.68rem] font-semibold text-rosa-ink">
                        Exemplo
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 font-display text-[1.45rem] font-semibold leading-tight text-bordo">{p.titulo || "Sem título"}</h2>
                  {p.precoPromocional !== null && (
                    <p className="mt-1 text-[0.9rem]">
                      {p.precoOriginal !== null && <span className="mr-2 text-taupe-ink line-through">{formatarPreco(p.precoOriginal)}</span>}
                      <strong className="text-bordo">{formatarPreco(p.precoPromocional)}</strong>
                    </p>
                  )}
                  {validade && (
                    <p className="mt-1 flex items-center gap-1.5 text-[0.82rem] text-taupe-ink">
                      <CalendarDays className="size-3.5" aria-hidden="true" /> {validade}
                    </p>
                  )}
                  <div className="mt-auto flex flex-wrap items-center gap-1 pt-3">
                    <BotaoAdmin variante="fantasma" className="!min-h-10 !px-3" onClick={() => setEditando(p)}>
                      <Pencil className="size-4" aria-hidden="true" /> Editar
                    </BotaoAdmin>
                    <BotaoAdmin
                      variante="fantasma"
                      className="!min-h-10 !px-3"
                      onClick={() => salvar(() => acoes.salvarPublicacao({ ...p, ativo: !p.ativo }), p.ativo ? "Publicação desativada" : "Publicação ativada")}
                    >
                      {p.ativo ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
                      {p.ativo ? "Desativar" : "Ativar"}
                    </BotaoAdmin>
                    <BotaoAdmin variante="fantasma" className="!min-h-10 !px-3 !text-[#9b2c2c]" onClick={() => setExcluindo(p)}>
                      <Trash className="size-4" aria-hidden="true" /> Excluir
                    </BotaoAdmin>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {editando && (
        <FormPublicacao
          inicial={editando}
          onFechar={() => setEditando(null)}
          onSalvar={(p) => {
            if (salvar(() => acoes.salvarPublicacao(p), "Publicação salva")) setEditando(null);
          }}
        />
      )}

      <Confirmacao
        aberta={!!excluindo}
        titulo="Excluir publicação?"
        texto={`“${excluindo?.titulo}” será removida do painel e do site. Se quiser só tirar do ar por um tempo, use “Desativar”.`}
        onCancelar={() => setExcluindo(null)}
        onConfirmar={() => {
          if (excluindo) salvar(() => acoes.removerPublicacao(excluindo.id), "Publicação excluída");
          setExcluindo(null);
        }}
      />
      {aviso}
    </>
  );
}

const tipos: { id: TipoPublicacao; rotulo: string; ajuda: string }[] = [
  { id: "promocao", rotulo: "Promoção", ajuda: "Preço especial por tempo limitado" },
  { id: "novidade", rotulo: "Novidade", ajuda: "Lançamento ou aviso" },
  { id: "especial", rotulo: "Produto especial", ajuda: "Destaque da temporada" },
];

function FormPublicacao({ inicial, onFechar, onSalvar }: { inicial: Publicacao; onFechar: () => void; onSalvar: (p: Publicacao) => void }) {
  const [p, setP] = useState(inicial);
  const [precoDe, setPrecoDe] = useState(precoParaCampo(inicial.precoOriginal));
  const [precoPor, setPrecoPor] = useState(precoParaCampo(inicial.precoPromocional));
  const [erro, setErro] = useState<string | null>(null);
  const muda = <K extends keyof Publicacao>(k: K, v: Publicacao[K]) => setP((a) => ({ ...a, [k]: v }));
  const novo = !inicial.titulo;

  function enviar() {
    if (!p.titulo.trim()) return setErro("Dê um título para a publicação.");
    if (p.inicio && p.fim && p.fim < p.inicio) return setErro("A data de término precisa ser depois da data de início.");
    const de = lerPreco(precoDe);
    const por = lerPreco(precoPor);
    if (de !== null && por !== null && por >= de) return setErro("O preço promocional deve ser menor que o preço normal.");
    onSalvar({ ...p, titulo: p.titulo.trim(), precoOriginal: de, precoPromocional: por, demo: false });
  }

  return (
    <Janela
      aberta
      titulo={novo ? "Nova publicação" : "Editar publicação"}
      onFechar={onFechar}
      largura="max-w-3xl"
      rodape={
        <>
          <BotaoAdmin variante="secundario" onClick={onFechar}>
            Cancelar
          </BotaoAdmin>
          <BotaoAdmin onClick={enviar}>{novo ? "Publicar" : "Salvar alterações"}</BotaoAdmin>
        </>
      }
    >
      <div className="space-y-6">
        <fieldset>
          <legend className="text-[0.9rem] font-semibold">Tipo</legend>
          <div className="mt-1.5 grid gap-2 sm:grid-cols-3">
            {tipos.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={p.tipo === t.id}
                onClick={() => muda("tipo", t.id)}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  p.tipo === t.id ? "border-bordo bg-bordo text-creme" : "border-bordo/15 bg-white hover:border-bordo/40"
                }`}
              >
                <span className="block font-semibold">{t.rotulo}</span>
                <span className={`block text-[0.78rem] ${p.tipo === t.id ? "text-creme/75" : "text-taupe-ink"}`}>{t.ajuda}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <Campo rotulo="Título">
          {(id) => (
            <input id={id} className={estiloEntrada} value={p.titulo} maxLength={80} onChange={(e) => muda("titulo", e.target.value)} placeholder="Ex.: Semana da trufa" />
          )}
        </Campo>
        <Campo rotulo="Descrição">
          {(id) => (
            <textarea id={id} rows={3} className={estiloEntrada} value={p.descricao} maxLength={280} onChange={(e) => muda("descricao", e.target.value)} />
          )}
        </Campo>

        <EnvioFoto foto={p.foto} onMudar={(f) => muda("foto", f)} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Campo rotulo="Preço normal (opcional)" ajuda="Aparece riscado quando há preço promocional.">
            {(id) => <input id={id} inputMode="decimal" className={estiloEntrada} value={precoDe} onChange={(e) => setPrecoDe(e.target.value)} placeholder="0,00" />}
          </Campo>
          <Campo rotulo="Preço promocional (opcional)" ajuda="Deixe em branco se não houver.">
            {(id) => <input id={id} inputMode="decimal" className={estiloEntrada} value={precoPor} onChange={(e) => setPrecoPor(e.target.value)} placeholder="0,00" />}
          </Campo>
          <Campo rotulo="Começa em" ajuda="Em branco: começa agora.">
            {(id) => <input id={id} type="date" className={estiloEntrada} value={p.inicio ?? ""} onChange={(e) => muda("inicio", e.target.value || null)} />}
          </Campo>
          <Campo rotulo="Termina em" ajuda="Em branco: sem data para acabar.">
            {(id) => <input id={id} type="date" className={estiloEntrada} value={p.fim ?? ""} onChange={(e) => muda("fim", e.target.value || null)} />}
          </Campo>
        </div>

        <Campo rotulo="Condições" ajuda="Regras, limites ou observações. Ex.: válido enquanto durarem os estoques.">
          {(id) => <textarea id={id} rows={2} className={estiloEntrada} value={p.condicoes} maxLength={240} onChange={(e) => muda("condicoes", e.target.value)} />}
        </Campo>

        <div className="rounded-xl bg-white p-3 ring-1 ring-bordo/10">
          <Interruptor ligado={p.ativo} onMudar={(v) => muda("ativo", v)} rotulo="Mostrar no site" descricao="Desligue para guardar sem publicar." />
        </div>

        {erro && (
          <p role="alert" className="rounded-xl bg-[#fbe9e9] px-4 py-3 text-[0.9rem] font-semibold text-[#9b2c2c]">
            {erro}
          </p>
        )}
      </div>
    </Janela>
  );
}
