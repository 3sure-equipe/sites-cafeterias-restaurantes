/**
 * Dados institucionais da Chonoko.
 *
 * REGRA DO PROJETO: nada aqui pode ser inventado. Campos ainda não confirmados
 * pela cafeteria ficam como `null` e o site mostra o aviso "a confirmar".
 * Para atualizar, basta preencher o valor — os componentes reagem sozinhos.
 */

export type DiaHorario = {
  dia: string;
  /** Ex.: "8h às 19h". `null` = ainda não confirmado. */
  horario: string | null;
};

export const site = {
  nome: "Chonoko",
  cidade: "Cachoeira do Sul",
  estado: "RS",
  /** Assinatura presente no próprio selo da marca. */
  assinatura: "Qualidade e Sabor",
  selo: "Chocolates Artesanais",

  /** Frase de abertura — proposta para aprovação. */
  slogan: { inicio: "Pequenos momentos,", destaque: "grandes sabores." },

  instagram: {
    usuario: "@chonokocachoeiradosul",
    url: "https://www.instagram.com/chonokocachoeiradosul/",
  },

  /**
   * WhatsApp no formato internacional, só dígitos: "55" + DDD + número.
   * Ex.: "5551999999999". Enquanto `null`, o botão aparece como "em breve".
   */
  whatsapp: null as string | null,
  /** Para que serve o WhatsApp (pedidos, encomendas, dúvidas...). A confirmar. */
  whatsappFinalidade: null as string | null,
  whatsappMensagem: "Olá, Chonoko! Vim pelo site e gostaria de mais informações.",

  telefone: null as string | null,
  email: null as string | null,

  /** Endereço completo (rua, número, bairro). Enquanto `null`, aparece "a confirmar". */
  endereco: null as string | null,
  cep: null as string | null,

  /**
   * Link/embed oficial do Google Maps da loja. Enquanto não houver,
   * o mapa usa uma BUSCA pelo nome na cidade (não são coordenadas inventadas).
   */
  mapsEmbedUrl: null as string | null,

  horarios: [
    { dia: "Segunda-feira", horario: null },
    { dia: "Terça-feira", horario: null },
    { dia: "Quarta-feira", horario: null },
    { dia: "Quinta-feira", horario: null },
    { dia: "Sexta-feira", horario: null },
    { dia: "Sábado", horario: null },
    { dia: "Domingo", horario: null },
  ] as DiaHorario[],

  /** Link público para avaliações (ex.: perfil no Google). A confirmar. */
  avaliacoesUrl: null as string | null,

  anoCopyright: 2026,
};

export const navegacao = [
  { href: "#inicio", rotulo: "Início" },
  { href: "#cardapio", rotulo: "Cardápio" },
  { href: "#historia", rotulo: "Nossa história" },
  { href: "#galeria", rotulo: "Galeria" },
  { href: "#novidades", rotulo: "Novidades" },
  { href: "#localizacao", rotulo: "Localização" },
] as const;

const buscaMaps = encodeURIComponent(`${site.nome} ${site.cidade} ${site.estado}`);

/** Abre o Google Maps com a busca pelo nome (ou pelo endereço, quando confirmado). */
export const mapsBuscaUrl = `https://www.google.com/maps/search/?api=1&query=${
  site.endereco ? encodeURIComponent(`${site.endereco}, ${site.cidade} - ${site.estado}`) : buscaMaps
}`;

export const mapsEmbed =
  site.mapsEmbedUrl ??
  `https://www.google.com/maps?q=${
    site.endereco ? encodeURIComponent(`${site.endereco}, ${site.cidade} - ${site.estado}`) : buscaMaps
  }&output=embed`;

export function whatsappUrl(): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMensagem)}`;
}
