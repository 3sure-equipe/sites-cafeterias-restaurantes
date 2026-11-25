"use client";

import { Check, Clock, Copy, MapPin, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { enderecoCompleto, linkWhatsapp, mapsBuscaUrl, site } from "@/data/site";
import { useDados } from "@/lib/dados/store";
import { agruparHorarios, lerPeriodos, nomeDiaHoje } from "@/lib/horarios";
import { classeBotao } from "@/components/ui/Botao";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { IconeInstagram } from "@/components/ui/Icones";
import { Pendente } from "@/components/ui/Pendente";
import { StatusLoja } from "@/components/ui/StatusLoja";
import { Mapa } from "./Mapa";

export function LocalizacaoInfo() {
  const { info } = useDados();
  const [hoje, setHoje] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  const completo = enderecoCompleto(info);
  const grupos = agruparHorarios(info.horarios);
  const algumConfirmado = info.horarios.some((h) => h.horario);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- o dia de hoje só existe no navegador
    setHoje(nomeDiaHoje(new Date()));
  }, []);

  async function copiar() {
    if (!completo) return;
    try {
      await navigator.clipboard.writeText(completo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2400);
    } catch {
      /* sem permissão de área de transferência: nada a fazer */
    }
  }

  return (
    <>
      <div className="mt-10 overflow-hidden rounded-[2rem] bg-creme ring-1 ring-bordo/10">
        {/* Endereço */}
        <div className="p-6 sm:p-8">
          <h3 className="rotulo flex items-center gap-2.5 text-rosa-ink">
            <MapPin className="size-4" aria-hidden="true" /> Endereço
          </h3>
          <address className="mt-4 not-italic">
            {info.endereco ? (
              <>
                <p className="font-display text-[1.9rem] leading-tight text-bordo sm:text-[2.2rem]">{info.endereco.split(" – ")[0]}</p>
                <p className="mt-1.5 text-[1.02rem] text-madeira">
                  {info.endereco.split(" – ")[1] ? `${info.endereco.split(" – ")[1]} · ` : ""}
                  {info.cidade} – {info.estado}
                </p>
                {info.cep && <p className="mt-0.5 text-taupe-ink">CEP {info.cep}</p>}
              </>
            ) : (
              <p className="flex flex-wrap items-center gap-2 text-lg text-madeira">
                {info.cidade} – {info.estado} <Pendente>Endereço a confirmar</Pendente>
              </p>
            )}
          </address>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <a href={mapsBuscaUrl(info)} target="_blank" rel="noopener noreferrer" className={classeBotao("primario")}>
              <Navigation className="size-4" aria-hidden="true" />
              <span>Abrir no Google Maps</span>
              <span className="sr-only">(abre em nova aba)</span>
            </a>
            {completo && (
              <button type="button" onClick={copiar} className={classeBotao("secundario")}>
                {copiado ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                <span aria-live="polite">{copiado ? "Endereço copiado" : "Copiar endereço"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Horários */}
        <div className="border-t border-bordo/10 bg-papel/60 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="rotulo flex items-center gap-2.5 text-rosa-ink">
              <Clock className="size-4" aria-hidden="true" /> Horário de funcionamento
            </h3>
            {algumConfirmado && <StatusLoja />}
          </div>

          <table className="mt-5 w-full text-left">
            <caption className="sr-only">Horários de funcionamento por dia, com os períodos da manhã e da tarde</caption>
            <thead>
              <tr className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-taupe-ink">
                <th scope="col" className="pb-2 font-semibold">Dia</th>
                <th scope="col" className="pb-2 font-semibold">Manhã</th>
                <th scope="col" className="pb-2 font-semibold">Tarde</th>
              </tr>
            </thead>
            <tbody>
              {grupos.map((g) => {
                const periodos = lerPeriodos(g.horario);
                const ehHoje = hoje !== null && g.dias.includes(hoje);
                return (
                  <tr key={g.rotulo} className={`border-t border-bordo/10 ${ehHoje ? "bg-blush/50" : ""}`}>
                    <th scope="row" className={`py-3 pl-2 pr-3 align-top font-semibold ${ehHoje ? "text-bordo" : "text-madeira"}`}>
                      <span className="sm:hidden" aria-hidden="true">{g.curto}</span>
                      <span className="max-sm:sr-only">{g.rotulo}</span>
                      {ehHoje && (
                        <span className="mt-1 block w-fit rounded-full bg-bordo px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-creme sm:ml-2 sm:mt-0 sm:inline">
                          Hoje
                        </span>
                      )}
                    </th>
                    {g.horario === null ? (
                      <td colSpan={2} className="py-3 align-top text-[0.92rem] italic text-taupe-ink">
                        Horário não informado
                      </td>
                    ) : periodos.length === 2 ? (
                      periodos.map((p) => (
                        <td key={p.texto} className="whitespace-nowrap py-3 pr-2 align-top text-[0.95rem] tabular-nums text-madeira">
                          {p.texto.replace(" às ", "–")}
                        </td>
                      ))
                    ) : (
                      <td colSpan={2} className="py-3 align-top tabular-nums text-madeira">
                        {/* Um período só (ou formato livre): mostra no mesmo padrão "9h–13h" */}
                        {periodos.length ? periodos.map((p) => p.texto.replace(" às ", "–")).join(" · ") : g.horario}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!algumConfirmado && (
            <div className="mt-4">
              <Pendente>Horários a confirmar</Pendente>
            </div>
          )}
        </div>

        {/* Contato */}
        <div className="flex flex-col gap-2.5 border-t border-bordo/10 p-6 sm:flex-row sm:flex-wrap sm:p-8">
          <BotaoWhatsapp href={linkWhatsapp(info.whatsappMensagem, info.whatsapp)}>WhatsApp {info.whatsappExibicao}</BotaoWhatsapp>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={classeBotao("secundario")}>
            <IconeInstagram className="size-5" />
            <span>{site.instagram.usuario}</span>
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>
      </div>

      <div className="mt-6">
        <Mapa info={info} />
      </div>
    </>
  );
}
