/**
 * Leitura dos horários de funcionamento.
 *
 * Os horários são guardados como texto (editável pelo painel), no formato
 * "09h às 12h e 14h às 18h30". Aqui esse texto vira períodos estruturados,
 * usados para separar manhã/tarde e calcular se a loja está aberta agora.
 */
import type { DiaHorario } from "@/lib/dados/tipos";

export type Periodo = { inicio: number; fim: number; texto: string };

/** Minutos desde 00:00 a partir de "09h", "9h", "18h30", "18:30". */
function minutos(h: string, m?: string) {
  return Number(h) * 60 + (m ? Number(m) : 0);
}

/** "09h às 12h e 14h às 18h30" → [{09:00–12:00}, {14:00–18:30}] */
export function lerPeriodos(texto: string | null): Periodo[] {
  if (!texto) return [];
  const re = /(\d{1,2})\s*(?:h|:)\s*(\d{2})?\s*(?:às|as|a|-|–)\s*(\d{1,2})\s*(?:h|:)\s*(\d{2})?/gi;
  const periodos: Periodo[] = [];
  for (const m of texto.matchAll(re)) {
    periodos.push({ inicio: minutos(m[1], m[2]), fim: minutos(m[3], m[4]), texto: m[0].trim() });
  }
  return periodos;
}

const DIAS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

export type StatusLoja =
  | { tipo: "aberto"; ate: string }
  | { tipo: "fechado"; abre: string | null; quando: "hoje" | "amanha" | null }
  | { tipo: "sem-info" };

const fmt = (min: number) => {
  const h = String(Math.floor(min / 60)).padStart(2, "0");
  const m = min % 60;
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
};

/** Situação da loja num dado momento, a partir dos horários cadastrados. */
export function statusAgora(horarios: DiaHorario[], agora: Date): StatusLoja {
  const diaHoje = DIAS[agora.getDay()];
  const hoje = horarios.find((h) => h.dia === diaHoje);
  const periodosHoje = lerPeriodos(hoje?.horario ?? null);
  const minAgora = agora.getHours() * 60 + agora.getMinutes();

  if (!hoje?.horario) return { tipo: "sem-info" };

  const aberto = periodosHoje.find((p) => minAgora >= p.inicio && minAgora < p.fim);
  if (aberto) return { tipo: "aberto", ate: fmt(aberto.fim) };

  const proximoHoje = periodosHoje.find((p) => p.inicio > minAgora);
  if (proximoHoje) return { tipo: "fechado", abre: fmt(proximoHoje.inicio), quando: "hoje" };

  const amanha = horarios.find((h) => h.dia === DIAS[(agora.getDay() + 1) % 7]);
  const primeiro = lerPeriodos(amanha?.horario ?? null)[0];
  return { tipo: "fechado", abre: primeiro ? fmt(primeiro.inicio) : null, quando: primeiro ? "amanha" : null };
}

export const nomeDiaHoje = (agora: Date) => DIAS[agora.getDay()];

/** Junta dias consecutivos com o mesmo horário: "Segunda a sexta". */
export function agruparHorarios(horarios: DiaHorario[]) {
  const grupos: { dias: string[]; horario: string | null }[] = [];
  for (const h of horarios) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.horario === h.horario && h.horario !== null) ultimo.dias.push(h.dia);
    else grupos.push({ dias: [h.dia], horario: h.horario });
  }
  const abrev = (d: string) => `${d.slice(0, 3)}.`;
  return grupos.map((g) => ({
    ...g,
    curto: g.dias.length > 1 ? `${abrev(g.dias[0])} a ${abrev(g.dias[g.dias.length - 1]).toLowerCase()}` : abrev(g.dias[0]),
    rotulo: g.dias.length > 1 ? `${g.dias[0].replace("-feira", "")} a ${g.dias[g.dias.length - 1].replace("-feira", "").toLowerCase()}` : g.dias[0].replace("-feira", ""),
  }));
}
