import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Methodology } from "@/components/home/Methodology";
import { DigitalPresence } from "@/components/home/DigitalPresence";
import { Clients } from "@/components/home/Clients";

// Sin title: el inicio usa el título por defecto del layout (la plantilla
// "%s | Zentro" solo se aplica a las rutas hijas).
export const metadata: Metadata = {
  description:
    "Zentro es una agencia de marketing enfocada en analizar, planificar e implementar estrategias que impulsen el crecimiento de tu marca o empresa.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <About />
      <Methodology />
      <DigitalPresence />
      <Clients />
    </main>
  );
}
