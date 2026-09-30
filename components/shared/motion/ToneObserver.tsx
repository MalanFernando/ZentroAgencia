"use client";

import { useEffect } from "react";

/**
 * Cambio de fondo con el scroll: cuando una sección marcada con
 * data-bg="light" cruza la franja central de la pantalla, pone
 * html[data-tone="light"] y los colores del sitio se funden al tono claro
 * (las variables están registradas con @property, así la transición es
 * gradual). Al salir de esas secciones vuelve al tono oscuro.
 */
export function ToneObserver() {
  useEffect(() => {
    const root = document.documentElement;
    // Las secciones usan data-bg (no data-tone): si compartieran el marcador
    // con <html>, estilos y consultas pensados para ellas alcanzarían a la
    // página entera (el tono alternaba en bucle).
    const active = new Set<Element>();

    const apply = () => {
      if (active.size) root.dataset.tone = "light";
      else delete root.dataset.tone;
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.add(entry.target);
          else active.delete(entry.target);
        }
        apply();
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    // Al navegar cambian las secciones: se observan las nuevas y se sueltan las
    // que ya no están. Otros cambios del DOM (videos, ciclos de imágenes) no
    // tocan nada, para no provocar parpadeos.
    const observed = new Set<Element>();
    const scan = () => {
      const current = new Set(document.querySelectorAll('[data-bg="light"]'));
      for (const el of observed) {
        if (!current.has(el)) {
          io.unobserve(el);
          observed.delete(el);
          active.delete(el);
        }
      }
      for (const el of current) {
        if (!observed.has(el)) {
          io.observe(el);
          observed.add(el);
        }
      }
      apply();
    };

    scan();
    let pending = 0;
    const mo = new MutationObserver(() => {
      if (!pending) pending = requestAnimationFrame(() => {
        pending = 0;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(pending);
      delete root.dataset.tone;
    };
  }, []);

  return null;
}
