"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motionEnabled } from "./motion";

type CycleImage = { src: string; alt: string };

const DEFAULT_INTERVAL_MS = 4500;

// Un grupo comparte un solo reloj: todos sus espacios cambian a la vez.
type Slot = { active: number; visible: boolean; show: (index: number) => void };
type Group = { slots: Set<Slot>; total: number; interval: number; timer: number };
const groups = new Map<string, Group>();

/**
 * Nueva imagen para cada espacio del grupo: distinta de la que muestra y, si
 * hay imágenes suficientes, distinta de la de los demás espacios.
 */
function reassign(slots: Slot[], total: number): number[] {
  for (let attempt = 0; attempt < 50; attempt++) {
    const order = Array.from({ length: total }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const next = slots.map((_, i) => order[i % total]);
    if (next.every((index, i) => index !== slots[i].active)) return next;
  }
  return slots.map((slot) => (slot.active + 1) % total);
}

function tickGroup(group: Group) {
  const slots = [...group.slots];
  reassign(slots, group.total).forEach((index, i) => {
    slots[i].active = index;
    slots[i].show(index);
  });
  group.timer = window.setTimeout(() => tickGroup(group), group.interval);
}

/** El reloj del grupo corre mientras al menos uno de sus espacios está en pantalla. */
function syncGroupTimer(group: Group) {
  const anyVisible = [...group.slots].some((slot) => slot.visible);
  if (anyVisible && !group.timer) {
    group.timer = window.setTimeout(() => tickGroup(group), group.interval);
  } else if (!anyVisible && group.timer) {
    window.clearTimeout(group.timer);
    group.timer = 0;
  }
}

/**
 * Imágenes apiladas que se turnan en bucle: la actual se desvanece con un leve
 * desenfoque y aparece la siguiente. Va dentro de un contenedor posicionado
 * (usa `fill`). Con `group`, los espacios que comparten el mismo `images`
 * cambian todos a la vez, cada uno a una imagen al azar distinta de las demás;
 * sin él, el espacio va en orden. Solo corre en pantalla y con movimiento
 * activado; si no, queda la imagen inicial.
 */
export function ImageCycle({
  images,
  sizes,
  start = 0,
  group,
  priority = false,
  interval = DEFAULT_INTERVAL_MS,
}: {
  images: CycleImage[];
  sizes: string;
  start?: number;
  group?: string;
  priority?: boolean;
  /** Tiempo que cada imagen queda visible, en ms. */
  interval?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(start);
  // Las demás imágenes se montan (y descargan) recién cuando la página terminó
  // de cargar, para no competir con la carga inicial.
  const [extras, setExtras] = useState(false);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el || images.length < 2) return;
    if (!motionEnabled()) return;

    const mountExtras = () => setExtras(true);
    if (document.readyState === "complete") mountExtras();
    else window.addEventListener("load", mountExtras, { once: true });

    const slot: Slot = { active: start, visible: false, show: setActive };
    let shared: Group | null = null;
    let ownTimer = 0;

    if (group) {
      shared = groups.get(group) ?? { slots: new Set(), total: images.length, interval, timer: 0 };
      groups.set(group, shared);
      shared.slots.add(slot);
    }

    const tickOwn = () => {
      slot.active = (slot.active + 1) % images.length;
      setActive(slot.active);
      ownTimer = window.setTimeout(tickOwn, interval);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === slot.visible) return;
      slot.visible = entry.isIntersecting;
      if (shared) {
        syncGroupTimer(shared);
      } else {
        window.clearTimeout(ownTimer);
        if (slot.visible) ownTimer = window.setTimeout(tickOwn, interval);
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(ownTimer);
      window.removeEventListener("load", mountExtras);
      if (shared && group) {
        shared.slots.delete(slot);
        slot.visible = false;
        syncGroupTimer(shared);
        if (shared.slots.size === 0) groups.delete(group);
      }
    };
  }, [images.length, start, group, interval]);

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
