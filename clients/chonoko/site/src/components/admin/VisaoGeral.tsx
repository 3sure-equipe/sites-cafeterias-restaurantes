"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Megaphone, RotateCcw, Tags } from "lucide-react";
import { useState } from "react";
import { acoes, statusPublicacao, useDados, useHoje } from "@/lib/dados/store";
import { BotaoAdmin, Confirmacao, useAviso } from "./ui";

export function VisaoGeral() {
  const { produtos, categorias, publicacoes, info } = useDados();
  const hoje = useHoje();
  const [restaurar, setRestaurar] = useState(false);
  const { aviso, salvar } = useAviso();

  const noAr = publicacoes.filter((p) => statusPublicacao(p, hoje) === "no-ar").length;
  const semFoto = produtos.filter((p) => !p.foto);
  const catsVazias = categorias.filter((c) => !produtos.some((p) => p.categoriaId === c.id));

  const pendencias = [
    !info.endereco && { texto: "Endereço da loja ainda não informado", href: "/admin/informacoes" },
    !info.horarios.some((h) => h.horario) && { texto: "Horário de funcionamento ainda não informado", href: "/admin/informacoes" },
    ...catsVazias.map((c) => ({ texto: `Categoria “${c.nome}” está sem produtos`, href: "/admin/cardapio" })),
    semFoto.length > 0 && { texto: `${semFoto.length} produto(s) sem foto: ${semFoto.map((p) => p.nome).join(", ")}`, href: "/admin/cardapio" },
    publicacoes.some((p) => p.demo) && { texto: "Há publicações de exemplo: substitua pelas reais ou exclua", href: "/admin/promocoes" },
  ].filter(Boolean) as { texto: string; href: string }[];

  const cartoes = [
    { rotulo: "Produtos no cardápio", valor: produtos.filter((p) => p.disponivel).length, href: "/admin/cardapio", Icone: BookOpen },
    { rotulo: "Categorias", valor: categorias.length, href: "/admin/categorias", Icone: Tags },
    { rotulo: "Publicações no ar", valor: noAr, href: "/admin/promocoes", Icone: Megaphone },
  ];

  return (
    <>
      <p className="rotulo text-rosa-ink">Painel da equipe</p>
      <h1 className="mt-2 text-[2.25rem] leading-[1.05] text-bordo sm:text-[2.75rem]">Olá, equipe Chonoko.</h1>
      <p className="mt-2 max-w-2xl text-[0.98rem] leading-relaxed text-taupe-ink">Daqui vocês atualizam o site sozinhas: preços, produtos, fotos, promoções e horários.</p>

      <div className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-4">
        {cartoes.map(({ rotulo, valor, href, Icone }) => (
          <Link key={rotulo} href={href} className="group flex flex-col rounded-2xl bg-white p-3.5 ring-1 ring-bordo/10 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgb(43_26_23/0.45)] sm:p-5">
            <Icone className="size-5 text-rosa-ink" aria-hidden="true" />
            <p className="mt-3 font-display text-[2.25rem] font-semibold leading-none text-bordo sm:mt-4 sm:text-5xl">{valor}</p>
            <p className="mt-auto flex items-end justify-between gap-1 pt-2 text-[0.8rem] leading-tight text-taupe-ink sm:text-[0.9rem]">
              {rotulo} <ArrowRight className="hidden size-4 shrink-0 transition-transform group-hover:translate-x-1 sm:block" aria-hidden="true" />
            </p>
          </Link>
        ))}
      </div>

      <h2 className="mt-12 font-display text-[1.75rem] text-bordo">Atalhos</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { href: "/admin/promocoes", titulo: "Criar uma promoção", texto: "Título, foto, preço e validade.", Icone: Megaphone },
          { href: "/admin/cardapio", titulo: "Atualizar preços", texto: "Edite valores e tamanhos.", Icone: BookOpen },
          { href: "/admin/informacoes", titulo: "Mudar horários", texto: "Feriados, novos horários.", Icone: Clock },
        ].map(({ href, titulo, texto, Icone }) => (
          <Link key={titulo} href={href} className="flex items-center gap-4 rounded-2xl bg-bordo p-4 text-creme transition-colors hover:bg-bordo-escuro sm:p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-creme/10">
              <Icone className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold">{titulo}</span>
              <span className="block text-[0.85rem] text-creme/70">{texto}</span>
            </span>
          </Link>
        ))}
      </div>

      <h2 className="mt-12 font-display text-[1.75rem] text-bordo">O que falta completar</h2>
      {pendencias.length === 0 ? (
        <p className="mt-3 text-taupe-ink">Tudo em dia.</p>
      ) : (
        <ul className="mt-4 divide-y divide-bordo/10 overflow-hidden rounded-2xl bg-white ring-1 ring-bordo/10">
          {pendencias.map((p) => (
            <li key={p.texto}>
              <Link href={p.href} className="flex items-center gap-3 px-5 py-4 hover:bg-creme/50">
                <span className="size-2 shrink-0 rounded-full bg-aviso/70" aria-hidden="true" />
                <span className="flex-1 text-[0.95rem] leading-snug">{p.texto}</span>
                <ArrowRight className="size-4 shrink-0 text-taupe-ink" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-12 rounded-2xl border border-dashed border-bordo/20 p-5 sm:p-6">
        <h2 className="font-display text-[1.5rem] text-bordo">Sobre esta demonstração</h2>
        <p className="mt-2 max-w-3xl text-[0.95rem] text-taupe-ink">
          Neste protótipo, tudo o que for alterado fica guardado só neste navegador. Na versão oficial, os dados ficam em um banco
          de dados seguro, com login das proprietárias, e as mudanças aparecem para todos os visitantes.
        </p>
        <BotaoAdmin variante="secundario" className="mt-4" onClick={() => setRestaurar(true)}>
          <RotateCcw className="size-4" aria-hidden="true" /> Restaurar dados originais
        </BotaoAdmin>
      </div>

      <Confirmacao
        aberta={restaurar}
        titulo="Restaurar dados originais?"
        texto="Todas as alterações feitas nesta demonstração serão apagadas e o cardápio volta a ser o dos PDFs."
        rotuloConfirmar="Restaurar"
        perigosa={false}
        onCancelar={() => setRestaurar(false)}
        onConfirmar={() => {
          salvar(() => acoes.restaurarExemplos(), "Dados originais restaurados");
          setRestaurar(false);
        }}
      />
      {aviso}
    </>
  );
}
