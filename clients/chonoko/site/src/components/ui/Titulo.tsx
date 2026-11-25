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
        className={`mt-5 text-[2.6rem] sm:text-5xl lg:text-[4rem] ${tom === "claro" ? "text-bordo" : "text-creme"}`}
      >
        {titulo}
      </h2>
      {texto && (
        <p className={`mt-5 text-lg ${tom === "claro" ? "text-taupe-ink" : "text-creme/80"} ${centro ? "mx-auto" : ""} max-w-xl`}>
          {texto}
        </p>
      )}
    </header>
  );
}
