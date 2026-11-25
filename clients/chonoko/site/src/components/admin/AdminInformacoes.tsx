"use client";

import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { linkWhatsapp } from "@/data/site";
import { acoes, useDados } from "@/lib/dados/store";
import type { InfoLoja } from "@/lib/dados/tipos";
import { normalizarWhatsapp } from "@/lib/formatos";
import { BotaoAdmin, CabecalhoPagina, Campo, estiloEntrada, useAviso } from "./ui";

export function AdminInformacoes() {
  const { info } = useDados();
  // A chave reinicia o formulário quando os dados são restaurados
  return <Formulario key={JSON.stringify(info)} inicial={info} />;
}

function Formulario({ inicial }: { inicial: InfoLoja }) {
  const [f, setF] = useState(inicial);
  const { aviso, salvar } = useAviso();
  const numero = normalizarWhatsapp(f.whatsapp);
  const numeroValido = /^55\d{10,11}$/.test(numero);
  const mudou = JSON.stringify(f) !== JSON.stringify(inicial);

  return (
    <>
      <CabecalhoPagina titulo="Contato e horários" texto="Estas informações aparecem na seção de localização, nos botões de WhatsApp e no rodapé." />

      <form
        className="mt-8 grid gap-6 lg:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!numeroValido) return;
          salvar(() => acoes.salvarInfo({ ...f, whatsapp: numero, endereco: f.endereco?.trim() || null }));
        }}
      >
        <section className="space-y-5 rounded-2xl bg-white p-5 ring-1 ring-bordo/10 sm:p-6">
          <h2 className="font-display text-2xl font-semibold text-bordo">WhatsApp</h2>
          <Campo rotulo="Número" ajuda="Com DDD. Ex.: (51) 99669-5981">
            {(id) => (
              <input
                id={id}
                inputMode="tel"
                className={estiloEntrada}
                value={f.whatsappExibicao}
                onChange={(e) => setF({ ...f, whatsappExibicao: e.target.value, whatsapp: normalizarWhatsapp(e.target.value) })}
              />
            )}
          </Campo>
          {!numeroValido && <p className="text-[0.85rem] font-semibold text-[#9b2c2c]">Número incompleto. Use DDD + número.</p>}
          <Campo rotulo="Mensagem inicial" ajuda="Texto que já aparece escrito quando o cliente abre a conversa.">
            {(id) => <textarea id={id} rows={3} className={estiloEntrada} value={f.whatsappMensagem} onChange={(e) => setF({ ...f, whatsappMensagem: e.target.value })} />}
          </Campo>
          <a
            href={linkWhatsapp(f.whatsappMensagem, numero)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-bordo underline-offset-4 hover:underline"
          >
            Testar link do WhatsApp <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </section>

        <section className="space-y-5 rounded-2xl bg-white p-5 ring-1 ring-bordo/10 sm:p-6">
          <h2 className="font-display text-2xl font-semibold text-bordo">Endereço</h2>
          <Campo rotulo="Rua, número e bairro" ajuda="Enquanto estiver vazio, o site mostra “a confirmar”.">
            {(id) => <input id={id} className={estiloEntrada} value={f.endereco ?? ""} placeholder="Ex.: Rua ..., 123 – Centro" onChange={(e) => setF({ ...f, endereco: e.target.value })} />}
          </Campo>
          <div className="grid grid-cols-[1fr_5rem] gap-3">
            <Campo rotulo="Cidade">{(id) => <input id={id} className={estiloEntrada} value={f.cidade} onChange={(e) => setF({ ...f, cidade: e.target.value })} />}</Campo>
            <Campo rotulo="UF">{(id) => <input id={id} className={estiloEntrada} maxLength={2} value={f.estado} onChange={(e) => setF({ ...f, estado: e.target.value.toUpperCase() })} />}</Campo>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 ring-1 ring-bordo/10 sm:p-6 lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold text-bordo">Horário de funcionamento</h2>
          <p className="mt-1 text-[0.85rem] text-taupe-ink">Ex.: “9h às 19h”. Escreva “Fechado” nos dias sem atendimento. Vazio = a confirmar.</p>
          <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {f.horarios.map((h, i) => (
              <Campo key={h.dia} rotulo={h.dia}>
                {(id) => (
                  <input
                    id={id}
                    className={estiloEntrada}
                    value={h.horario ?? ""}
                    placeholder="a confirmar"
                    onChange={(e) => setF({ ...f, horarios: f.horarios.map((x, k) => (k === i ? { ...x, horario: e.target.value || null } : x)) })}
                  />
                )}
              </Campo>
            ))}
          </div>
        </section>

        <div className="sticky bottom-20 z-10 flex justify-end gap-2 lg:bottom-4 lg:col-span-2">
          {mudou && (
            <BotaoAdmin variante="secundario" onClick={() => setF(inicial)}>
              Desfazer
            </BotaoAdmin>
          )}
          <BotaoAdmin type="submit" disabled={!mudou || !numeroValido} className="shadow-lg">
            Salvar alterações
          </BotaoAdmin>
        </div>
      </form>
      {aviso}
    </>
  );
}
