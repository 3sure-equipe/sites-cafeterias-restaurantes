"use client";

import { Clock, MapPin } from "lucide-react";
import { linkWhatsapp, mapsBuscaUrl, site } from "@/data/site";
import { useDados } from "@/lib/dados/store";
import { Botao, LinkTexto } from "@/components/ui/Botao";
import { BotaoWhatsapp } from "@/components/ui/BotaoWhatsapp";
import { IconeInstagram } from "@/components/ui/Icones";
import { Pendente } from "@/components/ui/Pendente";
import { Mapa } from "./Mapa";

/** Parte da localização que vem do painel (endereço, horários, WhatsApp). */
export function LocalizacaoInfo() {
  const { info } = useDados();
  const confirmados = info.horarios.some((h) => h.horario);

  return (
    <>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-[1.75rem] bg-creme p-6 ring-1 ring-bordo/10">
          <h3 className="rotulo flex items-center gap-2.5 text-rosa-ink">
            <MapPin className="size-4" aria-hidden="true" /> Endereço
          </h3>
          <address className="mt-4 not-italic">
            {info.endereco ? (
              <p className="text-lg text-madeira">{info.endereco}</p>
            ) : (
              <p className="flex flex-wrap items-center gap-2 text-lg text-madeira">
                Rua e número <Pendente />
              </p>
            )}
            <p className="mt-1 text-taupe-ink">
              {info.cidade} – {info.estado}
            </p>
          </address>
          <LinkTexto href={mapsBuscaUrl(info.endereco)} externo className="mt-5">
            {info.endereco ? "Traçar rota no Google Maps" : "Buscar no Google Maps"}
          </LinkTexto>
        </div>

        <div className="rounded-[1.75rem] bg-creme p-6 ring-1 ring-bordo/10">
          <h3 className="rotulo flex items-center gap-2.5 text-rosa-ink">
            <Clock className="size-4" aria-hidden="true" /> Horários
          </h3>
          <dl className="mt-4 space-y-1.5 text-[0.95rem]">
            {info.horarios.map((h) => (
              <div key={h.dia} className="flex justify-between gap-4 border-b border-dotted border-bordo/15 pb-1.5">
                <dt className="text-taupe-ink">{h.dia}</dt>
                <dd className={`font-semibold ${h.horario ? "text-madeira" : "text-taupe-ink"}`}>
                  {h.horario ?? (confirmados ? "Fechado" : "—")}
                  {!h.horario && !confirmados && <span className="sr-only">a confirmar</span>}
                </dd>
              </div>
            ))}
          </dl>
          {!confirmados && (
            <div className="mt-4">
              <Pendente>Horários a confirmar</Pendente>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <BotaoWhatsapp href={linkWhatsapp(info.whatsappMensagem, info.whatsapp)}>WhatsApp {info.whatsappExibicao}</BotaoWhatsapp>
        <Botao href={site.instagram.url} externo variante="secundario" icone={<IconeInstagram className="size-5" />}>
          {site.instagram.usuario}
        </Botao>
      </div>

      <div className="mt-10">
        <Mapa endereco={info.endereco} />
      </div>
    </>
  );
}
