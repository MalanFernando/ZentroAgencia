"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
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
  const { ref } = useContinuousLoop<HTMLDivElement>(DURATION_MS, (progress, el) => {
    el.style.transform = `translateX(-50%) rotate(${45 + progress * 360}deg)`;
  });

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
