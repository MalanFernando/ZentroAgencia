import type { Metadata } from "next";
import { PlanesPageClient } from "@/components/planes/PlanesPageClient";

export const metadata: Metadata = {
  title: "Planes",
  description:
    "Planes Impulso, Esencia y Zentro: manejo de redes sociales, producción audiovisual y campañas publicitarias a la medida de tu negocio.",
  alternates: { canonical: "/planes" },
};

export default function PlanesPage() {
  return <PlanesPageClient />;
}
