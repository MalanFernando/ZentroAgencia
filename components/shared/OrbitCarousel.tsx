"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useContinuousLoop } from "@/hooks/useContinuousLoop";

type OrbitTile = {
  id: string;
  src: string;
  alt: string;
  href?: string;
};

type OrbitCarouselProps = {
  tiles: OrbitTile[];
  className?: string;
};

const DURATION_MS = 120000;
const AMP = 0.15;
const FALLOFF = 0.33;
const DELAY_MS = 60;
const REFERENCE_ITEM_COUNT = 22;
const ARTWORK_PCT = (220 / REFERENCE_ITEM_COUNT / 120) * 100;
// Parte inferior de la ventana (fracción de su alto) en la que cada imagen se
// va apagando mientras baja por el arco; arriba queda a opacidad completa.
const FADE_ZONE = 0.55;
const FADE_MIN = 0.3;

function circDist(i: number, j: number, n: number) {
  const raw = Math.abs(i - j);
  return Math.min(raw, n - raw);
}

function round(n: number) {
  return Math.round(n * 10000) / 10000;
}

export function OrbitCarousel({ tiles, className = "" }: OrbitCarouselProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const n = tiles.length;
  // Alto de la ventana (.orbit), diámetro y borde superior del aro, en px.
  const geo = useRef({ h: 0, d: 0, top: 0 });
  const { ref } = useContinuousLoop<HTMLDivElement>(DURATION_MS, (progress, el) => {
    const rotation = 45 + progress * 360;
    el.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

    const { h, d, top } = geo.current;
    if (!h) return;
    const rad = (rotation * Math.PI) / 180;
    const tilesEls = el.children;
    for (let i = 0; i < tilesEls.length; i++) {
      const y = top + d / 2 + (d / 2) * Math.sin((2 * Math.PI * i) / n + rad);
      const v = Math.min(Math.max((h - y) / (h * FADE_ZONE), 0), 1);
      const fade = FADE_MIN + (1 - FADE_MIN) * v * v * (3 - 2 * v);
      (tilesEls[i] as HTMLElement).style.setProperty("--fade", fade.toFixed(3));
    }
  });

  useEffect(() => {
    const track = ref.current;
    const orbit = track?.parentElement;
    if (!track || !orbit) return;
    const measure = () => {
      geo.current = { h: orbit.clientHeight, d: track.offsetWidth, top: track.offsetTop };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(orbit);
    return () => ro.disconnect();
  }, [ref]);

  return (
    <div className={`orbit ${className}`}>
      <div
        ref={ref}
        className="orbit-track"
        role="group"
        aria-label="Piezas de contenido producidas por Zentro"
        style={{ transform: "translateX(-50%) rotate(45deg)" } as CSSProperties}
      >
        {tiles.map((tile, i) => {
          const angle = (2 * Math.PI * i) / n;
          const x = round(50 + 50 * Math.cos(angle) - ARTWORK_PCT / 2);
          const y = round(50 + 50 * Math.sin(angle) - ARTWORK_PCT / 2);
          const rotateDeg = (360 / n) * i + 90;

          const d = hovered === null ? 0 : circDist(i, hovered, n);
          const isHovered = hovered === i;
          const amp = hovered === null ? 0 : round(AMP * Math.exp(-FALLOFF * d));
          const opacity = hovered === null || isHovered ? 1 : 0.4 + 0.6 * (1 - d / Math.floor(n / 4));
          const blurPx = hovered === null || isHovered ? 0 : d;

          return (
            <a
              key={tile.id}
              href={tile.href ?? "#"}
              target={tile.href ? "_blank" : undefined}
              rel={tile.href ? "noopener noreferrer" : undefined}
              className="release"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              aria-label={tile.alt}
              style={
                {
                  "--artwork-size": `${ARTWORK_PCT}%`,
                  "--x": `${x}%`,
                  "--y": `${y}%`,
                  "--rotate": `${rotateDeg}deg`,
                  "--amp": amp,
                  "--item-delay": `${d * DELAY_MS}ms`,
                  opacity,
                  filter: blurPx ? `blur(${blurPx}px)` : "none",
                } as CSSProperties
              }
            >
              <Image src={tile.src} alt="" fill sizes="200px" className="object-cover" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
