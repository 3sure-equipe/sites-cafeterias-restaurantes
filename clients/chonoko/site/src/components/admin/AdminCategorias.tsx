"use client";

import { ArrowDown, ArrowUp, Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { acoes, useDados } from "@/lib/dados/store";
import type { Categoria, GrupoCardapio, IconeCategoria } from "@/lib/dados/tipos";
import { slug } from "@/lib/formatos";
import { iconesCategoria } from "@/components/ui/Icones";
import { BotaoAdmin, CabecalhoPagina, Campo, Confirmacao, estiloEntrada, Janela, useAviso } from "./ui";

const icones = Object.keys(iconesCategoria).filter((k) => k !== "ambiente") as IconeCategoria[];

export function AdminCategorias() {
  const { categorias, produtos } = useDados();
  const [editando, setEditando] = useState<Categoria | null>(null);
  const [excluindo, setExcluindo] = useState<Categoria | null>(null);
  const { aviso, salvar } = useAviso();
  const qtd = (id: string) => produtos.filter((p) => p.categoriaId === id).length;

  const nova = (grupo: GrupoCardapio): Categoria => ({
    id: "",
    nome: "",
    grupo,
    icone: grupo === "loja" ? "bombom" : "docinho",
    descricao: "",
    ordem: Math.max(0, ...categorias.filter((c) => c.grupo === grupo).map((c) => c.ordem)) + 1,
  });

  return (
    <>
      <CabecalhoPagina titulo="Categorias" texto="Organize como os produtos aparecem no cardápio. Use as setas para mudar a ordem." />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {(["loja", "encomenda"] as const).map((g) => {
          const lista = categorias.filter((c) => c.grupo === g).sort((a, b) => a.ordem - b.ordem);
          return (
            <section key={g} aria-labelledby={`cat-${g}`} className="rounded-2xl bg-white p-4 ring-1 ring-bordo/10 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 id={`cat-${g}`} className="font-display text-2xl font-semibold text-bordo">
                  {g === "loja" ? "Loja (pronta entrega)" : "Doces finos (encomenda)"}
                </h2>
                <BotaoAdmin variante="secundario" className="!min-h-10 !px-4" onClick={() => setEditando(nova(g))}>
                  <Plus className="size-4" aria-hidden="true" /> Nova
                </BotaoAdmin>
              </div>
              <ol className="mt-4 divide-y divide-bordo/10">
                {lista.map((c, i) => {
                  const Icone = iconesCategoria[c.icone];
                  return (
                    <li key={c.id} className="flex items-center gap-2 py-2.5">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blush text-rosa-ink">
                        <Icone className="size-[1.1rem]" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{c.nome}</p>
                        <p className="text-[0.8rem] text-taupe-ink">
                          {qtd(c.id)} {qtd(c.id) === 1 ? "produto" : "produtos"}
                        </p>
                      </div>
                      <button type="button" disabled={i === 0} onClick={() => salvar(() => acoes.moverCategoria(c.id, -1), "Ordem atualizada")} className="grid size-10 place-items-center rounded-full hover:bg-creme disabled:opacity-25" aria-label={`Subir ${c.nome}`}>
                        <ArrowUp className="size-4" />
                      </button>
                      <button type="button" disabled={i === lista.length - 1} onClick={() => salvar(() => acoes.moverCategoria(c.id, 1), "Ordem atualizada")} className="grid size-10 place-items-center rounded-full hover:bg-creme disabled:opacity-25" aria-label={`Descer ${c.nome}`}>
                        <ArrowDown className="size-4" />
                      </button>
                      <button type="button" onClick={() => setEditando(c)} className="grid size-10 place-items-center rounded-full text-bordo hover:bg-creme" aria-label={`Editar ${c.nome}`}>
                        <Pencil className="size-4" />
                      </button>
                      <button type="button" onClick={() => setExcluindo(c)} className="grid size-10 place-items-center rounded-full text-[#9b2c2c] hover:bg-[#fbe9e9]" aria-label={`Excluir ${c.nome}`}>
                        <Trash className="size-4" />
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>

      {editando && (
        <FormCategoria
          inicial={editando}
          onFechar={() => setEditando(null)}
          onSalvar={(c) => {
            const id = c.id || `${slug(c.nome)}-${acoes.novoId("c").slice(-4)}`;
            if (salvar(() => acoes.salvarCategoria({ ...c, id }), "Categoria salva")) setEditando(null);
          }}
        />
      )}

      {excluindo && qtd(excluindo.id) > 0 ? (
        <Confirmacao
          aberta
          titulo="Esta categoria tem produtos"
          texto={`“${excluindo.nome}” tem ${qtd(excluindo.id)} produto(s). Mova ou exclua esses produtos no Cardápio antes de excluir a categoria.`}
          rotuloConfirmar="Entendi"
          onCancelar={() => setExcluindo(null)}
          onConfirmar={() => setExcluindo(null)}
        />
      ) : (
        <Confirmacao
          aberta={!!excluindo}
          titulo="Excluir categoria?"
          texto={`A categoria “${excluindo?.nome}” será removida do cardápio.`}
          onCancelar={() => setExcluindo(null)}
          onConfirmar={() => {
            if (excluindo) salvar(() => acoes.removerCategoria(excluindo.id), "Categoria excluída");
            setExcluindo(null);
          }}
        />
      )}
      {aviso}
    </>
  );
}

function FormCategoria({ inicial, onFechar, onSalvar }: { inicial: Categoria; onFechar: () => void; onSalvar: (c: Categoria) => void }) {
  const [c, setC] = useState(inicial);
  const [erro, setErro] = useState<string | null>(null);
  return (
    <Janela
      aberta
      titulo={inicial.id ? "Editar categoria" : "Nova categoria"}
      onFechar={onFechar}
      largura="max-w-lg"
      rodape={
        <>
          <BotaoAdmin variante="secundario" onClick={onFechar}>
            Cancelar
          </BotaoAdmin>
          <BotaoAdmin onClick={() => (c.nome.trim() ? onSalvar({ ...c, nome: c.nome.trim() }) : setErro("Informe o nome da categoria."))}>
            Salvar
          </BotaoAdmin>
        </>
      }
    >
      <div className="space-y-5">
        <Campo rotulo="Nome">{(id) => <input id={id} className={estiloEntrada} value={c.nome} maxLength={40} onChange={(e) => setC({ ...c, nome: e.target.value })} />}</Campo>
        <Campo rotulo="Frase de apresentação (opcional)">
          {(id) => <textarea id={id} rows={2} className={estiloEntrada} value={c.descricao ?? ""} maxLength={220} onChange={(e) => setC({ ...c, descricao: e.target.value })} />}
        </Campo>
        <Campo rotulo="Onde aparece">
          {(id) => (
            <select id={id} className={estiloEntrada} value={c.grupo} onChange={(e) => setC({ ...c, grupo: e.target.value as GrupoCardapio })}>
              <option value="loja">Loja (pronta entrega)</option>
              <option value="encomenda">Doces finos (encomenda)</option>
            </select>
          )}
        </Campo>
        <fieldset>
          <legend className="text-[0.9rem] font-semibold">Ícone</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {icones.map((k) => {
              const I = iconesCategoria[k];
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={c.icone === k}
                  aria-label={k}
                  onClick={() => setC({ ...c, icone: k })}
                  className={`grid size-11 place-items-center rounded-full ring-1 transition-colors ${c.icone === k ? "bg-bordo text-creme ring-bordo" : "bg-white text-rosa-ink ring-bordo/15 hover:ring-bordo/40"}`}
                >
                  <I className="size-5" strokeWidth={1.6} />
                </button>
              );
            })}
          </div>
        </fieldset>
        {erro && <p role="alert" className="rounded-xl bg-[#fbe9e9] px-4 py-3 text-[0.9rem] font-semibold text-[#9b2c2c]">{erro}</p>}
      </div>
    </Janela>
  );
}
