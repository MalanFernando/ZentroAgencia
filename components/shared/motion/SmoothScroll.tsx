"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { motionEnabled } from "./motion";

let instance: Lenis | null = null;

/** Desplaza hasta un elemento con Lenis si está activo; si no, con scroll nativo. */
export function scrollToElement(el: HTMLElement) {
  const offset = -parseFloat(getComputedStyle(el).scrollMarginTop || "0");
  if (instance) instance.scrollTo(el, { offset });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Scroll suave con inercia (Lenis) para rueda de mouse y trackpad; en táctil
 * queda el scroll nativo. Se detiene mientras algo bloquea el scroll de la
 * página (menú móvil, modal de video) y no toca el scroll dentro de <dialog>.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!motionEnabled()) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      stopInertiaOnNavigate: true,
      prevent: (node) => node.closest("dialog") !== null,
    });
    instance = lenis;

    const body = document.body;
    const sync = () => {
      if (body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    };
    const mo = new MutationObserver(sync);
    mo.observe(body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      mo.disconnect();
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
