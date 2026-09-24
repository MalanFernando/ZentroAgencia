"use client";

import { useEffect, useRef } from "react";

const W = 32;
const H = 24;

/**
 * Brillo ambiental detrás de un video: copia sus cuadros a un canvas diminuto
 * que el CSS desenfoca y agranda. Debe ir como hermano del <video>. Solo corre
 * en escritorio, con movimiento activado y mientras está en pantalla.
 */
export function VideoGlow({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const video = canvas?.parentElement?.querySelector("video");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !video || !ctx) return;
    if (document.documentElement.dataset.motion !== "on") return;
    const desktop = window.matchMedia("(min-width: 720px)");

    let raf = 0;
    let visible = false;

    const draw = () => {
      raf = 0;
      if (!visible || !desktop.matches) return;
      if (video.readyState >= 2) ctx.drawImage(video, 0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (visible && !raf) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(canvas);
    desktop.addEventListener("change", start);

    return () => {
      io.disconnect();
      desktop.removeEventListener("change", start);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} width={W} height={H} aria-hidden="true" className={className} />;
}
