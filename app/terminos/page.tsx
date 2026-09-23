import type { Metadata } from "next";
import Link from "next/link";
import { TerminosTabs } from "@/components/terminos/TerminosTabs";
import terminosData from "@/data/terminos.json";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Alcance, entregables y condiciones de los planes mensuales de Zentro.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-24 lg:px-7 lg:pb-28 lg:pt-32">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="group inline-flex items-center gap-1.5 text-base text-grey transition-colors hover:text-white">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-0.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </Link>

        <h1 className="mt-14 text-[clamp(1.5rem,1.2rem_+_1.2vw,2.25rem)] font-bold text-white">{terminosData.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-grey">{terminosData.intro}</p>

        <div className="mt-16">
          <TerminosTabs families={terminosData.families} />
        </div>

        <p className="mt-20 border-t border-line/60 pt-10 text-base text-grey">
          ¿Tienes dudas sobre estos términos?{" "}
          <Link href="/contactos" className="text-white underline underline-offset-4 hover:no-underline">
            Escríbenos
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
