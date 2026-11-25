"use client";

import { Pencil, Plus, Search, Trash, X } from "lucide-react";
import { useMemo, useState } from "react";
import { formatarPreco } from "@/data/cardapio";
import { acoes, useDados } from "@/lib/dados/store";
import type { Categoria, GrupoCardapio, Produto, Variacao } from "@/lib/dados/tipos";
import { lerPreco, precoParaCampo } from "@/lib/formatos";
import { BotaoAdmin, CabecalhoPagina, Campo, Confirmacao, EnvioFoto, estiloEntrada, Interruptor, Janela, useAviso } from "./ui";

const nomesGrupo: Record<GrupoCardapio, string> = { loja: "Loja (pronta entrega)", encomenda: "Doces finos (encomenda)" };

export function resumoPrecos(p: Produto) {
  return p.variacoes.map((v) => (v.rotulo ? `${v.rotulo} ${formatarPreco(v.preco)}` : formatarPreco(v.preco))).join(" · ");
}

export function AdminCardapio() {
  const { produtos, categorias } = useDados();
  const [grupo, setGrupo] = useState<GrupoCardapio>("loja");
  const [categoriaId, setCategoriaId] = useState<string>("todas");
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState<Produto | null>(null);
  const [excluindo, setExcluindo] = useState<Produto | null>(null);
  const { aviso, salvar } = useAviso();

  const cats = useMemo(() => categorias.filter((c) => c.grupo === grupo).sort((a, b) => a.ordem - b.ordem), [categorias, grupo]);
  const catPorId = useMemo(() => new Map(categorias.map((c) => [c.id, c])), [categorias]);
  const termo = busca.trim().toLowerCase();
  const lista = produtos
    .filter((p) => {
      const c = catPorId.get(p.categoriaId);
      if (termo) return p.nome.toLowerCase().includes(termo);
      return c?.grupo === grupo && (categoriaId === "todas" || p.categoriaId === categoriaId);
    })
    .sort((a, b) => (catPorId.get(a.categoriaId)?.ordem ?? 0) - (catPorId.get(b.categoriaId)?.ordem ?? 0) || a.ordem - b.ordem);

  function novoProduto(): Produto {
    const cat = categoriaId !== "todas" ? categoriaId : cats[0]?.id;
    return {
      id: acoes.novoId("produto"),
      categoriaId: cat ?? "",
      nome: "",
      descricao: "",
      variacoes: [{ rotulo: grupo === "encomenda" ? "100 unidades" : null, preco: null }],
      foto: null,
      disponivel: true,
      ordem: Math.max(0, ...produtos.map((p) => p.ordem)) + 1,
    };
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Cardápio"
        texto={`${produtos.length} produtos cadastrados. Altere preços, descrições e fotos; as mudanças aparecem na hora no site.`}
        acao={
          <BotaoAdmin onClick={() => setEditando(novoProduto())}>
            <Plus className="size-4" aria-hidden="true" /> Novo produto
          </BotaoAdmin>
        }
      />

      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="inline-grid grid-cols-2 rounded-full bg-white p-1 ring-1 ring-bordo/10" role="tablist" aria-label="Cardápio">
          {(["loja", "encomenda"] as const).map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={grupo === g && !termo}
              onClick={() => {
                setGrupo(g);
                setCategoriaId("todas");
                setBusca("");
              }}
              className={`min-h-10 rounded-full px-4 text-[0.88rem] font-semibold ${grupo === g && !termo ? "bg-bordo text-creme" : "text-madeira"}`}
            >
              {g === "loja" ? "Loja" : "Doces finos"}
            </button>
          ))}
        </div>
        <label className="relative flex-1">
          <span className="sr-only">Buscar produto</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-taupe-ink" aria-hidden="true" />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar produto pelo nome" className={`${estiloEntrada} !rounded-full pl-10`} />
          {busca && (
            <button type="button" onClick={() => setBusca("")} className="absolute right-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full hover:bg-creme" aria-label="Limpar busca">
              <X className="size-4" />
            </button>
          )}
        </label>
        {!termo && (
          <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} className={`${estiloEntrada} !rounded-full lg:w-64`} aria-label="Filtrar por categoria">
            <option value="todas">Todas as categorias</option>
            {cats.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        )}
      </div>

      <p className="mt-6 text-[0.85rem] text-taupe-ink" aria-live="polite">
        {lista.length} {lista.length === 1 ? "produto" : "produtos"}
        {termo ? ` encontrados para “${busca.trim()}”` : ""}
      </p>
      <ul className="mt-2 divide-y divide-bordo/10 overflow-hidden rounded-2xl bg-white ring-1 ring-bordo/10">
        {lista.length === 0 && <li className="px-6 py-12 text-center text-taupe-ink">Nenhum produto encontrado.</li>}
        {lista.map((p) => (
          <li key={p.id} className={`flex items-center gap-3 px-3 py-3 sm:gap-4 sm:px-5 ${p.disponivel ? "" : "bg-creme/40"}`}>
            <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-blush sm:size-16">
              {p.foto && (
                // eslint-disable-next-line @next/next/no-img-element -- miniatura do painel
                <img src={p.foto} alt="" loading="lazy" className={`size-full object-cover ${p.disponivel ? "" : "opacity-50 grayscale"}`} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-madeira">{p.nome}</p>
              <p className="truncate text-[0.82rem] tabular-nums text-taupe-ink">
                {catPorId.get(p.categoriaId)?.nome ?? "Sem categoria"} · {resumoPrecos(p)}
              </p>
              {!p.disponivel && (
                <span className="mt-1 inline-block rounded-full bg-taupe/15 px-2 py-0.5 text-[0.72rem] font-bold text-taupe-ink">Oculto no site</span>
              )}
            </div>
            <div className="hidden sm:block">
              <Interruptor
                ligado={p.disponivel}
                onMudar={(v) => salvar(() => acoes.salvarProduto({ ...p, disponivel: v }), v ? "Produto visível no site" : "Produto ocultado do site")}
                rotulo="No site"
              />
            </div>
            <button type="button" onClick={() => setEditando(p)} className="grid size-11 shrink-0 place-items-center rounded-full text-bordo hover:bg-creme" aria-label={`Editar ${p.nome}`}>
              <Pencil className="size-[1.1rem]" />
            </button>
            <button type="button" onClick={() => setExcluindo(p)} className="grid size-11 shrink-0 place-items-center rounded-full text-erro hover:bg-erro-fundo" aria-label={`Excluir ${p.nome}`}>
              <Trash className="size-[1.1rem]" />
            </button>
          </li>
        ))}
      </ul>

      {editando && (
        <FormProduto
          inicial={editando}
          categorias={categorias}
          onFechar={() => setEditando(null)}
          onSalvar={(p) => {
            if (salvar(() => acoes.salvarProduto(p), "Produto salvo")) setEditando(null);
          }}
        />
      )}
      <Confirmacao
        aberta={!!excluindo}
        titulo="Excluir produto?"
        texto={`“${excluindo?.nome}” será removido do cardápio. Para tirar do site só por um tempo, use “No site”.`}
        onCancelar={() => setExcluindo(null)}
        onConfirmar={() => {
          if (excluindo) salvar(() => acoes.removerProduto(excluindo.id), "Produto excluído");
          setExcluindo(null);
        }}
      />
      {aviso}
    </>
  );
}

