"use client";

import { MapPin, MessageCircle } from "lucide-react";
import { linkWhatsapp, mapsBuscaUrl, site } from "@/data/site";
import { useDados } from "@/lib/dados/store";
import { agruparHorarios, lerPeriodos } from "@/lib/horarios";
import { IconeInstagram } from "@/components/ui/Icones";
import { Pendente } from "@/components/ui/Pendente";

/** Endereço e contatos do rodapé — mesma fonte de dados da seção de localização. */
export function RodapeContato() {
  const { info } = useDados();
  return (
    <ul className="mt-4 space-y-3">
      <li>
        {info.endereco ? (
          <a href={mapsBuscaUrl(info)} target="_blank" rel="noopener noreferrer" className="group flex gap-3 transition-colors hover:text-creme">
            <MapPin className="mt-1 size-4 shrink-0 text-rosa-claro" aria-hidden="true" />
            <span className="leading-relaxed">
              <span className="group-hover:underline group-hover:underline-offset-4">{info.endereco.split(" – ")[0]}</span>
              <br />
              {info.endereco.split(" – ")[1] ? `${info.endereco.split(" – ")[1]} · ` : ""}
              {info.cidade} – {info.estado}
              {info.cep && (
                <>
                  <br />
                  CEP {info.cep}
                </>
              )}
              <span className="sr-only"> (abre o Google Maps em nova aba)</span>
            </span>
          </a>
        ) : (
          <span className="flex flex-wrap items-center gap-2">
            {info.cidade}, {info.estado} <Pendente tom="escuro">Endereço a confirmar</Pendente>
          </span>
        )}
      </li>
      <li>
        <a
          href={linkWhatsapp(info.whatsappMensagem, info.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-3 transition-colors hover:text-creme"
        >
          <MessageCircle className="size-4 text-rosa-claro" aria-hidden="true" />
          WhatsApp {info.whatsappExibicao}
          <span className="sr-only">(abre em nova aba)</span>
        </a>
      </li>
      <li>
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-3 transition-colors hover:text-creme">
          <IconeInstagram className="size-4 text-rosa-claro" />
          {site.instagram.usuario}
          <span className="sr-only">(abre em nova aba)</span>
        </a>
      </li>
    </ul>
  );
}

export function RodapeHorarios() {
  const { info } = useDados();
  const grupos = agruparHorarios(info.horarios);
  if (!info.horarios.some((h) => h.horario)) {
    return (
      <div className="mt-4">
        <Pendente tom="escuro">Horários a confirmar</Pendente>
      </div>
    );
  }
  return (
    <dl className="mt-4 space-y-3">
      {grupos.map((g) => (
        <div key={g.rotulo}>
          <dt className="font-semibold text-creme">{g.rotulo}</dt>
          <dd className="tabular-nums">
            {g.horario === null ? (
              <span className="italic text-creme/55">Horário não informado</span>
            ) : (
              lerPeriodos(g.horario)
                .map((p) => p.texto.replace(" às ", "–"))
                .join("  ·  ") || g.horario
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
