import type { Metadata } from "next";
import { ServiciosHero } from "@/components/servicios/Hero";
import { VideoShowcase } from "@/components/servicios/VideoShowcase";
import { ClientsFeatured } from "@/components/servicios/ClientsFeatured";
import { Testimonials } from "@/components/servicios/Testimonials";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Producción audiovisual, fotografía profesional, diseño visual, branding y campañas publicitarias. Estrategia, producción y ejecución en un solo lugar.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <main className="flex flex-col">
      <ServiciosHero />
      <VideoShowcase />
      <ClientsFeatured />
      <Testimonials />
    </main>
  );
}