type VariacaoCampo = { rotulo: string; preco: string };

function FormProduto({
  inicial,
  categorias,
  onFechar,
  onSalvar,
}: {
  inicial: Produto;
  categorias: Categoria[];
  onFechar: () => void;
  onSalvar: (p: Produto) => void;
}) {
  const [p, setP] = useState(inicial);
  const [variacoes, setVariacoes] = useState<VariacaoCampo[]>(
    inicial.variacoes.map((v) => ({ rotulo: v.rotulo ?? "", preco: precoParaCampo(v.preco) })),
  );
  const [selos, setSelos] = useState((inicial.selos ?? []).join(", "));
  const [erros, setErros] = useState<Partial<Record<"nome" | "categoria" | "precos", string>>>({});
  const muda = <K extends keyof Produto>(k: K, v: Produto[K]) => setP((a) => ({ ...a, [k]: v }));
  const novo = !inicial.nome;

  function enviar() {
    const e: typeof erros = {};
    if (!p.nome.trim()) e.nome = "Informe o nome do produto.";
    if (!p.categoriaId) e.categoria = "Escolha uma categoria.";
    if (variacoes.some((v) => v.preco.trim() && lerPreco(v.preco) === null)) e.precos = "Há um preço inválido. Use números, por exemplo 12,50.";
    setErros(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>("dialog[open] [data-invalido] input, dialog[open] [data-invalido] select")?.focus());
      return;
    }
    const vs: Variacao[] = variacoes
      .filter((v) => v.rotulo.trim() || v.preco.trim())
      .map((v) => ({ rotulo: v.rotulo.trim() || null, preco: lerPreco(v.preco) }));
    if (vs.length === 0) vs.push({ rotulo: null, preco: null });
    onSalvar({
      ...p,
      nome: p.nome.trim(),
      descricao: p.descricao?.trim() || undefined,
      variacoes: vs,
      selos: selos.split(",").map((s) => s.trim()).filter(Boolean),
    });
  }

  return (
    <Janela
      aberta
      titulo={novo ? "Novo produto" : "Editar produto"}
      onFechar={onFechar}
      rodape={
        <>
          <BotaoAdmin variante="secundario" onClick={onFechar}>
            Cancelar
          </BotaoAdmin>
          <BotaoAdmin onClick={enviar}>Salvar produto</BotaoAdmin>
        </>
      }
    >
      <div className="space-y-6">
        <Campo rotulo="Nome do produto" erro={erros.nome}>
          {(id) => <input id={id} className={estiloEntrada} value={p.nome} maxLength={90} onChange={(e) => muda("nome", e.target.value)} />}
        </Campo>
        <Campo rotulo="Categoria" erro={erros.categoria}>
          {(id) => (
            <select id={id} className={estiloEntrada} value={p.categoriaId} onChange={(e) => muda("categoriaId", e.target.value)}>
              {(["loja", "encomenda"] as const).map((g) => (
                <optgroup key={g} label={nomesGrupo[g]}>
                  {categorias
                    .filter((c) => c.grupo === g)
                    .sort((a, b) => a.ordem - b.ordem)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          )}
        </Campo>
        <Campo rotulo="Descrição" opcional ajuda="Sabores, ingredientes ou observações.">
          {(id) => <textarea id={id} rows={3} className={estiloEntrada} value={p.descricao ?? ""} maxLength={300} onChange={(e) => muda("descricao", e.target.value)} />}
        </Campo>

        <fieldset data-invalido={erros.precos ? "true" : undefined}>
          <legend className="text-[0.9rem] font-semibold">Tamanhos e preços</legend>
          <p className="text-[0.8rem] text-taupe-ink">Ex.: “50g” e “150g”, ou “100 unidades”. Se houver um preço só, deixe o tamanho em branco. Preço vazio = “sob consulta”.</p>
          <div className="mt-2 space-y-2">
            {variacoes.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  aria-label={`Tamanho ${i + 1}`}
                  className={`${estiloEntrada} flex-1`}
                  placeholder="Tamanho (opcional)"
                  value={v.rotulo}
                  onChange={(e) => setVariacoes((a) => a.map((x, k) => (k === i ? { ...x, rotulo: e.target.value } : x)))}
                />
                <div className="relative w-36">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-taupe-ink">R$</span>
                  <input
                    aria-label={`Preço ${i + 1}`}
                    inputMode="decimal"
                    className={`${estiloEntrada} pl-10`}
                    placeholder="0,00"
                    value={v.preco}
                    onChange={(e) => setVariacoes((a) => a.map((x, k) => (k === i ? { ...x, preco: e.target.value } : x)))}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setVariacoes((a) => a.filter((_, k) => k !== i))}
                  disabled={variacoes.length === 1}
                  className="grid size-11 shrink-0 place-items-center rounded-full text-erro hover:bg-erro-fundo disabled:opacity-30"
                  aria-label={`Remover tamanho ${i + 1}`}
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
          {erros.precos && (
            <p role="alert" className="mt-2 text-[0.83rem] font-semibold text-erro">
              {erros.precos}
            </p>
          )}
          <BotaoAdmin variante="fantasma" className="mt-2 !px-3" onClick={() => setVariacoes((a) => [...a, { rotulo: "", preco: "" }])}>
            <Plus className="size-4" aria-hidden="true" /> Adicionar tamanho
          </BotaoAdmin>
        </fieldset>

        <EnvioFoto foto={p.foto} onMudar={(f) => muda("foto", f)} />

        <Campo rotulo="Selos" opcional ajuda="Separados por vírgula. Ex.: Sazonal, Novidade">
          {(id) => <input id={id} className={estiloEntrada} value={selos} onChange={(e) => setSelos(e.target.value)} />}
        </Campo>

        <div className="divide-y divide-bordo/10 rounded-xl bg-white px-3 ring-1 ring-bordo/10">
          <div className="py-2">
            <Interruptor ligado={p.disponivel} onMudar={(v) => muda("disponivel", v)} rotulo="Mostrar no site" descricao="Desligue quando o produto estiver em falta." />
          </div>
        </div>

      </div>
    </Janela>
  );
}
