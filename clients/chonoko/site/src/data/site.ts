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

export const infoInicial: InfoLoja = {
  whatsapp: "5551996695981",
  whatsappExibicao: "(51) 99669-5981",
  whatsappMensagem: "Olá! Conheci a Chonoko pelo site e gostaria de saber mais sobre os produtos.",
  instagram: site.instagram.usuario,
  endereco: null,
  cidade: site.cidade,
  estado: site.estado,
  horarios: [
    { dia: "Segunda-feira", horario: null },
    { dia: "Terça-feira", horario: null },
    { dia: "Quarta-feira", horario: null },
    { dia: "Quinta-feira", horario: null },
    { dia: "Sexta-feira", horario: null },
    { dia: "Sábado", horario: null },
    { dia: "Domingo", horario: null },
  ],
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

function consultaMaps(endereco: string | null) {
  return encodeURIComponent(endereco ? `${endereco}, ${site.cidade} - ${site.estado}` : `${site.nome} ${site.cidade} ${site.estado}`);
}

/** Abre o Google Maps com a busca pelo nome (ou pelo endereço, quando confirmado). */
export const mapsBuscaUrl = (endereco: string | null) => `https://www.google.com/maps/search/?api=1&query=${consultaMaps(endereco)}`;
export const mapsEmbedUrl = (endereco: string | null) => `https://www.google.com/maps?q=${consultaMaps(endereco)}&output=embed`;
