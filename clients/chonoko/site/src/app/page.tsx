import { BarraAcoesMobile } from "@/components/layout/BarraAcoesMobile";
import { BarraPrototipo } from "@/components/layout/BarraPrototipo";
import { Cabecalho } from "@/components/layout/Cabecalho";
import { DadosEstruturados } from "@/components/layout/DadosEstruturados";
import { Rodape } from "@/components/layout/Rodape";
import { Abertura } from "@/components/sections/Abertura";
import { Avaliacoes } from "@/components/sections/Avaliacoes";
import { Cardapio } from "@/components/sections/Cardapio";
import { Experiencia } from "@/components/sections/Experiencia";
import { Faixa } from "@/components/sections/Faixa";
import { Galeria } from "@/components/sections/Galeria";
import { Historia } from "@/components/sections/Historia";
import { Localizacao } from "@/components/sections/Localizacao";
import { Novidades } from "@/components/sections/Novidades";

export default function Inicio() {
  return (
    <>
      <DadosEstruturados />
      <BarraPrototipo />
      <Cabecalho />
      <main id="conteudo" className="overflow-x-clip">
        <Abertura />
        <Faixa />
        <Experiencia />
        <Cardapio />
        <Galeria />
        <Historia />
        <Novidades />
        <Avaliacoes />
        <Localizacao />
      </main>
      <Rodape />
      <BarraAcoesMobile />
    </>
  );
}
