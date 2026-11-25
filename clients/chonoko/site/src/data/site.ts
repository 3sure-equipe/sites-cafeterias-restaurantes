/**
 * Dados institucionais da Chonoko.
 *
 * REGRA DO PROJETO: nada aqui pode ser inventado. Campos ainda não confirmados
 * ficam como `null` e o site mostra "a confirmar".
 * Os dados editáveis pelo painel (contato, endereço, horários) começam com
 * os valores de `infoInicial`.
 */
import type { InfoLoja } from "@/lib/dados/tipos";

export const site = {
  nome: "Chonoko",
  cidade: "Cachoeira do Sul",
  estado: "RS",
  /** Assinatura presente no próprio selo da marca. */
  assinatura: "Qualidade e Sabor",
  selo: "Chocolates Artesanais",
  slogan: { inicio: "Pequenos momentos,", destaque: "grandes sabores." },
  instagram: {
    usuario: "@chonokocachoeiradosul",
    url: "https://www.instagram.com/chonokocachoeiradosul/",
  },
  /**
   * Ano de fundação citado no "Menu Loja" ("desde 1988").
   * CONFIRMAR com as proprietárias antes de tratar como definitivo.
   */
  fundacao: { ano: 1988, confirmado: false },
  /** Link público de avaliações (ex.: perfil no Google). A confirmar. */
  avaliacoesUrl: null as string | null,
  anoCopyright: 2026,
};

/**
 * Horários OFICIAIS, confirmados pelo responsável (Etapa 02).
 * Fonte única: daqui saem os textos do site, o status "aberto agora" e os
 * dados estruturados para o Google. Domingo: sem informação confirmada.
 */
export const horariosOficiais = [
  { dias: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"], periodos: [["09:00", "12:00"], ["14:00", "18:30"]] },
  { dias: ["Sábado"], periodos: [["09:00", "12:00"], ["14:00", "17:00"]] },
] as const;

/** "09:00" → "09h"; "18:30" → "18h30" */
const hora = (h: string) => h.replace(/^(\d{2}):(\d{2})$/, (_, a, b) => (b === "00" ? `${a}h` : `${a}h${b}`));
const textoPeriodos = (dia: string) => {
  const grupo = horariosOficiais.find((g) => (g.dias as readonly string[]).includes(dia));
  return grupo ? grupo.periodos.map(([a, b]) => `${hora(a)} às ${hora(b)}`).join(" e ") : null;
};

export const infoInicial: InfoLoja = {
  whatsapp: "5551996695981",
  whatsappExibicao: "(51) 99669-5981",
  whatsappMensagem: "Olá! Conheci a Chonoko pelo site e gostaria de saber mais sobre os produtos.",
  instagram: site.instagram.usuario,
  endereco: "Rua Marechal Floriano, 346 – Centro",
  cep: "96508-010",
  cidade: site.cidade,
  estado: site.estado,
  horarios: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"].map((dia) => ({
    dia,
    horario: textoPeriodos(dia), // Domingo fica null = sem informação confirmada
  })),
};

export const navegacao = [
  { href: "#inicio", rotulo: "Início" },
  { href: "#cardapio", rotulo: "Cardápio" },
  { href: "#historia", rotulo: "Nossa história" },
  { href: "#galeria", rotulo: "Galeria" },
  { href: "#novidades", rotulo: "Novidades" },
  { href: "#localizacao", rotulo: "Localização" },
] as const;

/** Link de conversa no WhatsApp, com mensagem inicial opcional. */
export function linkWhatsapp(mensagem: string = infoInicial.whatsappMensagem, numero: string = infoInicial.whatsapp) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

/** Endereço completo em uma linha, como o Google Maps entende. */
export function enderecoCompleto(info: Pick<InfoLoja, "endereco" | "cidade" | "estado" | "cep">) {
  if (!info.endereco) return null;
  return `${info.endereco.replace(" – ", ", ")}, ${info.cidade} - ${info.estado}${info.cep ? `, ${info.cep}` : ""}`;
}

function consultaMaps(info: Pick<InfoLoja, "endereco" | "cidade" | "estado" | "cep">) {
  // Busca pelo endereço oficial; nunca por coordenadas inventadas.
  return encodeURIComponent(enderecoCompleto(info) ?? `${site.nome} ${site.cidade} ${site.estado}`);
}

/** Abre o Google Maps no endereço oficial (ou na busca pelo nome, se faltar o endereço). */
export const mapsBuscaUrl = (info: Pick<InfoLoja, "endereco" | "cidade" | "estado" | "cep">) =>
  `https://www.google.com/maps/search/?api=1&query=${consultaMaps(info)}`;
export const mapsEmbedUrl = (info: Pick<InfoLoja, "endereco" | "cidade" | "estado" | "cep">) =>
  `https://www.google.com/maps?q=${consultaMaps(info)}&output=embed`;
