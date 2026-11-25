import { enderecoCompleto, horariosOficiais, infoInicial, site } from "@/data/site";

const DIAS_SCHEMA: Record<string, string> = {
  "Segunda-feira": "Monday",
  "Terça-feira": "Tuesday",
  "Quarta-feira": "Wednesday",
  "Quinta-feira": "Thursday",
  "Sexta-feira": "Friday",
  Sábado: "Saturday",
  Domingo: "Sunday",
};

/**
 * Dados estruturados (schema.org) para o Google: nome, endereço, telefone e
 * horários OFICIAIS. Ano de fundação fica de fora até ser confirmado.
 * Domingo não entra: não há horário confirmado.
 */
export function DadosEstruturados() {
  const dados = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: site.nome,
    description: "Chocolates e biscoitos artesanais, doces finos e cestas em Cachoeira do Sul, RS.",
    slogan: site.assinatura,
    telephone: `+${infoInicial.whatsapp}`,
    sameAs: [site.instagram.url],
    address: {
      "@type": "PostalAddress",
      streetAddress: (infoInicial.endereco ?? "").replace(" – ", " - "),
      addressLocality: infoInicial.cidade,
      addressRegion: infoInicial.estado,
      postalCode: infoInicial.cep ?? undefined,
      addressCountry: "BR",
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto(infoInicial) ?? "")}`,
    openingHoursSpecification: horariosOficiais.flatMap((g) =>
      g.periodos.map(([abre, fecha]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: g.dias.map((d) => DIAS_SCHEMA[d]),
        opens: abre,
        closes: fecha,
      })),
    ),
  };
  return (
    <script
      type="application/ld+json"
      // Conteúdo gerado a partir de dados internos (sem entrada de usuário)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }}
    />
  );
}
