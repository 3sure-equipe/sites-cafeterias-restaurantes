import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const descricao =
  "Chonoko: cafeteria e chocolates artesanais em Cachoeira do Sul, RS. Cafés, tortas e chocolates em um ambiente acolhedor. Qualidade e sabor.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Chonoko — Cafeteria e chocolates artesanais em Cachoeira do Sul",
    template: "%s · Chonoko",
  },
  description: descricao,
  applicationName: "Chonoko",
  keywords: ["Chonoko", "cafeteria", "chocolates artesanais", "Cachoeira do Sul", "café", "tortas"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Chonoko",
    title: "Chonoko — Pequenos momentos, grandes sabores",
    description: descricao,
  },
  twitter: { card: "summary_large_image" },
  // Protótipo de apresentação: não indexar até a versão oficial.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#4a2029",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="sr-only z-[60] rounded-full bg-bordo px-5 py-3 font-semibold text-creme focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
