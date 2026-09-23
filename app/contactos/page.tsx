import type { Metadata } from "next";
import { ContactosHero } from "@/components/contactos/Hero";
import { ContactForm } from "@/components/contactos/ContactForm";

export const metadata: Metadata = {
  title: "Contactos",
  description:
    "Cuéntanos qué necesita tu marca. Escríbenos y agenda una asesoría gratuita con el equipo de Zentro.",
  alternates: { canonical: "/contactos" },
};

export default function ContactosPage() {
  return (
    <main className="contacts-page flex flex-col bg-bg text-white">
      <ContactosHero />
      <ContactForm />
    </main>
  );
}
