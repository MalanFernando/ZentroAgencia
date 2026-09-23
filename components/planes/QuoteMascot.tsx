"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { buildWhatsAppLink } from "@/lib/config";
import { buildCatalogQuoteMessage } from "@/lib/messages";
import type { PlansPageState } from "./usePlansPage";

export function QuoteMascot({ state }: { state: PlansPageState }) {
  const count = state.selectedIndividualServices.length;
  const visible = count > 0;
  const [justAppeared, setJustAppeared] = useState(false);
  const [hovering, setHovering] = useState(false);
  const prevVisible = useRef(false);

  useEffect(() => {
    if (visible && !prevVisible.current) {
      setJustAppeared(true);
      const t = setTimeout(() => setJustAppeared(false), 3500);
      return () => clearTimeout(t);
    }
    prevVisible.current = visible;
  }, [visible]);

  if (!visible) return null;

  const href = buildWhatsAppLink(
    buildCatalogQuoteMessage("Servicios Zentro personalizados", state.selectedServices, state.selectedTotal),
  );
  const showBubble = justAppeared || hovering;

  return (
    <div
      className="fixed top-1/2 z-50 flex -translate-y-1/2 flex-col items-start gap-2"
      style={{
        left: 'clamp(0.75rem, 0.75rem + (100vw - 22.5rem) * 0.01205, 1.25rem)'
      }}
      role="status"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className={`relative max-w-[12rem] whitespace-normal rounded-[4px] bg-white px-3 py-2 mb-2 text-xs font-medium text-[#222] transition-all duration-300 ${
          showBubble
            ? 'translate-x-0 opacity-100'
            : 'pointer-events-none -translate-x-2 opacity-0'
        }`}
      >
        ¡Cotiza ahora por WhatsApp!
        <span
          className="absolute left-3 top-full h-3 w-3 -translate-y-1/2 rotate-45 bg-white"
          aria-hidden="true"
        />
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Enviar selección de ${count} servicio(s) por WhatsApp`}
        className="group relative flex items-center justify-center rounded-[4px]"
        style={{
          height:
            'clamp(2.75rem, 2.75rem + (100vw - 22.5rem) * 0.006024, 3rem)',
          width: 'clamp(2.75rem, 2.75rem + (100vw - 22.5rem) * 0.006024, 3rem)'
        }}
      >
        <span
          className="absolute inset-0 animate-pulse rounded-[4px] bg-red/15"
          aria-hidden="true"
        />
        <span className="relative flex h-full w-full items-center justify-center rounded-[50%] bg-white shadow-lg shadow-black/30 transition-transform duration-200 group-hover:scale-102">
          <Image
            src="/icons/bot.svg"
            alt=""
            width={48}
            height={48}
            className="h-[68%] w-[68%]"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-[38%] flex h-3.5 w-3.5 translate-x-[calc(-50%+28px)] translate-y-[calc(-50%+8px)] items-center justify-center rounded-[4px] bg-red text-[9px] font-bold text-white"
          >
            {count}
          </span>
        </span>
      </a>
    </div>
  );
}

