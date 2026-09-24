"use client";

import { useEffect } from "react";

const STAGGER_MS = 70;
const SETTLE_MS = 1300;
// Los garabatos se disparan apenas entran un poco en pantalla, para que el
// trazo se vea mientras se hace scroll.
const DRAW_SETTLE_MS = 1100;
const DRAW_MARGIN = "0px 0px -10% 0px";

/**
 * Revela los elementos con `data-reveal` al entrar en pantalla (una sola vez).
 * Los que entran juntos se escalonan con --reveal-i. Al terminar se marcan con
 * data-reveal-done y dejan de tener las reglas de animación (vuelven a sus
 * propias transiciones y hover). Los que quedan por encima de la pantalla sin
 * haberse visto (scroll rápido, saltos a un ancla) o que no alcanzan la línea
 * de disparo al final de la página se revelan igual.
 */
export function RevealObserver() {
  useEffect(() => {
    if (document.documentElement.dataset.motion !== "on") return;

    const timers = new Set<number>();
    let frame = 0;

    const reveal = (els: HTMLElement[]) => {
      els.forEach((el, index) => {
        io.unobserve(el);
        drawIo.unobserve(el);
        // Una imagen que aún no carga se revela al llegar; si no, la
        // transición correría sobre un hueco y la imagen aparecería de golpe.
        if (el instanceof HTMLImageElement && !el.complete) {
          if (el.dataset.revealWait !== undefined) return;
          el.dataset.revealWait = "";
          const later = () => {
            delete el.dataset.revealWait;
            reveal([el]);
          };
          el.addEventListener("load", later, { once: true });
          el.addEventListener("error", later, { once: true });
          return;
        }
        el.style.setProperty("--reveal-i", String(index));
        el.dataset.revealed = "";
        const words = el.querySelectorAll(".reveal-word").length;
        const settle = el.dataset.reveal === "draw" ? DRAW_SETTLE_MS : SETTLE_MS;
        const timer = window.setTimeout(() => {
          el.dataset.revealDone = "";
          timers.delete(timer);
        }, settle + index * STAGGER_MS + words * 40);
        timers.add(timer);
      });
    };

    const onEntries = (entries: IntersectionObserverEntry[]) => {
      reveal(
        entries
          .filter((e) => e.isIntersecting || e.boundingClientRect.bottom < 0)
          .map((e) => e.target as HTMLElement),
      );
    };
    const io = new IntersectionObserver(onEntries, { rootMargin: "0px 0px -8% 0px" });
    const drawIo = new IntersectionObserver(onEntries, { rootMargin: DRAW_MARGIN });

    const pending = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed], [data-reveal-wait])");

    // Al final de la página lo que quede en la franja inferior ya no puede subir más.
    const sweep = () => {
      frame = 0;
      const root = document.documentElement;
      const atBottom = window.scrollY + window.innerHeight >= root.scrollHeight - 2;
      reveal(
        [...pending()].filter((el) => {
          const r = el.getBoundingClientRect();
          return r.bottom < 0 || (atBottom && r.top < window.innerHeight);
        }),
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };

    const scan = () =>
      pending().forEach((el) => (el.dataset.reveal === "draw" ? drawIo : io).observe(el));

    scan();
    // Al cargar, los garabatos que ya se ven se dibujan sin esperar al scroll.
    frame = requestAnimationFrame(() => {
      reveal(
        [...pending()].filter((el) => {
          const r = el.getBoundingClientRect();
          return el.dataset.reveal === "draw" && r.top < window.innerHeight && r.bottom > 0;
        }),
      );
      sweep();
    });
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      drawIo.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return null;
}
