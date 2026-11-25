import type { Metadata } from "next";
import { PainelShell } from "@/components/admin/PainelShell";

export const metadata: Metadata = {
  title: "Painel da equipe",
  robots: { index: false, follow: false },
};

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return <PainelShell>{children}</PainelShell>;
}
