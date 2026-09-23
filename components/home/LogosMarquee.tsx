"use client";

import Image from "next/image";
import { useContinuousLoop } from "@/hooks/useContinuousLoop";

type Logo = { id: string; src: string; alt: string };

const DURATION_MS = 34000;

function MarqueeRow({ logos, reverse, sizeClass }: { logos: Logo[]; reverse: boolean; sizeClass: string }) {
  const { ref } = useContinuousLoop<HTMLDivElement>(DURATION_MS, (progress, el) => {
    const pct = reverse ? progress * 50 - 50 : -progress * 50;
    el.style.transform = `translateX(${pct}%)`;
  });

  return (
    <div className="logos-marquee-row">
      <div ref={ref} className="logos-marquee-track">
        {[...logos, ...logos].map((logo, i) => (
          <div key={`${logo.id}-${i}`} className={`logos-marquee-item ${sizeClass}`}>
            <Image src={logo.src} alt={logo.alt} fill sizes="140px" className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogosMarquee({ logos, sizeClass = "" }: { logos: Logo[]; sizeClass?: string }) {
  const row1 = logos.filter((_, i) => i % 2 === 0);
  const row2 = logos.filter((_, i) => i % 2 === 1);

  return (
    <div className="logos-marquee">
      <MarqueeRow logos={row1} reverse sizeClass={sizeClass} />
      <MarqueeRow logos={row2} reverse={false} sizeClass={sizeClass} />
    </div>
  );
}
