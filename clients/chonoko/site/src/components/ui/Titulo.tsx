import { Eyebrow } from "./Eyebrow";

type Props = {
  id?: string;
  chamada: string;
  titulo: React.ReactNode;
  texto?: React.ReactNode;
  tom?: "claro" | "escuro";
  centro?: boolean;
  className?: string;
};

export function Titulo({ id, chamada, titulo, texto, tom = "claro", centro = false, className = "" }: Props) {
  return (
    <header className={`${centro ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <Eyebrow tom={tom} centro={centro}>
        {chamada}
      </Eyebrow>
      <h2
        id={id}
        className={`titulo-secao mt-4 ${tom === "claro" ? "text-bordo" : "text-creme"}`}
      >
        {titulo}
      </h2>
      {texto && (
        <p className={`texto-destaque mt-5 max-w-xl ${tom === "claro" ? "text-taupe-ink" : "text-creme/80"} ${centro ? "mx-auto" : ""}`}>
          {texto}
        </p>
      )}
    </header>
  );
}
