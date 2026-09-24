"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type CycleImage = { src: string; alt: string };

const DEFAULT_INTERVAL_MS = 4500;

// Qué imagen muestra cada espacio de un grupo, para que al cambiar se elija una
// que no se esté viendo en otro espacio del mismo grupo.
const groups = new Map<string, Map<symbol, number>>();

function pickNext(current: number, total: number, others: number[]) {
  const counts = Array.from({ length: total }, (_, i) => others.filter((o) => o === i).length);
  const candidates = counts.map((_, i) => i).filter((i) => i !== current);
  const least = Math.min(...candidates.map((i) => counts[i]));
  const pool = candidates.filter((i) => counts[i] === least);
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Imágenes apiladas que se turnan en bucle: la actual se desvanece con un leve
 * desenfoque y aparece la siguiente. Va dentro de un contenedor posicionado
 * (usa `fill`). `offset` desfasa el cambio para que varias no cambien a la vez.
 * Con `group`, los espacios que comparten el mismo `images` eligen la siguiente
 * al azar entre las que no se ven en otro espacio del grupo; sin él, van en orden.
 * Solo corre en pantalla y con movimiento activado; si no, queda la inicial.
 */
export function ImageCycle({
  images,
  sizes,
  start = 0,
  group,
  priority = false,
  offset = 0,
  interval = DEFAULT_INTERVAL_MS,
}: {
  images: CycleImage[];
  sizes: string;
  start?: number;
  group?: string;
  priority?: boolean;
  offset?: number;
  /** Tiempo que cada imagen queda visible, en ms. */
  interval?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(start);
  // Las demás imágenes se montan (y descargan) recién cuando la página terminó
  // de cargar, para no competir con la carga inicial.
  const [extras, setExtras] = useState(false);
  const activeRef = useRef(start);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el || images.length < 2) return;
    if (document.documentElement.dataset.motion !== "on") return;

    const mountExtras = () => setExtras(true);
    if (document.readyState === "complete") mountExtras();
    else window.addEventListener("load", mountExtras, { once: true });

    const id = Symbol();
    const slots = group ? (groups.get(group) ?? new Map<symbol, number>()) : null;
    if (group && slots) {
      groups.set(group, slots);
      slots.set(id, activeRef.current);
    }

    let timer = 0;
    let visible = false;

    const tick = () => {
      const current = activeRef.current;
      const next = slots
        ? pickNext(current, images.length, [...slots].filter(([k]) => k !== id).map(([, v]) => v))
        : (current + 1) % images.length;
      activeRef.current = next;
      slots?.set(id, next);
      setActive(next);
      timer = window.setTimeout(tick, interval);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === visible) return;
      visible = entry.isIntersecting;
      window.clearTimeout(timer);
      if (visible) timer = window.setTimeout(tick, interval + offset);
    });
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("load", mountExtras);
      slots?.delete(id);
    };
  }, [images.length, offset, group, interval]);

  return (
    <>
      <span ref={ref} hidden />
      {images.map((img, i) =>
        i !== start && !extras ? null : (
          <Image
            key={img.src}
            src={img.src}
            alt={i === active ? img.alt : ""}
            aria-hidden={i === active ? undefined : true}
            fill
            sizes={sizes}
            priority={priority && i === start}
            className="cycle-img object-cover"
            data-active={i === active || undefined}
          />
        ),
      )}
    </>
  );
}
