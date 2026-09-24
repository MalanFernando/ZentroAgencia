"use client";

import { useEffect, useRef } from "react";
import { buildWhatsAppLink } from "@/lib/config";
import { Shape } from "@/components/shared/Shape";

const GENERAL_WHATSAPP_MESSAGE = "Hola Zentro, me gustaría más información sobre sus servicios.";

const BOTTOM_BASE = 64;
const BOTTOM_OVER_FOOTER = 154;

export function WhatsAppFloatingButton() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    const el = ref.current;
    if (!footer || !el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const visible = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
      const bottom = Math.min(BOTTOM_BASE + visible, BOTTOM_OVER_FOOTER);
      el.style.bottom = `${bottom}px`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={buildWhatsAppLink(GENERAL_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed z-50 flex h-14 w-14 items-center justify-center transition-transform duration-200 hover:scale-[0.96]"
      style={{
        bottom: `${BOTTOM_BASE}px`,
        right: "clamp(1rem, 1.25rem + (100vw - 18rem) * 0.006024, 1.5rem)",
      }}
    >
      <Shape name="whatsapp" className="h-10 w-10" />
    </a>
  );
}
